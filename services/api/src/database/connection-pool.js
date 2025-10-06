// ============================================================================
// OPTIMIZED DATABASE CONNECTION POOL - WEBPROPOSTAS V2.0
// ============================================================================
// Purpose: High-performance connection pooling for horizontal scaling
// Features: Health monitoring, auto-recovery, metrics collection
// ============================================================================

const { Pool } = require('pg');
const winston = require('winston');

// Configure logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
});

// ============================================================================
// POOL CONFIGURATION
// ============================================================================

/**
 * Calculate optimal pool size based on environment
 * Formula: (Core count × 2) + effective_spindle_count
 * For web apps: Typically 10-20 connections per instance
 */
function calculatePoolSize() {
  const cpuCount = require('os').cpus().length;
  const baseSize = cpuCount * 2;

  // Environment-specific sizing
  if (process.env.NODE_ENV === 'production') {
    // Production: More conservative, handle more concurrent requests
    return Math.max(baseSize + 5, 20);
  } else if (process.env.NODE_ENV === 'development') {
    // Development: Fewer connections
    return Math.max(baseSize, 5);
  } else {
    // Test: Minimal connections
    return 2;
  }
}

/**
 * Get pool configuration based on environment
 */
function getPoolConfig() {
  const poolSize = calculatePoolSize();

  return {
    // Connection string (Railway auto-provides this)
    connectionString: process.env.DATABASE_URL,

    // SSL configuration (required for Railway/production)
    ssl: process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : false,

    // Pool sizing
    max: process.env.DB_POOL_MAX || poolSize, // Maximum connections
    min: process.env.DB_POOL_MIN || 2, // Minimum idle connections

    // Connection lifecycle
    idleTimeoutMillis: 30000, // 30 seconds - close idle connections
    connectionTimeoutMillis: 5000, // 5 seconds - max wait for connection

    // Keep-alive (prevents connection drops)
    keepAlive: true,
    keepAliveInitialDelayMillis: 10000, // 10 seconds

    // Statement timeout (prevent long-running queries)
    statement_timeout: process.env.DB_STATEMENT_TIMEOUT || 30000, // 30 seconds

    // Query timeout
    query_timeout: process.env.DB_QUERY_TIMEOUT || 10000, // 10 seconds

    // Application name (useful for pg_stat_activity monitoring)
    application_name: `webpropostas_${process.env.NODE_ENV || 'development'}_${process.pid}`,

    // Allow multiple queries in single connection
    allowExitOnIdle: false
  };
}

// ============================================================================
// POOL CREATION WITH MONITORING
// ============================================================================

let pool = null;
let poolStats = {
  totalConnections: 0,
  idleConnections: 0,
  waitingClients: 0,
  queriesExecuted: 0,
  queryErrors: 0,
  totalQueryTime: 0,
  slowQueries: 0
};

/**
 * Create and configure the connection pool
 */
function createPool() {
  const config = getPoolConfig();

  pool = new Pool(config);

  logger.info('Database pool created', {
    max: config.max,
    min: config.min,
    environment: process.env.NODE_ENV,
    applicationName: config.application_name
  });

  // ============================================================================
  // POOL EVENT HANDLERS
  // ============================================================================

  // Connection acquired from pool
  pool.on('connect', (client) => {
    poolStats.totalConnections++;
    logger.debug('Database client connected', {
      totalConnections: pool.totalCount,
      idleConnections: pool.idleCount,
      waitingClients: pool.waitingCount
    });
  });

  // Connection returned to pool
  pool.on('acquire', (client) => {
    logger.debug('Database client acquired from pool');
  });

  // Connection removed from pool
  pool.on('remove', (client) => {
    poolStats.totalConnections--;
    logger.debug('Database client removed from pool', {
      totalConnections: pool.totalCount
    });
  });

  // Pool error (connection lost, etc.)
  pool.on('error', (err, client) => {
    logger.error('Unexpected database pool error', {
      error: err.message,
      stack: err.stack
    });

    // Don't exit on pool errors - let pool handle reconnection
    // Application continues with graceful degradation
  });

  return pool;
}

/**
 * Get or create pool instance (singleton pattern)
 */
function getPool() {
  if (!pool) {
    pool = createPool();
  }
  return pool;
}

// ============================================================================
// QUERY WRAPPER WITH METRICS
// ============================================================================

/**
 * Execute query with automatic metrics collection
 * @param {string} text - SQL query
 * @param {Array} params - Query parameters
 * @returns {Promise} - Query result
 */
async function query(text, params) {
  const start = Date.now();
  const pool = getPool();

  try {
    const result = await pool.query(text, params);
    const duration = Date.now() - start;

    // Update metrics
    poolStats.queriesExecuted++;
    poolStats.totalQueryTime += duration;

    // Log slow queries (> 1 second)
    if (duration > 1000) {
      poolStats.slowQueries++;
      logger.warn('Slow query detected', {
        duration: `${duration}ms`,
        query: text.substring(0, 100) + '...',
        rows: result.rowCount
      });
    }

    // Debug log for all queries in development
    if (process.env.NODE_ENV === 'development' && process.env.LOG_QUERIES === 'true') {
      logger.debug('Query executed', {
        duration: `${duration}ms`,
        rows: result.rowCount,
        query: text.substring(0, 100)
      });
    }

    return result;

  } catch (error) {
    const duration = Date.now() - start;
    poolStats.queryErrors++;

    logger.error('Query execution error', {
      duration: `${duration}ms`,
      error: error.message,
      query: text.substring(0, 100),
      params: params
    });

    throw error;
  }
}

/**
 * Execute query with a specific client (for transactions)
 * @param {Object} client - pg Client
 * @param {string} text - SQL query
 * @param {Array} params - Query parameters
 * @returns {Promise} - Query result
 */
async function queryWithClient(client, text, params) {
  const start = Date.now();

  try {
    const result = await client.query(text, params);
    const duration = Date.now() - start;

    poolStats.queriesExecuted++;
    poolStats.totalQueryTime += duration;

    if (duration > 1000) {
      poolStats.slowQueries++;
      logger.warn('Slow query in transaction', {
        duration: `${duration}ms`,
        query: text.substring(0, 100)
      });
    }

    return result;

  } catch (error) {
    const duration = Date.now() - start;
    poolStats.queryErrors++;

    logger.error('Transaction query error', {
      duration: `${duration}ms`,
      error: error.message,
      query: text.substring(0, 100)
    });

    throw error;
  }
}

// ============================================================================
// TRANSACTION HELPER
// ============================================================================

/**
 * Execute queries in a transaction
 * @param {Function} callback - Async function that receives client
 * @returns {Promise} - Transaction result
 */
async function transaction(callback) {
  const pool = getPool();
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const result = await callback(client);

    await client.query('COMMIT');

    logger.debug('Transaction committed successfully');

    return result;

  } catch (error) {
    await client.query('ROLLBACK');

    logger.error('Transaction rolled back', {
      error: error.message
    });

    throw error;

  } finally {
    client.release();
  }
}

// ============================================================================
// HEALTH CHECK
// ============================================================================

/**
 * Check database connection health
 * @returns {Promise<Object>} - Health status
 */
async function healthCheck() {
  const pool = getPool();
  const start = Date.now();

  try {
    // Simple ping query
    const result = await pool.query('SELECT NOW() as current_time, version() as pg_version');
    const duration = Date.now() - start;

    return {
      healthy: true,
      latency: duration,
      currentTime: result.rows[0].current_time,
      postgresVersion: result.rows[0].pg_version,
      poolStats: {
        totalCount: pool.totalCount,
        idleCount: pool.idleCount,
        waitingCount: pool.waitingCount
      }
    };

  } catch (error) {
    const duration = Date.now() - start;

    logger.error('Database health check failed', {
      error: error.message,
      duration: `${duration}ms`
    });

    return {
      healthy: false,
      error: error.message,
      latency: duration
    };
  }
}

// ============================================================================
// POOL STATISTICS
// ============================================================================

/**
 * Get detailed pool statistics
 * @returns {Object} - Pool metrics
 */
function getPoolStats() {
  const pool = getPool();

  return {
    connections: {
      total: pool.totalCount,
      idle: pool.idleCount,
      waiting: pool.waitingCount,
      max: pool.options.max,
      min: pool.options.min
    },
    queries: {
      executed: poolStats.queriesExecuted,
      errors: poolStats.queryErrors,
      slow: poolStats.slowQueries,
      avgDuration: poolStats.queriesExecuted > 0
        ? Math.round(poolStats.totalQueryTime / poolStats.queriesExecuted)
        : 0
    },
    uptime: {
      totalConnections: poolStats.totalConnections
    }
  };
}

/**
 * Reset pool statistics
 */
function resetPoolStats() {
  poolStats = {
    totalConnections: pool ? pool.totalCount : 0,
    idleConnections: pool ? pool.idleCount : 0,
    waitingClients: pool ? pool.waitingCount : 0,
    queriesExecuted: 0,
    queryErrors: 0,
    totalQueryTime: 0,
    slowQueries: 0
  };

  logger.info('Pool statistics reset');
}

// ============================================================================
// GRACEFUL SHUTDOWN
// ============================================================================

/**
 * Gracefully close all pool connections
 */
async function closePool() {
  if (pool) {
    try {
      logger.info('Closing database pool...');
      await pool.end();
      pool = null;
      logger.info('✅ Database pool closed successfully');
    } catch (error) {
      logger.error('Error closing database pool:', error);
    }
  }
}

/**
 * Setup graceful shutdown handlers
 */
function setupGracefulShutdown() {
  // Handle shutdown signals
  const signals = ['SIGTERM', 'SIGINT', 'SIGUSR2'];

  signals.forEach(signal => {
    process.on(signal, async () => {
      logger.info(`Received ${signal}, starting graceful shutdown...`);
      await closePool();
      process.exit(0);
    });
  });

  // Handle uncaught exceptions
  process.on('uncaughtException', async (error) => {
    logger.error('Uncaught exception:', error);
    await closePool();
    process.exit(1);
  });

  // Handle unhandled rejections
  process.on('unhandledRejection', async (reason, promise) => {
    logger.error('Unhandled rejection:', { reason, promise });
    await closePool();
    process.exit(1);
  });
}

// ============================================================================
// EXPORTS
// ============================================================================

module.exports = {
  // Pool management
  getPool,
  createPool,
  closePool,

  // Query execution
  query,
  queryWithClient,
  transaction,

  // Monitoring
  healthCheck,
  getPoolStats,
  resetPoolStats,

  // Utilities
  setupGracefulShutdown,

  // Direct pool access (use sparingly)
  get pool() {
    return pool;
  }
};

// ============================================================================
// REDIS CACHE UTILITY - WEBPROPOSTAS V2.0
// ============================================================================
// Purpose: Centralized caching layer for performance optimization
// Target: Reduce database queries by 70%+, API response time < 150ms
// ============================================================================

const redis = require('redis');
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
// REDIS CLIENT CONFIGURATION
// ============================================================================

let redisClient = null;
let isConnected = false;

/**
 * Initialize Redis client
 */
async function initializeRedis() {
  try {
    const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

    redisClient = redis.createClient({
      url: redisUrl,
      socket: {
        reconnectStrategy: (retries) => {
          if (retries > 10) {
            logger.error('Redis: Max reconnection attempts reached');
            return new Error('Redis reconnection failed');
          }
          // Exponential backoff: 100ms, 200ms, 400ms, ...
          return Math.min(retries * 100, 3000);
        }
      }
    });

    // Event handlers
    redisClient.on('connect', () => {
      logger.info('Redis: Connecting...');
    });

    redisClient.on('ready', () => {
      isConnected = true;
      logger.info('✅ Redis: Connected and ready');
    });

    redisClient.on('error', (err) => {
      logger.error('Redis error:', err);
      isConnected = false;
    });

    redisClient.on('end', () => {
      isConnected = false;
      logger.warn('Redis: Connection closed');
    });

    await redisClient.connect();

    // Test connection
    await redisClient.ping();
    logger.info('Redis: Connection test successful');

    return redisClient;

  } catch (error) {
    logger.error('Failed to initialize Redis:', error);
    // Application can run without Redis (graceful degradation)
    return null;
  }
}

/**
 * Close Redis connection
 */
async function closeRedis() {
  if (redisClient) {
    await redisClient.quit();
    isConnected = false;
    logger.info('Redis: Connection closed gracefully');
  }
}

// ============================================================================
// CACHE TTL CONSTANTS (in seconds)
// ============================================================================

const TTL = {
  VERY_SHORT: 60,           // 1 minute - rapidly changing data
  SHORT: 300,               // 5 minutes - frequently changing data
  MEDIUM: 1800,             // 30 minutes - moderately changing data
  LONG: 3600,               // 1 hour - slowly changing data
  VERY_LONG: 86400,         // 24 hours - rarely changing data
  SESSION: 604800,          // 7 days - user sessions
};

// ============================================================================
// CACHE KEY PATTERNS
// ============================================================================

const KEYS = {
  // User data
  USER: (userId) => `user:${userId}`,
  USER_PROPOSALS: (userId, status = 'all') => `user:${userId}:proposals:${status}`,
  USER_CLIENTS: (userId) => `user:${userId}:clients`,
  USER_STATS: (userId) => `user:${userId}:stats`,

  // Proposal data
  PROPOSAL: (proposalId) => `proposal:${proposalId}`,
  PROPOSAL_ANALYTICS: (proposalId) => `proposal:${proposalId}:analytics`,
  PROPOSAL_COMMENTS: (proposalId) => `proposal:${proposalId}:comments`,

  // Client data
  CLIENT: (clientId) => `client:${clientId}`,
  CLIENT_PROPOSALS: (clientId) => `client:${clientId}:proposals`,

  // Templates
  TEMPLATES: (category = 'all', sector = 'all') => `templates:${category}:${sector}`,
  TEMPLATE: (templateId) => `template:${templateId}`,
  TEMPLATE_CATEGORIES: () => 'templates:categories',
  TEMPLATE_SECTORS: () => 'templates:sectors',

  // Dashboard
  DASHBOARD_STATS: (userId) => `dashboard:${userId}:stats`,

  // Search results (short TTL as they can change)
  SEARCH_PROPOSALS: (userId, query) => `search:proposals:${userId}:${query}`,
  SEARCH_CLIENTS: (userId, query) => `search:clients:${userId}:${query}`,

  // Session
  SESSION: (sessionId) => `session:${sessionId}`,

  // Rate limiting
  RATE_LIMIT: (ip, endpoint) => `ratelimit:${ip}:${endpoint}`,
};

// ============================================================================
// CORE CACHE FUNCTIONS
// ============================================================================

/**
 * Get value from cache
 * @param {string} key - Cache key
 * @returns {Promise<any>} - Cached value or null
 */
async function get(key) {
  if (!isConnected) {
    logger.debug('Redis not connected, skipping cache get');
    return null;
  }

  try {
    const value = await redisClient.get(key);

    if (value) {
      logger.debug(`Cache HIT: ${key}`);
      return JSON.parse(value);
    }

    logger.debug(`Cache MISS: ${key}`);
    return null;

  } catch (error) {
    logger.error(`Cache get error for key ${key}:`, error);
    return null;
  }
}

/**
 * Set value in cache
 * @param {string} key - Cache key
 * @param {any} value - Value to cache
 * @param {number} ttl - Time to live in seconds (default: MEDIUM)
 * @returns {Promise<boolean>} - Success status
 */
async function set(key, value, ttl = TTL.MEDIUM) {
  if (!isConnected) {
    logger.debug('Redis not connected, skipping cache set');
    return false;
  }

  try {
    const serialized = JSON.stringify(value);
    await redisClient.setEx(key, ttl, serialized);
    logger.debug(`Cache SET: ${key} (TTL: ${ttl}s)`);
    return true;

  } catch (error) {
    logger.error(`Cache set error for key ${key}:`, error);
    return false;
  }
}

/**
 * Delete key from cache
 * @param {string} key - Cache key or pattern
 * @returns {Promise<boolean>} - Success status
 */
async function del(key) {
  if (!isConnected) {
    return false;
  }

  try {
    await redisClient.del(key);
    logger.debug(`Cache DEL: ${key}`);
    return true;

  } catch (error) {
    logger.error(`Cache delete error for key ${key}:`, error);
    return false;
  }
}

/**
 * Delete multiple keys by pattern
 * @param {string} pattern - Redis key pattern (e.g., "user:123:*")
 * @returns {Promise<number>} - Number of keys deleted
 */
async function delPattern(pattern) {
  if (!isConnected) {
    return 0;
  }

  try {
    const keys = await redisClient.keys(pattern);

    if (keys.length === 0) {
      return 0;
    }

    await redisClient.del(keys);
    logger.debug(`Cache DEL pattern: ${pattern} (${keys.length} keys)`);
    return keys.length;

  } catch (error) {
    logger.error(`Cache delete pattern error for ${pattern}:`, error);
    return 0;
  }
}

/**
 * Check if key exists in cache
 * @param {string} key - Cache key
 * @returns {Promise<boolean>} - Exists status
 */
async function exists(key) {
  if (!isConnected) {
    return false;
  }

  try {
    const result = await redisClient.exists(key);
    return result === 1;

  } catch (error) {
    logger.error(`Cache exists error for key ${key}:`, error);
    return false;
  }
}

/**
 * Increment counter (useful for rate limiting)
 * @param {string} key - Cache key
 * @param {number} ttl - Time to live in seconds
 * @returns {Promise<number>} - New counter value
 */
async function incr(key, ttl = TTL.SHORT) {
  if (!isConnected) {
    return 1;
  }

  try {
    const value = await redisClient.incr(key);

    // Set expiration on first increment
    if (value === 1) {
      await redisClient.expire(key, ttl);
    }

    return value;

  } catch (error) {
    logger.error(`Cache incr error for key ${key}:`, error);
    return 1;
  }
}

// ============================================================================
// HIGH-LEVEL CACHE FUNCTIONS (Business Logic)
// ============================================================================

/**
 * Cache or fetch user proposals
 * @param {number} userId - User ID
 * @param {function} fetchFunction - Function to fetch data if not cached
 * @param {string} status - Proposal status filter
 * @returns {Promise<any>} - Proposals data
 */
async function cacheUserProposals(userId, fetchFunction, status = 'all') {
  const key = KEYS.USER_PROPOSALS(userId, status);

  // Try to get from cache first
  let data = await get(key);

  if (data) {
    return data;
  }

  // Cache miss - fetch from database
  data = await fetchFunction();

  // Store in cache for 5 minutes (proposals change frequently)
  await set(key, data, TTL.SHORT);

  return data;
}

/**
 * Cache or fetch dashboard stats
 * @param {number} userId - User ID
 * @param {function} fetchFunction - Function to fetch data if not cached
 * @returns {Promise<any>} - Dashboard stats
 */
async function cacheDashboardStats(userId, fetchFunction) {
  const key = KEYS.DASHBOARD_STATS(userId);

  let data = await get(key);

  if (data) {
    return data;
  }

  data = await fetchFunction();

  // Dashboard stats can be cached longer (30 minutes)
  await set(key, data, TTL.MEDIUM);

  return data;
}

/**
 * Cache or fetch templates
 * @param {function} fetchFunction - Function to fetch templates
 * @param {string} category - Category filter
 * @param {string} sector - Sector filter
 * @returns {Promise<any>} - Templates data
 */
async function cacheTemplates(fetchFunction, category = 'all', sector = 'all') {
  const key = KEYS.TEMPLATES(category, sector);

  let data = await get(key);

  if (data) {
    return data;
  }

  data = await fetchFunction();

  // Templates rarely change - cache for 1 hour
  await set(key, data, TTL.LONG);

  return data;
}

/**
 * Invalidate all caches for a user
 * @param {number} userId - User ID
 * @returns {Promise<number>} - Number of keys deleted
 */
async function invalidateUserCache(userId) {
  const pattern = `user:${userId}:*`;
  const deleted = await delPattern(pattern);

  // Also invalidate dashboard
  await del(KEYS.DASHBOARD_STATS(userId));

  logger.info(`Invalidated cache for user ${userId}: ${deleted} keys`);
  return deleted;
}

/**
 * Invalidate cache for a specific proposal
 * @param {string} proposalId - Proposal ID
 * @returns {Promise<number>} - Number of keys deleted
 */
async function invalidateProposalCache(proposalId) {
  const pattern = `proposal:${proposalId}:*`;
  const deleted = await delPattern(pattern);

  await del(KEYS.PROPOSAL(proposalId));

  logger.info(`Invalidated cache for proposal ${proposalId}: ${deleted} keys`);
  return deleted;
}

/**
 * Rate limiting check
 * @param {string} identifier - IP or user ID
 * @param {string} endpoint - API endpoint
 * @param {number} limit - Max requests allowed
 * @param {number} window - Time window in seconds
 * @returns {Promise<object>} - Rate limit status
 */
async function checkRateLimit(identifier, endpoint, limit = 100, window = 60) {
  const key = KEYS.RATE_LIMIT(identifier, endpoint);
  const current = await incr(key, window);

  const remaining = Math.max(0, limit - current);
  const isLimited = current > limit;

  return {
    allowed: !isLimited,
    limit,
    remaining,
    current,
    resetAt: Date.now() + (window * 1000)
  };
}

// ============================================================================
// CACHE WARMING (Preload frequently accessed data)
// ============================================================================

/**
 * Warm up cache with frequently accessed data
 * @param {object} pool - Database pool
 */
async function warmupCache(pool) {
  if (!isConnected) {
    logger.warn('Redis not connected, skipping cache warmup');
    return;
  }

  try {
    logger.info('Starting cache warmup...');

    // Warm up template categories and sectors
    const categoriesQuery = `
      SELECT DISTINCT category, COUNT(*) as count
      FROM proposal_templates
      WHERE is_active = true
      GROUP BY category
    `;
    const categories = await pool.query(categoriesQuery);
    await set(KEYS.TEMPLATE_CATEGORIES(), categories.rows, TTL.VERY_LONG);

    const sectorsQuery = `
      SELECT DISTINCT sector, COUNT(*) as count
      FROM proposal_templates
      WHERE is_active = true
      GROUP BY sector
    `;
    const sectors = await pool.query(sectorsQuery);
    await set(KEYS.TEMPLATE_SECTORS(), sectors.rows, TTL.VERY_LONG);

    logger.info('✅ Cache warmup completed');

  } catch (error) {
    logger.error('Cache warmup error:', error);
  }
}

// ============================================================================
// CACHE STATISTICS
// ============================================================================

/**
 * Get cache statistics
 * @returns {Promise<object>} - Cache stats
 */
async function getStats() {
  if (!isConnected) {
    return {
      connected: false,
      message: 'Redis not connected'
    };
  }

  try {
    const info = await redisClient.info('stats');
    const keyspace = await redisClient.info('keyspace');

    return {
      connected: true,
      info,
      keyspace,
      uptime: await redisClient.info('server')
    };

  } catch (error) {
    logger.error('Failed to get cache stats:', error);
    return {
      connected: false,
      error: error.message
    };
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

module.exports = {
  // Initialization
  initializeRedis,
  closeRedis,

  // Core functions
  get,
  set,
  del,
  delPattern,
  exists,
  incr,

  // Business logic functions
  cacheUserProposals,
  cacheDashboardStats,
  cacheTemplates,
  invalidateUserCache,
  invalidateProposalCache,
  checkRateLimit,

  // Utilities
  warmupCache,
  getStats,

  // Constants
  TTL,
  KEYS,

  // Getters
  get isConnected() {
    return isConnected;
  }
};

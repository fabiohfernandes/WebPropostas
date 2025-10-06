// ============================================================================
// ADVANCED RATE LIMITING MIDDLEWARE - WEBPROPOSTAS V2.0
// ============================================================================
// Purpose: Distributed rate limiting with Redis for horizontal scaling
// Features: Per-user, per-IP, per-endpoint limits with Redis backend
// ============================================================================

const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');
const cache = require('../utils/cache');
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
// RATE LIMIT CONFIGURATIONS
// ============================================================================

/**
 * General API rate limiter (applies to all endpoints)
 * 100 requests per 15 minutes per IP
 */
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: {
    success: false,
    error: 'Too many requests from this IP, please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers

  // Use Redis store for distributed rate limiting (multi-instance support)
  store: cache.isConnected ? new RedisStore({
    // @ts-expect-error - Known issue with RedisStore types
    client: cache.redisClient,
    prefix: 'rl:general:'
  }) : undefined,

  // Skip rate limiting for successful requests (only count errors)
  skip: (req, res) => {
    // Don't rate limit health checks
    return req.path === '/api/v1/health';
  },

  // Custom key generator (use user ID if authenticated, otherwise IP)
  keyGenerator: (req) => {
    return req.user?.userId || req.ip;
  },

  // Handler for when limit is exceeded
  handler: (req, res) => {
    logger.warn('Rate limit exceeded', {
      ip: req.ip,
      userId: req.user?.userId,
      path: req.path,
      method: req.method
    });

    res.status(429).json({
      success: false,
      error: 'Too many requests. Please slow down.',
      retryAfter: Math.ceil(req.rateLimit.resetTime - Date.now() / 1000)
    });
  }
});

/**
 * Authentication endpoints rate limiter (more restrictive)
 * 5 attempts per 15 minutes per IP
 */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 login attempts per window
  message: {
    success: false,
    error: 'Too many authentication attempts. Please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,

  store: cache.isConnected ? new RedisStore({
    // @ts-expect-error - Known issue with RedisStore types
    client: cache.redisClient,
    prefix: 'rl:auth:'
  }) : undefined,

  keyGenerator: (req) => {
    // Use combination of IP + email for auth attempts
    const email = req.body?.email || req.body?.username || '';
    return `${req.ip}:${email}`;
  },

  handler: (req, res) => {
    logger.warn('Auth rate limit exceeded', {
      ip: req.ip,
      email: req.body?.email,
      path: req.path
    });

    res.status(429).json({
      success: false,
      error: 'Too many login attempts. Your account has been temporarily locked for security.',
      retryAfter: '15 minutes',
      tip: 'Try resetting your password if you forgot it.'
    });
  }
});

/**
 * Client login rate limiter (even more restrictive for public endpoints)
 * 10 attempts per 15 minutes per IP
 */
const clientLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 attempts per window
  message: {
    success: false,
    error: 'Too many login attempts. Please contact the proposal sender.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,

  store: cache.isConnected ? new RedisStore({
    // @ts-expect-error - Known issue with RedisStore types
    client: cache.redisClient,
    prefix: 'rl:client:'
  }) : undefined,

  keyGenerator: (req) => {
    const username = req.body?.username || '';
    return `${req.ip}:${username}`;
  },

  handler: (req, res) => {
    logger.warn('Client login rate limit exceeded', {
      ip: req.ip,
      username: req.body?.username,
      proposalId: req.params?.id
    });

    res.status(429).json({
      success: false,
      error: 'Too many login attempts. Please wait before trying again.',
      retryAfter: '15 minutes'
    });
  }
});

/**
 * Write operations rate limiter (creates, updates, deletes)
 * 30 requests per 15 minutes per user
 */
const writeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // 30 write operations per window
  message: {
    success: false,
    error: 'Too many operations. Please slow down to prevent data corruption.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,

  store: cache.isConnected ? new RedisStore({
    // @ts-expect-error - Known issue with RedisStore types
    client: cache.redisClient,
    prefix: 'rl:write:'
  }) : undefined,

  // Only apply to authenticated users
  skip: (req) => !req.user,

  keyGenerator: (req) => {
    return req.user?.userId?.toString() || req.ip;
  },

  handler: (req, res) => {
    logger.warn('Write rate limit exceeded', {
      userId: req.user?.userId,
      ip: req.ip,
      path: req.path,
      method: req.method
    });

    res.status(429).json({
      success: false,
      error: 'You are performing too many operations too quickly. Please wait a moment.',
      retryAfter: Math.ceil((req.rateLimit.resetTime - Date.now()) / 1000)
    });
  }
});

/**
 * Search endpoints rate limiter
 * 60 requests per 15 minutes per user
 */
const searchLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 60, // 60 search requests per window
  message: {
    success: false,
    error: 'Too many search requests. Please refine your search criteria.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,

  store: cache.isConnected ? new RedisStore({
    // @ts-expect-error - Known issue with RedisStore types
    client: cache.redisClient,
    prefix: 'rl:search:'
  }) : undefined,

  keyGenerator: (req) => {
    return req.user?.userId?.toString() || req.ip;
  }
});

/**
 * File upload rate limiter
 * 10 uploads per hour per user
 */
const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // 10 uploads per hour
  message: {
    success: false,
    error: 'Upload limit exceeded. Please wait before uploading more files.',
    retryAfter: '1 hour'
  },
  standardHeaders: true,
  legacyHeaders: false,

  store: cache.isConnected ? new RedisStore({
    // @ts-expect-error - Known issue with RedisStore types
    client: cache.redisClient,
    prefix: 'rl:upload:'
  }) : undefined,

  keyGenerator: (req) => {
    return req.user?.userId?.toString() || req.ip;
  },

  handler: (req, res) => {
    logger.warn('Upload rate limit exceeded', {
      userId: req.user?.userId,
      ip: req.ip,
      fileSize: req.headers['content-length']
    });

    res.status(429).json({
      success: false,
      error: 'You have exceeded the file upload limit. Please try again later.',
      retryAfter: '1 hour',
      limit: '10 files per hour'
    });
  }
});

/**
 * API endpoint rate limiter (for external API access)
 * 1000 requests per hour per API key
 */
const apiKeyLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 1000, // 1000 API calls per hour
  message: {
    success: false,
    error: 'API rate limit exceeded for your API key.',
    retryAfter: '1 hour'
  },
  standardHeaders: true,
  legacyHeaders: false,

  store: cache.isConnected ? new RedisStore({
    // @ts-expect-error - Known issue with RedisStore types
    client: cache.redisClient,
    prefix: 'rl:api:'
  }) : undefined,

  keyGenerator: (req) => {
    // Use API key from header
    return req.headers['x-api-key'] || req.ip;
  },

  handler: (req, res) => {
    logger.warn('API rate limit exceeded', {
      apiKey: req.headers['x-api-key'],
      ip: req.ip,
      path: req.path
    });

    res.status(429).json({
      success: false,
      error: 'API rate limit exceeded. Upgrade your plan for higher limits.',
      retryAfter: '1 hour',
      currentLimit: '1000 requests/hour',
      upgrade: 'https://webpropostas.com.br/pricing'
    });
  }
});

// ============================================================================
// CUSTOM RATE LIMITER FACTORY
// ============================================================================

/**
 * Create a custom rate limiter with specific configuration
 * @param {Object} options - Rate limiter options
 * @returns {Function} - Express middleware
 */
function createRateLimiter(options = {}) {
  const {
    windowMs = 15 * 60 * 1000,
    max = 100,
    message = 'Rate limit exceeded',
    keyPrefix = 'rl:custom',
    skipSuccessfulRequests = false,
    skipFailedRequests = false
  } = options;

  return rateLimit({
    windowMs,
    max,
    message: {
      success: false,
      error: message,
      retryAfter: Math.ceil(windowMs / 1000 / 60) + ' minutes'
    },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests,
    skipFailedRequests,

    store: cache.isConnected ? new RedisStore({
      // @ts-expect-error - Known issue with RedisStore types
      client: cache.redisClient,
      prefix: keyPrefix
    }) : undefined,

    keyGenerator: (req) => {
      return req.user?.userId?.toString() || req.ip;
    }
  });
}

// ============================================================================
// RATE LIMIT INFO MIDDLEWARE
// ============================================================================

/**
 * Add rate limit information to response headers
 */
function rateLimitInfo(req, res, next) {
  // Add custom headers with remaining quota
  if (req.rateLimit) {
    res.setHeader('X-RateLimit-Remaining', req.rateLimit.remaining);
    res.setHeader('X-RateLimit-Reset', req.rateLimit.resetTime);
  }
  next();
}

// ============================================================================
// EXPORTS
// ============================================================================

module.exports = {
  // Pre-configured limiters
  generalLimiter,
  authLimiter,
  clientLoginLimiter,
  writeLimiter,
  searchLimiter,
  uploadLimiter,
  apiKeyLimiter,

  // Custom limiter factory
  createRateLimiter,

  // Utilities
  rateLimitInfo
};

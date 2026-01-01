const { RateLimiterRedis } = require('rate-limiter-flexible');
const Redis = require('ioredis');
const config = require('../config');

// Using ioredis client
const redisClient = new Redis(config.REDIS_URL, {
    enableOfflineQueue: false,
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

const rateLimiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'middleware',
    points: Number(config.RATE_LIMIT_POINTS),
    duration: Number(config.RATE_LIMIT_DURATION),
});

const rateLimiterMiddleware = (req, res, next) => {
    // Use user ID if authenticated, else IP
    const key = req.user ? req.user.id : req.ip;

    rateLimiter.consume(key)
        .then(() => {
            next();
        })
        .catch((err) => {
            console.error('RateLimiter Error:', err);
            res.status(429).json({ message: 'Too Many Requests' });
        });
};

module.exports = rateLimiterMiddleware;

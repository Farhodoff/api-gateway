require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 3005,
    REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',
    JWT_SECRET: process.env.JWT_SECRET || 'supersecretkey',
    RATE_LIMIT_POINTS: process.env.RATE_LIMIT_POINTS || 10, // Number of requests
    RATE_LIMIT_DURATION: process.env.RATE_LIMIT_DURATION || 1, // Per second
};

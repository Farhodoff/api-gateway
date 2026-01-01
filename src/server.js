const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const config = require('./config');
const authenticate = require('./middleware/auth');
const rateLimiter = require('./middleware/rateLimiter');
const routes = require('./routes');

const app = express();
console.log('Loaded Config:', config);

// Global Rate Limiter (optional, applied to all)
// app.use(rateLimiter); 

// Global Middleware
app.use(express.json());

// Setup Routes
routes.forEach(route => {
    const middlewares = [];

    // Add Rate Limiting (Global or Route specific - here we use the global Redis one for all/specific)
    // For simplicity, let's apply the Redis rate limiter to *all* proxied routes or specific ones.
    // In the plan, we said "Resurslarni himoya qilish", so let's apply it broadly or per route.
    // Let's apply our Redis middleware only if auth is required or always. 
    // For this generic gateway, let's apply it to everything for safety.
    middlewares.push(rateLimiter);

    if (route.auth) {
        middlewares.push(authenticate);
    }

    app.use(route.url, middlewares, createProxyMiddleware(route.proxy));
});

// Health check
app.get('/health', (req, res) => {
    res.send('API Gateway is running');
});

// Login endpoint to get a token (for testing purposes)
const jwt = require('jsonwebtoken');
app.post('/login', (req, res) => {
    // Mock login
    const { username } = req.body;
    const user = { id: 1, username: username || 'user' };
    const token = jwt.sign(user, config.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

app.listen(config.PORT, () => {
    console.log(`API Gateway running on port ${config.PORT}`);
});

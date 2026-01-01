const express = require('express');

const app1 = express();
app1.use((req, res, next) => { console.log(`[Service 1] ${req.method} ${req.url}`); next(); });
app1.get('/', (req, res) => {
    res.send('Hello from Service 1 (Free)');
});
app1.listen(3001, '0.0.0.0', () => console.log('Service 1 running on 3001'));

const app2 = express();
app2.use((req, res, next) => { console.log(`[Service 2] ${req.method} ${req.url}`); next(); });
app2.get('/', (req, res) => {
    res.send('Hello from Service 2 (Premium)');
});
app2.listen(3002, '0.0.0.0', () => console.log('Service 2 running on 3002'));

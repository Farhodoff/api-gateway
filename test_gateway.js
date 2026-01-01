const http = require('http');

function request(path, headers = {}) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 3005,
            path: path,
            method: 'GET',
            headers: headers
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => resolve({ statusCode: res.statusCode, data, headers: res.headers }));
        });

        req.on('error', (e) => reject(e));
        req.end();
    });
}

async function login() {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify({ username: 'testuser' });
        const options = {
            hostname: 'localhost',
            port: 3005,
            path: '/login',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => resolve(JSON.parse(body).token));
        });

        req.write(data);
        req.end();
    });
}

async function runTests() {
    console.log('--- Starting Tests ---');

    // 1. Test Free Route (No Auth)
    try {
        const res1 = await request('/free');
        if (res1.statusCode === 200 && res1.data.includes('Service 1')) {
            console.log('✅ /free route passed');
        } else {
            console.log('❌ /free route failed', res1.statusCode, res1.data);
        }
    } catch (e) { console.log('❌ /free route error', e.message); }

    // 2. Test Premium Route (Without Auth)
    try {
        const res2 = await request('/premium');
        if (res2.statusCode === 401) {
            console.log('✅ /premium (no auth) passed');
        } else {
            console.log('❌ /premium (no auth) failed', res2.statusCode);
        }
    } catch (e) { console.log('❌ /premium (no auth) error', e.message); }

    // 3. Test Premium Route (With Auth)
    try {
        const token = await login();
        const res3 = await request('/premium', { 'Authorization': `Bearer ${token}` });
        if (res3.statusCode === 200 && res3.data.includes('Service 2')) {
            console.log('✅ /premium (with auth) passed');
        } else {
            console.log('❌ /premium (with auth) failed', res3.statusCode, res3.data);
        }
    } catch (e) { console.log('❌ /premium (with auth) error', e.message); }

    // 4. Test Rate Limit (Sending 60 requests)
    console.log('Testing Rate Limit (sending 60 requests)...');
    let hit = false;
    for (let i = 0; i < 60; i++) {
        const res = await request('/free');
        if (res.statusCode === 429) {
            console.log(`✅ Rate limit hit at request ${i + 1}`);
            hit = true;
            break;
        }
    }
    if (!hit) console.log('❌ Rate limit NOT hit after 60 requests');
}

runTests().catch(console.error);

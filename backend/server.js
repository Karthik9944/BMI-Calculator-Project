const http = require('http');

const PORT = process.env.PORT || 5000;

const sendJson = (res, statusCode, payload) => {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(payload));
};

const parseBody = (req) =>
  new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      if (!data) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(data));
      } catch (error) {
        reject(new Error('Invalid JSON body'));
      }
    });
  });

const server = http.createServer(async (req, res) => {
  if (req.method === 'GET' && req.url === '/api/health') {
    sendJson(res, 200, { ok: true, service: 'bmi-backend' });
    return;
  }

  if (req.method === 'POST' && req.url === '/api/bmi') {
    try {
      const { weight, height } = await parseBody(req);
      const weightNum = Number(weight);
      const heightNum = Number(height);

      if (!weightNum || !heightNum || weightNum <= 0 || heightNum <= 0) {
        sendJson(res, 400, { error: 'Weight and height must be positive numbers.' });
        return;
      }

      const bmi = Number((weightNum / Math.pow(heightNum / 100, 2)).toFixed(1));
      sendJson(res, 200, { bmi });
    } catch (error) {
      sendJson(res, 400, { error: error.message });
    }
    return;
  }

  sendJson(res, 404, { error: 'Route not found' });
});

server.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

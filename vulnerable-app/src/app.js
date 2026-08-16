const http = require('node:http');
const { URL } = require('node:url');
const { getWeather } = require('./weather/weather.service');

const PORT = 3000;

function sendJson(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(body));
}

function sendHtml(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(body);
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const scenario = url.searchParams.get('scenario') || 'valid';

  try {
    if (url.pathname === '/') {
      return sendJson(res, 200, {
        message: 'Offline Third-Party API Response Validation Lab',
        apiEndpoint: '/api/weather?scenario=valid',
        browserDemo: '/weather-page?scenario=valid',
        scenarios: ['valid', 'invalid-type', 'missing-field', 'malicious']
      });
    }

    if (url.pathname === '/api/weather') {
      const data = await getWeather(scenario);
      return sendJson(res, 200, { data });
    }

    if (url.pathname === '/weather-page') {
      const weather = await getWeather(scenario);

      // Deliberately vulnerable: untrusted third-party values are inserted
      // directly into HTML so the malicious fixture demonstrates XSS impact.
      return sendHtml(res, 200, `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Weather Report</title>
</head>
<body>
  <h1>Weather Report</h1>
  <p><strong>City:</strong> ${weather.city}</p>
  <p><strong>Temperature:</strong> ${weather.temperature}</p>
  <p><strong>Condition:</strong> ${weather.condition}</p>
</body>
</html>`);
    }

    return sendJson(res, 404, { error: 'Not found' });
  } catch (error) {
    console.error('Weather request failed:', error);
    return sendJson(res, 502, { error: 'Weather service request failed' });
  }
});

server.listen(PORT, () => {
  console.log(`Weather Consumer App listening on http://localhost:${PORT}`);
});

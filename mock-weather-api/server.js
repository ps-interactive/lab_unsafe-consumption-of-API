const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { URL } = require('node:url');

const PORT = 4000;
const scenarioFiles = {
  valid: 'valid-weather.json',
  'invalid-type': 'invalid-type.json',
  'missing-field': 'missing-field.json',
  malicious: 'malicious-weather.json'
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

  if (url.pathname === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ status: 'ok', service: 'mock-weather-api' }));
  }

  if (url.pathname !== '/weather') {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: 'Not found' }));
  }

  const scenario = url.searchParams.get('scenario') || 'valid';
  const fileName = scenarioFiles[scenario];

  if (!fileName) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({
      error: 'Unknown scenario',
      supportedScenarios: Object.keys(scenarioFiles)
    }));
  }

  try {
    const filePath = path.join(__dirname, 'data', fileName);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    JSON.parse(fileContents); // verify fixture is valid JSON
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(fileContents);
  } catch (error) {
    console.error('Failed to read mock weather data:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: 'Mock weather API failed to load data' }));
  }
});

server.listen(PORT, () => {
  console.log(`Mock Weather API listening on http://localhost:${PORT}`);
  console.log('Try: http://localhost:4000/weather?scenario=valid');
});

# Third-Party Response Validation Lab — Node-Only Starter

This starter version runs entirely with Node.js 18 built-ins. It does not require `npm install` to start either service.

## Start the mock third-party API

```bash
cd mock-weather-api
npm start
```

The mock API listens on `http://localhost:4000`.

## Start the vulnerable application

In a second terminal:

```bash
cd vulnerable-app
npm start
```

The vulnerable app listens on `http://localhost:3000`.

## Test scenarios

```bash
curl "http://localhost:3000/api/weather?scenario=valid"
curl "http://localhost:3000/api/weather?scenario=invalid-type"
curl "http://localhost:3000/api/weather?scenario=missing-field"
curl "http://localhost:3000/api/weather?scenario=malicious"
```

For the browser XSS demonstration, open:

`http://localhost:3000/weather-page?scenario=malicious`

## Learner task

Inspect `vulnerable-app/src/weather/weather.service.js`. The service trusts the third-party JSON response immediately. Implement response validation before that data is returned to the rest of the application.

The starter contains no third-party runtime packages so it can run offline. If Zod is provided by the lab image, use it in `weather.schema.js` and call the schema from `weather.service.js`.

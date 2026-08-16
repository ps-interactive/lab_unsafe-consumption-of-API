const { WeatherSchema } = require('./weather.schema');

const MOCK_WEATHER_API = 'http://localhost:4000/weather';

/**
 * Retrieves weather information from a simulated third-party service
 * and validates the response before returning it to the application.
 */
async function getWeather(scenario = 'valid') {
  const url = `${MOCK_WEATHER_API}?scenario=${encodeURIComponent(scenario)}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Weather service returned HTTP ${response.status}`);
  }

  const data = await response.json();

  // Validate untrusted third-party data before it reaches the application.
  const result = WeatherSchema.safeParse(data);

  if (!result.success) {
    console.error(
      'Third-party response validation failed:',
      result.error.issues
    );

    const error = new Error(
      'Invalid response received from third-party weather service'
    );

    error.name = 'ThirdPartyValidationError';
    throw error;
  }

  // Only validated data leaves the service layer.
  return result.data;
}

module.exports = { getWeather };

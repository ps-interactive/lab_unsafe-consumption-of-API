const MOCK_WEATHER_API = 'http://localhost:4000/weather';

/**
 * Retrieves weather information from a simulated third-party service.
 *
 * SECURITY REVIEW:
 * The returned JSON is trusted immediately without validating its structure,
 * types, or content.
 */
async function getWeather(scenario = 'valid') {
  const url = `${MOCK_WEATHER_API}?scenario=${encodeURIComponent(scenario)}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Weather service returned HTTP ${response.status}`);
  }

  // Vulnerable behavior: third-party data is returned without validation.
  return await response.json();
}

module.exports = { getWeather };

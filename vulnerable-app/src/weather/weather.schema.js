/**
 * LEARNER TODO:
 * Implement response schema validation here.
 *
 * Expected fields:
 * - city: non-empty string, maximum 100 characters
 * - temperature: number
 * - condition: non-empty string, maximum 100 characters
 *
 * External string fields should reject angle brackets (< and >) so the
 * supplied malicious response cannot pass validation.
 *
 * This starter version intentionally has no external runtime dependencies so
 * the vulnerable application can run fully offline. If your lab image
 * provides Zod locally, import it here and validate the third-party response
 * before returning it from weather.service.js.
 */

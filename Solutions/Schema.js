const { z } = require('zod');

const WeatherSchema = z.object({
  city: z
    .string()
    .min(1)
    .max(100)
    .regex(
      /^[A-Za-z\s.'-]+$/,
      'City contains invalid characters'
    ),

  temperature: z
    .number()
    .min(-150)
    .max(150),

  condition: z
    .string()
    .min(1)
    .max(100)
    .regex(
      /^[A-Za-z\s.'-]+$/,
      'Condition contains invalid characters'
    ),
}).strict();

module.exports = { WeatherSchema };

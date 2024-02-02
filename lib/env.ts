import z from "zod"

if (typeof window !== 'undefined') {
  throw new Error('Server only module.');
}

const envSchema = z.object({
  RESEND_API_KEY: z.string(),
  FROM_EMAIL: z.string().email(),
  DATABASE_URL: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string()
})

export const env = envSchema.parse({
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  FROM_EMAIL: process.env.FROM_EMAIL,
  DATABASE_URL: process.env.DATABASE_URL,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
})
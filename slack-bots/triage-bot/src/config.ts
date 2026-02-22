import { z } from 'zod'

const configSchema = z.object({
  SLACK_BOT_TOKEN: z.string().startsWith('xoxb-'),
  SLACK_SIGNING_SECRET: z.string().min(1),
  ANTHROPIC_API_KEY: z.string().min(1),
  SUPPORT_CHANNEL_ID: z.string().min(1),
  BUG_CHANNEL_ID: z.string().min(1),
  FEATURE_CHANNEL_ID: z.string().min(1),
  QUESTION_CHANNEL_ID: z.string().min(1),
  URGENT_CHANNEL_ID: z.string().min(1),
  PORT: z.coerce.number().default(3000),
})

export type Config = z.infer<typeof configSchema>

export function loadConfig(env: Record<string, string | undefined> = process.env): Config {
  const result = configSchema.safeParse(env)
  if (!result.success) {
    const errors = result.error.issues
      .map((i) => `  ${i.path.join('.')}: ${i.message}`)
      .join('\n')
    console.error(`Missing or invalid environment variables:\n${errors}`)
    process.exit(1)
  }
  return result.data
}

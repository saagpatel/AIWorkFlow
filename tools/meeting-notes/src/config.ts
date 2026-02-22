import { z } from 'zod'

const configSchema = z.object({
  ANTHROPIC_API_KEY: z.string().min(1),
  SLACK_BOT_TOKEN: z.string().startsWith('xoxb-').optional(),
  SLACK_SIGNING_SECRET: z.string().min(1).optional(),
  MEETING_NOTES_CHANNEL_ID: z.string().min(1).optional(),
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
  GOOGLE_REFRESH_TOKEN: z.string().optional(),
  PORT: z.coerce.number().default(3002),
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

export function hasSlackConfig(config: Config): boolean {
  return !!(config.SLACK_BOT_TOKEN && config.SLACK_SIGNING_SECRET)
}

export function hasGoogleTasksConfig(config: Config): boolean {
  return !!(config.GOOGLE_CLIENT_ID && config.GOOGLE_CLIENT_SECRET && config.GOOGLE_REFRESH_TOKEN)
}

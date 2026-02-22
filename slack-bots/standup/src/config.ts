import { z } from 'zod'

const configSchema = z.object({
  SLACK_BOT_TOKEN: z.string().startsWith('xoxb-'),
  SLACK_SIGNING_SECRET: z.string().min(1),
  TEAM_MEMBER_IDS: z.string().min(1).transform((val) => val.split(',').map((id) => id.trim())),
  STANDUP_CHANNEL_ID: z.string().min(1),
  STANDUP_CRON: z.string().default('0 9 * * 1-5'),
  GOOGLE_SHEETS_SPREADSHEET_ID: z.string().optional(),
  GOOGLE_SERVICE_ACCOUNT_EMAIL: z.string().optional(),
  GOOGLE_PRIVATE_KEY: z.string().optional(),
  PORT: z.coerce.number().default(3001),
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

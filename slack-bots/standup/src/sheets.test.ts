import { describe, it, expect, vi } from 'vitest'
import type { StandupEntry } from '@aiworkflow/shared'
import type { Config } from './config.js'

vi.mock('googleapis', () => ({
  google: {
    auth: { JWT: vi.fn() },
    sheets: vi.fn().mockReturnValue({
      spreadsheets: {
        values: {
          append: vi.fn().mockResolvedValue({}),
        },
      },
    }),
  },
}))

import { logToSheets } from './sheets.js'

const baseConfig: Config = {
  SLACK_BOT_TOKEN: 'xoxb-test',
  SLACK_SIGNING_SECRET: 'secret',
  TEAM_MEMBER_IDS: ['U1'],
  STANDUP_CHANNEL_ID: 'C_STANDUP',
  STANDUP_CRON: '0 9 * * 1-5',
  PORT: 3001,
}

const entries: StandupEntry[] = [
  {
    userId: 'U1',
    displayName: 'Alice',
    yesterday: 'Fixed bugs',
    today: 'Writing tests',
    blockers: '',
    timestamp: new Date(),
  },
]

describe('logToSheets', () => {
  it('should skip when Google Sheets is not configured', async () => {
    const mockLog = vi.spyOn(console, 'log').mockImplementation(() => {})

    await logToSheets(entries, baseConfig)

    expect(mockLog).toHaveBeenCalledWith(expect.stringContaining('not configured'))
    mockLog.mockRestore()
  })

  it('should log entries when configured', async () => {
    const config: Config = {
      ...baseConfig,
      GOOGLE_SHEETS_SPREADSHEET_ID: 'sheet-123',
      GOOGLE_SERVICE_ACCOUNT_EMAIL: 'bot@test.iam.gserviceaccount.com',
      GOOGLE_PRIVATE_KEY: 'fake-key',
    }

    await logToSheets(entries, config)
    // No error thrown = success
  })
})

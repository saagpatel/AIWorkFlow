import { describe, it, expect, vi } from 'vitest'
import { loadConfig } from './config.js'

const validEnv = {
  SLACK_BOT_TOKEN: 'xoxb-test-token',
  SLACK_SIGNING_SECRET: 'test-secret',
  TEAM_MEMBER_IDS: 'U001,U002,U003',
  STANDUP_CHANNEL_ID: 'C000STANDUP',
}

describe('loadConfig', () => {
  it('should parse valid environment variables', () => {
    const config = loadConfig(validEnv)
    expect(config.SLACK_BOT_TOKEN).toBe('xoxb-test-token')
    expect(config.TEAM_MEMBER_IDS).toEqual(['U001', 'U002', 'U003'])
    expect(config.STANDUP_CRON).toBe('0 9 * * 1-5')
    expect(config.PORT).toBe(3001)
  })

  it('should make Google Sheets config optional', () => {
    const config = loadConfig(validEnv)
    expect(config.GOOGLE_SHEETS_SPREADSHEET_ID).toBeUndefined()
  })

  it('should exit on missing required vars', () => {
    const mockExit = vi.spyOn(process, 'exit').mockImplementation(() => {
      throw new Error('process.exit called')
    })
    const mockError = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => loadConfig({})).toThrow('process.exit called')
    expect(mockExit).toHaveBeenCalledWith(1)

    mockExit.mockRestore()
    mockError.mockRestore()
  })
})

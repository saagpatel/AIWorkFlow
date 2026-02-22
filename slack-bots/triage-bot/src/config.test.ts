import { describe, it, expect, vi } from 'vitest'
import { loadConfig } from './config.js'

const validEnv = {
  SLACK_BOT_TOKEN: 'xoxb-test-token',
  SLACK_SIGNING_SECRET: 'test-secret',
  ANTHROPIC_API_KEY: 'sk-ant-test',
  SUPPORT_CHANNEL_ID: 'C000SUPPORT',
  BUG_CHANNEL_ID: 'C000BUG',
  FEATURE_CHANNEL_ID: 'C000FEAT',
  QUESTION_CHANNEL_ID: 'C000QUEST',
  URGENT_CHANNEL_ID: 'C000URGENT',
}

describe('loadConfig', () => {
  it('should parse valid environment variables', () => {
    const config = loadConfig(validEnv)
    expect(config.SLACK_BOT_TOKEN).toBe('xoxb-test-token')
    expect(config.PORT).toBe(3000)
  })

  it('should accept custom PORT', () => {
    const config = loadConfig({ ...validEnv, PORT: '8080' })
    expect(config.PORT).toBe(8080)
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

  it('should reject invalid SLACK_BOT_TOKEN prefix', () => {
    const mockExit = vi.spyOn(process, 'exit').mockImplementation(() => {
      throw new Error('process.exit called')
    })
    const mockError = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() =>
      loadConfig({ ...validEnv, SLACK_BOT_TOKEN: 'invalid-token' }),
    ).toThrow('process.exit called')

    mockExit.mockRestore()
    mockError.mockRestore()
  })
})

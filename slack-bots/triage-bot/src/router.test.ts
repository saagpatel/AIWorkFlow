import { describe, it, expect } from 'vitest'
import type { TicketCategory } from '@aiworkflow/shared'
import { getRouteTarget } from './router.js'
import type { Config } from './config.js'

const mockConfig: Config = {
  SLACK_BOT_TOKEN: 'xoxb-test',
  SLACK_SIGNING_SECRET: 'secret',
  ANTHROPIC_API_KEY: 'key',
  SUPPORT_CHANNEL_ID: 'C_SUPPORT',
  BUG_CHANNEL_ID: 'C_BUG',
  FEATURE_CHANNEL_ID: 'C_FEATURE',
  QUESTION_CHANNEL_ID: 'C_QUESTION',
  URGENT_CHANNEL_ID: 'C_URGENT',
  PORT: 3000,
}

describe('getRouteTarget', () => {
  it('should route bug to bug channel', () => {
    const target = getRouteTarget('bug', mockConfig)
    expect(target.channelId).toBe('C_BUG')
    expect(target.emoji).toBe('bug')
    expect(target.label).toBe('Bug Report')
  })

  it('should route feature_request to feature channel', () => {
    const target = getRouteTarget('feature_request', mockConfig)
    expect(target.channelId).toBe('C_FEATURE')
    expect(target.emoji).toBe('bulb')
    expect(target.label).toBe('Feature Request')
  })

  it('should route question to question channel', () => {
    const target = getRouteTarget('question', mockConfig)
    expect(target.channelId).toBe('C_QUESTION')
    expect(target.emoji).toBe('question')
    expect(target.label).toBe('Question')
  })

  it('should route urgent to urgent channel', () => {
    const target = getRouteTarget('urgent', mockConfig)
    expect(target.channelId).toBe('C_URGENT')
    expect(target.emoji).toBe('rotating_light')
    expect(target.label).toBe('Urgent')
  })
})

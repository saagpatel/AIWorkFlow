import { describe, it, expect, vi } from 'vitest'

vi.mock('@aiworkflow/shared', () => ({
  actionItemsBlocks: vi.fn().mockReturnValue([{ type: 'section', text: { type: 'mrkdwn', text: 'items' } }]),
}))

import { postToSlack } from './slack-poster.js'
import type { MeetingExtraction } from '@aiworkflow/shared'

describe('postToSlack', () => {
  it('should post extraction to the specified channel', async () => {
    const mockClient = {
      chat: { postMessage: vi.fn().mockResolvedValue({}) },
    } as any

    const extraction: MeetingExtraction = {
      actionItems: [{ task: 'Deploy', owner: 'Alice', priority: 'high' }],
      decisions: ['Use Redis'],
      keyTopics: ['Caching'],
      summary: 'Discussed caching strategy',
    }

    await postToSlack(mockClient, 'C_MEETING', extraction)

    expect(mockClient.chat.postMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        channel: 'C_MEETING',
        text: expect.stringContaining('Discussed caching'),
      }),
    )
  })

  it('should handle empty decisions', async () => {
    const mockClient = {
      chat: { postMessage: vi.fn().mockResolvedValue({}) },
    } as any

    const extraction: MeetingExtraction = {
      actionItems: [],
      decisions: [],
      keyTopics: ['General'],
      summary: 'Quick sync',
    }

    await postToSlack(mockClient, 'C_MEETING', extraction)

    const call = mockClient.chat.postMessage.mock.calls[0][0]
    const decisionsBlock = call.blocks.find((b: any) =>
      b.text?.text?.includes('Decisions'),
    )
    expect(decisionsBlock.text.text).toContain('No decisions recorded')
  })
})

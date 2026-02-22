import { describe, it, expect, vi } from 'vitest'

// CLI is a script module, so we test the formatting behavior by importing
// the extractor and testing the flow indirectly
vi.mock('@aiworkflow/shared', () => ({
  extractStructured: vi.fn(),
  MeetingExtractionSchema: {},
}))

import { extractMeetingNotes } from './extractor.js'
import { extractStructured } from '@aiworkflow/shared'

describe('CLI flow', () => {
  it('should extract meeting notes from text', async () => {
    const mockResult = {
      actionItems: [
        { task: 'Write tests', owner: 'Bob', priority: 'medium' as const },
      ],
      decisions: ['Use Vitest'],
      keyTopics: ['Testing'],
      summary: 'Discussed testing strategy',
    }
    vi.mocked(extractStructured).mockResolvedValue(mockResult)

    const result = await extractMeetingNotes('We need better test coverage...')
    expect(result.summary).toBe('Discussed testing strategy')
    expect(result.actionItems).toHaveLength(1)
  })
})

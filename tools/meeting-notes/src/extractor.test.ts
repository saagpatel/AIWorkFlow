import { describe, it, expect, vi } from 'vitest'

vi.mock('@aiworkflow/shared', () => ({
  extractStructured: vi.fn(),
  MeetingExtractionSchema: {},
}))

import { extractMeetingNotes } from './extractor.js'
import { extractStructured } from '@aiworkflow/shared'

describe('extractMeetingNotes', () => {
  it('should call extractStructured with extraction prompt', async () => {
    const mockResult = {
      actionItems: [{ task: 'Deploy fix', owner: 'Alice', priority: 'high' as const }],
      decisions: ['Use Redis for caching'],
      keyTopics: ['Performance', 'Caching'],
      summary: 'Discussed performance improvements',
    }
    vi.mocked(extractStructured).mockResolvedValue(mockResult)

    const result = await extractMeetingNotes('We discussed caching...')

    expect(result).toEqual(mockResult)
    expect(extractStructured).toHaveBeenCalledWith(
      expect.stringContaining('meeting notes analyst'),
      'We discussed caching...',
      expect.anything(),
    )
  })
})

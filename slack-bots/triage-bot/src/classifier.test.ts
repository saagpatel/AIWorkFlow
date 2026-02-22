import { describe, it, expect, vi } from 'vitest'

vi.mock('@aiworkflow/shared', () => ({
  extractStructured: vi.fn(),
  ClassificationResultSchema: {},
}))

import { classifyTicket } from './classifier.js'
import { extractStructured } from '@aiworkflow/shared'

describe('classifyTicket', () => {
  it('should call extractStructured with triage prompt', async () => {
    const mockResult = {
      category: 'bug' as const,
      confidence: 0.95,
      reasoning: 'Reports a crash',
    }
    vi.mocked(extractStructured).mockResolvedValue(mockResult)

    const result = await classifyTicket('The app crashes on login')

    expect(result).toEqual(mockResult)
    expect(extractStructured).toHaveBeenCalledWith(
      expect.stringContaining('support ticket classifier'),
      'The app crashes on login',
      expect.anything(),
    )
  })
})

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { z } from 'zod'
import { classify, extractStructured, _setClient, _resetClient } from './anthropic-client.js'

const mockCreate = vi.fn()
const fakeClient = {
  messages: { create: mockCreate },
} as any

describe('classify', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()
    _setClient(fakeClient)
  })

  afterEach(() => {
    vi.useRealTimers()
    _resetClient()
  })

  it('should return text from Claude response', async () => {
    mockCreate.mockResolvedValue({
      content: [{ type: 'text', text: 'bug' }],
    })

    const result = await classify('system prompt', 'user message')
    expect(result).toBe('bug')
    expect(mockCreate).toHaveBeenCalledOnce()
  })

  it('should throw when no text block returned', async () => {
    mockCreate.mockResolvedValue({ content: [] })

    await expect(classify('system', 'msg')).rejects.toThrow('No text response')
  })

  it('should not retry on non-retryable errors', async () => {
    mockCreate.mockRejectedValue(new Error('bad request'))

    await expect(classify('system', 'msg')).rejects.toThrow('bad request')
    expect(mockCreate).toHaveBeenCalledOnce()
  })
})

describe('extractStructured', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    _setClient(fakeClient)
  })

  afterEach(() => {
    _resetClient()
  })

  it('should parse JSON response with Zod schema', async () => {
    const schema = z.object({ category: z.string(), score: z.number() })
    mockCreate.mockResolvedValue({
      content: [{ type: 'text', text: '{"category":"bug","score":0.95}' }],
    })

    const result = await extractStructured('system', 'msg', schema)
    expect(result).toEqual({ category: 'bug', score: 0.95 })
  })

  it('should throw on invalid JSON', async () => {
    const schema = z.object({ category: z.string() })
    mockCreate.mockResolvedValue({
      content: [{ type: 'text', text: 'not json' }],
    })

    await expect(extractStructured('system', 'msg', schema)).rejects.toThrow()
  })

  it('should throw on schema mismatch', async () => {
    const schema = z.object({ category: z.string(), required_field: z.number() })
    mockCreate.mockResolvedValue({
      content: [{ type: 'text', text: '{"category":"bug"}' }],
    })

    await expect(extractStructured('system', 'msg', schema)).rejects.toThrow()
  })
})

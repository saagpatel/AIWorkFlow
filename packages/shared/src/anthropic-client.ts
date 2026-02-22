import Anthropic from '@anthropic-ai/sdk'
import {
  APIConnectionError,
  RateLimitError,
} from '@anthropic-ai/sdk'
import { z } from 'zod'

let _client: Anthropic | null = null

function getClient(): Anthropic {
  if (!_client) {
    _client = new Anthropic()
  }
  return _client
}

/** For testing only */
export function _setClient(client: Anthropic): void {
  _client = client
}

/** For testing only */
export function _resetClient(): void {
  _client = null
}

const MAX_RETRIES = 3
const BASE_DELAY_MS = 1000

async function withRetry<T>(fn: () => Promise<T>): Promise<T> {
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      return await fn()
    } catch (error) {
      const isRetryable =
        error instanceof RateLimitError ||
        error instanceof APIConnectionError
      const isLastAttempt = attempt === MAX_RETRIES - 1

      if (!isRetryable || isLastAttempt) {
        throw error
      }

      const delay = BASE_DELAY_MS * Math.pow(2, attempt)
      await new Promise((resolve) => setTimeout(resolve, delay))
    }
  }
  throw new Error('Unreachable')
}

export async function classify(
  systemPrompt: string,
  userMessage: string,
): Promise<string> {
  const response = await withRetry(() =>
    getClient().messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }],
    }),
  )

  const textBlock = response.content.find((block) => block.type === 'text')
  if (!textBlock || textBlock.type !== 'text') {
    throw new Error('No text response from Claude')
  }
  return textBlock.text
}

export async function extractStructured<T>(
  systemPrompt: string,
  userMessage: string,
  schema: z.ZodType<T>,
): Promise<T> {
  const response = await withRetry(() =>
    getClient().messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }],
    }),
  )

  const textBlock = response.content.find((block) => block.type === 'text')
  if (!textBlock || textBlock.type !== 'text') {
    throw new Error('No text response from Claude')
  }

  const parsed = JSON.parse(textBlock.text)
  return schema.parse(parsed)
}

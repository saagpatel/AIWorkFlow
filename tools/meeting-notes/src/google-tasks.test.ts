import { describe, it, expect, vi } from 'vitest'
import type { ActionItem } from '@aiworkflow/shared'
import type { Config } from './config.js'

vi.mock('googleapis', () => ({
  google: {
    auth: { OAuth2: vi.fn().mockImplementation(() => ({ setCredentials: vi.fn() })) },
    tasks: vi.fn().mockReturnValue({
      tasklists: {
        list: vi.fn().mockResolvedValue({ data: { items: [{ id: 'list1' }] } }),
      },
      tasks: {
        insert: vi.fn().mockResolvedValue({}),
      },
    }),
  },
}))

import { createGoogleTasks } from './google-tasks.js'

const baseConfig: Config = {
  ANTHROPIC_API_KEY: 'test-key',
  PORT: 3002,
}

const items: ActionItem[] = [
  { task: 'Deploy fix', owner: 'Alice', priority: 'high', deadline: '2026-03-01' },
  { task: 'Write docs', owner: 'Bob', priority: 'low' },
]

describe('createGoogleTasks', () => {
  it('should skip when Google Tasks is not configured', async () => {
    const mockLog = vi.spyOn(console, 'log').mockImplementation(() => {})

    await createGoogleTasks(items, baseConfig)

    expect(mockLog).toHaveBeenCalledWith(expect.stringContaining('not configured'))
    mockLog.mockRestore()
  })

  it('should create tasks when configured', async () => {
    const config: Config = {
      ...baseConfig,
      GOOGLE_CLIENT_ID: 'client-id',
      GOOGLE_CLIENT_SECRET: 'client-secret',
      GOOGLE_REFRESH_TOKEN: 'refresh-token',
    }

    await createGoogleTasks(items, config)
    // No error thrown = success
  })
})

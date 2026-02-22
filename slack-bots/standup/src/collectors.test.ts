import { describe, it, expect, vi } from 'vitest'
import { registerCollectors } from './collectors.js'

describe('registerCollectors', () => {
  it('should register action and view handlers', () => {
    const mockApp = {
      action: vi.fn(),
      view: vi.fn(),
    } as any

    registerCollectors(mockApp)

    expect(mockApp.action).toHaveBeenCalledWith('open_standup_modal', expect.any(Function))
    expect(mockApp.view).toHaveBeenCalledWith('standup_submission', expect.any(Function))
  })

  it('should open modal on button click', async () => {
    const mockApp = { action: vi.fn(), view: vi.fn() } as any
    registerCollectors(mockApp)

    const actionHandler = mockApp.action.mock.calls[0][1]
    const mockAck = vi.fn()
    const mockClient = { views: { open: vi.fn().mockResolvedValue({}) } }

    await actionHandler({
      ack: mockAck,
      body: { trigger_id: 'T123' },
      client: mockClient,
    })

    expect(mockAck).toHaveBeenCalled()
    expect(mockClient.views.open).toHaveBeenCalledWith(
      expect.objectContaining({
        trigger_id: 'T123',
        view: expect.objectContaining({
          type: 'modal',
          callback_id: 'standup_submission',
        }),
      }),
    )
  })

  it('should store submission data on modal submit', async () => {
    const mockApp = { action: vi.fn(), view: vi.fn() } as any
    registerCollectors(mockApp)

    const viewHandler = mockApp.view.mock.calls[0][1]
    const mockAck = vi.fn()
    const mockClient = {
      users: {
        info: vi.fn().mockResolvedValue({ user: { real_name: 'Alice' } }),
      },
    }

    await viewHandler({
      ack: mockAck,
      body: { user: { id: 'U1' } },
      view: {
        state: {
          values: {
            yesterday_block: { yesterday_input: { value: 'Did stuff' } },
            today_block: { today_input: { value: 'Doing stuff' } },
            blockers_block: { blockers_input: { value: '' } },
          },
        },
      },
      client: mockClient,
    })

    expect(mockAck).toHaveBeenCalled()
  })
})

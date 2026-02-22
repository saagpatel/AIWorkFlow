import { describe, it, expect, beforeEach } from 'vitest'
import * as store from './store.js'

describe('store', () => {
  beforeEach(() => {
    store.clear()
  })

  it('should store and retrieve entries', () => {
    store.set('U1', { userId: 'U1', displayName: 'Alice', yesterday: 'Did stuff' })
    const entry = store.get('U1')
    expect(entry?.displayName).toBe('Alice')
    expect(entry?.yesterday).toBe('Did stuff')
  })

  it('should merge partial updates', () => {
    store.set('U1', { userId: 'U1', yesterday: 'Work' })
    store.set('U1', { userId: 'U1', today: 'More work' })
    const entry = store.get('U1')
    expect(entry?.yesterday).toBe('Work')
    expect(entry?.today).toBe('More work')
  })

  it('should return undefined for missing entries', () => {
    expect(store.get('NONEXISTENT')).toBeUndefined()
  })

  it('should return all entries', () => {
    store.set('U1', { userId: 'U1', yesterday: 'A' })
    store.set('U2', { userId: 'U2', yesterday: 'B' })
    expect(store.getAll()).toHaveLength(2)
  })

  it('should clear all entries', () => {
    store.set('U1', { userId: 'U1', yesterday: 'A' })
    store.clear()
    expect(store.getAll()).toHaveLength(0)
  })

  it('should check completeness', () => {
    expect(store.isComplete('U1')).toBe(false)

    store.set('U1', { userId: 'U1', yesterday: 'A', today: 'B' })
    expect(store.isComplete('U1')).toBe(false)

    store.set('U1', { userId: 'U1', blockers: '' })
    expect(store.isComplete('U1')).toBe(true)
  })

  it('should return only complete entries', () => {
    store.set('U1', {
      userId: 'U1',
      displayName: 'Alice',
      yesterday: 'A',
      today: 'B',
      blockers: '',
      timestamp: new Date(),
    })
    store.set('U2', { userId: 'U2', yesterday: 'Incomplete' })

    const complete = store.getCompleteEntries()
    expect(complete).toHaveLength(1)
    expect(complete[0].displayName).toBe('Alice')
  })
})

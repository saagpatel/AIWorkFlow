import { describe, it, expect } from 'vitest'
import {
  classificationBlock,
  standupSummaryBlocks,
  actionItemsBlocks,
} from './slack-format.js'
import type { ClassificationResult, StandupEntry, ActionItem } from './types.js'

describe('classificationBlock', () => {
  it('should format a classification result', () => {
    const result: ClassificationResult = {
      category: 'bug',
      confidence: 0.92,
      reasoning: 'User reports broken functionality',
    }
    const blocks = classificationBlock(result, 'App crashes on login')

    expect(blocks).toHaveLength(3)
    expect(blocks[0].text!.text).toContain(':bug:')
    expect(blocks[0].text!.text).toContain('92%')
    expect(blocks[1].text!.text).toContain('App crashes on login')
    expect(blocks[2].text!.text).toContain('User reports broken functionality')
  })

  it('should handle each category emoji', () => {
    const categories = ['bug', 'feature_request', 'question', 'urgent'] as const
    const emojis = [':bug:', ':bulb:', ':question:', ':rotating_light:']

    categories.forEach((category, i) => {
      const blocks = classificationBlock(
        { category, confidence: 0.8, reasoning: 'test' },
        'test msg',
      )
      expect(blocks[0].text!.text).toContain(emojis[i])
    })
  })
})

describe('standupSummaryBlocks', () => {
  it('should handle empty entries', () => {
    const blocks = standupSummaryBlocks([], '2026-02-22')
    expect(blocks).toHaveLength(1)
    expect(blocks[0].text!.text).toContain('No submissions')
  })

  it('should format multiple entries', () => {
    const entries: StandupEntry[] = [
      {
        userId: 'U1',
        displayName: 'Alice',
        yesterday: 'Fixed bug',
        today: 'Review PR',
        blockers: '',
        timestamp: new Date(),
      },
      {
        userId: 'U2',
        displayName: 'Bob',
        yesterday: 'API work',
        today: 'Testing',
        blockers: 'Waiting on design',
        timestamp: new Date(),
      },
    ]
    const blocks = standupSummaryBlocks(entries, '2026-02-22')

    // header + 2 entry sections
    expect(blocks).toHaveLength(3)
    expect(blocks[0].text!.text).toContain('2026-02-22')
  })

  it('should show blockers when present', () => {
    const entries: StandupEntry[] = [
      {
        userId: 'U1',
        displayName: 'Alice',
        yesterday: 'Work',
        today: 'More work',
        blockers: 'Need API access',
        timestamp: new Date(),
      },
    ]
    const blocks = standupSummaryBlocks(entries, '2026-02-22')
    const fields = blocks[1].fields!
    const blockerField = fields.find((f) => f.text.includes('Blockers'))
    expect(blockerField!.text).toContain('Need API access')
  })
})

describe('actionItemsBlocks', () => {
  it('should handle empty items', () => {
    const blocks = actionItemsBlocks([])
    expect(blocks).toHaveLength(1)
    expect(blocks[0].text!.text).toContain('No action items')
  })

  it('should group items by priority', () => {
    const items: ActionItem[] = [
      { task: 'Deploy fix', owner: 'Alice', priority: 'high' },
      { task: 'Write docs', owner: 'Bob', priority: 'low' },
      { task: 'Code review', owner: 'Carol', priority: 'medium' },
    ]
    const blocks = actionItemsBlocks(items)

    // header + 3 priority sections
    expect(blocks).toHaveLength(4)
    expect(blocks[1].text!.text).toContain(':red_circle:')
    expect(blocks[1].text!.text).toContain('Deploy fix')
    expect(blocks[2].text!.text).toContain(':large_orange_circle:')
    expect(blocks[3].text!.text).toContain(':white_circle:')
  })

  it('should include deadline when present', () => {
    const items: ActionItem[] = [
      { task: 'Ship feature', owner: 'Alice', deadline: '2026-03-01', priority: 'high' },
    ]
    const blocks = actionItemsBlocks(items)
    expect(blocks[1].text!.text).toContain('due: 2026-03-01')
  })

  it('should skip empty priority groups', () => {
    const items: ActionItem[] = [
      { task: 'Only high', owner: 'Alice', priority: 'high' },
    ]
    const blocks = actionItemsBlocks(items)
    // header + 1 priority section (high only)
    expect(blocks).toHaveLength(2)
  })
})

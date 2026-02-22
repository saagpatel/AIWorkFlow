import type { ClassificationResult, StandupEntry, ActionItem } from './types.js'

interface Block {
  type: string
  text?: { type: string; text: string; emoji?: boolean }
  fields?: { type: string; text: string }[]
  elements?: { type: string; text: string }[]
}

const CATEGORY_EMOJI: Record<string, string> = {
  bug: ':bug:',
  feature_request: ':bulb:',
  question: ':question:',
  urgent: ':rotating_light:',
}

export function classificationBlock(
  result: ClassificationResult,
  originalMessage: string,
): Block[] {
  const emoji = CATEGORY_EMOJI[result.category] ?? ':label:'
  return [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `${emoji} *Classified as: ${result.category.replace('_', ' ')}*\n>Confidence: ${(result.confidence * 100).toFixed(0)}%`,
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*Original message:*\n>${originalMessage}`,
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*Reasoning:* ${result.reasoning}`,
      },
    },
  ]
}

export function standupSummaryBlocks(
  entries: StandupEntry[],
  date: string,
): Block[] {
  if (entries.length === 0) {
    return [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `:clipboard: *Standup Summary — ${date}*\n\nNo submissions received.`,
        },
      },
    ]
  }

  const blocks: Block[] = [
    {
      type: 'header',
      text: { type: 'plain_text', text: `Standup Summary — ${date}`, emoji: true },
    },
  ]

  for (const entry of entries) {
    blocks.push({
      type: 'section',
      fields: [
        { type: 'mrkdwn', text: `*${entry.displayName}*` },
        { type: 'mrkdwn', text: ' ' },
        { type: 'mrkdwn', text: `:rewind: *Yesterday:* ${entry.yesterday}` },
        { type: 'mrkdwn', text: `:arrow_forward: *Today:* ${entry.today}` },
        {
          type: 'mrkdwn',
          text: entry.blockers
            ? `:no_entry: *Blockers:* ${entry.blockers}`
            : ':white_check_mark: *Blockers:* None',
        },
      ],
    })
  }

  return blocks
}

export function actionItemsBlocks(items: ActionItem[]): Block[] {
  if (items.length === 0) {
    return [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: ':memo: *Action Items*\n\nNo action items found.',
        },
      },
    ]
  }

  const PRIORITY_EMOJI = { high: ':red_circle:', medium: ':large_orange_circle:', low: ':white_circle:' }

  const grouped = {
    high: items.filter((i) => i.priority === 'high'),
    medium: items.filter((i) => i.priority === 'medium'),
    low: items.filter((i) => i.priority === 'low'),
  }

  const blocks: Block[] = [
    {
      type: 'header',
      text: { type: 'plain_text', text: 'Action Items', emoji: true },
    },
  ]

  for (const [priority, group] of Object.entries(grouped)) {
    if (group.length === 0) continue

    const emoji = PRIORITY_EMOJI[priority as keyof typeof PRIORITY_EMOJI]
    const lines = group
      .map((item) => {
        const deadline = item.deadline ? ` _(due: ${item.deadline})_` : ''
        return `• ${item.task} — *${item.owner}*${deadline}`
      })
      .join('\n')

    blocks.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `${emoji} *${priority.charAt(0).toUpperCase() + priority.slice(1)} Priority*\n${lines}`,
      },
    })
  }

  return blocks
}

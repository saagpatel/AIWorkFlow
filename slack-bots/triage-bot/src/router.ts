import type { TicketCategory } from '@aiworkflow/shared'
import type { Config } from './config.js'

export interface RouteTarget {
  channelId: string
  emoji: string
  label: string
}

const ROUTE_MAP: Record<TicketCategory, { emoji: string; label: string; configKey: keyof Config }> = {
  bug: { emoji: 'bug', label: 'Bug Report', configKey: 'BUG_CHANNEL_ID' },
  feature_request: { emoji: 'bulb', label: 'Feature Request', configKey: 'FEATURE_CHANNEL_ID' },
  question: { emoji: 'question', label: 'Question', configKey: 'QUESTION_CHANNEL_ID' },
  urgent: { emoji: 'rotating_light', label: 'Urgent', configKey: 'URGENT_CHANNEL_ID' },
}

export function getRouteTarget(category: TicketCategory, config: Config): RouteTarget {
  const route = ROUTE_MAP[category]
  return {
    channelId: config[route.configKey] as string,
    emoji: route.emoji,
    label: route.label,
  }
}

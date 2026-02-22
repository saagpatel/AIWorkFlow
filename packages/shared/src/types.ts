import { z } from 'zod'

export const TicketCategory = z.enum(['bug', 'feature_request', 'question', 'urgent'])
export type TicketCategory = z.infer<typeof TicketCategory>

export const ClassificationResultSchema = z.object({
  category: TicketCategory,
  confidence: z.number().min(0).max(1),
  reasoning: z.string(),
})
export type ClassificationResult = z.infer<typeof ClassificationResultSchema>

export interface StandupEntry {
  userId: string
  displayName: string
  yesterday: string
  today: string
  blockers: string
  timestamp: Date
}

export const ActionItemSchema = z.object({
  task: z.string(),
  owner: z.string(),
  deadline: z.string().optional(),
  priority: z.enum(['high', 'medium', 'low']),
})
export type ActionItem = z.infer<typeof ActionItemSchema>

export const MeetingExtractionSchema = z.object({
  actionItems: z.array(ActionItemSchema),
  decisions: z.array(z.string()),
  keyTopics: z.array(z.string()),
  summary: z.string(),
})
export type MeetingExtraction = z.infer<typeof MeetingExtractionSchema>

import { z } from "zod"

export const ContactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  role: z.string().min(1),
})

export const EngagementSchema = z.object({
  company: z.string().min(1),
  contact: ContactSchema,
  plan: z.enum(["audit", "sprint", "retainer"]),
  start_date: z.string().date(),
  end_date: z.string().date().optional(),
  status: z.enum(["active", "completed", "paused"]),
})

export const AutomationSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  tool: z.string().min(1),
  status: z.enum(["active", "paused", "building"]),
  metrics_url: z.string().url().optional(),
})

export const MetricSchema = z.object({
  automation_name: z.string().min(1),
  metric: z.string().min(1),
  value: z.number(),
  period: z.string().min(1),
})

export type Contact = z.infer<typeof ContactSchema>
export type Engagement = z.infer<typeof EngagementSchema>
export type Automation = z.infer<typeof AutomationSchema>
export type Metric = z.infer<typeof MetricSchema>

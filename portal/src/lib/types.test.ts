import { describe, it, expect } from "vitest"
import {
  EngagementSchema,
  AutomationSchema,
  MetricSchema,
  ContactSchema,
} from "./types"

describe("ContactSchema", () => {
  it("should accept valid contact data", () => {
    const result = ContactSchema.safeParse({
      name: "Sarah Chen",
      email: "sarah@acme.com",
      role: "VP of Operations",
    })
    expect(result.success).toBe(true)
  })

  it("should reject invalid email", () => {
    const result = ContactSchema.safeParse({
      name: "Sarah",
      email: "not-email",
      role: "VP",
    })
    expect(result.success).toBe(false)
  })

  it("should reject empty name", () => {
    const result = ContactSchema.safeParse({
      name: "",
      email: "sarah@acme.com",
      role: "VP",
    })
    expect(result.success).toBe(false)
  })
})

describe("EngagementSchema", () => {
  const validEngagement = {
    company: "Acme Corp",
    contact: { name: "Sarah", email: "sarah@acme.com", role: "VP" },
    plan: "sprint",
    start_date: "2026-02-01",
    status: "active",
  }

  it("should accept valid engagement", () => {
    const result = EngagementSchema.safeParse(validEngagement)
    expect(result.success).toBe(true)
  })

  it("should accept optional end_date", () => {
    const result = EngagementSchema.safeParse({
      ...validEngagement,
      end_date: "2026-02-14",
    })
    expect(result.success).toBe(true)
  })

  it("should reject invalid plan type", () => {
    const result = EngagementSchema.safeParse({
      ...validEngagement,
      plan: "premium",
    })
    expect(result.success).toBe(false)
  })

  it("should reject invalid status", () => {
    const result = EngagementSchema.safeParse({
      ...validEngagement,
      status: "cancelled",
    })
    expect(result.success).toBe(false)
  })

  it("should reject invalid date format", () => {
    const result = EngagementSchema.safeParse({
      ...validEngagement,
      start_date: "Feb 1 2026",
    })
    expect(result.success).toBe(false)
  })
})

describe("AutomationSchema", () => {
  it("should accept valid automation", () => {
    const result = AutomationSchema.safeParse({
      name: "Triage Bot",
      description: "Classifies tickets",
      tool: "Slack + Claude",
      status: "active",
    })
    expect(result.success).toBe(true)
  })

  it("should accept optional metrics_url", () => {
    const result = AutomationSchema.safeParse({
      name: "Triage Bot",
      description: "Classifies tickets",
      tool: "Slack",
      status: "active",
      metrics_url: "https://example.com/metrics",
    })
    expect(result.success).toBe(true)
  })

  it("should reject invalid status", () => {
    const result = AutomationSchema.safeParse({
      name: "Bot",
      description: "Test",
      tool: "Slack",
      status: "disabled",
    })
    expect(result.success).toBe(false)
  })
})

describe("MetricSchema", () => {
  it("should accept valid metric", () => {
    const result = MetricSchema.safeParse({
      automation_name: "Triage Bot",
      metric: "Tickets Classified",
      value: 342,
      period: "Week 1",
    })
    expect(result.success).toBe(true)
  })

  it("should reject non-number value", () => {
    const result = MetricSchema.safeParse({
      automation_name: "Bot",
      metric: "Count",
      value: "many",
      period: "Week 1",
    })
    expect(result.success).toBe(false)
  })
})

import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { EngagementCard } from "./engagement-card"
import type { Engagement } from "@/lib/types"

const mockEngagement: Engagement = {
  company: "Acme Corp",
  contact: {
    name: "Sarah Chen",
    email: "sarah@acme.com",
    role: "VP of Operations",
  },
  plan: "sprint",
  start_date: "2026-02-01",
  end_date: "2026-02-14",
  status: "active",
}

describe("EngagementCard", () => {
  it("should display company name", () => {
    render(<EngagementCard engagement={mockEngagement} />)
    expect(screen.getByText("Acme Corp")).toBeInTheDocument()
  })

  it("should display plan label", () => {
    render(<EngagementCard engagement={mockEngagement} />)
    expect(screen.getByText("Implementation Sprint")).toBeInTheDocument()
  })

  it("should display contact name and role", () => {
    render(<EngagementCard engagement={mockEngagement} />)
    expect(screen.getByText("Sarah Chen")).toBeInTheDocument()
    expect(screen.getByText("VP of Operations")).toBeInTheDocument()
  })

  it("should display dates", () => {
    render(<EngagementCard engagement={mockEngagement} />)
    expect(screen.getByText("2026-02-01")).toBeInTheDocument()
    expect(screen.getByText("2026-02-14")).toBeInTheDocument()
  })

  it("should display email", () => {
    render(<EngagementCard engagement={mockEngagement} />)
    expect(screen.getByText("sarah@acme.com")).toBeInTheDocument()
  })

  it("should not render end date when absent", () => {
    const noEnd = { ...mockEngagement, end_date: undefined }
    render(<EngagementCard engagement={noEnd} />)
    expect(screen.queryByText("End Date")).not.toBeInTheDocument()
  })
})

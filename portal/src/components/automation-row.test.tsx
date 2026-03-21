import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { AutomationRow } from "./automation-row"
import type { Automation } from "@/lib/types"

const mockAutomation: Automation = {
  name: "Support Ticket Triage",
  description: "AI-powered classification of support tickets.",
  tool: "Slack Bot + Claude API",
  status: "active",
}

describe("AutomationRow", () => {
  it("should render automation name", () => {
    render(<AutomationRow automation={mockAutomation} />)
    expect(screen.getByText("Support Ticket Triage")).toBeInTheDocument()
  })

  it("should render description", () => {
    render(<AutomationRow automation={mockAutomation} />)
    expect(
      screen.getByText("AI-powered classification of support tickets.")
    ).toBeInTheDocument()
  })

  it("should render tool info", () => {
    render(<AutomationRow automation={mockAutomation} />)
    expect(
      screen.getByText("Tool: Slack Bot + Claude API")
    ).toBeInTheDocument()
  })

  it("should render status badge", () => {
    render(<AutomationRow automation={mockAutomation} />)
    expect(screen.getByText("Active")).toBeInTheDocument()
  })

  it("should render building status", () => {
    render(
      <AutomationRow automation={{ ...mockAutomation, status: "building" }} />
    )
    expect(screen.getByText("Building")).toBeInTheDocument()
  })
})

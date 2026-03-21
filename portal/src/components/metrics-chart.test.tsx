import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { MetricsChart } from "./metrics-chart"
import type { Metric } from "@/lib/types"

vi.mock("recharts", async (importOriginal) => {
  const actual = await importOriginal<typeof import("recharts")>()
  return {
    ...actual,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="responsive-container">{children}</div>
    ),
  }
})

const mockData: Metric[] = [
  { automation_name: "Triage Bot", metric: "Tickets", value: 342, period: "Week 1" },
  { automation_name: "Triage Bot", metric: "Tickets", value: 418, period: "Week 2" },
]

describe("MetricsChart", () => {
  it("should render chart title", () => {
    render(<MetricsChart title="Triage Bot — Tickets" data={mockData} />)
    expect(screen.getByText("Triage Bot — Tickets")).toBeInTheDocument()
  })

  it("should render responsive container", () => {
    render(<MetricsChart title="Test Chart" data={mockData} />)
    expect(screen.getByTestId("responsive-container")).toBeInTheDocument()
  })

  it("should handle empty data", () => {
    render(<MetricsChart title="Empty Chart" data={[]} />)
    expect(screen.getByText("Empty Chart")).toBeInTheDocument()
  })
})

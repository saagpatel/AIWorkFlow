import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { StatusBadge } from "./status-badge"

describe("StatusBadge", () => {
  it("should render active status with capitalized text", () => {
    render(<StatusBadge status="active" />)
    expect(screen.getByText("Active")).toBeInTheDocument()
  })

  it("should render building status", () => {
    render(<StatusBadge status="building" />)
    expect(screen.getByText("Building")).toBeInTheDocument()
  })

  it("should render paused status", () => {
    render(<StatusBadge status="paused" />)
    expect(screen.getByText("Paused")).toBeInTheDocument()
  })

  it("should render completed status", () => {
    render(<StatusBadge status="completed" />)
    expect(screen.getByText("Completed")).toBeInTheDocument()
  })

  it("should apply custom className", () => {
    const { container } = render(
      <StatusBadge status="active" className="extra-class" />
    )
    expect(container.firstChild).toHaveClass("extra-class")
  })
})

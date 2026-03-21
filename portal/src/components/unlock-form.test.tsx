import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { UnlockForm } from "./unlock-form"

vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams("client=acme-corp&redirect=/acme-corp"),
  useRouter: () => ({ push: vi.fn() }),
}))

vi.mock("@/app/unlock/actions", () => ({
  unlockClient: vi.fn(),
}))

describe("UnlockForm", () => {
  it("should render password input", () => {
    render(<UnlockForm />)
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument()
  })

  it("should render unlock button", () => {
    render(<UnlockForm />)
    expect(screen.getByRole("button", { name: "Unlock" })).toBeInTheDocument()
  })

  it("should render title", () => {
    render(<UnlockForm />)
    expect(screen.getByText("Enter Password")).toBeInTheDocument()
  })

  it("should include hidden client input", () => {
    const { container } = render(<UnlockForm />)
    const clientInput = container.querySelector('input[name="client"]')
    expect(clientInput).toHaveValue("acme-corp")
  })
})

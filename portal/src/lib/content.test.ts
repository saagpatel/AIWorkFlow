import { describe, it, expect, vi, beforeEach } from "vitest"
import fs from "fs"
import {
  getClientSlugs,
  getEngagement,
  getAutomations,
  getMetrics,
  getAuditContent,
} from "./content"

vi.mock("fs")

const mockFs = vi.mocked(fs)

beforeEach(() => {
  vi.restoreAllMocks()
})

describe("getClientSlugs", () => {
  it("should return directory names from content/clients", () => {
    mockFs.existsSync.mockReturnValue(true)
    mockFs.readdirSync.mockReturnValue([
      { name: "acme-corp", isDirectory: () => true },
      { name: "beta-inc", isDirectory: () => true },
      { name: ".DS_Store", isDirectory: () => false },
    ] as unknown as ReturnType<typeof fs.readdirSync>)

    expect(getClientSlugs()).toEqual(["acme-corp", "beta-inc"])
  })

  it("should return empty array when directory does not exist", () => {
    mockFs.existsSync.mockReturnValue(false)
    expect(getClientSlugs()).toEqual([])
  })
})

describe("getEngagement", () => {
  it("should parse valid engagement JSON", () => {
    mockFs.readFileSync.mockReturnValue(
      JSON.stringify({
        company: "Acme Corp",
        contact: { name: "Sarah", email: "sarah@acme.com", role: "VP" },
        plan: "sprint",
        start_date: "2026-02-01",
        status: "active",
      })
    )
    const result = getEngagement("acme-corp")
    expect(result.company).toBe("Acme Corp")
    expect(result.plan).toBe("sprint")
  })

  it("should throw on invalid data", () => {
    mockFs.readFileSync.mockReturnValue(JSON.stringify({ company: "" }))
    expect(() => getEngagement("bad")).toThrow()
  })
})

describe("getAutomations", () => {
  it("should parse valid automations array", () => {
    mockFs.readFileSync.mockReturnValue(
      JSON.stringify([
        {
          name: "Bot",
          description: "Does stuff",
          tool: "Slack",
          status: "active",
        },
      ])
    )
    const result = getAutomations("acme-corp")
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe("Bot")
  })
})

describe("getMetrics", () => {
  it("should parse valid metrics array", () => {
    mockFs.readFileSync.mockReturnValue(
      JSON.stringify([
        {
          automation_name: "Bot",
          metric: "Count",
          value: 42,
          period: "Week 1",
        },
      ])
    )
    const result = getMetrics("acme-corp")
    expect(result).toHaveLength(1)
    expect(result[0].value).toBe(42)
  })
})

describe("getAuditContent", () => {
  it("should return raw markdown string", () => {
    mockFs.readFileSync.mockReturnValue("# Audit Report\n\nContent here")
    const result = getAuditContent("acme-corp")
    expect(result).toContain("# Audit Report")
  })
})

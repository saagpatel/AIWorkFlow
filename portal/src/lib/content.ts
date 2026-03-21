import fs from "fs"
import path from "path"
import {
  EngagementSchema,
  AutomationSchema,
  MetricSchema,
  type Engagement,
  type Automation,
  type Metric,
} from "./types"

function contentDir() {
  return path.join(process.cwd(), "..", "content", "clients")
}

function clientDir(slug: string) {
  return path.join(contentDir(), slug)
}

export function getClientSlugs(): string[] {
  const dir = contentDir()
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
}

export function getEngagement(slug: string): Engagement {
  const filePath = path.join(clientDir(slug), "engagement.json")
  const raw = JSON.parse(fs.readFileSync(filePath, "utf-8"))
  return EngagementSchema.parse(raw)
}

export function getAutomations(slug: string): Automation[] {
  const filePath = path.join(clientDir(slug), "automations.json")
  const raw = JSON.parse(fs.readFileSync(filePath, "utf-8"))
  return AutomationSchema.array().parse(raw)
}

export function getMetrics(slug: string): Metric[] {
  const filePath = path.join(clientDir(slug), "metrics.json")
  const raw = JSON.parse(fs.readFileSync(filePath, "utf-8"))
  return MetricSchema.array().parse(raw)
}

export function getAuditContent(slug: string): string {
  const filePath = path.join(clientDir(slug), "audit.md")
  return fs.readFileSync(filePath, "utf-8")
}

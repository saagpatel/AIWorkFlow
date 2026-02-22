import type { StandupEntry } from '@aiworkflow/shared'

type PartialEntry = Partial<StandupEntry> & { userId: string }

const entries = new Map<string, PartialEntry>()

export function set(userId: string, data: Partial<StandupEntry>): void {
  const existing = entries.get(userId) ?? { userId }
  entries.set(userId, { ...existing, ...data })
}

export function get(userId: string): PartialEntry | undefined {
  return entries.get(userId)
}

export function getAll(): PartialEntry[] {
  return Array.from(entries.values())
}

export function clear(): void {
  entries.clear()
}

export function isComplete(userId: string): boolean {
  const entry = entries.get(userId)
  if (!entry) return false
  return !!(entry.yesterday && entry.today && entry.blockers !== undefined)
}

export function getCompleteEntries(): StandupEntry[] {
  return getAll().filter(
    (e): e is StandupEntry =>
      !!(e.yesterday && e.today && e.blockers !== undefined && e.displayName && e.timestamp),
  )
}

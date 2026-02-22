import { readFileSync } from 'node:fs'
import { extractMeetingNotes } from './extractor.js'
import type { MeetingExtraction } from '@aiworkflow/shared'

function formatOutput(extraction: MeetingExtraction): string {
  const lines: string[] = []

  lines.push('=== Meeting Notes Extraction ===\n')
  lines.push(`Summary: ${extraction.summary}\n`)

  lines.push('Key Topics:')
  for (const topic of extraction.keyTopics) {
    lines.push(`  - ${topic}`)
  }
  lines.push('')

  lines.push('Decisions:')
  if (extraction.decisions.length === 0) {
    lines.push('  (none)')
  } else {
    for (const decision of extraction.decisions) {
      lines.push(`  - ${decision}`)
    }
  }
  lines.push('')

  lines.push('Action Items:')
  const priorityOrder = ['high', 'medium', 'low'] as const
  for (const priority of priorityOrder) {
    const items = extraction.actionItems.filter((i) => i.priority === priority)
    if (items.length === 0) continue
    lines.push(`  [${priority.toUpperCase()}]`)
    for (const item of items) {
      const deadline = item.deadline ? ` (due: ${item.deadline})` : ''
      lines.push(`    - ${item.task} → ${item.owner}${deadline}`)
    }
  }

  return lines.join('\n')
}

async function main(): Promise<void> {
  let input: string

  const filePath = process.argv[2]
  if (filePath) {
    input = readFileSync(filePath, 'utf-8')
  } else if (!process.stdin.isTTY) {
    // Read from stdin pipe
    const chunks: Buffer[] = []
    for await (const chunk of process.stdin) {
      chunks.push(chunk)
    }
    input = Buffer.concat(chunks).toString('utf-8')
  } else {
    console.error('Usage: meeting-notes <file> or echo "notes" | meeting-notes')
    process.exit(1)
  }

  if (!input.trim()) {
    console.error('Error: Empty input')
    process.exit(1)
  }

  const extraction = await extractMeetingNotes(input)
  console.log(formatOutput(extraction))
}

main().catch((error) => {
  console.error('Error:', error.message)
  process.exit(1)
})

import { extractStructured, ClassificationResultSchema } from '@aiworkflow/shared'
import type { ClassificationResult } from '@aiworkflow/shared'
import { TRIAGE_SYSTEM_PROMPT } from './prompts.js'

export async function classifyTicket(message: string): Promise<ClassificationResult> {
  return extractStructured(TRIAGE_SYSTEM_PROMPT, message, ClassificationResultSchema)
}

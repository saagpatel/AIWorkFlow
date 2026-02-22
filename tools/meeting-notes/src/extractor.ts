import { extractStructured, MeetingExtractionSchema } from '@aiworkflow/shared'
import type { MeetingExtraction } from '@aiworkflow/shared'
import { EXTRACTION_SYSTEM_PROMPT } from './prompts.js'

export async function extractMeetingNotes(rawNotes: string): Promise<MeetingExtraction> {
  return extractStructured(EXTRACTION_SYSTEM_PROMPT, rawNotes, MeetingExtractionSchema)
}

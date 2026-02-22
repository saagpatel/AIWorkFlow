import type { WebClient } from '@slack/web-api'
import { actionItemsBlocks } from '@aiworkflow/shared'
import type { MeetingExtraction } from '@aiworkflow/shared'

export async function postToSlack(
  client: WebClient,
  channelId: string,
  extraction: MeetingExtraction,
): Promise<void> {
  const blocks = actionItemsBlocks(extraction.actionItems)

  // Add summary and decisions sections
  const summaryBlock = {
    type: 'section' as const,
    text: { type: 'mrkdwn' as const, text: `*Summary:* ${extraction.summary}` },
  }

  const decisionsText = extraction.decisions.length > 0
    ? extraction.decisions.map((d) => `• ${d}`).join('\n')
    : '_No decisions recorded_'

  const decisionsBlock = {
    type: 'section' as const,
    text: { type: 'mrkdwn' as const, text: `*Decisions:*\n${decisionsText}` },
  }

  const topicsBlock = {
    type: 'section' as const,
    text: {
      type: 'mrkdwn' as const,
      text: `*Key Topics:* ${extraction.keyTopics.join(', ')}`,
    },
  }

  await client.chat.postMessage({
    channel: channelId,
    blocks: [summaryBlock, topicsBlock, decisionsBlock, ...blocks],
    text: `Meeting Notes: ${extraction.summary}`,
  })
}

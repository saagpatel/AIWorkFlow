import type { WebClient } from '@slack/web-api'

export async function triggerStandup(
  client: WebClient,
  memberIds: string[],
): Promise<void> {
  for (const userId of memberIds) {
    try {
      // Open a DM with the user
      const dm = await client.conversations.open({ users: userId })
      if (!dm.channel?.id) continue

      await client.chat.postMessage({
        channel: dm.channel.id,
        text: "It's standup time! Click the button to submit your update.",
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: ":wave: *Daily Standup*\nTime to share your update!",
            },
          },
          {
            type: 'actions',
            elements: [
              {
                type: 'button',
                text: { type: 'plain_text', text: 'Submit Standup', emoji: true },
                action_id: 'open_standup_modal',
                style: 'primary',
              },
            ],
          },
        ],
      })
    } catch (error) {
      console.error(`Failed to send standup DM to ${userId}:`, error)
    }
  }
}

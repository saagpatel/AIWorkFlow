import { App } from '@slack/bolt'
import type { Config } from './config.js'
import { hasSlackConfig } from './config.js'
import { extractMeetingNotes } from './extractor.js'
import { postToSlack } from './slack-poster.js'
import { createGoogleTasks } from './google-tasks.js'

export function createApp(config: Config): App | null {
  if (!hasSlackConfig(config)) {
    console.log('Slack not configured — running in CLI-only mode')
    return null
  }

  const app = new App({
    token: config.SLACK_BOT_TOKEN,
    signingSecret: config.SLACK_SIGNING_SECRET,
  })

  // Slash command opens modal
  app.command('/meeting-notes', async ({ ack, body, client }) => {
    await ack()

    await client.views.open({
      trigger_id: body.trigger_id,
      view: {
        type: 'modal',
        callback_id: 'meeting_notes_submission',
        title: { type: 'plain_text', text: 'Meeting Notes' },
        submit: { type: 'plain_text', text: 'Extract' },
        blocks: [
          {
            type: 'input',
            block_id: 'notes_block',
            element: {
              type: 'plain_text_input',
              action_id: 'notes_input',
              multiline: true,
              placeholder: {
                type: 'plain_text',
                text: 'Paste your raw meeting notes here...',
              },
            },
            label: { type: 'plain_text', text: 'Meeting Notes' },
          },
        ],
      },
    })
  })

  // Handle modal submission
  app.view('meeting_notes_submission', async ({ ack, view, client }) => {
    await ack()

    const rawNotes = view.state.values.notes_block.notes_input.value ?? ''
    if (!rawNotes.trim()) return

    try {
      const extraction = await extractMeetingNotes(rawNotes)

      // Post to configured channel
      if (config.MEETING_NOTES_CHANNEL_ID) {
        await postToSlack(client, config.MEETING_NOTES_CHANNEL_ID, extraction)
      }

      // Create Google Tasks (graceful failure)
      await createGoogleTasks(extraction.actionItems, config)
    } catch (error) {
      console.error('Error processing meeting notes:', error)
    }
  })

  return app
}

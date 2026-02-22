import type { App } from '@slack/bolt'
import * as store from './store.js'

export function registerCollectors(app: App): void {
  // Handle button click — open modal
  app.action('open_standup_modal', async ({ ack, body, client }) => {
    await ack()

    if (!('trigger_id' in body)) return

    await client.views.open({
      trigger_id: body.trigger_id,
      view: {
        type: 'modal',
        callback_id: 'standup_submission',
        title: { type: 'plain_text', text: 'Daily Standup' },
        submit: { type: 'plain_text', text: 'Submit' },
        blocks: [
          {
            type: 'input',
            block_id: 'yesterday_block',
            element: {
              type: 'plain_text_input',
              action_id: 'yesterday_input',
              multiline: true,
              placeholder: { type: 'plain_text', text: 'What did you work on yesterday?' },
            },
            label: { type: 'plain_text', text: 'Yesterday' },
          },
          {
            type: 'input',
            block_id: 'today_block',
            element: {
              type: 'plain_text_input',
              action_id: 'today_input',
              multiline: true,
              placeholder: { type: 'plain_text', text: "What are you working on today?" },
            },
            label: { type: 'plain_text', text: 'Today' },
          },
          {
            type: 'input',
            block_id: 'blockers_block',
            optional: true,
            element: {
              type: 'plain_text_input',
              action_id: 'blockers_input',
              multiline: true,
              placeholder: { type: 'plain_text', text: 'Any blockers? Leave blank if none.' },
            },
            label: { type: 'plain_text', text: 'Blockers' },
          },
        ],
      },
    })
  })

  // Handle modal submission
  app.view('standup_submission', async ({ ack, body, view, client }) => {
    await ack()

    const userId = body.user.id
    const values = view.state.values
    const yesterday = values.yesterday_block.yesterday_input.value ?? ''
    const today = values.today_block.today_input.value ?? ''
    const blockers = values.blockers_block.blockers_input.value ?? ''

    // Fetch display name
    let displayName = userId
    try {
      const userInfo = await client.users.info({ user: userId })
      displayName = userInfo.user?.real_name ?? userInfo.user?.name ?? userId
    } catch {
      // Fall back to userId
    }

    store.set(userId, {
      userId,
      displayName,
      yesterday,
      today,
      blockers,
      timestamp: new Date(),
    })
  })
}

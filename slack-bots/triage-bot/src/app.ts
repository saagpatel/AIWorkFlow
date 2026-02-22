import { App } from '@slack/bolt'
import { classificationBlock } from '@aiworkflow/shared'
import type { Config } from './config.js'
import { classifyTicket } from './classifier.js'
import { getRouteTarget } from './router.js'

export function createApp(config: Config): App {
  const app = new App({
    token: config.SLACK_BOT_TOKEN,
    signingSecret: config.SLACK_SIGNING_SECRET,
  })

  app.message(async ({ message, client }) => {
    // Only handle messages in the support channel
    if (!('channel' in message) || message.channel !== config.SUPPORT_CHANNEL_ID) return

    // Skip bot messages, edits, and subtypes
    if ('subtype' in message && message.subtype) return
    if ('bot_id' in message && message.bot_id) return
    if (!('text' in message) || !message.text) return

    const text = message.text
    const ts = 'ts' in message ? message.ts : undefined
    if (!ts) return

    try {
      const classification = await classifyTicket(text)
      const route = getRouteTarget(classification.category, config)
      const blocks = classificationBlock(classification, text)

      // Post to target channel
      await client.chat.postMessage({
        channel: route.channelId,
        blocks,
        text: `${route.label}: ${text}`,
      })

      // Add reaction to original message
      await client.reactions.add({
        channel: config.SUPPORT_CHANNEL_ID,
        timestamp: ts,
        name: route.emoji,
      })
    } catch (error) {
      console.error('Error classifying message:', error)
    }
  })

  return app
}

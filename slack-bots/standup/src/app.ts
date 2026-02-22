import { App } from '@slack/bolt'
import cron from 'node-cron'
import type { Config } from './config.js'
import { registerCollectors } from './collectors.js'
import { triggerStandup } from './trigger-standup.js'
import { postSummary } from './summarizer.js'

const SUMMARY_DELAY_MS = 2 * 60 * 60 * 1000 // 2 hours

export function createApp(config: Config): App {
  const app = new App({
    token: config.SLACK_BOT_TOKEN,
    signingSecret: config.SLACK_SIGNING_SECRET,
  })

  registerCollectors(app)

  // Schedule standup trigger
  cron.schedule(config.STANDUP_CRON, async () => {
    console.log('Triggering standup DMs...')
    await triggerStandup(app.client, config.TEAM_MEMBER_IDS)

    // Post summary after timeout
    setTimeout(async () => {
      console.log('Posting standup summary...')
      await postSummary(app.client, config)
    }, SUMMARY_DELAY_MS)
  })

  return app
}

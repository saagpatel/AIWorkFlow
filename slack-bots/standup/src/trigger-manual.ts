import { App } from '@slack/bolt'
import { loadConfig } from './config.js'
import { triggerStandup } from './trigger-standup.js'

const config = loadConfig()
const app = new App({
  token: config.SLACK_BOT_TOKEN,
  signingSecret: config.SLACK_SIGNING_SECRET,
})

;(async () => {
  console.log('Manually triggering standup DMs...')
  await triggerStandup(app.client, config.TEAM_MEMBER_IDS)
  console.log('Done.')
  process.exit(0)
})()

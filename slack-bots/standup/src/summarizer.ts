import type { WebClient } from '@slack/web-api'
import { standupSummaryBlocks } from '@aiworkflow/shared'
import * as store from './store.js'
import { logToSheets } from './sheets.js'
import type { Config } from './config.js'

export async function postSummary(client: WebClient, config: Config): Promise<void> {
  const entries = store.getCompleteEntries()
  const date = new Date().toISOString().split('T')[0]
  const blocks = standupSummaryBlocks(entries, date)

  await client.chat.postMessage({
    channel: config.STANDUP_CHANNEL_ID,
    blocks,
    text: `Standup Summary — ${date}`,
  })

  // Log to Google Sheets (graceful failure)
  await logToSheets(entries, config)

  // Clear store for next day
  store.clear()
}

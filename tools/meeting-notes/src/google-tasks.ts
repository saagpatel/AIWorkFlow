import { google } from 'googleapis'
import type { ActionItem } from '@aiworkflow/shared'
import type { Config } from './config.js'
import { hasGoogleTasksConfig } from './config.js'

function getTasksClient(config: Config) {
  if (!hasGoogleTasksConfig(config)) return null

  const auth = new google.auth.OAuth2(
    config.GOOGLE_CLIENT_ID,
    config.GOOGLE_CLIENT_SECRET,
  )
  auth.setCredentials({ refresh_token: config.GOOGLE_REFRESH_TOKEN })

  return google.tasks({ version: 'v1', auth })
}

export async function createGoogleTasks(
  items: ActionItem[],
  config: Config,
): Promise<void> {
  const client = getTasksClient(config)
  if (!client) {
    console.log('Google Tasks not configured — skipping task creation')
    return
  }

  // Get default task list
  const taskLists = await client.tasklists.list()
  const defaultList = taskLists.data.items?.[0]
  if (!defaultList?.id) {
    console.error('No task list found in Google Tasks')
    return
  }

  for (const item of items) {
    try {
      await client.tasks.insert({
        tasklist: defaultList.id,
        requestBody: {
          title: `[${item.priority.toUpperCase()}] ${item.task}`,
          notes: `Owner: ${item.owner}${item.deadline ? `\nDeadline: ${item.deadline}` : ''}`,
          due: item.deadline ? new Date(item.deadline).toISOString() : undefined,
        },
      })
    } catch (error) {
      console.error(`Failed to create Google Task for "${item.task}":`, error)
    }
  }
}

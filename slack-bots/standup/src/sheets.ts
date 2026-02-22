import { google } from 'googleapis'
import type { StandupEntry } from '@aiworkflow/shared'
import type { Config } from './config.js'

function getSheetsClient(config: Config) {
  if (!config.GOOGLE_SERVICE_ACCOUNT_EMAIL || !config.GOOGLE_PRIVATE_KEY || !config.GOOGLE_SHEETS_SPREADSHEET_ID) {
    return null
  }

  const auth = new google.auth.JWT(
    config.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    undefined,
    config.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    ['https://www.googleapis.com/auth/spreadsheets'],
  )

  return { sheets: google.sheets({ version: 'v4', auth }), spreadsheetId: config.GOOGLE_SHEETS_SPREADSHEET_ID }
}

export async function logToSheets(entries: StandupEntry[], config: Config): Promise<void> {
  const client = getSheetsClient(config)
  if (!client) {
    console.log('Google Sheets not configured — skipping log')
    return
  }

  const rows = entries.map((entry) => [
    new Date().toISOString().split('T')[0],
    entry.displayName,
    entry.yesterday,
    entry.today,
    entry.blockers || 'None',
  ])

  try {
    await client.sheets.spreadsheets.values.append({
      spreadsheetId: client.spreadsheetId,
      range: 'Standups!A:E',
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: rows },
    })
  } catch (error) {
    console.error('Failed to log to Google Sheets:', error)
  }
}

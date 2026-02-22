import { loadConfig } from './config.js'
import { createApp } from './app.js'

const config = loadConfig()
const app = createApp(config)

;(async () => {
  await app.start(config.PORT)
  console.log(`Triage bot running on port ${config.PORT}`)
})()

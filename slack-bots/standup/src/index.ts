import { loadConfig } from './config.js'
import { createApp } from './app.js'

const config = loadConfig()
const app = createApp(config)

;(async () => {
  await app.start(config.PORT)
  console.log(`Standup bot running on port ${config.PORT}`)
})()

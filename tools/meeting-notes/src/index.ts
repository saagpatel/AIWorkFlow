import { loadConfig } from './config.js'
import { createApp } from './app.js'

const config = loadConfig()
const app = createApp(config)

if (app) {
  ;(async () => {
    await app.start(config.PORT)
    console.log(`Meeting notes app running on port ${config.PORT}`)
  })()
} else {
  console.log('Meeting notes tool available in CLI mode only.')
  console.log('Usage: pnpm extract <file>')
}

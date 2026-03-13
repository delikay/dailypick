import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import {
  handleSuggestionSubmission,
  readJsonRequestBody,
} from './server/submitSuggestion.js'

const localSubmitApi = () => ({
  name: 'local-submit-api',
  configureServer(server) {
    server.middlewares.use('/api/submit', async (request, response, next) => {
      if (request.method !== 'POST') {
        return next()
      }

      try {
        const payload = await readJsonRequestBody(request)
        const { status, body } = await handleSuggestionSubmission(payload)

        response.statusCode = status
        response.setHeader('Content-Type', 'application/json')
        response.end(JSON.stringify(body))
      } catch {
        response.statusCode = 500
        response.setHeader('Content-Type', 'application/json')
        response.end(
          JSON.stringify({ error: 'Unable to process your submission.' }),
        )
      }
    })
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), localSubmitApi()],
})

import express from 'express'
import Anthropic from '@anthropic-ai/sdk'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { buildSystemPrompt, buildUserPrompt } from './src/lib/icp-prompt.js'
import { parseScoreResponse } from './src/lib/score-parser.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = 3001

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

app.use(express.json())
app.use(express.static(join(__dirname, 'dist')))

app.post('/api/score', async (req, res) => {
  try {
    const prospect = req.body

    if (!prospect.companyName || !prospect.industry || !prospect.primaryPain) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1500,
      system: buildSystemPrompt(),
      messages: [
        { role: 'user', content: buildUserPrompt(prospect) }
      ],
    })

    const text = message.content[0].text
    const result = parseScoreResponse(text)
    res.json(result)
  } catch (err) {
    console.error('Scoring error:', err)
    res.status(500).json({ error: 'Failed to score prospect. Please try again.' })
  }
})

app.get('/{*splat}', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`ICP Qualifier API running at http://localhost:${PORT}`)
})

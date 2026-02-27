import express from 'express'
import { appendFile, access, mkdir } from 'fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = 3000
const CSV_PATH = join(__dirname, 'data', 'applications.csv')

const HEADERS = 'ID,Submitted At,Full Name,Email,Role & Company,Revenue Range,Bottleneck,Why You'

app.use(express.json())
app.use(express.static(join(__dirname, 'dist')))

function escapeCsv(value) {
  const str = String(value).replace(/"/g, '""')
  return /[,"\n\r]/.test(str) ? `"${str}"` : str
}

app.post('/api/apply', async (req, res) => {
  try {
    const { fullName, email, roleCompany, revenueRange, bottleneck, whyYou } = req.body
    const id = crypto.randomUUID()
    const submittedAt = new Date().toISOString()

    await mkdir(join(__dirname, 'data'), { recursive: true })

    let fileExists = true
    try { await access(CSV_PATH) } catch { fileExists = false }

    const row = [id, submittedAt, fullName, email, roleCompany, revenueRange, bottleneck, whyYou]
      .map(escapeCsv)
      .join(',')

    const content = fileExists ? `\n${row}` : `${HEADERS}\n${row}`
    await appendFile(CSV_PATH, content, 'utf-8')

    res.json({ success: true, id })
  } catch (err) {
    console.error('Error saving application:', err)
    res.status(500).json({ success: false, error: 'Failed to save application' })
  }
})

app.get('/{*splat}', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Mastermind server running at http://localhost:${PORT}`)
})

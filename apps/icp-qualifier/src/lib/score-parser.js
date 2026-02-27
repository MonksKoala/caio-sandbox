export function parseScoreResponse(text) {
  const jsonMatch = text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) {
    throw new Error('No JSON found in response')
  }

  const parsed = JSON.parse(jsonMatch[0])

  if (typeof parsed.score !== 'number' || parsed.score < 0 || parsed.score > 100) {
    throw new Error('Invalid score value')
  }

  return {
    score: Math.round(parsed.score),
    verdict: parsed.verdict || 'Unknown',
    summary: parsed.summary || '',
    categories: parsed.categories || [],
    strengths: parsed.strengths || [],
    risks: parsed.risks || [],
    recommendations: parsed.recommendations || [],
    qualificationTier: parsed.qualificationTier || 'Unknown',
  }
}

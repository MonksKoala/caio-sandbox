import { useState, useCallback } from 'react'

export function useScoreHistory() {
    const [history, setHistory] = useState([])

    const addScore = useCallback((prospect, result) => {
        const entry = {
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            prospect,
            result,
            scoredAt: new Date().toISOString(),
        }
        setHistory(prev => [entry, ...prev])
        return entry
    }, [])

    const clearHistory = useCallback(() => setHistory([]), [])

    return { history, addScore, clearHistory }
}

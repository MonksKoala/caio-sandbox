import { useState, useCallback } from 'react'
import NoiseOverlay from './components/NoiseOverlay.jsx'
import Navbar from './components/Navbar.jsx'
import ProspectForm from './components/ProspectForm.jsx'
import LoadingState from './components/LoadingState.jsx'
import ScoreDisplay from './components/ScoreDisplay.jsx'
import HistoryPanel from './components/HistoryPanel.jsx'
import { useScoreHistory } from './hooks/useScoreHistory.js'
import { scoreProspect } from './lib/score-prospect.js'
import { exportToCSV } from './lib/csv-export.js'

export default function App() {
  const [page, setPage] = useState('form') // form | loading | result | error
  const [currentProspect, setCurrentProspect] = useState(null)
  const [currentResult, setCurrentResult] = useState(null)
  const [activeHistoryId, setActiveHistoryId] = useState(null)
  const [error, setError] = useState(null)
  const [showHistory, setShowHistory] = useState(false)

  const { history, addScore, clearHistory } = useScoreHistory()

  const handleSubmit = useCallback(async (prospect) => {
    setCurrentProspect(prospect)
    setPage('loading')
    setError(null)

    try {
      const result = await scoreProspect(prospect)
      const entry = addScore(prospect, result)
      setCurrentResult(result)
      setActiveHistoryId(entry.id)
      setPage('result')
    } catch (err) {
      setError(err.message)
      setPage('error')
    }
  }, [addScore])

  const handleScoreAnother = useCallback(() => {
    setCurrentProspect(null)
    setCurrentResult(null)
    setActiveHistoryId(null)
    setPage('form')
  }, [])

  const handleHistorySelect = useCallback((id) => {
    const entry = history.find(h => h.id === id)
    if (entry) {
      setCurrentResult(entry.result)
      setCurrentProspect(entry.prospect)
      setActiveHistoryId(id)
      setPage('result')
    }
  }, [history])

  const handleExport = useCallback(() => {
    exportToCSV(history)
  }, [history])

  const handleClear = useCallback(() => {
    clearHistory()
    if (page === 'result') {
      handleScoreAnother()
    }
  }, [clearHistory, page, handleScoreAnother])

  return (
    <div className="min-h-screen bg-offwhite">
      <NoiseOverlay />

      <Navbar
        showNew={page !== 'form'}
        onNew={handleScoreAnother}
      />

      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Main Content */}
        <main className="flex-1 pt-20 pb-12 px-4 md:px-8">
          {page === 'form' && (
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <h1 className="font-drama italic text-4xl md:text-5xl text-ink mb-3">
                  Qualify Your Prospect
                </h1>
                <p className="font-heading text-ink/50 text-sm max-w-md mx-auto">
                  Enter prospect details below. AI will score their ICP fit across 5 categories and provide actionable recommendations.
                </p>
              </div>
              <ProspectForm onSubmit={handleSubmit} />
            </div>
          )}

          {page === 'loading' && (
            <LoadingState prospect={currentProspect} />
          )}

          {page === 'result' && currentResult && (
            <ScoreDisplay
              result={currentResult}
              onScoreAnother={handleScoreAnother}
            />
          )}

          {page === 'error' && (
            <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
              <div className="bg-offwhite border border-signal/20 rounded-[2rem] p-8 md:p-12 max-w-md">
                <div className="w-12 h-12 rounded-full bg-signal/10 flex items-center justify-center mx-auto mb-5">
                  <span className="text-signal text-xl font-bold">!</span>
                </div>
                <h2 className="font-heading font-bold text-lg text-ink mb-3">
                  Analysis Failed
                </h2>
                <p className="text-ink/50 text-sm mb-6">
                  {error || 'Something went wrong. Please try again.'}
                </p>
                <button
                  onClick={handleScoreAnother}
                  className="btn-magnetic bg-signal text-offwhite font-heading font-bold text-sm uppercase tracking-widest py-3 px-6 rounded-xl"
                >
                  <span className="btn-bg bg-ink" />
                  <span className="relative z-10">Try Again</span>
                </button>
              </div>
            </div>
          )}
        </main>

        {/* History Sidebar — desktop */}
        <aside className="hidden lg:block w-80 border-l border-ink/10 bg-paper/50 p-6 pt-20 overflow-y-auto max-h-screen sticky top-0">
          <HistoryPanel
            history={history}
            activeId={activeHistoryId}
            onSelect={handleHistorySelect}
            onExport={handleExport}
            onClear={handleClear}
          />
        </aside>

        {/* History Toggle — mobile */}
        {history.length > 0 && (
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="lg:hidden fixed bottom-6 right-6 z-40 w-12 h-12 bg-ink text-offwhite rounded-full flex items-center justify-center shadow-lg"
          >
            <span className="font-mono text-xs font-bold">{history.length}</span>
          </button>
        )}

        {/* History Drawer — mobile */}
        {showHistory && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div
              className="absolute inset-0 bg-ink/30 backdrop-blur-sm"
              onClick={() => setShowHistory(false)}
            />
            <div className="relative ml-auto w-80 bg-paper h-full overflow-y-auto p-6 pt-8 shadow-2xl">
              <button
                onClick={() => setShowHistory(false)}
                className="absolute top-4 right-4 font-mono text-xs text-ink/40 hover:text-ink transition-colors"
              >
                Close
              </button>
              <HistoryPanel
                history={history}
                activeId={activeHistoryId}
                onSelect={(id) => {
                  handleHistorySelect(id)
                  setShowHistory(false)
                }}
                onExport={handleExport}
                onClear={handleClear}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

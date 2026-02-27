import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react'

const RING_CIRCUMFERENCE = 283

function getScoreColor(score) {
  if (score >= 80) return 'text-signal'
  if (score >= 60) return 'text-amber-500'
  if (score >= 40) return 'text-ink/50'
  return 'text-ink/30'
}

function getScoreStrokeColor(score) {
  if (score >= 80) return '#E63B2E'
  if (score >= 60) return '#f59e0b'
  if (score >= 40) return 'rgba(17,17,17,0.5)'
  return 'rgba(17,17,17,0.3)'
}

function getRingOffset(score) {
  return RING_CIRCUMFERENCE - (score / 100) * RING_CIRCUMFERENCE
}

export default function ScoreDisplay({ result, onScoreAnother }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return
    const sections = containerRef.current.querySelectorAll('[data-animate]')
    gsap.from(sections, {
      y: 30,
      opacity: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power3.out',
    })
  }, [])

  const {
    score,
    verdict,
    summary,
    categories,
    strengths,
    risks,
    recommendations,
    qualificationTier,
  } = result

  const scoreColor = getScoreColor(score)
  const strokeColor = getScoreStrokeColor(score)
  const ringOffset = getRingOffset(score)

  return (
    <div ref={containerRef} className="max-w-3xl mx-auto space-y-8 px-4 py-10">

      {/* 1. Score Hero */}
      <div data-animate className="bg-offwhite border border-ink/10 rounded-[2rem] p-6 md:p-8 flex flex-col items-center text-center">
        {/* SVG Ring Gauge */}
        <div className="relative mb-6">
          <svg
            width="180"
            height="180"
            viewBox="0 0 100 100"
            className="-rotate-90"
          >
            {/* Track */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="rgba(17,17,17,0.08)"
              strokeWidth="6"
              strokeLinecap="round"
            />
            {/* Score arc */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={strokeColor}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={RING_CIRCUMFERENCE}
              strokeDashoffset={ringOffset}
              style={{ transition: 'stroke-dashoffset 1s ease' }}
            />
          </svg>
          {/* Score number centered over ring */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`font-drama italic text-7xl md:text-8xl leading-none ${scoreColor}`}>
              {score}
            </span>
          </div>
        </div>

        {/* Verdict */}
        <h2 className="font-heading font-bold text-xl text-ink mb-3">
          {verdict}
        </h2>

        {/* Qualification tier badge */}
        <span className="inline-block font-mono text-xs uppercase tracking-widest bg-ink text-offwhite px-4 py-1.5 rounded-full mb-5">
          {qualificationTier}
        </span>

        {/* Summary */}
        <p className="text-ink/60 leading-relaxed max-w-xl">
          {summary}
        </p>
      </div>

      {/* 2. Category Breakdown */}
      <div data-animate>
        <h3 className="font-heading font-bold text-lg text-ink mb-4">
          Category Breakdown
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="bg-offwhite border border-ink/10 rounded-[2rem] p-6 flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="font-heading font-semibold text-ink text-sm leading-tight">
                  {cat.name}
                </span>
                <span className="font-mono text-xs text-ink/40 shrink-0">
                  {cat.weight}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 bg-ink/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-signal rounded-full"
                  style={{ width: `${cat.score}%` }}
                />
              </div>

              {/* Score label */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-ink/40">Score</span>
                <span className="font-mono text-xs font-bold text-signal">
                  {cat.score}
                </span>
              </div>

              {/* Reasoning */}
              <p className="text-sm text-ink/60 leading-relaxed">
                {cat.reasoning}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Strengths & Risks */}
      <div data-animate className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Strengths */}
        <div className="bg-offwhite border border-ink/10 rounded-[2rem] p-6 md:p-8">
          <h3 className="font-heading font-bold text-lg text-ink mb-5">
            Strengths
          </h3>
          <ul className="space-y-3">
            {strengths.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle
                  size={18}
                  className="text-emerald-600 shrink-0 mt-0.5"
                />
                <span className="text-sm text-ink/70 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Risks */}
        <div className="bg-offwhite border border-ink/10 rounded-[2rem] p-6 md:p-8">
          <h3 className="font-heading font-bold text-lg text-ink mb-5">
            Risks
          </h3>
          <ul className="space-y-3">
            {risks.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <AlertTriangle
                  size={18}
                  className="text-signal shrink-0 mt-0.5"
                />
                <span className="text-sm text-ink/70 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 4. Recommendations */}
      <div data-animate className="bg-offwhite border border-ink/10 rounded-[2rem] p-6 md:p-8">
        <h3 className="font-heading font-bold text-lg text-ink mb-6">
          Recommendations
        </h3>
        <ol className="space-y-5">
          {recommendations.map((rec, i) => (
            <li key={i} className="flex items-start gap-4">
              <span className="font-mono text-signal font-bold text-lg leading-tight shrink-0 w-6 text-right">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="flex items-start gap-2 flex-1">
                <ArrowRight size={16} className="text-signal shrink-0 mt-0.5" />
                <span className="text-ink/70 leading-relaxed text-sm">{rec}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* 5. Action Bar */}
      <div data-animate className="flex justify-center pt-2">
        <button
          type="button"
          onClick={onScoreAnother}
          className="btn-magnetic bg-signal text-offwhite font-heading font-bold text-sm uppercase tracking-widest py-4 px-8 rounded-xl"
        >
          <span className="btn-bg bg-ink" />
          <span className="relative z-10 flex items-center gap-3">
            Score Another Prospect
            <ArrowRight size={16} />
          </span>
        </button>
      </div>

    </div>
  )
}

import { useRef, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import StatusDot from './StatusDot.jsx'
import { HERO } from '../data/content.js'

function RotatingMotif() {
  return (
    <svg
      className="spin-slow absolute bottom-4 right-4 md:bottom-8 md:right-8 w-24 h-24 md:w-36 md:h-36 text-signal/10 pointer-events-none"
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.5"
    >
      <circle cx="50" cy="50" r="45" />
      <circle cx="50" cy="50" r="30" />
      <line x1="50" y1="5" x2="50" y2="95" />
      <line x1="5" y1="50" x2="95" y2="50" />
      <line x1="15" y1="15" x2="85" y2="85" />
      <line x1="85" y1="15" x2="15" y2="85" />
    </svg>
  )
}

export default function HeroPanel({ onContactClick }) {
  const heroRef = useRef(null)

  return (
    <div
      ref={heroRef}
      className="relative bg-paper border-b md:border-b-0 md:border-r border-ink/10
                 h-[30dvh] md:h-full
                 flex flex-col justify-between
                 p-5 md:p-8 lg:p-12
                 md:w-[42%] shrink-0 overflow-hidden"
    >
      {/* Top label */}
      <div className="hero-label font-mono text-[10px] uppercase tracking-[0.2em] text-ink/20">
        Portfolio — 2025
      </div>

      {/* Identity block */}
      <div className="hero-identity flex-1 flex flex-col items-center justify-center md:justify-end md:pb-8">
        {/* Avatar */}
        <div className="hero-avatar w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden border-2 border-ink/10 mb-3 md:mb-4">
          <img
            src={`${import.meta.env.BASE_URL}avatar.jpg`}
            alt="Gabriel Lacsam"
            className="w-full h-full object-cover object-[center_50%] scale-125"
          />
        </div>
        <h1 className="hero-name font-drama italic text-3xl md:text-5xl lg:text-6xl text-ink leading-[1.1] mb-2 md:mb-3 text-center">
          {HERO.name}
        </h1>
        <p className="hero-title font-mono text-[11px] md:text-xs uppercase tracking-[0.15em] text-signal mb-2 md:mb-4">
          {HERO.title}
        </p>
        <p className="hero-bio hidden md:block font-heading text-sm text-ink/50 leading-relaxed max-w-[280px] mb-4">
          {HERO.bio}
        </p>
        <div className="hero-status hidden md:block mb-4">
          <StatusDot active={HERO.availableForWork} />
        </div>
      </div>

      {/* CTA */}
      <div className="hero-cta hidden md:block">
        <button
          onClick={onContactClick}
          className="btn-magnetic inline-flex items-center gap-2 bg-signal text-offwhite font-mono text-xs uppercase tracking-widest px-6 py-3 rounded-full"
        >
          <span className="btn-bg bg-ink" />
          <span className="relative z-10 flex items-center gap-2">
            {HERO.ctaLabel}
            <ArrowRight size={14} />
          </span>
        </button>
      </div>

      <RotatingMotif />
    </div>
  )
}

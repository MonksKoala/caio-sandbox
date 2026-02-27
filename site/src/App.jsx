import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Check, Search, Sparkles, Clock, Send } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ──────────────────────────────────────────────
   NOISE OVERLAY (global SVG filter)
   ────────────────────────────────────────────── */
function NoiseOverlay() {
  return (
    <svg className="noise-overlay" aria-hidden="true">
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  )
}

/* ──────────────────────────────────────────────
   NAVBAR — "The Floating Island"
   ────────────────────────────────────────────── */
function Navbar({ onApply }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('hero')
    if (!hero) return

    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0.1 }
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 md:px-8 md:py-3 flex items-center gap-3 md:gap-8 transition-all duration-500 rounded-full ${
        scrolled
          ? 'bg-paper/60 backdrop-blur-xl border border-paper/30 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <span className={`font-mono text-sm font-bold tracking-[0.2em] transition-colors duration-500 ${scrolled ? 'text-ink' : 'text-offwhite'}`}>
        MASTERMIND
      </span>
      <div className={`hidden md:flex items-center gap-6 text-sm font-heading transition-colors duration-500 ${scrolled ? 'text-ink' : 'text-offwhite/80'}`}>
        <a href="#features" className="hover-lift">Protocol</a>
        <a href="#philosophy" className="hover-lift">Philosophy</a>
        <a href="#process" className="hover-lift">Process</a>
        <a href="#pricing" className="hover-lift">Tiers</a>
      </div>
      <button
        onClick={onApply}
        className="btn-magnetic ml-1 md:ml-2 px-3 md:px-5 py-2 bg-signal text-offwhite text-xs md:text-sm font-heading font-semibold rounded-full"
      >
        <span className="btn-bg bg-ink"></span>
        <span className="relative z-10">Apply Now</span>
      </button>
    </nav>
  )
}

/* ──────────────────────────────────────────────
   HERO — "The Opening Shot"
   ────────────────────────────────────────────── */
function Hero({ onApply }) {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.hero-line-1', { y: 40, opacity: 0, duration: 1, delay: 0.3 })
        .from('.hero-line-2', { y: 40, opacity: 0, duration: 1 }, '-=0.7')
        .from('.hero-sub', { y: 30, opacity: 0, duration: 0.8 }, '-=0.5')
        .from('.hero-cta', { y: 30, opacity: 0, duration: 0.8 }, '-=0.4')
        .from('.hero-stat', { y: 20, opacity: 0, duration: 0.6, stagger: 0.1 }, '-=0.3')
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative h-[100dvh] flex items-end overflow-hidden"
    >
      {/* Background image — dark brutalist building at sunset */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/images/runners.jpg')`,
        }}
      />
      {/* Heavy dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/90 to-ink/40" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-16 md:pb-24">
        <p className="hero-line-1 font-heading text-offwhite/80 text-xl md:text-3xl font-bold tracking-tight mb-2">
          Enter the
        </p>
        <h1 className="hero-line-2 font-drama italic text-offwhite text-[3.5rem] md:text-[10rem] lg:text-[13rem] leading-[0.85] -ml-1">
          2%.
        </h1>
        <p className="hero-sub font-heading text-offwhite/60 text-base md:text-xl max-w-xl mt-6 leading-relaxed">
          Elite consulting &amp; training for those who refuse average. Rigorous selection. Radical transformation.
        </p>
        <button
          onClick={onApply}
          className="hero-cta btn-magnetic inline-flex items-center gap-2 mt-6 md:mt-8 px-6 py-3 md:px-8 md:py-4 bg-signal text-offwhite font-heading font-semibold rounded-full text-base md:text-lg"
        >
          <span className="btn-bg bg-offwhite"></span>
          <span className="relative z-10 flex items-center gap-2">
            Join the Waitlist <ArrowRight size={20} />
          </span>
        </button>
        <div className="flex flex-wrap gap-4 md:gap-8 mt-8 md:mt-12">
          <div className="hero-stat">
            <span className="font-mono text-signal text-2xl font-bold">2%</span>
            <p className="font-heading text-offwhite/40 text-xs mt-1">Acceptance Rate</p>
          </div>
          <div className="hero-stat">
            <span className="font-mono text-signal text-2xl font-bold">12wk</span>
            <p className="font-heading text-offwhite/40 text-xs mt-1">Program Length</p>
          </div>
          <div className="hero-stat">
            <span className="font-mono text-signal text-2xl font-bold">847</span>
            <p className="font-heading text-offwhite/40 text-xs mt-1">Alumni Network</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────
   FEATURE CARD 1 — Diagnostic Shuffler
   ────────────────────────────────────────────── */
function DiagnosticShuffler() {
  const [stack, setStack] = useState([
    { label: 'Market Analysis', color: 'bg-signal/10 border-signal/20' },
    { label: 'Competitive Intel', color: 'bg-ink/5 border-ink/10' },
    { label: 'Pattern Recognition', color: 'bg-paper border-ink/10' },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setStack((prev) => {
        const next = [...prev]
        next.unshift(next.pop())
        return next
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-offwhite border border-ink/10 rounded-[2rem] p-6 md:p-8 shadow-sm h-full">
      <div className="flex items-center gap-2 mb-2">
        <Search size={18} className="text-signal" />
        <h3 className="font-heading font-bold text-lg">Deep Research</h3>
      </div>
      <p className="font-heading text-ink/50 text-sm mb-8">
        We excavate what others overlook. Three layers of analysis before a single recommendation.
      </p>
      <div className="relative h-44">
        {stack.map((card, i) => (
          <div
            key={card.label}
            className={`absolute left-0 right-0 ${card.color} border rounded-2xl px-5 py-4 font-mono text-sm transition-all duration-500`}
            style={{
              top: `${i * 16}px`,
              zIndex: 3 - i,
              transform: `scale(${1 - i * 0.04})`,
              opacity: 1 - i * 0.15,
              transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <span className="text-signal font-bold mr-2">0{i + 1}</span>
            {card.label}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────
   FEATURE CARD 2 — Telemetry Typewriter
   ────────────────────────────────────────────── */
function TelemetryTypewriter() {
  const messages = [
    '> Analyzing creative constraints...',
    '> Synthesizing novel frameworks...',
    '> Cross-referencing 847 case studies...',
    '> Pattern match: 94.2% confidence...',
    '> Generating strategic blueprint...',
    '> Output ready. Deploying insight.',
  ]
  const [displayLines, setDisplayLines] = useState([])
  const [currentMsg, setCurrentMsg] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)

  useEffect(() => {
    if (currentMsg >= messages.length) {
      const timeout = setTimeout(() => {
        setDisplayLines([])
        setCurrentMsg(0)
        setCurrentChar(0)
      }, 2000)
      return () => clearTimeout(timeout)
    }

    const timeout = setTimeout(() => {
      const msg = messages[currentMsg]
      if (currentChar < msg.length) {
        setDisplayLines((prev) => {
          const next = [...prev]
          next[currentMsg] = msg.slice(0, currentChar + 1)
          return next
        })
        setCurrentChar((c) => c + 1)
      } else {
        setCurrentMsg((m) => m + 1)
        setCurrentChar(0)
      }
    }, currentChar === 0 ? 400 : 30)
    return () => clearTimeout(timeout)
  }, [currentMsg, currentChar])

  return (
    <div className="bg-offwhite border border-ink/10 rounded-[2rem] p-6 md:p-8 shadow-sm h-full">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles size={18} className="text-signal" />
        <h3 className="font-heading font-bold text-lg">Creative Generation</h3>
      </div>
      <p className="font-heading text-ink/50 text-sm mb-6">
        Original thinking, not recycled templates. Every output is a first-of-its-kind artifact.
      </p>
      <div className="flex items-center gap-2 mb-3">
        <span className="w-2 h-2 rounded-full bg-signal pulse-dot"></span>
        <span className="font-mono text-xs text-signal">Live Feed</span>
      </div>
      <div className="bg-ink rounded-xl p-4 h-40 overflow-hidden">
        {displayLines.map((line, i) => (
          <p key={i} className="font-mono text-xs text-offwhite/70 leading-relaxed">
            {line}
            {i === displayLines.length - 1 && currentMsg < messages.length && (
              <span className="cursor-blink text-signal ml-0.5">|</span>
            )}
          </p>
        ))}
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────
   FEATURE CARD 3 — Cursor Protocol Scheduler
   ────────────────────────────────────────────── */
function CursorScheduler() {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
  const [activeDays, setActiveDays] = useState([])
  const [cursorPos, setCursorPos] = useState({ x: -20, y: -20, visible: false })
  const [pressing, setPressing] = useState(null)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const sequence = [1, 3, 5]
    let step = 0
    let cancelled = false

    const runStep = () => {
      if (cancelled) return
      if (step < sequence.length) {
        const dayIndex = sequence[step]
        const col = dayIndex % 7
        const x = col * 44 + 22
        const y = 22

        setCursorPos({ x, y, visible: true })

        setTimeout(() => {
          if (cancelled) return
          setPressing(dayIndex)
          setTimeout(() => {
            if (cancelled) return
            setPressing(null)
            setActiveDays((prev) => [...prev, dayIndex])
            step++
            setTimeout(runStep, 400)
          }, 200)
        }, 400)
      } else {
        setCursorPos({ x: 130, y: 70, visible: true })
        setTimeout(() => {
          if (cancelled) return
          setSaved(true)
          setTimeout(() => {
            if (cancelled) return
            setCursorPos({ x: 130, y: 70, visible: false })
            setTimeout(() => {
              if (cancelled) return
              setActiveDays([])
              setSaved(false)
              step = 0
              runStep()
            }, 1500)
          }, 800)
        }, 500)
      }
    }

    const timeout = setTimeout(runStep, 1000)
    return () => { cancelled = true; clearTimeout(timeout) }
  }, [])

  return (
    <div className="bg-offwhite border border-ink/10 rounded-[2rem] p-6 md:p-8 shadow-sm h-full">
      <div className="flex items-center gap-2 mb-2">
        <Clock size={18} className="text-signal" />
        <h3 className="font-heading font-bold text-lg">Workflow Automation</h3>
      </div>
      <p className="font-heading text-ink/50 text-sm mb-6">
        Systems that run without you. Protocols that compound results week after week.
      </p>
      <div className="relative bg-ink/5 rounded-xl p-5">
        <div className="grid grid-cols-7 gap-2 mb-4">
          {days.map((day, i) => (
            <div
              key={i}
              className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center font-mono text-[10px] md:text-xs font-bold transition-all duration-200 ${
                activeDays.includes(i)
                  ? 'bg-signal text-offwhite'
                  : 'bg-offwhite text-ink/40 border border-ink/10'
              } ${pressing === i ? 'scale-95' : ''}`}
            >
              {day}
            </div>
          ))}
        </div>
        <div
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all duration-300 ${
            saved ? 'bg-signal text-offwhite' : 'bg-ink/10 text-ink/50'
          }`}
        >
          {saved ? <Check size={12} /> : null}
          {saved ? 'Saved' : 'Save'}
        </div>
        {cursorPos.visible && (
          <svg
            className="absolute pointer-events-none transition-all duration-300 ease-out"
            style={{ left: cursorPos.x + 16, top: cursorPos.y + 16, width: 20, height: 20 }}
            viewBox="0 0 24 24"
            fill="none"
          >
            <path d="M5 3l14 8-6 2-3 7z" fill="#E63B2E" stroke="#111" strokeWidth="1" />
          </svg>
        )}
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────
   FEATURES SECTION
   ────────────────────────────────────────────── */
function Features() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
        },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="features" ref={ref} className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <p className="font-mono text-signal text-xs tracking-[0.3em] uppercase mb-3">The Protocol</p>
      <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-4">
        Three pillars. Zero filler.
      </h2>
      <p className="font-heading text-ink/50 max-w-xl mb-16">
        Every element of the Mastermind system is engineered for measurable, compounding results.
      </p>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="feature-card"><DiagnosticShuffler /></div>
        <div className="feature-card"><TelemetryTypewriter /></div>
        <div className="feature-card"><CursorScheduler /></div>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────
   PHILOSOPHY — "The Manifesto"
   ────────────────────────────────────────────── */
function Philosophy() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = ref.current.querySelectorAll('.word')
      gsap.from(words, {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.04,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 70%',
        },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const splitWords = (text, className = '') =>
    text.split(' ').map((w, i) => (
      <span key={i} className={`word inline-block mr-[0.3em] ${className}`}>
        {w}
      </span>
    ))

  return (
    <section
      id="philosophy"
      ref={ref}
      className="relative py-20 md:py-32 lg:py-48 px-6 md:px-12 bg-ink overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.07]"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1464618663641-bbdd760ae84b?w=1920&q=80')`,
        }}
      />
      <div className="relative z-10 max-w-5xl mx-auto">
        <p className="font-mono text-signal text-xs tracking-[0.3em] uppercase mb-12 word">
          Philosophy
        </p>
        <p className="text-offwhite/40 font-heading text-xl md:text-2xl mb-8 leading-relaxed">
          {splitWords('Most consulting focuses on: broad advice for the masses. Generic playbooks. Scalable mediocrity.')}
        </p>
        <p className="text-offwhite font-heading text-2xl md:text-5xl lg:text-6xl leading-tight">
          {splitWords('We focus on:')}
          <br />
          <span className="font-drama italic text-signal">
            {splitWords('surgical precision', 'text-signal')}
          </span>
          <br />
          {splitWords('for the exceptional few.')}
        </p>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────
   PROTOCOL — "Sticky Stacking Archive"
   ────────────────────────────────────────────── */

function RotatingMotif() {
  const ref = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(ref.current, { rotation: 360, duration: 20, repeat: -1, ease: 'none' })
    }, ref)
    return () => ctx.revert()
  }, [])
  return (
    <svg ref={ref} width="120" height="120" viewBox="0 0 120 120" className="opacity-20">
      {[0, 30, 60, 90, 120, 150].map((angle) => (
        <line key={angle} x1="60" y1="10" x2="60" y2="110" stroke="#E63B2E" strokeWidth="1" transform={`rotate(${angle} 60 60)`} />
      ))}
      <circle cx="60" cy="60" r="40" stroke="#E63B2E" strokeWidth="1" fill="none" />
      <circle cx="60" cy="60" r="20" stroke="#E63B2E" strokeWidth="1" fill="none" />
    </svg>
  )
}

function ScanningLaser() {
  const lineRef = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(lineRef.current, {
        attr: { y1: 100, y2: 100 },
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
      })
    })
    return () => ctx.revert()
  }, [])
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" className="opacity-20">
      {Array.from({ length: 36 }).map((_, i) => (
        <circle key={i} cx={(i % 6) * 20 + 10} cy={Math.floor(i / 6) * 20 + 10} r="2" fill="#E63B2E" opacity="0.3" />
      ))}
      <line ref={lineRef} x1="0" y1="0" x2="120" y2="0" stroke="#E63B2E" strokeWidth="2" />
    </svg>
  )
}

function PulsingWaveform() {
  const pathRef = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const length = pathRef.current.getTotalLength()
      gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length })
      gsap.to(pathRef.current, {
        strokeDashoffset: 0,
        duration: 3,
        repeat: -1,
        ease: 'power2.inOut',
      })
    })
    return () => ctx.revert()
  }, [])
  return (
    <svg width="200" height="80" viewBox="0 0 200 80" className="opacity-30">
      <path
        ref={pathRef}
        d="M0,40 L30,40 L35,10 L40,70 L45,20 L50,60 L55,40 L80,40 L85,10 L90,70 L95,20 L100,60 L105,40 L130,40 L135,10 L140,70 L145,20 L150,60 L155,40 L200,40"
        stroke="#E63B2E" strokeWidth="2" fill="none"
      />
    </svg>
  )
}

function Protocol() {
  const ref = useRef(null)
  const cardsRef = useRef([])

  const steps = [
    {
      num: '01',
      title: 'Apply',
      desc: 'Submit your application. We review every detail — your track record, your ambition, your capacity for transformation.',
      Visual: RotatingMotif,
    },
    {
      num: '02',
      title: 'Evaluate',
      desc: 'Rigorous multi-stage assessment. Only 2% make the cut. This is not a formality — it is a filter.',
      Visual: ScanningLaser,
    },
    {
      num: '03',
      title: 'Transform',
      desc: 'Twelve weeks of immersive, high-density training that rewires how you think, build, and operate.',
      Visual: PulsingWaveform,
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (i < steps.length - 1) {
          ScrollTrigger.create({
            trigger: card,
            start: 'top top',
            endTrigger: cardsRef.current[i + 1],
            end: 'top top',
            pin: true,
            pinSpacing: false,
            onUpdate: (self) => {
              gsap.to(card, {
                scale: 1 - self.progress * 0.1,
                filter: `blur(${self.progress * 10}px)`,
                opacity: 1 - self.progress * 0.5,
                duration: 0.1,
              })
            },
          })
        }
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="process" ref={ref} className="relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-8">
        <p className="font-mono text-signal text-xs tracking-[0.3em] uppercase mb-3">The Process</p>
        <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-4">
          How it works
        </h2>
      </div>
      {steps.map((step, i) => (
        <div
          key={step.num}
          ref={(el) => (cardsRef.current[i] = el)}
          className="min-h-[70vh] md:h-screen flex items-center justify-center px-6 md:px-12 py-8 md:py-0"
        >
          <div className="w-full max-w-4xl bg-offwhite border border-ink/10 rounded-[2rem] p-8 md:p-12 lg:p-16 shadow-lg relative overflow-hidden">
            <div className="absolute top-8 right-8">
              <step.Visual />
            </div>
            <span className="font-mono text-signal text-sm">{step.num}</span>
            <h3 className="font-heading text-3xl md:text-4xl lg:text-6xl font-bold mt-4 mb-6">{step.title}</h3>
            <p className="font-heading text-ink/50 text-lg max-w-md leading-relaxed">{step.desc}</p>
          </div>
        </div>
      ))}
    </section>
  )
}

/* ──────────────────────────────────────────────
   PRICING / MEMBERSHIP
   ────────────────────────────────────────────── */
function Pricing({ onApply }) {
  const ref = useRef(null)

  const tiers = [
    {
      name: 'Foundation',
      price: '$5,000',
      period: 'one-time',
      features: [
        'Self-paced curriculum access',
        'Community forum access',
        'Monthly group Q&A sessions',
        'Resource library',
      ],
      featured: false,
    },
    {
      name: 'Accelerator',
      price: '$15,000',
      period: 'per quarter',
      features: [
        'Everything in Foundation',
        '1-on-1 weekly coaching calls',
        'Custom strategy blueprints',
        'Private Slack channel',
        'Live workshop access',
      ],
      featured: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'annual',
      features: [
        'Everything in Accelerator',
        'On-site consulting days',
        'Team training programs',
        'Executive advisory board',
        'Priority support line',
        'Custom integrations',
      ],
      featured: false,
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.pricing-card', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 75%',
        },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="pricing" ref={ref} className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <p className="font-mono text-signal text-xs tracking-[0.3em] uppercase mb-3">Membership</p>
      <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-4">
        Choose your tier
      </h2>
      <p className="font-heading text-ink/50 max-w-xl mb-16">
        Every tier includes our proven methodology. The difference is depth and access.
      </p>
      <div className="grid md:grid-cols-3 gap-6">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`pricing-card rounded-[2rem] p-8 ${
              tier.featured
                ? 'bg-ink text-offwhite ring-2 ring-signal md:scale-[1.02]'
                : 'bg-offwhite border border-ink/10 text-ink'
            }`}
          >
            <h3 className="font-heading font-bold text-lg mb-1">{tier.name}</h3>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="font-heading text-4xl font-bold">{tier.price}</span>
              <span className={`font-mono text-xs ${tier.featured ? 'text-offwhite/50' : 'text-ink/40'}`}>
                {tier.period}
              </span>
            </div>
            <ul className="space-y-3 mb-8">
              {tier.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm font-heading">
                  <Check size={16} className="mt-0.5 shrink-0 text-signal" />
                  <span className={tier.featured ? 'text-offwhite/80' : 'text-ink/60'}>{f}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={onApply}
              className={`btn-magnetic block w-full text-center py-3 rounded-full font-heading font-semibold text-sm ${
                tier.featured
                  ? 'bg-signal text-offwhite'
                  : 'bg-ink text-offwhite'
              }`}
            >
              <span className={`btn-bg ${tier.featured ? 'bg-offwhite' : 'bg-signal'}`}></span>
              <span className="relative z-10">Join the Waitlist</span>
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────
   FOOTER
   ────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="bg-ink rounded-t-[2rem] md:rounded-t-[4rem] text-offwhite pt-12 md:pt-20 pb-8 px-6 md:px-12 mt-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16">
          <div>
            <span className="font-mono text-sm font-bold tracking-[0.2em]">MASTERMIND</span>
            <p className="font-heading text-offwhite/40 text-sm mt-3 leading-relaxed">
              Elite consulting &amp; training.<br />Only 2% are accepted.
            </p>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-sm mb-4">Protocol</h4>
            <ul className="space-y-2">
              {['Deep Research', 'Creative Generation', 'Workflow Automation'].map((item) => (
                <li key={item}>
                  <a href="#features" className="font-heading text-offwhite/40 text-sm hover-lift inline-block hover:text-offwhite transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-2">
              {['About', 'Careers', 'Press', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="font-heading text-offwhite/40 text-sm hover-lift inline-block hover:text-offwhite transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-sm mb-4">Legal</h4>
            <ul className="space-y-2">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <li key={item}>
                  <a href="#" className="font-heading text-offwhite/40 text-sm hover-lift inline-block hover:text-offwhite transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-offwhite/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-offwhite/30 text-xs">
            &copy; 2026 Mastermind. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 pulse-dot"></span>
            <span className="font-mono text-offwhite/40 text-xs">System Operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ──────────────────────────────────────────────
   APPLICATION FORM — "Apply to Mastermind"
   ────────────────────────────────────────────── */
function ApplicationForm({ onSubmit }) {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    roleCompany: '',
    revenueRange: '',
    bottleneck: '',
    whyYou: '',
  })
  const formRef = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    const ctx = gsap.context(() => {
      gsap.from('.form-element', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.2,
      })
    }, formRef)
    return () => ctx.revert()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
    } catch {
      // Fallback silently — confirmation page shows regardless
    }
    onSubmit()
  }

  const inputClass =
    'w-full bg-offwhite/5 border border-offwhite/15 rounded-xl px-5 py-3.5 text-offwhite font-heading text-sm placeholder:text-offwhite/25 focus:outline-none focus:border-signal focus:ring-1 focus:ring-signal/30 transition-colors'

  return (
    <div ref={formRef} className="min-h-screen bg-ink flex flex-col">
      {/* Logo header */}
      <div className="form-element pt-12 pb-8 text-center">
        <span className="font-mono text-sm font-bold tracking-[0.2em] text-offwhite">
          MASTERMIND
        </span>
      </div>

      {/* Form container */}
      <div className="flex-1 flex items-start justify-center px-6 pb-20">
        <div className="w-full max-w-lg">
          <h1 className="form-element font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-offwhite mb-2 text-center">
            Apply to Mastermind
          </h1>
          <p className="form-element font-heading text-offwhite/40 text-sm mb-10 text-center">
            This takes 60 seconds. We review every word.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="form-element">
              <label className="block font-mono text-xs text-offwhite/50 mb-2 tracking-wide">
                FULL NAME
              </label>
              <input
                type="text"
                name="fullName"
                required
                value={form.fullName}
                onChange={handleChange}
                placeholder="Your full name"
                className={inputClass}
              />
            </div>

            <div className="form-element">
              <label className="block font-mono text-xs text-offwhite/50 mb-2 tracking-wide">
                EMAIL
              </label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@company.com"
                className={inputClass}
              />
            </div>

            <div className="form-element">
              <label className="block font-mono text-xs text-offwhite/50 mb-2 tracking-wide">
                CURRENT ROLE & COMPANY
              </label>
              <input
                type="text"
                name="roleCompany"
                required
                value={form.roleCompany}
                onChange={handleChange}
                placeholder="CEO at Acme Corp"
                className={inputClass}
              />
            </div>

            <div className="form-element">
              <label className="block font-mono text-xs text-offwhite/50 mb-2 tracking-wide">
                ANNUAL REVENUE / BUDGET RANGE
              </label>
              <select
                name="revenueRange"
                required
                value={form.revenueRange}
                onChange={handleChange}
                className={`${inputClass} ${!form.revenueRange ? 'text-offwhite/25' : ''}`}
              >
                <option value="" disabled>Select a range</option>
                <option value="0-100K">$0 — $100K</option>
                <option value="100K-500K">$100K — $500K</option>
                <option value="500K-1M">$500K — $1M</option>
                <option value="1M-5M">$1M — $5M</option>
                <option value="5M+">$5M+</option>
              </select>
            </div>

            <div className="form-element">
              <label className="block font-mono text-xs text-offwhite/50 mb-2 tracking-wide">
                WHAT'S THE #1 BOTTLENECK IN YOUR BUSINESS RIGHT NOW?
              </label>
              <textarea
                name="bottleneck"
                required
                maxLength={200}
                rows={3}
                value={form.bottleneck}
                onChange={handleChange}
                placeholder="Be specific. We value clarity."
                className={`${inputClass} resize-none`}
              />
              <p className="font-mono text-xs text-offwhite/20 mt-1 text-right">
                {form.bottleneck.length}/200
              </p>
            </div>

            <div className="form-element">
              <label className="block font-mono text-xs text-offwhite/50 mb-2 tracking-wide">
                WHY SHOULD WE ACCEPT YOU?
              </label>
              <textarea
                name="whyYou"
                required
                maxLength={300}
                rows={3}
                value={form.whyYou}
                onChange={handleChange}
                placeholder="Convince us in a few sentences."
                className={`${inputClass} resize-none`}
              />
              <p className="font-mono text-xs text-offwhite/20 mt-1 text-right">
                {form.whyYou.length}/300
              </p>
            </div>

            <div className="form-element relative z-10 mt-8">
              <button
                type="submit"
                className="btn-magnetic w-full flex items-center justify-center gap-2 py-4 bg-signal text-offwhite font-heading font-semibold rounded-full text-base"
              >
                <span className="btn-bg bg-offwhite"></span>
                <span className="relative z-10 flex items-center gap-2">
                  Submit Application <Send size={18} />
                </span>
              </button>
            </div>

            <p className="form-element font-mono text-offwhite/20 text-xs text-center mt-6 pb-4">
              Your data is reviewed personally. We never share it.
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────
   CONFIRMATION — "Application Received"
   ────────────────────────────────────────────── */
function ApplicationConfirmation() {
  const ref = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.confirm-logo', { opacity: 0, duration: 0.8, delay: 0.3 })
        .from('.confirm-heading', { y: 30, opacity: 0, duration: 0.8 }, '-=0.4')
        .from('.confirm-sub', { y: 20, opacity: 0, duration: 0.6 }, '-=0.3')
        .from('.confirm-status', { y: 15, opacity: 0, duration: 0.5 }, '-=0.2')
        .from('.confirm-line', { scaleX: 0, duration: 0.8 }, '-=0.3')
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref} className="min-h-screen bg-ink flex flex-col items-center justify-center px-6">
      <span className="confirm-logo font-mono text-sm font-bold tracking-[0.2em] text-offwhite/40 mb-16">
        MASTERMIND
      </span>

      <div className="confirm-line w-12 h-px bg-signal mb-12"></div>

      <h1 className="confirm-heading font-heading text-3xl md:text-4xl lg:text-6xl font-bold text-offwhite text-center mb-6">
        Application Received.
      </h1>

      <p className="confirm-sub font-heading text-offwhite/40 text-base md:text-lg text-center max-w-md leading-relaxed mb-12">
        We review every submission personally. If you're in the 2%, you'll hear from us within 7 days.
      </p>

      <div className="confirm-status flex items-center gap-3 bg-offwhite/5 border border-offwhite/10 rounded-full px-6 py-3">
        <span className="w-2 h-2 rounded-full bg-signal pulse-dot"></span>
        <span className="font-mono text-xs text-offwhite/50 tracking-wide">
          Status: Under Review
        </span>
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────
   LANDING PAGE (wraps all landing sections)
   ────────────────────────────────────────────── */
function LandingPage({ onApply }) {
  return (
    <>
      <Navbar onApply={onApply} />
      <Hero onApply={onApply} />
      <Features />
      <Philosophy />
      <Protocol />
      <Pricing onApply={onApply} />
      <Footer />
    </>
  )
}

/* ──────────────────────────────────────────────
   APP — State-based routing
   ────────────────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState('landing')

  const goTo = (newPage) => {
    if (newPage !== 'landing') {
      window.history.pushState({ page: 'landing' }, '', '')
    }
    setPage(newPage)
  }

  useEffect(() => {
    const handlePopState = () => {
      setPage('landing')
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  return (
    <>
      <NoiseOverlay />
      {page === 'landing' && (
        <LandingPage onApply={() => goTo('apply')} />
      )}
      {page === 'apply' && (
        <ApplicationForm onSubmit={() => setPage('confirmed')} />
      )}
      {page === 'confirmed' && (
        <ApplicationConfirmation />
      )}
    </>
  )
}

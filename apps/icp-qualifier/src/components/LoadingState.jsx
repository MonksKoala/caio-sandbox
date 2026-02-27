import { useState, useEffect, useRef } from 'react'

const MESSAGES = [
    'Evaluating company fit signals...',
    'Assessing pain urgency & trigger events...',
    'Mapping budget alignment to deal size...',
    'Analyzing tech stack compatibility...',
    'Scoring decision-maker access...',
    'Calibrating ICP match score...',
    'Synthesizing qualification tier...',
    'Generating strategic recommendations...',
]

export default function LoadingState({ prospect }) {
    const [displayText, setDisplayText] = useState('')
    const [msgIndex, setMsgIndex] = useState(0)
    const [charIndex, setCharIndex] = useState(0)
    const [phase, setPhase] = useState('typing') // typing | pausing | clearing
    const timeoutRef = useRef(null)

    useEffect(() => {
        const currentMsg = MESSAGES[msgIndex]

        if (phase === 'typing') {
            if (charIndex < currentMsg.length) {
                timeoutRef.current = setTimeout(() => {
                    setDisplayText(currentMsg.slice(0, charIndex + 1))
                    setCharIndex(c => c + 1)
                }, 28)
            } else {
                // Done typing — pause before clearing
                timeoutRef.current = setTimeout(() => setPhase('clearing'), 1400)
            }
        } else if (phase === 'clearing') {
            if (displayText.length > 0) {
                timeoutRef.current = setTimeout(() => {
                    setDisplayText(t => t.slice(0, -1))
                }, 12)
            } else {
                const next = (msgIndex + 1) % MESSAGES.length
                setMsgIndex(next)
                setCharIndex(0)
                setPhase('typing')
            }
        }

        return () => clearTimeout(timeoutRef.current)
    }, [phase, charIndex, msgIndex, displayText])

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
            {/* Animated signal bars */}
            <div className="flex items-end gap-1.5 mb-10 h-12">
                {[4, 7, 10, 7, 5, 9, 6, 8, 4, 7].map((h, i) => (
                    <div
                        key={i}
                        className="w-1.5 bg-signal rounded-full"
                        style={{
                            height: `${h * 4}px`,
                            animation: `signal-bar 1.2s ease-in-out infinite alternate`,
                            animationDelay: `${i * 0.1}s`,
                        }}
                    />
                ))}
            </div>

            {/* Prospect name */}
            {prospect?.companyName && (
                <p className="font-mono text-xs uppercase tracking-widest text-ink/40 mb-6">
                    Analyzing — {prospect.companyName}
                </p>
            )}

            {/* Live analysis label */}
            <div className="flex items-center gap-2 mb-4">
                <span className="pulse-dot w-2 h-2 rounded-full bg-signal inline-block" />
                <span className="font-mono text-xs text-signal uppercase tracking-widest">
                    AI Analysis Running
                </span>
            </div>

            {/* Typewriter message */}
            <div className="relative font-mono text-sm text-ink/70 min-h-[1.5rem]">
                {displayText}
                <span className="cursor-blink ml-0.5 text-signal">|</span>
            </div>

            {/* Scoring categories progress */}
            <div className="mt-12 w-full max-w-xs space-y-3">
                {['Company Fit', 'Pain & Urgency', 'Budget Alignment', 'Technical Fit', 'Buying Authority'].map((cat, i) => (
                    <div key={cat} className="flex items-center gap-3">
                        <span className="font-mono text-xs text-ink/30 w-32 text-right shrink-0">{cat}</span>
                        <div className="flex-1 h-0.5 bg-ink/10 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-signal rounded-full"
                                style={{
                                    animation: `scan-bar 2.5s ease-in-out infinite`,
                                    animationDelay: `${i * 0.3}s`,
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <style>{`
        @keyframes signal-bar {
          from { transform: scaleY(0.3); opacity: 0.4; }
          to { transform: scaleY(1); opacity: 1; }
        }
        @keyframes scan-bar {
          0% { width: 0%; margin-left: 0%; }
          50% { width: 60%; margin-left: 20%; }
          100% { width: 0%; margin-left: 100%; }
        }
      `}</style>
        </div>
    )
}

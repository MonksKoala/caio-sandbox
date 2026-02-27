import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import WorkTab from './tabs/WorkTab.jsx'
import SkillsTab from './tabs/SkillsTab.jsx'
import ContactTab from './tabs/ContactTab.jsx'

const TAB_COMPONENTS = {
  work: WorkTab,
  skills: SkillsTab,
  contact: ContactTab,
}

export default function ContentZone({ activeTab }) {
  const containerRef = useRef(null)
  const panelRefs = useRef({})
  const [rendered, setRendered] = useState(false)
  const prevTabRef = useRef(activeTab)

  // Initial render — show active panel immediately
  useEffect(() => {
    if (!containerRef.current) return
    Object.entries(panelRefs.current).forEach(([id, el]) => {
      if (!el) return
      if (id === activeTab) {
        gsap.set(el, { opacity: 1, y: 0, visibility: 'visible', pointerEvents: 'auto' })
      } else {
        gsap.set(el, { opacity: 0, y: 0, visibility: 'hidden', pointerEvents: 'none' })
      }
    })
    setRendered(true)
  }, [])

  // Tab transition
  useEffect(() => {
    if (!rendered) return
    const prevTab = prevTabRef.current
    if (prevTab === activeTab) return

    const outgoing = panelRefs.current[prevTab]
    const incoming = panelRefs.current[activeTab]

    if (outgoing) {
      gsap.to(outgoing, {
        opacity: 0,
        y: -10,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          gsap.set(outgoing, { visibility: 'hidden', pointerEvents: 'none' })
        },
      })
    }

    if (incoming) {
      gsap.set(incoming, { visibility: 'visible', pointerEvents: 'auto' })
      gsap.fromTo(
        incoming,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out', delay: 0.15 }
      )

      // Stagger children entrance
      const cards = incoming.querySelectorAll('.project-card, .skill-pill, .contact-link')
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.3, stagger: 0.04, ease: 'power3.out', delay: 0.25 }
        )
      }
    }

    prevTabRef.current = activeTab
  }, [activeTab, rendered])

  return (
    <div ref={containerRef} className="content-zone relative flex-1 min-h-0 overflow-hidden">
      {Object.entries(TAB_COMPONENTS).map(([id, Component]) => (
        <div
          key={id}
          ref={el => (panelRefs.current[id] = el)}
          className="absolute inset-0"
          style={{ visibility: 'hidden', pointerEvents: 'none' }}
        >
          <Component />
        </div>
      ))}
    </div>
  )
}

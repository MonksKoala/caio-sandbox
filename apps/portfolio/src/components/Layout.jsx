import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import HeroPanel from './HeroPanel.jsx'
import TabNav from './TabNav.jsx'
import ContentZone from './ContentZone.jsx'

export default function Layout({ activeTab, onTabChange }) {
  const layoutRef = useRef(null)

  // Page entrance animation
  useEffect(() => {
    if (!layoutRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // Hero panel elements stagger in
      tl.from('.hero-label', { x: -20, opacity: 0, duration: 0.6, delay: 0.2 })
        .from('.hero-name', { x: -30, opacity: 0, duration: 0.8 }, '-=0.4')
        .from('.hero-title', { x: -20, opacity: 0, duration: 0.6 }, '-=0.5')
        .from('.hero-bio', { x: -15, opacity: 0, duration: 0.5 }, '-=0.4')
        .from('.hero-status', { x: -15, opacity: 0, duration: 0.5 }, '-=0.3')
        .from('.hero-cta', { y: 10, opacity: 0, duration: 0.5 }, '-=0.3')

      // Right panel slides in
      tl.from('.tab-nav', { x: 20, opacity: 0, duration: 0.5 }, '-=0.6')
        .from('.content-zone', { x: 20, opacity: 0, duration: 0.6 }, '-=0.4')
    }, layoutRef)

    return () => ctx.revert()
  }, [])

  const handleContactClick = () => {
    onTabChange('contact')
  }

  return (
    <div
      ref={layoutRef}
      className="h-[100dvh] overflow-hidden bg-offwhite flex flex-col md:flex-row"
    >
      <HeroPanel onContactClick={handleContactClick} />

      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        <TabNav active={activeTab} onChange={onTabChange} />
        <ContentZone activeTab={activeTab} />
      </div>
    </div>
  )
}

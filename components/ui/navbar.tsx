'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Team', href: '#team' },
  { label: 'Schedule', href: '#schedule' },
]

function scrollTo(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)

  // IntersectionObserver: mark the navbar link blue when its target section is ≥50% visible
  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.href.slice(1))
    const observed: HTMLElement[] = []
    ids.forEach(id => {
      const el = document.getElementById(id)
      if (el) observed.push(el)
    })
    if (observed.length === 0) return

    const obs = new IntersectionObserver(
      entries => {
        // Pick the entry most visible right now
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible.length > 0) setActiveId(visible[0].target.id)
      },
      { threshold: [0.3, 0.5, 0.75] }
    )
    observed.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  // Escape closes the mobile menu
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const linkStyle = (active: boolean): React.CSSProperties => ({
    fontFamily: 'PPNeueMontreal, Arial, sans-serif',
    fontWeight: 500,
    fontSize: 13,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: active ? '#4a8fd4' : '#f0f4ff',
    background: 'none',
    border: 'none',
    padding: '6px 10px',
    cursor: 'pointer',
    transition: 'color 150ms ease',
  })

  return (
    <>
      <motion.nav
        className="hidden-mobile"
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: 64,
          padding: '0 32px',
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <img
          src="/anteater-logo.png"
          alt="AI @ UCI"
          draggable={false}
          style={{ height: 32, filter: 'invert(1)', flexShrink: 0 }}
        />
        <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
          {NAV_LINKS.map(l => {
            const active = activeId === l.href.slice(1)
            return (
              <button
                key={l.label}
                onClick={() => scrollTo(l.href)}
                aria-current={active ? 'location' : undefined}
                style={linkStyle(active)}
                onMouseEnter={e => {
                  if (!active) (e.currentTarget as HTMLElement).style.color = '#a8c4f0'
                }}
                onMouseLeave={e => {
                  if (!active) (e.currentTarget as HTMLElement).style.color = '#f0f4ff'
                }}
                onFocus={e => {
                  ;(e.currentTarget as HTMLElement).style.outline = '2px solid #4a8fd4'
                  ;(e.currentTarget as HTMLElement).style.outlineOffset = '4px'
                  ;(e.currentTarget as HTMLElement).style.borderRadius = '2px'
                }}
                onBlur={e => {
                  ;(e.currentTarget as HTMLElement).style.outline = 'none'
                }}
              >
                {l.label}
              </button>
            )
          })}
        </div>
      </motion.nav>

      {/* Mobile glass bar + hamburger */}
      <div
        className="show-mobile"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: 60,
          padding: '0 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)',
        }}
      >
        <img
          src="/anteater-logo.png"
          alt="AI @ UCI"
          style={{ height: 28, filter: 'invert(1)' }}
        />
        <button
          onClick={() => setOpen(o => !o)}
          aria-label="Menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: 22,
            color: '#f0f4ff',
          }}
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          className="show-mobile"
          style={{
            position: 'fixed',
            top: 60,
            left: 0,
            right: 0,
            zIndex: 49,
            background: 'rgba(8,9,14,0.97)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            flexDirection: 'column',
            padding: '12px 20px 20px',
            gap: 4,
          }}
        >
          {NAV_LINKS.map(l => (
            <button
              key={l.label}
              onClick={() => {
                scrollTo(l.href)
                setOpen(false)
              }}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'PPNeueMontreal, Arial, sans-serif',
                fontSize: 15,
                fontWeight: 500,
                color: '#f0f4ff',
                textAlign: 'left',
                padding: '14px 0',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </>
  )
}

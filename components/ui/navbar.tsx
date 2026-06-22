'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
} from 'framer-motion'
import { FadeStagger, FadeItem } from './motion-primitives'

const NAV_LINKS = [
  { label: 'About',    href: '/about' },
  { label: 'Events',   href: '/events' },
  { label: 'Projects', href: '/projects' },
  { label: 'Join',     href: '/join', cta: true },
]

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { scrollY } = useScroll()

  // `morphY` is a ratchet that the navbar morph transforms read instead of
  // scrollY directly. It only advances on scroll DOWN and snaps back to 0 when
  // the user actually returns to the very top — so scrolling up never unwinds
  // the pill back into a rectangle mid-page.
  const morphY = useMotionValue(0)
  useEffect(() => {
    morphY.set(scrollY.get())
  }, [morphY, scrollY])
  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest <= 4) {
      morphY.set(0)
      return
    }
    if (latest > morphY.get()) morphY.set(latest)
  })

  // Morph from full-width bar → floating pill as user scrolls
  const navPT       = useTransform(morphY, [60, 200], [10, 10])
  const navPX       = useTransform(morphY, [60, 200], [32, 20])
  const innerMaxW   = useTransform(morphY, [60, 200], [3000, 980])
  const innerRadius = useTransform(morphY, [60, 200], [0, 9999])
  const innerPX     = useTransform(morphY, [60, 200], [4, 28])
  const innerPY     = useTransform(morphY, [60, 200], [10, 10])
  const bgAlpha     = useTransform(morphY, [0, 60, 200], [0, 0.72, 0.72])
  const blurAmt     = useTransform(morphY, [0, 60, 200], [0, 28, 36])
  const borderA     = useTransform(morphY, [0, 60, 200], [0, 0.13, 0.13])
  const shadowA     = useTransform(morphY, [60, 200], [0, 0.12])
  // Inset highlight/shadow alphas: fade in with the glass background so the
  // bottom hairline doesn't appear on the bare landing state.
  const insetTopA    = useTransform(morphY, [0, 60, 200], [0, 0.9, 0.9])
  const insetBottomA = useTransform(morphY, [0, 60, 200], [0, 0.04, 0.04])
  // Below-bar hairline: a 1px shadow that fades in with scroll so the bar
  // separates from the page content without looking heavy.
  const hairlineA    = useTransform(morphY, [0, 60, 200], [0, 0.06, 0.06])

  const navBg     = useMotionTemplate`rgba(255,255,255,${bgAlpha})`
  const navBlur   = useMotionTemplate`blur(${blurAmt}px) saturate(1.8)`
  const navBorder = useMotionTemplate`1px solid rgba(0,0,0,${borderA})`
  const navShadow = useMotionTemplate`0 4px 32px rgba(0,0,0,${shadowA}), 0 1px 0 rgba(0,0,0,${hairlineA}), inset 0 1px 0 rgba(255,255,255,${insetTopA}), inset 0 -1px 0 rgba(0,0,0,${insetBottomA})`

  const pillStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: 9999,
    padding: '7px 18px',
    fontFamily: 'PPNeueMontreal, Arial, sans-serif',
    fontSize: 13,
    fontWeight: 500,
    letterSpacing: '0.04em',
    color: '#0a0a0a',
    background: 'rgba(255,255,255,0.55)',
    border: '1px solid rgba(0,0,0,0.10)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    cursor: 'pointer',
    transition: 'border-color 150ms ease, color 150ms ease',
    textTransform: 'capitalize' as const,
  }

  const linkStyle = (active: boolean, cta = false): React.CSSProperties => {
    if (cta) {
      return {
        ...pillStyle,
        marginLeft: 4,
        padding: '8px 20px',
        background: active ? '#3a7fc4' : '#4a8fd4',
        border: '1px solid transparent',
        color: '#ffffff',
        textDecoration: 'none',
        boxShadow: '0 2px 12px rgba(74,143,212,0.28)',
        transition: 'background 150ms ease, box-shadow 150ms ease',
      }
    }
    return {
      ...pillStyle,
      borderColor: active ? 'rgba(74,143,212,0.45)' : 'rgba(0,0,0,0.10)',
      color: active ? '#4a8fd4' : '#0a0a0a',
      textDecoration: 'none',
    }
  }

  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === '/') {
      e.preventDefault()
      scrollToTop()
    }
  }

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <>
      <motion.nav
        className="hidden-mobile"
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          paddingTop: navPT,
          paddingLeft: navPX,
          paddingRight: navPX,
          paddingBottom: 0,
        }}
      >
        <motion.div style={{
          margin: '0 auto',
          maxWidth: innerMaxW,
          borderRadius: innerRadius,
          background: navBg,
          backdropFilter: navBlur,
          WebkitBackdropFilter: navBlur,
          border: navBorder,
          boxShadow: navShadow,
          paddingLeft: innerPX,
          paddingRight: innerPX,
          paddingTop: innerPY,
          paddingBottom: innerPY,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <FadeStagger trigger="mount" delay={0.15} stagger={0.05}>
            <FadeItem>
              <Link
                href="/"
                onClick={handleLogoClick}
                aria-label="Home"
                data-cursor-hover=""
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  flexShrink: 0,
                  textDecoration: 'none',
                }}
              >
                <img
                  src="/anteater-logo.png"
                  alt="AI @ UCI"
                  draggable={false}
                  style={{ height: 46, display: 'block' }}
                />
              </Link>
            </FadeItem>
          </FadeStagger>

          {/* Nav link pills, right aligned — cascade in one at a time */}
          <FadeStagger
            trigger="mount"
            delay={0.25}
            stagger={0.07}
            style={{ display: 'flex', gap: 6, alignItems: 'center' }}
          >
            {NAV_LINKS.map(l => {
              const active = isActive(l.href)
              const cta = 'cta' in l && l.cta
              return (
              <FadeItem key={l.label}>
                <Link
                  href={l.href}
                  data-cursor-hover={cta ? '' : undefined}
                  style={linkStyle(active, cta)}
                  onMouseEnter={e => {
                    if (cta) {
                      e.currentTarget.style.background = '#3a7fc4'
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(74,143,212,0.35)'
                    } else if (!active) {
                      e.currentTarget.style.borderColor = 'rgba(74,143,212,0.5)'
                      e.currentTarget.style.color = '#4a8fd4'
                    }
                  }}
                  onMouseLeave={e => {
                    if (cta) {
                      e.currentTarget.style.background = active ? '#3a7fc4' : '#4a8fd4'
                      e.currentTarget.style.boxShadow = '0 2px 12px rgba(74,143,212,0.28)'
                    } else if (!active) {
                      e.currentTarget.style.borderColor = 'rgba(0,0,0,0.10)'
                      e.currentTarget.style.color = '#0a0a0a'
                    }
                  }}
                >
                  {l.label}
                </Link>
              </FadeItem>
              )
            })}
          </FadeStagger>
        </motion.div>
      </motion.nav>

      {/* Mobile: static glass bar + hamburger */}
      <div className="show-mobile" style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        height: 60, padding: '0 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'rgba(255,255,255,0.72)',
        backdropFilter: 'blur(32px) saturate(1.8)',
        WebkitBackdropFilter: 'blur(32px) saturate(1.8)',
        borderBottom: '1px solid rgba(0,0,0,0.12)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)',
      }}>
        <Link
          href="/"
          onClick={handleLogoClick}
          aria-label="Home"
          data-cursor-hover=""
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            textDecoration: 'none',
          }}
        >
          <img src="/anteater-logo.png" alt="AI @ UCI" style={{ height: 32, display: 'block' }} />
        </Link>
        <button
          onClick={() => setOpen(o => !o)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 22, color: '#0a0a0a' }}
          aria-label="Menu"
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile slide-down menu */}
      {open && (
        <div className="show-mobile" style={{
          position: 'fixed', top: 60, left: 0, right: 0, zIndex: 49,
          background: 'rgba(255,255,255,0.97)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0,0,0,0.07)',
          display: 'flex', flexDirection: 'column', padding: '12px 20px 20px',
          gap: 4,
        }}>
          {NAV_LINKS.map(l => {
            const active = isActive(l.href)
            const cta = 'cta' in l && l.cta
            return (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              style={
                cta
                  ? {
                      fontFamily: 'PPNeueMontreal, Arial, sans-serif',
                      fontSize: 15,
                      fontWeight: 500,
                      color: '#ffffff',
                      textAlign: 'center',
                      padding: '12px 20px',
                      marginTop: 8,
                      borderRadius: 9999,
                      background: active ? '#3a7fc4' : '#4a8fd4',
                      textDecoration: 'none',
                    }
                  : {
                      fontFamily: 'PPNeueMontreal, Arial, sans-serif',
                      fontSize: 15,
                      fontWeight: active ? 500 : 400,
                      color: active ? '#4a8fd4' : '#0a0a0a',
                      textAlign: 'left',
                      padding: '11px 0',
                      borderBottom: '1px solid rgba(0,0,0,0.06)',
                      textDecoration: 'none',
                    }
              }
            >
              {l.label}
            </Link>
            )
          })}
        </div>
      )}
    </>
  )
}

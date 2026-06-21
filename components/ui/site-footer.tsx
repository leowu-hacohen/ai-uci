'use client'
import Link from 'next/link'
import { MEETING_INFO_SHORT } from '@/components/sections/about'
import { FadeStagger, FadeItem } from '@/components/ui/motion-primitives'

// Site grid cap — matches Who We Are, team grids, footer inner content.
const CONTENT_MAX = 1200

const EXPLORE_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Events', href: '/events' },
  { label: 'Projects', href: '/projects' },
  { label: 'Join', href: '/join' },
]

const LABEL_STYLE: React.CSSProperties = {
  fontFamily: 'Redaction50, Georgia, serif',
  fontSize: 11,
  fontWeight: 400,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: '#0a0a0a',
  margin: '0 0 20px',
}

const LINK_STYLE: React.CSSProperties = {
  fontFamily: 'PPNeueMontreal, Arial, sans-serif',
  fontSize: 14,
  lineHeight: 1,
  color: 'rgba(10,10,10,0.72)',
  textDecoration: 'none',
  transition: 'color 150ms ease',
}

const BODY_STYLE: React.CSSProperties = {
  fontFamily: 'PPNeueMontreal, Arial, sans-serif',
  fontSize: 14,
  lineHeight: 1.65,
  color: 'rgba(10,10,10,0.55)',
}

const HORIZONTAL_GUTTER = 'clamp(24px, 5vw, 64px)'

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{
        width: 38,
        height: 38,
        borderRadius: 10,
        border: '0.5px solid rgba(0,0,0,0.12)',
        background: '#f8f9fc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#0a0a0a',
        transition: 'border-color 150ms ease, color 150ms ease',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'rgba(74,143,212,0.45)'
        el.style.color = '#4a8fd4'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'rgba(0,0,0,0.12)'
        el.style.color = '#0a0a0a'
      }}
    >
      {children}
    </a>
  )
}

export default function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        width: '100%',
        boxSizing: 'border-box',
        background: '#ffffff',
        borderTop: '0.5px solid rgba(0,0,0,0.08)',
        paddingTop: 72,
        paddingBottom: 40,
      }}
    >
      {/* Inner grid locks to CONTENT_MAX so the logo aligns with Who We Are above. */}
      <div
        style={{
          maxWidth: CONTENT_MAX,
          margin: '0 auto',
          paddingLeft: HORIZONTAL_GUTTER,
          paddingRight: HORIZONTAL_GUTTER,
          boxSizing: 'border-box',
        }}
      >
        <FadeStagger
          stagger={0.08}
          amount={0.12}
          className="site-footer-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.5fr) minmax(0, 1fr) minmax(0, 1fr)',
            gap: 56,
            alignItems: 'start',
          }}
        >
          <FadeItem>
          <div>
            <Link
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                textDecoration: 'none',
                marginBottom: 20,
              }}
            >
              <img
                src="/anteater-logo.png"
                alt=""
                draggable={false}
                style={{ height: 40, display: 'block' }}
              />
              <span
                style={{
                  fontFamily: 'Redaction50, Georgia, serif',
                  fontSize: 22,
                  lineHeight: 1.1,
                  color: '#0a0a0a',
                }}
              >
                AI @ UCI
              </span>
            </Link>
            <p style={{ ...BODY_STYLE, margin: 0, maxWidth: 360 }}>
              Artificial Intelligence @ UCI is a student-run organization at UC Irvine. We act
              independently of the university and take full responsibility for this website.
            </p>
            <p
              style={{
                ...BODY_STYLE,
                fontSize: 13,
                color: 'rgba(10,10,10,0.4)',
                margin: '28px 0 0',
              }}
            >
              © {year} Artificial Intelligence @ UCI.
            </p>
          </div>
          </FadeItem>

          <FadeItem>
          <div>
            <p style={LABEL_STYLE}>Explore</p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '14px 24px',
              }}
            >
              {EXPLORE_LINKS.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={LINK_STYLE}
                  onMouseEnter={e => {
                    ;(e.currentTarget as HTMLElement).style.color = '#4a8fd4'
                  }}
                  onMouseLeave={e => {
                    ;(e.currentTarget as HTMLElement).style.color = 'rgba(10,10,10,0.72)'
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          </FadeItem>

          <FadeItem>
          <div>
            <p style={LABEL_STYLE}>Contact</p>
            <a
              href="mailto:aiatuci@gmail.com"
              style={{
                ...LINK_STYLE,
                display: 'block',
                marginBottom: 10,
                color: '#0a0a0a',
              }}
              onMouseEnter={e => {
                ;(e.currentTarget as HTMLElement).style.color = '#4a8fd4'
              }}
              onMouseLeave={e => {
                ;(e.currentTarget as HTMLElement).style.color = '#0a0a0a'
              }}
            >
              aiatuci@gmail.com
            </a>
            <p style={{ ...BODY_STYLE, margin: '0 0 24px', fontSize: 13, color: '#0a0a0a' }}>
              {MEETING_INFO_SHORT}
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <SocialIcon href="https://instagram.com/aiatuci" label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.75" />
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.75" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </SocialIcon>
              <SocialIcon href="https://discord.gg/aiatuci" label="Discord">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path
                    d="M19.27 5.33C17.72 4.71 16.12 4.26 14.47 4a.09.09 0 0 0-.1.07c-.18.38-.39.89-.53 1.27a18.45 18.45 0 0 0-5.8 0 12.64 12.64 0 0 0-.55-1.27.09.09 0 0 0-.1-.07c-1.65.26-3.25.71-4.8 1.29a.08.08 0 0 0-.04.03C2.4 9.16 1.74 12.7 2.01 16.22a.09.09 0 0 0 .04.06c1.99 1.46 3.92 2.35 5.83 2.94a.08.08 0 0 0 .09-.03c.47-.64.89-1.32 1.26-2.03a.08.08 0 0 0-.04-.11 12.1 12.1 0 0 1-1.74-.83.08.08 0 0 1 .01-.13c.12-.09.24-.18.36-.27a.08.08 0 0 1 .08-.01c3.65 1.67 7.6 1.67 11.22 0a.08.08 0 0 1 .08.01c.12.09.24.18.36.27a.08.08 0 0 1-.01.13 11.4 11.4 0 0 1-1.75.83.08.08 0 0 0-.03.11c.38.71.8 1.39 1.26 2.03a.08.08 0 0 0 .09.03c1.91-.59 3.84-1.48 5.83-2.94a.08.08 0 0 0 .04-.06c.33-4.07-.56-7.6-2.3-11.05a.06.06 0 0 0-.03-.03zM8.02 14.33c-1.1 0-2.01-.99-2.01-2.19s.88-2.19 2.01-2.19c1.13 0 2.03 1 2.01 2.19 0 1.2-.88 2.19-2.01 2.19zm7.96 0c-1.1 0-2.01-.99-2.01-2.19s.88-2.19 2.01-2.19c1.13 0 2.03 1 2.01 2.19 0 1.2-.88 2.19-2.01 2.19z"
                  />
                </svg>
              </SocialIcon>
              <SocialIcon href="https://github.com/aiatuci" label="GitHub">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path
                    d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                  />
                </svg>
              </SocialIcon>
            </div>
          </div>
          </FadeItem>
        </FadeStagger>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .site-footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 40px !important;
          }
          .site-footer-grid > div:first-child {
            grid-column: 1 / -1;
          }
        }
        @media (max-width: 560px) {
          .site-footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  )
}

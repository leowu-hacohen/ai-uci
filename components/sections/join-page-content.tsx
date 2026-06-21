'use client'
import { useState } from 'react'
import { FadeStagger, FadeItem } from '@/components/ui/motion-primitives'
import { MEETING_INFO_COPY, MEETING_INFO_SHORT } from './about'

const STEPS = [
  {
    title: 'Show up Wednesday',
    body: 'General meetings and workshops every week. No signup, no prep. Bring a laptop if you want to build along.',
  },
  {
    title: 'Pick a track',
    body: 'Workshops for learning, projects for building, community nights for meeting people. Most members do all three.',
  },
  {
    title: 'Stay in the loop',
    body: 'Follow us on Instagram for event updates, speaker announcements, and hackathon drops.',
  },
]

const LINKS = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/aiatuci',
    detail: '@aiatuci',
  },
  {
    label: 'Email',
    href: 'mailto:aiatuci@gmail.com',
    detail: 'aiatuci@gmail.com',
  },
  {
    label: 'Discord',
    href: 'https://discord.gg/aiatuci',
    detail: 'Join the server',
  },
]

const BODY_STYLE: React.CSSProperties = {
  fontFamily: 'PPNeueMontreal, Arial, sans-serif',
  fontSize: 15,
  lineHeight: 1.6,
  color: 'rgba(10,10,10,0.7)',
}

export default function JoinPageContent() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <section style={{ padding: '0 clamp(24px, 5vw, 64px) 64px' }}>
        <div
          style={{
            maxWidth: 1000,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 20,
          }}
        >
          {STEPS.map((step, i) => (
            <FadeStagger key={step.title} stagger={0.06} amount={0.15} delay={i * 0.05}>
              <FadeItem>
                <div
                  style={{
                    padding: '28px 24px',
                    borderRadius: 16,
                    border: '0.5px solid rgba(0,0,0,0.08)',
                    background: '#f8f9fc',
                    height: '100%',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'PPNeueMontreal, Arial, sans-serif',
                      fontSize: 12,
                      fontWeight: 500,
                      color: '#4a8fd4',
                      letterSpacing: '0.06em',
                      marginBottom: 10,
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3
                    style={{
                      fontFamily: 'Redaction50, Georgia, serif',
                      fontSize: 22,
                      color: '#0a0a0a',
                      margin: '0 0 10px',
                      lineHeight: 1.15,
                    }}
                  >
                    {step.title}
                  </h3>
                  <p style={{ ...BODY_STYLE, margin: 0 }}>{step.body}</p>
                </div>
              </FadeItem>
            </FadeStagger>
          ))}
        </div>
      </section>

      <section style={{ padding: '0 clamp(24px, 5vw, 64px) 96px' }}>
        <FadeStagger stagger={0.08} amount={0.2} style={{ maxWidth: 640, margin: '0 auto' }}>
          <FadeItem>
            <h2
              style={{
                fontFamily: 'Redaction50, Georgia, serif',
                fontSize: 'clamp(28px, 4vw, 40px)',
                lineHeight: 1.1,
                color: '#0a0a0a',
                fontWeight: 400,
                margin: '0 0 12px',
                textAlign: 'center',
              }}
            >
              Newsletter
            </h2>
            <p style={{ ...BODY_STYLE, textAlign: 'center', margin: '0 0 32px' }}>
              Drop your email and we&apos;ll send event updates when signups go live.
            </p>
          </FadeItem>

          {!submitted ? (
            <FadeItem>
              <form
                onSubmit={handleSubmit}
                style={{
                  display: 'flex',
                  gap: 12,
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                }}
              >
                <input
                  type="email"
                  required
                  placeholder="you@uci.edu"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{
                    flex: '1 1 240px',
                    padding: '14px 20px',
                    background: '#f8f9fc',
                    border: '1px solid rgba(0,0,0,0.1)',
                    borderRadius: 9999,
                    color: '#0a0a0a',
                    outline: 'none',
                    fontFamily: 'PPNeueMontreal, Arial, sans-serif',
                    fontSize: 14,
                    minWidth: 0,
                  }}
                />
                <button
                  type="submit"
                  data-cursor-hover=""
                  style={{
                    padding: '14px 28px',
                    background: '#4a8fd4',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: 9999,
                    fontFamily: 'PPNeueMontreal, Arial, sans-serif',
                    fontWeight: 500,
                    fontSize: 14,
                    cursor: 'pointer',
                  }}
                >
                  Subscribe
                </button>
              </form>
            </FadeItem>
          ) : (
            <FadeItem>
              <div
                style={{
                  padding: '20px 24px',
                  background: 'rgba(74,143,212,0.08)',
                  border: '1px solid rgba(74,143,212,0.3)',
                  borderRadius: 16,
                  fontFamily: 'PPNeueMontreal, Arial, sans-serif',
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: '#0a0a0a',
                  textAlign: 'center',
                }}
              >
                Thanks. We&apos;ll have signups live soon. For now, follow{' '}
                <a
                  href="https://instagram.com/aiatuci"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#4a8fd4' }}
                >
                  @aiatuci
                </a>{' '}
                on Instagram or show up Wednesday at 4–5:30pm in DBH 6011.
              </div>
            </FadeItem>
          )}

          <FadeItem>
            <div
              style={{
                marginTop: 48,
                padding: '32px 28px',
                borderRadius: 16,
                border: '0.5px solid rgba(0,0,0,0.08)',
                background: '#f8f9fc',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  justifyContent: 'center',
                  marginBottom: 24,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="16" rx="2" stroke="#4a8fd4" strokeWidth="2" />
                  <line x1="3" y1="10" x2="21" y2="10" stroke="#4a8fd4" strokeWidth="2" />
                  <line x1="8" y1="3" x2="8" y2="7" stroke="#4a8fd4" strokeWidth="2" strokeLinecap="round" />
                  <line x1="16" y1="3" x2="16" y2="7" stroke="#4a8fd4" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span
                  style={{
                    fontFamily: 'PPNeueMontreal, Arial, sans-serif',
                    fontSize: 14,
                    color: 'rgba(74,143,212,0.85)',
                  }}
                >
                  {MEETING_INFO_COPY}
                </span>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                  gap: 16,
                }}
              >
                {LINKS.map(link => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-hover=""
                    style={{
                      display: 'block',
                      padding: '16px 18px',
                      borderRadius: 12,
                      border: '0.5px solid rgba(0,0,0,0.06)',
                      background: '#ffffff',
                      textDecoration: 'none',
                      transition: 'border-color 150ms ease',
                    }}
                    onMouseEnter={e => {
                      ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(74,143,212,0.35)'
                    }}
                    onMouseLeave={e => {
                      ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,0,0,0.06)'
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'PPNeueMontreal, Arial, sans-serif',
                        fontSize: 12,
                        color: 'rgba(10,10,10,0.45)',
                        marginBottom: 4,
                      }}
                    >
                      {link.label}
                    </div>
                    <div
                      style={{
                        fontFamily: 'PPNeueMontreal, Arial, sans-serif',
                        fontSize: 14,
                        color: '#4a8fd4',
                      }}
                    >
                      {link.detail}
                    </div>
                  </a>
                ))}
              </div>

              <p
                style={{
                  ...BODY_STYLE,
                  fontSize: 13,
                  textAlign: 'center',
                  margin: '20px 0 0',
                  color: 'rgba(10,10,10,0.45)',
                }}
              >
                {MEETING_INFO_SHORT}
              </p>
            </div>
          </FadeItem>
        </FadeStagger>
      </section>
    </>
  )
}

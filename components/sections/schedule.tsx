'use client'
import { useState } from 'react'
import { FadeStagger, FadeItem } from '@/components/ui/motion-primitives'
import { MEETING_INFO_SHORT } from './about'

export default function ScheduleSection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  // STUB ONLY: wire to MailChimp/Resend/Formspree in follow-up. See KTD6 in
  // docs/plans/2026-06-20-001-feat-ai-uci-portfolio-buildout-plan.md.
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section
      id="schedule"
      style={{ background: '#ffffff', padding: '96px clamp(24px, 5vw, 64px) 128px' }}
    >
      <FadeStagger
        stagger={0.09}
        amount={0.25}
        style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}
      >
        <FadeItem>
          <p
            style={{
              fontFamily: 'PPNeueMontreal, Arial, sans-serif',
              fontWeight: 400,
              fontSize: 26,
              color: '#0a0a0a',
              margin: 0,
            }}
          >
            Join Us
          </p>
        </FadeItem>
        <FadeItem>
          <h2
            style={{
              fontFamily: 'Redaction50, Georgia, serif',
              fontSize: 'clamp(36px, 5vw, 56px)',
              lineHeight: 1.1,
              color: '#0a0a0a',
              fontWeight: 400,
              margin: '16px 0 24px',
            }}
          >
            See what&apos;s coming.
          </h2>
        </FadeItem>
        <FadeItem>
          <p
            style={{
              fontFamily: 'PPNeueMontreal, Arial, sans-serif',
              fontSize: 16,
              lineHeight: 1.6,
              color: 'rgba(10,10,10,0.7)',
              margin: '0 auto 48px',
              maxWidth: 520,
            }}
          >
            Drop your email, follow on Instagram, or just show up Wednesday.
          </p>
        </FadeItem>

        {!submitted ? (
          <FadeItem>
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              gap: 12,
              maxWidth: 480,
              margin: '0 auto',
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
              onFocus={e => {
                ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(74,143,212,0.4)'
              }}
              onBlur={e => {
                ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,0,0,0.1)'
              }}
            />
            <button
              type="submit"
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
                letterSpacing: '0.04em',
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
                maxWidth: 520,
                margin: '0 auto',
                padding: '20px 24px',
                background: 'rgba(74,143,212,0.08)',
                border: '1px solid rgba(74,143,212,0.3)',
                borderRadius: 16,
                fontFamily: 'PPNeueMontreal, Arial, sans-serif',
                fontSize: 15,
                lineHeight: 1.6,
                color: '#0a0a0a',
              }}
            >
              Thanks. We&apos;ll have signups live soon. For now, follow{' '}
              <a
                href="https://instagram.com/aiuci"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#4a8fd4', textDecoration: 'underline' }}
              >
                @aiuci
              </a>{' '}
              on Instagram or show up Wednesday at 4–5:30pm in DBH 6011.
            </div>
          </FadeItem>
        )}

        <FadeItem>
          <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
            <a
              href="https://instagram.com/aiuci"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                color: '#4a8fd4',
                textDecoration: 'none',
                fontFamily: 'PPNeueMontreal, Arial, sans-serif',
                fontSize: 14,
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" stroke="#4a8fd4" strokeWidth="2" />
                <circle cx="12" cy="12" r="4" stroke="#4a8fd4" strokeWidth="2" />
                <circle cx="17.5" cy="6.5" r="1.2" fill="#4a8fd4" />
              </svg>
              <span>@aiuci</span>
            </a>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
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
                  color: 'rgba(74,143,212,0.8)',
                }}
              >
                {MEETING_INFO_SHORT}
              </span>
            </div>
          </div>
        </FadeItem>
      </FadeStagger>
    </section>
  )
}

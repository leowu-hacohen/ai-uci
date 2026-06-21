'use client'
import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { MEETING_INFO_SHORT } from './about'

export default function ScheduleSection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const reduce = useReducedMotion()

  // STUB ONLY — wire to MailChimp/Resend/Formspree in follow-up. See KTD6 in
  // docs/plans/2026-06-20-001-feat-ai-uci-portfolio-buildout-plan.md.
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section
      id="schedule"
      style={{ background: '#08090e', padding: '96px 32px 128px' }}
    >
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}
      >
        <p
          style={{
            fontFamily: 'PPNeueMontreal, Arial, sans-serif',
            fontWeight: 500,
            fontSize: 11,
            letterSpacing: '0.32em',
            color: '#4a8fd4',
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          JOIN US
        </p>
        <h2
          style={{
            fontFamily: 'Redaction50, Georgia, serif',
            fontSize: 'clamp(36px, 5vw, 56px)',
            lineHeight: 1.1,
            color: '#f0f4ff',
            fontWeight: 400,
            margin: '16px 0 24px',
          }}
        >
          See what&apos;s coming.
        </h2>
        <p
          style={{
            fontFamily: 'PPNeueMontreal, Arial, sans-serif',
            fontSize: 16,
            lineHeight: 1.6,
            color: 'rgba(240,244,255,0.78)',
            margin: '0 auto 48px',
            maxWidth: 520,
          }}
        >
          Drop your email, follow on Instagram, or just show up Wednesday.
        </p>

        {!submitted ? (
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
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 9999,
                color: '#f0f4ff',
                outline: 'none',
                fontFamily: 'PPNeueMontreal, Arial, sans-serif',
                fontSize: 14,
                minWidth: 0,
              }}
              onFocus={e => {
                ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(74,143,212,0.4)'
              }}
              onBlur={e => {
                ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'
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
        ) : (
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
              color: '#f0f4ff',
            }}
          >
            Thanks — we&apos;ll have signups live soon. For now, follow{' '}
            <a
              href="https://instagram.com/aiuci"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#a8c4f0', textDecoration: 'underline' }}
            >
              @aiuci
            </a>{' '}
            on Instagram or show up Wednesday at 4–5:30pm in DBH 6011.
          </div>
        )}

        <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
          <a
            href="https://instagram.com/aiuci"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              color: '#a8c4f0',
              textDecoration: 'none',
              fontFamily: 'PPNeueMontreal, Arial, sans-serif',
              fontSize: 14,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" stroke="#a8c4f0" strokeWidth="2" />
              <circle cx="12" cy="12" r="4" stroke="#a8c4f0" strokeWidth="2" />
              <circle cx="17.5" cy="6.5" r="1.2" fill="#a8c4f0" />
            </svg>
            <span>@aiuci</span>
          </a>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3" y="5" width="18" height="16" rx="2" stroke="#a8c4f0" strokeWidth="2" />
              <line x1="3" y1="10" x2="21" y2="10" stroke="#a8c4f0" strokeWidth="2" />
              <line x1="8" y1="3" x2="8" y2="7" stroke="#a8c4f0" strokeWidth="2" strokeLinecap="round" />
              <line x1="16" y1="3" x2="16" y2="7" stroke="#a8c4f0" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span
              style={{
                fontFamily: 'PPNeueMontreal, Arial, sans-serif',
                fontSize: 14,
                color: 'rgba(168,196,240,0.8)',
              }}
            >
              {MEETING_INFO_SHORT}
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

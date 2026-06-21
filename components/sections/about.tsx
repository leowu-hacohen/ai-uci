'use client'
import { useState } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'

// Shared meeting-info copy (Schedule imports the same string)
export const MEETING_INFO_COPY =
  'Join us every Wednesday at 4:00–5:30pm in DBH 6011 for general meetings and workshops!'
export const MEETING_INFO_SHORT = 'Wednesdays · 4:00–5:30pm · DBH 6011'

// ── Events deck (Pillar 1 carousel) ──────────────────────────────────────────
type Event = { src: string; alt: string; name: string; date: string }
const EVENTS: Event[] = [
  { src: '/images/events/walle.jpg',     alt: 'Members at the WALL-E AI viewing event',     name: 'WALL-E AI Night',  date: '2024' },
  { src: '/images/events/hope.jpg',      alt: 'Members at a community workshop',            name: 'Workshop',         date: '2024' },
  { src: '/images/events/light.jpg',     alt: 'Members at an evening workshop',             name: 'Evening Workshop', date: '2024' },
  { src: '/images/events/wires.jpg',     alt: 'Members hands-on at a hardware workshop',    name: 'Hardware Workshop', date: '2024' },
  { src: '/images/events/pic01.jpg',     alt: 'AI @ UCI general meeting',                   name: 'General Meeting',  date: '2024' },
  { src: '/images/events/pic02.jpg',     alt: 'AI @ UCI event attendees',                   name: 'Member Event',     date: '2024' },
  { src: '/images/events/pic03.jpg',     alt: 'AI @ UCI workshop session',                  name: 'Workshop',         date: '2024' },
  { src: '/images/events/pic04.jpg',     alt: 'AI @ UCI panel discussion',                  name: 'Industry Panel',   date: '2024' },
  { src: '/images/events/pic05.jpg',     alt: 'AI @ UCI hackathon',                         name: 'Hackathon',        date: '2024' },
]

// ── Speakers (Pillar 2 carousel) ─────────────────────────────────────────────
// Empty by design — see KTD8 / Pillar 2 empty-state rule.
// Do NOT add placeholder "TBD" entries. Real speakers only.
type Speaker = { img: string; name: string; company: string; role: string; alt: string }
const SPEAKERS: Speaker[] = []

// ── Sponsor logos (for Projects pillar reuse) ────────────────────────────────
// CACTUS uses /images/sponsors/cactus.png; AWS uses /images/sponsors/aws.png

// ── Pillar icons (concept-named, not generic SaaS metaphors) ─────────────────
function LearningIcon() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" aria-hidden="true">
      {/* stacked terminal lines / code blocks */}
      <rect x="14" y="20" width="92" height="80" rx="6" stroke="#4a8fd4" strokeWidth="2" />
      <line x1="14" y1="36" x2="106" y2="36" stroke="#4a8fd4" strokeWidth="1.5" />
      <circle cx="23" cy="28" r="2" fill="#4a8fd4" />
      <circle cx="31" cy="28" r="2" fill="#4a8fd4" />
      <circle cx="39" cy="28" r="2" fill="#4a8fd4" />
      <line x1="26" y1="50" x2="42" y2="50" stroke="#4a8fd4" strokeWidth="2" strokeLinecap="round" />
      <line x1="46" y1="50" x2="86" y2="50" stroke="#4a8fd4" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <line x1="26" y1="62" x2="62" y2="62" stroke="#4a8fd4" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <line x1="34" y1="74" x2="78" y2="74" stroke="#4a8fd4" strokeWidth="2" strokeLinecap="round" />
      <line x1="26" y1="86" x2="50" y2="86" stroke="#4a8fd4" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    </svg>
  )
}

function CommunityIcon() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" aria-hidden="true">
      {/* connected nodes / mini neural net */}
      <line x1="30" y1="30" x2="60" y2="60" stroke="#4a8fd4" strokeWidth="1.5" opacity="0.5" />
      <line x1="90" y1="30" x2="60" y2="60" stroke="#4a8fd4" strokeWidth="1.5" opacity="0.5" />
      <line x1="30" y1="90" x2="60" y2="60" stroke="#4a8fd4" strokeWidth="1.5" opacity="0.5" />
      <line x1="90" y1="90" x2="60" y2="60" stroke="#4a8fd4" strokeWidth="1.5" opacity="0.5" />
      <line x1="30" y1="30" x2="90" y2="30" stroke="#4a8fd4" strokeWidth="1.5" opacity="0.3" />
      <line x1="30" y1="90" x2="90" y2="90" stroke="#4a8fd4" strokeWidth="1.5" opacity="0.3" />
      <line x1="30" y1="30" x2="30" y2="90" stroke="#4a8fd4" strokeWidth="1.5" opacity="0.3" />
      <line x1="90" y1="30" x2="90" y2="90" stroke="#4a8fd4" strokeWidth="1.5" opacity="0.3" />
      <circle cx="60" cy="60" r="8" fill="#4a8fd4" />
      <circle cx="30" cy="30" r="5" fill="#4a8fd4" />
      <circle cx="90" cy="30" r="5" fill="#4a8fd4" />
      <circle cx="30" cy="90" r="5" fill="#4a8fd4" />
      <circle cx="90" cy="90" r="5" fill="#4a8fd4" />
    </svg>
  )
}

function ProjectsIcon() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" aria-hidden="true">
      {/* geometric building blocks stacking upward */}
      <rect x="20" y="80" width="80" height="20" stroke="#4a8fd4" strokeWidth="2" />
      <rect x="30" y="58" width="60" height="20" stroke="#4a8fd4" strokeWidth="2" />
      <rect x="40" y="36" width="40" height="20" stroke="#4a8fd4" strokeWidth="2" />
      <rect x="50" y="14" width="20" height="20" stroke="#4a8fd4" strokeWidth="2" fill="#4a8fd4" fillOpacity="0.2" />
    </svg>
  )
}

// ── Reusable typography tokens ───────────────────────────────────────────────
const EYEBROW_STYLE: React.CSSProperties = {
  fontFamily: 'PPNeueMontreal, Arial, sans-serif',
  fontWeight: 500,
  fontSize: 11,
  letterSpacing: '0.32em',
  color: '#4a8fd4',
  textTransform: 'uppercase',
  margin: 0,
}

const HEADING_STYLE: React.CSSProperties = {
  fontFamily: 'Redaction50, Georgia, serif',
  fontSize: 'clamp(36px, 5vw, 56px)',
  lineHeight: 1.1,
  color: '#0a0a0a',
  fontWeight: 400,
  margin: '16px 0 0',
}

const BODY_STYLE: React.CSSProperties = {
  fontFamily: 'PPNeueMontreal, Arial, sans-serif',
  fontWeight: 400,
  fontSize: 16,
  lineHeight: 1.6,
  color: 'rgba(10,10,10,0.7)',
}

// Pillar title — PP Neue Montreal Bold 700 at 28px because Medium (500) is not on hand (KTD5).
const PILLAR_TITLE_STYLE: React.CSSProperties = {
  fontFamily: 'PPNeueMontreal, Arial, sans-serif',
  fontWeight: 700,
  fontSize: 28,
  color: '#0a0a0a',
  margin: 0,
}

// ── Subcomponents ────────────────────────────────────────────────────────────

function ValueProp() {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}
    >
      <p style={EYEBROW_STYLE}>WHAT WE DO</p>
      <h2 style={{ ...HEADING_STYLE, maxWidth: 900, margin: '16px auto 24px' }}>
        We don&apos;t just study AI. We build it, ship it, and grow together doing it.
      </h2>
      <p style={{ ...BODY_STYLE, maxWidth: 600, margin: '0 auto 64px' }}>
        AI @ UCI is where curious students become capable builders — through workshops that
        teach, projects that ship, and a network that opens doors.
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 24,
          maxWidth: 1100,
          margin: '0 auto',
        }}
      >
        <img
          src="/images/events/candid.jpg"
          alt="AI @ UCI members at an event"
          style={{
            width: '100%',
            aspectRatio: '16 / 10',
            objectFit: 'cover',
            borderRadius: 8,
            border: '1px solid rgba(0,0,0,0.08)',
          }}
        />
        <img
          src="/images/events/group.jpg"
          alt="AI @ UCI team group photo"
          style={{
            width: '100%',
            aspectRatio: '16 / 10',
            objectFit: 'cover',
            borderRadius: 8,
            border: '1px solid rgba(0,0,0,0.08)',
          }}
        />
      </div>
    </motion.div>
  )
}

type PillarProps = {
  iconSide: 'left' | 'right'
  icon: React.ReactNode
  title: string
  body: string
  proof: React.ReactNode
  stagger?: number
}

function Pillar({ iconSide, icon, title, body, proof, stagger = 0 }: PillarProps) {
  const reduce = useReducedMotion()
  const iconCol = (
    <div style={{ display: 'flex', justifyContent: 'center', filter: 'drop-shadow(0 0 24px rgba(74,143,212,0.25))' }}>
      {icon}
    </div>
  )
  const copyCol = (
    <div style={{ maxWidth: 480 }}>
      <h3 style={PILLAR_TITLE_STYLE}>{title}</h3>
      <p style={{ ...BODY_STYLE, marginTop: 16 }}>{body}</p>
    </div>
  )
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: stagger, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ padding: '64px 0' }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          alignItems: 'center',
          gap: 64,
          maxWidth: 1200,
          margin: '0 auto 48px',
        }}
      >
        {iconSide === 'left' ? (
          <>
            {iconCol}
            {copyCol}
          </>
        ) : (
          <>
            {copyCol}
            {iconCol}
          </>
        )}
      </div>
      {proof}
    </motion.div>
  )
}

// ── Pillar 1 proof: event carousel + meeting info ────────────────────────────
function EventsCarousel() {
  const items = [...EVENTS, ...EVENTS]
  return (
    <div style={{ overflow: 'hidden', maxWidth: '100%' }}>
      <div
        style={{
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%)',
          maskImage:
            'linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%)',
        }}
      >
        <div
          className="carousel-scroll-wrapper"
          style={{
            display: 'flex',
            width: 'max-content',
            animation: 'scroll-left 60s linear infinite',
          }}
          onMouseEnter={e => {
            ;(e.currentTarget as HTMLElement).style.animationPlayState = 'paused'
          }}
          onMouseLeave={e => {
            ;(e.currentTarget as HTMLElement).style.animationPlayState = 'running'
          }}
        >
          {items.map((ev, i) => (
            <div
              key={`${ev.name}-${i}`}
              style={{
                width: 360,
                flexShrink: 0,
                marginRight: 24,
                transition: 'transform 200ms ease',
              }}
            >
              <img
                src={ev.src}
                alt={ev.alt}
                style={{
                  width: '100%',
                  height: 280,
                  objectFit: 'cover',
                  borderRadius: 8,
                  border: '1px solid rgba(0,0,0,0.08)',
                  transition: 'border-color 150ms ease',
                }}
                onMouseEnter={e => {
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(74,143,212,0.3)'
                }}
                onMouseLeave={e => {
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,0,0,0.08)'
                }}
              />
              <div style={{ marginTop: 12 }}>
                <div style={{ fontFamily: 'PPNeueMontreal, Arial, sans-serif', fontSize: 14, color: '#0a0a0a' }}>
                  {ev.name}
                </div>
                <div style={{ fontFamily: 'PPNeueMontreal, Arial, sans-serif', fontSize: 12, color: 'rgba(74,143,212,0.8)', marginTop: 2 }}>
                  {ev.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          justifyContent: 'center',
          marginTop: 32,
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
            color: 'rgba(74,143,212,0.8)',
          }}
        >
          {MEETING_INFO_COPY}
        </span>
      </div>
    </div>
  )
}

// ── Pillar 2 proof: speaker carousel (or empty-state) ───────────────────────
function SpeakersCarousel() {
  const [index, setIndex] = useState(0)
  const reduce = useReducedMotion()

  if (SPEAKERS.length === 0) {
    return (
      <div
        style={{
          maxWidth: 480,
          margin: '0 auto',
          padding: '48px 24px',
          textAlign: 'center',
          background: '#f8f9fc',
          border: '1px solid rgba(0,0,0,0.08)',
          borderRadius: 16,
        }}
      >
        <p style={{ ...BODY_STYLE, margin: 0 }}>
          Speaker lineup coming soon — show up Wednesday to meet them in person.
        </p>
      </div>
    )
  }

  const current = SPEAKERS[index]
  const next = () => setIndex((index + 1) % SPEAKERS.length)
  const prev = () => setIndex((index - 1 + SPEAKERS.length) % SPEAKERS.length)

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
      {SPEAKERS.length >= 2 && (
        <button
          aria-label="Previous speaker"
          onClick={prev}
          style={arrowStyle}
        >
          ‹
        </button>
      )}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={reduce ? false : { x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { x: -40, opacity: 0 }}
          transition={{ duration: 0.35 }}
          style={{
            width: 480,
            maxWidth: '85vw',
            padding: 48,
            background: '#f8f9fc',
            border: '1px solid rgba(0,0,0,0.08)',
            borderRadius: 16,
            textAlign: 'center',
          }}
        >
          <img
            src={current.img}
            alt={current.alt}
            style={{
              width: 200,
              height: 200,
              objectFit: 'cover',
              borderRadius: '50%',
              margin: '0 auto 16px',
              display: 'block',
              border: '1px solid rgba(0,0,0,0.08)',
            }}
          />
          <div style={{ fontFamily: 'Redaction50, Georgia, serif', fontSize: 28, color: '#0a0a0a' }}>
            {current.name}
          </div>
          <div style={{ fontFamily: 'PPNeueMontreal, Arial, sans-serif', fontSize: 14, color: '#4a8fd4', marginTop: 4 }}>
            {current.company}
          </div>
          <div style={{ fontFamily: 'PPNeueMontreal, Arial, sans-serif', fontSize: 13, color: 'rgba(10,10,10,0.5)', marginTop: 4 }}>
            {current.role}
          </div>
        </motion.div>
      </AnimatePresence>
      {SPEAKERS.length >= 2 && (
        <button
          aria-label="Next speaker"
          onClick={next}
          style={arrowStyle}
        >
          ›
        </button>
      )}
    </div>
  )
}

const arrowStyle: React.CSSProperties = {
  width: 48,
  height: 48,
  borderRadius: '50%',
  border: '1px solid rgba(74,143,212,0.4)',
  background: 'transparent',
  color: '#0a0a0a',
  fontSize: 22,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 150ms ease',
}

// ── Pillar 3 proof: split card grid ──────────────────────────────────────────
function ProjectCard({
  title,
  description,
  tag,
  logo,
  logoAlt,
  large = false,
}: {
  title: string
  description: string
  tag: string
  logo?: string
  logoAlt?: string
  large?: boolean
}) {
  return (
    <div
      style={{
        background: '#f8f9fc',
        border: '0.5px solid rgba(0,0,0,0.08)',
        borderRadius: 16,
        padding: 32,
        position: 'relative',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'all 200ms ease',
      }}
      onMouseEnter={e => {
        ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(74,143,212,0.3)'
        ;(e.currentTarget as HTMLElement).style.boxShadow = '0 0 32px rgba(74,143,212,0.1)'
      }}
      onMouseLeave={e => {
        ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(74,143,212,0.15)'
        ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
      }}
    >
      <div>
        <span
          style={{
            display: 'inline-block',
            padding: '4px 10px',
            border: '1px solid rgba(74,143,212,0.4)',
            borderRadius: 9999,
            fontFamily: 'PPNeueMontreal, Arial, sans-serif',
            fontSize: 11,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#4a8fd4',
            marginBottom: 16,
          }}
        >
          {tag}
        </span>
        <h4
          style={{
            fontFamily: 'Redaction50, Georgia, serif',
            fontSize: large ? 36 : 24,
            color: '#0a0a0a',
            margin: 0,
            lineHeight: 1.15,
          }}
        >
          {title}
        </h4>
        <p style={{ ...BODY_STYLE, fontSize: large ? 16 : 14, marginTop: 12 }}>{description}</p>
      </div>
      {logo && (
        <img
          src={logo}
          alt={logoAlt || ''}
          style={{
            height: large ? 32 : 24,
            objectFit: 'contain',
            opacity: 0.7,
            alignSelf: 'flex-end',
            marginTop: 24,
          }}
        />
      )}
    </div>
  )
}

function ProjectsGrid() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 24,
        maxWidth: 1200,
        margin: '0 auto',
      }}
    >
      <div style={{ display: 'grid', gap: 24, gridColumn: 'span 1' }}>
        <ProjectCard
          title="CACTUS"
          description="A multi-quarter applied-AI build. Members shipping production-grade ML behind the scenes."
          tag="Active"
          logo="/images/sponsors/cactus.png"
          logoAlt="Cactus"
        />
        <ProjectCard
          title="Winter Quarter Project"
          description="The seasonal team build — small groups, shared problem statement, a working demo by end of term."
          tag="Q1 2026"
        />
      </div>
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(74,143,212,0.25), transparent)',
          padding: 1,
          borderRadius: 17,
          gridColumn: 'span 1',
        }}
      >
        <ProjectCard
          title="AWS CloudHacks 2026"
          description="Our flagship hackathon, in partnership with AWS. Cross-disciplinary teams, real cloud infrastructure, and a weekend to ship something that lasts."
          tag="Flagship"
          logo="/images/sponsors/aws.png"
          logoAlt="AWS"
          large
        />
      </div>
    </div>
  )
}

// ── Section root ─────────────────────────────────────────────────────────────
export default function AboutSection() {
  return (
    <section
      id="about"
      style={{ background: '#ffffff', padding: '96px 32px', overflow: 'hidden' }}
    >
      <ValueProp />

      <div style={{ marginTop: 96 }}>
        <Pillar
          iconSide="left"
          icon={<LearningIcon />}
          title="Learning"
          body="Hands-on workshops with the tools that ship products: Claude, Cursor, NVIDIA stacks, Supabase, AWS. You leave with working code, not slides."
          proof={<EventsCarousel />}
        />

        <Pillar
          iconSide="right"
          icon={<CommunityIcon />}
          title="Community"
          body="Speakers, hackathons, and weekly meetings where builders, researchers, and beginners meet. Show up once and you'll know somebody by the end."
          proof={<SpeakersCarousel />}
          stagger={0.1}
        />

        <Pillar
          iconSide="left"
          icon={<ProjectsIcon />}
          title="Projects"
          body="CACTUS, the Winter Quarter Project, and AWS CloudHacks 2026 — real builds, real shipped impact, and a portfolio piece you didn't have to invent."
          proof={<ProjectsGrid />}
          stagger={0.2}
        />
      </div>
    </section>
  )
}

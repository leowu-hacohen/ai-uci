'use client'
import { useEffect, useState } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import { FadeStagger, FadeItem, FadeUp } from '@/components/ui/motion-primitives'

// Shared meeting-info copy (Schedule imports the same string)
export const MEETING_INFO_COPY =
  'Join us every Wednesday at 4:00–5:30pm in DBH 6011 for general meetings and workshops!'
export const MEETING_INFO_SHORT = 'Wednesdays · 4:00–5:30pm · DBH 6011'

// ── Events deck (Pillar 1 carousel) ──────────────────────────────────────────
type Event = { src: string; alt: string; name: string; date: string }
const EVENTS: Event[] = [
  { src: '/images/events/learning-cloudhacks.png',   alt: 'Audience watching the AWS CloudHacks 2025 kickoff',     name: 'AWS CloudHacks',     date: '2025' },
  { src: '/images/events/learning-aws-workshop.png', alt: 'Members working on laptops at an AWS workshop',         name: 'AWS Workshop',       date: '2025' },
  { src: '/images/events/learning-racecar.png',      alt: 'RC racecar racing on an indoor track',                  name: 'RC Racing Workshop', date: '2025' },
  { src: '/images/events/learning-aif.png',          alt: 'Officers tabling at the Anteater Involvement Fair',     name: 'Involvement Fair',   date: '2025' },
  { src: '/images/events/learning-aif2.png',         alt: 'Crowd at the AI @ UCI booth at the Involvement Fair',   name: 'Involvement Fair',   date: '2025' },
  { src: '/images/events/learning-officers.png',     alt: 'Two officers staffing the check-in desk',               name: 'Office Hours',       date: '2025' },
]

// ── Speakers (Pillar 2 carousel) ─────────────────────────────────────────────
// Empty by design. See KTD8 / Pillar 2 empty-state rule.
// Do NOT add placeholder "TBD" entries. Real speakers only.
type Speaker = { img: string; name: string; company: string; role: string; alt: string }
const SPEAKERS: Speaker[] = []

// ── Speaker lineup (mock schedule shown while SPEAKERS is empty) ─────────────
// Visible only when SPEAKERS.length === 0. Treated as a design preview, not a
// confirmed schedule — replace with real entries (or remove) once the lineup
// is locked. Kept separate from SPEAKERS so the "real speakers only" rule
// above is not violated.
type LineupEntry = {
  date: string
  weekday: string
  name: string
  role: string
  company: string
  topic: string
  abstract: string
  location: string
  time: string
}
const SPEAKER_LINEUP: LineupEntry[] = [
  {
    date: 'Oct 1', weekday: 'Wed',
    name: 'Maya Chen', role: 'Research Engineer', company: 'Anthropic',
    topic: 'Building Reliable Agents in Production',
    abstract:
      "What it actually takes to ship agents that don't break the first time a user does something unexpected. Real failures, real fixes, no demos.",
    location: 'DBH 6011', time: '4:00 – 5:30 PM',
  },
  {
    date: 'Oct 8', weekday: 'Wed',
    name: 'Devon Park', role: 'Founding Engineer', company: 'Perplexity',
    topic: 'Search, Retrieval, and the End of the Ten Blue Links',
    abstract:
      'How retrieval became the new ranking, and why the search box may not survive the decade. Lessons from building a generative answer engine.',
    location: 'DBH 6011', time: '4:00 – 5:30 PM',
  },
  {
    date: 'Oct 15', weekday: 'Wed',
    name: 'Sofia Reyes', role: 'PhD Candidate', company: 'UC Irvine',
    topic: 'Mechanistic Interpretability for Beginners',
    abstract:
      "A grad student's primer on opening up the black box. Attention heads, neurons, and circuits, without any prior background required.",
    location: 'DBH 6011', time: '4:00 – 5:30 PM',
  },
  {
    date: 'Oct 22', weekday: 'Wed',
    name: 'Jordan Mehta', role: 'Applied AI Lead', company: 'Stripe',
    topic: 'ML for Fraud at Scale',
    abstract:
      'Fraud detection at billions of transactions per year, where every false positive costs revenue and every miss costs trust. Real architecture, real trade-offs.',
    location: 'DBH 6011', time: '4:00 – 5:30 PM',
  },
  {
    date: 'Oct 29', weekday: 'Wed',
    name: 'Priya Iyer', role: 'Solutions Architect', company: 'AWS',
    topic: 'From Bedrock to Production',
    abstract:
      'From picking a model on Bedrock to keeping it alive in production: latency, cost, eval, and the things that bite you on week two.',
    location: 'DBH 6011', time: '4:00 – 5:30 PM',
  },
  {
    date: 'Nov 5', weekday: 'Wed',
    name: 'Alex Brennan', role: 'Co-founder', company: 'Stealth Startup',
    topic: 'How to Build an AI Company in College',
    abstract:
      'Building a company while still in school. The unfair advantages, the things that will cost you, and how to know if it is worth dropping classes for.',
    location: 'DBH 6011', time: '4:00 – 5:30 PM',
  },
  {
    date: 'Nov 12', weekday: 'Wed',
    name: 'Nathaniel Wong', role: 'Staff ML Engineer', company: 'NVIDIA',
    topic: 'CUDA, Triton, and the Kernel Layer',
    abstract:
      'Everyone talks about prompts. Almost nobody talks about the kernels. A look at the layer of the stack that decides whether your model is fast or just expensive.',
    location: 'DBH 6011', time: '4:00 – 5:30 PM',
  },
  {
    date: 'Nov 19', weekday: 'Wed',
    name: 'Riley Tanaka', role: 'Product Designer', company: 'Linear',
    topic: 'Designing for Agents, Not Users',
    abstract:
      'Most product design is made for humans clicking buttons. When agents become the primary user, every assumption changes. A new design language is emerging.',
    location: 'DBH 6011', time: '4:00 – 5:30 PM',
  },
  {
    date: 'Dec 3', weekday: 'Wed',
    name: 'Hana Patel', role: 'Research Scientist', company: 'Google DeepMind',
    topic: 'Reasoning Models and What Comes After RLHF',
    abstract:
      "Where reasoning models actually came from, what they're really doing under the hood, and the post-RLHF landscape. A research-track talk for builders.",
    location: 'DBH 6011', time: '4:00 – 5:30 PM',
  },
  {
    date: 'Jan 14', weekday: 'Wed',
    name: 'Marcus Holloway', role: 'CTO', company: 'Together AI',
    topic: 'Open Models, Open Infra, Open Future',
    abstract:
      "Why the open model ecosystem matters, what's still missing, and what the next 24 months of inference infrastructure look like.",
    location: 'DBH 6011', time: '4:00 – 5:30 PM',
  },
]

// ── Sponsor logos (for Projects pillar reuse) ────────────────────────────────
// CACTUS uses /images/sponsors/cactus.png; AWS uses /images/sponsors/aws.png

// ── Pillar icons ─────────────────────────────────────────────────────────────
// Processed transparent PNGs (see scripts/process-icons.mjs). The Pillar
// wrapper already applies a blue drop-shadow halo, which composites cleanly
// against the alpha channel.
function LearningIcon() {
  return (
    <img
      src="/images/icons/brain.png"
      alt="Learning"
      style={{ height: 160, width: 'auto', objectFit: 'contain' }}
    />
  )
}

function CommunityIcon() {
  return (
    <img
      src="/images/icons/handshake.png"
      alt="Community"
      style={{ height: 140, width: 'auto', objectFit: 'contain' }}
    />
  )
}

function ProjectsIcon() {
  return (
    <img
      src="/images/icons/rocket.png"
      alt="Projects"
      style={{ height: 168, width: 'auto', objectFit: 'contain' }}
    />
  )
}

// ── Reusable typography tokens ───────────────────────────────────────────────
const BODY_STYLE: React.CSSProperties = {
  fontFamily: 'PPNeueMontreal, Arial, sans-serif',
  fontWeight: 400,
  fontSize: 16,
  lineHeight: 1.6,
  color: 'rgba(10,10,10,0.7)',
}

// ── Subcomponents ────────────────────────────────────────────────────────────

type PillarProps = {
  iconSide: 'left' | 'right'
  icon: React.ReactNode
  title: string
  body: string
  proof: React.ReactNode
  stagger?: number
  // px between the icon/copy row and the proof block. Defaults to 48; the
  // Learning pillar tightens this to 32 because its image grid already reads
  // as a heavy element directly below the copy.
  proofGap?: number
  // Anchor id used by the navbar's #learning / #community / #projects links.
  // Combined with `scroll-margin-top` so the fixed navbar doesn't crop the
  // pill heading when scrolling to the anchor.
  id?: string
}

// Shared row width for all three pillars. Locking the row max-width and
// letting the copy column fill (minmax(0,1fr)) guarantees every pillar
// occupies the exact same horizontal footprint regardless of icon size, so
// the section reads as a uniform stack rather than three different widths.
// Matches CONTENT_MAX used by every other section so the pillar row sits
// flush with the rest of the site grid.
const PILLAR_ROW_MAX = 1200

function Pillar({ iconSide, icon, title, body, proof, stagger = 0, proofGap = 48, id }: PillarProps) {
  // Icon column auto-sizes to the icon's intrinsic width and sits flush
  // against the section's outer edge (left or right depending on `iconSide`),
  // so the text gets the rest of the row and reads as a true two-up.
  const iconCol = (
    <FadeItem>
      <div
        style={{
          display: 'flex',
          justifyContent: iconSide === 'left' ? 'flex-start' : 'flex-end',
        }}
      >
        {icon}
      </div>
    </FadeItem>
  )
  const copyCol = (
    <div style={{ textAlign: 'left', minWidth: 0 }}>
      <FadeItem>
        {/* Pillar label as a clean outlined pill — replaces the previous
            display-sized h3 so the brain/handshake/rocket icon carries the
            visual weight and the body copy reads as the primary content. */}
        <span
          style={{
            display: 'inline-block',
            padding: '8px 22px',
            border: '1px solid rgba(10,10,10,0.85)',
            borderRadius: 9999,
            fontFamily: 'PPNeueMontreal, Arial, sans-serif',
            fontSize: 18,
            fontWeight: 400,
            lineHeight: 1,
            color: '#0a0a0a',
            letterSpacing: '-0.005em',
          }}
        >
          {title}
        </span>
      </FadeItem>
      <FadeItem>
        <p style={{ ...BODY_STYLE, marginTop: 20 }}>{body}</p>
      </FadeItem>
    </div>
  )
  return (
    <div id={id} style={{ scrollMarginTop: 96 }}>
    <FadeStagger
      delay={stagger}
      stagger={0.09}
      amount={0.15}
      style={{ padding: '32px 0' }}
    >
      <div
        className="pillar-row"
        style={{
          display: 'grid',
          // Icon column auto-sizes to its intrinsic width; copy column fills
          // the remaining track. Combined with PILLAR_ROW_MAX, every pillar
          // (regardless of icon dimensions) occupies the exact same row
          // footprint — so Learning / Community / Projects are visually
          // uniform across the full vertical stack.
          gridTemplateColumns:
            iconSide === 'left'
              ? 'auto minmax(0, 1fr)'
              : 'minmax(0, 1fr) auto',
          alignItems: 'center',
          columnGap: 64,
          maxWidth: PILLAR_ROW_MAX,
          margin: `0 auto ${proofGap}px`,
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
      <FadeItem>{proof}</FadeItem>
      {/* Responsive: stack icon over copy on narrow screens so the icon never
          eats half the viewport at phone widths. */}
      <style>{`
        @media (max-width: 768px) {
          .pillar-row {
            grid-template-columns: 1fr !important;
            row-gap: 24px !important;
            text-align: left !important;
          }
        }
      `}</style>
    </FadeStagger>
    </div>
  )
}

// ── Pillar 1 proof: two-image cross-fading display + meeting info ────────────
// Splits EVENTS into pairs and auto-cycles through them every 5s, showing two
// photos side by side with captions. Honors reduced-motion (no auto-advance,
// instant transitions). Click a dot or hover the grid to pause and control.
const EVENT_PAIRS: Event[][] = (() => {
  const pairs: Event[][] = []
  for (let i = 0; i < EVENTS.length; i += 2) pairs.push(EVENTS.slice(i, i + 2))
  return pairs
})()
const EVENTS_AUTOPLAY_MS = 5000

function EventsCarousel() {
  const [pairIndex, setPairIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduce = useReducedMotion()
  const pair = EVENT_PAIRS[pairIndex]

  useEffect(() => {
    if (reduce || paused || EVENT_PAIRS.length < 2) return
    const t = window.setInterval(() => {
      setPairIndex(i => (i + 1) % EVENT_PAIRS.length)
    }, EVENTS_AUTOPLAY_MS)
    return () => window.clearInterval(t)
  }, [reduce, paused])

  return (
    // Carousel intentionally inset narrower than the pillar row above so the
    // image grid reads as a contained sub-block. 880px matches the
    // SpeakerSchedule card width — both Learning + Community proofs share
    // the same horizontal footprint for cross-pillar symmetry, and both sit
    // visibly inset inside the 1200px pillar row.
    <div style={{ maxWidth: 880, margin: '0 auto' }}>
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={pairIndex}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 24,
            }}
            className="events-grid"
          >
            {pair.map(ev => (
              <div key={ev.name + ev.date}>
                <div
                  style={{
                    width: '100%',
                    aspectRatio: '16 / 10',
                    borderRadius: 12,
                    overflow: 'hidden',
                    border: '0.5px solid rgba(0,0,0,0.08)',
                  }}
                >
                  <img
                    src={ev.src}
                    alt={ev.alt}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                </div>
                <div style={{ marginTop: 14 }}>
                  <div
                    style={{
                      fontFamily: 'PPNeueMontreal, Arial, sans-serif',
                      fontSize: 14,
                      color: 'rgba(0,0,0,0.75)',
                    }}
                  >
                    {ev.name}
                  </div>
                  <div
                    style={{
                      fontFamily: 'PPNeueMontreal, Arial, sans-serif',
                      fontSize: 12,
                      color: 'rgba(0,0,0,0.4)',
                      marginTop: 2,
                    }}
                  >
                    {ev.date}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {EVENT_PAIRS.length > 1 && (
        <div
          role="tablist"
          aria-label="Event slides"
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 10,
            marginTop: 24,
          }}
        >
          {EVENT_PAIRS.map((_, i) => {
            const active = i === pairIndex
            return (
              <button
                key={i}
                role="tab"
                aria-selected={active}
                aria-label={`Show event pair ${i + 1} of ${EVENT_PAIRS.length}`}
                onClick={() => setPairIndex(i)}
                style={{
                  width: active ? 24 : 6,
                  height: 6,
                  borderRadius: 9999,
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  background: active ? '#0a0a0a' : 'rgba(0,0,0,0.18)',
                  transition: 'all 250ms cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
            )
          })}
        </div>
      )}

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

      {/* Stack pair vertically on narrow screens so each image keeps a
          comfortable size rather than getting crushed into half the viewport. */}
      <style>{`
        @media (max-width: 720px) {
          .events-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}

// ── Pillar 2 proof: interactive speaker schedule (mock lineup) ──────────────
// Small two-pane card. Left = date list (click or arrow-keys to navigate),
// right = animated detail pane. Replaces the previous "coming soon" empty
// state while SPEAKERS is still being finalized.
function SpeakerSchedule() {
  const [selected, setSelected] = useState(0)
  const reduce = useReducedMotion()
  const current = SPEAKER_LINEUP[selected]
  const initials = current.name
    .split(' ')
    .map(s => s[0])
    .slice(0, 2)
    .join('')

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault()
      setSelected(i => (i + 1) % SPEAKER_LINEUP.length)
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault()
      setSelected(i => (i - 1 + SPEAKER_LINEUP.length) % SPEAKER_LINEUP.length)
    }
  }

  return (
    <div
      style={{
        maxWidth: 880,
        margin: '0 auto',
        background: '#f8f9fc',
        border: '0.5px solid rgba(0,0,0,0.08)',
        borderRadius: 16,
        overflow: 'hidden',
      }}
      onKeyDown={onKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Speaker schedule"
    >
      <div style={{ padding: '18px 28px', borderBottom: '0.5px solid rgba(0,0,0,0.06)' }}>
        <div style={{ fontFamily: 'Redaction50, Georgia, serif', fontSize: 22, color: '#0a0a0a', lineHeight: 1.1 }}>
          Fall &rsquo;25 – Winter &rsquo;26 Speaker Series
        </div>
        <div style={{ fontFamily: 'PPNeueMontreal, Arial, sans-serif', fontSize: 13, color: 'rgba(0,0,0,0.5)', marginTop: 4 }}>
          Wednesdays · DBH 6011 · 4:00 PM
        </div>
      </div>

      <div
        className="speakers-grid"
        style={{ display: 'grid', gridTemplateColumns: '240px 1fr', minHeight: 360 }}
      >
        <div
          role="listbox"
          aria-label="Upcoming talks"
          style={{
            borderRight: '0.5px solid rgba(0,0,0,0.06)',
            padding: '8px 0',
            maxHeight: 400,
            overflowY: 'auto',
          }}
        >
          {SPEAKER_LINEUP.map((ev, i) => {
            const isActive = i === selected
            return (
              <button
                key={`${ev.date}-${ev.name}`}
                onClick={() => setSelected(i)}
                role="option"
                aria-selected={isActive}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  padding: '12px 20px',
                  background: isActive ? 'rgba(74,143,212,0.08)' : 'transparent',
                  borderLeft: `2px solid ${isActive ? '#4a8fd4' : 'transparent'}`,
                  borderTop: 'none',
                  borderRight: 'none',
                  borderBottom: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'background 120ms ease',
                  fontFamily: 'PPNeueMontreal, Arial, sans-serif',
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    ;(e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.025)'
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    ;(e.currentTarget as HTMLElement).style.background = 'transparent'
                  }
                }}
              >
                <div style={{ width: 52, flexShrink: 0 }}>
                  <div
                    style={{
                      fontSize: 10,
                      color: 'rgba(0,0,0,0.4)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      lineHeight: 1.2,
                    }}
                  >
                    {ev.weekday}
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      color: isActive ? '#4a8fd4' : '#0a0a0a',
                      fontWeight: isActive ? 500 : 400,
                      marginTop: 2,
                    }}
                  >
                    {ev.date}
                  </div>
                </div>
                <div style={{ flex: 1, marginLeft: 8, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 13,
                      color: '#0a0a0a',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {ev.name}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: 'rgba(0,0,0,0.45)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      marginTop: 1,
                    }}
                  >
                    {ev.company}
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        <div style={{ padding: '28px 32px', position: 'relative' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div
                  aria-hidden="true"
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: '50%',
                    background:
                      'linear-gradient(135deg, rgba(74,143,212,0.18), rgba(74,143,212,0.06))',
                    border: '0.5px solid rgba(74,143,212,0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'Redaction50, Georgia, serif',
                    fontSize: 18,
                    color: '#4a8fd4',
                    flexShrink: 0,
                  }}
                >
                  {initials}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily: 'Redaction50, Georgia, serif',
                      fontSize: 22,
                      color: '#0a0a0a',
                      lineHeight: 1.1,
                    }}
                  >
                    {current.name}
                  </div>
                  <div
                    style={{
                      fontFamily: 'PPNeueMontreal, Arial, sans-serif',
                      fontSize: 13,
                      color: 'rgba(0,0,0,0.55)',
                      marginTop: 3,
                    }}
                  >
                    {current.role} · {current.company}
                  </div>
                </div>
              </div>

              <div
                style={{
                  fontFamily: 'PPNeueMontreal, Arial, sans-serif',
                  fontSize: 15,
                  fontStyle: 'italic',
                  color: '#0a0a0a',
                  marginTop: 22,
                  lineHeight: 1.35,
                }}
              >
                &ldquo;{current.topic}&rdquo;
              </div>

              <p
                style={{
                  fontFamily: 'PPNeueMontreal, Arial, sans-serif',
                  fontSize: 13,
                  lineHeight: 1.55,
                  color: 'rgba(0,0,0,0.65)',
                  marginTop: 10,
                  marginBottom: 0,
                }}
              >
                {current.abstract}
              </p>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 18,
                  marginTop: 22,
                  paddingTop: 16,
                  borderTop: '0.5px solid rgba(0,0,0,0.06)',
                  fontFamily: 'PPNeueMontreal, Arial, sans-serif',
                  fontSize: 12,
                  color: 'rgba(0,0,0,0.55)',
                }}
              >
                <span>{current.location}</span>
                <span style={{ color: 'rgba(0,0,0,0.2)' }}>·</span>
                <span>{current.time}</span>
                <span style={{ color: 'rgba(0,0,0,0.2)' }}>·</span>
                <span style={{ color: '#4a8fd4' }}>
                  {selected + 1} / {SPEAKER_LINEUP.length}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .speakers-grid { grid-template-columns: 1fr !important; }
          .speakers-grid > div:first-child {
            border-right: none !important;
            border-bottom: 0.5px solid rgba(0,0,0,0.06) !important;
            max-height: 220px !important;
          }
        }
      `}</style>
    </div>
  )
}

// ── Pillar 2 proof: speaker carousel (or empty-state) ───────────────────────
function SpeakersCarousel() {
  const [index, setIndex] = useState(0)
  const reduce = useReducedMotion()

  if (SPEAKERS.length === 0) {
    return <SpeakerSchedule />
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
  image,
  imageAlt,
  imageHeight,
}: {
  title: string
  description: string
  tag: string
  logo?: string
  logoAlt?: string
  large?: boolean
  // Optional hero image that fills the card's mid-section between the copy
  // block and the sponsor logo. Used on the AWS CloudHacks card to show the
  // room from last year.
  image?: string
  imageAlt?: string
  // Optional fixed pixel height for the image. When omitted, the image renders
  // at a 16:10 aspect ratio (CloudHacks default). When set, the image becomes
  // a short cropped banner — used on CACTUS and Winter Quarter Project so
  // their cards stay short enough that they don't stretch the AWS card.
  imageHeight?: number
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
      {image && (
        <img
          src={image}
          alt={imageAlt || ''}
          style={{
            width: '100%',
            ...(imageHeight
              ? { height: imageHeight }
              : { aspectRatio: '16 / 10' }),
            objectFit: 'cover',
            borderRadius: 10,
            marginTop: 24,
            border: '1px solid rgba(0,0,0,0.06)',
          }}
        />
      )}
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
          image="/images/projects/cactus-cover.png"
          imageAlt="Editorial illustration of a saguaro cactus against a desert sky"
          imageHeight={100}
        />
        <ProjectCard
          title="Winter Quarter Project"
          description="The seasonal team build: small groups, shared problem statement, a working demo by end of term."
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
          image="/images/events/learning-cloudhacks.png"
          imageAlt="Audience at the AWS CloudHacks 2025 kickoff"
        />
      </div>
    </div>
  )
}

// ── Who We Are block ─────────────────────────────────────────────────────────
function WhoWeAre() {
  const reduce = useReducedMotion()
  // Photos are fan-stacked inside a square right-column container. `width` is
  // the percentage of the container each card spans; `top`/`left` are the
  // un-rotated anchor. Sized so the rotated bounding boxes of all three stay
  // inside the container — none get clipped at the section's right edge.
  const photos = [
    {
      src: '/images/events/learning-aws-workshop.png',
      alt: 'Members working on laptops at an AWS workshop',
      rotate: '-7deg',
      top: '4%',
      left: '2%',
      width: '66%',
      z: 1,
    },
    {
      src: '/images/events/learning-aif2.png',
      alt: 'Crowd at the AI @ UCI booth at the Involvement Fair',
      rotate: '6deg',
      top: '24%',
      left: '30%',
      width: '66%',
      z: 2,
    },
    {
      src: '/images/events/team-2026.png',
      alt: 'AI @ UCI officer team group photo',
      rotate: '-2deg',
      top: '10%',
      left: '15%',
      width: '70%',
      z: 3,
    },
  ]
  return (
    <FadeStagger
      stagger={0.1}
      amount={0.25}
      className="who-we-are"
      style={{
        maxWidth: 1200,
        margin: '0 auto 24px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 64,
        alignItems: 'center',
      }}
    >
      {/* Left column: heading + body + stats */}
      <div>
        <FadeItem>
          <h2
            style={{
              fontFamily: 'Redaction50, Georgia, serif',
              fontSize: 'clamp(40px, 5.5vw, 64px)',
              lineHeight: 1.05,
              color: '#0a0a0a',
              fontWeight: 400,
              margin: 0,
            }}
          >
            Who We Are
          </h2>
        </FadeItem>
        <FadeItem>
          <p
            style={{
              fontFamily: 'PPNeueMontreal, Arial, sans-serif',
              fontWeight: 400,
              fontSize: 17,
              lineHeight: 1.6,
              color: 'rgba(10,10,10,0.7)',
              margin: '24px 0 0',
              maxWidth: 540,
            }}
          >
            AI @ UCI is UC Irvine&apos;s student-run artificial intelligence club. We bring together
            builders, researchers, and curious minds to learn by doing through hands-on workshops,
            real projects, and a community that grows together every quarter.
          </p>
        </FadeItem>

        <FadeItem>
          <div
            style={{
              marginTop: 24,
              display: 'grid',
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
              rowGap: 40,
              columnGap: 32,
              maxWidth: 540,
            }}
          >
            <Stat number="500+" label="active members" />
            <Stat number="15+" label="shipped projects" />
            <Stat number="20+" label="quarters running" />
          </div>
        </FadeItem>
      </div>

      {/* Right column: fanned photo stack — each card fades + rotates into place */}
      <div
        className="who-we-are-photos"
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '1 / 1',
          minHeight: 380,
        }}
      >
        {photos.map((p, i) => {
          const initial = reduce
            ? false
            : { opacity: 0, scale: 0.92, rotate: 0 }
          const target = { opacity: 1, scale: 1, rotate: parseFloat(p.rotate) }
          return (
            <motion.img
              key={i}
              src={p.src}
              alt={p.alt}
              initial={initial}
              whileInView={target}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.8,
                delay: 0.25 + i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                position: 'absolute',
                top: p.top,
                left: p.left,
                width: p.width,
                aspectRatio: '4 / 3',
                objectFit: 'cover',
                borderRadius: 12,
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                zIndex: p.z,
                transformOrigin: 'center center',
              }}
            />
          )
        })}
      </div>

      {/* Responsive: stack columns and let photos fill the row on small screens. */}
      <style>{`
        @media (max-width: 768px) {
          .who-we-are {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .who-we-are-photos {
            aspect-ratio: 4 / 3 !important;
            min-height: 320px !important;
          }
        }
      `}</style>
    </FadeStagger>
  )
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <div
        style={{
          fontFamily: 'PPNeueMontreal, Arial, sans-serif',
          fontWeight: 700,
          fontSize: 'clamp(36px, 4vw, 52px)',
          lineHeight: 1,
          color: '#0a0a0a',
        }}
      >
        {number}
      </div>
      <div
        style={{
          fontFamily: 'PPNeueMontreal, Arial, sans-serif',
          fontWeight: 400,
          fontSize: 15,
          color: 'rgba(10,10,10,0.55)',
          marginTop: 8,
        }}
      >
        {label}
      </div>
    </div>
  )
}

// ── Section root ─────────────────────────────────────────────────────────────
export default function AboutSection() {
  return (
    <section
      id="about"
      style={{
        background: '#ffffff',
        scrollMarginTop: 96,
        // Unified site-wide horizontal gutter (matches Team, Schedule).
        // Vertical rhythm: 96px on all major sections.
        padding: '96px clamp(24px, 5vw, 64px)',
        overflow: 'hidden',
      }}
    >
      <WhoWeAre />

      <div>
        <FadeUp>
          <h2
            style={{
              fontFamily: 'Redaction50, Georgia, serif',
              fontSize: 'clamp(40px, 5.5vw, 64px)',
              lineHeight: 1.05,
              color: '#0a0a0a',
              fontWeight: 400,
              margin: '0 0 8px',
              textAlign: 'center',
            }}
          >
            What We Provide
          </h2>
        </FadeUp>

        <Pillar
          id="learning"
          iconSide="left"
          icon={<LearningIcon />}
          title="Learning"
          body="We run workshops every week on the tools people actually ship with. Claude, AWS, Cursor, NVIDIA stacks, Supabase. Not intro slides, not surface-level overviews. You come in, you build something that works, and you leave understanding why it works. The goal is that you walk out with something you can actually use."
          proof={<EventsCarousel />}
          proofGap={32}
        />

        <Pillar
          id="community"
          iconSide="right"
          icon={<CommunityIcon />}
          title="Community"
          body="Engineers, researchers, and founders come through to talk about what they're really working on. Not polished keynotes, actual conversations about what's hard and what's working. Outside of that, we meet every Wednesday and the room fills up fast. Show up once and you'll know people by the end of the night."
          proof={<SpeakersCarousel />}
          stagger={0.1}
          proofGap={32}
        />

        <Pillar
          id="projects"
          iconSide="left"
          icon={<ProjectsIcon />}
          title="Projects"
          body="CACTUS, Winter Quarter Project, AWS CloudHacks 2026. These aren't school assignments with a rubric. They're real projects with real timelines, built by small teams who actually care about the outcome. The kind of thing you can pull up in an interview and walk someone through start to finish."
          proof={<ProjectsGrid />}
          stagger={0.2}
        />
      </div>
    </section>
  )
}

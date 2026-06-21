'use client'
import { useState } from 'react'
import { FadeStagger, FadeItem } from '@/components/ui/motion-primitives'
import { MEETING_INFO_SHORT } from './about'

type Workshop = {
  date: string
  weekday: string
  title: string
  description: string
  time: string
  location: string
}

type PastEvent = {
  src: string
  alt: string
  title: string
  year: string
}

const UPCOMING: Workshop[] = [
  {
    date: 'Every Wed',
    weekday: 'Weekly',
    title: 'General Meeting + Workshop',
    description:
      'Our standing weekly slot. Workshops rotate through Claude, AWS, Cursor, NVIDIA stacks, and whatever members want to learn next.',
    time: '4:00 – 5:30 PM',
    location: 'DBH 6011',
  },
  {
    date: 'Mar 12',
    weekday: 'Wed',
    title: 'Cursor Build Night',
    description:
      'Ship a small app from scratch using Cursor. Bring a laptop, leave with something running.',
    time: '4:00 – 5:30 PM',
    location: 'DBH 6011',
  },
  {
    date: 'Mar 19',
    weekday: 'Wed',
    title: 'AWS Bedrock Workshop',
    description:
      'From model pick to production deploy. Latency, cost, and the things that bite you on week two.',
    time: '4:00 – 5:30 PM',
    location: 'DBH 6011',
  },
  {
    date: 'Apr 2',
    weekday: 'Wed',
    title: 'Speaker: Building Agents in Production',
    description:
      'Industry guest on what it takes to ship agents that don\'t break the first time a user does something unexpected.',
    time: '4:00 – 5:30 PM',
    location: 'DBH 6011',
  },
]

const PAST_EVENTS: PastEvent[] = [
  {
    src: '/images/events/learning-cloudhacks.png',
    alt: 'Audience at the AWS CloudHacks kickoff',
    title: 'AWS CloudHacks',
    year: '2025',
  },
  {
    src: '/images/events/learning-aws-workshop.png',
    alt: 'Members at an AWS workshop',
    title: 'AWS Workshop',
    year: '2025',
  },
  {
    src: '/images/events/learning-aif2.png',
    alt: 'Crowd at the Involvement Fair booth',
    title: 'Involvement Fair',
    year: '2025',
  },
  {
    src: '/images/events/learning-racecar.png',
    alt: 'RC racecar workshop',
    title: 'RC Racing Workshop',
    year: '2025',
  },
  {
    src: '/images/events/learning-aif.png',
    alt: 'Officers tabling at the Involvement Fair',
    title: 'Involvement Fair',
    year: '2025',
  },
  {
    src: '/images/events/learning-officers.png',
    alt: 'Officers at the check-in desk',
    title: 'Office Hours',
    year: '2025',
  },
]

const BODY_STYLE: React.CSSProperties = {
  fontFamily: 'PPNeueMontreal, Arial, sans-serif',
  fontSize: 15,
  lineHeight: 1.6,
  color: 'rgba(10,10,10,0.7)',
}

export default function EventsPageContent() {
  const [selected, setSelected] = useState(0)
  const current = UPCOMING[selected]

  return (
  <>
    <section style={{ padding: '0 clamp(24px, 5vw, 64px) 80px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <FadeStagger stagger={0.08} amount={0.15}>
          <FadeItem>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 12,
                marginBottom: 32,
              }}
            >
              <h2
                style={{
                  fontFamily: 'Redaction50, Georgia, serif',
                  fontSize: 'clamp(28px, 4vw, 40px)',
                  lineHeight: 1.1,
                  color: '#0a0a0a',
                  fontWeight: 400,
                  margin: 0,
                }}
              >
                Upcoming
              </h2>
              <span
                style={{
                  fontFamily: 'PPNeueMontreal, Arial, sans-serif',
                  fontSize: 14,
                  color: 'rgba(74,143,212,0.85)',
                }}
              >
                {MEETING_INFO_SHORT}
              </span>
            </div>
          </FadeItem>

          <FadeItem>
            <div
              className="events-calendar"
              style={{
                display: 'grid',
                gridTemplateColumns: '220px 1fr',
                border: '0.5px solid rgba(0,0,0,0.08)',
                borderRadius: 16,
                overflow: 'hidden',
                background: '#f8f9fc',
              }}
            >
              <div
                role="listbox"
                aria-label="Upcoming events"
                style={{
                  borderRight: '0.5px solid rgba(0,0,0,0.06)',
                  padding: '8px 0',
                }}
              >
                {UPCOMING.map((ev, i) => {
                  const active = i === selected
                  return (
                    <button
                      key={ev.title + ev.date}
                      onClick={() => setSelected(i)}
                      role="option"
                      aria-selected={active}
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: '14px 20px',
                        background: active ? 'rgba(74,143,212,0.08)' : 'transparent',
                        border: 'none',
                        borderLeft: `2px solid ${active ? '#4a8fd4' : 'transparent'}`,
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontFamily: 'PPNeueMontreal, Arial, sans-serif',
                      }}
                    >
                      <div
                        style={{
                          fontSize: 10,
                          color: 'rgba(0,0,0,0.4)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                        }}
                      >
                        {ev.weekday}
                      </div>
                      <div
                        style={{
                          fontSize: 14,
                          color: active ? '#4a8fd4' : '#0a0a0a',
                          fontWeight: active ? 500 : 400,
                          marginTop: 2,
                        }}
                      >
                        {ev.date}
                      </div>
                      <div
                        style={{
                          fontSize: 12,
                          color: 'rgba(0,0,0,0.5)',
                          marginTop: 4,
                          lineHeight: 1.3,
                        }}
                      >
                        {ev.title}
                      </div>
                    </button>
                  )
                })}
              </div>

              <div style={{ padding: '32px 36px' }}>
                <h3
                  style={{
                    fontFamily: 'Redaction50, Georgia, serif',
                    fontSize: 28,
                    color: '#0a0a0a',
                    margin: '0 0 12px',
                    lineHeight: 1.15,
                  }}
                >
                  {current.title}
                </h3>
                <p style={{ ...BODY_STYLE, margin: '0 0 20px' }}>{current.description}</p>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 16,
                    fontFamily: 'PPNeueMontreal, Arial, sans-serif',
                    fontSize: 13,
                    color: 'rgba(10,10,10,0.55)',
                  }}
                >
                  <span>{current.location}</span>
                  <span style={{ color: 'rgba(0,0,0,0.2)' }}>·</span>
                  <span>{current.time}</span>
                </div>
              </div>
            </div>
          </FadeItem>
        </FadeStagger>

        <style>{`
          @media (max-width: 720px) {
            .events-calendar {
              grid-template-columns: 1fr !important;
            }
            .events-calendar > div:first-child {
              border-right: none !important;
              border-bottom: 0.5px solid rgba(0,0,0,0.06) !important;
            }
          }
        `}</style>
      </div>
    </section>

    <section style={{ padding: '0 clamp(24px, 5vw, 64px) 96px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <FadeStagger stagger={0.06} amount={0.15}>
          <FadeItem>
            <h2
              style={{
                fontFamily: 'Redaction50, Georgia, serif',
                fontSize: 'clamp(28px, 4vw, 40px)',
                lineHeight: 1.1,
                color: '#0a0a0a',
                fontWeight: 400,
                margin: '0 0 32px',
                textAlign: 'center',
              }}
            >
              Past events
            </h2>
          </FadeItem>
          <FadeItem>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: 24,
              }}
            >
              {PAST_EVENTS.map(ev => (
                <div key={ev.src + ev.title}>
                  <div
                    style={{
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
                  <div
                    style={{
                      marginTop: 12,
                      fontFamily: 'PPNeueMontreal, Arial, sans-serif',
                      fontSize: 14,
                      color: 'rgba(0,0,0,0.75)',
                    }}
                  >
                    {ev.title}
                  </div>
                  <div
                    style={{
                      fontFamily: 'PPNeueMontreal, Arial, sans-serif',
                      fontSize: 12,
                      color: 'rgba(0,0,0,0.4)',
                      marginTop: 2,
                    }}
                  >
                    {ev.year}
                  </div>
                </div>
              ))}
            </div>
          </FadeItem>
        </FadeStagger>
      </div>
    </section>
  </>
  )
}

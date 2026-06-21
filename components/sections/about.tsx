'use client'
import Link from 'next/link'
import { FadeStagger, FadeItem, FadeUp, RevealFanPhoto, ScrollParallax, REVEAL_EASE, REVEAL_VIEWPORT } from '@/components/ui/motion-primitives'
import { motion } from 'framer-motion'

// Shared meeting-info copy (Schedule imports MEETING_INFO_SHORT)
export const MEETING_INFO_COPY =
  'Join us every Wednesday at 4:00–5:30pm in DBH 6011 for general meetings and workshops!'
export const MEETING_INFO_SHORT = 'Wednesdays · 4:00–5:30pm · DBH 6011'

// ── Pillar icons ─────────────────────────────────────────────────────────────
// All three icons are pre-processed transparent PNGs (see
// scripts/process-icons.mjs). Sizes are deliberately uniform so the right-hand
// icon column reads as a consistent accent across Learning / Community /
// Projects rather than three different visual weights.
const PILLAR_ICON_HEIGHT = 96

function LearningIcon() {
  return (
    <img
      src="/images/icons/brain.png"
      alt="Learning"
      style={{ height: PILLAR_ICON_HEIGHT, width: 'auto', maxWidth: '100%', objectFit: 'contain' }}
    />
  )
}

function CommunityIcon() {
  return (
    <img
      src="/images/icons/handshake.png"
      alt="Community"
      style={{ height: 80, width: 'auto', maxWidth: '100%', objectFit: 'contain' }}
    />
  )
}

function ProjectsIcon() {
  return (
    <img
      src="/images/icons/rocket.png"
      alt="Projects"
      style={{ height: 128, width: 'auto', maxWidth: '100%', objectFit: 'contain' }}
    />
  )
}

// ── Reusable typography tokens ───────────────────────────────────────────────
const PILLAR_BODY_STYLE: React.CSSProperties = {
  fontFamily: 'PPNeueMontreal, Arial, sans-serif',
  fontWeight: 400,
  fontSize: 17,
  lineHeight: 1.6,
  color: 'rgba(10,10,10,0.7)',
}

// ── Pillar ───────────────────────────────────────────────────────────────────
// One row, three columns, identical for all three pillars:
//   [ photo 360 ] [ pill + body, fluid ] [ icon, auto ]
// All columns top-aligned so the pill label, photo top, and icon top sit on
// the same horizontal line — that visual anchor is what makes the three
// pillars read as a uniform stack rather than three separate compositions.
type PillarProps = {
  id?: string
  photo: { src: string; alt: string }
  icon: React.ReactNode
  title: string
  body: string
  stagger?: number
  // Projects pillar: events CTA row shares the same 3-column grid below the main row.
  eventsExtension?: boolean
}

// Shared pillar row width — matches the wide What We Provide layout.
const PILLAR_ROW_MAX = 1200
const PILLAR_PHOTO_MAX = 360
// Fixed icon track so brain / handshake / rocket share the same vertical axis.
const PILLAR_ICON_COL = 128

const EVENTS_CTA_BODY =
  'Workshops every week, speakers from industry, and the events that fill the room.'

function EventsCtaArrow() {
  return (
    <motion.img
      className="events-cta-arrow"
      src="/images/events-cta-arrow.png"
      alt=""
      aria-hidden="true"
      draggable={false}
      initial={{ opacity: 0, x: -10, scaleY: -1 }}
      whileInView={{ opacity: 1, x: 0, scaleY: -1 }}
      viewport={REVEAL_VIEWPORT}
      transition={{ duration: 0.7, delay: 0, ease: REVEAL_EASE }}
      style={{
        position: 'absolute',
        right: 'calc(100% + 18px)',
        top: '-46px',
        width: 100,
        height: 'auto',
        pointerEvents: 'none',
        transformOrigin: 'center center',
      }}
    />
  )
}

function Pillar({ id, photo, icon, title, body, stagger = 0, eventsExtension = false }: PillarProps) {
  return (
    <div id={id} style={{ scrollMarginTop: 96 }}>
      <FadeStagger
        delay={stagger}
        stagger={0.09}
        amount={0.2}
        style={{ padding: '24px 0' }}
      >
        <div
          className="pillar-row"
          style={{
            display: 'grid',
            // Photo locks at PILLAR_PHOTO_MAX, copy fills the remaining track,
            // icon hugs its intrinsic width. minmax(0, …) on the copy track
            // is critical — without it long body copy can blow out the row
            // width and break the uniform widths across pillars.
            gridTemplateColumns: `${PILLAR_PHOTO_MAX}px minmax(0, 1fr) ${PILLAR_ICON_COL}px`,
            alignItems: 'start',
            columnGap: 56,
            maxWidth: PILLAR_ROW_MAX,
            margin: '0 auto',
          }}
        >
          {/* LEFT — photo */}
          <FadeItem duration={0.85}>
            <div
              style={{
                width: '100%',
                aspectRatio: '4 / 3',
                borderRadius: 16,
                overflow: 'hidden',
                border: '0.5px solid rgba(0,0,0,0.06)',
                background: '#f4f5f8',
                boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
              }}
            >
              <motion.img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
                draggable={false}
                initial={{ scale: 1.06 }}
                whileInView={{ scale: 1 }}
                viewport={REVEAL_VIEWPORT}
                transition={{ duration: 0.9, ease: REVEAL_EASE }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>
          </FadeItem>

          {/* MIDDLE — pill label + body copy */}
          <div style={{ textAlign: 'left', minWidth: 0 }}>
            <FadeItem>
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
              <p style={{ ...PILLAR_BODY_STYLE, marginTop: 32 }}>{body}</p>
            </FadeItem>
          </div>

          {/* RIGHT — icon, centered in fixed column for vertical-axis symmetry */}
          <FadeItem>
            <div
              style={{
                width: PILLAR_ICON_COL,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}
            >
              {icon}
            </div>
          </FadeItem>
        </div>

        {eventsExtension && (
          <div
            className="pillar-events-row"
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: 48,
              padding: '28px 0',
              maxWidth: PILLAR_ROW_MAX,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <div
              className="pillar-events-inner"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 49,
              }}
            >
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <EventsCtaArrow />
                <motion.div
                  initial={{ opacity: 0, y: 14, scale: 0.97 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={REVEAL_VIEWPORT}
                  transition={{ duration: 0.75, delay: 0.22, ease: REVEAL_EASE }}
                >
                  <Link
                    href="/events"
                    data-cursor-hover=""
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginLeft: 28,
                      padding: '26px 37px',
                      minHeight: 73,
                      background: '#4a8fd4',
                      color: '#ffffff',
                      borderRadius: 9999,
                      fontFamily: 'PPNeueMontreal, Arial, sans-serif',
                      fontWeight: 500,
                      fontSize: 20,
                      letterSpacing: '0.01em',
                      textDecoration: 'none',
                      transition: 'background 150ms ease',
                      boxSizing: 'border-box',
                      whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={e => {
                      ;(e.currentTarget as HTMLElement).style.background = '#3a7fc4'
                    }}
                    onMouseLeave={e => {
                      ;(e.currentTarget as HTMLElement).style.background = '#4a8fd4'
                    }}
                  >
                    Check out our events
                  </Link>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 14, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={REVEAL_VIEWPORT}
                transition={{ duration: 0.75, delay: 0.38, ease: REVEAL_EASE }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: 14,
                  maxWidth: 428,
                  marginLeft: 28,
                }}
              >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                    }}
                  >
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <rect x="3" y="5" width="18" height="16" rx="2" stroke="#4a8fd4" strokeWidth="2" />
                      <line x1="3" y1="10" x2="21" y2="10" stroke="#4a8fd4" strokeWidth="2" />
                      <line x1="8" y1="3" x2="8" y2="7" stroke="#4a8fd4" strokeWidth="2" strokeLinecap="round" />
                      <line x1="16" y1="3" x2="16" y2="7" stroke="#4a8fd4" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <span
                      style={{
                        fontFamily: 'PPNeueMontreal, Arial, sans-serif',
                        fontSize: 17,
                        color: 'rgba(74,143,212,0.85)',
                      }}
                    >
                      {MEETING_INFO_SHORT}
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: 'PPNeueMontreal, Arial, sans-serif',
                      fontSize: 20,
                      lineHeight: 1.55,
                      color: 'rgba(10,10,10,0.65)',
                      margin: 0,
                      textAlign: 'left',
                    }}
                  >
                    {EVENTS_CTA_BODY}
                  </p>
              </motion.div>
            </div>
          </div>
        )}

        {/* Responsive: stack photo → text → icon vertically on narrow screens
            so the photo never gets crushed into a third of the viewport. */}
        <style>{`
          @media (max-width: 768px) {
            .pillar-row {
              grid-template-columns: 1fr !important;
              row-gap: 24px !important;
              text-align: left !important;
            }
            .pillar-row > *:last-child {
              justify-content: flex-start !important;
            }
            .pillar-events-row {
              padding-left: 0 !important;
              padding-right: 0 !important;
            }
            .pillar-events-inner {
              flex-direction: column !important;
              align-items: center !important;
              text-align: center !important;
            }
            .pillar-events-inner a[href="/events"] {
              margin-left: 0 !important;
            }
            .pillar-events-inner > div:last-child {
              align-items: center !important;
              max-width: none !important;
              margin-left: 0 !important;
            }
            .pillar-events-inner p {
              text-align: center !important;
            }
            .events-cta-arrow {
              display: none !important;
            }
          }
        `}</style>
      </FadeStagger>
    </div>
  )
}

// ── Who We Are block ─────────────────────────────────────────────────────────
function WhoWeAre() {
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
      <ScrollParallax
        className="who-we-are-photos"
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '1 / 1',
          minHeight: 380,
        }}
        yOffset={36}
      >
        {photos.map((p, i) => (
          <RevealFanPhoto
            key={i}
            src={p.src}
            alt={p.alt}
            index={i}
            rotate={p.rotate}
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
            }}
          />
        ))}
      </ScrollParallax>

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
        padding: '96px clamp(24px, 5vw, 64px) 24px',
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
          photo={{
            src: '/images/events/learning-aws-workshop.png',
            alt: 'Members working on laptops at an AWS workshop',
          }}
          icon={<LearningIcon />}
          title="Learning"
          body="We run workshops every week on the tools people actually ship with. Claude, AWS, Cursor, NVIDIA stacks, Supabase. Not intro slides, not surface-level overviews. You come in, you build something that works, and you leave understanding why it works. The goal is that you walk out with something you can actually use."
        />

        <Pillar
          id="community"
          photo={{
            src: '/images/events/learning-aif2.png',
            alt: 'Crowd at the AI @ UCI booth at the Involvement Fair',
          }}
          icon={<CommunityIcon />}
          title="Community"
          body="Engineers, researchers, and founders come through to talk about what they're really working on. Not polished keynotes, actual conversations about what's hard and what's working. Outside of that, we meet every Wednesday and the room fills up fast. Show up once and you'll know people by the end of the night."
          stagger={0.1}
        />

        <Pillar
          id="projects"
          photo={{
            src: '/images/events/learning-cloudhacks.png',
            alt: 'Audience at the AWS CloudHacks 2025 kickoff',
          }}
          icon={<ProjectsIcon />}
          title="Projects"
          body="CACTUS, Winter Quarter Project, AWS CloudHacks 2026. These aren't school assignments with a rubric. They're real projects with real timelines, built by small teams who actually care about the outcome. The kind of thing you can pull up in an interview and walk someone through start to finish."
          stagger={0.2}
          eventsExtension
        />
      </div>
    </section>
  )
}

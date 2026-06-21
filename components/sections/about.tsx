'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { FadeStagger, FadeItem, FadeUp } from '@/components/ui/motion-primitives'

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
      style={{ height: PILLAR_ICON_HEIGHT, width: 'auto', objectFit: 'contain' }}
    />
  )
}

function CommunityIcon() {
  return (
    <img
      src="/images/icons/handshake.png"
      alt="Community"
      style={{ height: PILLAR_ICON_HEIGHT, width: 'auto', objectFit: 'contain' }}
    />
  )
}

function ProjectsIcon() {
  return (
    <img
      src="/images/icons/rocket.png"
      alt="Projects"
      style={{ height: PILLAR_ICON_HEIGHT, width: 'auto', objectFit: 'contain' }}
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
}

// Shared section grid — matches CONTENT_MAX used by every other section so
// the pillar row sits flush with the rest of the site grid.
const PILLAR_ROW_MAX = 1200
const PILLAR_PHOTO_MAX = 360

function Pillar({ id, photo, icon, title, body, stagger = 0 }: PillarProps) {
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
            gridTemplateColumns: `${PILLAR_PHOTO_MAX}px minmax(0, 1fr) auto`,
            alignItems: 'start',
            columnGap: 56,
            maxWidth: PILLAR_ROW_MAX,
            margin: '0 auto',
          }}
        >
          {/* LEFT — photo */}
          <FadeItem>
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
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
                draggable={false}
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

          {/* RIGHT — icon, top-aligned with the pill label */}
          <FadeItem>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'flex-start',
              }}
            >
              {icon}
            </div>
          </FadeItem>
        </div>

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
          }
        `}</style>
      </FadeStagger>
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
        />
      </div>
    </section>
  )
}

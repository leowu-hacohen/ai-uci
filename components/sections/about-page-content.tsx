'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { FadeStagger, FadeItem, FadeUp } from '@/components/ui/motion-primitives'
import TeamSection from './team'

const BODY_STYLE: React.CSSProperties = {
  fontFamily: 'PPNeueMontreal, Arial, sans-serif',
  fontWeight: 400,
  fontSize: 17,
  lineHeight: 1.6,
  color: 'rgba(10,10,10,0.7)',
}

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

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <div
        style={{
          fontFamily: 'PPNeueMontreal, Arial, sans-serif',
          fontWeight: 700,
          fontSize: 'clamp(32px, 4vw, 48px)',
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
          fontSize: 14,
          color: 'rgba(10,10,10,0.55)',
          marginTop: 8,
        }}
      >
        {label}
      </div>
    </div>
  )
}

export default function AboutPageContent() {
  const reduce = useReducedMotion()

  return (
    <>
      <section style={{ padding: '0 clamp(24px, 5vw, 64px) 80px' }}>
        <FadeStagger
          stagger={0.1}
          amount={0.2}
          className="about-intro"
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 64,
            alignItems: 'center',
          }}
        >
          <div>
            <FadeItem>
              <p style={{ ...BODY_STYLE, margin: 0 }}>
                AI @ UCI is UC Irvine&apos;s student-run artificial intelligence club. We bring
                together builders, researchers, and curious minds to learn by doing through
                hands-on workshops, real projects, and a community that grows together every
                quarter.
              </p>
            </FadeItem>
            <FadeItem>
              <div
                style={{
                  marginTop: 32,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                  gap: 24,
                }}
              >
                <Stat number="500+" label="active members" />
                <Stat number="15+" label="shipped projects" />
                <Stat number="20+" label="quarters running" />
              </div>
            </FadeItem>
          </div>

          <div
            className="about-intro-photos"
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '1 / 1',
              minHeight: 320,
            }}
          >
            {photos.map((p, i) => {
              const initial = reduce ? false : { opacity: 0, scale: 0.92, rotate: 0 }
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
                    delay: 0.15 + i * 0.1,
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
        </FadeStagger>

        <style>{`
          @media (max-width: 768px) {
            .about-intro {
              grid-template-columns: 1fr !important;
              gap: 40px !important;
            }
            .about-intro-photos {
              aspect-ratio: 4 / 3 !important;
              min-height: 280px !important;
            }
          }
        `}</style>
      </section>

      <section
        style={{
          padding: '0 clamp(24px, 5vw, 64px) 80px',
          maxWidth: 800,
          margin: '0 auto',
        }}
      >
        <FadeUp amount={0.15}>
          <h2
            style={{
              fontFamily: 'Redaction50, Georgia, serif',
              fontSize: 'clamp(28px, 4vw, 40px)',
              lineHeight: 1.1,
              color: '#0a0a0a',
              fontWeight: 400,
              margin: '0 0 20px',
              textAlign: 'center',
            }}
          >
            Our mission
          </h2>
          <p style={{ ...BODY_STYLE, textAlign: 'center', margin: 0 }}>
            We exist to make AI accessible and practical for every student at UCI. Not theory for a
            slide deck, not hype for a resume line. You build, you ship, you understand why it
            works. Workshops teach the tools people actually use. Projects give you something real
            to talk about in an interview. Community means you know people who will push you and
            have your back.
          </p>
        </FadeUp>
      </section>

      <section style={{ padding: '0 clamp(24px, 5vw, 64px) 48px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <FadeUp amount={0.15}>
            <h2
              style={{
                fontFamily: 'Redaction50, Georgia, serif',
                fontSize: 'clamp(28px, 4vw, 40px)',
                lineHeight: 1.1,
                color: '#0a0a0a',
                fontWeight: 400,
                margin: '0 0 12px',
              }}
            >
              Advisors
            </h2>
            <p style={{ ...BODY_STYLE, margin: '0 0 32px' }}>
              Faculty mentors who guide our direction and connect us to research across campus.
            </p>
          </FadeUp>
          <FadeUp amount={0.15} delay={0.08}>
            <div
              style={{
                padding: '40px 32px',
                borderRadius: 16,
                border: '0.5px solid rgba(0,0,0,0.08)',
                background: '#f8f9fc',
              }}
            >
              <p
                style={{
                  fontFamily: 'PPNeueMontreal, Arial, sans-serif',
                  fontSize: 15,
                  color: 'rgba(10,10,10,0.55)',
                  margin: 0,
                }}
              >
                Advisor profiles coming soon. Reach out at{' '}
                <a href="mailto:aiatuci@gmail.com" style={{ color: '#4a8fd4' }}>
                  aiatuci@gmail.com
                </a>{' '}
                if you&apos;d like to connect.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      <TeamSection />
    </>
  )
}

'use client'
import { FadeStagger, FadeItem, FadeUp, RevealFanPhoto, ScrollParallax } from '@/components/ui/motion-primitives'
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

const ADVISORS = [
  {
    name: 'Alexander Ihler',
    image: '/images/advisors/ihler.png',
    alt: 'Alexander Ihler portrait',
    bio:
      'Ihler conducts research in artificial intelligence and machine learning, focusing on statistical methods for learning from data and on approximate inference techniques for graphical models. Applications of his work includes data mining and information fusion in sensor networks, computer vision and image processing, and computational biology.',
  },
  {
    name: 'Stephan Mandt',
    image: '/images/advisors/mandt.png',
    alt: 'Stephan Mandt portrait',
    bio:
      'Stephan Mandt is an Associate Professor of Computer Science and Statistics at the University of California, Irvine, where he leads research at the intersection of deep generative modeling, uncertainty quantification, neural data compression, and AI for science. His work advances the foundations and applications of generative AI, with a particular focus on resource-efficient learning and inference algorithms, as well as AI-driven scientific discovery.',
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
  return (
    <>
      <section style={{ padding: '8px clamp(24px, 5vw, 64px) 28px' }}>
        <FadeStagger
          stagger={0.1}
          amount={0.2}
          className="about-intro"
          style={{
            maxWidth: 1040,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(240px, 340px)',
            gap: 40,
            alignItems: 'start',
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

          <ScrollParallax
            className="about-intro-photos"
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: 340,
              marginRight: 'auto',
              aspectRatio: '4 / 3',
            }}
            yOffset={24}
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
        </FadeStagger>

        <style>{`
          @media (max-width: 768px) {
            .about-intro {
              grid-template-columns: 1fr !important;
              gap: 36px !important;
              max-width: 640px !important;
            }
            .about-intro-photos {
              max-width: 100% !important;
              margin-right: 0 !important;
              aspect-ratio: 4 / 3 !important;
            }
          }
        `}</style>
      </section>

      <section
        style={{
          padding: '0 clamp(24px, 5vw, 64px) 56px',
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

      <section style={{ padding: '0 clamp(24px, 5vw, 64px) 64px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <FadeUp amount={0.15}>
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
              Advisors
            </h2>
            <p
              style={{
                ...BODY_STYLE,
                margin: '0 auto 40px',
                textAlign: 'center',
                maxWidth: 520,
              }}
            >
              Faculty mentors who guide our direction and connect us to research across campus.
            </p>
          </FadeUp>

          <FadeStagger stagger={0.12} amount={0.15}>
            <div
              className="advisors-list"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 32,
                maxWidth: 680,
                margin: '0 auto',
              }}
            >
              {ADVISORS.map((advisor, i) => (
                <FadeItem key={advisor.name}>
                  <article
                    className="advisor-row"
                    style={{
                      display: 'flex',
                      gap: 24,
                      alignItems: 'flex-start',
                      paddingBottom: i < ADVISORS.length - 1 ? 32 : 0,
                      borderBottom:
                        i < ADVISORS.length - 1 ? '0.5px solid rgba(0,0,0,0.08)' : 'none',
                    }}
                  >
                    <div
                      style={{
                        width: 96,
                        height: 96,
                        flexShrink: 0,
                        borderRadius: 12,
                        overflow: 'hidden',
                        border: '0.5px solid rgba(0,0,0,0.06)',
                        background: '#f4f5f8',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                      }}
                    >
                      <img
                        src={advisor.image}
                        alt={advisor.alt}
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
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <h3
                        style={{
                          fontFamily: 'Redaction50, Georgia, serif',
                          fontSize: 22,
                          lineHeight: 1.15,
                          color: '#0a0a0a',
                          fontWeight: 400,
                          margin: '0 0 8px',
                        }}
                      >
                        {advisor.name}
                      </h3>
                      <p style={{ ...BODY_STYLE, margin: 0, fontSize: 15, lineHeight: 1.6 }}>
                        {advisor.bio}
                      </p>
                    </div>
                  </article>
                </FadeItem>
              ))}
            </div>
          </FadeStagger>
        </div>

        <style>{`
          @media (max-width: 560px) {
            .advisor-row {
              flex-direction: column !important;
              align-items: center !important;
              text-align: center !important;
              gap: 16px !important;
            }
          }
        `}</style>
      </section>

      <TeamSection />
    </>
  )
}

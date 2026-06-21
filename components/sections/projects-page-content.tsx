'use client'
import { FadeStagger, FadeItem } from '@/components/ui/motion-primitives'

type Project = {
  title: string
  tag: string
  description: string
  details: string
  image?: string
  imageAlt?: string
  logo?: string
  logoAlt?: string
  flagship?: boolean
}

const PROJECTS: Project[] = [
  {
    title: 'CACTUS',
    tag: 'Active',
    description:
      'A multi-quarter applied-AI build. Members shipping production-grade ML behind the scenes.',
    details:
      'CACTUS is our longest-running project track. Small teams work across quarters on real ML systems: data pipelines, model training, deployment, and the unglamorous work that makes something actually run in production. Past cohorts have built recommendation engines, document classifiers, and inference pipelines you can demo without faking the backend.',
    image: '/images/projects/cactus-cover.png',
    imageAlt: 'Editorial illustration of a saguaro cactus against a desert sky',
    logo: '/images/sponsors/cactus.png',
    logoAlt: 'Cactus',
  },
  {
    title: 'Winter Quarter Project',
    tag: 'Q1 2026',
    description:
      'The seasonal team build: small groups, shared problem statement, a working demo by end of term.',
    details:
      'Every winter quarter we run a focused build sprint. Teams of four to six pick a problem, scope it in week one, and ship a working demo before finals. No rubric, no slide deck requirement. The output is something you can open on your laptop and walk through: architecture, trade-offs, what broke, what you\'d do differently.',
  },
  {
    title: 'AWS CloudHacks 2026',
    tag: 'Flagship',
    description:
      'Our flagship hackathon, in partnership with AWS. Cross-disciplinary teams, real cloud infrastructure, and a weekend to ship something that lasts.',
    details:
      'CloudHacks is the biggest event on our calendar. AWS sponsors infrastructure credits, mentors show up from industry, and teams build over a full weekend. Last year the room was packed from kickoff to final demos. 2026 is already in planning: same energy, bigger scope, more teams walking out with something they\'re proud to show.',
    image: '/images/events/learning-cloudhacks.png',
    imageAlt: 'Audience at the AWS CloudHacks kickoff',
    logo: '/images/sponsors/aws.png',
    logoAlt: 'AWS',
    flagship: true,
  },
]

const BODY_STYLE: React.CSSProperties = {
  fontFamily: 'PPNeueMontreal, Arial, sans-serif',
  fontSize: 15,
  lineHeight: 1.65,
  color: 'rgba(10,10,10,0.7)',
}

export default function ProjectsPageContent() {
  return (
    <section style={{ padding: '0 clamp(24px, 5vw, 64px) 96px' }}>
      <div
        style={{
          maxWidth: 1000,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 32,
        }}
      >
        {PROJECTS.map((project, i) => (
          <FadeStagger key={project.title} stagger={0.06} amount={0.15} delay={i * 0.05}>
            <FadeItem>
              <article
                style={{
                  border: project.flagship
                    ? '1px solid rgba(74,143,212,0.25)'
                    : '0.5px solid rgba(0,0,0,0.08)',
                  borderRadius: 20,
                  overflow: 'hidden',
                  background: project.flagship
                    ? 'linear-gradient(135deg, rgba(74,143,212,0.04), #f8f9fc)'
                    : '#f8f9fc',
                }}
              >
                {project.image && (
                  <div style={{ aspectRatio: '21 / 9', overflow: 'hidden' }}>
                    <img
                      src={project.image}
                      alt={project.imageAlt || ''}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                  </div>
                )}
                <div style={{ padding: '36px 40px' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '4px 12px',
                      border: '1px solid rgba(74,143,212,0.4)',
                      borderRadius: 9999,
                      fontFamily: 'PPNeueMontreal, Arial, sans-serif',
                      fontSize: 11,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#4a8fd4',
                      marginBottom: 16,
                    }}
                  >
                    {project.tag}
                  </span>
                  <h2
                    style={{
                      fontFamily: 'Redaction50, Georgia, serif',
                      fontSize: project.flagship ? 40 : 32,
                      lineHeight: 1.1,
                      color: '#0a0a0a',
                      fontWeight: 400,
                      margin: '0 0 12px',
                    }}
                  >
                    {project.title}
                  </h2>
                  <p style={{ ...BODY_STYLE, margin: '0 0 16px', fontSize: 16 }}>
                    {project.description}
                  </p>
                  <p style={{ ...BODY_STYLE, margin: 0 }}>{project.details}</p>
                  {project.logo && (
                    <img
                      src={project.logo}
                      alt={project.logoAlt || ''}
                      style={{
                        height: project.flagship ? 28 : 22,
                        objectFit: 'contain',
                        marginTop: 28,
                        opacity: 0.65,
                      }}
                    />
                  )}
                </div>
              </article>
            </FadeItem>
          </FadeStagger>
        ))}
      </div>
    </section>
  )
}

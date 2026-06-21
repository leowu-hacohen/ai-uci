'use client'

const Tag = ({ label }: { label: string }) => (
  <span style={{
    fontFamily: 'PPNeueMontreal, Arial, sans-serif', fontSize: 10,
    color: '#4a8fd4', border: '1px solid #4a8fd4',
    borderRadius: 999, padding: '5px 14px', display: 'inline-block',
    letterSpacing: '0.08em', textTransform: 'uppercase' as const,
  }}>{label}</span>
)

const Pill = ({ label }: { label: string }) => (
  <span style={{
    fontFamily: 'PPNeueMontreal, Arial, sans-serif', fontSize: 12,
    color: '#0a0a0a', border: '1px solid rgba(0,0,0,0.12)',
    borderRadius: 999, padding: '5px 14px',
  }}>{label}</span>
)

export default function ProjectsSection() {
  return (
    <section id="projects" style={{ background: '#ffffff', padding: '112px 48px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <p style={{ fontFamily: 'PPNeueMontreal, Arial, sans-serif', fontSize: 11, letterSpacing: '0.18em', color: '#4a8fd4', textTransform: 'uppercase', marginBottom: 14 }}>Projects</p>
        <h2 style={{ fontFamily: 'Redaction50, Georgia, serif', fontSize: 56, color: '#0a0a0a', margin: '0 0 56px', lineHeight: 1.1 }}>Build something real.</h2>

        {/* Split layout */}
        <div style={{ display: 'flex', gap: 32, alignItems: 'stretch', flexWrap: 'wrap' }}>
          {/* Left: two stacked cards */}
          <div style={{ flex: 1, minWidth: 280, display: 'flex', flexDirection: 'column', gap: 24 }}>
            {[
              { tag: 'Workshop', title: 'Quarterly Projects', desc: 'Build real AI projects with a team each quarter, from idea to demo day.', img: '/images/events/workshop2.png' },
              { tag: 'Hackathon', title: 'Open Hacks', desc: '24-hour build sprints where you ship real projects with mentors, food, and prizes.', img: '/images/events/workshop3.png' },
            ].map(card => (
              <div key={card.title} data-cursor-label="Projects →" style={{
                background: '#fff', border: '1px solid rgba(0,0,0,0.08)',
                borderRadius: 16, padding: 28, position: 'relative', overflow: 'hidden', flex: 1,
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(74,143,212,0.35)'
                  ;(e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(74,143,212,0.1)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,0,0,0.08)'
                  ;(e.currentTarget as HTMLElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)'
                }}
              >
                <div style={{ position: 'absolute', top: 20, right: 20, width: 80, height: 80, borderRadius: 8, overflow: 'hidden' }}>
                  <img src={card.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <Tag label={card.tag} />
                <h3 style={{ fontFamily: 'Redaction50, Georgia, serif', fontSize: 28, color: '#0a0a0a', margin: '14px 0 10px' }}>{card.title}</h3>
                <p style={{ fontFamily: 'PPNeueMontreal, Arial, sans-serif', fontSize: 14, color: '#0a0a0a', margin: 0, maxWidth: '80%' }}>{card.desc}</p>
              </div>
            ))}
          </div>

          {/* Right: AWS CloudHacks featured card */}
          <div style={{ flex: 1.2, minWidth: 300 }}>
            <p style={{ fontFamily: 'PPNeueMontreal, Arial, sans-serif', fontSize: 11, letterSpacing: '0.15em', color: '#4a8fd4', textTransform: 'uppercase', marginBottom: 12 }}>Featured</p>
            <div data-cursor-label="Projects →" style={{
              background: '#fff', border: '1.5px solid rgba(74,143,212,0.25)', borderRadius: 16, overflow: 'hidden',
              boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
            }}>
              <div style={{ height: 220, overflow: 'hidden' }}>
                <img src="/images/events/cloudhacks.png" alt="AWS CloudHacks" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: 24, background: '#fff' }}>
                <h3 style={{ fontFamily: 'Redaction50, Georgia, serif', fontSize: 32, color: '#0a0a0a', margin: '0 0 12px' }}>2026 AWS CloudHacks</h3>
                <p style={{ fontFamily: 'PPNeueMontreal, Arial, sans-serif', fontSize: 14, color: '#0a0a0a', margin: '0 0 16px' }}>
                  Hands-on experience with AWS cloud services, mentorship from engineers, and $5k in prizes.
                </p>
                <span style={{
                  fontFamily: 'PPNeueMontreal, Arial, sans-serif', fontSize: 12,
                  color: '#4a8fd4', border: '1px solid #4a8fd4',
                  borderRadius: 999, padding: '5px 14px', letterSpacing: '0.08em',
                }}>APR 17–19, 2026</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

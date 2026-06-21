'use client'

const ADVISORS = [
  { name: 'Prof. Sameer Singh', title: 'Faculty Advisor · NLP & ML · UCI ICS', initials: 'SS' },
  { name: 'Prof. Charless Fowlkes', title: 'Faculty Advisor · Computer Vision · UCI ICS', initials: 'CF' },
]

const OFFICERS = [
  { name: 'Aiden Park', role: 'President', initials: 'AP' },
  { name: 'Maya Chen', role: 'VP of Events', initials: 'MC' },
  { name: 'Rohan Verma', role: 'VP of Tech', initials: 'RV' },
  { name: 'Sofia Nguyen', role: 'VP of Marketing', initials: 'SN' },
  { name: 'Jake Torres', role: 'Treasurer', initials: 'JT' },
  { name: 'Priya Sharma', role: 'Secretary', initials: 'PS' },
  { name: 'Ethan Liu', role: 'Workshop Lead', initials: 'EL' },
  { name: 'Zoe Kim', role: 'Hackathon Lead', initials: 'ZK' },
]

const Avatar = ({ initials, size = 72 }: { initials: string; size?: number }) => (
  <div style={{
    width: size, height: size, borderRadius: '50%', flexShrink: 0,
    background: '#ffffff',
    border: '1px solid rgba(74,143,212,0.2)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: size * 0.3, color: '#4a8fd4',
    fontFamily: 'Redaction50, Georgia, serif',
  }}>{initials}</div>
)

export default function TeamSection() {
  return (
    <section id="team" style={{ background: '#ffffff', padding: '112px 48px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Advisors */}
        <p style={{ fontFamily: 'PPNeueMontreal, Arial, sans-serif', fontSize: 11, letterSpacing: '0.18em', color: '#4a8fd4', textTransform: 'uppercase', marginBottom: 14 }}>Advisors</p>
        <h2 style={{ fontFamily: 'Redaction50, Georgia, serif', fontSize: 48, color: '#0a0a0a', margin: '0 0 56px', lineHeight: 1.1 }}>Guided by experience.</h2>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 80 }}>
          {ADVISORS.map(a => (
            <div key={a.name} style={{
              flex: 1, minWidth: 260,
              background: '#fff', border: '1px solid rgba(0,0,0,0.08)',
              borderRadius: 16, padding: 32, boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              display: 'flex', gap: 20, alignItems: 'flex-start',
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
              <Avatar initials={a.initials} />
              <div>
                <h3 style={{ fontFamily: 'Redaction50, Georgia, serif', fontSize: 22, color: '#0a0a0a', margin: '0 0 6px' }}>{a.name}</h3>
                <p style={{ fontFamily: 'PPNeueMontreal, Arial, sans-serif', fontSize: 13, color: '#0a0a0a', margin: 0 }}>{a.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Team */}
        <p style={{ fontFamily: 'PPNeueMontreal, Arial, sans-serif', fontSize: 11, letterSpacing: '0.18em', color: '#4a8fd4', textTransform: 'uppercase', marginBottom: 14 }}>Team</p>
        <h2 style={{ fontFamily: 'Redaction50, Georgia, serif', fontSize: 48, color: '#0a0a0a', margin: '0 0 56px', lineHeight: 1.1 }}>The people who make it happen.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 20 }}>
          {OFFICERS.map(o => (
            <div key={o.name} style={{
              background: '#ffffff', border: '1px solid rgba(0,0,0,0.06)',
              borderRadius: 12, padding: '24px 16px', textAlign: 'center',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              transition: 'background 0.2s, border-color 0.2s',
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = '#fff'
                ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(74,143,212,0.25)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = '#f7f8fa'
                ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,0,0,0.06)'
              }}
            >
              <Avatar initials={o.initials} size={56} />
              <p style={{ fontFamily: 'PPNeueMontreal, Arial, sans-serif', fontSize: 14, fontWeight: 700, color: '#0a0a0a', margin: '12px 0 4px' }}>{o.name}</p>
              <p style={{ fontFamily: 'PPNeueMontreal, Arial, sans-serif', fontSize: 12, color: '#0a0a0a', margin: 0 }}>{o.role}</p>
            </div>
          ))}
        </div>

        {/* Event Schedule */}
        <div style={{ marginTop: 96 }}>
          <p style={{ fontFamily: 'PPNeueMontreal, Arial, sans-serif', fontSize: 11, letterSpacing: '0.18em', color: '#4a8fd4', textTransform: 'uppercase', marginBottom: 14 }}>Schedule</p>
          <h2 style={{ fontFamily: 'Redaction50, Georgia, serif', fontSize: 48, color: '#0a0a0a', margin: '0 0 40px', lineHeight: 1.1 }}>Spring 2026 events.</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, border: '1px solid rgba(0,0,0,0.08)', borderRadius: 16, overflow: 'hidden' }}>
            {[
              { date: 'Apr 7', day: 'Mon', title: 'Spring Kickoff & Intro to AI @ UCI', location: 'DBH 6011', type: 'General Meeting' },
              { date: 'Apr 14', day: 'Mon', title: 'LLMs from Scratch — Workshop', location: 'DBH 6011', type: 'Workshop' },
              { date: 'Apr 17–19', day: 'Thu–Sat', title: '2026 AWS CloudHacks Hackathon', location: 'Donald Bren Hall', type: 'Hackathon' },
              { date: 'Apr 28', day: 'Mon', title: 'Guest Speaker: ML at Scale', location: 'ICS 174', type: 'Speaker' },
              { date: 'May 5', day: 'Mon', title: 'Reinforcement Learning Workshop', location: 'DBH 6011', type: 'Workshop' },
              { date: 'May 19', day: 'Mon', title: 'Project Teams Demo Day', location: 'Calit2 Auditorium', type: 'Demo Day' },
              { date: 'Jun 2', day: 'Mon', title: 'End of Year Social & Awards', location: 'Engineering Gateway', type: 'Social' },
            ].map((ev, i, arr) => (
              <div key={ev.date} style={{
                display: 'grid', gridTemplateColumns: '100px 1fr auto',
                alignItems: 'center', gap: 24,
                padding: '20px 28px',
                borderBottom: i < arr.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none',
                background: '#fff',
                transition: 'background 0.15s',
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#f9fbff'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#fff'}
              >
                <div>
                  <p style={{ fontFamily: 'PPNeueMontreal, Arial, sans-serif', fontSize: 14, fontWeight: 700, color: '#0a0a0a', margin: 0 }}>{ev.date}</p>
                  <p style={{ fontFamily: 'PPNeueMontreal, Arial, sans-serif', fontSize: 11, color: '#0a0a0a', margin: '2px 0 0', opacity: 0.45 }}>{ev.day}</p>
                </div>
                <div>
                  <p style={{ fontFamily: 'PPNeueMontreal, Arial, sans-serif', fontSize: 15, color: '#0a0a0a', margin: 0 }}>{ev.title}</p>
                  <p style={{ fontFamily: 'PPNeueMontreal, Arial, sans-serif', fontSize: 12, color: '#0a0a0a', margin: '3px 0 0', opacity: 0.45 }}>{ev.location}</p>
                </div>
                <span style={{
                  fontFamily: 'PPNeueMontreal, Arial, sans-serif', fontSize: 11,
                  color: '#4a8fd4', border: '1px solid rgba(74,143,212,0.35)',
                  borderRadius: 999, padding: '4px 12px', whiteSpace: 'nowrap',
                  letterSpacing: '0.04em',
                }}>{ev.type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{
          marginTop: 96, textAlign: 'center',
          padding: '72px 48px',
          background: '#fff',
          border: '1px solid rgba(0,0,0,0.08)',
          borderRadius: 24,
        }}>
          <p style={{ fontFamily: 'PPNeueMontreal, Arial, sans-serif', fontSize: 11, letterSpacing: '0.18em', color: '#4a8fd4', textTransform: 'uppercase', marginBottom: 16 }}>Get Involved</p>
          <h2 style={{ fontFamily: 'Redaction50, Georgia, serif', fontSize: 52, color: '#0a0a0a', margin: '0 auto 16px', maxWidth: 560, lineHeight: 1.1 }}>Ready to build the future of AI?</h2>
          <p style={{ fontFamily: 'PPNeueMontreal, Arial, sans-serif', fontSize: 16, color: '#0a0a0a', margin: '0 auto 40px', maxWidth: 420, lineHeight: 1.7, opacity: 0.6 }}>
            Join AI @ UCI and connect with students, researchers, and builders at the forefront of artificial intelligence.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://discord.gg/ai-uci" target="_blank" rel="noreferrer" style={{
              fontFamily: 'PPNeueMontreal, Arial, sans-serif', fontSize: 14,
              background: '#0a0a0a', color: '#fff',
              borderRadius: 999, padding: '12px 28px',
              textDecoration: 'none', display: 'inline-block',
              transition: 'opacity 0.15s',
            }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.opacity = '0.8'}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.opacity = '1'}
            >Join our Discord</a>
            <a href="mailto:aiclub@uci.edu" style={{
              fontFamily: 'PPNeueMontreal, Arial, sans-serif', fontSize: 14,
              background: 'transparent', color: '#0a0a0a',
              border: '1px solid rgba(0,0,0,0.15)',
              borderRadius: 999, padding: '12px 28px',
              textDecoration: 'none', display: 'inline-block',
              transition: 'border-color 0.15s, color 0.15s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = '#4a8fd4'; (e.currentTarget as HTMLAnchorElement).style.color = '#4a8fd4' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(0,0,0,0.15)'; (e.currentTarget as HTMLAnchorElement).style.color = '#0a0a0a' }}
            >Get in touch</a>
          </div>
        </div>
      </div>
    </section>
  )
}

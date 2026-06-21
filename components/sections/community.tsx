'use client'

const EVENTS = [
  { img: '/images/meetings/aif.jpg',       name: 'General Meeting',      date: 'Fall 2025' },
  { img: '/images/meetings/aif2.jpg',      name: 'AI Workshop',          date: 'Winter 2026' },
  { img: '/images/meetings/aws1.jpg',      name: 'AWS Workshop',         date: 'Spring 2026' },
  { img: '/images/meetings/cloudhacks.jpg',name: 'CloudHacks Hackathon', date: 'Apr 17–19, 2026' },
  { img: '/images/meetings/racecar.png',   name: 'Racecar AI Project',   date: 'Winter 2026' },
  { img: '/images/meetings/IMG_3265.png',  name: 'Club Meeting',         date: 'Spring 2026' },
]
const ALL = [...EVENTS, ...EVENTS] // duplicate for infinite loop

export default function CommunitySection() {
  return (
    <section id="network" style={{
      background: '#ffffff',
      padding: '112px 0',
      borderTop: '1px solid rgba(0,0,0,0.06)',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 48px' }}>
        <p style={{ fontFamily: 'PPNeueMontreal, Arial, sans-serif', fontSize: 11, letterSpacing: '0.18em', color: '#4a8fd4', textTransform: 'uppercase', marginBottom: 14 }}>Learning</p>
        <h2 style={{ fontFamily: 'Redaction50, Georgia, serif', fontSize: 56, color: '#0a0a0a', margin: '0 0 16px', lineHeight: 1.1 }}>Where builders meet.</h2>
        <p style={{ fontFamily: 'PPNeueMontreal, Arial, sans-serif', fontSize: 16, color: '#0a0a0a', maxWidth: 520, margin: 0 }}>
          Events, workshops, and hackathons open to all.
        </p>
      </div>

      {/* Carousel — constrained to content width, clipped in a rounded container */}
      <div style={{ maxWidth: 1100, margin: '56px auto 0', padding: '0 48px' }}>
        <div style={{
          borderRadius: 20,
          border: '1px solid rgba(0,0,0,0.08)',
          overflow: 'hidden',
          position: 'relative',
        }}>
          <div style={{
            display: 'flex', gap: 0,
            width: 'max-content',
            animation: 'scroll-left 40s linear infinite',
          }}
            onMouseEnter={e => (e.currentTarget.style.animationPlayState = 'paused')}
            onMouseLeave={e => (e.currentTarget.style.animationPlayState = 'running')}
          >
            {ALL.map((ev, i) => (
              <div key={i} data-cursor-label="Network →" style={{
                width: 280, flexShrink: 0,
                borderRight: '1px solid rgba(0,0,0,0.07)',
                background: '#fff',
                transition: 'background 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#f9fbff'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#fff'}
              >
                <div style={{ height: 200, overflow: 'hidden' }}>
                  <img src={ev.img} alt={ev.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '10px 14px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                  <p style={{ fontFamily: 'PPNeueMontreal, Arial, sans-serif', fontSize: 13, color: '#0a0a0a', margin: 0 }}>{ev.name}</p>
                  <p style={{ fontFamily: 'PPNeueMontreal, Arial, sans-serif', fontSize: 11, color: '#0a0a0a', margin: '2px 0 0', opacity: 0.5 }}>{ev.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '32px auto 0', padding: '0 48px' }}>
        <p style={{ fontFamily: 'PPNeueMontreal, Arial, sans-serif', fontSize: 14, color: '#0a0a0a', margin: 0 }}>
          Join us every Wednesday at 4:00–5:30pm in DBH 6011 for general meetings and workshops!
        </p>
      </div>
    </section>
  )
}

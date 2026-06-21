'use client'

const LOGOS = [
  { src: '/images/sponsors/aws.png', alt: 'AWS', height: 28 },
  { src: '/images/sponsors/claude.png', alt: 'Claude AI', height: 36 },
  { src: '/images/sponsors/nvidia.png', alt: 'NVIDIA', height: 36 },
  { src: '/images/sponsors/lovable.png', alt: 'Lovable', height: 32 },
]

export default function SponsorsSection() {
  return (
    <section id="about" style={{ background: '#ffffff', padding: '112px 48px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
        {/* Value prop */}
        <h2 style={{ fontFamily: 'Redaction50, Georgia, serif', fontSize: 50, color: '#0a0a0a', margin: '0 auto 16px', maxWidth: 700, lineHeight: 1.15 }}>
          Building the next generation of{' '}
          <span style={{ color: '#4a8fd4' }}>AI engineers</span>
        </h2>
        <p style={{ fontFamily: 'PPNeueMontreal, Arial, sans-serif', fontSize: 16, color: '#0a0a0a', margin: '0 auto 80px', maxWidth: 520 }}>
          Workshops, hackathons, and research for every level.
        </p>

        {/* Sponsors */}
        <p style={{ fontFamily: 'PPNeueMontreal, Arial, sans-serif', fontSize: 11, letterSpacing: '0.18em', color: '#4a8fd4', textTransform: 'uppercase', marginBottom: 40 }}>Who We&apos;ve Worked With</p>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 48, flexWrap: 'wrap' }}>
          {LOGOS.map(logo => (
            <img
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              style={{
                height: logo.height,
                objectFit: 'contain',
                filter: 'none',
                opacity: 0.65,
                transition: 'opacity 0.2s',
                cursor: 'default',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '0.65')}
            />
          ))}
          {/* UCI OIT text badge */}
          <div style={{
            fontFamily: 'PPNeueMontreal, Arial, sans-serif', fontSize: 14, fontWeight: 700,
            color: '#0a0a0a', border: '1px solid rgba(0,0,0,0.2)',
            borderRadius: 4, padding: '6px 14px', opacity: 0.65,
            transition: 'opacity 0.2s', cursor: 'default',
          }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = '1')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = '0.65')}
          >UCI OIT</div>
        </div>
      </div>
    </section>
  )
}

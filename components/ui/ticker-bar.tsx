'use client'

// h is a per-logo optical-size multiplier applied to the base height,
// because some marks are wordmark-only (need more height) vs icon+wordmark stacks (need less).
const LOGOS = [
  { src: '/images/sponsors/claude.png',   alt: 'Claude',   h: 1.0  },
  { src: '/images/sponsors/cactus.png',   alt: 'Cactus',   h: 1.15 },
  { src: '/images/sponsors/nvidia.png',   alt: 'NVIDIA',   h: 2.0  },
  { src: '/images/sponsors/lovable.png',  alt: 'Lovable',  h: 2.0  },
  { src: '/images/sponsors/supabase.png', alt: 'Supabase', h: 1.0  },
  { src: '/images/sponsors/sunstone.png', alt: 'Sunstone', h: 1.0  },
  { src: '/images/sponsors/aws.png',      alt: 'AWS',      h: 1.3  },
]

const BASE_HEIGHT = 32
const SLOT_WIDTH = 200
const SLOT_HEIGHT = 72

export default function TickerBar() {
  const items = [...LOGOS, ...LOGOS]
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        padding: '20px 0 24px',
        background: 'transparent',
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
        <span
          style={{
            fontFamily: 'PPNeueMontreal, Arial, sans-serif',
            fontSize: 12,
            letterSpacing: '0.32em',
            color: '#9a9a9a',
            textTransform: 'uppercase',
            fontWeight: 400,
          }}
        >
          Trusted By
        </span>
      </div>
      <div
        style={{
          position: 'relative',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, #000 32%, #000 68%, transparent 100%)',
          maskImage:
            'linear-gradient(to right, transparent 0%, #000 32%, #000 68%, transparent 100%)',
        }}
      >
        <div
          className="ticker-scroll-wrapper"
          style={{
            display: 'flex',
            width: 'max-content',
            animation: 'ticker-scroll 32s linear infinite',
          }}
        >
          {items.map((logo, i) => {
            const h = Math.round(BASE_HEIGHT * logo.h)
            return (
              <div
                key={`${logo.alt}-${i}`}
                style={{
                  width: SLOT_WIDTH,
                  height: SLOT_HEIGHT,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  style={{
                    height: h,
                    maxWidth: SLOT_WIDTH - 40,
                    objectFit: 'contain',
                    opacity: 0.9,
                  }}
                />
              </div>
            )
          })}
        </div>
      </div>
      <style>{`
        @keyframes ticker-scroll {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }
      `}</style>
    </div>
  )
}

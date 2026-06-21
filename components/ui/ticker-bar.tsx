'use client'

import { FadeUp } from './motion-primitives'

// h: per-logo optical-size multiplier applied to BASE_HEIGHT
//    (some marks are wordmark-only and need more height, others are icon+wordmark
//     stacks and need less).
// w: per-logo slot-width multiplier (defaults to 1). Use this when a logo's PNG
//    has internal transparent padding that creates an oversized visual gap to
//    the next slot — e.g. AWS's smile-swoosh PNG.
type Logo = { src: string; alt: string; h: number; w?: number }
const LOGOS: Logo[] = [
  { src: '/images/sponsors/claude.png',   alt: 'Claude',   h: 1.0  },
  { src: '/images/sponsors/cactus.png',   alt: 'Cactus',   h: 1.15 },
  { src: '/images/sponsors/nvidia.png',   alt: 'NVIDIA',   h: 2.0  },
  { src: '/images/sponsors/lovable.png',  alt: 'Lovable',  h: 2.0  },
  { src: '/images/sponsors/supabase.png', alt: 'Supabase', h: 1.0  },
  { src: '/images/sponsors/sunstone.png', alt: 'Sunstone', h: 1.0  },
  { src: '/images/sponsors/aws.png',      alt: 'AWS',      h: 1.0, w: 0.65 },
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
      <FadeUp trigger="mount" delay={0.85} y={14} duration={0.9}>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24, marginBottom: 16 }}>
          <span
            style={{
              fontFamily: 'PPNeueMontreal, Arial, sans-serif',
              fontSize: 22,
              color: 'rgba(10,10,10,0.9)',
              fontWeight: 400,
            }}
          >
            Backed By
          </span>
        </div>
      </FadeUp>
      {/* Whole reel fades in as a single block so the duplicate half on the
          right doesn't pre-appear while a left-to-right cascade is in flight.
          The horizontal scroll itself provides all the motion the row needs.
          A long-ish 1.1s out-expo so the reveal feels graceful instead of
          snapping into place. */}
      <FadeUp trigger="mount" delay={1.05} y={14} duration={1.1}>
        <div
          style={{
            position: 'relative',
            WebkitMaskImage:
              'linear-gradient(to right, transparent 15%, #000 40%, #000 60%, transparent 85%)',
            maskImage:
              'linear-gradient(to right, transparent 15%, #000 40%, #000 60%, transparent 85%)',
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
              const slotW = Math.round(SLOT_WIDTH * (logo.w ?? 1))
              return (
                <div
                  key={`${logo.alt}-${i}`}
                  style={{
                    width: slotW,
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
                    loading="eager"
                    decoding="async"
                    draggable={false}
                    style={{
                      height: h,
                      maxWidth: slotW - 40,
                      objectFit: 'contain',
                      opacity: 0.9,
                    }}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </FadeUp>
      <style>{`
        @keyframes ticker-scroll {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }
      `}</style>
    </div>
  )
}

'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { FadeUp, REVEAL_EASE } from './motion-primitives'

// h: per-logo optical-size multiplier applied to BASE_HEIGHT
// w: per-logo slot-width multiplier (defaults to 1)
// scale: visual scale on the image without changing slot width
type Logo = { src: string; alt: string; h: number; w?: number; scale?: number }
const LOGOS: Logo[] = [
  { src: '/images/sponsors/claude.png',   alt: 'Claude',   h: 1.0  },
  { src: '/images/sponsors/cactus.png',   alt: 'Cactus',   h: 1.15 },
  { src: '/images/sponsors/nvidia.png',   alt: 'NVIDIA',   h: 2.0  },
  { src: '/images/sponsors/lovable.png',  alt: 'Lovable',  h: 2.0  },
  { src: '/images/sponsors/supabase.png', alt: 'Supabase', h: 1.0  },
  { src: '/images/sponsors/sunstone.png', alt: 'Sunstone', h: 1.0  },
  { src: '/images/sponsors/aws.png',      alt: 'AWS',      h: 1.0, w: 0.65, scale: 1.3 },
]

const BASE_HEIGHT = 32
const SLOT_WIDTH = 200
const SLOT_HEIGHT = 72

// Cascades with hero intro: logo fade starts 260ms + 350ms ramp (~610ms full).
// Ticker picks up as the anteater lands, then reel follows immediately.
const INTRO_DELAY = 0.55
const REEL_STAGGER = 0.17
const BACKED_BY_DELAY = INTRO_DELAY
const REEL_DELAY = INTRO_DELAY + REEL_STAGGER
const BACKED_BY_DURATION = 0.7
const REEL_FADE_DURATION = 0.85

export default function TickerBar() {
  const reduce = useReducedMotion()
  const items = [...LOGOS, ...LOGOS]

  return (
    <div
      className="ticker-root"
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
      <FadeUp trigger="mount" delay={BACKED_BY_DELAY} y={8} duration={BACKED_BY_DURATION}>
        <div className="ticker-backed-by" style={{ display: 'flex', justifyContent: 'center', marginTop: 32, marginBottom: 16 }}>
          <span
            style={{
              fontFamily: 'PPNeueMontreal, Arial, sans-serif',
              fontSize: 22,
              color: 'rgba(10,10,10,0.9)',
              fontWeight: 500,
            }}
          >
            Backed By
          </span>
        </div>
      </FadeUp>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: REEL_DELAY,
          duration: REEL_FADE_DURATION,
          ease: REVEAL_EASE,
        }}
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
            animation: reduce ? 'none' : 'ticker-scroll 32s linear infinite',
            willChange: reduce ? 'auto' : 'transform',
            transform: 'translate3d(0, 0, 0)',
            backfaceVisibility: 'hidden',
          }}
        >
          {items.map((logo, i) => {
            const h = Math.round(BASE_HEIGHT * logo.h)
            const slotW = Math.round(SLOT_WIDTH * (logo.w ?? 1))
            return (
              <div
                key={`${logo.alt}-${i}`}
                className="ticker-slot"
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
                    transform: logo.scale ? `scale(${logo.scale})` : undefined,
                  }}
                />
              </div>
            )
          })}
        </div>
      </motion.div>

      <style>{`
        @keyframes ticker-scroll {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ticker-scroll-wrapper {
            animation: none !important;
          }
        }
        /* Mobile: shrink "Backed By", tighten spacing, narrower slots.
           Uniform 130px slot width and capped image height collapse the
           per-logo width/height variation enough to keep the reel readable
           at narrow viewports while preserving the gradient mask edges. */
        @media (max-width: 768px) {
          .ticker-root {
            padding: 12px 0 16px !important;
          }
          .ticker-backed-by {
            margin-top: 12px !important;
            margin-bottom: 8px !important;
          }
          .ticker-backed-by span {
            font-size: 14px !important;
            letter-spacing: 0.02em !important;
          }
          .ticker-slot {
            width: 130px !important;
            height: 52px !important;
          }
          .ticker-slot img {
            max-height: 36px !important;
            max-width: 90px !important;
          }
        }
      `}</style>
    </div>
  )
}

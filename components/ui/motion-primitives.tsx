'use client'

import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  Variants,
} from 'framer-motion'
import type { CSSProperties, ReactNode } from 'react'

// Shared "out-expo" easing — matches navbar + hero intro timing.
export const REVEAL_EASE = [0.16, 1, 0.3, 1] as const

/** Viewport config: fire slightly before full entry for a hero-like scroll feel. */
export function makeRevealViewport(amount = 0.18, margin = '0px 0px -72px 0px') {
  return { once: true, amount, margin }
}

export const REVEAL_VIEWPORT = makeRevealViewport()

export const PHOTO_REVEAL_TRANSITION = { duration: 0.85, ease: REVEAL_EASE }

type Trigger = 'in-view' | 'mount'

type BaseProps = {
  children: ReactNode
  className?: string
  style?: CSSProperties
  trigger?: Trigger
  amount?: number
}

// ── FadeUp ──────────────────────────────────────────────────────────────────

export function FadeUp({
  children,
  delay = 0,
  duration = 0.75,
  y = 18,
  className,
  style,
  trigger = 'in-view',
  amount = 0.18,
}: BaseProps & {
  delay?: number
  duration?: number
  y?: number
}) {
  const reduce = useReducedMotion()
  const initial = reduce ? false : { opacity: 0, y, scale: 0.97 }
  const target = { opacity: 1, y: 0, scale: 1 }
  const transition = { duration, delay, ease: REVEAL_EASE }
  const viewport = makeRevealViewport(amount)

  if (trigger === 'mount') {
    return (
      <motion.div
        initial={initial}
        animate={target}
        transition={transition}
        className={className}
        style={style}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={initial}
      whileInView={target}
      viewport={viewport}
      transition={transition}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

// ── FadeStagger ─────────────────────────────────────────────────────────────

export function FadeStagger({
  children,
  delay = 0,
  stagger = 0.09,
  className,
  style,
  trigger = 'in-view',
  amount = 0.18,
}: BaseProps & {
  delay?: number
  stagger?: number
}) {
  const reduce = useReducedMotion()
  const viewport = makeRevealViewport(amount)

  const variants: Variants = {
    hidden: {},
    show: {
      transition: reduce
        ? { staggerChildren: 0, delayChildren: 0 }
        : { staggerChildren: stagger, delayChildren: delay },
    },
  }

  const animateProps =
    trigger === 'mount'
      ? { initial: 'hidden', animate: 'show' }
      : {
          initial: 'hidden',
          whileInView: 'show',
          viewport,
        }

  return (
    <motion.div variants={variants} {...animateProps} className={className} style={style}>
      {children}
    </motion.div>
  )
}

// ── FadeItem ────────────────────────────────────────────────────────────────

export function FadeItem({
  children,
  duration = 0.75,
  y = 14,
  className,
  style,
}: {
  children: ReactNode
  duration?: number
  y?: number
  className?: string
  style?: CSSProperties
}) {
  const reduce = useReducedMotion()
  const itemVariants: Variants = {
    hidden: reduce ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y, scale: 0.97 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: reduce ? 0 : duration, ease: REVEAL_EASE },
    },
  }
  return (
    <motion.div variants={itemVariants} className={className} style={style}>
      {children}
    </motion.div>
  )
}

// ── ScrollParallax ──────────────────────────────────────────────────────────
// Subtle y drift as the section crosses the viewport — echoes hero parallax.

export function ScrollParallax({
  children,
  className,
  style,
  yOffset = 32,
}: {
  children: ReactNode
  className?: string
  style?: CSSProperties
  yOffset?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [yOffset * 0.45, -yOffset * 0.45])

  return (
    <div ref={ref} className={className} style={style}>
      <motion.div style={{ y: reduce ? 0 : y }}>{children}</motion.div>
    </div>
  )
}

// ── RevealFanPhoto ──────────────────────────────────────────────────────────
// Fanned photo stack entrance — matches Who We Are hero-quality timing.

export function RevealFanPhoto({
  src,
  alt,
  index = 0,
  rotate,
  style,
}: {
  src: string
  alt: string
  index?: number
  rotate: string
  style: CSSProperties
}) {
  const reduce = useReducedMotion()
  const initial = reduce ? false : { opacity: 0, scale: 0.92, rotate: 0 }
  const target = { opacity: 1, scale: 1, rotate: parseFloat(rotate) }

  return (
    <motion.img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      draggable={false}
      initial={initial}
      whileInView={target}
      viewport={REVEAL_VIEWPORT}
      transition={{
        ...PHOTO_REVEAL_TRANSITION,
        delay: 0.22 + index * 0.12,
      }}
      style={{ ...style, transformOrigin: 'center center' }}
    />
  )
}

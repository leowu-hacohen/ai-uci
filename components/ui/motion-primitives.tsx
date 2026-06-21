'use client'

import { motion, useReducedMotion, Variants } from 'framer-motion'
import type { CSSProperties, ReactNode } from 'react'

// Shared "out-expo" easing used across the site for a clean, weightless landing.
// Matches the curve already used by the navbar entrance.
export const REVEAL_EASE = [0.16, 1, 0.3, 1] as const

type Trigger = 'in-view' | 'mount'

type BaseProps = {
  children: ReactNode
  className?: string
  style?: CSSProperties
  /** Where to listen for the trigger. `in-view` is default; `mount` plays once on load. */
  trigger?: Trigger
  /** Viewport amount (only used when trigger === 'in-view'). */
  amount?: number
}

// ── FadeUp ──────────────────────────────────────────────────────────────────
// A single-element reveal: fade + a small upward translate. Good for headings,
// paragraphs, hero blocks. Pair with `delay` for sequenced entrances.

export function FadeUp({
  children,
  delay = 0,
  duration = 0.7,
  y = 16,
  className,
  style,
  trigger = 'in-view',
  amount = 0.25,
}: BaseProps & {
  delay?: number
  duration?: number
  /** Initial vertical offset in px. */
  y?: number
}) {
  const reduce = useReducedMotion()
  const initial = reduce ? false : { opacity: 0, y }
  const target = { opacity: 1, y: 0 }
  const transition = { duration, delay, ease: REVEAL_EASE }

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
      viewport={{ once: true, amount }}
      transition={transition}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

// ── FadeStagger ─────────────────────────────────────────────────────────────
// Container that cascades its `FadeItem` children. Wrap a list of elements and
// they fade-up one at a time with `stagger` seconds between each.

export function FadeStagger({
  children,
  delay = 0,
  stagger = 0.08,
  className,
  style,
  trigger = 'in-view',
  amount = 0.2,
}: BaseProps & {
  /** Delay before the first child starts. */
  delay?: number
  /** Seconds between each child. */
  stagger?: number
}) {
  const reduce = useReducedMotion()

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
          viewport: { once: true, amount },
        }

  return (
    <motion.div
      variants={variants}
      {...animateProps}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

// ── FadeItem ────────────────────────────────────────────────────────────────
// A child of FadeStagger. Inherits the parent's `show` trigger and animates
// with the shared easing. Default offset is intentionally small (12px) so the
// motion feels weightless rather than jumpy.

export function FadeItem({
  children,
  duration = 0.7,
  y = 12,
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
    hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : duration, ease: REVEAL_EASE },
    },
  }
  return (
    <motion.div variants={itemVariants} className={className} style={style}>
      {children}
    </motion.div>
  )
}

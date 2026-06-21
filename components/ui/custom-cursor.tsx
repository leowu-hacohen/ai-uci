'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'

const SPRING = { mass: 0.08, stiffness: 380, damping: 28 }

export default function CustomCursor() {
  const [label, setLabel]       = useState<string | null>(null)
  const [hasMoved, setHasMoved] = useState(false)
  const [active, setActive]     = useState(false)

  const mx = useMotionValue(-300)
  const my = useMotionValue(-300)
  const x  = useSpring(mx, SPRING)
  const y  = useSpring(my, SPRING)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    setActive(true)

    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX)
      my.set(e.clientY)
      setHasMoved(true)

      const el = (e.target as HTMLElement).closest('[data-cursor-label]')
      setLabel(el ? el.getAttribute('data-cursor-label') : null)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [mx, my])

  if (!active) return null

  return (
    <motion.div
      aria-hidden
      style={{ position: 'fixed', top: 0, left: 0, zIndex: 99999, pointerEvents: 'none', x, y }}
    >
      <AnimatePresence mode="wait">
        {label ? (
          <motion.div
            key="pill"
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.75 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            style={{
              translateX: '-50%',
              translateY: '-50%',
              background: '#0a0a0a',
              color: '#ffffff',
              borderRadius: 999,
              padding: '9px 20px',
              fontSize: 12,
              fontFamily: 'PPNeueMontreal, Arial, sans-serif',
              fontWeight: 400,
              letterSpacing: '0.06em',
              whiteSpace: 'nowrap',
              textTransform: 'uppercase',
            }}
          >
            {label}
          </motion.div>
        ) : (
          <motion.div
            key="dot"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: hasMoved ? 1 : 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.12 }}
            style={{
              translateX: '-50%',
              translateY: '-50%',
              width: 9,
              height: 9,
              borderRadius: '50%',
              background: '#0a0a0a',
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

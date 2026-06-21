'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SPEAKERS = [
  { name: 'Andrej Karpathy', company: 'OpenAI / Tesla', title: 'AI Researcher & Educator', quote: '"The best way to understand AI is to build it."', initials: 'AK' },
  { name: 'Fei-Fei Li', company: 'Stanford HAI', title: 'Co-Director, Human-Centered AI', quote: '"AI should serve humanity not the other way around."', initials: 'FL' },
  { name: 'Pieter Abbeel', company: 'UC Berkeley / Covariant', title: 'Robotics & RL Pioneer', quote: '"Robot learning is the next frontier of AI."', initials: 'PA' },
  { name: 'Chelsea Finn', company: 'Stanford University', title: 'Meta-Learning Researcher', quote: '"Few-shot learning will redefine what machines can do."', initials: 'CF' },
]

export default function SpeakersSection() {
  const [idx, setIdx] = useState(0)
  const [dir, setDir] = useState(1)

  function go(d: number) {
    setDir(d)
    setIdx(i => (i + d + SPEAKERS.length) % SPEAKERS.length)
  }

  const s = SPEAKERS[idx]

  return (
    <section id="learning" style={{ background: '#ffffff', padding: '112px 48px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'flex-start', gap: 80 }}>

        {/* Left: heading + description */}
        <div style={{ flex: '0 0 340px' }}>
          <p style={{ fontFamily: 'PPNeueMontreal, Arial, sans-serif', fontSize: 11, letterSpacing: '0.18em', color: '#4a8fd4', textTransform: 'uppercase', marginBottom: 14 }}>Speakers</p>
          <h2 style={{ fontFamily: 'Redaction50, Georgia, serif', fontSize: 56, color: '#0a0a0a', margin: '0 0 16px', lineHeight: 1.1 }}>Learn from the best.</h2>
          <p style={{ fontFamily: 'PPNeueMontreal, Arial, sans-serif', fontSize: 16, color: '#0a0a0a', margin: 0, lineHeight: 1.7 }}>
            Our speaker series brings industry leaders, researchers, and founders to UCI. From OpenAI engineers to startup founders every talk is a chance to see AI from the inside.
          </p>
        </div>

        {/* Right: carousel */}
        <div style={{ flex: 1, position: 'relative' }}>
          {/* Arrows */}
          <div style={{ position: 'absolute', top: '50%', left: -52, transform: 'translateY(-50%)', zIndex: 2 }}>
            <button onClick={() => go(-1)} style={{
              background: 'transparent', border: '1px solid rgba(0,0,0,0.15)',
              borderRadius: '50%', width: 44, height: 44,
              color: '#0a0a0a', fontSize: 18, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#4a8fd4'; (e.currentTarget as HTMLElement).style.color = '#4a8fd4' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,0,0,0.15)'; (e.currentTarget as HTMLElement).style.color = '#0a0a0a' }}
            >←</button>
          </div>
          <div style={{ position: 'absolute', top: '50%', right: -52, transform: 'translateY(-50%)', zIndex: 2 }}>
            <button onClick={() => go(1)} style={{
              background: 'transparent', border: '1px solid rgba(0,0,0,0.15)',
              borderRadius: '50%', width: 44, height: 44,
              color: '#0a0a0a', fontSize: 18, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#4a8fd4'; (e.currentTarget as HTMLElement).style.color = '#4a8fd4' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,0,0,0.15)'; (e.currentTarget as HTMLElement).style.color = '#0a0a0a' }}
            >→</button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: dir * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -60 }}
              transition={{ duration: 0.35 }}
              data-cursor-label="Learning →"
              style={{ display: 'flex', gap: 40, alignItems: 'center', padding: '24px 0' }}
            >
              <div style={{
                width: 140, height: 140, borderRadius: '50%', flexShrink: 0,
                background: '#ffffff',
                border: '1px solid rgba(74,143,212,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 40, color: '#4a8fd4',
                fontFamily: 'Redaction50, Georgia, serif',
              }}>{s.initials}</div>

              <div>
                <h3 style={{ fontFamily: 'Redaction50, Georgia, serif', fontSize: 40, color: '#0a0a0a', margin: '0 0 8px' }}>{s.name}</h3>
                <p style={{ fontFamily: 'PPNeueMontreal, Arial, sans-serif', fontSize: 14, color: '#4a8fd4', margin: '0 0 4px' }}>{s.company}</p>
                <p style={{ fontFamily: 'PPNeueMontreal, Arial, sans-serif', fontSize: 14, color: '#0a0a0a', margin: '0 0 20px' }}>{s.title}</p>
                <p style={{ fontFamily: 'PPNeueMontreal, Arial, sans-serif', fontSize: 15, fontStyle: 'italic', color: '#0a0a0a', margin: 0 }}>{s.quote}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div style={{ display: 'flex', gap: 8, paddingLeft: 180 }}>
            {SPEAKERS.map((_, i) => (
              <button key={i} onClick={() => { setDir(i > idx ? 1 : -1); setIdx(i) }} style={{
                width: 8, height: 8, borderRadius: '50%', border: 'none', cursor: 'pointer',
                background: i === idx ? '#4a8fd4' : 'rgba(0,0,0,0.15)',
                transition: 'background 0.2s', padding: 0,
              }} />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

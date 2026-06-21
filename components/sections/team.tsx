'use client'
import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type Member = {
  name: string
  role: string
  image: string | null
  alt: string
}

// CONFIRM current officers + headshot consent before adding entries.
// `image: null` triggers the styled monogram placeholder.
const ADVISORS: Member[] = []

const OFFICERS: Member[] = []

// Legacy reference roster — DO NOT render. Provided for future updates only.
// (Pulled from aiatuci/aiatuci.github.io@master:/images/boards/ on 2026-06-20)
// const REFERENCE_ROSTER = [
//   { file: 'Ihler.png',                              name: 'Alexander Ihler',      role: 'Faculty Advisor' },
//   { file: 'LATHROP.jpg',                            name: 'Lathrop',              role: 'Faculty Advisor' },
//   { file: 'Kausthub Raj Jadhav.jpg',                name: 'Kausthub Raj Jadhav',  role: '' },
//   { file: 'Eisah_Portrait.jpg',                     name: 'Eisah',                role: '' },
//   { file: 'IMG_1129.jpg',                           name: '',                     role: '' },
//   { file: 'Abhijot Kaler (Historian).jpg',          name: 'Abhijot Kaler',        role: 'Historian' },
//   { file: 'Shivan Vipani (Marketing Chair) .jpg',   name: 'Shivan Vipani',        role: 'Marketing Chair' },
//   { file: 'Pooja Senthil Kumar _Secretary.JPG',     name: 'Pooja Senthil Kumar',  role: 'Secretary' },
//   { file: 'Amy Elsayed.JPG',                        name: 'Amy Elsayed',          role: '' },
//   { file: 'Nikita Arivazhagan - Mentor.jpg',        name: 'Nikita Arivazhagan',   role: 'Mentor' },
//   { file: 'khoa.jpg',                               name: 'Khoa',                 role: '' },
// ]

function MemberCard({ member, size = 'officer' }: { member: Member; size?: 'advisor' | 'officer' }) {
  const [broken, setBroken] = useState(false)
  const photoSize = size === 'advisor' ? 240 : 180
  const titleSize = size === 'advisor' ? 24 : 20
  const showPlaceholder = member.image === null || broken
  const monogram = member.name ? member.name[0].toUpperCase() : '·'
  const accessibleName = member.name || 'AI @ UCI officer'

  return (
    <div style={{ textAlign: 'center' }}>
      {showPlaceholder ? (
        <div
          aria-label={accessibleName}
          style={{
            width: photoSize,
            height: photoSize,
            margin: '0 auto',
            borderRadius: 12,
            background: 'rgba(74,143,212,0.06)',
            border: '1px solid rgba(74,143,212,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Redaction50, Georgia, serif',
            fontSize: 64,
            color: '#4a8fd4',
          }}
        >
          {monogram}
        </div>
      ) : (
        <img
          src={member.image!}
          alt={member.alt}
          onError={() => setBroken(true)}
          style={{
            width: photoSize,
            height: photoSize,
            objectFit: 'cover',
            borderRadius: 12,
            display: 'block',
            margin: '0 auto',
            border: '1px solid rgba(0,0,0,0.08)',
          }}
        />
      )}
      <div
        style={{
          fontFamily: 'Redaction50, Georgia, serif',
          fontSize: titleSize,
          color: '#0a0a0a',
          marginTop: 16,
        }}
      >
        {accessibleName}
      </div>
      {member.role && (
        <div
          style={{
            fontFamily: 'PPNeueMontreal, Arial, sans-serif',
            fontSize: 13,
            color: '#4a8fd4',
            marginTop: 4,
          }}
        >
          {member.role}
        </div>
      )}
    </div>
  )
}

export default function TeamSection() {
  const reduce = useReducedMotion()
  return (
    <section
      id="team"
      style={{ background: '#fafafa', padding: '96px 32px' }}
    >
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}
      >
        <p
          style={{
            fontFamily: 'PPNeueMontreal, Arial, sans-serif',
            fontWeight: 500,
            fontSize: 11,
            letterSpacing: '0.32em',
            color: '#4a8fd4',
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          THE TEAM
        </p>
        <h2
          style={{
            fontFamily: 'Redaction50, Georgia, serif',
            fontSize: 'clamp(36px, 5vw, 56px)',
            lineHeight: 1.1,
            color: '#0a0a0a',
            fontWeight: 400,
            margin: '16px 0 64px',
          }}
        >
          Meet who&apos;s behind it.
        </h2>

        {ADVISORS.length > 0 && (
          <div style={{ maxWidth: 800, margin: '0 auto 96px' }}>
            <h3
              style={{
                fontFamily: 'Redaction50, Georgia, serif',
                fontSize: 32,
                color: '#0a0a0a',
                marginBottom: 32,
              }}
            >
              Advisors
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: 32,
              }}
            >
              {ADVISORS.map(m => (
                <MemberCard key={m.name || m.image || Math.random()} member={m} size="advisor" />
              ))}
            </div>
          </div>
        )}

        {OFFICERS.length > 0 ? (
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <h3
              style={{
                fontFamily: 'Redaction50, Georgia, serif',
                fontSize: 32,
                color: '#0a0a0a',
                marginBottom: 32,
              }}
            >
              Officers
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: 32,
              }}
            >
              {OFFICERS.map((m, i) => (
                <MemberCard key={`${m.name}-${i}`} member={m} size="officer" />
              ))}
            </div>
          </div>
        ) : (
          <div
            style={{
              maxWidth: 560,
              margin: '0 auto',
              padding: '48px 24px',
              background: '#f8f9fc',
              border: '1px solid rgba(0,0,0,0.08)',
              borderRadius: 16,
            }}
          >
            <p
              style={{
                fontFamily: 'PPNeueMontreal, Arial, sans-serif',
                fontSize: 16,
                lineHeight: 1.6,
                color: 'rgba(10,10,10,0.7)',
                margin: 0,
              }}
            >
              Roster updates coming soon — meet the team in person on Wednesdays at 4–5:30pm
              in DBH 6011, or drop your email below to hear about the next event.
            </p>
          </div>
        )}
      </motion.div>
    </section>
  )
}

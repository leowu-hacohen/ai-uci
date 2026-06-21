'use client'
import { useState } from 'react'
import { FadeStagger, FadeItem, FadeUp } from '@/components/ui/motion-primitives'

type Member = {
  name: string
  role: string
  image: string | null
  alt: string
  // Public LinkedIn profile URL. Defaults below use a LinkedIn people-search
  // URL keyed to "{name} UCI" — opens a search rather than guessing a profile,
  // so a wrong profile is never linked. Swap in confirmed profile URLs as
  // you collect them.
  linkedin?: string
}

type TeamGroup = {
  title: string
  members: Member[]
}

// CONFIRM current advisors + headshot consent before adding entries.
// `image: null` triggers the styled monogram placeholder.
const ADVISORS: Member[] = []

// Helper for placeholder LinkedIn search URLs. The aiatuci/aiatuci.github.io
// `images/boards/` folder only holds the legacy roster (Ihler, Lathrop, Pooja,
// Amy Yee, Khoa, etc.), none of the 2026 officers. Drop real headshots into
// public/images/team/ and replace `image: null` per entry as they arrive.
const li = (name: string) =>
  `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(name + ' UCI')}`

const TEAM_GROUPS: TeamGroup[] = [
  {
    title: 'Executive Board',
    members: [
      { name: 'Julian Aparicio', role: 'President',      image: null, alt: 'Julian Aparicio', linkedin: li('Julian Aparicio') },
      { name: 'Vyom Shah',       role: 'Vice President', image: null, alt: 'Vyom Shah',       linkedin: li('Vyom Shah') },
      { name: 'Andy Choi',       role: 'Secretary',      image: null, alt: 'Andy Choi',       linkedin: li('Andy Choi') },
      { name: 'Ashley Kang',     role: 'Treasurer',      image: null, alt: 'Ashley Kang',     linkedin: li('Ashley Kang') },
    ],
  },
  {
    title: 'Marketing',
    members: [
      { name: 'Maan Patel',      role: 'Marketing Lead', image: null, alt: 'Maan Patel',      linkedin: li('Maan Patel') },
      { name: 'Naz Atalay',      role: 'Marketing',      image: null, alt: 'Naz Atalay',      linkedin: li('Naz Atalay') },
      { name: 'Shreya Mawandia', role: 'Marketing',      image: null, alt: 'Shreya Mawandia', linkedin: li('Shreya Mawandia') },
      { name: 'Jay Kim',         role: 'Marketing',      image: null, alt: 'Jay Kim',         linkedin: li('Jay Kim') },
    ],
  },
  {
    title: 'Communications',
    members: [
      { name: 'Jasmine Marwaha', role: 'Communications Lead', image: null, alt: 'Jasmine Marwaha', linkedin: li('Jasmine Marwaha') },
      { name: 'Injila Adil',     role: 'Communications',      image: null, alt: 'Injila Adil',     linkedin: li('Injila Adil') },
      { name: 'Oliver Guo',      role: 'Communications',      image: null, alt: 'Oliver Guo',      linkedin: li('Oliver Guo') },
      { name: 'Vivan Bheda',     role: 'Communications',      image: null, alt: 'Vivan Bheda',     linkedin: li('Vivan Bheda') },
    ],
  },
  {
    title: 'Logistics',
    members: [
      { name: 'Sabrina Pukarta', role: 'Logistics Lead', image: null, alt: 'Sabrina Pukarta', linkedin: li('Sabrina Pukarta') },
      { name: 'Arnav Saharan',   role: 'Logistics',      image: null, alt: 'Arnav Saharan',   linkedin: li('Arnav Saharan') },
      { name: 'Audrey Sun',      role: 'Logistics',      image: null, alt: 'Audrey Sun',      linkedin: li('Audrey Sun') },
      { name: 'Bailey Deng',     role: 'Logistics',      image: null, alt: 'Bailey Deng',     linkedin: li('Bailey Deng') },
      { name: 'Isha Kotalwar',   role: 'Logistics',      image: null, alt: 'Isha Kotalwar',   linkedin: li('Isha Kotalwar') },
    ],
  },
  {
    title: 'Webmaster',
    members: [
      { name: 'Johnson Nguyen',  role: 'Webmaster Lead', image: null, alt: 'Johnson Nguyen',  linkedin: li('Johnson Nguyen') },
      { name: 'Brandon Tran',    role: 'Webmaster',      image: null, alt: 'Brandon Tran',    linkedin: li('Brandon Tran') },
      { name: 'Jason Nguyen',    role: 'Webmaster',      image: null, alt: 'Jason Nguyen',    linkedin: li('Jason Nguyen') },
      { name: 'Pratham Hebbar',  role: 'Webmaster',      image: null, alt: 'Pratham Hebbar',  linkedin: li('Pratham Hebbar') },
    ],
  },
  {
    title: 'Projects',
    members: [
      { name: 'Sriharshini Gubbala', role: 'Project Lead',  image: null, alt: 'Sriharshini Gubbala', linkedin: li('Sriharshini Gubbala') },
      { name: 'Jonathan Pan',        role: 'Project Lead',  image: null, alt: 'Jonathan Pan',        linkedin: li('Jonathan Pan') },
      { name: 'Anish Nambiraja',     role: 'Project Chair', image: null, alt: 'Anish Nambiraja',     linkedin: li('Anish Nambiraja') },
      { name: 'Zach Lai',            role: 'Project Chair', image: null, alt: 'Zach Lai',            linkedin: li('Zach Lai') },
      { name: 'Harsh',               role: 'Project Chair', image: null, alt: 'Harsh',               linkedin: li('Harsh AI UCI') },
    ],
  },
  {
    title: 'Workshops',
    members: [
      { name: 'Aston Chan',       role: 'Workshop Lead',        image: null, alt: 'Aston Chan',       linkedin: li('Aston Chan') },
      { name: 'David Culciar',    role: 'Workshop Coordinator', image: null, alt: 'David Culciar',    linkedin: li('David Culciar') },
      { name: 'Mitali Mittal',    role: 'Workshop Coordinator', image: null, alt: 'Mitali Mittal',    linkedin: li('Mitali Mittal') },
      { name: 'Shreya Nakum',     role: 'Workshop Coordinator', image: null, alt: 'Shreya Nakum',     linkedin: li('Shreya Nakum') },
      { name: 'Trisha Satyavrat', role: 'Workshop Coordinator', image: null, alt: 'Trisha Satyavrat', linkedin: li('Trisha Satyavrat') },
      { name: 'Houssin Saadeh',   role: 'Workshop Coordinator', image: null, alt: 'Houssin Saadeh',   linkedin: li('Houssin Saadeh') },
    ],
  },
]

function MemberCard({ member, size = 'officer' }: { member: Member; size?: 'advisor' | 'officer' }) {
  const [broken, setBroken] = useState(false)
  const photoSize = size === 'advisor' ? 160 : 112
  const titleSize = size === 'advisor' ? 18 : 14
  const monogramSize = size === 'advisor' ? 48 : 36
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
            borderRadius: 10,
            background: 'rgba(74,143,212,0.06)',
            border: '1px solid rgba(74,143,212,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Redaction50, Georgia, serif',
            fontSize: monogramSize,
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
            borderRadius: 10,
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
          marginTop: 10,
          lineHeight: 1.2,
        }}
      >
        {accessibleName}
      </div>
      {member.role && (
        <div
          style={{
            fontFamily: 'PPNeueMontreal, Arial, sans-serif',
            fontSize: 11,
            color: '#4a8fd4',
            marginTop: 2,
            lineHeight: 1.3,
          }}
        >
          {member.role}
        </div>
      )}
      {member.linkedin && (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${accessibleName} on LinkedIn`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 3,
            marginTop: 6,
            fontFamily: 'PPNeueMontreal, Arial, sans-serif',
            fontSize: 10,
            color: 'rgba(10,10,10,0.45)',
            textDecoration: 'none',
            transition: 'color 150ms ease',
          }}
          onMouseEnter={e => {
            ;(e.currentTarget as HTMLElement).style.color = '#4a8fd4'
          }}
          onMouseLeave={e => {
            ;(e.currentTarget as HTMLElement).style.color = 'rgba(10,10,10,0.45)'
          }}
        >
          LinkedIn
          <svg
            width="9"
            height="9"
            viewBox="0 0 10 10"
            fill="none"
            aria-hidden="true"
            style={{ marginLeft: 1 }}
          >
            <path
              d="M2 8L8 2M8 2H3.5M8 2V6.5"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      )}
    </div>
  )
}

export default function TeamSection() {
  // Each block (header, advisors, every team group) animates on its own
  // viewport entry instead of relying on a single section-wide FadeStagger.
  // The earlier setup wrapped the entire ~2700px section in one FadeStagger
  // with amount=0.25 — that threshold required ~675px of the section to be
  // in view before anything faded in, which Chrome's IntersectionObserver
  // sometimes never satisfied (leaving the section invisible).
  return (
    <section
      id="team"
      style={{ background: '#ffffff', padding: '64px clamp(24px, 5vw, 64px)', scrollMarginTop: 96 }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
        <FadeUp amount={0.1}>
          <p
            style={{
              fontFamily: 'PPNeueMontreal, Arial, sans-serif',
              fontWeight: 400,
              fontSize: 20,
              color: '#0a0a0a',
              margin: 0,
            }}
          >
            The Team
          </p>
        </FadeUp>
        <FadeUp amount={0.1} delay={0.08}>
          <h2
            style={{
              fontFamily: 'Redaction50, Georgia, serif',
              fontSize: 'clamp(28px, 4vw, 44px)',
              lineHeight: 1.1,
              color: '#0a0a0a',
              fontWeight: 400,
              margin: '12px 0 40px',
            }}
          >
            Meet who&apos;s behind it.
          </h2>
        </FadeUp>

        {ADVISORS.length > 0 && (
          <FadeStagger
            stagger={0.08}
            amount={0.1}
            style={{ maxWidth: 800, margin: '0 auto 96px' }}
          >
            <FadeItem>
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
            </FadeItem>
            <FadeItem>
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
            </FadeItem>
          </FadeStagger>
        )}

        {TEAM_GROUPS.map((group, gi) => (
          <FadeStagger
            key={group.title}
            stagger={0.05}
            amount={0.1}
            style={{
              maxWidth: 1200,
              margin: gi === TEAM_GROUPS.length - 1 ? '0 auto' : '0 auto 40px',
            }}
          >
            <FadeItem>
              <h3
                style={{
                  fontFamily: 'PPNeueMontreal, Arial, sans-serif',
                  fontWeight: 400,
                  fontSize: 20,
                  color: 'rgba(10,10,10,0.9)',
                  margin: '0 0 20px',
                  textAlign: 'center',
                }}
              >
                {group.title}
              </h3>
            </FadeItem>
            <FadeItem>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                  gap: 20,
                }}
              >
                {group.members.map((m, i) => (
                  <MemberCard key={`${m.name}-${i}`} member={m} size="officer" />
                ))}
              </div>
            </FadeItem>
          </FadeStagger>
        ))}
      </div>
    </section>
  )
}

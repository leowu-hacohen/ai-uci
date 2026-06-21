'use client'
import { FadeUp } from './motion-primitives'

type PageHeaderProps = {
  eyebrow?: string
  title: string
  body?: string
}

export default function PageHeader({ eyebrow, title, body }: PageHeaderProps) {
  return (
    <FadeUp amount={0.15}>
      <header
        style={{
          maxWidth: 720,
          margin: '0 auto',
          padding: '48px clamp(24px, 5vw, 64px) 64px',
          textAlign: 'center',
        }}
      >
        {eyebrow && (
          <p
            style={{
              fontFamily: 'PPNeueMontreal, Arial, sans-serif',
              fontWeight: 400,
              fontSize: 20,
              color: '#0a0a0a',
              margin: 0,
            }}
          >
            {eyebrow}
          </p>
        )}
        <h1
          style={{
            fontFamily: 'Redaction50, Georgia, serif',
            fontSize: 'clamp(36px, 5vw, 56px)',
            lineHeight: 1.1,
            color: '#0a0a0a',
            fontWeight: 400,
            margin: eyebrow ? '12px 0 20px' : '0 0 20px',
          }}
        >
          {title}
        </h1>
        {body && (
          <p
            style={{
              fontFamily: 'PPNeueMontreal, Arial, sans-serif',
              fontSize: 17,
              lineHeight: 1.6,
              color: 'rgba(10,10,10,0.7)',
              margin: 0,
            }}
          >
            {body}
          </p>
        )}
      </header>
    </FadeUp>
  )
}

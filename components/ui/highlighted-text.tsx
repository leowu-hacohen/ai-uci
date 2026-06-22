import type { ReactNode } from 'react'

export const ACCENT_BLUE = '#4a8fd4'

function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/** Sparingly highlight key words/phrases in body copy — same accent as the hero. */
export function withHighlights(text: string, highlights: string[]): ReactNode {
  if (!highlights.length) return text

  const sorted = [...highlights].sort((a, b) => b.length - a.length)
  const pattern = sorted.map(escapeRegex).join('|')
  const parts = text.split(new RegExp(`(${pattern})`, 'g'))
  const seen = new Set<string>()

  return parts.map((part, i) => {
    if (!highlights.includes(part) || seen.has(part)) return part
    seen.add(part)
    return (
      <span key={i} style={{ color: ACCENT_BLUE }}>{part}</span>
    )
  })
}

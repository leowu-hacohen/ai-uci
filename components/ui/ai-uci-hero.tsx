'use client'

import { useEffect, useRef } from 'react'
import TickerBar from './ticker-bar'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  r: number
}

export function AiUciHero({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rawCtx = canvas.getContext('2d')
    if (!rawCtx) return

    const el: HTMLCanvasElement = canvas
    const ctx: CanvasRenderingContext2D = rawCtx

    const dpr = window.devicePixelRatio || 1
    let W = window.innerWidth
    let H = window.innerHeight

    function resize() {
      W = window.innerWidth
      H = window.innerHeight
      el.width = W * dpr
      el.height = H * dpr
      el.style.width = `${W}px`
      el.style.height = `${H}px`
      ctx.scale(dpr, dpr)
    }
    resize()

    // ── Neural net nodes ──────────────────────────────────────────────────────
    const NODE_COUNT = 90
    const margin = 80
    const nodes: Node[] = Array.from({ length: NODE_COUNT }, () => {
      const isLarge = Math.random() < 0.18
      return {
        x: margin + Math.random() * (W - margin * 2),
        y: margin + Math.random() * (H - margin * 2),
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        r: isLarge ? 3.5 + Math.random() * 3.5 : 1.5 + Math.random() * 2,
      }
    })

    // ── Logo image ────────────────────────────────────────────────────────────
    const logoImg = new Image()
    let logoReady = false
    logoImg.onload = () => { logoReady = true }
    logoImg.src = '/anteater-logo.png'

    const mouse = { x: -9999, y: -9999 }
    const parallax = { x: 0, y: 0 }
    let animId = 0
    const startTime = performance.now()

    // ── Network drawing ───────────────────────────────────────────────────────
    function drawNetwork() {
      const connDist = 160
      ctx.lineWidth = 0.7
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const d = Math.hypot(dx, dy)
          if (d < connDist) {
            ctx.strokeStyle = `rgba(22,22,22,${(1 - d / connDist) * 0.38})`
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }
      nodes.forEach(node => {
        if (node.r > 3.5) {
          const grad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.r * 3.5)
          grad.addColorStop(0, 'rgba(30,30,30,0.22)')
          grad.addColorStop(1, 'rgba(30,30,30,0)')
          ctx.fillStyle = grad
          ctx.beginPath()
          ctx.arc(node.x, node.y, node.r * 3.5, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.fillStyle = 'rgba(18,18,18,0.88)'
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    // ── Main loop ─────────────────────────────────────────────────────────────
    function animate() {
      const now = performance.now()
      const elapsed = now - startTime
      const fade = (delay: number) => Math.min(1, Math.max(0, (elapsed - delay) / 350))
      const headAlpha = fade(80)
      const logoAlpha = fade(260)
      const subAlpha  = fade(420)

      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, W, H)

      const targetPX = mouse.x > 0 ? (mouse.x - W / 2) : 0
      const targetPY = mouse.y > 0 ? (mouse.y - H / 2) : 0
      parallax.x += (targetPX - parallax.x) * 0.055
      parallax.y += (targetPY - parallax.y) * 0.055

      // Neural net nodes
      nodes.forEach(node => {
        node.vx += (Math.random() - 0.5) * 0.16
        node.vy += (Math.random() - 0.5) * 0.16
        node.vx *= 0.985
        node.vy *= 0.985
        const mdx = node.x - mouse.x, mdy = node.y - mouse.y
        const mdist = Math.hypot(mdx, mdy)
        if (mdist < 140 && mdist > 0.5) {
          const f = (1 - mdist / 140) * 2.8
          node.vx += (mdx / mdist) * f
          node.vy += (mdy / mdist) * f
        }
        const spd = Math.hypot(node.vx, node.vy)
        if (spd > 3.5) { node.vx = (node.vx / spd) * 3.5; node.vy = (node.vy / spd) * 3.5 }
        node.x += node.vx; node.y += node.vy
        if (node.x < node.r) { node.x = node.r; node.vx = Math.abs(node.vx) }
        if (node.x > W - node.r) { node.x = W - node.r; node.vx = -Math.abs(node.vx) }
        if (node.y < node.r) { node.y = node.r; node.vy = Math.abs(node.vy) }
        if (node.y > H - node.r) { node.y = H - node.r; node.vy = -Math.abs(node.vy) }
      })

      drawNetwork()

      const fontSize = Math.min(84, W * 0.065)
      const lineH    = fontSize * 0.88
      const blockH   = lineH * 3
      const logoOX   = parallax.x * 0.011, logoOY = parallax.y * 0.011
      const headOX   = parallax.x * 0.006, headOY = parallax.y * 0.006
      const subOX    = parallax.x * 0.003, subOY  = parallax.y * 0.003

      // 1. Heading
      if (headAlpha > 0) {
        ctx.save()
        ctx.globalAlpha = headAlpha
        const textX = W * 0.19 + headOX
        const textY = (H - blockH) / 2 - H * 0.05 + headOY
        ctx.font = `400 ${fontSize}px Redaction50, Georgia, serif`
        ctx.fillStyle = '#0a0a0a'
        ctx.textAlign = 'left'
        ctx.textBaseline = 'top'
        ctx.letterSpacing = `${(fontSize * 0.03).toFixed(1)}px`
        ctx.fillText('Artificial', textX, textY)
        ctx.fillText('Intelligence', textX, textY + lineH)
        ctx.fillText('@ UCI', textX, textY + lineH * 2)
        ctx.letterSpacing = '0px'
        ctx.restore()
      }

      // 2. Logo image
      if (logoAlpha > 0 && logoReady) {
        ctx.save()
        ctx.globalAlpha = logoAlpha
        const scaleH = H * 0.60
        const scaleW = scaleH * (logoImg.width / logoImg.height)
        const cx = W * 0.68 + logoOX
        const cy = H * 0.5 + logoOY
        ctx.drawImage(logoImg, cx - scaleW / 2, cy - scaleH / 2, scaleW, scaleH)
        ctx.restore()
      }

      // 3. Subtext
      if (subAlpha > 0) {
        ctx.save()
        ctx.globalAlpha = subAlpha
        const subFontSize = fontSize * 0.28
        const subLineH    = subFontSize * 1.55
        const subBaseX    = W * 0.19 + subOX
        const subY        = (H - blockH) / 2 - H * 0.05 + lineH * 2 + lineH * 0.75 + H * 0.05 + subOY
        const maxSubW     = Math.min(W * 0.42, 560)
        ctx.font = `400 ${subFontSize}px 'Space Grotesk', Arial, sans-serif`
        ctx.textBaseline = 'top'

        const runs: [string, boolean][] = [
          ['Hands-on ', false], ['learning', true], [', real ', false],
          ['projects', true], [', and a ', false], ['community', true],
          [' that builds together.', false],
        ]

        let sx = subBaseX, sy = subY
        for (const [runText, isBlue] of runs) {
          const parts = runText.split(/(\s+)/)
          for (const part of parts) {
            if (!part.length) continue
            const isSpace = /^\s+$/.test(part)
            const tw = ctx.measureText(part).width
            if (!isSpace && sx + tw > subBaseX + maxSubW && sx > subBaseX) { sx = subBaseX; sy += subLineH }
            if (isSpace && sx === subBaseX) continue
            ctx.fillStyle = isBlue ? '#4a8fd4' : '#0a0a0a'
            ctx.fillText(part, sx, sy)
            sx += tw
          }
        }
        ctx.restore()
      }

      animId = requestAnimationFrame(animate)
    }

    function onMouseMove(e: MouseEvent) { mouse.x = e.clientX; mouse.y = e.clientY }
    function onMouseLeave() { mouse.x = -9999; mouse.y = -9999 }
    function onResize() { resize() }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('resize', onResize)

    document.fonts.load(`400 64px Redaction50`).catch(() => {})

    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div
      id="home"
      className={`relative w-full ${className}`}
      style={{ background: '#ffffff', height: '100svh' }}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
      <TickerBar />
    </div>
  )
}

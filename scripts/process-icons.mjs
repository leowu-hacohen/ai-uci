// Strip white backgrounds + trim padding from the three pillar icons.
//
// Pipeline per file:
//   1. rembg (Python CLI, spawned as a subprocess) replaces the white plate
//      with full transparency.
//   2. sharp().trim() crops away any residual transparent or near-edge-color
//      padding, leaving a tight bounding box.
//   3. Write back over the original file.
//   4. Verify the result has an alpha channel.
//
// Usage: node scripts/process-icons.mjs

import { spawn } from 'node:child_process'
import { existsSync, mkdtempSync, rmSync, copyFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import sharp from 'sharp'

const ICONS_DIR = resolve('public/images/icons')
const FILES = ['rocket.png', 'brain.png', 'handshake.png']

function runRembg(input, output) {
  return new Promise((resolveFn, rejectFn) => {
    const proc = spawn('rembg', ['i', input, output], { stdio: ['ignore', 'pipe', 'pipe'] })
    let stderr = ''
    proc.stderr.on('data', (d) => { stderr += d.toString() })
    proc.on('error', rejectFn)
    proc.on('close', (code) => {
      if (code === 0) resolveFn()
      else rejectFn(new Error(`rembg exited with code ${code}\n${stderr}`))
    })
  })
}

async function processFile(filename, tmpDir) {
  const target = join(ICONS_DIR, filename)
  if (!existsSync(target)) throw new Error(`missing input: ${target}`)

  // rembg won't overwrite in-place safely; route through a temp file.
  const cutout = join(tmpDir, `cutout-${filename}`)

  console.log(`[${filename}] removing background…`)
  await runRembg(target, cutout)

  console.log(`[${filename}] trimming padding…`)
  // .trim() crops away same-color borders; with a transparent background it
  // collapses to the tight alpha bounding box. Buffer first so we can write
  // back to the same path safely.
  const buf = await sharp(cutout).trim().png().toBuffer()
  await sharp(buf).toFile(target)

  // Verify alpha channel is present.
  const meta = await sharp(target).metadata()
  const hasAlpha = meta.hasAlpha === true || meta.channels === 4
  if (!hasAlpha) {
    throw new Error(`[${filename}] expected alpha channel, got channels=${meta.channels} hasAlpha=${meta.hasAlpha}`)
  }
  console.log(
    `[${filename}] ok — ${meta.width}×${meta.height}, channels=${meta.channels}, hasAlpha=${meta.hasAlpha}`
  )
}

async function main() {
  if (!existsSync(ICONS_DIR)) throw new Error(`icons dir not found: ${ICONS_DIR}`)
  const tmpDir = mkdtempSync(join(tmpdir(), 'icon-cutout-'))
  try {
    for (const f of FILES) {
      // eslint-disable-next-line no-await-in-loop
      await processFile(f, tmpDir)
    }
    console.log('\nall icons processed and verified with alpha channel.')
  } finally {
    rmSync(tmpDir, { recursive: true, force: true })
  }
}

main().catch((err) => {
  console.error('FAILED:', err.message)
  process.exit(1)
})

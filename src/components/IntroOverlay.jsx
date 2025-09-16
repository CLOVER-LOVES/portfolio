import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Logo from './Logo'

const IntroOverlay = () => {
  const [visible, setVisible] = useState(true)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const m = window.matchMedia('(prefers-reduced-motion: reduce)')
      setReduceMotion(!!m.matches)
    }
  }, [])

  useEffect(() => {
    // Show a bit longer, then fade
    const SHOW_MS = reduceMotion ? 600 : 2400
    const FADE_MS = reduceMotion ? 250 : 900
    const TOTAL = SHOW_MS + FADE_MS + 50
    const t = setTimeout(() => setVisible(false), TOTAL)
    return () => clearTimeout(t)
  }, [reduceMotion])

  if (!visible) return null

  return (
    <motion.div
      className="intro-overlay"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{
        duration: reduceMotion ? 0.25 : 0.9,
        delay: reduceMotion ? 0.6 : 2.4,
        ease: [0.22, 1, 0.36, 1]
      }}
      aria-hidden="true"
    >
      <div className="intro-content">
        <div className="intro-logo">
          {/* Outer wrapper scales out during fade */}
          <motion.div
            className="intro-logo-explode"
            initial={{ scale: 1 }}
            animate={{ scale: reduceMotion ? 1.04 : 1.18 }}
            transition={{ delay: reduceMotion ? 0.6 : 2.4, duration: reduceMotion ? 0.25 : 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              initial={{ scale: 0.96, filter: 'brightness(0.9)' }}
              animate={{ scale: 1, filter: 'brightness(1)' }}
              transition={{ duration: reduceMotion ? 0.2 : 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: 'relative' }}
            >
              {/* Electric currents emanating from center */}
              {!reduceMotion && (
                <svg className="intro-currents" viewBox="0 0 400 400" aria-hidden="true">
                  <path className="c c1" d="M200 200 C 230 165, 285 145, 340 155" />
                  <path className="c c2" d="M200 200 C 170 165, 120 130, 70 120" />
                  <path className="c c3" d="M200 200 C 210 240, 250 290, 305 330" />
                  <path className="c c4" d="M200 200 C 190 235, 150 285, 100 335" />
                  <path className="c c5" d="M200 200 C 245 200, 305 200, 360 200" />
                  <path className="c c6" d="M200 200 C 155 200, 95 200, 40 200" />
                </svg>
              )}
              {/* Sparks around the logo */}
              {!reduceMotion && (
                <Sparks count={24} colors={["#00E5FF", "#77A664", "#D4C281", "#8BC34A"]} />
              )}
              {/* Animated wordmark */}
              <Logo />
            </motion.div>
          </motion.div>
        </div>
        {/* Electric overlays */}
        {!reduceMotion && (
          <>
            <div className="intro-electric" />
            <div className="intro-scanlines" />
          </>
        )}
      </div>
    </motion.div>
  )
}

// Simple spark burst emitter
const Sparks = ({ count = 20, colors = ["#00E5FF", "#77A664"] }) => {
  const seeds = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const angle = Math.random() * Math.PI * 2
      const dist = 90 + Math.random() * 120 // px radius
      const x = Math.cos(angle) * dist
      const y = Math.sin(angle) * dist
      const size = 2 + Math.random() * 3.5
      const d = 0.7 + Math.random() * 0.6
      const delay = Math.random() * 0.45
      const repeatDelay = 0.6 + Math.random() * 1.1
      const color = colors[i % colors.length]
      return { x, y, size, d, delay, repeatDelay, color, key: `spark-${i}-${Math.random().toString(36).slice(2)}` }
    })
  }, [count, colors])

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} aria-hidden>
      {seeds.map((s) => (
        <motion.span
          key={s.key}
          initial={{ x: 0, y: 0, left: '50%', top: '50%', scale: 0.4, opacity: 0.95 }}
          animate={{ x: s.x, y: s.y, scale: 1, opacity: 0 }}
          transition={{ duration: s.d, delay: s.delay, repeat: Infinity, repeatDelay: s.repeatDelay, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'absolute',
            width: s.size,
            height: s.size,
            borderRadius: 9999,
            background: s.color,
            filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.5))',
          }}
        />
      ))}
    </div>
  )
}

export default IntroOverlay

'use client'

import { useState, useEffect } from 'react'
import styles from './DevShiftLoader.module.css'

interface DevShiftLoaderProps {
  holdMs?: number
  onComplete?: () => void
}

export default function DevShiftLoader({ holdMs = 1600, onComplete }: DevShiftLoaderProps) {
  const [splitting, setSplitting] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setSplitting(true), holdMs)
    const t2 = setTimeout(() => {
      setDone(true)
      onComplete?.()
    }, holdMs + 1200)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [holdMs, onComplete])

  if (done) return null

  return (
    <div className={styles.overlay}>
      {/* Top-right diagonal curtain */}
      <div className={`${styles.curtain} ${styles.curtainTR} ${splitting ? styles.slideTR : ''}`} />

      {/* Bottom-left diagonal curtain */}
      <div className={`${styles.curtain} ${styles.curtainBL} ${splitting ? styles.slideBL : ''}`} />

      {/* Diagonal glow */}
      <div className={`${styles.seamGlow} ${splitting ? styles.seamGlowHide : ''}`} />

      {/* Full assembled logo */}
      <svg
        width="60"
        height="110"
        viewBox="0 0 1280 2361.13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${styles.logo} ${splitting ? styles.logoSplit : styles.logoBreathe}`}
        aria-hidden="true"
      >
        <g transform="translate(1280,2361.13) scale(-1,-1)">
          <polygon
            points="1280 1477.42 1280 1700.88 0 2361.13 0 2093.2 941.56 1590.24 0 1211.66 0 943.37 1280 1477.42"
            fill="#EB7426"
          />
          <polygon
            points="1280 268.3 338.44 758.6 1280 1137.54 1280 1405.47 0 871.41 0 648.32 1280 0 1280 268.3"
            fill="#EB7426"
          />
        </g>
      </svg>
    </div>
  )
}

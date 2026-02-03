'use client'

import { useState, useEffect, useSyncExternalStore } from 'react'
import styles from './BabyCountdown.module.css'

const DUE_DATE = new Date('2026-04-29T00:00:00')
const CONCEPTION_DATE = new Date('2025-07-29T00:00:00') // Roughly 9 months before

type TimeRemaining = {
  days: number
  hours: number
  minutes: number
  progress: number
  isPastDue: boolean
  isBorn: boolean
}

function calculateTimeRemaining(): TimeRemaining {
  const now = new Date()
  const difference = DUE_DATE.getTime() - now.getTime()
  const totalPregnancy = DUE_DATE.getTime() - CONCEPTION_DATE.getTime()
  const elapsed = now.getTime() - CONCEPTION_DATE.getTime()
  const progress = Math.min(Math.max((elapsed / totalPregnancy) * 100, 0), 100)

  // If we're past the due date by more than 30 days, assume the baby is born
  const daysPastDue = -difference / (1000 * 60 * 60 * 24)
  const isBorn = daysPastDue > 30

  if (difference <= 0 && !isBorn) {
    return {
      days: Math.abs(Math.floor(difference / (1000 * 60 * 60 * 24))),
      hours: Math.abs(
        Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      ),
      minutes: Math.abs(
        Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      ),
      progress: 100,
      isPastDue: true,
      isBorn: false,
    }
  }

  if (isBorn) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      progress: 100,
      isPastDue: false,
      isBorn: true,
    }
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
    progress,
    isPastDue: false,
    isBorn: false,
  }
}

const defaultTimeRemaining: TimeRemaining = {
  days: 0,
  hours: 0,
  minutes: 0,
  progress: 0,
  isPastDue: false,
  isBorn: false,
}

function subscribeToNothing() {
  return () => {}
}

function useMounted() {
  return useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false
  )
}

export function BabyCountdown() {
  const mounted = useMounted()
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(() => {
    if (typeof window === 'undefined') return defaultTimeRemaining
    return calculateTimeRemaining()
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining())
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  if (!mounted) {
    return (
      <div className={styles.countdown}>
        <div className={styles.header}>
          <span className={styles.icon}>👶</span>
          <span className={styles.title}>LOADING NEW HUMAN...</span>
        </div>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: '0%' }} />
        </div>
        <div className={styles.loading}>Calculating...</div>
      </div>
    )
  }

  if (timeRemaining.isBorn) {
    return (
      <div className={styles.countdown}>
        <div className={styles.header}>
          <span className={styles.icon}>🎉</span>
          <span className={styles.title}>NEW HUMAN DEPLOYED TO PRODUCTION</span>
        </div>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: '100%' }} />
        </div>
        <p className={styles.message}>
          Expect bugs. Sleep schedule:{' '}
          <span className={styles.highlight}>undefined</span>
        </p>
      </div>
    )
  }

  if (timeRemaining.isPastDue) {
    return (
      <div className={styles.countdown}>
        <div className={styles.header}>
          <span className={styles.icon}>⏰</span>
          <span className={styles.title}>DEPLOYMENT PENDING...</span>
        </div>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: '100%' }} />
        </div>
        <p className={styles.message}>
          {timeRemaining.days} days past ETA. They&apos;ll deploy when
          they&apos;re ready.
          <br />
          <span className={styles.muted}>
            (Much like our production releases)
          </span>
        </p>
      </div>
    )
  }

  return (
    <div className={styles.countdown}>
      <div className={styles.header}>
        <span className={styles.icon}>👶</span>
        <span className={styles.title}>LOADING NEW HUMAN...</span>
      </div>
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${timeRemaining.progress}%` }}
        />
      </div>
      <div className={styles.stats}>
        <div className={styles.percentage}>
          {Math.round(timeRemaining.progress)}%
        </div>
        <div className={styles.eta}>
          ETA: <span className={styles.highlight}>{timeRemaining.days}</span>{' '}
          days <span className={styles.highlight}>{timeRemaining.hours}</span>h{' '}
          <span className={styles.highlight}>{timeRemaining.minutes}</span>m
        </div>
      </div>
      <p className={styles.message}>
        <span className={styles.muted}>
          (They&apos;ll deploy when they&apos;re ready)
        </span>
      </p>
    </div>
  )
}

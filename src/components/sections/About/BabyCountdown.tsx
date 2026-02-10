'use client';

import { useState, useEffect, useSyncExternalStore } from 'react';
import styles from './BabyCountdown.module.css';

const DUE_DATE = new Date('2026-04-29T00:00:00');
const CONCEPTION_DATE = new Date('2025-07-29T00:00:00'); // Roughly 9 months before

const MS_PER_MINUTE = 1000 * 60;
const MS_PER_HOUR = MS_PER_MINUTE * 60;
const MS_PER_DAY = MS_PER_HOUR * 24;

type TimeRemaining = {
  days: number;
  hours: number;
  minutes: number;
  progress: number;
  isPastDue: boolean;
  isBorn: boolean;
};

function msToTimeComponents(ms: number) {
  const absMs = Math.abs(ms);
  return {
    days: Math.floor(absMs / MS_PER_DAY),
    hours: Math.floor((absMs % MS_PER_DAY) / MS_PER_HOUR),
    minutes: Math.floor((absMs % MS_PER_HOUR) / MS_PER_MINUTE),
  };
}

function calculateTimeRemaining(): TimeRemaining {
  const now = new Date();
  const difference = DUE_DATE.getTime() - now.getTime();
  const totalPregnancy = DUE_DATE.getTime() - CONCEPTION_DATE.getTime();
  const elapsed = now.getTime() - CONCEPTION_DATE.getTime();
  const progress = Math.min(Math.max((elapsed / totalPregnancy) * 100, 0), 100);

  // If we're past the due date by more than 30 days, assume the baby is born
  const daysPastDue = -difference / MS_PER_DAY;
  const isBorn = daysPastDue > 30;

  if (difference <= 0 && !isBorn) {
    return {
      ...msToTimeComponents(difference),
      progress: 100,
      isPastDue: true,
      isBorn: false,
    };
  }

  if (isBorn) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      progress: 100,
      isPastDue: false,
      isBorn: true,
    };
  }

  return {
    ...msToTimeComponents(difference),
    progress,
    isPastDue: false,
    isBorn: false,
  };
}

const defaultTimeRemaining: TimeRemaining = {
  days: 0,
  hours: 0,
  minutes: 0,
  progress: 0,
  isPastDue: false,
  isBorn: false,
};

function subscribeToNothing() {
  return () => {};
}

function useMounted() {
  return useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false
  );
}

type CountdownLayoutProps = {
  icon: string;
  title: string;
  progress: number;
  children: React.ReactNode;
};

function CountdownLayout({ icon, title, progress, children }: CountdownLayoutProps) {
  return (
    <div className={styles.countdown}>
      <div className={styles.header}>
        <span className={styles.icon}>{icon}</span>
        <span className={styles.title}>{title}</span>
      </div>
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${progress}%` }} />
      </div>
      {children}
    </div>
  );
}

type CountdownState = 'loading' | 'born' | 'pastDue' | 'countdown';

function getCountdownState(mounted: boolean, timeRemaining: TimeRemaining): CountdownState {
  if (!mounted) return 'loading';
  if (timeRemaining.isBorn) return 'born';
  if (timeRemaining.isPastDue) return 'pastDue';
  return 'countdown';
}

type CountdownStrategy = {
  icon: string;
  title: string;
  getProgress: (timeRemaining: TimeRemaining) => number;
  renderContent: (timeRemaining: TimeRemaining) => React.ReactNode;
};

/*
 * Alternative: Switch statement approach
 *
 * switch (getCountdownState(mounted, timeRemaining)) {
 *   case 'loading':
 *     return <CountdownLayout icon="👶" title="LOADING NEW HUMAN..." progress={0}>...</CountdownLayout>;
 *   case 'born':
 *     return <CountdownLayout icon="🎉" title="NEW HUMAN DEPLOYED..." progress={100}>...</CountdownLayout>;
 *   case 'pastDue':
 *     return <CountdownLayout icon="⏰" title="DEPLOYMENT PENDING..." progress={100}>...</CountdownLayout>;
 *   case 'countdown':
 *     return <CountdownLayout icon="👶" title="LOADING NEW HUMAN..." progress={progress}>...</CountdownLayout>;
 * }
 *
 * But where's the fun in that? We went with the Strategy Pattern instead.
 * Because every baby countdown deserves enterprise-grade architecture.
 */
const countdownStrategies: Record<CountdownState, CountdownStrategy> = {
  loading: {
    icon: '👶',
    title: 'LOADING NEW HUMAN...',
    getProgress: () => 0,
    renderContent: () => <div className={styles.loading}>Calculating...</div>,
  },
  born: {
    icon: '🎉',
    title: 'NEW HUMAN DEPLOYED TO PRODUCTION',
    getProgress: () => 100,
    renderContent: () => (
      <p className={styles.message}>
        Expect bugs. Sleep schedule: <span className={styles.highlight}>undefined</span>
      </p>
    ),
  },
  pastDue: {
    icon: '⏰',
    title: 'DEPLOYMENT PENDING...',
    getProgress: () => 100,
    renderContent: (t) => (
      <p className={styles.message}>
        {t.days} days past ETA. They&apos;ll deploy when they&apos;re ready.
        <br />
        <span className={styles.muted}>(Much like our production releases)</span>
      </p>
    ),
  },
  countdown: {
    icon: '👶',
    title: 'LOADING NEW HUMAN...',
    getProgress: (t) => t.progress,
    renderContent: (t) => (
      <>
        <div className={styles.stats}>
          <div className={styles.percentage}>{Math.round(t.progress)}%</div>
          <div className={styles.eta}>
            ETA: <span className={styles.highlight}>{t.days}</span> days{' '}
            <span className={styles.highlight}>{t.hours}</span>h <span className={styles.highlight}>{t.minutes}</span>m
          </div>
        </div>
        <p className={styles.message}>
          <span className={styles.muted}>(They&apos;ll deploy when they&apos;re ready)</span>
        </p>
      </>
    ),
  },
};

export function BabyCountdown() {
  const mounted = useMounted();
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(() => {
    if (typeof window === 'undefined') return defaultTimeRemaining;
    return calculateTimeRemaining();
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const state = getCountdownState(mounted, timeRemaining);
  const strategy = countdownStrategies[state];

  return (
    <CountdownLayout icon={strategy.icon} title={strategy.title} progress={strategy.getProgress(timeRemaining)}>
      {strategy.renderContent(timeRemaining)}
    </CountdownLayout>
  );
}

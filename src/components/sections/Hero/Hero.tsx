'use client';

import styles from './Hero.module.css';
import { HeroText, ScrollIndicator } from './HeroText';
import { Terminal } from './Terminal';

export function Hero() {
  return (
    <section className={styles.hero} aria-label="Hero section">
      <div className={styles.background} aria-hidden="true" />
      <div className={styles.content}>
        <HeroText />
        <div className={styles.terminalWrapper}>
          <Terminal />
        </div>
      </div>
      <ScrollIndicator />
    </section>
  );
}

'use client'

import styles from './About.module.css'
import { BabyCountdown } from './BabyCountdown'
import { GamingStats } from './GamingStats'
import { TechStats } from './TechStats'
import { ContactForm } from './ContactForm'

export function About() {
  return (
    <section id="about" className={styles.about} aria-label="About section">
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>
            About <span className="gradient-text">Me</span>
          </h2>
          <p className={styles.subtitle}>
            The TL;DR of a TypeScript enthusiast
          </p>
        </header>

        <div className={styles.content}>
          <div className={styles.bio}>
            <p className={styles.bioText}>
              I build digital banking products at <strong>Banca AideXa</strong>,
              which means I break things in production with regulatory
              consequences.{' '}
              <span className={styles.highlight}>
                Full-stack TypeScript enthusiast
              </span>{' '}
              (yes, that&apos;s my whole personality). Based in Milan, fueled by
              espresso and existential dread.
            </p>
            <p className={styles.bioText}>
              Married to someone way out of my league. Soon-to-be dad, which
              means my sleep schedule will finally match my deploy schedule:{' '}
              <span className={styles.highlightPink}>
                completely unpredictable
              </span>
              .
            </p>
            <p className={styles.dogQuote}>
              &ldquo;Proud Shiba Inu parent. I like dogs more than humans, which
              is a completely reasonable opinion once you&apos;ve met
              both.&rdquo;
            </p>
          </div>

          <div className={styles.grid}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>
                <span className={styles.cardIcon}>👶</span>
                Dad Loading...
              </h3>
              <BabyCountdown />
            </div>

            <div className={styles.card}>
              <h3 className={styles.cardTitle}>
                <span className={styles.cardIcon}>🎲</span>
                Tech Skills
              </h3>
              <TechStats />
            </div>

            <div className={styles.card}>
              <h3 className={styles.cardTitle}>
                <span className={styles.cardIcon}>🎮</span>
                Gaming Life
              </h3>
              <GamingStats />
            </div>
          </div>

          <div id="contact" className={`${styles.card} ${styles.contactCard}`}>
            <h3 className={styles.cardTitle}>
              <span className={styles.cardIcon}>💬</span>
              Get in Touch
            </h3>
            <p
              className={styles.bioText}
              style={{ marginBottom: 'var(--space-lg)', textAlign: 'left' }}
            >
              Want to chat about TypeScript, gaming, or why Shiba Inus are the
              superior life form? Drop me a message.
            </p>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}

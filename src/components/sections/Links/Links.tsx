'use client'

import styles from './Links.module.css'

type SocialLink = {
  name: string
  icon: string
  href: string
  description: string
  warning?: string
  color: string
  colorAlpha: string
}

const professionalLinks: SocialLink[] = [
  {
    name: 'GitHub',
    icon: '🐙',
    href: 'https://github.com/alpe',
    description: 'Where my code lives (and occasionally works)',
    color: 'var(--color-text)',
    colorAlpha: 'rgba(228, 228, 231, 0.3)',
  },
  {
    name: 'LinkedIn',
    icon: '💼',
    href: 'https://linkedin.com/in/albertopertusi',
    description: 'Professional face goes here',
    color: '#0a66c2',
    colorAlpha: 'rgba(10, 102, 194, 0.3)',
  },
  {
    name: 'X (Twitter)',
    icon: '𝕏',
    href: 'https://x.com/Alpe_89',
    description: 'Occasional tech hot takes',
    color: 'var(--color-text)',
    colorAlpha: 'rgba(228, 228, 231, 0.3)',
  },
]

const gamingLinks: SocialLink[] = [
  {
    name: 'op.gg',
    icon: '⚔️',
    href: 'https://www.op.gg/summoners/euw/alpe-1989',
    description: 'League of Legends stats',
    warning: '(Enter at your own risk)',
    color: '#5383e8',
    colorAlpha: 'rgba(83, 131, 232, 0.3)',
  },
  {
    name: 'Steam',
    icon: '🎮',
    href: 'https://steamcommunity.com/id/alpe89',
    description: '1000+ hours of Dota 2 shame',
    color: '#1b2838',
    colorAlpha: 'rgba(27, 40, 56, 0.3)',
  },
]

function LinkCard({ link }: { link: SocialLink }) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.link}
      style={
        {
          '--linkColor': link.color,
          '--linkColorAlpha': link.colorAlpha,
        } as React.CSSProperties
      }
    >
      <span className={styles.icon} aria-hidden="true">
        {link.icon}
      </span>
      <span className={styles.name}>{link.name}</span>
      <span className={styles.description}>{link.description}</span>
      {link.warning && <span className={styles.warning}>{link.warning}</span>}
    </a>
  )
}

export function Links() {
  return (
    <section className={styles.links} aria-label="Social links">
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>
            Find Me <span className="gradient-text">Online</span>
          </h2>
          <p className={styles.subtitle}>
            Or don&apos;t. I respect your choices.
          </p>
        </header>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Professional</h3>
          <div className={styles.grid}>
            {professionalLinks.map((link) => (
              <LinkCard key={link.name} link={link} />
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Gaming (Proceed with caution)</h3>
          <div className={styles.grid}>
            {gamingLinks.map((link) => (
              <LinkCard key={link.name} link={link} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

'use client'

import styles from './TechStats.module.css'

type Skill = {
  name: string
  icon: string
  score: number
  modifier: number
  comment: string
}

function getModifier(score: number): number {
  return Math.floor((score - 10) / 2)
}

const skills: Skill[] = [
  {
    name: 'React',
    icon: '⚛️',
    score: 18,
    modifier: getModifier(18),
    comment: 'Rolled a nat 20 on useEffect. Still confused.',
  },
  {
    name: 'Node.js',
    icon: '🟢',
    score: 15,
    modifier: getModifier(15),
    comment: 'Callback hell survivor. +2 to async/await.',
  },
  {
    name: 'CSS',
    icon: '🎨',
    score: 12,
    modifier: getModifier(12),
    comment: 'Can center a div. Most of the time.',
  },
  {
    name: 'Kotlin',
    icon: '🟣',
    score: 10,
    modifier: getModifier(10),
    comment: 'Average roll. No advantage, no disadvantage.',
  },
  {
    name: 'PHP',
    icon: '🐘',
    score: 8,
    modifier: getModifier(8),
    comment: 'Took psychic damage. Still recovering.',
  },
  {
    name: 'Java',
    icon: '☕',
    score: 5,
    modifier: getModifier(5),
    comment: 'Critical fail. AbstractFactoryFactoryImpl.',
  },
]

function getScoreColor(score: number): string {
  if (score >= 16) return 'var(--color-neon-accent)'
  if (score >= 12) return 'var(--color-neon-primary)'
  if (score >= 10) return 'var(--color-text-secondary)'
  return 'var(--color-neon-secondary)'
}

export function TechStats() {
  return (
    <div className={styles.tech}>
      <h3 className={styles.title}>
        Tech Skill Sheet <span className={styles.subtitle}>(d20 system)</span>
      </h3>
      <p className={styles.intro}>
        Years of experience converted to ability scores. DM approved.
      </p>
      <ul className={styles.list}>
        {skills.map((skill) => (
          <li key={skill.name} className={styles.item}>
            <div className={styles.header}>
              <span className={styles.icon}>{skill.icon}</span>
              <span className={styles.name}>{skill.name}</span>
              <div className={styles.scores}>
                <span
                  className={styles.score}
                  style={{ color: getScoreColor(skill.score) }}
                >
                  {skill.score}
                </span>
                <span className={styles.modifier}>
                  ({skill.modifier >= 0 ? '+' : ''}
                  {skill.modifier})
                </span>
              </div>
            </div>
            <p className={styles.comment}>{skill.comment}</p>
          </li>
        ))}
      </ul>
      <p className={styles.footer}>
        🎲 Roll for debugging: *rolls 1* ...we&apos;re pushing to prod anyway.
      </p>
    </div>
  )
}

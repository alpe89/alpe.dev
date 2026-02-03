"use client";

import styles from "./GamingStats.module.css";

type Game = {
  name: string
  icon: string
  achievement: string
  comment: string
  color: string
}

const games: Game[] = [
  {
    name: "Starcraft 2",
    icon: "⚔️",
    achievement: "Master EU",
    comment: "Retired at the peak. (The peak was low.)",
    color: "var(--color-neon-cyan)",
  },
  {
    name: "Dota 2",
    icon: "🎮",
    achievement: "1000+ hours",
    comment: "Still miss half my last-hits.",
    color: "var(--color-neon-pink)",
  },
  {
    name: "League of Legends",
    icon: "🏆",
    achievement: "Iron → Gold (ADC)",
    comment: "My teammates were always the problem.",
    color: "var(--color-neon-purple)",
  },
  {
    name: "World of Warcraft",
    icon: "⚔️",
    achievement: "Several max level chars",
    comment: "Horde only. For the Horde!",
    color: "var(--color-neon-accent)",
  },
];

export function GamingStats() {
  return (
    <div className={styles.gaming}>
      <h3 className={styles.title}>
        Competitive Gaming Resume{" "}
        <span className={styles.subtitle}>(nobody asked)</span>
      </h3>
      <ul className={styles.list}>
        {games.map((game) => (
          <li key={game.name} className={styles.item}>
            <div className={styles.header}>
              <span className={styles.icon}>{game.icon}</span>
              <span className={styles.name}>{game.name}</span>
            </div>
            <span
              className={styles.achievement}
              style={{ color: game.color }}
            >
              {game.achievement}
            </span>
            <p className={styles.comment}>{game.comment}</p>
          </li>
        ))}
      </ul>
      <p className={styles.footer}>
        I APM my keyboard at work like I&apos;m defending a Zerg rush.
      </p>
    </div>
  );
}

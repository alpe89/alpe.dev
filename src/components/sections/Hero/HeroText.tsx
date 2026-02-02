"use client";

import { LinkButton } from "@/components/ui/Button";
import styles from "./Hero.module.css";

export function HeroText() {
  return (
    <div className={styles.content}>
      <p className={styles.greeting}>Hello, I&apos;m</p>
      <h1 className={styles.name}>
        <span className={styles.nameGradient}>Alberto Pertusi</span>
      </h1>
      <p className={styles.tagline}>
        Technical Lead. Bug Manufacturer.{" "}
        <span className={styles.taglineHighlight}>
          Future Sleep-Deprived Dad.
        </span>
      </p>
      <div className={styles.cta}>
        <LinkButton href="#about" variant="primary">
          About Me
        </LinkButton>
        <LinkButton href="#contact" variant="secondary">
          Get in Touch
        </LinkButton>
      </div>
    </div>
  );
}

export function ScrollIndicator() {
  return (
    <div className={styles.scrollIndicator}>
      <div className={styles.scrollMouse}>
        <div className={styles.scrollWheel} />
      </div>
      <span>Scroll</span>
    </div>
  );
}

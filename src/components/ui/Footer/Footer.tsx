import styles from './Footer.module.css';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.copyright}>&copy; {currentYear} Alberto Pertusi. All rights reserved.</p>
          <p className={styles.tagline}>
            Built with <span className={styles.highlight}>Next.js</span>,{' '}
            <span className={styles.highlight}>TypeScript</span>, <span className={styles.highlight}>AI Tokens</span>{' '}
            and <span className={styles.heart}>☕️</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

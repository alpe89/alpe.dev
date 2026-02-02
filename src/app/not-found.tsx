'use client'

import { useEffect, useState } from 'react'
import { LinkButton } from '@/components/ui/Button'
import styles from './not-found.module.css'

const notFoundMessages = [
  "404: This page is as missing as my LP after a losing streak.",
  "404: This page went AFK, just like my support.",
  "404: Page not found. Unlike my dog, who always finds me. Because he wants food.",
  "404: This page left faster than my teammates after first blood.",
  "404: Error fetching page. Have you tried mass Recall?",
  "404: This page got Zerg rushed.",
  "404: Page.exe has stopped working. Much like me on Mondays.",
  "404: The page you're looking for is in another castle.",
  "404: This page ragequit.",
  "404: Page disconnected. Please check your internet connection. (It's not your internet.)",
]

export default function NotFound() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    const randomMessage = notFoundMessages[Math.floor(Math.random() * notFoundMessages.length)]
    setMessage(randomMessage)
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.glitch} data-text="404">
          404
        </div>
        <p className={styles.message}>{message}</p>
        <div className={styles.actions}>
          <LinkButton href="/" variant="primary">
            Take Me Home
          </LinkButton>
          <LinkButton href="/blog" variant="secondary">
            Try the Blog
          </LinkButton>
        </div>
      </div>
    </div>
  )
}

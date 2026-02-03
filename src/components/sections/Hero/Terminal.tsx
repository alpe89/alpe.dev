'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import styles from './Terminal.module.css'

type CommandResult = {
  command: string
  output: string[]
  isError: boolean
}

const funnyCommands: CommandResult[] = [
  {
    command: 'npm run build',
    output: [
      '> building...',
      '',
      'ERROR: Cannot find module "motivation"',
      'ERROR: "coffee" is undefined',
      'ERROR: Expected 8 hours of sleep, received 4',
      '',
      'Build failed with 3 errors and 47 existential crises',
    ],
    isError: true,
  },
  {
    command: 'npm test',
    output: [
      'Running tests...',
      '',
      '✓ it should work (skipped)',
      '✓ it should not break (skipped)',
      '✗ it should be documented',
      '  Expected: documentation',
      '  Received: "I\'ll do it later"',
      '',
      'Tests: 1 failed, 2 skipped, 0 passed',
    ],
    isError: true,
  },
  {
    command: 'git push origin main',
    output: [
      'Pushing to origin...',
      '',
      'remote: error: Nice try.',
      'remote: error: Did you even run the tests?',
      "remote: error: (We both know you didn't)",
      '',
      'fatal: the remote hung up unexpectedly',
      '(just like my motivation on Mondays)',
    ],
    isError: true,
  },
  {
    command: 'git commit -m "final fix"',
    output: [
      '[main a1b2c3d] final fix',
      '',
      'WARNING: This is your 47th "final" fix today',
      'WARNING: Git history shows 12 "final-final" commits',
      'WARNING: Consider therapy',
      '',
      '1 file changed, mass confusion inserted',
    ],
    isError: false,
  },
  {
    command: 'npm install',
    output: [
      'Installing dependencies...',
      '',
      'added 1,847 packages',
      'found 69 vulnerabilities (42 nice, 27 critical)',
      '',
      'node_modules is now larger than your hopes and dreams',
      'Disk space: yes',
    ],
    isError: false,
  },
  {
    command: 'docker-compose up',
    output: [
      'Starting services...',
      '',
      'db_1    | waiting for postgres...',
      'db_1    | still waiting...',
      'db_1    | any day now...',
      'api_1   | Error: database not ready',
      "api_1   | (it's never ready, just like me)",
      '',
      'ERROR: Service "sanity" failed to start',
    ],
    isError: true,
  },
  {
    command: 'cat ~/.zshrc',
    output: [
      '# TODO: organize this file',
      '# Last organized: never',
      '',
      'alias yolo="git push --force"',
      'alias please="sudo"',
      'alias ffs="rm -rf node_modules && npm i"',
      '',
      "# I don't remember what this does but I'm afraid to remove it",
      'export PATH="$PATH:/usr/local/mystery"',
    ],
    isError: false,
  },
  {
    command: 'ping production',
    output: [
      'PING production (127.0.0.1): 56 data bytes',
      '',
      "64 bytes: time=2ms (it's Friday, don't do it)",
      '64 bytes: time=3ms (seriously, step away)',
      "64 bytes: time=999ms (I'm begging you)",
      '',
      '--- production ping statistics ---',
      '3 packets transmitted, 0 courage remaining',
    ],
    isError: false,
  },
  {
    command: 'rm -rf bugs/',
    output: [
      'rm: cannot remove "bugs/": Directory not empty',
      'rm: "bugs/" keeps regenerating',
      'rm: have you tried turning it off and on again?',
      '',
      "Hint: bugs are a feature, not a... wait, no, they're bugs",
    ],
    isError: true,
  },
  {
    command: 'ls -la meetings/',
    output: [
      'total: too many',
      '',
      'drwxr-xr-x  "this could have been an email"',
      'drwxr-xr-x  "quick sync" (duration: 2 hours)',
      'drwxr-xr-x  "brainstorming" (0 ideas produced)',
      '-rw-r--r--  "action-items.txt" (never opened)',
      '',
      'Calendar has mass: yes',
    ],
    isError: false,
  },
]

export function Terminal() {
  const [history, setHistory] = useState<CommandResult[]>([])
  const [currentCommand, setCurrentCommand] = useState('')
  const [isVisible, setIsVisible] = useState(true)
  const bodyRef = useRef<HTMLDivElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  // IntersectionObserver to pause when not visible
  useEffect(() => {
    const terminal = terminalRef.current
    if (!terminal) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    observer.observe(terminal)
    return () => observer.disconnect()
  }, [])

  // Auto-scroll to bottom when history changes
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [history, currentCommand])

  const typeCommand = useCallback((command: string): Promise<void> => {
    return new Promise((resolve) => {
      let i = 0
      const typeInterval = setInterval(
        () => {
          if (i < command.length) {
            setCurrentCommand(command.slice(0, i + 1))
            i++
          } else {
            clearInterval(typeInterval)
            resolve()
          }
        },
        50 + Math.random() * 30
      )
    })
  }, [])

  const runCommand = useCallback(async () => {
    const randomIndex = Math.floor(Math.random() * funnyCommands.length)
    const commandResult = funnyCommands[randomIndex]

    await typeCommand(commandResult.command)
    await new Promise((resolve) => setTimeout(resolve, 300))

    setHistory((prev) => {
      const newHistory = [...prev, commandResult]
      if (newHistory.length > 3) {
        return newHistory.slice(-3)
      }
      return newHistory
    })
    setCurrentCommand('')

    await new Promise((resolve) =>
      setTimeout(resolve, 3000 + Math.random() * 2000)
    )
  }, [typeCommand])

  useEffect(() => {
    let mounted = true

    const loop = async () => {
      while (mounted) {
        if (isVisible) {
          await runCommand()
        } else {
          await new Promise((resolve) => setTimeout(resolve, 500))
        }
      }
    }

    const timeout = setTimeout(loop, 1000)
    return () => {
      mounted = false
      clearTimeout(timeout)
    }
  }, [runCommand, isVisible])

  return (
    <div
      className={styles.terminal}
      ref={terminalRef}
      role="region"
      aria-label="Animated terminal simulation"
    >
      <div className={styles.header}>
        <div className={styles.buttons} aria-hidden="true">
          <span className={styles.buttonClose} />
          <span className={styles.buttonMinimize} />
          <span className={styles.buttonMaximize} />
        </div>
        <span className={styles.title}>
          alberto@dev: ~/life-changing-project
        </span>
      </div>
      <div
        className={styles.body}
        ref={bodyRef}
        aria-live="polite"
        aria-atomic="false"
      >
        {history.map((result, index) => (
          <div key={index} className={styles.commandBlock}>
            <div className={styles.prompt}>
              <span className={styles.user}>alberto</span>
              <span className={styles.at}>@</span>
              <span className={styles.host}>dev</span>
              <span className={styles.colon}>:</span>
              <span className={styles.path}>~</span>
              <span className={styles.dollar}>$</span>
              <span className={styles.command}>{result.command}</span>
            </div>
            <div
              className={`${styles.output} ${result.isError ? styles.error : ''}`}
            >
              {result.output.map((line, lineIndex) => (
                <div key={lineIndex} className={styles.line}>
                  {line || '\u00A0'}
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className={styles.prompt}>
          <span className={styles.user}>alberto</span>
          <span className={styles.at}>@</span>
          <span className={styles.host}>dev</span>
          <span className={styles.colon}>:</span>
          <span className={styles.path}>~</span>
          <span className={styles.dollar}>$</span>
          <span className={styles.command}>{currentCommand}</span>
          <span className={styles.cursor} aria-hidden="true">
            ▋
          </span>
        </div>
      </div>
    </div>
  )
}

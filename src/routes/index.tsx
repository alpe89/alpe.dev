import { useState } from 'react';
import { Link, createFileRoute } from '@tanstack/react-router';

import { PromptLine, TerminalHero } from '../components/Terminal';
import { TypedCommand } from '../components/TypedCommand';

export const Route = createFileRoute('/')({
  component: Home,
});

const processes = [
  {
    pid: '001',
    name: 'dad.service',
    cpu: 98,
    uptime: 'since 2026-04-29',
    stat: 'S+ (sleepless)',
  },
  {
    pid: '002',
    name: 'typescript.d',
    cpu: 71,
    uptime: '9 years',
    stat: 'R (running)',
  },
  {
    pid: '003',
    name: 'espresso.io',
    cpu: 64,
    uptime: 'daily',
    stat: 'D (dependent)',
  },
  {
    pid: '004',
    name: 'jvm.curse',
    cpu: 66,
    uptime: 'since Mollie',
    stat: 'W (still warming up)',
  },
  {
    pid: '005',
    name: 'arch.design',
    cpu: 53,
    uptime: 'quarterly',
    stat: 'D (drawing boxes & arrows)',
  },
  {
    pid: '006',
    name: 'shiba.watchdog',
    cpu: 42,
    uptime: '5 years',
    stat: 'S (very good boy)',
  },
  { pid: '007', name: 'sleep', cpu: 4, uptime: 'n/a', stat: 'Z (zombie)' },
];

function Home() {
  const [revealed, setRevealed] = useState(false);

  return (
    <main className="wrap">
      <TerminalHero>
        <PromptLine>
          <TypedCommand command="whoami --verbose" onDone={() => setRevealed(true)} />
        </PromptLine>
        <div className="transition-opacity duration-500" style={{ opacity: revealed ? 1 : 0 }}>
          <div className="flex flex-col-reverse gap-7 sm:flex-row sm:items-start">
            <div className="min-w-0 flex-1">
              <h1 className="page-h1">Alberto Pertusi</h1>
              <div className="role">
                Full Stack Software Engineer <span className="flags">[can lead humans, prefers dogs]</span>
              </div>
              <p className="bio">
                I move money for a living at <span className="hl">Mollie</span>, which means when I break things in
                production, payments stop. No pressure. Full-stack <span className="hl-c">TypeScript</span> enthusiast.
                Yes, that's my whole personality. Based in Milan, fueled by espresso and existential dread.
              </p>
              <p className="bio">
                Married to someone way out of my league. Dad since <span className="hl">April 29th</span>. Proud Shiba
                Inu parent: I like dogs more than humans, which is a completely reasonable opinion once you've met both.
              </p>
              <div className="keys">
                press <kbd>⌘K</kbd> to navigate · <kbd>↑↑↓↓←→←→BA</kbd> if you know, you know
              </div>
            </div>
            <div className="shrink-0 text-center">
              <img
                className="block h-33 w-33 rounded-lg border border-(--border) shadow-[0_0_24px_-6px_var(--glow-soft)]"
                src="/avatar.png"
                alt="Alberto Pertusi, Matrix-style"
                width={132}
                height={132}
              />
              <span className="mt-2 block text-[11px] text-(--muted)">$ imgcat ./me.png</span>
            </div>
          </div>
        </div>
      </TerminalHero>

      <section className="section" id="proc">
        <h2 className="section-h">htop :: life processes</h2>
        <table className="proc-table">
          <thead>
            <tr>
              <th>pid</th>
              <th>process</th>
              <th>cpu</th>
              <th>uptime</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody>
            {processes.map((p) => (
              <tr key={p.pid}>
                <td className="pid">{p.pid}</td>
                <td className="pname">{p.name}</td>
                <td>
                  <span className="bar">
                    <i style={{ width: `${p.cpu}%` }} />
                  </span>
                  <span className="cpu">{p.cpu}%</span>
                </td>
                <td>{p.uptime}</td>
                <td className="stat">{p.stat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="section" id="blog">
        <h2 className="section-h">tail -f ./blog</h2>
        <p className="bio">
          Blog rebooted. Old posts archived, new ones compiling. In the meantime,{' '}
          <Link to="/blog" className="hl-c">
            ./blog
          </Link>{' '}
          serves fresh nerd quotes while you wait.
        </p>
        <Link to="/blog" className="more">
          watch ./blog
        </Link>
      </section>

      <section className="section" id="connect">
        <h2 className="section-h">connect</h2>
        <div className="connect">
          <a className="conn" href="https://github.com/alpe89" target="_blank" rel="noreferrer">
            <span className="cmd-line">gh repo view</span>
            <span className="out">github.com/alpe89</span>
          </a>
          <a className="conn" href="https://www.linkedin.com/in/albertopertusi/" target="_blank" rel="noreferrer">
            <span className="cmd-line">open --professional</span>
            <span className="out">linkedin/albertopertusi</span>
          </a>
          <Link className="conn" to="/contacts">
            <span className="cmd-line">curl -X POST /contact</span>
            <span className="out">say hello →</span>
          </Link>
        </div>
      </section>
    </main>
  );
}

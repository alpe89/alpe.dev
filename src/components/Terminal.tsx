import type { ReactNode } from 'react';

interface TerminalWindowProps {
  path?: string;
  children: ReactNode;
}

export function TerminalWindow({ path = '~', children }: TerminalWindowProps) {
  return (
    <div className="term">
      <div className="term-bar">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
        <span className="title">alpe@dev: {path}</span>
      </div>
      <div className="term-body">{children}</div>
    </div>
  );
}

export function TerminalHero({ path, children }: TerminalWindowProps) {
  return (
    <header className="pt-32 pb-20">
      <TerminalWindow path={path}>{children}</TerminalWindow>
    </header>
  );
}

interface PromptLineProps {
  path?: string;
  className?: string;
  children: ReactNode;
}

export function PromptLine({ path = '~', className, children }: PromptLineProps) {
  return (
    <div className={className ? `prompt-line ${className}` : 'prompt-line'}>
      <span className="u">alpe@dev</span>:{path}$ {children}
    </div>
  );
}

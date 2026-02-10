import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="gradient-text" style={{ marginBottom: 'var(--space-lg)' }}>
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2
        style={{
          marginTop: 'var(--space-xl)',
          marginBottom: 'var(--space-md)',
        }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        style={{
          marginTop: 'var(--space-lg)',
          marginBottom: 'var(--space-sm)',
        }}
      >
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p
        style={{
          marginBottom: 'var(--space-md)',
          lineHeight: 'var(--leading-relaxed)',
        }}
      >
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul
        style={{
          marginBottom: 'var(--space-md)',
          paddingLeft: 'var(--space-lg)',
        }}
      >
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol
        style={{
          marginBottom: 'var(--space-md)',
          paddingLeft: 'var(--space-lg)',
        }}
      >
        {children}
      </ol>
    ),
    li: ({ children }) => <li style={{ marginBottom: 'var(--space-xs)' }}>{children}</li>,
    blockquote: ({ children }) => (
      <blockquote
        style={{
          borderLeft: '3px solid var(--color-neon-cyan)',
          paddingLeft: 'var(--space-md)',
          marginBottom: 'var(--space-md)',
          fontStyle: 'italic',
          color: 'var(--color-text-secondary)',
        }}
      >
        {children}
      </blockquote>
    ),
    table: ({ children }) => (
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginBottom: 'var(--space-md)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
        }}
      >
        {children}
      </table>
    ),
    th: ({ children }) => (
      <th
        style={{
          border: '1px solid rgba(255, 255, 255, 0.12)',
          padding: 'var(--space-sm) var(--space-md)',
          textAlign: 'left',
        }}
      >
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td
        style={{
          border: '1px solid rgba(255, 255, 255, 0.12)',
          padding: 'var(--space-sm) var(--space-md)',
        }}
      >
        {children}
      </td>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
    ...components,
  };
}

import { ImageResponse } from 'next/og';
import { getPostBySlug } from '@/lib/mdx/utils';

export const alt = 'Blog post preview';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  const title = post?.title ?? 'Blog Post';
  const tags = post?.tags ?? [];
  const date = post
    ? new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '60px',
        background: 'linear-gradient(135deg, #0a0a0f 0%, #12121a 50%, #1a1a25 100%)',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div
          style={{
            fontSize: '20px',
            color: '#ff6b35',
            fontWeight: 600,
            letterSpacing: '0.05em',
            textTransform: 'uppercase' as const,
          }}
        >
          alpe.dev/blog
        </div>
        <div
          style={{
            fontSize: title.length > 60 ? '42px' : '56px',
            fontWeight: 700,
            lineHeight: 1.2,
            background: 'linear-gradient(135deg, #ffaa00 0%, #ff6b35 50%, #ff3366 100%)',
            backgroundClip: 'text',
            color: 'transparent',
            maxWidth: '900px',
          }}
        >
          {title}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <div style={{ display: 'flex', gap: '12px' }}>
          {tags.slice(0, 4).map((tag) => (
            <div
              key={tag}
              style={{
                padding: '8px 16px',
                background: 'rgba(255, 107, 53, 0.15)',
                borderRadius: '6px',
                fontSize: '16px',
                color: '#ff6b35',
                border: '1px solid rgba(255, 107, 53, 0.3)',
              }}
            >
              {tag}
            </div>
          ))}
        </div>
        <div style={{ fontSize: '18px', color: '#71717a' }}>{date}</div>
      </div>
    </div>,
    { ...size }
  );
}

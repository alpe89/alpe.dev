import Link from 'next/link';
import { getAllPosts, formatDate } from '@/lib/mdx/utils';
import { LinkButton } from '@/components/ui/Button';
import styles from './blog.module.css';

export const metadata = {
  title: 'Blog | Alberto Pertusi',
  description: 'Thoughts on TypeScript, React, and occasionally complaining about things.',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className={styles.blog}>
      <header className={styles.header}>
        <Link href="/" className={styles.backLink}>
          ← Back to Home
        </Link>
        <h1 className={styles.title}>
          The <span className="gradient-text">Blog</span>
        </h1>
        <p className={styles.subtitle}>Where I pretend to have interesting thoughts</p>
      </header>

      {posts.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>🤔</div>
          <h2 className={styles.emptyTitle}>Nothing here yet</h2>
          <p className={styles.emptyText}>
            I&apos;m still working up the courage to share my opinions with the internet.
            <br />
            This is either a sign of wisdom or procrastination. Probably both.
          </p>
          <LinkButton href="/" variant="secondary">
            Back to Safety
          </LinkButton>
        </div>
      ) : (
        <div className={styles.posts}>
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.post}>
              <div className={styles.postMeta}>
                <time className={styles.postDate}>{formatDate(post.date)}</time>
                {post.tags && post.tags.length > 0 && (
                  <div className={styles.postTags}>
                    {post.tags.map((tag) => (
                      <span key={tag} className={styles.postTag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <h2 className={styles.postTitle}>{post.title}</h2>
              <p className={styles.postDescription}>{post.description}</p>
              <span className={styles.readMore}>Read more →</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

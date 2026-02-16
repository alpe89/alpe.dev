import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug, getPostSlugs, formatDate } from '@/lib/mdx/utils';
import { ShareButtons } from '@/components/ui/ShareButtons';
import styles from './post.module.css';

type PostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found | Alberto Pertusi',
    };
  }

  return {
    title: `${post.title} | Alberto Pertusi`,
    description: post.description,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post || !post.published) {
    notFound();
  }

  // Dynamically import the MDX file
  let Content;
  try {
    const mdxModule = await import(`@/content/posts/${slug}.mdx`);
    Content = mdxModule.default;
  } catch {
    notFound();
  }

  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <Link href="/blog" className={styles.backLink}>
          ← Back to Blog
        </Link>
        <div className={styles.meta}>
          <time className={styles.date}>{formatDate(post.date)}</time>
          <span className={styles.readingTime}>{post.readingTime} min read</span>
          {post.tags && post.tags.length > 0 && (
            <div className={styles.tags}>
              {post.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.description}>{post.description}</p>
      </header>

      <div className={styles.content}>
        <Content />
      </div>

      <footer className={styles.footer}>
        <ShareButtons url={`https://alpe.dev/blog/${slug}`} title={post.title} />
        <p className={styles.footerText}>Thanks for reading! If you made it this far, you deserve a coffee. ☕</p>
        <Link href="/blog" className={styles.footerLink}>
          ← More posts
        </Link>
      </footer>
    </article>
  );
}

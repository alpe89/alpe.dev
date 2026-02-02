import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/mdx/utils";
import { LinkButton } from "@/components/ui/Button";
import styles from "./BlogPreview.module.css";

export function BlogPreview() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <section className={styles.blogPreview} aria-label="Blog preview">
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>
            From the <span className="gradient-text">Blog</span>
          </h2>
          <p className={styles.subtitle}>
            Occasional thoughts, mostly complaints
          </p>
        </header>

        {posts.length === 0 ? (
          <div className={styles.comingSoon}>
            <div className={styles.comingSoonIcon}>📝</div>
            <h3 className={styles.comingSoonTitle}>Coming Soon</h3>
            <p className={styles.comingSoonText}>
              I&apos;m still thinking of something profound to write. Or at
              least something marginally interesting. Check back later.
            </p>
          </div>
        ) : (
          <>
            <div className={styles.posts}>
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className={styles.post}
                >
                  <div className={styles.postMeta}>
                    <span className={styles.postDate}>
                      {formatDate(post.date)}
                    </span>
                    {post.tags && post.tags.length > 0 && (
                      <div className={styles.postTags}>
                        {post.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className={styles.postTag}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <h3 className={styles.postTitle}>{post.title}</h3>
                  <p className={styles.postDescription}>{post.description}</p>
                </Link>
              ))}
            </div>
            <div className={styles.viewAll}>
              <LinkButton href="/blog" variant="secondary">
                View All Posts
              </LinkButton>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

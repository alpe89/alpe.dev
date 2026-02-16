import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags?: string[];
  published: boolean;
  readingTime: number;
};

export type Post = PostMeta & {
  content: string;
};

const postsDirectory = path.join(process.cwd(), 'src/content/posts');

function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || 'Untitled',
    description: data.description || '',
    date: data.date || new Date().toISOString(),
    tags: data.tags || [],
    published: data.published !== false,
    readingTime: calculateReadingTime(content),
    content,
  };
}

export function getAllPosts(): PostMeta[] {
  const slugs = getPostSlugs();

  return slugs
    .map((slug) => {
      const post = getPostBySlug(slug);
      if (!post || !post.published) return null;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { content, ...meta } = post;
      return meta;
    })
    .filter((post): post is PostMeta => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post, PostFrontmatter, Category } from './types';

const postsDirectory = path.join(process.cwd(), 'content', 'posts');

function calculateReadingTime(content: string): number {
  const charCount = content.replace(/\s/g, '').length;
  const minutes = Math.ceil(charCount / 500);
  return Math.max(1, minutes);
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) return [];

  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((name) => name.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      const frontmatter = data as PostFrontmatter;

      if (!frontmatter.published) return null;

      return {
        slug,
        content,
        readingTime: calculateReadingTime(content),
        ...frontmatter,
      } as Post;
    })
    .filter((post): post is Post => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const frontmatter = data as PostFrontmatter;

  return {
    slug,
    content,
    readingTime: calculateReadingTime(content),
    ...frontmatter,
  };
}

export function getPostsByCategory(category: Category): Post[] {
  return getAllPosts().filter((post) => post.category === category);
}

export function getFeaturedPosts(): Post[] {
  return getAllPosts().filter((post) => post.featured);
}

export function getRelatedPosts(slug: string, limit = 3): Post[] {
  const currentPost = getPostBySlug(slug);
  if (!currentPost) return [];

  return getAllPosts()
    .filter((post) => post.slug !== slug)
    .filter(
      (post) =>
        post.category === currentPost.category ||
        post.tags.some((tag) => currentPost.tags.includes(tag))
    )
    .slice(0, limit);
}

export function getAllCategories(): { name: Category; count: number }[] {
  const posts = getAllPosts();
  const categoryMap = new Map<Category, number>();

  posts.forEach((post) => {
    categoryMap.set(post.category, (categoryMap.get(post.category) || 0) + 1);
  });

  return Array.from(categoryMap.entries()).map(([name, count]) => ({
    name,
    count,
  }));
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagSet = new Set<string>();
  posts.forEach((post) => post.tags.forEach((tag) => tagSet.add(tag)));
  return Array.from(tagSet);
}

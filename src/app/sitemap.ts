import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/posts';
import { SITE_URL, CATEGORIES } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const postUrls = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const categoryUrls = CATEGORIES.map((cat) => ({
    url: `${SITE_URL}/category/${encodeURIComponent(cat.name)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const staticPages = [
    { url: SITE_URL, priority: 1.0, changeFrequency: 'weekly' as const },
    { url: `${SITE_URL}/blog`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${SITE_URL}/about`, priority: 0.5, changeFrequency: 'monthly' as const },
    { url: `${SITE_URL}/contact`, priority: 0.3, changeFrequency: 'yearly' as const },
    { url: `${SITE_URL}/privacy-policy`, priority: 0.2, changeFrequency: 'yearly' as const },
    { url: `${SITE_URL}/terms`, priority: 0.2, changeFrequency: 'yearly' as const },
  ].map((page) => ({ ...page, lastModified: new Date() }));

  return [...staticPages, ...categoryUrls, ...postUrls];
}

import { Metadata } from 'next';
import { getPostsByCategory } from '@/lib/posts';
import { CATEGORIES } from '@/lib/constants';
import { Category } from '@/lib/types';
import PostList from '@/components/blog/PostList';
import Sidebar from '@/components/layout/Sidebar';

export function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ category: cat.name }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const decoded = decodeURIComponent(category);
  return {
    title: `${decoded} - 카테고리`,
    description: `${decoded} 카테고리의 글 목록`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const decoded = decodeURIComponent(category) as Category;
  const posts = getPostsByCategory(decoded);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">{decoded}</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        {CATEGORIES.find((c) => c.name === decoded)?.description || `${decoded} 관련 글`}
      </p>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <PostList posts={posts} />
        </div>
        <div className="w-full lg:w-72 shrink-0">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

import Link from 'next/link';
import { getAllCategories, getAllPosts } from '@/lib/posts';
import { CATEGORIES } from '@/lib/constants';

export default function Sidebar() {
  const categories = getAllCategories();
  const recentPosts = getAllPosts().slice(0, 5);

  return (
    <aside className="space-y-8">
      <div className="bg-gray-50 dark:bg-slate-800/50 rounded-2xl p-6">
        <h3 className="font-bold text-lg mb-4">카테고리</h3>
        <ul className="space-y-2">
          {CATEGORIES.map((cat) => {
            const found = categories.find((c) => c.name === cat.name);
            return (
              <li key={cat.slug}>
                <Link
                  href={`/category/${cat.name}`}
                  className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors py-1"
                >
                  <span>{cat.name}</span>
                  <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                    {found?.count || 0}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="bg-gray-50 dark:bg-slate-800/50 rounded-2xl p-6">
        <h3 className="font-bold text-lg mb-4">최근 글</h3>
        <ul className="space-y-3">
          {recentPosts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="text-sm text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors line-clamp-2 leading-relaxed"
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

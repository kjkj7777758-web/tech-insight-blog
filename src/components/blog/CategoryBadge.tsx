import Link from 'next/link';
import { Category } from '@/lib/types';

const categoryColors: Record<Category, string> = {
  '리뷰': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  '튜토리얼': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  '팁': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  '가이드': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
};

export default function CategoryBadge({ category }: { category: Category }) {
  return (
    <Link
      href={`/category/${category}`}
      className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full ${categoryColors[category]} hover:opacity-80 transition-opacity`}
    >
      {category}
    </Link>
  );
}

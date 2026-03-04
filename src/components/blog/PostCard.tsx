import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Clock } from 'lucide-react';
import { Post } from '@/lib/types';
import CategoryBadge from './CategoryBadge';

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className="group bg-white dark:bg-slate-800/50 rounded-2xl border border-gray-200 dark:border-gray-700/50 overflow-hidden hover:shadow-lg hover:border-primary-300 dark:hover:border-primary-700 transition-all duration-300">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <CategoryBadge category={post.category} />
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {format(new Date(post.date), 'yyyy년 M월 d일', { locale: ko })}
          </span>
        </div>
        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
            {post.title}
          </h2>
        </Link>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3 leading-relaxed">
          {post.description}
        </p>
        <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
          <Clock size={12} />
          <span>{post.readingTime}분 읽기</span>
        </div>
      </div>
    </article>
  );
}

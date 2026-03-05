import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Braces, Binary, Regex } from 'lucide-react';
import { getAllPosts, getFeaturedPosts } from '@/lib/posts';
import { SITE_NAME } from '@/lib/constants';
import PostCard from '@/components/blog/PostCard';
import { WebsiteJsonLd } from '@/components/seo/JsonLd';

export default function HomePage() {
  const allPosts = getAllPosts();
  const featuredPosts = getFeaturedPosts();
  const recentPosts = allPosts.slice(0, 6);

  const heroPost = featuredPosts.length > 0 ? featuredPosts[0] : allPosts[0];

  return (
    <>
      <WebsiteJsonLd />

      <section className="bg-gradient-to-br from-primary-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            {SITE_NAME}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            IT 기술, 제품 리뷰, 프로그래밍 튜토리얼까지.
            <br />
            개발자와 IT 애호가를 위한 기술 블로그입니다.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition-colors"
          >
            블로그 둘러보기
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {heroPost && (
        <section className="max-w-6xl mx-auto px-4 -mt-8">
          <Link
            href={`/blog/${heroPost.slug}`}
            className="group block bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/5 relative aspect-video md:aspect-auto">
                <Image
                  src={heroPost.thumbnail}
                  alt={heroPost.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  priority
                />
              </div>
              <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                <span className="text-xs font-medium text-primary-600 dark:text-primary-400 mb-2 block">
                  추천 글
                </span>
                <h2 className="text-xl md:text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                  {heroPost.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">{heroPost.description}</p>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* 개발자 도구 섹션 */}
      <section className="max-w-6xl mx-auto px-4 pt-16 pb-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">🛠️ 개발자 도구</h2>
          <Link
            href="/tools"
            className="text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1"
          >
            전체 보기
            <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/tools/json-formatter"
            className="group flex items-center gap-4 p-4 bg-white dark:bg-slate-800/50 rounded-xl border border-gray-200 dark:border-gray-700/50 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all"
          >
            <div className="p-2.5 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white shrink-0">
              <Braces size={22} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">JSON 포맷터</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">JSON 정리, 압축, 검증</p>
            </div>
          </Link>
          <Link
            href="/tools/base64"
            className="group flex items-center gap-4 p-4 bg-white dark:bg-slate-800/50 rounded-xl border border-gray-200 dark:border-gray-700/50 hover:shadow-lg hover:border-emerald-300 dark:hover:border-emerald-600 transition-all"
          >
            <div className="p-2.5 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 text-white shrink-0">
              <Binary size={22} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">Base64 변환기</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">인코딩, 디코딩, 파일 변환</p>
            </div>
          </Link>
          <Link
            href="/tools/regex-tester"
            className="group flex items-center gap-4 p-4 bg-white dark:bg-slate-800/50 rounded-xl border border-gray-200 dark:border-gray-700/50 hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-600 transition-all"
          >
            <div className="p-2.5 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white shrink-0">
              <Regex size={22} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">정규식 테스터</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">실시간 매칭, 치환, 프리셋</p>
            </div>
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">최근 글</h2>
          <Link
            href="/blog"
            className="text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1"
          >
            전체 보기
            <ArrowRight size={14} />
          </Link>
        </div>
        {recentPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 py-12">
            곧 새로운 글이 게시됩니다.
          </p>
        )}
      </section>
    </>
  );
}

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Clock, Calendar, ChevronRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/posts';
import { SITE_URL } from '@/lib/constants';
import CategoryBadge from '@/components/blog/CategoryBadge';
import PostCard from '@/components/blog/PostCard';
import AffiliateDisclosure from '@/components/affiliate/AffiliateDisclosure';
import CoupangProductCard from '@/components/affiliate/CoupangProductCard';
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags.join(', '),
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.updatedAt || post.date,
      tags: post.tags,
      locale: 'ko_KR',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
    alternates: {
      canonical: `${SITE_URL}/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const relatedPosts = getRelatedPosts(slug, 3);
  const hasAffiliateProducts =
    post.affiliateProducts && post.affiliateProducts.length > 0;

  return (
    <>
      <ArticleJsonLd post={post} />
      <BreadcrumbJsonLd
        items={[
          { name: '홈', href: '/' },
          { name: post.category, href: `/category/${post.category}` },
          { name: post.title },
        ]}
      />

      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mb-6">
          <Link href="/" className="hover:text-primary-600 dark:hover:text-primary-400">홈</Link>
          <ChevronRight size={14} />
          <Link href={`/category/${post.category}`} className="hover:text-primary-600 dark:hover:text-primary-400">
            {post.category}
          </Link>
          <ChevronRight size={14} />
          <span className="text-gray-700 dark:text-gray-300 truncate">{post.title}</span>
        </nav>

        {/* Thumbnail */}
        <div className="relative aspect-video rounded-2xl overflow-hidden mb-8">
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 896px) 100vw, 896px"
            priority
          />
        </div>

        {/* Header */}
        <header className="mb-8">
          <CategoryBadge category={post.category} />
          <h1 className="text-3xl md:text-4xl font-bold mt-3 mb-4 text-gray-900 dark:text-gray-100 leading-tight">
            {post.title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">{post.description}</p>
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {format(new Date(post.date), 'yyyy년 M월 d일', { locale: ko })}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {post.readingTime}분 읽기
            </span>
          </div>
        </header>

        {hasAffiliateProducts && <AffiliateDisclosure />}

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-a:text-primary-600 dark:prose-a:text-primary-400">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

        {/* Affiliate Products */}
        {hasAffiliateProducts && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">추천 제품</h2>
            {post.affiliateProducts!.map((product, idx) => (
              <CoupangProductCard key={idx} product={product} />
            ))}
          </section>
        )}

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-3 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-6">관련 글</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rp) => (
                <PostCard key={rp.slug} post={rp} />
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}

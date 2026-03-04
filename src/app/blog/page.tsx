import { Metadata } from 'next';
import { getAllPosts } from '@/lib/posts';
import { POSTS_PER_PAGE } from '@/lib/constants';
import PostList from '@/components/blog/PostList';
import Pagination from '@/components/blog/Pagination';
import Sidebar from '@/components/layout/Sidebar';

export const metadata: Metadata = {
  title: '블로그',
  description: 'IT 기술, 제품 리뷰, 프로그래밍 튜토리얼 글 목록',
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const allPosts = getAllPosts();
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const posts = allPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">블로그</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <PostList posts={posts} />
          <Pagination currentPage={currentPage} totalPages={totalPages} basePath="/blog" />
        </div>
        <div className="w-full lg:w-72 shrink-0">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

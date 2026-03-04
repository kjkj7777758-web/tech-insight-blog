export const SITE_NAME = '테크인사이트';
export const SITE_DESCRIPTION = 'IT 기술, 제품 리뷰, 프로그래밍 튜토리얼을 다루는 기술 블로그';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://tech-blog-rho-virid.vercel.app';
export const AUTHOR_NAME = '테크인사이트 운영자';

export const CATEGORIES = [
  { name: '리뷰' as const, slug: 'review', description: 'IT 제품 리뷰 및 추천' },
  { name: '튜토리얼' as const, slug: 'tutorial', description: '프로그래밍 및 개발 튜토리얼' },
  { name: '팁' as const, slug: 'tip', description: 'IT 생산성 팁과 트릭' },
  { name: '가이드' as const, slug: 'guide', description: '입문 가이드 및 기술 소식' },
] as const;

export const POSTS_PER_PAGE = 9;

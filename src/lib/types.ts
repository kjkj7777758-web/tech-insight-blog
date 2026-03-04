export type Category = '리뷰' | '튜토리얼' | '팁' | '가이드';

export interface AffiliateProduct {
  name: string;
  coupangUrl: string;
  price?: string;
  description?: string;
}

export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  updatedAt?: string;
  category: Category;
  tags: string[];
  thumbnail: string;
  author: string;
  published: boolean;
  featured?: boolean;
  affiliateProducts?: AffiliateProduct[];
}

export interface Post extends PostFrontmatter {
  slug: string;
  content: string;
  readingTime: number;
}

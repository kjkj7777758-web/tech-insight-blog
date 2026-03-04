import Link from 'next/link';
import { SITE_NAME } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-slate-900 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold text-primary-600 dark:text-primary-400 mb-3">
              {SITE_NAME}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              IT 기술, 제품 리뷰, 프로그래밍 튜토리얼을 다루는 기술 블로그입니다.
              최신 기술 트렌드와 유용한 정보를 공유합니다.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">카테고리</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/category/리뷰" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">리뷰</Link></li>
              <li><Link href="/category/튜토리얼" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">튜토리얼</Link></li>
              <li><Link href="/category/팁" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">팁</Link></li>
              <li><Link href="/category/가이드" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">가이드</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">정보</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">블로그 소개</Link></li>
              <li><Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">문의하기</Link></li>
              <li><Link href="/privacy-policy" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">개인정보처리방침</Link></li>
              <li><Link href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">이용약관</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
          <p className="text-xs text-gray-500 dark:text-gray-500 mb-2">
            이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-600">
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

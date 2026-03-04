import { Metadata } from 'next';
import { Mail } from 'lucide-react';
import { SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: '문의하기',
  description: `${SITE_NAME}에 문의하기. 블로그 관련 문의, 제안, 협업 요청을 보내주세요.`,
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">문의하기</h1>

      <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
        <p>
          {SITE_NAME}에 관심을 가져주셔서 감사합니다. 블로그에 대한 문의, 제안, 오류 신고,
          협업 요청 등 어떤 내용이든 편하게 연락해 주세요.
        </p>
      </div>

      <div className="bg-gray-50 dark:bg-slate-800/50 rounded-2xl p-8 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
            <Mail size={20} className="text-primary-600 dark:text-primary-400" />
          </div>
          <div>
            <h2 className="font-bold text-lg">이메일 문의</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              보통 1~3일 이내에 답변드립니다
            </p>
          </div>
        </div>
        <a
          href="mailto:contact@techinsight.kr"
          className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
        >
          contact@techinsight.kr
        </a>
      </div>

      <form className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            이름
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
            placeholder="이름을 입력해 주세요"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            이메일
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
            placeholder="이메일을 입력해 주세요"
          />
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-medium mb-2">
            제목
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
            placeholder="문의 제목을 입력해 주세요"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            내용
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all resize-y"
            placeholder="문의 내용을 작성해 주세요"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition-colors"
        >
          문의 보내기
        </button>
      </form>
    </div>
  );
}

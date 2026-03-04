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

      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/30 rounded-xl text-sm text-blue-800 dark:text-blue-300 mb-6">
        <p>현재 문의는 이메일로만 접수하고 있습니다. 위 이메일 주소로 직접 연락해 주세요.</p>
      </div>
    </div>
  );
}

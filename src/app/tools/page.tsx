import { Metadata } from 'next';
import Link from 'next/link';
import { Braces, Binary, Regex, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: '개발자 도구 모음 - 온라인 무료 개발 도구',
  description: 'JSON 포맷터, Base64 변환기, 정규표현식 테스터 등 개발자를 위한 무료 온라인 도구 모음. 설치 없이 브라우저에서 바로 사용하세요.',
  keywords: ['개발자 도구', 'JSON 포맷터', 'Base64 변환', '정규표현식 테스터', '온라인 개발 도구', '프로그래밍 도구'],
};

const tools = [
  {
    href: '/tools/json-formatter',
    icon: Braces,
    title: 'JSON 포맷터',
    description: 'JSON 데이터를 보기 좋게 정리하고, 압축하고, 문법 오류를 실시간으로 검증합니다.',
    tags: ['포맷팅', '압축', '검증'],
    gradient: 'from-blue-500 to-cyan-500',
    bgLight: 'bg-blue-50 dark:bg-blue-950/30',
  },
  {
    href: '/tools/base64',
    icon: Binary,
    title: 'Base64 인코더/디코더',
    description: '텍스트와 파일을 Base64로 인코딩하거나, Base64 문자열을 원본으로 디코딩합니다.',
    tags: ['인코딩', '디코딩', '파일 변환'],
    gradient: 'from-emerald-500 to-teal-500',
    bgLight: 'bg-emerald-50 dark:bg-emerald-950/30',
  },
  {
    href: '/tools/regex-tester',
    icon: Regex,
    title: '정규표현식 테스터',
    description: '정규식 패턴을 실시간으로 테스트하고, 매칭 결과를 시각적으로 확인합니다.',
    tags: ['실시간 매칭', '치환', '프리셋'],
    gradient: 'from-purple-500 to-pink-500',
    bgLight: 'bg-purple-50 dark:bg-purple-950/30',
  },
];

export default function ToolsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <span className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium mb-4">
            개발자 도구
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            🛠️ 무료 온라인 개발 도구
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            설치 없이 브라우저에서 바로 사용할 수 있는 개발자 필수 도구 모음.
            <br />
            모든 데이터는 브라우저에서만 처리되어 안전합니다.
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="max-w-6xl mx-auto px-4 py-12 -mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.href}
                href={tool.href}
                className="group block bg-white dark:bg-slate-800/50 rounded-2xl border border-gray-200 dark:border-gray-700/50 overflow-hidden hover:shadow-xl hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-300"
              >
                <div className={`p-6 ${tool.bgLight}`}>
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${tool.gradient} text-white mb-4`}>
                    <Icon size={28} />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {tool.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {tool.description}
                  </p>
                </div>
                <div className="px-6 py-4 flex items-center justify-between border-t border-gray-100 dark:border-gray-700/50">
                  <div className="flex gap-2">
                    {tool.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400 text-xs rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <ArrowRight size={16} className="text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Info Section */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <div className="bg-gray-50 dark:bg-slate-800/30 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
            🔒 개인정보 보호
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            모든 도구는 브라우저에서 직접 실행됩니다.
            입력하신 데이터는 서버로 전송되지 않으며, 완전히 클라이언트 사이드에서 처리됩니다.
          </p>
        </div>
      </section>
    </>
  );
}

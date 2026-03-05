import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Braces, BookOpen, Wrench } from 'lucide-react';
import JsonFormatter from './JsonFormatter';
import { SITE_NAME, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'JSON 포맷터 - JSON 정리 및 검증 도구',
  description: '온라인 JSON 포맷터 & 검증기. JSON 데이터를 보기 좋게 정리하고, 문법 오류를 실시간으로 확인하세요. 개발자 필수 도구.',
  keywords: ['JSON 포맷터', 'JSON formatter', 'JSON 정리', 'JSON 검증', 'JSON validator', 'JSON beautifier', 'JSON minify', '개발자 도구'],
  openGraph: {
    title: `JSON 포맷터 - JSON 정리 및 검증 도구 | ${SITE_NAME}`,
    description: '온라인 JSON 포맷터 & 검증기. JSON 데이터를 보기 좋게 정리하고, 문법 오류를 실시간으로 확인하세요.',
    url: `${SITE_URL}/tools/json-formatter`,
    type: 'website',
  },
  alternates: {
    canonical: `${SITE_URL}/tools/json-formatter`,
  },
};

export default function JsonFormatterPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium rounded-full mb-4">
            <Braces size={14} />
            개발자 도구
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900 dark:text-white">
            JSON 포맷터 & 검증기
          </h1>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            JSON 데이터를 보기 좋게 정리하고, 실시간으로 문법 오류를 확인하세요.
            <br className="hidden sm:block" />
            들여쓰기 설정, 압축, 구문 강조까지 한 번에 처리합니다.
          </p>
        </div>
      </section>

      {/* Tool Section */}
      <section className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <JsonFormatter />
      </section>

      {/* SEO Content Section */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <div className="prose prose-lg dark:prose-invert max-w-none">

          {/* What is JSON */}
          <h2 id="what-is-json">JSON이란 무엇인가?</h2>
          <p>
            JSON(JavaScript Object Notation)은 데이터를 저장하고 전송하기 위한 경량 텍스트 기반 형식입니다.
            사람이 읽고 쓰기 쉬우며 기계가 분석하고 생성하기에도 용이하여, 오늘날 웹 개발에서
            가장 널리 사용되는 데이터 교환 형식입니다.
          </p>
          <p>
            JSON은 원래 JavaScript에서 파생되었지만, 언어에 독립적인 형식으로 Python, Java, Go, PHP 등
            거의 모든 프로그래밍 언어에서 지원됩니다. REST API 응답, 설정 파일, 데이터베이스 문서 등
            다양한 용도로 활용됩니다.
          </p>

          {/* How to Use */}
          <h2 id="how-to-use">JSON 포맷터 사용법</h2>
          <p>이 도구를 사용하면 JSON 데이터를 간편하게 정리하고 검증할 수 있습니다.</p>
          <ol>
            <li>
              <strong>JSON 입력</strong>: 왼쪽 입력 영역에 JSON 데이터를 붙여넣거나 직접 입력합니다.
              입력 즉시 실시간으로 문법 검증이 이루어집니다.
            </li>
            <li>
              <strong>포맷팅</strong>: &quot;포맷팅&quot; 버튼을 클릭하거나 <kbd>Ctrl</kbd>+<kbd>Enter</kbd>를
              눌러 JSON을 보기 좋게 정리합니다. 들여쓰기 크기(2칸, 4칸, 탭)를 선택할 수 있습니다.
            </li>
            <li>
              <strong>압축</strong>: &quot;압축&quot; 버튼으로 불필요한 공백을 제거하여 데이터 크기를 최소화합니다.
              API 요청이나 데이터 저장 시 유용합니다.
            </li>
            <li>
              <strong>복사</strong>: &quot;복사&quot; 버튼으로 포맷된 결과를 클립보드에 복사합니다.
            </li>
          </ol>
          <p>
            포맷팅 결과에는 구문 강조가 적용되어 키(파란색), 문자열(주황색), 숫자(초록색),
            불리언(보라색), null(빨간색)을 시각적으로 구분할 수 있습니다. 또한 키 개수, 중첩 깊이,
            데이터 크기 등의 분석 정보를 함께 확인할 수 있습니다.
          </p>

          {/* JSON Syntax Rules */}
          <h2 id="json-syntax">JSON 문법 규칙</h2>
          <p>올바른 JSON 데이터를 작성하려면 다음 규칙을 준수해야 합니다.</p>

          <h3>기본 데이터 타입</h3>
          <ul>
            <li><strong>문자열(String)</strong>: 반드시 큰따옴표(<code>&quot;</code>)로 감싸야 합니다. 작은따옴표는 허용되지 않습니다.</li>
            <li><strong>숫자(Number)</strong>: 정수 또는 부동소수점 숫자를 사용합니다. <code>NaN</code>이나 <code>Infinity</code>는 허용되지 않습니다.</li>
            <li><strong>불리언(Boolean)</strong>: <code>true</code> 또는 <code>false</code>만 사용합니다 (소문자).</li>
            <li><strong>Null</strong>: <code>null</code>만 사용합니다 (소문자).</li>
            <li><strong>배열(Array)</strong>: 대괄호(<code>[]</code>)로 감싸며, 값은 쉼표로 구분합니다.</li>
            <li><strong>객체(Object)</strong>: 중괄호(<code>{'{}'}</code>)로 감싸며, 키-값 쌍으로 구성됩니다.</li>
          </ul>

          <h3>올바른 JSON 예시</h3>
          <pre><code>{`{
  "name": "홍길동",
  "age": 30,
  "isStudent": false,
  "address": {
    "city": "서울",
    "zipCode": "06000"
  },
  "hobbies": ["독서", "프로그래밍", "여행"],
  "score": null
}`}</code></pre>

          <h3>주의 사항</h3>
          <ul>
            <li>객체의 키는 반드시 큰따옴표로 감싸야 합니다.</li>
            <li>마지막 항목 뒤에 쉼표(trailing comma)를 붙이면 안 됩니다.</li>
            <li>주석(comment)은 허용되지 않습니다.</li>
            <li>최상위 레벨은 객체(<code>{'{}'}</code>) 또는 배열(<code>[]</code>), 기본 타입 모두 가능합니다.</li>
          </ul>

          {/* Common Errors */}
          <h2 id="common-errors">자주 발생하는 JSON 오류</h2>

          <h3>1. 작은따옴표 사용</h3>
          <p>
            JavaScript에서는 작은따옴표를 사용할 수 있지만, JSON 표준에서는 큰따옴표만 허용됩니다.
          </p>
          <pre><code>{`// 잘못된 예시
{'name': '홍길동'}

// 올바른 예시
{"name": "홍길동"}`}</code></pre>

          <h3>2. 마지막 쉼표(Trailing Comma)</h3>
          <p>
            배열이나 객체의 마지막 항목 뒤에 쉼표를 붙이면 파싱 오류가 발생합니다.
          </p>
          <pre><code>{`// 잘못된 예시
{"items": ["a", "b", "c",]}

// 올바른 예시
{"items": ["a", "b", "c"]}`}</code></pre>

          <h3>3. 키에 따옴표 누락</h3>
          <p>
            JSON 객체의 모든 키는 큰따옴표로 감싸야 합니다.
          </p>
          <pre><code>{`// 잘못된 예시
{name: "홍길동"}

// 올바른 예시
{"name": "홍길동"}`}</code></pre>

          <h3>4. 잘못된 이스케이프 문자</h3>
          <p>
            문자열 내에서 특수 문자를 사용하려면 올바른 이스케이프 시퀀스를 사용해야 합니다.
            허용되는 이스케이프 문자는 <code>\&quot;</code>, <code>\\</code>, <code>\/</code>, <code>\b</code>, <code>\f</code>, <code>\n</code>, <code>\r</code>, <code>\t</code>, <code>\uXXXX</code>입니다.
          </p>

          {/* FAQ */}
          <h2 id="faq">자주 묻는 질문 (FAQ)</h2>

          <h3>JSON과 JavaScript 객체의 차이점은 무엇인가요?</h3>
          <p>
            JSON은 JavaScript 객체 표기법에서 파생되었지만 엄격한 규칙이 적용됩니다.
            JSON에서는 키를 반드시 큰따옴표로 감싸야 하며, 함수나 <code>undefined</code>는
            사용할 수 없습니다. 또한 주석도 허용되지 않습니다. JavaScript 객체는
            이러한 제약 없이 더 자유롭게 사용할 수 있습니다.
          </p>

          <h3>JSON 파일의 최대 크기 제한이 있나요?</h3>
          <p>
            JSON 표준 자체에는 크기 제한이 없지만, 이 온라인 도구는 브라우저 메모리 내에서
            동작하므로 수백 MB 이상의 파일은 처리 속도가 느려질 수 있습니다. 일반적인
            API 응답이나 설정 파일 수준의 데이터는 문제없이 처리됩니다.
          </p>

          <h3>입력한 JSON 데이터가 서버로 전송되나요?</h3>
          <p>
            아닙니다. 이 도구는 모든 처리를 브라우저 내에서 수행합니다. 입력한 JSON 데이터는
            서버로 전송되거나 저장되지 않으므로, 민감한 데이터도 안심하고 사용할 수 있습니다.
          </p>

          <h3>JSON과 XML 중 어떤 것을 사용해야 하나요?</h3>
          <p>
            JSON은 XML보다 가볍고 파싱이 빠르며, 현대 웹 개발에서 사실상 표준으로 사용됩니다.
            REST API 개발, 프론트엔드-백엔드 통신, 설정 파일에는 JSON이 적합합니다.
            XML은 문서 마크업이나 기존 엔터프라이즈 시스템과의 호환이 필요한 경우에 사용됩니다.
          </p>
        </div>

        {/* Internal Links */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700/50">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">관련 콘텐츠</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/blog"
              className="group flex items-start gap-3 p-4 bg-white dark:bg-slate-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-md transition-all"
            >
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-lg">
                <BookOpen size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  기술 블로그
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  프로그래밍 튜토리얼과 IT 기술 관련 글을 확인하세요
                </p>
              </div>
              <ArrowRight size={16} className="flex-shrink-0 text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors mt-0.5" />
            </Link>

            <Link
              href="/category/튜토리얼"
              className="group flex items-start gap-3 p-4 bg-white dark:bg-slate-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-md transition-all"
            >
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg">
                <Wrench size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  튜토리얼
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  개발 가이드와 실전 코딩 튜토리얼을 만나보세요
                </p>
              </div>
              <ArrowRight size={16} className="flex-shrink-0 text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors mt-0.5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

import { Metadata } from 'next';
import Link from 'next/link';
import Base64Converter from './Base64Converter';

export const metadata: Metadata = {
  title: 'Base64 인코더/디코더 - 온라인 Base64 변환 도구',
  description:
    '온라인 Base64 인코딩 & 디코딩 도구. 텍스트, 파일을 Base64로 변환하거나 Base64 문자열을 원본으로 복원하세요. 한글(UTF-8) 완벽 지원.',
  keywords: [
    'Base64 인코딩',
    'Base64 디코딩',
    'Base64 변환',
    'Base64 encoder',
    'Base64 decoder',
    'Base64 온라인',
    '개발자 도구',
    'Base64 한글',
    'Base64 파일 변환',
  ],
  openGraph: {
    title: 'Base64 인코더/디코더 - 온라인 변환 도구 | 테크인사이트',
    description:
      '온라인 Base64 인코딩 & 디코딩 도구. 텍스트, 파일을 Base64로 변환하세요. 한글(UTF-8) 완벽 지원.',
  },
};

export default function Base64ToolPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-[#2563eb] dark:text-blue-300 text-xs font-medium mb-4">
            개발자 도구
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900 dark:text-white">
            Base64 인코더 / 디코더
          </h1>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            텍스트와 파일을 Base64로 인코딩하거나, Base64 문자열을 원본으로 디코딩하세요.
            <br className="hidden md:block" />
            한글(UTF-8)을 완벽하게 지원하며, 모든 처리는 브라우저에서 수행됩니다.
          </p>
        </div>
      </section>

      {/* Tool Section */}
      <section className="max-w-4xl mx-auto px-4 -mt-6 relative z-10 mb-16">
        <div className="bg-white dark:bg-slate-900/80 rounded-2xl border border-gray-200 dark:border-gray-700/50 shadow-lg p-6 md:p-8">
          <Base64Converter />
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {/* Base64란 무엇인가? */}
          <h2>Base64란 무엇인가?</h2>
          <p>
            Base64는 바이너리 데이터를 ASCII 문자열로 변환하는 인코딩 방식입니다. 원래 이메일과
            같이 텍스트만 전송할 수 있는 환경에서 바이너리 데이터(이미지, 파일 등)를 안전하게
            전달하기 위해 만들어졌습니다.
          </p>
          <p>
            &quot;Base64&quot;라는 이름은 64개의 문자를 사용하여 데이터를 표현하기 때문에
            붙여졌습니다. 6비트(2^6 = 64)의 데이터를 하나의 문자로 표현하며, 원본 데이터보다
            약 33% 크기가 증가하는 특징이 있습니다.
          </p>

          {/* 인코딩 원리 */}
          <h2>Base64 인코딩 원리</h2>
          <p>
            Base64는 다음 64개의 문자를 사용하여 데이터를 표현합니다:
          </p>
          <ul>
            <li>
              <strong>대문자 알파벳:</strong> A-Z (인덱스 0-25)
            </li>
            <li>
              <strong>소문자 알파벳:</strong> a-z (인덱스 26-51)
            </li>
            <li>
              <strong>숫자:</strong> 0-9 (인덱스 52-61)
            </li>
            <li>
              <strong>특수 문자:</strong> + (인덱스 62), / (인덱스 63)
            </li>
            <li>
              <strong>패딩 문자:</strong> = (데이터 길이를 3의 배수로 맞추기 위해 사용)
            </li>
          </ul>
          <p>
            인코딩 과정은 다음과 같습니다. 원본 데이터를 3바이트(24비트)씩 묶고, 이를
            6비트씩 4개의 그룹으로 나눕니다. 각 6비트 값은 위의 문자표에서 대응하는 문자로
            변환됩니다. 원본 데이터가 3바이트 단위로 나누어떨어지지 않으면 패딩 문자
            <code>=</code>를 추가합니다.
          </p>
          <p>
            예를 들어, <code>Hello</code>를 Base64로 인코딩하면 <code>SGVsbG8=</code>가 됩니다.
          </p>

          {/* 활용 사례 */}
          <h2>Base64 활용 사례</h2>
          <p>Base64 인코딩은 웹 개발과 IT 분야에서 다양하게 활용됩니다:</p>

          <h3>이메일 (MIME)</h3>
          <p>
            이메일의 MIME 표준에서 첨부 파일이나 비ASCII 텍스트를 전송할 때 Base64 인코딩을
            사용합니다. 이메일 프로토콜(SMTP)은 원래 7비트 ASCII만 지원하기 때문에, 이미지나
            문서 등을 Base64로 변환하여 전송합니다.
          </p>

          <h3>데이터 URI (Data URL)</h3>
          <p>
            HTML과 CSS에서 이미지나 폰트 등의 리소스를 외부 파일로 분리하지 않고 문서 안에
            직접 임베딩할 수 있습니다. <code>data:image/png;base64,iVBOR...</code> 형식으로
            사용되며, 작은 아이콘이나 배경 이미지를 인라인으로 포함할 때 유용합니다.
          </p>

          <h3>JWT (JSON Web Token)</h3>
          <p>
            JWT는 헤더, 페이로드, 서명 세 부분으로 구성되며, 각 부분은 Base64URL 인코딩으로
            표현됩니다. Base64URL은 표준 Base64에서 <code>+</code>를 <code>-</code>로,{' '}
            <code>/</code>를 <code>_</code>로 대체한 변형입니다. 웹 인증 및 정보 교환에
            널리 사용됩니다.
          </p>

          <h3>API 인증 (HTTP Basic Auth)</h3>
          <p>
            HTTP 기본 인증에서 사용자 이름과 비밀번호를 <code>username:password</code> 형태로
            결합한 뒤 Base64로 인코딩하여 <code>Authorization</code> 헤더에 포함시킵니다.
            주의할 점은 Base64는 암호화가 아니라 단순 인코딩이므로, 반드시 HTTPS와 함께
            사용해야 합니다.
          </p>

          {/* Base64 vs URL 인코딩 */}
          <h2>Base64 vs URL 인코딩 차이점</h2>
          <p>
            Base64 인코딩과 URL 인코딩(퍼센트 인코딩)은 목적과 방식이 다릅니다:
          </p>

          <div className="overflow-x-auto not-prose my-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-slate-800/80">
                  <th className="border border-gray-200 dark:border-gray-700/50 px-4 py-3 text-left font-semibold text-gray-900 dark:text-gray-100">
                    구분
                  </th>
                  <th className="border border-gray-200 dark:border-gray-700/50 px-4 py-3 text-left font-semibold text-gray-900 dark:text-gray-100">
                    Base64
                  </th>
                  <th className="border border-gray-200 dark:border-gray-700/50 px-4 py-3 text-left font-semibold text-gray-900 dark:text-gray-100">
                    URL 인코딩
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 dark:border-gray-700/50 px-4 py-3 text-gray-700 dark:text-gray-300 font-medium">
                    목적
                  </td>
                  <td className="border border-gray-200 dark:border-gray-700/50 px-4 py-3 text-gray-600 dark:text-gray-400">
                    바이너리 데이터를 텍스트로 변환
                  </td>
                  <td className="border border-gray-200 dark:border-gray-700/50 px-4 py-3 text-gray-600 dark:text-gray-400">
                    URL에서 특수 문자를 안전하게 표현
                  </td>
                </tr>
                <tr className="bg-gray-50/50 dark:bg-slate-800/30">
                  <td className="border border-gray-200 dark:border-gray-700/50 px-4 py-3 text-gray-700 dark:text-gray-300 font-medium">
                    사용 문자
                  </td>
                  <td className="border border-gray-200 dark:border-gray-700/50 px-4 py-3 text-gray-600 dark:text-gray-400">
                    A-Z, a-z, 0-9, +, /, =
                  </td>
                  <td className="border border-gray-200 dark:border-gray-700/50 px-4 py-3 text-gray-600 dark:text-gray-400">
                    ASCII 문자 + %HH (퍼센트 + 16진수)
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-200 dark:border-gray-700/50 px-4 py-3 text-gray-700 dark:text-gray-300 font-medium">
                    크기 변화
                  </td>
                  <td className="border border-gray-200 dark:border-gray-700/50 px-4 py-3 text-gray-600 dark:text-gray-400">
                    원본 대비 약 33% 증가
                  </td>
                  <td className="border border-gray-200 dark:border-gray-700/50 px-4 py-3 text-gray-600 dark:text-gray-400">
                    특수 문자당 약 3배 증가 (가변적)
                  </td>
                </tr>
                <tr className="bg-gray-50/50 dark:bg-slate-800/30">
                  <td className="border border-gray-200 dark:border-gray-700/50 px-4 py-3 text-gray-700 dark:text-gray-300 font-medium">
                    주요 용도
                  </td>
                  <td className="border border-gray-200 dark:border-gray-700/50 px-4 py-3 text-gray-600 dark:text-gray-400">
                    이메일 첨부, 데이터 URI, JWT, API 인증
                  </td>
                  <td className="border border-gray-200 dark:border-gray-700/50 px-4 py-3 text-gray-600 dark:text-gray-400">
                    쿼리 파라미터, 폼 데이터, 리다이렉트 URL
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-200 dark:border-gray-700/50 px-4 py-3 text-gray-700 dark:text-gray-300 font-medium">
                    가역성
                  </td>
                  <td className="border border-gray-200 dark:border-gray-700/50 px-4 py-3 text-gray-600 dark:text-gray-400">
                    완전 가역 (원본 복원 가능)
                  </td>
                  <td className="border border-gray-200 dark:border-gray-700/50 px-4 py-3 text-gray-600 dark:text-gray-400">
                    완전 가역 (원본 복원 가능)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* FAQ */}
          <h2>자주 묻는 질문 (FAQ)</h2>

          <h3>Base64 인코딩은 암호화인가요?</h3>
          <p>
            아닙니다. Base64는 암호화가 아니라 인코딩입니다. 누구든지 Base64 문자열을 쉽게
            디코딩하여 원본 데이터를 확인할 수 있습니다. 민감한 데이터를 보호하려면 AES,
            RSA 등의 실제 암호화 알고리즘을 사용해야 합니다. Base64는 데이터의 형식을
            변환하는 것이지, 보안을 제공하는 것이 아닙니다.
          </p>

          <h3>Base64 인코딩하면 데이터 크기가 얼마나 증가하나요?</h3>
          <p>
            Base64 인코딩은 원본 데이터 대비 약 33% 크기가 증가합니다. 이는 3바이트의 원본
            데이터가 4바이트의 Base64 문자로 변환되기 때문입니다. 예를 들어, 3KB 파일은
            Base64로 인코딩하면 약 4KB가 됩니다. 줄바꿈 문자가 추가될 경우 약간 더 증가할
            수 있습니다.
          </p>

          <h3>한글(UTF-8) 텍스트도 Base64로 변환할 수 있나요?</h3>
          <p>
            네, 가능합니다. 이 도구는 UTF-8 인코딩을 완벽하게 지원합니다. 한글, 일본어,
            중국어, 이모지 등 모든 유니코드 문자를 Base64로 인코딩하고 다시 디코딩할 수
            있습니다. 텍스트는 먼저 UTF-8 바이트 배열로 변환된 후 Base64 인코딩됩니다.
          </p>

          <h3>이 도구에서 처리한 데이터는 안전한가요?</h3>
          <p>
            이 도구의 모든 인코딩/디코딩 처리는 사용자의 브라우저(클라이언트)에서 수행됩니다.
            입력한 데이터는 서버로 전송되지 않으며, 어떤 외부 서비스와도 공유되지 않습니다.
            브라우저 탭을 닫으면 모든 데이터가 사라집니다. 다만, 민감한 데이터의 경우 항상
            로컬 환경에서 처리하는 것을 권장합니다.
          </p>

          {/* Internal links */}
          <h2>관련 도구</h2>
          <p>
            개발에 유용한 다른 온라인 도구도 확인해보세요:
          </p>
          <ul>
            <li>
              <Link
                href="/tools"
                className="text-[#2563eb] dark:text-blue-400 hover:underline"
              >
                전체 개발자 도구 모음
              </Link>{' '}
              - 다양한 온라인 개발 도구를 한곳에서 이용할 수 있습니다.
            </li>
            <li>
              <Link
                href="/blog"
                className="text-[#2563eb] dark:text-blue-400 hover:underline"
              >
                기술 블로그
              </Link>{' '}
              - 최신 IT 기술 트렌드와 개발 튜토리얼을 확인하세요.
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}

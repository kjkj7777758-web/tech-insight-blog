import { Metadata } from 'next';
import Link from 'next/link';
import RegexTester from './RegexTester';

export const metadata: Metadata = {
  title: '정규표현식 테스터 - 온라인 Regex 테스트 도구',
  description:
    '온라인 정규표현식(Regex) 테스터. 정규식 패턴을 실시간으로 테스트하고, 매칭 결과를 확인하세요. 자주 쓰는 정규식 패턴 제공.',
  keywords: [
    '정규표현식',
    'regex 테스트',
    '정규식 테스터',
    'regular expression',
    'regex tester',
    '정규식 패턴',
    '개발자 도구',
  ],
  openGraph: {
    title: '정규표현식 테스터 - 온라인 Regex 테스트 도구 | 테크인사이트',
    description:
      '온라인 정규표현식 테스터. 실시간으로 정규식을 테스트하고 매칭 결과를 확인하세요.',
  },
};

export default function RegexTesterPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-3">
          <Link
            href="/"
            className="hover:text-[#2563eb] dark:hover:text-blue-400 transition-colors"
          >
            홈
          </Link>
          <span>/</span>
          <span>도구</span>
          <span>/</span>
          <span className="text-gray-700 dark:text-gray-300">정규표현식 테스터</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          정규표현식 테스터
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          정규식 패턴을 입력하고 테스트 문자열에서 실시간으로 매칭 결과를 확인하세요.
          치환, 캡처 그룹 확인 등 다양한 기능을 지원합니다.
        </p>
      </div>

      {/* Tool */}
      <RegexTester />

      {/* SEO Content */}
      <article className="mt-16 prose prose-lg dark:prose-invert max-w-none">
        <h2>정규표현식이란?</h2>
        <p>
          정규표현식(Regular Expression, 줄여서 Regex)은 문자열에서 특정 패턴을 찾거나,
          치환하거나, 유효성을 검증하기 위해 사용하는 형식 언어입니다. 거의 모든
          프로그래밍 언어(JavaScript, Python, Java, Go, C# 등)에서 지원하며, 텍스트
          처리에서 가장 강력한 도구 중 하나입니다.
        </p>
        <p>
          이메일 주소 형식 확인, URL 파싱, 로그 파일 분석, 데이터 추출 등 다양한
          상황에서 활용되며, 웹 개발에서는 폼 유효성 검사에 특히 많이 사용됩니다.
        </p>

        <h2>정규표현식 기본 문법</h2>
        <p>
          아래 표는 정규표현식에서 가장 많이 사용되는 메타문자와 특수 시퀀스를
          정리한 것입니다.
        </p>

        <h3>메타문자</h3>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>패턴</th>
                <th>설명</th>
                <th>예시</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>.</code></td>
                <td>임의의 한 문자 (줄바꿈 제외)</td>
                <td><code>a.c</code> &rarr; abc, aXc</td>
              </tr>
              <tr>
                <td><code>*</code></td>
                <td>앞 문자를 0회 이상 반복</td>
                <td><code>ab*c</code> &rarr; ac, abc, abbc</td>
              </tr>
              <tr>
                <td><code>+</code></td>
                <td>앞 문자를 1회 이상 반복</td>
                <td><code>ab+c</code> &rarr; abc, abbc</td>
              </tr>
              <tr>
                <td><code>?</code></td>
                <td>앞 문자를 0회 또는 1회</td>
                <td><code>colou?r</code> &rarr; color, colour</td>
              </tr>
              <tr>
                <td><code>{'{'}</code>n<code>{'}'}</code></td>
                <td>정확히 n회 반복</td>
                <td><code>{'a{3}'}</code> &rarr; aaa</td>
              </tr>
              <tr>
                <td><code>{'{'}</code>n,m<code>{'}'}</code></td>
                <td>n회 이상 m회 이하 반복</td>
                <td><code>{'a{2,4}'}</code> &rarr; aa, aaa, aaaa</td>
              </tr>
              <tr>
                <td><code>[abc]</code></td>
                <td>문자 클래스 - a, b, c 중 하나</td>
                <td><code>[aeiou]</code> &rarr; 모음 한 글자</td>
              </tr>
              <tr>
                <td><code>[^abc]</code></td>
                <td>부정 문자 클래스 - a, b, c 제외</td>
                <td><code>[^0-9]</code> &rarr; 숫자가 아닌 문자</td>
              </tr>
              <tr>
                <td><code>(abc)</code></td>
                <td>캡처 그룹</td>
                <td><code>(ab)+</code> &rarr; ab, abab</td>
              </tr>
              <tr>
                <td><code>^</code></td>
                <td>문자열(또는 줄)의 시작</td>
                <td><code>^Hello</code> &rarr; Hello로 시작</td>
              </tr>
              <tr>
                <td><code>$</code></td>
                <td>문자열(또는 줄)의 끝</td>
                <td><code>World$</code> &rarr; World로 끝남</td>
              </tr>
              <tr>
                <td><code>|</code></td>
                <td>OR 연산자</td>
                <td><code>cat|dog</code> &rarr; cat 또는 dog</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>특수 시퀀스</h3>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>패턴</th>
                <th>설명</th>
                <th>동등 표현</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>\d</code></td>
                <td>숫자</td>
                <td><code>[0-9]</code></td>
              </tr>
              <tr>
                <td><code>\D</code></td>
                <td>숫자가 아닌 문자</td>
                <td><code>[^0-9]</code></td>
              </tr>
              <tr>
                <td><code>\w</code></td>
                <td>단어 문자 (영문, 숫자, 언더스코어)</td>
                <td><code>[a-zA-Z0-9_]</code></td>
              </tr>
              <tr>
                <td><code>\W</code></td>
                <td>단어 문자가 아닌 문자</td>
                <td><code>[^a-zA-Z0-9_]</code></td>
              </tr>
              <tr>
                <td><code>\s</code></td>
                <td>공백 문자 (스페이스, 탭, 줄바꿈 등)</td>
                <td><code>[ \t\n\r\f\v]</code></td>
              </tr>
              <tr>
                <td><code>\S</code></td>
                <td>공백이 아닌 문자</td>
                <td><code>[^ \t\n\r\f\v]</code></td>
              </tr>
              <tr>
                <td><code>\b</code></td>
                <td>단어 경계</td>
                <td>단어의 시작 또는 끝</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>자주 사용하는 정규식 패턴 모음</h2>
        <p>
          개발할 때 자주 필요한 정규식 패턴을 모았습니다. 위의 테스터에서 바로 테스트해
          볼 수 있습니다.
        </p>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>용도</th>
                <th>패턴</th>
                <th>설명</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>이메일</td>
                <td><code>[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]&#123;2,&#125;</code></td>
                <td>일반적인 이메일 주소 형식</td>
              </tr>
              <tr>
                <td>URL</td>
                <td><code>{'https?://[\\w\\-._~:/?#@!$&\'()*+,;=%]+'}</code></td>
                <td>HTTP/HTTPS URL</td>
              </tr>
              <tr>
                <td>한국 전화번호</td>
                <td><code>(01[016789])-?(\d&#123;3,4&#125;)-?(\d&#123;4&#125;)</code></td>
                <td>010, 011 등 한국 휴대폰 번호</td>
              </tr>
              <tr>
                <td>날짜 (YYYY-MM-DD)</td>
                <td><code>\d&#123;4&#125;-\d&#123;2&#125;-\d&#123;2&#125;</code></td>
                <td>ISO 8601 날짜 형식</td>
              </tr>
              <tr>
                <td>한글만</td>
                <td><code>[가-힣]+</code></td>
                <td>완성형 한글 문자만 매칭</td>
              </tr>
              <tr>
                <td>숫자만</td>
                <td><code>\d+</code></td>
                <td>연속된 숫자 매칭</td>
              </tr>
              <tr>
                <td>IPv4 주소</td>
                <td><code>(\d&#123;1,3&#125;)\.(\d&#123;1,3&#125;)\.(\d&#123;1,3&#125;)\.(\d&#123;1,3&#125;)</code></td>
                <td>IP 주소 형식 (범위 미검증)</td>
              </tr>
              <tr>
                <td>HTML 태그</td>
                <td><code>{'<[^>]+>'}</code></td>
                <td>HTML 태그 매칭</td>
              </tr>
              <tr>
                <td>16진수 색상코드</td>
                <td><code>#([0-9a-fA-F]&#123;3&#125;|[0-9a-fA-F]&#123;6&#125;)</code></td>
                <td>#fff 또는 #ffffff 형식</td>
              </tr>
              <tr>
                <td>주민등록번호 형식</td>
                <td><code>\d&#123;6&#125;-[1-4]\d&#123;6&#125;</code></td>
                <td>주민번호 형식 검증 (실제 유효성 미검증)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>정규표현식 플래그 설명</h2>
        <p>
          정규표현식 플래그(flag)는 패턴의 매칭 동작을 제어합니다. JavaScript에서
          지원하는 주요 플래그는 다음과 같습니다.
        </p>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>플래그</th>
                <th>이름</th>
                <th>설명</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>g</code></td>
                <td>Global</td>
                <td>
                  전역 검색. 첫 번째 매칭뿐만 아니라 문자열 전체에서 모든 매칭을 찾습니다.
                  이 플래그가 없으면 첫 번째 매칭만 반환합니다.
                </td>
              </tr>
              <tr>
                <td><code>i</code></td>
                <td>Case-insensitive</td>
                <td>
                  대소문자를 구분하지 않고 매칭합니다. 예를 들어, <code>/hello/i</code>는
                  &quot;Hello&quot;, &quot;HELLO&quot;, &quot;hello&quot; 모두 매칭합니다.
                </td>
              </tr>
              <tr>
                <td><code>m</code></td>
                <td>Multiline</td>
                <td>
                  멀티라인 모드. <code>^</code>와 <code>$</code>가 문자열의 시작/끝이
                  아닌 각 줄의 시작/끝에 매칭됩니다. 여러 줄의 텍스트를 처리할 때
                  유용합니다.
                </td>
              </tr>
              <tr>
                <td><code>s</code></td>
                <td>DotAll</td>
                <td>
                  <code>.</code>이 줄바꿈 문자(<code>\n</code>)를 포함한 모든 문자에
                  매칭됩니다. 기본적으로 <code>.</code>은 줄바꿈을 제외한 문자에만
                  매칭됩니다.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>자주 묻는 질문 (FAQ)</h2>

        <h3>정규표현식을 꼭 배워야 하나요?</h3>
        <p>
          정규표현식은 개발자에게 매우 유용한 도구입니다. 텍스트 검색, 데이터 유효성
          검사, 로그 분석, 문자열 치환 등 다양한 상황에서 시간을 크게 절약해 줍니다.
          기본 문법만 익혀도 업무 효율이 크게 향상되므로, 점진적으로 학습하는 것을
          권장합니다.
        </p>

        <h3>정규표현식의 성능이 걱정됩니다. 주의할 점이 있나요?</h3>
        <p>
          네, 정규표현식은 잘못 작성하면 성능 문제를 일으킬 수 있습니다. 특히 중첩된
          수량자(예: <code>(a+)+</code>)는 &quot;재앙적 역추적(Catastrophic
          Backtracking)&quot;이라는 현상을 유발할 수 있습니다. 가능한 한 구체적인
          패턴을 작성하고, 불필요한 역추적을 줄이기 위해 소유적 수량자나 원자적
          그룹을 활용하세요.
        </p>

        <h3>JavaScript와 다른 언어의 정규표현식에 차이가 있나요?</h3>
        <p>
          기본 문법은 대부분 동일하지만, 언어마다 지원하는 기능에 차이가 있습니다.
          예를 들어, JavaScript는 후방 탐색(lookbehind)을 ES2018부터 지원하며,
          Python은 조건부 패턴을 지원합니다. 이 테스터는 JavaScript 엔진을 사용하므로,
          JavaScript의 정규표현식 스펙을 기준으로 동작합니다.
        </p>

        <h3>캡처 그룹과 비캡처 그룹의 차이는 무엇인가요?</h3>
        <p>
          캡처 그룹 <code>(abc)</code>는 매칭된 내용을 기억하여 나중에 역참조하거나
          치환에 사용할 수 있습니다. 비캡처 그룹 <code>(?:abc)</code>는 그룹화만 하고
          내용을 기억하지 않아 성능상 이점이 있습니다. 치환이나 역참조가 필요 없다면
          비캡처 그룹을 사용하는 것이 좋습니다.
        </p>
      </article>

      {/* Internal Links */}
      <nav className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700/50">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          다른 개발자 도구
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/tools/json-formatter"
            className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl hover:border-[#2563eb]/30 dark:hover:border-blue-500/30 hover:shadow-sm transition-all group"
          >
            <span className="text-2xl">{'{ }'}</span>
            <div>
              <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 group-hover:text-[#2563eb] dark:group-hover:text-blue-400 transition-colors">
                JSON 포맷터
              </span>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                JSON 데이터를 보기 좋게 정리하고 검증하세요
              </p>
            </div>
          </Link>
          <Link
            href="/blog"
            className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl hover:border-[#2563eb]/30 dark:hover:border-blue-500/30 hover:shadow-sm transition-all group"
          >
            <span className="text-2xl">&#128221;</span>
            <div>
              <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 group-hover:text-[#2563eb] dark:group-hover:text-blue-400 transition-colors">
                블로그
              </span>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                최신 기술 글과 튜토리얼을 확인하세요
              </p>
            </div>
          </Link>
        </div>
      </nav>
    </div>
  );
}

import { Metadata } from 'next';
import { SITE_NAME, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: '개인정보처리방침',
  description: `${SITE_NAME}의 개인정보처리방침`,
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">개인정보처리방침</h1>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          최종 수정일: 2024년 11월 1일
        </p>

        <p>
          {SITE_NAME} (이하 &ldquo;본 사이트&rdquo;)는 이용자의 개인정보를 중요시하며, 개인정보 보호법 등
          관련 법령을 준수하고 있습니다. 본 개인정보처리방침은 본 사이트에서 수집하는 개인정보의
          종류, 이용 목적, 보관 기간, 그리고 이용자의 권리에 대해 설명합니다.
        </p>

        <h2>1. 수집하는 개인정보 항목</h2>
        <p>본 사이트는 다음과 같은 개인정보를 수집할 수 있습니다:</p>
        <ul>
          <li>문의 시: 이름, 이메일 주소</li>
          <li>자동 수집: 방문 기록, IP 주소, 브라우저 정보, 쿠키</li>
        </ul>

        <h2>2. 개인정보의 수집 및 이용 목적</h2>
        <p>수집된 개인정보는 다음의 목적을 위해 이용됩니다:</p>
        <ul>
          <li>문의에 대한 답변 및 소통</li>
          <li>사이트 이용 통계 분석 및 서비스 개선</li>
          <li>맞춤형 콘텐츠 제공</li>
        </ul>

        <h2>3. 쿠키(Cookie) 사용</h2>
        <p>
          본 사이트는 이용자의 편의를 위해 쿠키를 사용합니다. 쿠키는 웹사이트가 이용자의
          브라우저에 보내는 소량의 데이터로, 다음과 같은 목적으로 사용됩니다:
        </p>
        <ul>
          <li>사이트 테마 설정(다크모드/라이트모드) 저장</li>
          <li>방문 통계 분석 (Google Analytics)</li>
          <li>광고 서비스 제공 (Google AdSense)</li>
        </ul>
        <p>
          이용자는 브라우저 설정을 통해 쿠키를 차단하거나 삭제할 수 있습니다. 다만, 쿠키를
          차단할 경우 일부 서비스 이용에 제한이 있을 수 있습니다.
        </p>

        <h2>4. Google Analytics</h2>
        <p>
          본 사이트는 방문자 통계를 분석하기 위해 Google Analytics를 사용합니다.
          Google Analytics는 쿠키를 통해 이용자의 사이트 이용 정보를 수집하며,
          이 정보는 Google의 개인정보처리방침에 따라 처리됩니다. 이용자는 Google
          Analytics 옵트아웃 브라우저 부가기능을 통해 데이터 수집을 거부할 수 있습니다.
        </p>

        <h2>5. Google AdSense</h2>
        <p>
          본 사이트는 광고 수익을 위해 Google AdSense를 사용합니다. Google AdSense는
          이용자의 관심사에 기반한 광고를 제공하기 위해 쿠키를 사용할 수 있습니다.
          이에 대한 자세한 내용은 Google의 광고 개인정보보호 정책을 참고해 주세요.
        </p>

        <h2>6. 쿠팡 파트너스</h2>
        <p>
          본 사이트는 쿠팡 파트너스 프로그램에 참여하고 있습니다. 제품 리뷰 및 추천 글에
          포함된 쿠팡 링크를 통해 구매가 이루어질 경우, 본 사이트는 일정액의 수수료를
          제공받습니다. 쿠팡 파트너스 링크는 이용자의 구매 가격에 영향을 미치지 않습니다.
        </p>

        <h2>7. 개인정보의 보관 및 파기</h2>
        <p>
          수집된 개인정보는 수집 목적이 달성된 후 지체 없이 파기합니다. 단, 관련 법령에 따라
          보존할 필요가 있는 경우 해당 기간 동안 보관합니다.
        </p>

        <h2>8. 이용자의 권리</h2>
        <p>이용자는 언제든지 다음과 같은 권리를 행사할 수 있습니다:</p>
        <ul>
          <li>개인정보 열람, 수정, 삭제 요청</li>
          <li>개인정보 처리 정지 요청</li>
          <li>쿠키 사용 거부</li>
        </ul>
        <p>
          위 권리를 행사하시려면{' '}
          <a href="/contact">문의하기 페이지</a>를 통해 연락해 주세요.
        </p>

        <h2>9. 개인정보 보호책임자</h2>
        <p>
          개인정보 처리에 관한 문의는 아래로 연락해 주시기 바랍니다.
        </p>
        <ul>
          <li>이메일: contact@techinsight.kr</li>
        </ul>

        <h2>10. 개인정보처리방침 변경</h2>
        <p>
          본 개인정보처리방침은 법령, 정책 또는 서비스 변경에 따라 수정될 수 있습니다.
          변경 사항은 본 페이지에 게시되며, 중요한 변경 시 사이트 공지를 통해 안내합니다.
        </p>
      </div>
    </div>
  );
}

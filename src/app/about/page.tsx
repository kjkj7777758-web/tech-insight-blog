import { Metadata } from 'next';
import { SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: '블로그 소개',
  description: `${SITE_NAME}는 IT 기술, 제품 리뷰, 프로그래밍 튜토리얼을 다루는 기술 블로그입니다.`,
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">블로그 소개</h1>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h2>안녕하세요, {SITE_NAME}입니다</h2>
        <p>
          {SITE_NAME}는 IT 기술과 디지털 라이프에 관심 있는 모든 분들을 위한 기술 블로그입니다.
          최신 기술 트렌드, 제품 리뷰, 프로그래밍 튜토리얼, 그리고 일상에서 유용한 IT 팁까지
          다양한 주제의 콘텐츠를 제공하고 있습니다.
        </p>

        <h2>운영 목적</h2>
        <p>
          빠르게 변화하는 IT 세계에서 신뢰할 수 있는 정보를 한국어로 제공하는 것이 저희의 목표입니다.
          복잡한 기술 개념을 쉽게 설명하고, 실제 사용 경험을 바탕으로 한 솔직한 제품 리뷰를 작성하며,
          초보자부터 숙련된 개발자까지 모두에게 도움이 되는 콘텐츠를 만들기 위해 노력합니다.
        </p>

        <h2>다루는 주제</h2>
        <ul>
          <li><strong>제품 리뷰</strong>: 노트북, 스마트폰, 주변기기 등 IT 제품에 대한 상세한 리뷰와 비교 분석</li>
          <li><strong>프로그래밍 튜토리얼</strong>: Python, JavaScript, TypeScript, React 등 인기 기술의 입문 가이드와 실전 튜토리얼</li>
          <li><strong>IT 팁</strong>: 생산성을 높여주는 소프트웨어 활용법, 운영체제 설정 팁, 개발 도구 추천</li>
          <li><strong>기술 가이드</strong>: 새로운 기술을 시작하는 분들을 위한 종합 가이드</li>
        </ul>

        <h2>운영자 소개</h2>
        <p>
          IT 업계에서 다년간의 경험을 쌓은 개발자이자 기술 애호가입니다. 새로운 기술을 배우고
          이를 다른 사람들과 나누는 것을 좋아합니다. 실제 사용 경험과 전문 지식을 바탕으로
          정확하고 유용한 정보를 제공하기 위해 최선을 다하고 있습니다.
        </p>

        <h2>콘텐츠 원칙</h2>
        <ul>
          <li><strong>정확성</strong>: 모든 기술 정보는 직접 검증하고 최신 상태를 유지합니다</li>
          <li><strong>솔직함</strong>: 제품 리뷰는 장단점을 균형 있게 다루며, 협찬 여부를 투명하게 공개합니다</li>
          <li><strong>실용성</strong>: 독자가 실제로 활용할 수 있는 실질적인 정보를 제공합니다</li>
          <li><strong>접근성</strong>: 전문 지식이 없는 분들도 이해할 수 있도록 쉽게 설명합니다</li>
        </ul>

        <h2>제휴 안내</h2>
        <p>
          본 블로그는 쿠팡 파트너스 활동의 일환으로, 제품 링크를 통해 구매 시 일정액의 수수료를
          제공받을 수 있습니다. 이는 블로그 운영에 도움이 되며, 리뷰의 공정성에는 영향을 미치지
          않습니다. 모든 리뷰는 실제 사용 경험을 바탕으로 작성됩니다.
        </p>

        <h2>문의</h2>
        <p>
          블로그에 대한 문의, 제안, 협업 요청은{' '}
          <a href="/contact">문의하기 페이지</a>를 이용해 주세요.
          여러분의 소중한 의견을 기다리고 있습니다.
        </p>
      </div>
    </div>
  );
}

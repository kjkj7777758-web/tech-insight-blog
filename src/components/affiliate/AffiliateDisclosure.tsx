import { Info } from 'lucide-react';

export default function AffiliateDisclosure() {
  return (
    <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30 rounded-xl text-sm text-amber-800 dark:text-amber-300 mb-8">
      <Info size={18} className="mt-0.5 shrink-0" />
      <p>
        이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.
      </p>
    </div>
  );
}

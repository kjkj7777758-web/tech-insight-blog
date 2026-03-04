import { ExternalLink } from 'lucide-react';
import { AffiliateProduct } from '@/lib/types';

export default function CoupangProductCard({ product }: { product: AffiliateProduct }) {
  return (
    <div className="flex flex-col sm:flex-row items-start gap-4 p-5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl my-6 hover:shadow-md transition-shadow">
      <div className="w-full sm:w-32 h-32 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center shrink-0">
        <span className="text-3xl">📦</span>
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-1">{product.name}</h4>
        {product.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{product.description}</p>
        )}
        {product.price && (
          <p className="text-lg font-bold text-primary-600 dark:text-primary-400 mb-3">
            {product.price}
          </p>
        )}
        <a
          href={product.coupangUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          쿠팡에서 가격 확인하기
          <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
}

import { ExternalLink } from 'lucide-react';

interface Product {
  name: string;
  specs: string;
  pros: string;
  cons: string;
  price: string;
  coupangUrl: string;
}

export default function ProductComparisonTable({ products }: { products: Product[] }) {
  return (
    <div className="overflow-x-auto my-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-gray-50 dark:bg-slate-800">
            <th className="text-left p-3 border-b border-gray-200 dark:border-gray-700 font-semibold">제품명</th>
            <th className="text-left p-3 border-b border-gray-200 dark:border-gray-700 font-semibold">주요 사양</th>
            <th className="text-left p-3 border-b border-gray-200 dark:border-gray-700 font-semibold">장점</th>
            <th className="text-left p-3 border-b border-gray-200 dark:border-gray-700 font-semibold">단점</th>
            <th className="text-left p-3 border-b border-gray-200 dark:border-gray-700 font-semibold">가격</th>
            <th className="text-center p-3 border-b border-gray-200 dark:border-gray-700 font-semibold">링크</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, idx) => (
            <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-slate-800/50">
              <td className="p-3 border-b border-gray-100 dark:border-gray-800 font-medium">{product.name}</td>
              <td className="p-3 border-b border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-400">{product.specs}</td>
              <td className="p-3 border-b border-gray-100 dark:border-gray-800 text-green-600 dark:text-green-400">{product.pros}</td>
              <td className="p-3 border-b border-gray-100 dark:border-gray-800 text-red-500 dark:text-red-400">{product.cons}</td>
              <td className="p-3 border-b border-gray-100 dark:border-gray-800 font-bold text-primary-600 dark:text-primary-400 whitespace-nowrap">{product.price}</td>
              <td className="p-3 border-b border-gray-100 dark:border-gray-800 text-center">
                <a
                  href={product.coupangUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:underline"
                >
                  <ExternalLink size={14} />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

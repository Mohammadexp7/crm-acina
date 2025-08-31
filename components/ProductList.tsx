import React from 'react';
import { Product, ProductStatus } from '../types';
import ThreeDotsIcon from './icons/ThreeDotsIcon';

interface ProductListProps {
  products: Product[];
}

const StatusBadge: React.FC<{ status: ProductStatus }> = ({ status }) => {
  const baseClasses = 'px-3 py-1 text-xs font-semibold rounded-md inline-block';
  let colorClasses = '';
  switch (status) {
    case ProductStatus.Active:
      colorClasses = 'bg-status-active-bg text-status-active-text';
      break;
    case ProductStatus.Pending:
      colorClasses = 'bg-status-pending-bg text-status-pending-text';
      break;
  }
  return <span className={`${baseClasses} ${colorClasses}`}>{status}</span>;
};

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-bold text-text-dark mb-4">لیست محصولات</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead >
            <tr className="border-b border-border-color">
              <th scope="col" className="py-3 text-right text-xs font-semibold text-text-light uppercase tracking-wider">
                محصول
              </th>
              <th scope="col" className="px-4 py-3 text-right text-xs font-semibold text-text-light uppercase tracking-wider">
                نوع
              </th>
              <th scope="col" className="px-4 py-3 text-right text-xs font-semibold text-text-light uppercase tracking-wider">
                برند
              </th>
              <th scope="col" className="px-4 py-3 text-right text-xs font-semibold text-text-light uppercase tracking-wider">
                قیمت
              </th>
              <th scope="col" className="px-4 py-3 text-right text-xs font-semibold text-text-light uppercase tracking-wider">
                وضعیت
              </th>
              <th scope="col" className="relative px-4 py-3">
                <span className="sr-only">اقدام</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {products.map((product) => (
              <tr key={product.id} className="border-b border-border-color last:border-b-0">
                <td className="py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img className="h-10 w-10 object-contain" src={product.image} alt={product.name} />
                    </div>
                    <div className="mr-4">
                      <div className="text-sm font-bold text-text-dark">{product.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-text-light">{product.type}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-text-light">{product.brand}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-text-dark">{product.price.toLocaleString('fa-IR')} تومان</td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <StatusBadge status={product.status} />
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-text-light hover:text-primary"><ThreeDotsIcon /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
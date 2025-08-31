import React from 'react';
import { TopPageData } from '../types';

const topPagesData: TopPageData[] = [
    { id: 1, path: '/', views: 12840, uniqueVisitors: 9820, bounceRate: '۴۵.۲٪' },
    { id: 2, path: '/products/iphone-13', views: 9730, uniqueVisitors: 7150, bounceRate: '۳۸.۵٪' },
    { id: 3, path: '/blog/new-features-2024', views: 8120, uniqueVisitors: 6500, bounceRate: '۵۵.۰٪' },
    { id: 4, path: '/pricing', views: 6500, uniqueVisitors: 5310, bounceRate: '۲۵.۸٪' },
    { id: 5, path: '/contact-us', views: 4200, uniqueVisitors: 3800, bounceRate: '۱۵.۱٪' },
];

const TopPagesTable: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-bold text-text-dark mb-4">صفحات برتر</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-border-color">
              <th scope="col" className="py-3 text-right text-xs font-semibold text-text-light uppercase tracking-wider">مسیر صفحه</th>
              <th scope="col" className="px-4 py-3 text-right text-xs font-semibold text-text-light uppercase tracking-wider">بازدیدها</th>
              <th scope="col" className="px-4 py-3 text-right text-xs font-semibold text-text-light uppercase tracking-wider">بازدیدکنندگان یکتا</th>
              <th scope="col" className="px-4 py-3 text-right text-xs font-semibold text-text-light uppercase tracking-wider">نرخ پرش</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {topPagesData.map((page) => (
              <tr key={page.id} className="border-b border-border-color last:border-b-0 hover:bg-gray-50">
                <td className="py-4 whitespace-nowrap text-sm font-medium text-text-dark">{page.path}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-text-light">{page.views.toLocaleString('fa-IR')}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-text-light">{page.uniqueVisitors.toLocaleString('fa-IR')}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-text-light">{page.bounceRate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopPagesTable;

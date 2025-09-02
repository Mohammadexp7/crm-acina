import React, { useState, useMemo } from 'react';
import { FullProduct, ProductStockStatus } from '../types';
import Pagination from './Pagination';
import PlusIcon from './icons/PlusIcon';
import PencilIcon from './icons/PencilIcon';
import TrashIcon from './icons/TrashIcon';

const mockProducts: FullProduct[] = Array.from({ length: 45 }, (_, i) => {
    const categories = ['لپتاپ', 'موبایل', 'لوازم جانبی', 'ساعت هوشمند', 'تبلت'];
    const statuses = [ProductStockStatus.InStock, ProductStockStatus.OutOfStock];
    return {
        id: i + 1,
        name: ['مک‌بوک پرو', 'آیفون ۱۳', 'ایرپاد پرو', 'اپل واچ سری ۷', 'آیپد ایر'][i % 5],
        image: `https://i.imgur.com/${['13V3GGr', 'szaLz1Y', 'r7y2uzz', '49p4Gr3', '13V3GGr'][i%5]}.png`,
        sku: `APL-${1001 + i}`,
        category: categories[i % 5],
        price: [2500, 1200, 250, 400, 600][i % 5] * 10000,
        stock: Math.floor(Math.random() * 200),
        status: statuses[Math.floor(Math.random() * 2)],
    };
});

const ITEMS_PER_PAGE = 8;

const StockStatusBadge: React.FC<{ status: ProductStockStatus }> = ({ status }) => {
    const baseClasses = 'px-3 py-1 text-xs font-semibold rounded-md inline-block';
    let colorClasses = '';
    switch (status) {
        case ProductStockStatus.InStock: colorClasses = 'bg-status-active-bg text-status-active-text'; break;
        case ProductStockStatus.OutOfStock: colorClasses = 'bg-red-100 text-red-800'; break;
    }
    return <span className={`${baseClasses} ${colorClasses}`}>{status}</span>;
};

const ProductsPage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');

    const filteredProducts = useMemo(() => {
        return mockProducts
            .filter(product => categoryFilter === 'all' || product.category === categoryFilter)
            .filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.sku.toLowerCase().includes(searchTerm.toLowerCase())
            );
    }, [searchTerm, categoryFilter]);

    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [currentPage, filteredProducts]);
    
    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const categories = ['all', ...Array.from(new Set(mockProducts.map(p => p.category)))];

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h1 className="text-2xl font-bold text-text-dark">مدیریت محصولات</h1>
                <button className="flex items-center gap-2 w-full md:w-auto px-4 py-2.5 bg-primary text-white rounded-lg font-semibold hover:bg-opacity-90 transition-colors">
                    <PlusIcon className="w-5 h-5" />
                    <span>افزودن محصول جدید</span>
                </button>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                    <div className="relative w-full md:w-1/3">
                        <svg className="w-5 h-5 text-text-light absolute top-1/2 right-3 transform -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        <input
                            type="text"
                            placeholder="جستجو بر اساس نام یا SKU..."
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                            className="pr-10 pl-4 py-2.5 w-full bg-background border-none rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                    <select
                        value={categoryFilter}
                        onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
                        className="w-full md:w-auto px-4 py-2.5 bg-background border-none rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        {categories.map(cat => <option key={cat} value={cat}>{cat === 'all' ? 'همه دسته‌ها' : cat}</option>)}
                    </select>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="border-b border-border-color">
                                <th className="py-3 text-right text-xs font-semibold text-text-light uppercase">محصول</th>
                                <th className="px-4 py-3 text-right text-xs font-semibold text-text-light uppercase">SKU</th>
                                <th className="px-4 py-3 text-right text-xs font-semibold text-text-light uppercase">دسته</th>
                                <th className="px-4 py-3 text-right text-xs font-semibold text-text-light uppercase">قیمت</th>
                                <th className="px-4 py-3 text-right text-xs font-semibold text-text-light uppercase">موجودی</th>
                                <th className="px-4 py-3 text-right text-xs font-semibold text-text-light uppercase">وضعیت</th>
                                <th className="relative px-4 py-3"><span className="sr-only">اقدامات</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedProducts.map((product) => (
                                <tr key={product.id} className="border-b border-border-color last:border-b-0 hover:bg-gray-50">
                                    <td className="py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <img src={product.image} alt={product.name} className="w-10 h-10 object-contain"/>
                                            <span className="font-bold text-text-dark">{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-text-light">{product.sku}</td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-text-light">{product.category}</td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-text-dark">{product.price.toLocaleString('fa-IR')} تومان</td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold">{product.stock}</td>
                                    <td className="px-4 py-4 whitespace-nowrap"><StockStatusBadge status={product.status} /></td>
                                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex gap-2">
                                            <button className="text-text-light hover:text-primary p-1.5 rounded-md hover:bg-primary-light"><PencilIcon className="w-5 h-5" /></button>
                                            <button className="text-text-light hover:text-red-500 p-1.5 rounded-md hover:bg-red-50"><TrashIcon className="w-5 h-5" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {totalPages > 1 && (
                    <div className="mt-6">
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductsPage;

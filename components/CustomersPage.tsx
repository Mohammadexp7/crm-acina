import React, { useState, useMemo } from 'react';
import { Customer } from '../types';
import Pagination from './Pagination';
import PlusIcon from './icons/PlusIcon';
import PencilIcon from './icons/PencilIcon';
import TrashIcon from './icons/TrashIcon';

const mockCustomers: Customer[] = Array.from({ length: 60 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (i * 5));
    return {
        id: i + 1,
        name: ['علی رضایی', 'زهرا احمدی', 'محمد قاسمی', 'سارا حسینی', 'رضا اکبری', 'مریم مرادی', 'حسین جعفری'][i % 7],
        avatar: `https://picsum.photos/seed/${i + 20}/100`,
        email: `customer${i+1}@example.com`,
        phone: `091234567${10 + i}`,
        totalSpent: Math.floor(Math.random() * 10000000) + 500000,
        joinDate: date.toLocaleDateString('fa-IR'),
    };
});

const ITEMS_PER_PAGE = 10;

const CustomersPage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('joinDate');

    const filteredAndSortedCustomers = useMemo(() => {
        const filtered = mockCustomers.filter(customer =>
            customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.phone.includes(searchTerm)
        );

        return filtered.sort((a, b) => {
            if (sortBy === 'joinDate') {
                return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime();
            } else if (sortBy === 'totalSpent') {
                return b.totalSpent - a.totalSpent;
            }
            return a.name.localeCompare(b.name);
        });
    }, [searchTerm, sortBy]);

    const paginatedCustomers = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredAndSortedCustomers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [currentPage, filteredAndSortedCustomers]);
    
    const totalPages = Math.ceil(filteredAndSortedCustomers.length / ITEMS_PER_PAGE);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h1 className="text-2xl font-bold text-text-dark">مدیریت مشتریان</h1>
                <button className="flex items-center gap-2 w-full md:w-auto px-4 py-2.5 bg-primary text-white rounded-lg font-semibold hover:bg-opacity-90 transition-colors">
                    <PlusIcon className="w-5 h-5" />
                    <span>افزودن مشتری جدید</span>
                </button>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
                 <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                    <div className="relative w-full md:w-1/3">
                        <svg className="w-5 h-5 text-text-light absolute top-1/2 right-3 transform -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        <input
                            type="text"
                            placeholder="جستجو بر اساس نام، ایمیل یا تلفن..."
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                            className="pr-10 pl-4 py-2.5 w-full bg-background border-none rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full md:w-auto px-4 py-2.5 bg-background border-none rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        <option value="joinDate">مرتب‌سازی بر اساس: جدیدترین</option>
                        <option value="totalSpent">مرتب‌سازی بر اساس: بیشترین خرید</option>
                        <option value="name">مرتب‌سازی بر اساس: نام (الفبا)</option>
                    </select>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="border-b border-border-color">
                                <th className="py-3 text-right text-xs font-semibold text-text-light uppercase">مشتری</th>
                                <th className="px-4 py-3 text-right text-xs font-semibold text-text-light uppercase">ایمیل</th>
                                <th className="px-4 py-3 text-right text-xs font-semibold text-text-light uppercase">تلفن</th>
                                <th className="px-4 py-3 text-right text-xs font-semibold text-text-light uppercase">مجموع خرید</th>
                                <th className="px-4 py-3 text-right text-xs font-semibold text-text-light uppercase">تاریخ عضویت</th>
                                <th className="relative px-4 py-3"><span className="sr-only">اقدامات</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedCustomers.map((customer) => (
                                <tr key={customer.id} className="border-b border-border-color last:border-b-0 hover:bg-gray-50">
                                    <td className="py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <img src={customer.avatar} alt={customer.name} className="w-10 h-10 rounded-full object-cover"/>
                                            <span className="font-bold text-text-dark">{customer.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-text-light">{customer.email}</td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-text-light direction-ltr text-left">{customer.phone}</td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-text-dark">{customer.totalSpent.toLocaleString('fa-IR')} تومان</td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-text-light">{customer.joinDate}</td>
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

export default CustomersPage;

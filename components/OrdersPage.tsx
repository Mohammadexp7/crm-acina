import React, { useState, useMemo } from 'react';
import { Order, OrderStatus } from '../types';
import Pagination from './Pagination';
import ThreeDotsIcon from './icons/ThreeDotsIcon';

const mockOrders: Order[] = Array.from({ length: 50 }, (_, i) => {
    const statuses = [OrderStatus.Processing, OrderStatus.Shipped, OrderStatus.Delivered, OrderStatus.Cancelled];
    const date = new Date();
    date.setDate(date.getDate() - i);
    return {
        id: `#AVN-2024-${12589 - i}`,
        customerName: ['علی رضایی', 'زهرا احمدی', 'محمد قاسمی', 'سارا حسینی', 'رضا اکبری'][i % 5],
        avatar: `https://picsum.photos/seed/${i+10}/100`,
        date: date.toLocaleDateString('fa-IR'),
        total: Math.floor(Math.random() * 2000000) + 50000,
        status: statuses[i % 4],
    };
});

const ITEMS_PER_PAGE = 10;

const StatusBadge: React.FC<{ status: OrderStatus }> = ({ status }) => {
    const baseClasses = 'px-3 py-1 text-xs font-semibold rounded-md inline-block';
    let colorClasses = '';
    switch (status) {
        case OrderStatus.Processing: colorClasses = 'bg-blue-100 text-blue-800'; break;
        case OrderStatus.Shipped: colorClasses = 'bg-yellow-100 text-yellow-800'; break;
        case OrderStatus.Delivered: colorClasses = 'bg-green-100 text-green-800'; break;
        case OrderStatus.Cancelled: colorClasses = 'bg-red-100 text-red-800'; break;
    }
    return <span className={`${baseClasses} ${colorClasses}`}>{status}</span>;
};


const OrdersPage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');

    const filteredOrders = useMemo(() => {
        return mockOrders
            .filter(order => statusFilter === 'all' || order.status === statusFilter)
            .filter(order => 
                order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.id.toLowerCase().includes(searchTerm.toLowerCase())
            );
    }, [searchTerm, statusFilter]);

    const paginatedOrders = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredOrders.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [currentPage, filteredOrders]);

    const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);

    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-2xl font-bold text-text-dark">مدیریت سفارشات</h1>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                    <div className="relative w-full md:w-1/3">
                        <svg className="w-5 h-5 text-text-light absolute top-1/2 right-3 transform -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="جستجو بر اساس نام یا شناسه..."
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                            className="pr-10 pl-4 py-2.5 w-full bg-background border-none rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => { setStatusFilter(e.target.value as OrderStatus | 'all'); setCurrentPage(1); }}
                        className="w-full md:w-auto px-4 py-2.5 bg-background border-none rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        <option value="all">همه وضعیت‌ها</option>
                        {Object.values(OrderStatus).map(status => <option key={status} value={status}>{status}</option>)}
                    </select>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="border-b border-border-color">
                                <th className="py-3 text-right text-xs font-semibold text-text-light uppercase">شناسه سفارش</th>
                                <th className="px-4 py-3 text-right text-xs font-semibold text-text-light uppercase">مشتری</th>
                                <th className="px-4 py-3 text-right text-xs font-semibold text-text-light uppercase">تاریخ</th>
                                <th className="px-4 py-3 text-right text-xs font-semibold text-text-light uppercase">مبلغ کل</th>
                                <th className="px-4 py-3 text-right text-xs font-semibold text-text-light uppercase">وضعیت</th>
                                <th className="relative px-4 py-3"><span className="sr-only">اقدام</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedOrders.map((order) => (
                                <tr key={order.id} className="border-b border-border-color last:border-b-0 hover:bg-gray-50">
                                    <td className="py-4 whitespace-nowrap text-sm font-bold text-primary">{order.id}</td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <img src={order.avatar} alt={order.customerName} className="w-9 h-9 rounded-full object-cover"/>
                                            <span className="font-semibold text-text-dark">{order.customerName}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-text-light">{order.date}</td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-text-dark">{order.total.toLocaleString('fa-IR')} تومان</td>
                                    <td className="px-4 py-4 whitespace-nowrap"><StatusBadge status={order.status} /></td>
                                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="text-text-light hover:text-primary"><ThreeDotsIcon /></button>
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

export default OrdersPage;

import React from 'react';
import KpiCard from './KpiCard';
import SalesAnalyticsChart from './SalesAnalyticsChart';
import ProductList from './ProductList';
import NewUsersChart from './NewUsersChart';
import CustomerSatisfactionChart from './CustomerSatisfactionChart';
import SalesMap from './SalesMap';
import ShoppingBagIcon from './icons/ShoppingBagIcon';
import RevenueIcon from './icons/RevenueIcon';
import { Product, ProductStatus, KpiData } from '../types';

const kpiData: KpiData[] = [
    { title: 'کل سفارشات', value: '۳۰,۰۹۸', trend: '+۳۰٪', positiveTrend: true, icon: ShoppingBagIcon, iconBgColor: 'bg-blue-100' },
    { title: 'کل درآمد', value: '۱۰۴,۹۹۰', trend: '+۱۴٪', positiveTrend: true, icon: RevenueIcon, iconBgColor: 'bg-red-100' },
];

const productData: Product[] = [
    { id: 1, name: 'مک‌بوک پرو', image: 'https://i.imgur.com/13V3GGr.png', type: 'لپتاپ', brand: 'اپل', price: 2500, rate: 0.68, status: ProductStatus.Active },
    { id: 2, name: 'آیفون ۱۳ پرو مکس', image: 'https://i.imgur.com/szaLz1Y.png', type: 'موبایل', brand: 'اپل', price: 1200, rate: 0.68, status: ProductStatus.Pending },
    { id: 3, name: 'ایرپاد ۳ اپل', image: 'https://i.imgur.com/r7y2uzz.png', type: 'ایرپاد', brand: 'اپل', price: 145, rate: 0.68, status: ProductStatus.Active },
    { id: 4, name: 'شارژر 20W', image: 'https://i.imgur.com/49p4Gr3.png', type: 'شارژر', brand: 'اپل', price: 25, rate: 0.68, status: ProductStatus.Active },
];

const MainContent: React.FC = () => {
    return (
        <div className="grid grid-cols-12 gap-6">
            {/* Left Column */}
            <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {kpiData.map(kpi => <KpiCard key={kpi.title} {...kpi} />)}
                </div>
                <SalesAnalyticsChart />
                <ProductList products={productData} />
            </div>

            {/* Right Column */}
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
                <NewUsersChart />
                <CustomerSatisfactionChart />
                <SalesMap />
            </div>
        </div>
    );
};

export default MainContent;
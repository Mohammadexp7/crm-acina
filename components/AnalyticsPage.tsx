import React from 'react';
import KpiCard from './KpiCard';
import TrafficSourceChart from './TrafficSourceChart';
import TopPagesTable from './TopPagesTable';
import UserGeoChart from './UserGeoChart';
import UsersIcon from './icons/UsersIcon';
import ClockIcon from './icons/ClockIcon';
import BounceRateIcon from './icons/BounceRateIcon';
import { KpiData } from '../types';

const analyticsKpiData: KpiData[] = [
    { title: 'کل کاربران', value: '۱۱,۳۹۰', trend: '+۱۲٪', positiveTrend: true, icon: UsersIcon, iconBgColor: 'bg-green-100' },
    { title: 'میانگین زمان جلسه', value: '۲دقیقه و ۳۸ثانیه', trend: '-۳٪', positiveTrend: false, icon: ClockIcon, iconBgColor: 'bg-yellow-100' },
    { title: 'نرخ پرش', value: '۴۵.۶٪', trend: '+۵٪', positiveTrend: false, icon: BounceRateIcon, iconBgColor: 'bg-purple-100' },
];

const AnalyticsPage: React.FC = () => {
    return (
        <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {analyticsKpiData.map(kpi => <KpiCard key={kpi.title} {...kpi} />)}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <TrafficSourceChart />
                </div>
                <div className="lg:col-span-2">
                    <UserGeoChart />
                </div>
            </div>
            <div>
                <TopPagesTable />
            </div>
        </div>
    );
};

export default AnalyticsPage;

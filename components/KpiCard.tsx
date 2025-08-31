import React from 'react';
import { KpiData } from '../types';

const KpiCard: React.FC<KpiData> = ({ title, value, trend, positiveTrend, icon: Icon, iconBgColor }) => {
    const trendColor = positiveTrend ? 'text-green-500' : 'text-red-500';
    const TrendIcon = () => (
        <svg className={`w-4 h-4 mr-1 ${positiveTrend ? '' : 'transform rotate-180'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
        </svg>
    );
    
    const isRevenue = title === 'کل درآمد';

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm flex items-start justify-between">
            <div className="flex flex-col">
                <p className="text-sm text-text-light">{title}</p>
                <p className="text-3xl font-bold text-text-dark mt-2 flex items-baseline">
                    {value}
                    {isRevenue && <span className="text-2xl font-medium mr-1.5">تومان</span>}
                </p>
                <div className={`mt-2 flex items-center text-sm font-semibold ${trendColor}`}>
                    <TrendIcon />
                    <span>{trend}</span>
                </div>
            </div>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${iconBgColor}`}>
                <Icon className="w-6 h-6 text-primary" />
            </div>
        </div>
    );
};

export default KpiCard;
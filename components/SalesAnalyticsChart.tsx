import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { SalesAnalyticData } from '../types';

const data: SalesAnalyticData[] = [
  { name: 'شنبه', revenue: 2300, order: 3400 },
  { name: '۱شنبه', revenue: 2900, order: 2600 },
  { name: '۲شنبه', revenue: 3500, order: 2100 },
  { name: '۳شنبه', revenue: 2800, order: 2200 },
  { name: '۴شنبه', revenue: 2000, order: 3000 },
  { name: '۵شنبه', revenue: 3800, order: 2100 },
  { name: 'جمعه', revenue: 2200, order: 2500 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-sm">
          <p className="label font-semibold text-sm text-text-dark">{label}</p>
          <p className="text-xs text-primary">{`درآمد : ${payload[0].value.toLocaleString()} تومان`}</p>
          <p className="text-xs text-secondary">{`سفارش : ${payload[1].value}`}</p>
        </div>
      );
    }
    return null;
};


const SalesAnalyticsChart: React.FC = () => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-text-dark">تحلیل فروش</h3>
                <select className="border-none bg-gray-100 rounded-md text-sm p-2 focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>این هفته</option>
                    <option>این ماه</option>
                </select>
            </div>
            <div style={{ width: '100%', height: 300 }} dir="ltr">
                <ResponsiveContainer>
                    <BarChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 5 }} barSize={10}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" tick={{ fontSize: 12, fontFamily: 'Vazirmatn' }} stroke="#8A92A6" axisLine={false} tickLine={false} />
                        <YAxis tickFormatter={(value) => `${value/1000}k`} tick={{ fontSize: 12, fontFamily: 'Vazirmatn' }} stroke="#8A92A6" axisLine={false} tickLine={false} />
                        <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(77, 124, 254, 0.1)'}} />
                        <Legend wrapperStyle={{ fontFamily: 'Vazirmatn', fontSize: '14px', direction: 'rtl' }}
                            formatter={(value) => <span className="text-text-light">{value === 'revenue' ? 'درآمد' : 'سفارش'}</span>}
                        />
                        <Bar dataKey="revenue" fill="#4D7CFE" radius={[10, 10, 0, 0]} />
                        <Bar dataKey="order" fill="#3DCD9A" radius={[10, 10, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default SalesAnalyticsChart;
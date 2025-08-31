import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { TrafficSourceData } from '../types';

const data: TrafficSourceData[] = [
    { name: 'مستقیم', value: 45, color: '#4D7CFE' },
    { name: 'جستجوی ارگانیک', value: 30, color: '#3DCD9A' },
    { name: 'ارجاعی', value: 15, color: '#FF9900' },
    { name: 'شبکه‌های اجتماعی', value: 10, color: '#A061F3' },
];

const renderLegend = (props: any) => {
    const { payload } = props;
    return (
        <ul className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4">
            {payload.map((entry: any, index: number) => (
                <li key={`item-${index}`} className="flex items-center truncate">
                    <span className="w-2.5 h-2.5 rounded-full ml-2 flex-shrink-0" style={{ backgroundColor: entry.color }}></span>
                    <span className="text-sm text-text-light">{entry.payload.name}</span>
                    <span className="text-sm font-semibold text-text-dark mr-auto">{`${entry.payload.value}%`}</span>
                </li>
            ))}
        </ul>
    );
};

const TrafficSourceChart: React.FC = () => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm h-full">
            <h3 className="text-lg font-bold text-text-dark">منابع ترافیک</h3>
            <div style={{ width: '100%', height: 200 }} className="my-4">
                <ResponsiveContainer>
                    <PieChart>
                        <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5} dataKey="value" >
                            {data.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} />)}
                        </Pie>
                         <Tooltip formatter={(value) => `${value}%`} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <Legend content={renderLegend} />
        </div>
    );
};

export default TrafficSourceChart;

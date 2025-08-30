import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { NewUserData } from '../types';

const data: NewUserData[] = [
    { name: 'ایالات متحده', value: 48, color: '#0088FE' },
    { name: 'استرالیا', value: 15, color: '#8A92A6' },
    { name: 'کانادا', value: 12, color: '#3DCD9A' },
    { name: 'چین', value: 25, color: '#A061F3' },
];

const renderLegend = (props: any) => {
    const { payload } = props;
    return (
        <ul className="flex flex-col gap-2 mt-4">
            {payload.map((entry: any, index: number) => (
                <li key={`item-${index}`} className="flex items-center">
                    <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }}></span>
                    <span className="text-sm text-text-light">{entry.payload.name}</span>
                </li>
            ))}
        </ul>
    );
};

const NewUsersChart: React.FC = () => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-text-dark">کاربران جدید</h3>
                <select className="border-none bg-gray-100 rounded-md text-sm p-2 focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>هفتگی</option>
                    <option>ماهانه</option>
                </select>
            </div>
            <div className="grid grid-cols-2 gap-4 items-center">
                <div style={{ width: '100%', height: 160 }}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={70} fill="#8884d8" paddingAngle={5} dataKey="value" >
                                {data.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} />)}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div>
                    <Legend content={renderLegend} />
                </div>
            </div>
            <div className="mt-6 flex justify-between items-center border-t border-border-color pt-4">
                <div className="text-center">
                    <p className="text-sm text-text-light">هفتگی</p>
                    <p className="font-bold text-lg text-text-dark">۲۵٪</p>
                </div>
                <div className="text-center">
                    <p className="text-sm text-text-light">کل کاربران جدید</p>
                    <p className="font-bold text-lg text-text-dark">۳,۶۵۷</p>
                </div>
            </div>
        </div>
    );
};

export default NewUsersChart;
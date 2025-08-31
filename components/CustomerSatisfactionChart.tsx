import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Legend } from 'recharts';
import { CustomerSatisfactionData } from '../types';

const data: CustomerSatisfactionData[] = Array.from({ length: 10 }, (_, i) => ({
    name: `W${i+1}`,
    lastMonth: 20 + Math.random() * 30 + Math.sin(i / 2) * 15,
    thisMonth: 30 + Math.random() * 25 + Math.cos(i / 2) * 20,
}));


const CustomerSatisfactionChart: React.FC = () => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-bold text-text-dark mb-4">رضایت مشتری</h3>
            <div style={{ width: '100%', height: 200 }} dir="ltr">
                <ResponsiveContainer>
                    <LineChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                        <XAxis dataKey="name" tick={{ fontSize: 12, fontFamily: 'IRANSans' }} stroke="#8A92A6" axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 12, fontFamily: 'IRANSans' }} stroke="#8A92A6" axisLine={false} tickLine={false} domain={[0, 100]} />
                        <Legend wrapperStyle={{ fontFamily: 'IRANSans', fontSize: '14px', direction: 'rtl', paddingTop: '20px' }} 
                            formatter={(value) => <span className="text-text-light">{value === 'lastMonth' ? 'ماه گذشته' : 'این ماه'}</span>}
                        />
                        <Line type="monotone" dataKey="lastMonth" stroke="#4D7CFE" strokeWidth={3} dot={false} />
                        <Line type="monotone" dataKey="thisMonth" stroke="#3DCD9A" strokeWidth={3} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default CustomerSatisfactionChart;
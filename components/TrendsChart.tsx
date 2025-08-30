import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return {
        name: date.toLocaleDateString('fa-IR', { month: 'short', day: 'numeric' }),
        visitors: 3000 + Math.sin(i / 4) * 1000 + Math.random() * 500,
        leads: 100 + Math.sin(i / 3) * 40 + Math.random() * 20,
    };
});

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-md shadow-sm">
          <p className="label font-semibold text-sm text-hubspot-text">{label}</p>
          <p className="text-xs text-hubspot-blue">{`بازدیدکنندگان : ${Math.round(payload[0].value)}`}</p>
          <p className="text-xs text-hubspot-orange">{`سرنخ‌ها : ${Math.round(payload[1].value)}`}</p>
        </div>
      );
    }
    return null;
};


const TrendsChart: React.FC = () => {
    return (
        <div style={{ width: '100%', height: 300 }} dir="ltr">
            <ResponsiveContainer>
                <LineChart
                    data={data}
                    margin={{
                        top: 5, right: 20, left: 0, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="name" tick={{ fontSize: 12, fontFamily: 'Vazirmatn' }} stroke="#90a4ae" />
                    <YAxis orientation="right" tick={{ fontSize: 12, fontFamily: 'Vazirmatn' }} stroke="#90a4ae" />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="visitors" stroke="#0067ED" strokeWidth={2} dot={{ r: 2 }} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="leads" stroke="#FF7A59" strokeWidth={2} dot={{ r: 2 }} activeDot={{ r: 6 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TrendsChart;
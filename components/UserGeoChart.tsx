import React from 'react';

const UserGeoChart: React.FC = () => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm h-full">
            <h3 className="text-lg font-bold text-text-dark mb-4">موقعیت جغرافیایی کاربران - ایران</h3>
            <div className="relative h-full min-h-[300px] bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                 <svg className="absolute w-full h-full text-gray-300" fill="currentColor" viewBox="0 0 800 400">
                    <path d="M400 0 C150 0 0 150 0 200 S 150 400 400 400 S 800 250 800 200 S 650 0 400 0 Z M400 20 C600 20 780 150 780 200 S 600 380 400 380 S 20 250 20 200 S 200 20 400 20 Z" />
                    <circle cx="450" cy="150" r="15" className="text-primary opacity-50" />
                    <circle cx="450" cy="150" r="8" className="text-primary" />
                    <circle cx="200" cy="250" r="10" className="text-secondary opacity-50" />
                    <circle cx="200" cy="250" r="5" className="text-secondary" />
                    <circle cx="580" cy="280" r="12" className="text-yellow-400 opacity-50" />
                    <circle cx="580" cy="280" r="6" className="text-yellow-400" />
                     <circle cx="300" cy="120" r="9" className="text-red-400 opacity-50" />
                    <circle cx="300" cy="120" r="4" className="text-red-400" />
                </svg>
                 <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-white/30">
                    <p className="text-text-dark font-semibold">داده‌های کاربران از اصفهان و شهرهای اطراف</p>
                </div>
            </div>
        </div>
    );
};

export default UserGeoChart;
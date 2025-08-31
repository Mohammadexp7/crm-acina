import React from 'react';

const SalesMap: React.FC = () => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-bold text-text-dark mb-4">نقشه فروش - اصفهان</h3>
            <div className="relative h-48 bg-gray-100 rounded-lg overflow-hidden">
                <svg className="absolute w-full h-full text-gray-300" fill="currentColor" viewBox="0 0 800 400">
                    {/* Placeholder world map path */}
                    <path d="M400 0 C150 0 0 150 0 200 S 150 400 400 400 S 800 250 800 200 S 650 0 400 0 Z M400 20 C600 20 780 150 780 200 S 600 380 400 380 S 20 250 20 200 S 200 20 400 20 Z" />
                </svg>
                 <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-white/20">
                    <div className="text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary mx-auto" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <p className="text-text-dark font-semibold mt-2">اصفهان، ایران</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalesMap;
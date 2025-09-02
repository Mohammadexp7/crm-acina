import React from 'react';

interface ComingSoonPageProps {
    pageName: string;
}

const ComingSoonPage: React.FC<ComingSoonPageProps> = ({ pageName }) => {
    return (
        <div className="flex items-center justify-center h-full w-full bg-white rounded-xl shadow-sm">
            <div className="text-center p-8">
                 <svg className="mx-auto h-16 w-16 text-primary-light" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#4D7CFE" strokeWidth="1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="mt-4 text-2xl font-bold text-text-dark">به زودی...</h2>
                <p className="mt-2 text-text-light">
                    ما سخت در حال کار بر روی صفحه <span className="font-semibold text-primary">{pageName}</span> هستیم.
                </p>
                 <p className="mt-1 text-text-light">
                    به زودی با امکانات جدید باز خواهیم گشت!
                </p>
            </div>
        </div>
    );
};

export default ComingSoonPage;
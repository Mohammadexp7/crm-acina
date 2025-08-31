import React from 'react';

interface ComingSoonPageProps {
    pageName: string;
}

const ComingSoonPage: React.FC<ComingSoonPageProps> = ({ pageName }) => {
    return (
        <div className="flex items-center justify-center h-full w-full bg-white rounded-xl shadow-sm">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-text-dark">به زودی...</h2>
                <p className="mt-2 text-text-light">
                    صفحه <span className="font-semibold text-primary">{pageName}</span> در حال ساخت است.
                </p>
            </div>
        </div>
    );
};

export default ComingSoonPage;

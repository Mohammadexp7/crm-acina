import React from 'react';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxPagesToShow = 5;
        
        if (totalPages <= maxPagesToShow + 2) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            pageNumbers.push(1);
            if (currentPage > maxPagesToShow - 1) {
                pageNumbers.push('...');
            }

            let start = Math.max(2, currentPage - 1);
            let end = Math.min(totalPages - 1, currentPage + 1);

            if (currentPage <= 3) {
                end = 4;
            }
            if (currentPage >= totalPages - 2) {
                start = totalPages - 3;
            }

            for (let i = start; i <= end; i++) {
                pageNumbers.push(i);
            }

            if (currentPage < totalPages - (maxPagesToShow-2)) {
                pageNumbers.push('...');
            }
            pageNumbers.push(totalPages);
        }
        return pageNumbers;
    };

    const pages = getPageNumbers();

    return (
        <nav className="flex items-center justify-between">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-text-light bg-white border border-border-color rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <ChevronRightIcon className="w-4 h-4" />
                <span>قبلی</span>
            </button>
            <div className="hidden sm:flex items-center gap-2">
                {pages.map((page, index) =>
                    typeof page === 'number' ? (
                        <button
                            key={index}
                            onClick={() => onPageChange(page)}
                            className={`w-9 h-9 flex items-center justify-center text-sm font-semibold rounded-md ${
                                currentPage === page
                                    ? 'bg-primary text-white'
                                    : 'bg-white text-text-light hover:bg-gray-50'
                            }`}
                        >
                            {page}
                        </button>
                    ) : (
                        <span key={index} className="px-2 text-text-light">...</span>
                    )
                )}
            </div>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-text-light bg-white border border-border-color rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <span>بعدی</span>
                <ChevronLeftIcon className="w-4 h-4" />
            </button>
        </nav>
    );
};

export default Pagination;

import React from 'react';
import ChatIcon from './icons/ChatIcon';
import NotificationIcon from './icons/NotificationIcon';
import ChevronDownIcon from './icons/ChevronDownIcon';

const Header: React.FC = () => {
  return (
    <header className="h-20 bg-white flex items-center justify-between px-8 flex-shrink-0">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-text-dark">نمای کلی فروش</h1>
      </div>
      <div className="flex items-center gap-6 lg:gap-8">
        <div className="relative hidden md:block">
            <svg className="w-5 h-5 text-text-light absolute top-1/2 right-3 transform -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
                type="search"
                placeholder="جستجو..."
                className="pr-10 pl-4 py-2 w-64 bg-background border-none rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
        </div>
        <div className="flex items-center gap-4">
            <button className="text-text-light hover:text-primary">
                <ChatIcon className="w-6 h-6" />
            </button>
            <button className="text-text-light hover:text-primary">
                <NotificationIcon className="w-6 h-6" />
            </button>
        </div>
        <div className="flex items-center gap-3 cursor-pointer">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src="https://picsum.photos/100"
            alt="آواتار کاربر"
          />
          <span className="hidden lg:inline font-semibold text-text-dark">محمد امینی</span>
          <ChevronDownIcon className="w-5 h-5 text-text-light" />
        </div>
      </div>
    </header>
  );
};

export default Header;
import React, { useState, useRef, useEffect } from 'react';
import ChatIcon from './icons/ChatIcon';
import NotificationIcon from './icons/NotificationIcon';
import ChevronDownIcon from './icons/ChevronDownIcon';
import ProfileDropdown from './ProfileDropdown';
import NotificationDropdown from './NotificationDropdown';

interface HeaderProps {
    onMenuClick: () => void;
    onNavigate: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, onNavigate }) => {
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isNotificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const notificationDropdownRef = useRef<HTMLDivElement>(null);

  const unreadNotifications = 3; // Mock data

  const useOutsideAlerter = (ref: React.RefObject<HTMLDivElement>, close: () => void) => {
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          close();
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref, close]);
  }

  useOutsideAlerter(profileDropdownRef, () => setProfileDropdownOpen(false));
  useOutsideAlerter(notificationDropdownRef, () => setNotificationDropdownOpen(false));


  return (
    <header className="h-20 bg-white flex items-center justify-between px-4 sm:px-8 flex-shrink-0 z-20 border-b border-border-color">
      <div className="flex items-center">
        <button
            onClick={onMenuClick}
            className="lg:hidden text-text-light hover:text-primary ml-4"
            aria-label="باز کردن منو"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </button>
        <h1 className="text-xl sm:text-2xl font-bold text-text-dark">نمای کلی فروش</h1>
      </div>
      <div className="flex items-center gap-2 sm:gap-6 lg:gap-8">
        <div className="relative hidden md:block">
            <svg className="w-5 h-5 text-text-light absolute top-1/2 right-3 transform -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
                type="search"
                placeholder="جستجو..."
                className="pr-10 pl-4 py-2 w-48 lg:w-64 bg-background border-none rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
            <button className="text-text-light hover:text-primary p-2">
                <ChatIcon className="w-6 h-6" />
            </button>
            <div className="relative" ref={notificationDropdownRef}>
              <button className="text-text-light hover:text-primary p-2 relative" onClick={() => setNotificationDropdownOpen(prev => !prev)}>
                  <NotificationIcon className="w-6 h-6" />
                  {unreadNotifications > 0 && (
                    <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                  )}
              </button>
              {isNotificationDropdownOpen && <NotificationDropdown unreadCount={unreadNotifications} onClose={() => setNotificationDropdownOpen(false)} />}
            </div>
        </div>
        <div className="relative" ref={profileDropdownRef}>
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setProfileDropdownOpen(prev => !prev)}>
            <img
              className="h-10 w-10 rounded-full object-cover"
              src="https://picsum.photos/100"
              alt="آواتار کاربر"
            />
            <span className="hidden lg:inline font-semibold text-text-dark">محمد امینی</span>
            <ChevronDownIcon className={`w-5 h-5 text-text-light transition-transform ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
          </div>
          {isProfileDropdownOpen && <ProfileDropdown onNavigate={onNavigate} onClose={() => setProfileDropdownOpen(false)} />}
        </div>
      </div>
    </header>
  );
};

export default Header;
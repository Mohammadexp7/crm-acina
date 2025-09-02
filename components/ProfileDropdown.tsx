import React from 'react';
import ProfileIcon from './icons/ProfileIcon';
import SettingsIcon from './SettingsIcon';
import LogoutIcon from './icons/LogoutIcon';

interface ProfileDropdownProps {
  onNavigate: (page: string) => void;
  onClose: () => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ onNavigate, onClose }) => {
  const handleNavigation = (page: string) => {
    onNavigate(page);
    onClose();
  };

  const handleLogout = () => {
    console.log('Logout clicked');
    // Implement logout logic here
    onClose();
  };

  return (
    <div
      className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-border-color z-50 overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-4 border-b border-border-color">
        <div className="flex items-center gap-3">
          <img
            className="h-11 w-11 rounded-full object-cover"
            src="https://picsum.photos/100"
            alt="آواتار کاربر"
          />
          <div>
            <p className="font-semibold text-text-dark text-sm">محمد امینی</p>
            <p className="text-text-light text-xs">mohammad.amini@example.com</p>
          </div>
        </div>
      </div>
      <div className="p-2">
        <button
          onClick={() => handleNavigation('پروفایل')}
          className="w-full text-right flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-text-dark hover:bg-primary-light hover:text-primary transition-colors"
        >
          <ProfileIcon className="w-5 h-5" />
          <span>پروفایل من</span>
        </button>
        <button
          onClick={() => handleNavigation('تنظیمات')}
          className="w-full text-right flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-text-dark hover:bg-primary-light hover:text-primary transition-colors"
        >
          <SettingsIcon className="w-5 h-5" />
          <span>تنظیمات</span>
        </button>
      </div>
      <div className="p-2 border-t border-border-color">
        <button
          onClick={handleLogout}
          className="w-full text-right flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogoutIcon className="w-5 h-5" />
          <span>خروج</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileDropdown;
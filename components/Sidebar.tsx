import React, { useState } from 'react';
import DashboardIcon from './icons/DashboardIcon';
import AnalyticsIcon from './icons/AnalyticsIcon';
import OrderIcon from './OrderIcon';
import ProductIcon from './ProductIcon';
import CustomerIcon from './CustomerIcon';
import SpreadsheetIcon from './SpreadsheetIcon';
import MessageIcon from './MessageIcon';
import SettingsIcon from './SettingsIcon';
import SupportIcon from './SupportIcon';

const AvinaLogo = () => (
    <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg text-white font-bold text-xl">
        A
    </div>
);

const mainNavItems = [
  { name: 'داشبورد', icon: DashboardIcon },
  { name: 'تحلیل', icon: AnalyticsIcon },
  { name: 'سفارش', icon: OrderIcon },
  { name: 'محصول', icon: ProductIcon },
  { name: 'مشتری', icon: CustomerIcon },
  { name: 'صفحه گسترده', icon: SpreadsheetIcon },
];

const helpNavItems = [
  { name: 'پیام', icon: MessageIcon },
  { name: 'تنظیمات', icon: SettingsIcon },
  { name: 'پشتیبانی', icon: SupportIcon },
];

const Sidebar: React.FC = () => {
  const [activeItem, setActiveItem] = useState('داشبورد');

  const NavLink: React.FC<{item: {name: string, icon: React.ComponentType<any>}}> = ({ item }) => {
    const isActive = activeItem === item.name;
    return (
        <li>
            <a
                href="#"
                onClick={(e) => { e.preventDefault(); setActiveItem(item.name); }}
                className={`flex items-center p-3 my-1.5 rounded-lg transition-colors duration-200 relative ${
                  isActive
                    ? 'bg-primary-light text-primary'
                    : 'text-text-light hover:bg-gray-100'
                }`}
            >
                {isActive && <span className="absolute right-0 h-6 w-1 bg-primary rounded-l-md"></span>}
                <item.icon className="w-5 h-5 ml-4" />
                <span className="font-semibold">{item.name}</span>
            </a>
        </li>
    );
  };

  return (
    <aside className="w-64 flex-shrink-0 bg-white flex flex-col p-4">
        <div className="h-16 flex items-center px-2 mb-4">
            <AvinaLogo />
            <span className="mr-3 font-bold text-xl text-text-dark">CRM آوینا</span>
        </div>
      <nav className="flex-1">
        <ul>
          {mainNavItems.map((item) => <NavLink key={item.name} item={item} />)}
        </ul>
        <div className="mt-8">
            <h3 className="px-3 py-2 text-xs font-bold text-text-light uppercase tracking-wider">راهنما</h3>
            <ul>
                {helpNavItems.map((item) => <NavLink key={item.name} item={item} />)}
            </ul>
        </div>
      </nav>
      <div className="mt-auto p-4 bg-primary-light rounded-lg text-center">
        <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-lg text-white font-bold text-2xl mx-auto -mt-10 mb-4">
            A
        </div>
        <h4 className="font-bold text-text-dark">CRM آوینا</h4>
        <p className="text-sm text-text-light mt-1 mb-4">به تمام ویژگی‌های آوینا دسترسی پیدا کنید</p>
        <button className="w-full bg-primary text-white py-2.5 rounded-lg font-semibold hover:bg-opacity-90 transition-colors">
            دریافت پرو
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
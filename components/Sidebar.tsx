import React, { useState, useRef, useEffect } from 'react';
import DashboardIcon from './icons/DashboardIcon';
import AnalyticsIcon from './icons/AnalyticsIcon';
import OrderIcon from './OrderIcon';
import ProductIcon from './ProductIcon';
import CustomerIcon from './CustomerIcon';
import TeamIcon from './icons/TeamIcon';
import MessageIcon from './MessageIcon';
import SettingsIcon from './SettingsIcon';
import SupportIcon from './SupportIcon';
import CampaignsIcon from './icons/CampaignsIcon';
import RocketIcon from './icons/RocketIcon';

const AvinaLogo = () => (
    <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg text-white font-bold text-xl">
        A
    </div>
);

const mainNavItems = [
  { name: 'داشبورد', icon: DashboardIcon },
  { name: 'تحلیل', icon: AnalyticsIcon },
  { name: 'کمپین‌ها', icon: CampaignsIcon },
  { name: 'سفارش', icon: OrderIcon },
  { name: 'محصول', icon: ProductIcon },
  { name: 'مشتری', icon: CustomerIcon },
  { name: 'مدیریت تیم', icon: TeamIcon },
];

const helpNavItems = [
  { name: 'پیام', icon: MessageIcon },
  { name: 'تنظیمات', icon: SettingsIcon },
  { name: 'پشتیبانی', icon: SupportIcon },
];

interface SidebarProps {
    activeItem: string;
    setActiveItem: (item: string) => void;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem, setActiveItem, isOpen, setIsOpen }) => {
    const navListRef = useRef<HTMLUListElement>(null);
    const [indicatorStyle, setIndicatorStyle] = useState({});
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    useEffect(() => {
        const totalItems = mainNavItems.length + helpNavItems.length;
        const totalDuration = (totalItems * 50 + 200) + 500;
        const timer = setTimeout(() => {
            setIsInitialLoad(false);
        }, totalDuration);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            const activeLink = navListRef.current?.querySelector(`[data-name="${activeItem}"]`) as HTMLElement;
            if (activeLink) {
                setIndicatorStyle({
                    height: `${activeLink.offsetHeight}px`,
                    top: `${activeLink.offsetTop}px`,
                });
            }
        }, isInitialLoad ? 600 : 0);
        return () => clearTimeout(timer);
    }, [activeItem, isInitialLoad]);

    const NavLink: React.FC<{item: {name: string, icon: React.ComponentType<any>}, delay: number}> = ({ item, delay }) => {
        const isActive = activeItem === item.name;
        const animationClass = isInitialLoad ? 'animate-slide-in-up' : '';
        const initialStyle = isInitialLoad ? { animationDelay: `${delay}ms`, opacity: 0 } : {};

        return (
            <li 
                data-name={item.name}
                className={animationClass}
                style={initialStyle}
            >
                <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); setActiveItem(item.name); }}
                    className={`flex items-center p-3 my-1 rounded-lg transition-all duration-300 group ${
                      isActive
                        ? 'text-primary'
                        : 'text-text-light hover:text-text-dark hover:bg-gray-50 hover:translate-x-1'
                    }`}
                >
                    <item.icon className={`w-6 h-6 ml-4 transition-transform duration-300 ${isActive ? '' : 'group-hover:scale-110'}`} />
                    <span className="font-semibold text-base">{item.name}</span>
                </a>
            </li>
        );
    };
    
    const totalDelayForHelp = mainNavItems.length * 50 + 100;
    const totalDelayForProCard = (mainNavItems.length + helpNavItems.length + 1) * 50 + 200; // +1 for the separator

    return (
        <>
            <div 
                className={`fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsOpen(false)}
                aria-hidden="true"
            ></div>
            
            <aside className={`fixed lg:static inset-y-0 right-0 w-64 flex-shrink-0 bg-white flex flex-col p-4 z-40 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex-shrink-0 h-16 flex items-center px-2 mb-4">
                    <AvinaLogo />
                    <span className="mr-3 font-bold text-xl text-text-dark">CRM آوینا</span>
                </div>
                
                <div className="flex-1 overflow-y-auto pr-2 -mr-2">
                    <nav className="relative">
                        <div
                            className="absolute right-0 w-full bg-primary-light rounded-lg transition-all duration-500 ease-in-out"
                            style={indicatorStyle}
                        ></div>
                        <ul ref={navListRef} className="relative z-10">
                            {mainNavItems.map((item, index) => <NavLink key={item.name} item={item} delay={index * 50 + 100} />)}
                            
                            <li className={`px-3 py-2 mt-4 text-xs font-bold text-text-light uppercase tracking-wider ${isInitialLoad ? 'animate-slide-in-up' : ''}`} 
                                style={isInitialLoad ? { animationDelay: `${totalDelayForHelp}ms`, opacity: 0 } : {}}>
                                راهنما
                            </li>

                            {helpNavItems.map((item, index) => <NavLink key={item.name} item={item} delay={totalDelayForHelp + 50 + (index * 50)} />)}
                        </ul>
                    </nav>
                </div>
                
                <div 
                    className={`flex-shrink-0 mt-4 p-5 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl text-center overflow-hidden relative ${isInitialLoad ? 'animate-slide-in-up' : ''}`}
                    style={isInitialLoad ? { animationDelay: `${totalDelayForProCard}ms`, opacity: 0 } : {}}
                >
                    <div className="relative z-10">
                        <div className="flex items-center justify-center w-12 h-12 bg-white rounded-lg shadow-md mx-auto mb-4">
                            <RocketIcon className="w-7 h-7 text-primary" />
                        </div>
                        <h4 className="font-bold text-text-dark text-base">ارتقا به نسخه پرو</h4>
                        <p className="text-sm text-text-light mt-1 mb-4">قدرت واقعی کسب‌وکارتان را آزاد کنید.</p>
                        <button 
                            onClick={() => setActiveItem('ارتقا به پرو')}
                            className="w-full bg-primary text-white py-2.5 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/50">
                            دریافت پرو
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;

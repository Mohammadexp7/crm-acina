import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MainContent from './components/MainContent';
import AnalyticsPage from './components/AnalyticsPage';
import ComingSoonPage from './components/ComingSoonPage';
import ProfilePage from './components/ProfilePage';
import SettingsPage from './components/SettingsPage';
import MessagesPage from './components/MessagesPage';
import UpgradePage from './components/UpgradePage';
import CampaignsPage from './components/CampaignsPage';
import OrdersPage from './components/OrdersPage';
import ProductsPage from './components/ProductsPage';
import CustomersPage from './components/CustomersPage';
import TeamManagementPage from './components/TeamManagementPage';
import SupportPage from './components/SupportPage';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState('داشبورد');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleNavigation = (page: string) => {
    setActivePage(page);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const renderContent = () => {
    switch (activePage) {
      case 'داشبورد':
        return <MainContent />;
      case 'تحلیل':
        return <AnalyticsPage />;
      case 'کمپین‌ها':
        return <CampaignsPage />;
      case 'سفارش':
        return <OrdersPage />;
      case 'محصول':
        return <ProductsPage />;
      case 'مشتری':
        return <CustomersPage />;
      case 'مدیریت تیم':
        return <TeamManagementPage />;
      case 'پشتیبانی':
        return <SupportPage />;
      case 'پروفایل':
        return <ProfilePage onNavigate={handleNavigation} />;
      case 'تنظیمات':
        return <SettingsPage />;
      case 'پیام':
        return <MessagesPage />;
      case 'ارتقا به پرو':
        return <UpgradePage />;
      default:
        return <ComingSoonPage pageName={activePage} />;
    }
  };

  return (
    <div className="flex h-screen bg-background text-text-dark font-sans">
      <Sidebar 
        activeItem={activePage} 
        setActiveItem={handleNavigation} 
        isOpen={isSidebarOpen} 
        setIsOpen={setSidebarOpen} 
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!isSidebarOpen)} onNavigate={handleNavigation} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
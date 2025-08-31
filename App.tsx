import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MainContent from './components/MainContent';
import AnalyticsPage from './components/AnalyticsPage';
import ComingSoonPage from './components/ComingSoonPage';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState('داشبورد');

  const renderContent = () => {
    switch (activePage) {
      case 'داشبورد':
        return <MainContent />;
      case 'تحلیل':
        return <AnalyticsPage />;
      default:
        return <ComingSoonPage pageName={activePage} />;
    }
  };

  return (
    <div className="flex h-screen bg-background text-text-dark font-sans">
      <Sidebar activeItem={activePage} setActiveItem={setActivePage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 lg:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
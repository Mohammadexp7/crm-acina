import React, { useState } from 'react';
import UserCircleIcon from './icons/UserCircleIcon';
import NotificationIcon from './icons/NotificationIcon';
import ShieldCheckIcon from './icons/ShieldCheckIcon';
import EyeIcon from './icons/EyeIcon';
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';

type SettingTab = 'حساب کاربری' | 'اعلان‌ها' | 'امنیت' | 'نمایش';

const FormInput: React.FC<{ label: string; type: string; id: string; defaultValue: string; isLtr?: boolean }> = ({ label, type, id, defaultValue, isLtr=false }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-text-light mb-1.5">{label}</label>
        <input
            type={type}
            id={id}
            defaultValue={defaultValue}
            className={`w-full px-4 py-2.5 border border-border-color bg-background rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition ${isLtr ? 'direction-ltr text-left' : ''}`}
        />
    </div>
);

const ToggleSwitch: React.FC<{ label: string; description: string; enabled: boolean; setEnabled: (e: boolean) => void;}> = ({label, description, enabled, setEnabled}) => (
    <div className="flex items-center justify-between">
        <div>
            <h4 className="font-semibold text-text-dark">{label}</h4>
            <p className="text-sm text-text-light">{description}</p>
        </div>
        <button
            type="button"
            className={`${enabled ? 'bg-primary' : 'bg-gray-200'} relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
            onClick={() => setEnabled(!enabled)}
        >
            <span className={`${enabled ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`} />
        </button>
    </div>
);


const SettingsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<SettingTab>('حساب کاربری');
    
    const [emailNotifications, setEmailNotifications] = useState({
        newOrder: true,
        newMessage: true,
        systemUpdates: false
    });
    const [inAppNotifications, setInAppNotifications] = useState({
        newOrder: true,
        newMessage: true,
        systemUpdates: true
    });
    
    const [activeTheme, setActiveTheme] = useState('light');

    const tabs: { name: SettingTab; icon: React.ComponentType<{className?: string}> }[] = [
        { name: 'حساب کاربری', icon: UserCircleIcon },
        { name: 'اعلان‌ها', icon: NotificationIcon },
        { name: 'امنیت', icon: ShieldCheckIcon },
        { name: 'نمایش', icon: EyeIcon },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'حساب کاربری':
                return (
                    <>
                        <p className="text-sm text-text-light mb-6">اطلاعات حساب کاربری خود را در اینجا ویرایش کنید.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormInput label="نام" id="firstName" type="text" defaultValue="محمد" />
                            <FormInput label="نام خانوادگی" id="lastName" type="text" defaultValue="امینی" />
                            <FormInput label="ایمیل" id="email" type="email" defaultValue="mohammad.amini@example.com" isLtr />
                            <FormInput label="شماره تلفن" id="phone" type="tel" defaultValue="09123456789" isLtr />
                        </div>
                    </>
                );
            case 'اعلان‌ها':
                 return (
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-lg font-bold text-text-dark mb-4">اعلان‌های ایمیلی</h3>
                            <div className="space-y-4">
                                <ToggleSwitch label="سفارش جدید" description="وقتی سفارش جدیدی ثبت می‌شود" enabled={emailNotifications.newOrder} setEnabled={(e) => setEmailNotifications(p => ({...p, newOrder: e}))} />
                                <ToggleSwitch label="پیام جدید مشتری" description="وقتی مشتری جدیدی پیام می‌دهد" enabled={emailNotifications.newMessage} setEnabled={(e) => setEmailNotifications(p => ({...p, newMessage: e}))} />
                                <ToggleSwitch label="بروزرسانی‌های سیستم" description="اخبار و بروزرسانی‌های مهم پلتفرم" enabled={emailNotifications.systemUpdates} setEnabled={(e) => setEmailNotifications(p => ({...p, systemUpdates: e}))} />
                            </div>
                        </div>
                         <div className="border-t border-border-color my-8"></div>
                        <div>
                            <h3 className="text-lg font-bold text-text-dark mb-4">اعلان‌های داخل برنامه</h3>
                            <div className="space-y-4">
                               <ToggleSwitch label="سفارش جدید" description="نمایش نوتیفیکیشن در پنل" enabled={inAppNotifications.newOrder} setEnabled={(e) => setInAppNotifications(p => ({...p, newOrder: e}))} />
                                <ToggleSwitch label="پیام جدید مشتری" description="نمایش نوتیفیکیشن در پنل" enabled={inAppNotifications.newMessage} setEnabled={(e) => setInAppNotifications(p => ({...p, newMessage: e}))} />
                                <ToggleSwitch label="بروزرسانی‌های سیستم" description="نمایش نوتیفیکیشن در پنل" enabled={inAppNotifications.systemUpdates} setEnabled={(e) => setInAppNotifications(p => ({...p, systemUpdates: e}))} />
                            </div>
                        </div>
                    </div>
                );
            case 'امنیت':
                return (
                    <div className="space-y-8">
                        <div>
                             <h3 className="text-lg font-bold text-text-dark mb-4">تغییر رمز عبور</h3>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormInput label="رمز عبور فعلی" id="currentPassword" type="password" defaultValue="********" />
                                <div></div> {/* Spacer */}
                                <FormInput label="رمز عبور جدید" id="newPassword" type="password" defaultValue="" />
                                <FormInput label="تایید رمز عبور جدید" id="confirmPassword" type="password" defaultValue="" />
                            </div>
                        </div>
                        <div className="border-t border-border-color my-8"></div>
                        <div>
                            <h3 className="text-lg font-bold text-text-dark mb-4">احراز هویت دو مرحله‌ای (2FA)</h3>
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 p-4 border border-border-color rounded-lg">
                                <div className="bg-gray-100 p-3 rounded-lg">
                                    <svg className="w-16 h-16" viewBox="0 0 100 100"><path d="M10 10 H 90 V 90 H 10 Z M 20 20 H 30 V 30 H 20 Z M 40 20 H 50 V 30 H 40 Z M 60 20 H 80 V 40 H 60 Z M 20 40 H 40 V 60 H 20 Z M 50 40 H 60 V 50 H 50 Z M 70 50 H 90 V 70 H 70 Z M 20 70 H 30 V 80 H 20 Z M 40 70 H 60 V 90 H 40 Z" fill="#23272E" /></svg>
                                </div>
                                <div>
                                    <p className="text-text-light mb-4">برنامه Authenticator خود را با اسکن این کد QR تنظیم کنید.</p>
                                    <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-opacity-90">فعال‌سازی 2FA</button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'نمایش':
                return (
                    <div className="space-y-6">
                        <h3 className="text-lg font-bold text-text-dark">تم برنامه</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div onClick={() => setActiveTheme('light')} className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${activeTheme === 'light' ? 'border-primary' : 'border-border-color'}`}>
                                <div className="flex items-center gap-4">
                                    <SunIcon className={`w-8 h-8 ${activeTheme === 'light' ? 'text-primary' : 'text-text-light'}`} />
                                    <div>
                                        <h4 className="font-semibold text-text-dark">روشن</h4>
                                        <p className="text-sm text-text-light">استفاده از تم پیش‌فرض روشن</p>
                                    </div>
                                </div>
                            </div>
                             <div onClick={() => setActiveTheme('dark')} className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${activeTheme === 'dark' ? 'border-primary' : 'border-border-color'}`}>
                                <div className="flex items-center gap-4">
                                    <MoonIcon className={`w-8 h-8 ${activeTheme === 'dark' ? 'text-primary' : 'text-text-light'}`} />
                                    <div>
                                        <h4 className="font-semibold text-text-dark">تیره</h4>
                                        <p className="text-sm text-text-light">استفاده از تم آرامش‌بخش تیره</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
        }
    }

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-1/4 xl:w-1/5">
                <h2 className="text-2xl font-bold text-text-dark mb-6">تنظیمات</h2>
                <nav className="flex flex-col gap-1">
                    {tabs.map(tab => (
                        <button
                            key={tab.name}
                            onClick={() => setActiveTab(tab.name)}
                            className={`flex items-center gap-3 w-full text-right p-3 rounded-lg transition-colors ${activeTab === tab.name ? 'bg-primary-light text-primary font-semibold' : 'text-text-light hover:bg-gray-100'}`}
                        >
                            <tab.icon className="w-5 h-5" />
                            <span>{tab.name}</span>
                        </button>
                    ))}
                </nav>
            </aside>
            <main className="flex-1">
                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm">
                    <h2 className="text-xl font-bold text-text-dark border-b border-border-color pb-4 mb-6">{activeTab}</h2>
                    {renderContent()}
                </div>
                 <div className="flex justify-end gap-4 mt-8">
                    <button className="px-6 py-2.5 bg-gray-100 text-text-dark rounded-lg font-semibold hover:bg-gray-200 transition">لغو</button>
                    <button className="px-6 py-2.5 bg-primary text-white rounded-lg font-semibold hover:bg-opacity-90 transition">ذخیره تغییرات</button>
                </div>
            </main>
        </div>
    );
};

export default SettingsPage;
import React from 'react';
import { Activity } from '../types';
import ActivityFeed from './ActivityFeed';
import MessageIcon from './MessageIcon';
import SettingsIcon from './SettingsIcon';

const mockActivities: Activity[] = [
    { id: 1, user: 'شما', action: 'محصول', target: 'مک‌بوک پرو', timestamp: '۱۰ دقیقه پیش', avatar: 'https://picsum.photos/100' },
    { id: 2, user: 'شما', action: 'سفارش شماره ۱۲۵۸۹ را', target: 'تایید کردید', timestamp: '۱ ساعت پیش', avatar: 'https://picsum.photos/100' },
    { id: 3, user: 'شما', action: 'یک', target: 'مشتری جدید', timestamp: '۳ ساعت پیش', avatar: 'https://picsum.photos/100' },
];

const InfoItem: React.FC<{label: string, value: string, isLtr?: boolean}> = ({ label, value, isLtr }) => (
    <div>
        <p className="text-sm text-text-light">{label}</p>
        <p className={`font-semibold text-text-dark mt-1 ${isLtr ? 'text-left direction-ltr' : ''}`}>{value}</p>
    </div>
);

interface ProfilePageProps {
    onNavigate: (page: string) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate }) => {
    return (
        <div className="max-w-5xl mx-auto flex flex-col gap-8">
            {/* Profile Header Card */}
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                    <img src="https://picsum.photos/100" alt="آواتار کاربر" className="w-28 h-28 rounded-full object-cover ring-4 ring-primary-light" />
                    <div className="flex-1 text-center sm:text-right">
                        <h1 className="text-3xl font-bold text-text-dark">محمد امینی</h1>
                        <p className="text-text-light mt-1">مدیر فروش</p>
                        <div className="mt-4 flex items-center justify-center sm:justify-start gap-3">
                             <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-opacity-90 transition-colors">
                                <MessageIcon className="w-5 h-5"/>
                                <span>ارسال پیام</span>
                             </button>
                             <button 
                                onClick={() => onNavigate('تنظیمات')}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-text-dark rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors">
                                 <SettingsIcon className="w-5 h-5"/>
                                 <span>ویرایش پروفایل</span>
                             </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-1 flex flex-col gap-8">
                    {/* About Card */}
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h2 className="text-lg font-bold text-text-dark border-b border-border-color pb-3 mb-4">درباره من</h2>
                        <p className="text-text-light text-sm leading-relaxed">
                            مدیر فروش با تجربه با بیش از ۵ سال سابقه در صنعت نرم‌افزار. علاقه‌مند به تکنولوژی، رشد کسب‌وکار و ایجاد روابط پایدار با مشتریان.
                        </p>
                    </div>

                    {/* Contact Info Card */}
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h2 className="text-lg font-bold text-text-dark border-b border-border-color pb-3 mb-4">اطلاعات تماس</h2>
                        <div className="space-y-4">
                            <InfoItem label="آدرس ایمیل" value="mohammad.amini@example.com" isLtr />
                            <InfoItem label="شماره تلفن" value="09123456789" isLtr />
                            <InfoItem label="موقعیت" value="اصفهان، ایران" />
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-2">
                     <div className="bg-white p-6 rounded-xl shadow-sm h-full">
                        <h2 className="text-lg font-bold text-text-dark border-b border-border-color pb-3 mb-4">فعالیت‌های اخیر</h2>
                        <ActivityFeed activities={mockActivities} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
import React from 'react';
import { Notification } from '../types';
import OrderIcon from './OrderIcon';
import MessageIcon from './MessageIcon';
import SettingsIcon from './SettingsIcon';

const mockNotifications: Notification[] = [
    {
        id: 1,
        icon: OrderIcon,
        title: 'سفارش جدید!',
        description: 'سفارش #12589 برای "علی رضایی" ثبت شد.',
        timestamp: '۵ دقیقه پیش',
        isRead: false,
    },
    {
        id: 2,
        icon: MessageIcon,
        title: 'پیام جدید',
        description: 'شما یک پیام جدید از "زهرا احمدی" دارید.',
        timestamp: '۱ ساعت پیش',
        isRead: false,
    },
    {
        id: 3,
        icon: SettingsIcon,
        title: 'بروزرسانی سیستم',
        description: 'پروفایل شما با موفقیت بروزرسانی شد.',
        timestamp: '۳ ساعت پیش',
        isRead: false,
    },
    {
        id: 4,
        icon: OrderIcon,
        title: 'سفارش ارسال شد',
        description: 'سفارش #12580 برای "محمد قاسمی" ارسال شد.',
        timestamp: 'دیروز',
        isRead: true,
    },
];


interface NotificationDropdownProps {
  unreadCount: number;
  onClose: () => void;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ unreadCount, onClose }) => {
  return (
    <div
      className="absolute top-full right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-lg border border-border-color z-50 overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-4 border-b border-border-color flex justify-between items-center">
        <h3 className="font-bold text-text-dark">اعلان‌ها ({unreadCount})</h3>
        <button className="text-sm text-primary font-semibold hover:underline">علامت‌گذاری همه به عنوان خوانده شده</button>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {mockNotifications.map(notification => (
            <div key={notification.id} className={`flex items-start gap-4 p-4 border-b border-border-color last:border-0 hover:bg-gray-50 ${!notification.isRead ? 'bg-primary-light' : ''}`}>
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-background flex items-center justify-center">
                    <notification.icon className="w-5 h-5 text-text-light" />
                </div>
                <div className="flex-1">
                    <p className="font-semibold text-sm text-text-dark">{notification.title}</p>
                    <p className="text-xs text-text-light mt-1">{notification.description}</p>
                    <p className="text-xs text-text-light mt-2">{notification.timestamp}</p>
                </div>
                {!notification.isRead && (
                    <div className="w-2.5 h-2.5 bg-primary rounded-full self-center"></div>
                )}
            </div>
        ))}
      </div>
       <div className="p-2 border-t border-border-color">
         <button className="w-full text-center py-2 text-sm text-primary font-semibold hover:bg-primary-light rounded-md transition-colors">
            مشاهده همه اعلان‌ها
         </button>
      </div>
    </div>
  );
};

export default NotificationDropdown;
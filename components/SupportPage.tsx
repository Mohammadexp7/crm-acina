import React, { useState, useEffect } from 'react';
import TicketModal from './TicketModal';
import BookOpenIcon from './icons/BookOpenIcon';
import SettingsIcon from './SettingsIcon';
import BugIcon from './icons/BugIcon';
import ChevronDownIcon from './icons/ChevronDownIcon';
import TicketIcon from './icons/TicketIcon';
import ChatAltIcon from './icons/ChatAltIcon';
import PhoneIcon from './icons/PhoneIcon';

const faqs = [
    { q: 'چگونه می‌توانم رمز عبور خود را تغییر دهم؟', a: 'شما می‌توانید از طریق صفحه "تنظیمات" و سپس تب "امنیت" اقدام به تغییر رمز عبور خود نمایید.' },
    { q: 'آیا امکان دریافت گزارش‌های خودکار وجود دارد؟', a: 'بله، در نسخه پرو شما می‌توانید گزارش‌های روزانه، هفتگی یا ماهانه را به صورت خودکار در ایمیل خود دریافت کنید.' },
    { q: 'چگونه یک محصول جدید به لیست اضافه کنم؟', a: 'در صفحه "محصولات"، روی دکمه "افزودن محصول جدید" کلیک کرده و فرم مربوطه را تکمیل نمایید.' },
    { q: 'آیا امکان اتصال به سایر نرم‌افزارها وجود دارد؟', a: 'بله، ما از طریق API و وب‌هوک امکان یکپارچه‌سازی با سایر ابزارها را فراهم کرده‌ایم. برای اطلاعات بیشتر به بخش مستندات مراجعه کنید.' },
];

const SupportPage: React.FC = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isTicketModalOpen, setTicketModalOpen] = useState(false);
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const toggleFaq = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    const AnimatedDiv: React.FC<{children: React.ReactNode, delay: string, className?: string}> = ({ children, delay, className }) => (
        <div className={`transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} ${className}`} style={{ transitionDelay: delay }}>
            {children}
        </div>
    );

    return (
        <>
            <div className="max-w-5xl mx-auto">
                <AnimatedDiv delay="0ms">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl md:text-4xl font-bold text-text-dark">مرکز پشتیبانی</h1>
                        <p className="mt-4 max-w-2xl mx-auto text-text-light">سلام! چطور می‌توانیم به شما کمک کنیم؟</p>
                    </div>
                </AnimatedDiv>

                <AnimatedDiv delay="100ms">
                    <div className="max-w-2xl mx-auto mb-12 relative">
                        <svg className="w-5 h-5 text-text-light absolute top-1/2 right-4 transform -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        <input type="search" placeholder="پایگاه دانش ما را جستجو کنید..." className="w-full pr-12 pl-4 py-4 bg-white border border-border-color rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-primary shadow-sm" />
                    </div>
                </AnimatedDiv>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <AnimatedDiv delay="200ms">
                        <div className="bg-white p-6 rounded-xl shadow-sm text-center hover:shadow-lg hover:-translate-y-1 transition-all">
                            <BookOpenIcon className="w-12 h-12 text-primary mx-auto" />
                            <h3 className="font-bold text-text-dark mt-4">شروع به کار</h3>
                            <p className="text-sm text-text-light mt-2">راهنمای جامع برای شروع کار با پلتفرم آوینا.</p>
                        </div>
                    </AnimatedDiv>
                    <AnimatedDiv delay="300ms">
                        <div className="bg-white p-6 rounded-xl shadow-sm text-center hover:shadow-lg hover:-translate-y-1 transition-all">
                            <SettingsIcon className="w-12 h-12 text-primary mx-auto" />
                            <h3 className="font-bold text-text-dark mt-4">مدیریت حساب</h3>
                            <p className="text-sm text-text-light mt-2">اطلاعات پروفایل، امنیت و تنظیمات حساب کاربری.</p>
                        </div>
                    </AnimatedDiv>
                    <AnimatedDiv delay="400ms">
                        <div className="bg-white p-6 rounded-xl shadow-sm text-center hover:shadow-lg hover:-translate-y-1 transition-all">
                            <BugIcon className="w-12 h-12 text-primary mx-auto" />
                            <h3 className="font-bold text-text-dark mt-4">گزارش خطا</h3>
                            <p className="text-sm text-text-light mt-2">با مشکلی مواجه شده‌اید؟ به ما اطلاع دهید.</p>
                        </div>
                    </AnimatedDiv>
                </div>
                
                <AnimatedDiv delay="500ms" className="max-w-3xl mx-auto mb-12">
                    <h2 className="text-2xl font-bold text-text-dark text-center">سوالات متداول</h2>
                    <div className="space-y-4 mt-6">
                        {faqs.map((faq, index) => (
                             <div key={index} className="border border-border-color rounded-lg overflow-hidden bg-white">
                                <button onClick={() => toggleFaq(index)} className="w-full flex justify-between items-center p-4 text-right">
                                    <span className="font-semibold text-text-dark">{faq.q}</span>
                                    <ChevronDownIcon className={`w-5 h-5 text-text-light transition-transform ${openFaqIndex === index ? 'rotate-180' : ''}`} />
                                </button>
                                <div className={`transition-all duration-300 ease-in-out overflow-hidden`} style={{ maxHeight: openFaqIndex === index ? `150px` : '0px' }}>
                                    <p className="text-text-light p-4 pt-0 leading-relaxed">{faq.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </AnimatedDiv>

                <AnimatedDiv delay="600ms" className="text-center bg-white p-8 rounded-xl shadow-sm">
                    <h2 className="text-2xl font-bold text-text-dark">هنوز به کمک نیاز دارید؟</h2>
                    <p className="mt-2 text-text-light">تیم پشتیبانی ما آماده پاسخگویی به شماست.</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                       <button onClick={() => setTicketModalOpen(true)} className="flex w-full sm:w-auto items-center justify-center gap-2 px-5 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-opacity-90 transition-colors">
                           <TicketIcon className="w-5 h-5" />
                           <span>ارسال تیکت</span>
                       </button>
                        <button className="flex w-full sm:w-auto items-center justify-center gap-2 px-5 py-3 bg-gray-100 text-text-dark rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                           <ChatAltIcon className="w-5 h-5" />
                           <span>چت آنلاین</span>
                       </button>
                       <button className="flex w-full sm:w-auto items-center justify-center gap-2 px-5 py-3 bg-gray-100 text-text-dark rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                           <PhoneIcon className="w-5 h-5" />
                           <span>تماس تلفنی</span>
                       </button>
                    </div>
                </AnimatedDiv>
            </div>
            <TicketModal isOpen={isTicketModalOpen} onClose={() => setTicketModalOpen(false)} />
        </>
    );
};

export default SupportPage;
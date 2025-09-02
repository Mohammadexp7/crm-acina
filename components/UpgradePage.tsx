import React from 'react';
import CheckCircleIcon from './icons/CheckCircleIcon';
import CreditCardIcon from './icons/CreditCardIcon';

const UpgradePage: React.FC = () => {

    const proFeatures = [
        'تحلیل‌های پیشرفته فروش',
        'تعداد نامحدود مشتریان و محصولات',
        'گزارش‌گیری خودکار و سفارشی',
        'پشتیبانی ۲۴/۷ اختصاصی',
        'یکپارچه‌سازی با ابزارهای دیگر',
    ];

    const FormInput: React.FC<{ label: string; id: string; placeholder: string; fullWidth?: boolean }> = ({ label, id, placeholder, fullWidth }) => (
        <div className={fullWidth ? 'col-span-2' : ''}>
            <label htmlFor={id} className="block text-sm font-medium text-text-light mb-1.5">{label}</label>
            <input type="text" id={id} placeholder={placeholder} className="w-full px-4 py-2.5 border border-border-color bg-background rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition" />
        </div>
    );

    const FormSelect: React.FC<{ label: string; id: string; children: React.ReactNode }> = ({ label, id, children }) => (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-text-light mb-1.5">{label}</label>
            <select id={id} className="w-full px-4 py-2.5 border border-border-color bg-background rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition appearance-none">
                {children}
            </select>
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
                <span className="text-primary font-semibold">CRM آوینا پرو</span>
                <h1 className="text-3xl md:text-4xl font-bold text-text-dark mt-2">قدرت واقعی کسب‌وکارتان را آزاد کنید</h1>
                <p className="mt-4 max-w-2xl mx-auto text-text-light">با دسترسی به ابزارهای پیشرفته، گزارش‌های دقیق و پشتیبانی ویژه، فروش خود را متحول کنید.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 flex flex-col gap-8">
                    {/* Company Info */}
                    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm">
                        <h2 className="text-xl font-bold text-text-dark border-b border-border-color pb-4 mb-6">۱. اطلاعات شرکت</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <FormInput label="نام شرکت" id="companyName" placeholder="مثال: شرکت آوینا" fullWidth/>
                           <FormSelect label="اندازه شرکت" id="companySize">
                               <option>۱-۱۰ نفر</option>
                               <option>۱۱-۵۰ نفر</option>
                               <option>۵۱-۲۰۰ نفر</option>
                               <option>بیش از ۲۰۰ نفر</option>
                           </FormSelect>
                           <FormSelect label="صنعت" id="industry">
                               <option>تکنولوژی</option>
                               <option>خرده فروشی</option>
                               <option>خدمات مالی</option>
                               <option>سلامت</option>
                           </FormSelect>
                           <FormInput label="وب‌سایت" id="website" placeholder="https://example.com" fullWidth />
                        </div>
                    </div>

                    {/* Billing Info */}
                    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm">
                        <h2 className="text-xl font-bold text-text-dark border-b border-border-color pb-4 mb-6">۲. اطلاعات پرداخت</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormInput label="نام دارنده کارت" id="cardHolder" placeholder="محمد امینی" fullWidth />
                            <div className="col-span-2">
                                <label htmlFor="cardNumber" className="block text-sm font-medium text-text-light mb-1.5">شماره کارت</label>
                                <div className="relative">
                                    <input type="text" id="cardNumber" placeholder="•••• •••• •••• ••••" className="w-full pl-12 pr-4 py-2.5 border border-border-color bg-background rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition direction-ltr text-left" />
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <CreditCardIcon className="w-6 h-6 text-text-light" />
                                    </div>
                                </div>
                            </div>
                            <FormInput label="تاریخ انقضا" id="expiryDate" placeholder="MM / YY" />
                            <FormInput label="CVC" id="cvc" placeholder="•••" />
                        </div>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-xl shadow-sm sticky top-8">
                        <h3 className="text-lg font-bold text-text-dark border-b border-border-color pb-3 mb-4">خلاصه سفارش</h3>
                        <div className="flex justify-between items-center">
                            <p className="text-text-dark font-semibold">طرح آوینا پرو (سالیانه)</p>
                            <p className="text-text-dark font-bold text-lg">۱,۲۰۰,۰۰۰ <span className="text-sm font-normal">تومان</span></p>
                        </div>
                        <p className="text-xs text-text-light mt-1">صورتحساب به صورت سالیانه صادر می‌شود.</p>

                        <div className="border-t border-border-color my-4"></div>
                        
                        <ul className="space-y-3 mb-6">
                            {proFeatures.map(feature => (
                                <li key={feature} className="flex items-start gap-3">
                                    <CheckCircleIcon className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5"/>
                                    <span className="text-sm text-text-light">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <button className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors text-base">
                            تکمیل پرداخت و ارتقا
                        </button>
                        <p className="text-xs text-text-light text-center mt-3">با کلیک، شما با شرایط خدمات ما موافقت می‌کنید.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpgradePage;

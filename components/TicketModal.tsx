import React from 'react';
import PaperClipIcon from './icons/PaperClipIcon';

interface TicketModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const TicketModal: React.FC<TicketModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle ticket submission logic here
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b border-border-color flex justify-between items-center">
                    <h2 className="text-xl font-bold text-text-dark">ارسال تیکت جدید</h2>
                    <button onClick={onClose} className="text-text-light hover:text-text-dark">&times;</button>
                </div>
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="department" className="block text-sm font-medium text-text-light mb-1.5">بخش</label>
                            <select id="department" className="w-full px-4 py-2.5 border border-border-color bg-background rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition">
                                <option>پشتیبانی فنی</option>
                                <option>فروش</option>
                                <option>مالی</option>
                                <option>سایر</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="priority" className="block text-sm font-medium text-text-light mb-1.5">اولویت</label>
                            <select id="priority" className="w-full px-4 py-2.5 border border-border-color bg-background rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition">
                                <option>معمولی</option>
                                <option>مهم</option>
                                <option>فوری</option>
                            </select>
                        </div>
                    </div>
                     <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-text-light mb-1.5">موضوع</label>
                        <input type="text" id="subject" placeholder="موضوع درخواست خود را وارد کنید" className="w-full px-4 py-2.5 border border-border-color bg-background rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition" required />
                    </div>
                     <div>
                        <label htmlFor="description" className="block text-sm font-medium text-text-light mb-1.5">توضیحات</label>
                        <textarea id="description" rows={5} placeholder="مشکل یا سوال خود را با جزئیات کامل شرح دهید..." className="w-full px-4 py-2.5 border border-border-color bg-background rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition" />
                    </div>
                     <div>
                         <label className="block text-sm font-medium text-text-light mb-1.5">ضمیمه</label>
                         <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-border-color border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                <PaperClipIcon className="mx-auto h-10 w-10 text-text-light" />
                                <div className="flex text-sm text-text-light">
                                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary">
                                    <span>فایل خود را آپلود کنید</span>
                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                </label>
                                <p className="mr-1">یا بکشید و رها کنید</p>
                                </div>
                                <p className="text-xs text-text-light">PNG, JPG, GIF up to 10MB</p>
                            </div>
                        </div>
                    </div>
                </form>
                <div className="p-6 border-t border-border-color flex justify-end gap-4">
                    <button type="button" onClick={onClose} className="px-6 py-2.5 bg-gray-100 text-text-dark rounded-lg font-semibold hover:bg-gray-200 transition">لغو</button>
                    <button type="submit" onClick={handleSubmit} className="px-6 py-2.5 bg-primary text-white rounded-lg font-semibold hover:bg-opacity-90 transition">ارسال تیکت</button>
                </div>
            </div>
        </div>
    );
};

export default TicketModal;
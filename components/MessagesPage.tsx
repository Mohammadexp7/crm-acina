import React, { useState } from 'react';
import { Conversation, Message } from '../types';

const mockConversations: Conversation[] = [
    {
        id: 1,
        name: 'علی رضایی',
        avatar: 'https://picsum.photos/seed/1/100',
        lastMessage: 'سلام، ممنون از پیگیری شما. فقط میخواستم...',
        timestamp: '۱۰:۴۵',
        unreadCount: 2,
        messages: [
            { id: 1, sender: 'other', text: 'سلام، وقت بخیر. در مورد سفارش اخیر شما سوال داشتم.', timestamp: '۱۰:۴۰' },
            { id: 2, sender: 'me', text: 'سلام علی جان، بفرمایید در خدمتم.', timestamp: '۱۰:۴۲' },
            { id: 3, sender: 'other', text: 'سلام، ممنون از پیگیری شما. فقط میخواستم بدونم کی به دستم میرسه؟', timestamp: '۱۰:۴۵' },
        ],
    },
    {
        id: 2,
        name: 'زهرا احمدی',
        avatar: 'https://picsum.photos/seed/2/100',
        lastMessage: 'عالیه! پس منتظر خبر شما هستم.',
        timestamp: 'دیروز',
        unreadCount: 0,
        messages: [
            { id: 1, sender: 'other', text: 'عالیه! پس منتظر خبر شما هستم.', timestamp: 'دیروز' }
        ],
    },
    {
        id: 3,
        name: 'پشتیبانی فنی',
        avatar: 'https://picsum.photos/seed/3/100',
        lastMessage: 'مشکل شما در حال بررسی است.',
        timestamp: '۲ روز پیش',
        unreadCount: 0,
        messages: [
             { id: 1, sender: 'other', text: 'مشکل شما در حال بررسی است.', timestamp: '۲ روز پیش' }
        ],
    },
];


const MessagesPage: React.FC = () => {
    const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
    const [selectedConversation, setSelectedConversation] = useState<Conversation>(conversations[0]);
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
        if (newMessage.trim() === '') return;
        const message: Message = {
            id: Date.now(),
            sender: 'me',
            text: newMessage,
            timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
        };
        const updatedConversation = {
            ...selectedConversation,
            messages: [...selectedConversation.messages, message],
        };
        setSelectedConversation(updatedConversation);

        const updatedConversations = conversations.map(c => c.id === updatedConversation.id ? updatedConversation : c);
        setConversations(updatedConversations);
        setNewMessage('');
    };

    return (
        <div className="flex flex-col h-[calc(100vh-120px)] bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="flex-1 flex overflow-hidden">
                {/* Conversations List */}
                <div className={`w-full md:w-1/3 lg:w-1/4 border-l border-border-color flex flex-col transition-all duration-300 ${selectedConversation && 'hidden md:flex'}`}>
                    <div className="p-4 border-b border-border-color">
                        <h2 className="text-xl font-bold text-text-dark">پیام‌ها</h2>
                        <input type="text" placeholder="جستجوی گفتگو..." className="w-full mt-4 px-4 py-2 bg-background border-none rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {conversations.map(convo => (
                            <div
                                key={convo.id}
                                onClick={() => setSelectedConversation(convo)}
                                className={`flex items-center p-4 cursor-pointer border-b border-border-color transition-colors ${selectedConversation.id === convo.id ? 'bg-primary-light' : 'hover:bg-gray-50'}`}
                            >
                                <img src={convo.avatar} alt={convo.name} className="w-12 h-12 rounded-full object-cover" />
                                <div className="mr-4 flex-1 truncate">
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-semibold text-text-dark">{convo.name}</h3>
                                        <span className="text-xs text-text-light">{convo.timestamp}</span>
                                    </div>
                                    <div className="flex justify-between items-center mt-1">
                                        <p className="text-sm text-text-light truncate">{convo.lastMessage}</p>
                                        {convo.unreadCount > 0 && <span className="bg-primary text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">{convo.unreadCount}</span>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Message View */}
                <div className={`flex-1 flex flex-col transition-all duration-300 ${!selectedConversation && 'hidden md:flex'}`}>
                     {selectedConversation ? (
                        <>
                            <div className="flex items-center p-4 border-b border-border-color">
                                <button className="md:hidden text-text-light mr-4" onClick={() => setSelectedConversation(null as any)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                                </button>
                                <img src={selectedConversation.avatar} alt={selectedConversation.name} className="w-10 h-10 rounded-full object-cover" />
                                <h3 className="mr-3 font-bold text-text-dark">{selectedConversation.name}</h3>
                            </div>
                            <div className="flex-1 p-6 overflow-y-auto bg-background space-y-4">
                                {selectedConversation.messages.map(msg => (
                                    <div key={msg.id} className={`flex items-end gap-3 ${msg.sender === 'me' ? 'flex-row-reverse' : ''}`}>
                                        <div className={`p-3 rounded-lg max-w-xs lg:max-w-md ${msg.sender === 'me' ? 'bg-primary text-white rounded-br-none' : 'bg-white text-text-dark rounded-bl-none shadow-sm'}`}>
                                            <p>{msg.text}</p>
                                            <span className={`text-xs mt-1.5 block ${msg.sender === 'me' ? 'text-blue-100' : 'text-text-light'}`}>{msg.timestamp}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-4 bg-white border-t border-border-color">
                                <div className="flex items-center gap-4">
                                    <input
                                        type="text"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                        placeholder="پیام خود را بنویسید..."
                                        className="w-full px-4 py-2.5 bg-background border-none rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                    <button onClick={handleSendMessage} className="bg-primary text-white p-3 rounded-lg hover:bg-opacity-90 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                         <div className="hidden md:flex items-center justify-center h-full text-text-light">
                            <p>یک گفتگو را برای نمایش انتخاب کنید</p>
                         </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MessagesPage;

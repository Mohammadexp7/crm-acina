import React, { useState } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { RoadmapStep } from '../types';
import SparklesIcon from './icons/SparklesIcon';
import ChevronDownIcon from './icons/ChevronDownIcon';

interface CreateCampaignWizardProps {
    onBack: () => void;
}

const RoadmapAccordion: React.FC<{ roadmap: RoadmapStep[] }> = ({ roadmap }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="space-y-4">
            {roadmap.map((step, index) => (
                <div key={index} className="border border-border-color rounded-lg overflow-hidden">
                    <button
                        onClick={() => toggleAccordion(index)}
                        className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 focus:outline-none"
                    >
                        <span className="font-bold text-primary">مرحله {index + 1}: {step.stepTitle}</span>
                        <ChevronDownIcon className={`w-5 h-5 text-text-light transition-transform ${openIndex === index ? 'rotate-180' : ''}`} />
                    </button>
                    {openIndex === index && (
                        <div className="p-4 bg-white">
                            <p className="text-text-light whitespace-pre-wrap leading-relaxed">{step.stepDescription}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};


const CreateCampaignWizard: React.FC<CreateCampaignWizardProps> = ({ onBack }) => {
    const [idea, setIdea] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [roadmap, setRoadmap] = useState<RoadmapStep[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleGenerateRoadmap = async () => {
        if (!idea.trim()) {
            setError('لطفاً ایده کمپین خود را وارد کنید.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setRoadmap(null);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: `شما یک استراتژیست بازاریابی ایمیلی متخصص هستید. بر اساس ایده کمپین زیر، یک نقشه راه دقیق و قدم به قدم از صفر تا صد ایجاد کنید. این نقشه راه باید کاربردی و قابل فهم برای یک صاحب کسب‌وکار باشد. ایده: "${idea}"`,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                stepTitle: {
                                    type: Type.STRING,
                                    description: "عنوان مرحله",
                                },
                                stepDescription: {
                                    type: Type.STRING,
                                    description: "توضیحات کامل و کاربردی برای این مرحله",
                                },
                            },
                        },
                    },
                },
            });
            
            const roadmapData = JSON.parse(response.text);
            setRoadmap(roadmapData);

        } catch (err) {
            console.error(err);
            setError('خطایی در ارتباط با هوش مصنوعی رخ داد. لطفاً دوباره تلاش کنید.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
            <div className="flex items-center gap-4">
                 <button onClick={onBack} className="text-text-light hover:text-primary">
                    <svg xmlns="http://www.w.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                </button>
                <h1 className="text-2xl font-bold text-text-dark">ایجاد کمپین جدید با هوش مصنوعی</h1>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm">
                <div className="mb-6">
                    <label htmlFor="campaignIdea" className="block text-lg font-bold text-text-dark mb-2">۱. ایده کمپین خود را توصیف کنید</label>
                    <p className="text-sm text-text-light mb-4">هرچه جزئیات بیشتری ارائه دهید، نقشه راه دقیق‌تری دریافت خواهید کرد. (مثال: کمپین تخفیف ویژه برای مشتریان وفادار به مناسبت شب یلدا)</p>
                    <textarea
                        id="campaignIdea"
                        rows={4}
                        value={idea}
                        onChange={(e) => setIdea(e.target.value)}
                        placeholder="ایده خود را اینجا بنویسید..."
                        className="w-full px-4 py-2.5 border border-border-color bg-background rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                        disabled={isLoading}
                    />
                </div>
                
                <button
                    onClick={handleGenerateRoadmap}
                    disabled={isLoading}
                    className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all disabled:bg-opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                         <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : (
                        <SparklesIcon className="w-5 h-5" />
                    )}
                    <span>{isLoading ? 'در حال تدوین نقشه راه...' : 'تدوین نقشه راه با هوش مصنوعی'}</span>
                </button>

                {error && <p className="mt-4 text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</p>}
            </div>

            {roadmap && (
                 <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm">
                    <h2 className="text-lg font-bold text-text-dark mb-4">۲. نقشه راه کمپین شما</h2>
                    <RoadmapAccordion roadmap={roadmap} />
                </div>
            )}
        </div>
    );
};

export default CreateCampaignWizard;

import React, { useState } from 'react';
import CreateCampaignWizard from './CreateCampaignWizard';
import { Campaign, CampaignStatus } from '../types';
import PlusIcon from './icons/PlusIcon';
import ThreeDotsIcon from './icons/ThreeDotsIcon';

const mockCampaigns: Campaign[] = [
    { id: 1, name: 'کمپین تخفیف یلدا', startDate: '۱۴۰۲/۰۹/۲۵', status: CampaignStatus.Completed, roi: '+۱۵۰٪' },
    { id: 2, name: 'معرفی محصول جدید', startDate: '۱۴۰۲/۱۱/۰۱', status: CampaignStatus.InProgress, roi: 'N/A' },
    { id: 3, name: 'کمپین وفاداری مشتریان', startDate: '۱۴۰۲/۰۸/۱۰', status: CampaignStatus.Paused, roi: '+۴۵٪' },
];


const StatusBadge: React.FC<{ status: CampaignStatus }> = ({ status }) => {
  const baseClasses = 'px-3 py-1 text-xs font-semibold rounded-md inline-block';
  let colorClasses = '';
  switch (status) {
    case CampaignStatus.Completed:
      colorClasses = 'bg-status-active-bg text-status-active-text';
      break;
    case CampaignStatus.InProgress:
      colorClasses = 'bg-blue-100 text-blue-800';
      break;
    case CampaignStatus.Paused:
      colorClasses = 'bg-status-pending-bg text-status-pending-text';
      break;
  }
  return <span className={`${baseClasses} ${colorClasses}`}>{status}</span>;
};


const CampaignsPage: React.FC = () => {
    const [isCreating, setIsCreating] = useState(false);

    if (isCreating) {
        return <CreateCampaignWizard onBack={() => setIsCreating(false)} />;
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-text-dark">کمپین‌ها</h1>
                <button
                    onClick={() => setIsCreating(true)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
                >
                    <PlusIcon className="w-5 h-5" />
                    <span>ایجاد کمپین جدید</span>
                </button>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-bold text-text-dark mb-4">لیست کمپین‌ها</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="border-b border-border-color">
                                <th scope="col" className="py-3 text-right text-xs font-semibold text-text-light uppercase tracking-wider">نام کمپین</th>
                                <th scope="col" className="px-4 py-3 text-right text-xs font-semibold text-text-light uppercase tracking-wider">تاریخ شروع</th>
                                <th scope="col" className="px-4 py-3 text-right text-xs font-semibold text-text-light uppercase tracking-wider">وضعیت</th>
                                <th scope="col" className="px-4 py-3 text-right text-xs font-semibold text-text-light uppercase tracking-wider">بازگشت سرمایه</th>
                                <th scope="col" className="relative px-4 py-3"><span className="sr-only">اقدام</span></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {mockCampaigns.map((campaign) => (
                                <tr key={campaign.id} className="border-b border-border-color last:border-b-0 hover:bg-gray-50">
                                    <td className="py-4 whitespace-nowrap text-sm font-bold text-text-dark">{campaign.name}</td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-text-light">{campaign.startDate}</td>
                                    <td className="px-4 py-4 whitespace-nowrap"><StatusBadge status={campaign.status} /></td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-text-dark">{campaign.roi}</td>
                                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="text-text-light hover:text-primary"><ThreeDotsIcon /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CampaignsPage;

import React from 'react';
import { Campaign, CampaignStatus } from '../types';

interface CampaignsTableProps {
  campaigns: Campaign[];
}

const StatusBadge: React.FC<{ status: CampaignStatus }> = ({ status }) => {
  const baseClasses = 'px-2.5 py-1 text-xs font-semibold rounded-full inline-flex items-center';
  let colorClasses = '';
  switch (status) {
    case CampaignStatus.Completed:
      colorClasses = 'bg-green-100 text-green-800';
      break;
    case CampaignStatus.InProgress:
      colorClasses = 'bg-blue-100 text-blue-800';
      break;
    case CampaignStatus.Paused:
      colorClasses = 'bg-yellow-100 text-yellow-800';
      break;
  }
  return <span className={`${baseClasses} ${colorClasses}`}>{status}</span>;
};


const CampaignsTable: React.FC<CampaignsTableProps> = ({ campaigns }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              نام کمپین
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              وضعیت
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              بازگشت سرمایه
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {campaigns.map((campaign) => (
            <tr key={campaign.name} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <div className="text-sm font-medium text-hubspot-text">{campaign.name}</div>
                <div className="text-xs text-gray-500">تاریخ شروع: {campaign.startDate}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <StatusBadge status={campaign.status} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">{campaign.roi}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CampaignsTable;

import React from 'react';
import { IconProps } from './IconProps';

const CampaignsIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.257 0 7.168 2.912 7.168 7.168 0 3.396-2.586 6.317-6.082 6.832-3.496.515-6.832-1.926-6.832-5.436 0-1.536.54-3.03 1.5-4.252z" />
    </svg>
);

export default CampaignsIcon;

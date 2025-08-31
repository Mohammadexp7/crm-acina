import React from 'react';
import { IconProps } from './IconProps';

const ClockIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="#FF9900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 6V12L16 14" stroke="#FF9900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export default ClockIcon;

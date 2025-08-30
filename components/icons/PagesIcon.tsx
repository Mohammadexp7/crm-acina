
import React from 'react';
import { IconProps } from './IconProps';

const PagesIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2zm12 4h-4m4 4h-4m4 4h-4" />
    </svg>
);
export default PagesIcon;

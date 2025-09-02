import React from 'react';
import { IconProps } from './IconProps';

const TicketIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.25 21.75h-8.5a2 2 0 0 1-2-2v-4.5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4.5a2 2 0 0 1-2 2h-1.5m-2.5-17.5-3.5 3.5m-3.5 0 3.5 3.5m7-7-3.5 3.5m-3.5 0 3.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export default TicketIcon;
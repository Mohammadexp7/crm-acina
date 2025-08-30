import React from 'react';
import { IconProps } from './IconProps';

const ThreeDotsIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="1" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="19" cy="12" r="1" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="5" cy="12" r="1" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export default ThreeDotsIcon;
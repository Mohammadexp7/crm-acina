import React from 'react';
import { IconProps } from './IconProps';

const ShoppingBagIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.33333 8H17.6667L19.5 21H4.5L6.33333 8Z" fill="#A0B3FF"/>
        <path d="M6.33333 8L4.5 21H19.5L17.6667 8H6.33333Z" stroke="#4D7CFE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 12V8C9 5.23858 10.3431 3 12 3C13.6569 3 15 5.23858 15 8V12" stroke="#4D7CFE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export default ShoppingBagIcon;
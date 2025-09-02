import React from 'react';
import { IconProps } from './IconProps';

const ChatAltIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 8h2a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2v4l-4-4H7a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export default ChatAltIcon;
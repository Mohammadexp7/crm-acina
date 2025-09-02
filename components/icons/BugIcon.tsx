import React from 'react';
import { IconProps } from './IconProps';

const BugIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 8.586a2 2 0 0 0-2.828 0L12 13.758l-5.172-5.172a2 2 0 0 0-2.828 2.828L9.172 16.5l-2.086 2.086a2 2 0 1 0 2.828 2.828L12 19.328l2.086 2.086a2 2 0 1 0 2.828-2.828L14.828 16.5l5.172-5.172a2 2 0 0 0 0-2.828z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 8V4.5a2.5 2.5 0 1 0-5 0V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export default BugIcon;
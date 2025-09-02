import React from 'react';
import { IconProps } from './IconProps';

const SparklesIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m1-9l2.293-2.293a1 1 0 011.414 0l2.293 2.293m-4.586 4.586l2.293 2.293a1 1 0 001.414 0l2.293-2.293m-4.586-4.586l-2.293 2.293a1 1 0 000 1.414l2.293 2.293m4.586-4.586l2.293-2.293a1 1 0 000-1.414l-2.293-2.293m-2.293 2.293l-2.293 2.293" />
    </svg>
);

export default SparklesIcon;

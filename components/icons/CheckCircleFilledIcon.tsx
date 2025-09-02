import React from 'react';
import { IconProps } from './IconProps';

const CheckCircleFilledIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM16.7 9.3c.4.4.4 1 0 1.4l-5 5c-.4.4-1 .4-1.4 0l-2.5-2.5c-.4-.4-.4-1 0-1.4s1-.4 1.4 0L11 14.6l4.3-4.3c.4-.4 1-.4 1.4 0z" fill="currentColor"/>
    </svg>
);

export default CheckCircleFilledIcon;
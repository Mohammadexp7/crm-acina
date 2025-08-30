import React from 'react';
import { IconProps } from './icons/IconProps';

const SettingsIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M19.4 15C19.4 15.33 19.42 15.66 19.46 16L21.54 17.5C21.69 17.62 21.75 17.81 21.69 17.98L19.61 21.5C19.55 21.67 19.38 21.78 19.2 21.75L16.65 20.75C16.11 21.15 15.53 21.48 14.88 21.72L14.5 24.25C14.49 24.43 14.32 24.55 14.13 24.55H9.87C9.68 24.55 9.51 24.43 9.5 24.25L9.12 21.72C8.47 21.48 7.89 21.15 7.35 20.75L4.8 21.75C4.62 21.78 4.45 21.67 4.39 21.5L2.31 17.98C2.25 17.81 2.31 17.62 2.46 17.5L4.54 16C4.58 15.66 4.6 15.33 4.6 15C4.6 14.67 4.58 14.34 4.54 14L2.46 12.5C2.31 12.38 2.25 12.19 2.31 12.02L4.39 8.5C4.45 8.33 4.62 8.22 4.8 8.25L7.35 9.25C7.89 8.85 8.47 8.52 9.12 8.28L9.5 5.75C9.51 5.57 9.68 5.45 9.87 5.45H14.13C14.32 5.45 14.49 5.57 14.5 5.75L14.88 8.28C15.53 8.52 16.11 8.85 16.65 9.25L19.2 8.25C19.38 8.22 19.55 8.33 19.61 8.5L21.69 12.02C21.75 12.19 21.69 12.38 21.54 12.5L19.46 14C19.42 14.34 19.4 14.67 19.4 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export default SettingsIcon;
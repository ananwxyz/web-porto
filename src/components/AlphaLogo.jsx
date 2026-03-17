import React from 'react';

export default function AlphaLogo({ size = 40, color = 'currentColor' }) {
    return (
        <svg 
            width={size} 
            height={size} 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: 'block' }}
        >
            <path 
                d="M85 25C75 25 65 35 55 50C45 65 35 75 25 75C10 75 10 50 25 25C35 15 55 35 65 50C75 65 85 75 95 75" 
                stroke={color} 
                strokeWidth="8" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            />
        </svg>
    );
}

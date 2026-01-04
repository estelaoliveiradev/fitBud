
import React from 'react';
import { AvatarConfig } from '../types';

interface AvatarProps {
  config: AvatarConfig;
  size?: number;
  level?: number;
}

export const Avatar: React.FC<AvatarProps> = ({ config, size = 150, level = 1 }) => {
  const { bodyColor, accessory, expression } = config;

  // Scale based on level (slight growth)
  const scale = 0.8 + (Math.min(level, 50) / 100);

  return (
    <div style={{ width: size, height: size }} className="flex items-center justify-center transition-transform duration-500 hover:scale-110">
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        style={{ transform: `scale(${scale})` }}
      >
        {/* Glow behind */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Body */}
        <circle cx="50" cy="40" r="20" fill={bodyColor} filter="url(#glow)" />
        <rect x="35" y="55" width="30" height="35" rx="10" fill={bodyColor} filter="url(#glow)" />
        
        {/* Arms */}
        <rect x="25" y="60" width="10" height="20" rx="5" fill={bodyColor} transform="rotate(-15 25 60)" />
        <rect x="65" y="60" width="10" height="20" rx="5" fill={bodyColor} transform="rotate(15 65 60)" />

        {/* Eyes */}
        <circle cx="43" cy="35" r="3" fill="white" />
        <circle cx="57" cy="35" r="3" fill="white" />
        <circle cx="43" cy="35" r="1.5" fill="black" />
        <circle cx="57" cy="35" r="1.5" fill="black" />

        {/* Expression */}
        {expression === 'happy' && (
          <path d="M 40 45 Q 50 50 60 45" stroke="black" strokeWidth="2" fill="none" strokeLinecap="round" />
        )}
        {expression === 'determined' && (
          <path d="M 40 47 L 60 47" stroke="black" strokeWidth="2" fill="none" strokeLinecap="round" />
        )}
        {expression === 'exhausted' && (
          <circle cx="50" cy="46" r="2" fill="black" />
        )}

        {/* Accessories */}
        {accessory === 'headband' && (
          <rect x="30" y="25" width="40" height="6" rx="2" fill="#ef4444" />
        )}
        {accessory === 'dumbbells' && (
          <>
            <rect x="15" y="65" width="15" height="5" fill="#64748b" />
            <circle cx="15" cy="67.5" r="4" fill="#334155" />
            <circle cx="30" cy="67.5" r="4" fill="#334155" />
          </>
        )}
        {accessory === 'cape' && (
          <path d="M 30 60 L 10 95 L 90 95 L 70 60 Z" fill="#7c3aed" opacity="0.6" />
        )}
      </svg>
    </div>
  );
};

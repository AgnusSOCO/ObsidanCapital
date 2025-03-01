import React from 'react';

interface ObsidianLogoProps {
  className?: string;
}

export function ObsidianLogo({ className = "h-6 w-6" }: ObsidianLogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="obsidianGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      <path
        d="M50 10L90 30V70L50 90L10 70V30L50 10Z"
        stroke="url(#obsidianGradient)"
        strokeWidth="4"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M50 30L70 40V60L50 70L30 60V40L50 30Z"
        fill="url(#obsidianGradient)"
        opacity="0.8"
      />
      <path
        d="M50 10V30M90 30L70 40M70 60L90 70M50 70V90M10 70L30 60M30 40L10 30"
        stroke="url(#obsidianGradient)"
        strokeWidth="2"
        opacity="0.6"
      />
    </svg>
  );
}
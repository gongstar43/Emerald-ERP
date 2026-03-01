import React from 'react';

interface EmeraldLogoProps {
  className?: string;
  size?: number;
}

export function EmeraldLogo({ className = '', size = 40 }: EmeraldLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Main Emerald Gradient - 3D Effect */}
        <linearGradient id="emerald-main" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#6ee7b7', stopOpacity: 1 }} />
          <stop offset="30%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
          <stop offset="70%" style={{ stopColor: '#059669', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#047857', stopOpacity: 1 }} />
        </linearGradient>
        
        {/* Light Reflection */}
        <linearGradient id="emerald-light" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 0.9 }} />
          <stop offset="50%" style={{ stopColor: '#ffffff', stopOpacity: 0.3 }} />
          <stop offset="100%" style={{ stopColor: '#ffffff', stopOpacity: 0 }} />
        </linearGradient>
        
        {/* Dark Shadow */}
        <linearGradient id="emerald-shadow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#064e3b', stopOpacity: 0.8 }} />
          <stop offset="100%" style={{ stopColor: '#022c22', stopOpacity: 0.9 }} />
        </linearGradient>
        
        {/* Side Facet Gradient */}
        <linearGradient id="emerald-side" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: '#059669', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#047857', stopOpacity: 1 }} />
        </linearGradient>

        {/* Glow Effect */}
        <radialGradient id="emerald-glow">
          <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 0.4 }} />
          <stop offset="100%" style={{ stopColor: '#10b981', stopOpacity: 0 }} />
        </radialGradient>

        {/* Filter for 3D depth */}
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
          <feOffset dx="2" dy="3" result="offsetblur"/>
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3"/>
          </feComponentTransfer>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Glow Background */}
      <circle cx="60" cy="60" r="50" fill="url(#emerald-glow)" opacity="0.6" />

      {/* Main Emerald Gem Shape - 3D */}
      <g filter="url(#shadow)">
        {/* Top Facet (Light) */}
        <path
          d="M 60 15 L 85 35 L 60 45 L 35 35 Z"
          fill="url(#emerald-light)"
          opacity="0.7"
        />
        
        {/* Left Top Facet */}
        <path
          d="M 35 35 L 60 45 L 60 60 L 30 50 Z"
          fill="url(#emerald-main)"
          opacity="0.9"
        />
        
        {/* Right Top Facet */}
        <path
          d="M 60 45 L 85 35 L 90 50 L 60 60 Z"
          fill="url(#emerald-side)"
          opacity="0.85"
        />
        
        {/* Center Main Body */}
        <path
          d="M 30 50 L 60 60 L 90 50 L 85 75 L 60 90 L 35 75 Z"
          fill="url(#emerald-main)"
        />
        
        {/* Left Side Facet (Dark) */}
        <path
          d="M 30 50 L 35 75 L 60 90 L 60 60 Z"
          fill="url(#emerald-shadow)"
          opacity="0.7"
        />
        
        {/* Right Side Facet */}
        <path
          d="M 60 60 L 60 90 L 85 75 L 90 50 Z"
          fill="url(#emerald-side)"
          opacity="0.8"
        />
        
        {/* Bottom Point (Dark) */}
        <path
          d="M 35 75 L 60 90 L 85 75 L 60 105 Z"
          fill="url(#emerald-shadow)"
        />

        {/* Highlight/Shine on top */}
        <ellipse
          cx="55"
          cy="35"
          rx="15"
          ry="8"
          fill="url(#emerald-light)"
          opacity="0.6"
        />
      </g>

      {/* Letter E - Elegant and Bold */}
      <g transform="translate(45, 48)">
        {/* E Letter with 3D effect */}
        <path
          d="M 2 0 L 24 0 L 24 4 L 6 4 L 6 10 L 20 10 L 20 14 L 6 14 L 6 20 L 24 20 L 24 24 L 2 24 Z"
          fill="white"
          opacity="0.95"
        />
        {/* 3D Shadow for E */}
        <path
          d="M 3 1 L 25 1 L 25 5 L 7 5 L 7 11 L 21 11 L 21 15 L 7 15 L 7 21 L 25 21 L 25 25 L 3 25 Z"
          fill="#047857"
          opacity="0.3"
        />
      </g>

      {/* Sparkle Effects */}
      <g opacity="0.8">
        {/* Top sparkle */}
        <circle cx="70" cy="25" r="2" fill="#d1fae5">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/>
        </circle>
        <path d="M 70 20 L 70 30 M 65 25 L 75 25" stroke="#d1fae5" strokeWidth="1">
          <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite"/>
        </path>
        
        {/* Side sparkle */}
        <circle cx="95" cy="55" r="1.5" fill="#a7f3d0">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="3s" repeatCount="indefinite"/>
        </circle>
        
        {/* Bottom sparkle */}
        <circle cx="45" cy="85" r="1.5" fill="#6ee7b7">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" repeatCount="indefinite"/>
        </circle>
      </g>

      {/* Inner Glow Lines */}
      <g opacity="0.4">
        <line x1="60" y1="45" x2="60" y2="90" stroke="#d1fae5" strokeWidth="0.5"/>
        <line x1="35" y1="75" x2="85" y2="75" stroke="#d1fae5" strokeWidth="0.5"/>
      </g>
    </svg>
  );
}

export function EmeraldLogoMini({ className = '', size = 32 }: EmeraldLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="mini-emerald-main" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#34d399', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#047857', stopOpacity: 1 }} />
        </linearGradient>
        
        <linearGradient id="mini-light" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 0.8 }} />
          <stop offset="100%" style={{ stopColor: '#ffffff', stopOpacity: 0 }} />
        </linearGradient>
        
        <filter id="mini-shadow">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
          <feOffset dx="1" dy="2"/>
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3"/>
          </feComponentTransfer>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Mini Gem */}
      <g filter="url(#mini-shadow)">
        {/* Top */}
        <path d="M 50 10 L 70 25 L 50 35 L 30 25 Z" fill="url(#mini-light)" opacity="0.7"/>
        
        {/* Body */}
        <path d="M 30 25 L 50 35 L 70 25 L 75 55 L 50 80 L 25 55 Z" fill="url(#mini-emerald-main)"/>
        
        {/* Bottom */}
        <path d="M 25 55 L 50 80 L 75 55 L 50 90 Z" fill="#047857" opacity="0.8"/>
        
        {/* Highlight */}
        <ellipse cx="48" cy="28" rx="12" ry="6" fill="url(#mini-light)" opacity="0.5"/>
      </g>

      {/* E Letter */}
      <text
        x="50"
        y="55"
        fontFamily="Arial, sans-serif"
        fontSize="28"
        fontWeight="bold"
        fill="white"
        textAnchor="middle"
        dominantBaseline="middle"
        opacity="0.95"
      >
        E
      </text>
    </svg>
  );
}

// Animated version for special occasions
export function EmeraldLogoAnimated({ className = '', size = 40 }: EmeraldLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="anim-emerald-main" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#6ee7b7', stopOpacity: 1 }}>
            <animate attributeName="stop-color" values="#6ee7b7;#34d399;#6ee7b7" dur="3s" repeatCount="indefinite"/>
          </stop>
          <stop offset="50%" style={{ stopColor: '#10b981', stopOpacity: 1 }}/>
          <stop offset="100%" style={{ stopColor: '#047857', stopOpacity: 1 }}/>
        </linearGradient>
        
        <radialGradient id="anim-glow">
          <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 0.5 }}>
            <animate attributeName="stop-opacity" values="0.5;0.8;0.5" dur="2s" repeatCount="indefinite"/>
          </stop>
          <stop offset="100%" style={{ stopColor: '#10b981', stopOpacity: 0 }}/>
        </radialGradient>
      </defs>

      {/* Animated Glow */}
      <circle cx="60" cy="60" r="50" fill="url(#anim-glow)"/>

      {/* Main Gem with rotation animation */}
      <g transform-origin="60 60">
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 60 60"
          to="360 60 60"
          dur="20s"
          repeatCount="indefinite"
        />
        
        <path d="M 60 15 L 85 35 L 60 45 L 35 35 Z" fill="url(#anim-emerald-main)" opacity="0.8"/>
        <path d="M 30 50 L 60 60 L 90 50 L 85 75 L 60 90 L 35 75 Z" fill="url(#anim-emerald-main)"/>
        <path d="M 35 75 L 60 90 L 85 75 L 60 105 Z" fill="#047857"/>
      </g>

      {/* E Letter - stays static */}
      <text
        x="60"
        y="65"
        fontFamily="Arial, sans-serif"
        fontSize="32"
        fontWeight="bold"
        fill="white"
        textAnchor="middle"
        dominantBaseline="middle"
        opacity="0.95"
      >
        E
      </text>

      {/* Sparkles */}
      <g>
        <circle cx="70" cy="25" r="2" fill="white">
          <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite"/>
        </circle>
        <circle cx="95" cy="55" r="2" fill="white">
          <animate attributeName="opacity" values="0;1;0" dur="2s" begin="0.5s" repeatCount="indefinite"/>
        </circle>
        <circle cx="40" cy="85" r="2" fill="white">
          <animate attributeName="opacity" values="0;1;0" dur="1.8s" begin="1s" repeatCount="indefinite"/>
        </circle>
      </g>
    </svg>
  );
}

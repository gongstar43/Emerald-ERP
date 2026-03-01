import React from 'react';

interface EmeraldIconProps {
  className?: string;
  size?: number;
  variant?: 'default' | 'simple' | 'detailed';
}

// نسخة بسيطة وأنيقة - للاستخدام العام
export function EmeraldIcon({ className = '', size = 40, variant = 'default' }: EmeraldIconProps) {
  if (variant === 'simple') {
    return <EmeraldIconSimple className={className} size={size} />;
  }
  
  if (variant === 'detailed') {
    return <EmeraldIconDetailed className={className} size={size} />;
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Premium Gradients */}
        <linearGradient id="gem-top" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d1fae5"/>
          <stop offset="50%" stopColor="#6ee7b7"/>
          <stop offset="100%" stopColor="#34d399"/>
        </linearGradient>
        
        <linearGradient id="gem-left" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981"/>
          <stop offset="100%" stopColor="#059669"/>
        </linearGradient>
        
        <linearGradient id="gem-right" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#059669"/>
          <stop offset="100%" stopColor="#047857"/>
        </linearGradient>
        
        <linearGradient id="gem-bottom" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#047857"/>
          <stop offset="100%" stopColor="#064e3b"/>
        </linearGradient>

        <radialGradient id="gem-shine">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9"/>
          <stop offset="70%" stopColor="#ffffff" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0"/>
        </radialGradient>

        <filter id="gem-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="4"/>
          <feOffset dx="3" dy="5" result="offsetblur"/>
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.4"/>
          </feComponentTransfer>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        <filter id="inner-glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Outer Glow */}
      <ellipse cx="100" cy="120" rx="60" ry="20" fill="#10b981" opacity="0.2" filter="url(#gem-shadow)"/>

      {/* Main Emerald Gem - 3D Realistic */}
      <g filter="url(#gem-shadow)">
        {/* Top Crown Facets */}
        <path
          d="M 100 30 L 130 55 L 100 65 L 70 55 Z"
          fill="url(#gem-top)"
        />
        
        {/* Left Crown Side */}
        <path
          d="M 70 55 L 100 65 L 100 90 L 55 80 Z"
          fill="url(#gem-left)"
        />
        
        {/* Right Crown Side */}
        <path
          d="M 100 65 L 130 55 L 145 80 L 100 90 Z"
          fill="url(#gem-right)"
        />
        
        {/* Left Pavilion (Body) */}
        <path
          d="M 55 80 L 100 90 L 100 160 L 60 140 Z"
          fill="url(#gem-left)"
          opacity="0.85"
        />
        
        {/* Right Pavilion (Body) */}
        <path
          d="M 100 90 L 145 80 L 140 140 L 100 160 Z"
          fill="url(#gem-right)"
          opacity="0.9"
        />
        
        {/* Bottom Point (Culet) */}
        <path
          d="M 60 140 L 100 160 L 140 140 L 100 175 Z"
          fill="url(#gem-bottom)"
        />

        {/* Shine Effect on Top */}
        <ellipse
          cx="95"
          cy="50"
          rx="25"
          ry="12"
          fill="url(#gem-shine)"
          opacity="0.7"
        />

        {/* Inner Light Reflections */}
        <path
          d="M 100 65 L 105 75 L 100 90"
          stroke="#d1fae5"
          strokeWidth="2"
          opacity="0.4"
          fill="none"
        />
      </g>

      {/* Letter E - Bold and Modern */}
      <g filter="url(#inner-glow)">
        <path
          d="M 80 85 L 120 85 L 120 92 L 88 92 L 88 105 L 115 105 L 115 112 L 88 112 L 88 125 L 120 125 L 120 132 L 80 132 Z"
          fill="white"
          stroke="#10b981"
          strokeWidth="1"
          opacity="0.95"
        />
      </g>

      {/* Sparkle Animations */}
      <g className="sparkles">
        <circle cx="120" cy="45" r="3" fill="white" opacity="0.9">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite"/>
          <animate attributeName="r" values="2;3;2" dur="2s" repeatCount="indefinite"/>
        </circle>
        
        <path d="M 120 38 L 120 52 M 113 45 L 127 45" stroke="white" strokeWidth="2" opacity="0.6">
          <animate attributeName="opacity" values="0.2;0.7;0.2" dur="2s" repeatCount="indefinite"/>
        </path>

        <circle cx="150" cy="90" r="2" fill="#d1fae5" opacity="0.8">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="3s" repeatCount="indefinite"/>
        </circle>

        <circle cx="65" cy="120" r="2" fill="#6ee7b7" opacity="0.7">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" repeatCount="indefinite"/>
        </circle>
      </g>
    </svg>
  );
}

// نسخة بسيطة للأيقونات الصغيرة
function EmeraldIconSimple({ className = '', size = 32 }: EmeraldIconProps) {
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
        <linearGradient id="simple-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34d399"/>
          <stop offset="50%" stopColor="#10b981"/>
          <stop offset="100%" stopColor="#047857"/>
        </linearGradient>
        
        <filter id="simple-shadow">
          <feDropShadow dx="1" dy="2" stdDeviation="2" floodOpacity="0.3"/>
        </filter>
      </defs>

      <g filter="url(#simple-shadow)">
        {/* Simple Gem Shape */}
        <path
          d="M 50 10 L 75 30 L 75 60 L 50 85 L 25 60 L 25 30 Z"
          fill="url(#simple-grad)"
        />
        
        {/* Highlight */}
        <ellipse cx="48" cy="28" rx="15" ry="8" fill="white" opacity="0.4"/>
        
        {/* E Letter */}
        <text
          x="50"
          y="52"
          fontFamily="Arial, sans-serif"
          fontSize="28"
          fontWeight="bold"
          fill="white"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          E
        </text>
      </g>
    </svg>
  );
}

// نسخة مفصلة للعروض الكبيرة
function EmeraldIconDetailed({ className = '', size = 60 }: EmeraldIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Ultra Premium Gradients */}
        <linearGradient id="detail-top" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ecfdf5"/>
          <stop offset="30%" stopColor="#a7f3d0"/>
          <stop offset="60%" stopColor="#6ee7b7"/>
          <stop offset="100%" stopColor="#34d399"/>
        </linearGradient>
        
        <linearGradient id="detail-main" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34d399"/>
          <stop offset="30%" stopColor="#10b981"/>
          <stop offset="70%" stopColor="#059669"/>
          <stop offset="100%" stopColor="#047857"/>
        </linearGradient>
        
        <linearGradient id="detail-dark" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#047857"/>
          <stop offset="50%" stopColor="#065f46"/>
          <stop offset="100%" stopColor="#064e3b"/>
        </linearGradient>

        <radialGradient id="detail-shine">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1"/>
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0"/>
        </radialGradient>

        <filter id="detail-shadow">
          <feGaussianBlur in="SourceAlpha" stdDeviation="6"/>
          <feOffset dx="4" dy="8" result="offsetblur"/>
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.5"/>
          </feComponentTransfer>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        <filter id="text-glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Ground Shadow */}
      <ellipse cx="120" cy="210" rx="80" ry="15" fill="#064e3b" opacity="0.3"/>

      {/* Main Gem Structure */}
      <g filter="url(#detail-shadow)">
        {/* Top Table Facet */}
        <path
          d="M 120 30 L 165 60 L 120 75 L 75 60 Z"
          fill="url(#detail-top)"
        />

        {/* Star Facets (8 directions) */}
        {/* Upper Left */}
        <path d="M 75 60 L 120 75 L 120 110 L 65 95 Z" fill="url(#detail-main)" opacity="0.9"/>
        
        {/* Upper Right */}
        <path d="M 120 75 L 165 60 L 175 95 L 120 110 Z" fill="url(#detail-main)" opacity="0.95"/>
        
        {/* Middle Left */}
        <path d="M 65 95 L 120 110 L 120 170 L 70 155 Z" fill="url(#detail-main)" opacity="0.85"/>
        
        {/* Middle Right */}
        <path d="M 120 110 L 175 95 L 170 155 L 120 170 Z" fill="url(#detail-main)" opacity="0.9"/>
        
        {/* Lower Left Pavilion */}
        <path d="M 70 155 L 120 170 L 120 210 L 85 190 Z" fill="url(#detail-dark)" opacity="0.8"/>
        
        {/* Lower Right Pavilion */}
        <path d="M 120 170 L 170 155 L 155 190 L 120 210 Z" fill="url(#detail-dark)" opacity="0.85"/>
        
        {/* Bottom Culet Point */}
        <path d="M 85 190 L 120 210 L 155 190 L 120 225 Z" fill="url(#detail-dark)"/>

        {/* Main Shine/Reflection */}
        <ellipse
          cx="112"
          cy="55"
          rx="35"
          ry="18"
          fill="url(#detail-shine)"
          opacity="0.8"
        />

        {/* Secondary Shine */}
        <ellipse
          cx="130"
          cy="95"
          rx="20"
          ry="10"
          fill="url(#detail-shine)"
          opacity="0.4"
        />

        {/* Internal Reflections */}
        <line x1="120" y1="75" x2="120" y2="170" stroke="#d1fae5" strokeWidth="2" opacity="0.3"/>
        <line x1="75" y1="120" x2="165" y2="120" stroke="#d1fae5" strokeWidth="1.5" opacity="0.25"/>
      </g>

      {/* Letter E with Glow */}
      <g filter="url(#text-glow)">
        <path
          d="M 95 100 L 145 100 L 145 110 L 107 110 L 107 125 L 140 125 L 140 135 L 107 135 L 107 150 L 145 150 L 145 160 L 95 160 Z"
          fill="white"
          stroke="#10b981"
          strokeWidth="2"
          opacity="0.98"
        />
      </g>

      {/* Premium Sparkles */}
      <g className="premium-sparkles">
        <circle cx="150" cy="50" r="4" fill="white">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="1.5s" repeatCount="indefinite"/>
          <animate attributeName="r" values="3;5;3" dur="1.5s" repeatCount="indefinite"/>
        </circle>
        
        <path d="M 150 40 L 150 60 M 140 50 L 160 50" stroke="white" strokeWidth="3" opacity="0.8">
          <animate attributeName="opacity" values="0.3;0.9;0.3" dur="1.5s" repeatCount="indefinite"/>
        </path>

        <circle cx="185" cy="110" r="3" fill="#d1fae5">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/>
        </circle>

        <circle cx="60" cy="145" r="3" fill="#6ee7b7">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="2.2s" repeatCount="indefinite"/>
        </circle>

        <circle cx="175" cy="180" r="2" fill="#a7f3d0">
          <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2.8s" repeatCount="indefinite"/>
        </circle>
      </g>
    </svg>
  );
}

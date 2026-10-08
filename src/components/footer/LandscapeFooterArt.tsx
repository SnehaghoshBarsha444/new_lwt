export function LandscapeFooterArt() {
    return (
      <div className="relative w-full overflow-hidden leading-none -mb-1">
        {/* Sweeping Watercolor Rolling Hills & Architectural Tech Pavilion */}
        <svg
          className="w-full h-[180px] sm:h-[260px] lg:h-[320px] object-cover"
          viewBox="0 0 1440 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="hillGrad1" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#CBB4FF" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#8E7CF6" stopOpacity="0.75" />
            </linearGradient>
            <linearGradient id="hillGrad2" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#8E7CF6" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#153EC1" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="hillGrad3" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#153EC1" />
              <stop offset="100%" stopColor="#0A0F2B" />
            </linearGradient>
          </defs>
  
          {/* Distant Hills Layer 1 */}
          <path
            d="M0 160 Q 320 80 720 130 T 1440 100 L 1440 320 L 0 320 Z"
            fill="url(#hillGrad1)"
          />
  
          {/* Mid Hills Layer 2 with Painterly Trees */}
          <path
            d="M0 190 Q 420 120 860 170 T 1440 150 L 1440 320 L 0 320 Z"
            fill="url(#hillGrad2)"
          />
          {/* Soft Watercolor Tree Silhouettes */}
          <ellipse cx="280" cy="165" rx="36" ry="48" fill="#7B3ED6" fillOpacity="0.8" />
          <ellipse cx="320" cy="175" rx="30" ry="40" fill="#8E7CF6" fillOpacity="0.85" />
          <ellipse cx="1180" cy="155" rx="42" ry="54" fill="#7B3ED6" fillOpacity="0.8" />
          <ellipse cx="1230" cy="165" rx="35" ry="46" fill="#8E7CF6" fillOpacity="0.85" />
  
          {/* 🏛️ The Pastoral Engineering Campus Estate (Vestris House Replica) */}
          <g transform="translate(620, 100)">
            {/* Main House Roof */}
            <path d="M40 70 L100 20 L160 70 Z" fill="#7B3ED6" />
            {/* Main Building Body */}
            <rect x="48" y="70" width="104" height="60" fill="#FFFFFF" />
            {/* Windows with Cyan Reflection */}
            <rect x="60" y="78" width="16" height="20" fill="#2ED2EF" fillOpacity="0.85" />
            <rect x="92" y="78" width="16" height="20" fill="#2ED2EF" fillOpacity="0.85" />
            <rect x="124" y="78" width="16" height="20" fill="#2ED2EF" fillOpacity="0.85" />
            {/* Door */}
            <rect x="92" y="105" width="16" height="25" fill="#0A0F2B" />
            {/* Side Wing */}
            <rect x="152" y="85" width="45" height="45" fill="#F5F7FE" />
            <path d="M152 85 L175 60 L197 85 Z" fill="#8E7CF6" />
            <rect x="162" y="95" width="12" height="15" fill="#2ED2EF" fillOpacity="0.7" />
            {/* Chimney with soft smoke */}
            <rect x="135" y="25" width="10" height="25" fill="#0A0F2B" />
          </g>
  
          {/* Foreground Layer 3 — Transitions completely into Deep Navy Footer */}
          <path
            d="M0 240 Q 360 210 740 230 T 1440 220 L 1440 320 L 0 320 Z"
            fill="url(#hillGrad3)"
          />
        </svg>
      </div>
    );
  }
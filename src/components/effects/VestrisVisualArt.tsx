export function VestrisVisualArt() {
    return (
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {/* 🌿 TOP-LEFT LUSH WATERCOLOR FOLIAGE (Vestris Signature) */}
        <svg
          className="absolute -top-10 -left-12 w-[340px] sm:w-[460px] h-[780px] opacity-85"
          viewBox="0 0 460 780"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="leafGrad1" cx="40%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#2ED2EF" stopOpacity="0.75" />
              <stop offset="50%" stopColor="#8E7CF6" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#7B3ED6" stopOpacity="0.95" />
            </radialGradient>
            <radialGradient id="leafGrad2" cx="30%" cy="20%" r="80%">
              <stop offset="0%" stopColor="#CBB4FF" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#153EC1" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0A0F2B" stopOpacity="0.95" />
            </radialGradient>
            <linearGradient id="branchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0A0F2B" />
              <stop offset="70%" stopColor="#153EC1" />
              <stop offset="100%" stopColor="#7B3ED6" />
            </linearGradient>
          </defs>
  
          {/* Main Branch 1 */}
          <path
            d="M-20 0 Q 80 160 120 320 T 160 560 T 140 760"
            stroke="url(#branchGrad)"
            strokeWidth="11"
            strokeLinecap="round"
            strokeOpacity="0.7"
          />
          {/* Secondary Branches */}
          <path d="M70 200 Q 180 240 250 220" stroke="url(#branchGrad)" strokeWidth="6" strokeLinecap="round" strokeOpacity="0.6" />
          <path d="M110 300 Q 210 330 290 310" stroke="url(#branchGrad)" strokeWidth="5" strokeLinecap="round" strokeOpacity="0.6" />
          <path d="M140 440 Q 240 470 320 440" stroke="url(#branchGrad)" strokeWidth="5" strokeLinecap="round" strokeOpacity="0.5" />
          <path d="M150 580 Q 230 620 310 600" stroke="url(#branchGrad)" strokeWidth="4" strokeLinecap="round" strokeOpacity="0.5" />
  
          {/* Painterly Watercolor Leaves (Layer 1 - Deep/Royal) */}
          <ellipse cx="140" cy="180" rx="42" ry="24" transform="rotate(-25 140 180)" fill="url(#leafGrad2)" />
          <ellipse cx="210" cy="220" rx="48" ry="26" transform="rotate(15 210 220)" fill="url(#leafGrad1)" />
          <ellipse cx="260" cy="205" rx="38" ry="20" transform="rotate(-10 260 205)" fill="url(#leafGrad2)" />
  
          <ellipse cx="180" cy="290" rx="46" ry="25" transform="rotate(-30 180 290)" fill="url(#leafGrad1)" />
          <ellipse cx="250" cy="320" rx="52" ry="28" transform="rotate(20 250 320)" fill="url(#leafGrad2)" />
          <ellipse cx="300" cy="305" rx="36" ry="20" transform="rotate(-5 300 305)" fill="url(#leafGrad1)" />
  
          <ellipse cx="190" cy="420" rx="50" ry="26" transform="rotate(-15 190 420)" fill="url(#leafGrad2)" />
          <ellipse cx="270" cy="455" rx="48" ry="25" transform="rotate(25 270 455)" fill="url(#leafGrad1)" />
          <ellipse cx="330" cy="435" rx="34" ry="18" transform="rotate(-20 330 435)" fill="url(#leafGrad2)" />
  
          <ellipse cx="200" cy="560" rx="44" ry="23" transform="rotate(-35 200 560)" fill="url(#leafGrad1)" />
          <ellipse cx="270" cy="610" rx="46" ry="24" transform="rotate(15 270 610)" fill="url(#leafGrad2)" />
          <ellipse cx="315" cy="595" rx="32" ry="18" transform="rotate(-10 315 595)" fill="url(#leafGrad1)" />
  
          {/* Small Delicate Accent Leaves (Soft Lilac / Cyan Glow) */}
          <ellipse cx="110" cy="130" rx="28" ry="15" transform="rotate(-40 110 130)" fill="#2ED2EF" fillOpacity="0.7" />
          <ellipse cx="280" cy="245" rx="26" ry="14" transform="rotate(45 280 245)" fill="#CBB4FF" fillOpacity="0.8" />
          <ellipse cx="220" cy="350" rx="30" ry="16" transform="rotate(-10 220 350)" fill="#8E7CF6" fillOpacity="0.75" />
          <ellipse cx="320" cy="350" rx="24" ry="13" transform="rotate(30 320 350)" fill="#2ED2EF" fillOpacity="0.65" />
          <ellipse cx="240" cy="495" rx="26" ry="14" transform="rotate(-20 240 495)" fill="#CBB4FF" fillOpacity="0.75" />
        </svg>
  
        {/* 🌿 TOP-RIGHT OVERHANGING BRANCH */}
        <svg
          className="absolute -top-12 -right-10 w-[300px] sm:w-[380px] h-[550px] opacity-75"
          viewBox="0 0 380 550"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M400 -10 Q 280 120 220 250 T 160 480"
            stroke="url(#branchGrad)"
            strokeWidth="9"
            strokeLinecap="round"
            strokeOpacity="0.65"
          />
          <path d="M280 130 Q 180 180 110 160" stroke="url(#branchGrad)" strokeWidth="5" strokeLinecap="round" strokeOpacity="0.5" />
          <path d="M220 260 Q 130 300 70 280" stroke="url(#branchGrad)" strokeWidth="4" strokeLinecap="round" strokeOpacity="0.5" />
  
          <ellipse cx="230" cy="140" rx="44" ry="24" transform="rotate(30 230 140)" fill="url(#leafGrad1)" />
          <ellipse cx="140" cy="165" rx="46" ry="24" transform="rotate(-20 140 165)" fill="url(#leafGrad2)" />
          <ellipse cx="170" cy="260" rx="48" ry="25" transform="rotate(25 170 260)" fill="url(#leafGrad1)" />
          <ellipse cx="100" cy="285" rx="40" ry="20" transform="rotate(-15 100 285)" fill="url(#leafGrad2)" />
          <ellipse cx="120" cy="380" rx="42" ry="22" transform="rotate(35 120 380)" fill="url(#leafGrad1)" />
          <ellipse cx="180" cy="440" rx="36" ry="18" transform="rotate(-30 180 440)" fill="#2ED2EF" fillOpacity="0.6" />
        </svg>
  
        {/* 🌿 MID-PAGE LEFT BRANCH (Behind Section 3 "Never turn down a complex sprint") */}
        <svg
          className="absolute top-[1600px] -left-14 w-[320px] sm:w-[420px] h-[720px] opacity-70"
          viewBox="0 0 420 720"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-20 60 Q 120 200 150 380 T 130 680"
            stroke="url(#branchGrad)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeOpacity="0.6"
          />
          <path d="M90 220 Q 200 240 270 210" stroke="url(#branchGrad)" strokeWidth="5" strokeLinecap="round" strokeOpacity="0.5" />
          <path d="M140 370 Q 230 390 300 360" stroke="url(#branchGrad)" strokeWidth="4" strokeLinecap="round" strokeOpacity="0.5" />
  
          <ellipse cx="180" cy="225" rx="46" ry="24" transform="rotate(-15 180 225)" fill="url(#leafGrad2)" />
          <ellipse cx="250" cy="215" rx="42" ry="22" transform="rotate(20 250 215)" fill="url(#leafGrad1)" />
          <ellipse cx="210" cy="375" rx="48" ry="25" transform="rotate(-10 210 375)" fill="url(#leafGrad1)" />
          <ellipse cx="280" cy="365" rx="38" ry="20" transform="rotate(25 280 365)" fill="url(#leafGrad2)" />
          <ellipse cx="150" cy="520" rx="44" ry="22" transform="rotate(-25 150 520)" fill="#8E7CF6" fillOpacity="0.7" />
          <ellipse cx="200" cy="560" rx="36" ry="18" transform="rotate(15 200 560)" fill="#2ED2EF" fillOpacity="0.6" />
        </svg>
      </div>
    );
  }
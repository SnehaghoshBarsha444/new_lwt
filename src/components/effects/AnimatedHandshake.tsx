"use client";

import { useState } from "react";

export function AnimatedHandshake({ compact = false }: { compact?: boolean }) {
  const [agreed, setAgreed] = useState(false);

  return (
    <div
      onClick={() => setAgreed(!agreed)}
      className={`relative mx-auto select-none cursor-pointer group transition-all duration-300 ${
        compact ? "w-72 h-44" : "w-full max-w-md h-56"
      }`}
    >
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#153EC1]/15 via-[#2ED2EF]/20 to-[#7B3ED6]/20 blur-2xl rounded-full" />

      {/* Ripple Rings Originating from Handshake Connection */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-2 border-[#2ED2EF] anim-pulse-ring pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border border-[#8E7CF6]/60 anim-pulse-ring pointer-events-none [animation-delay:0.8s]" />

      {/* Central SVG Handshake Artwork */}
      <svg
        className="w-full h-full relative z-10 drop-shadow-xl"
        viewBox="0 0 360 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="suitLeft" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0A0F2B" />
            <stop offset="100%" stopColor="#153EC1" />
          </linearGradient>
          <linearGradient id="suitRight" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0A0F2B" />
            <stop offset="100%" stopColor="#7B3ED6" />
          </linearGradient>
          <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFDFC4" />
            <stop offset="100%" stopColor="#F0B58E" />
          </linearGradient>
          <radialGradient id="sparkGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2ED2EF" stopOpacity="1" />
            <stop offset="50%" stopColor="#8E7CF6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#CBB4FF" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 🤝 LEFT HAND (Human Developer) */}
        <g className="anim-hand-left">
          {/* Suit Arm */}
          <path d="M-10 110 L90 85 L108 108 L-10 145 Z" fill="url(#suitLeft)" />
          {/* White Shirt Cuff */}
          <path d="M86 85 L98 83 L114 105 L102 108 Z" fill="#FFFFFF" />
          {/* Wrist & Hand Palm */}
          <path d="M96 84 C 112 80 135 90 152 104 L 140 125 C 122 112 108 108 100 108 Z" fill="url(#skinGrad)" />
          {/* Thumb */}
          <path d="M125 78 C 138 74 150 82 154 94 L 142 98 C 138 90 130 86 122 88 Z" fill="url(#skinGrad)" />
          {/* Fingers Wrapping */}
          <rect x="146" y="96" width="16" height="8" rx="3.5" transform="rotate(18 146 96)" fill="#E0A076" />
          <rect x="142" y="106" width="16" height="8" rx="3.5" transform="rotate(18 142 106)" fill="#D4936B" />
          <rect x="136" y="116" width="16" height="8" rx="3.5" transform="rotate(18 136 116)" fill="#C8855F" />
        </g>

        {/* 🤝 RIGHT HAND (AI Tech Lead / Enterprise) */}
        <g className="anim-hand-right">
          {/* Suit Arm */}
          <path d="M370 110 L270 85 L252 108 L370 145 Z" fill="url(#suitRight)" />
          {/* White Shirt Cuff */}
          <path d="M274 85 L262 83 L246 105 L258 108 Z" fill="#FFFFFF" />
          {/* Wrist & Hand Palm */}
          <path d="M264 84 C 248 80 225 90 208 104 L 220 125 C 238 112 252 108 260 108 Z" fill="url(#skinGrad)" />
          {/* Thumb */}
          <path d="M235 78 C 222 74 210 82 206 94 L 218 98 C 222 90 230 86 238 88 Z" fill="url(#skinGrad)" />
          {/* Clasping Interlock */}
          <rect x="198" y="96" width="16" height="8" rx="3.5" transform="rotate(-18 198 96)" fill="#E0A076" />
          <rect x="202" y="106" width="16" height="8" rx="3.5" transform="rotate(-18 202 106)" fill="#D4936B" />
          <rect x="208" y="116" width="16" height="8" rx="3.5" transform="rotate(-18 208 116)" fill="#C8855F" />
        </g>

        {/* ✨ Central Partnership Energy Flare */}
        <circle cx="180" cy="104" r="28" fill="url(#sparkGlow)" />
        <circle cx="180" cy="104" r="6" fill="#FFFFFF" className="animate-ping" />
      </svg>

      {/* Interactive Status Pill */}
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#CBB4FF] shadow-md flex items-center gap-2 text-xs font-semibold whitespace-nowrap">
        <span className="w-2 h-2 rounded-full bg-[#2ED2EF] animate-pulse" />
        <span className="text-[#0A0F2B]">
          {agreed ? "✓ Partnership Sealed & Verified" : "Click to Seal The Sprint Agreement"}
        </span>
      </div>
    </div>
  );
}
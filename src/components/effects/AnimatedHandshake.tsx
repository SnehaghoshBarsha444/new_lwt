"use client";

import { useState } from "react";

interface AnimatedHandshakeProps {
  compact?: boolean;
}

export function AnimatedHandshake({ compact = false }: AnimatedHandshakeProps) {
  const [agreed, setAgreed] = useState(false);

  return (
    <div
      onClick={() => setAgreed(!agreed)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setAgreed(!agreed);
        }
      }}
      aria-label="Sprint Agreement Handshake. Click to seal partnership."
      className={`relative mx-auto select-none cursor-pointer group transition-all duration-300 focus:outline-hidden flex flex-col items-center justify-center ${
        compact
          ? "w-full max-w-[260px]"
          : "w-full max-w-[340px] sm:max-w-[400px]"
      }`}
    >
      {/* LWT Brand Ambient Glow Halo */}
      <div
        className={`absolute inset-0 rounded-full blur-2xl sm:blur-3xl transition-opacity duration-700 pointer-events-none ${
          agreed
            ? "bg-gradient-to-r from-[#153EC1]/30 via-[#2ED2EF]/35 to-[#7B3ED6]/30 opacity-100"
            : "bg-gradient-to-r from-[#153EC1]/15 via-[#2ED2EF]/20 to-[#7B3ED6]/15 opacity-75 group-hover:opacity-100"
        }`}
      />

      {/* Embedded Lottie Container */}
      <div
        className={`relative z-10 w-full overflow-hidden rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-[1.01] ${
          compact ? "h-[140px]" : "h-[180px] sm:h-[210px]"
        }`}
      >
        <iframe
          src="https://lottie.host/embed/f793922e-083d-47e3-97d0-c99ae406abb1/1VNtBCbjxp.lottie"
          title="LWT Sprint Agreement Handshake Animation"
          className="w-full h-full border-0 pointer-events-none"
          style={{ border: "none" }}
          loading="lazy"
        />
      </div>

      {/* LWT Interactive Status Indicator Pill */}
      <div className="relative z-20 -mt-2 sm:-mt-1 px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-[#CBB4FF] shadow-xs hover:shadow-md transition-all duration-200 flex items-center gap-2 text-[10px] sm:text-[11px] font-semibold whitespace-nowrap">
        <span
          className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
            agreed ? "bg-[#153EC1]" : "bg-[#2ED2EF] animate-pulse"
          }`}
        />
        <span className="text-[#0A0F2B]">
          {agreed ? "✓ Partnership Sealed & Verified" : "Click to Seal The Sprint Agreement"}
        </span>
      </div>
    </div>
  );
}
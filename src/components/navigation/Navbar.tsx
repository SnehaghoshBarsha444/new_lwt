"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { LWTLogo } from "@/components/branding/LWTLogo";

export function Navbar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY;
          // Smoothly interpolate over the first 90px of scroll
          const rawProgress = Math.min(1, Math.max(0, y / 90));
          setScrollProgress(rawProgress);
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cubic-bezier(0.22, 1, 0.36, 1) ease-out curve approximation for physical smoothness
  const p = useMemo(() => {
    return 1 - Math.pow(1 - scrollProgress, 3);
  }, [scrollProgress]);

  // Pricing link now scrolls smoothly to #pricing section on the homepage
  const navLinks = [
    { label: "Product", href: "#workspace" },
    { label: "Sprint Flow", href: "#workflow" },
    { label: "AI Squad", href: "#team" },
    { label: "Pricing", href: "#pricing" },
  ];

  return (
    <>
      {/* Outer Viewport Wrapper (Fixed, Responsive, No Horizontal Overflow) */}
      <header
        className="fixed top-0 left-0 w-full z-50 pointer-events-none transition-all duration-300"
        style={{
          paddingTop: `${(p * 14).toFixed(1)}px`,
          paddingLeft: `${(p * 16).toFixed(1)}px`,
          paddingRight: `${(p * 16).toFixed(1)}px`,
          transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {/* Continuous Morphing Navbar Bar */}
        <div
          className="pointer-events-auto mx-auto relative flex items-center justify-between overflow-hidden transition-all duration-300"
          style={{
            width: "100%",
            maxWidth: p === 0 ? "100%" : "min(1060px, 100%)",
            height: `${(80 - p * 22).toFixed(1)}px`,
            borderRadius: `${(p * 9999).toFixed(1)}px`,
            backgroundColor: `rgba(${Math.round(245 + p * 10)}, ${Math.round(247 + p * 8)}, 254, ${(
              0.95 -
              p * 0.1
            ).toFixed(2)})`,
            backdropFilter: `blur(${Math.round(12 + p * 8)}px) saturate(${Math.round(100 + p * 80)}%)`,
            WebkitBackdropFilter: `blur(${Math.round(12 + p * 8)}px) saturate(${Math.round(100 + p * 80)}%)`,
            borderStyle: "solid",
            borderWidth: "1px",
            borderTopColor: `rgba(203, 180, 255, ${(p * 0.7).toFixed(2)})`,
            borderLeftColor: `rgba(203, 180, 255, ${(p * 0.7).toFixed(2)})`,
            borderRightColor: `rgba(203, 180, 255, ${(p * 0.7).toFixed(2)})`,
            borderBottomColor: `rgba(203, 180, 255, ${(0.35 + p * 0.35).toFixed(2)})`,
            boxShadow:
              p > 0.05
                ? `0 ${(p * 16).toFixed(1)}px ${(p * 36).toFixed(1)}px -12px rgba(21, 62, 193, ${(
                    p * 0.12
                  ).toFixed(2)}), 0 0 0 1px rgba(255, 255, 255, ${(p * 0.95).toFixed(2)}) inset`
                : "none",
            paddingLeft: p === 0 ? "clamp(1.25rem, 4vw, 3.5rem)" : "clamp(1.25rem, 2.5vw, 1.75rem)",
            paddingRight: p === 0 ? "clamp(1.25rem, 4vw, 3.5rem)" : "clamp(1.25rem, 2.5vw, 1.75rem)",
            transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {/* Subtle Ambient Glass Refraction */}
          <div
            className="absolute inset-0 pointer-events-none overflow-hidden rounded-full transition-opacity duration-300"
            style={{ opacity: (p * 0.6).toFixed(2) }}
          >
            <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-[#2ED2EF]/12 to-transparent anim-glass-sheen" />
          </div>

          {/* Logo */}
          <div
            className="origin-left flex-shrink-0 relative z-10 transition-transform duration-300"
            style={{
              transform: `scale(${(1 - p * 0.07).toFixed(3)})`,
              transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <LWTLogo />
          </div>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden md:flex items-center text-xs sm:text-sm font-medium text-[#535D80] relative z-10 transition-all duration-300"
            style={{
              gap: `${Math.round(40 - p * 16)}px`,
              transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="relative py-1 text-[#535D80] hover:text-[#153EC1] transition-colors duration-200 group"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#153EC1] via-[#2ED2EF] to-[#8E7CF6] rounded-full transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Right Action CTA Buttons */}
          <div className="hidden sm:flex items-center gap-3 relative z-10">
            <Link
              href="/sign-in"
              className="font-semibold text-[#0A0F2B] hover:text-[#153EC1] px-2 py-1 transition-colors duration-200 text-xs sm:text-sm"
            >
              Sign In
            </Link>

            <Link
              href="/dashboard"
              className="rounded-full bg-[#0A0F2B] text-white hover:bg-[#153EC1] font-semibold tracking-wide shadow-xs hover:shadow-lg hover:shadow-[#153EC1]/25 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
              style={{
                paddingTop: `${(10 - p * 2).toFixed(1)}px`,
                paddingBottom: `${(10 - p * 2).toFixed(1)}px`,
                paddingLeft: `${(24 - p * 6).toFixed(1)}px`,
                paddingRight: `${(24 - p * 6).toFixed(1)}px`,
                fontSize: "12px",
                transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              Launch Workspace
            </Link>
          </div>

          {/* Mobile Quick Action & Hamburger */}
          <div className="flex sm:hidden items-center gap-2 relative z-10">
            <Link
              href="/dashboard"
              className="px-3 py-1.5 rounded-full bg-[#0A0F2B] text-white text-[11px] font-semibold"
            >
              Launch
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="p-1.5 rounded-lg text-[#0A0F2B] hover:bg-[#CBB4FF]/20 transition-colors pointer-events-auto"
            >
              <svg
                className="w-5 h-5 transition-transform duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Sheet */}
        {mobileMenuOpen && (
          <div className="sm:hidden px-3 pt-2 pointer-events-auto">
            <div className="rounded-2xl bg-white/95 backdrop-blur-2xl border border-[rgba(203,180,255,0.7)] shadow-2xl p-4 space-y-3">
              <nav className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm font-semibold text-[#0A0F2B] hover:text-[#153EC1] py-1 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="pt-3 border-t border-[rgba(203,180,255,0.4)] flex flex-col gap-2">
                <Link
                  href="/sign-in"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-1.5 text-xs font-semibold text-[#0A0F2B]"
                >
                  Sign In
                </Link>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 rounded-full bg-[#0A0F2B] text-white hover:bg-[#153EC1] text-xs font-bold shadow-md transition-colors"
                >
                  Launch Workspace &rarr;
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Spacer to prevent layout shift */}
      <div className="h-20 w-full pointer-events-none" aria-hidden="true" />
    </>
  );
}
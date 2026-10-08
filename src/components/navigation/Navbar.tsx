"use client";

import Link from "next/link";
import { LWTLogo } from "@/components/branding/LWTLogo";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-[#F5F7FE]/85 backdrop-blur-md border-b border-[#CBB4FF]/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <LWTLogo />

        {/* Editorial Navigation */}
        <nav className="hidden md:flex items-center gap-10 text-sm font-medium text-[#535D80]">
          <Link href="#workspace" className="hover:text-[#153EC1] transition-colors">
            Product
          </Link>
          <Link href="#workflow" className="hover:text-[#153EC1] transition-colors">
            Sprint Flow
          </Link>
          <Link href="#team" className="hover:text-[#153EC1] transition-colors">
            AI Squad
          </Link>
          <Link href="/pricing" className="hover:text-[#153EC1] transition-colors">
            Pricing
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <Link
            href="/sign-in"
            className="text-sm font-medium text-[#0A0F2B] hover:text-[#153EC1] px-2 py-1 transition-colors"
          >
            Sign In
          </Link>

          <Link
            href="/dashboard"
            className="px-6 py-2.5 rounded-full bg-[#0A0F2B] text-white hover:bg-[#153EC1] text-xs font-semibold tracking-wide shadow-sm hover:shadow-md transition-all duration-200"
          >
            Launch Workspace
          </Link>
        </div>
      </div>
    </header>
  );
}
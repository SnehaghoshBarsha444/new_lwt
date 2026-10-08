import Link from "next/link";
import { LWTLogo } from "@/components/branding/LWTLogo";

export function Footer() {
  return (
    <footer className="bg-[#0A0F2B] text-white pt-16 pb-12 border-t border-[#153EC1]/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-white/10">
          <div className="md:col-span-2">
            <div className="invert brightness-0">
              <LWTLogo />
            </div>
            <p className="mt-4 text-sm text-[#CBB4FF] max-w-sm font-editorial italic leading-relaxed">
              Warm, dependable workplace simulation software engineered for modern tech talent.
            </p>
            <div className="mt-4 text-xs font-mono text-[#2ED2EF]">
              ● SYSTEM OPERATIONAL · LAKSHYNITI ECOSYSTEM
            </div>
          </div>

          <div>
            <span className="text-xs font-bold text-white uppercase tracking-wider block mb-3">
              Platform
            </span>
            <ul className="space-y-2 text-xs text-[#CBB4FF]/80">
              <li><Link href="#workspace" className="hover:text-white">Sprint Engine</Link></li>
              <li><Link href="#workflow" className="hover:text-white">Execution Flow</Link></li>
              <li><Link href="#squad" className="hover:text-white">AI Workforce</Link></li>
              <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <span className="text-xs font-bold text-white uppercase tracking-wider block mb-3">
              Legal & Trust
            </span>
            <ul className="space-y-2 text-xs text-[#CBB4FF]/80">
              <li><Link href="/policy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
              <li><Link href="/security" className="hover:text-white">Security Overview</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#CBB4FF]/70">
          <p>© 2026 LWT. Built with care by <strong className="text-white">LAKSHYNiTi</strong>.</p>
          <p>An enterprise workplace operating environment.</p>
        </div>
      </div>
    </footer>
  );
}
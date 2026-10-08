import Link from "next/link";

export function LWTLogo() {
  return (
    <Link href="/" className="flex items-center gap-3 group select-none">
      {/* Brand Icon Box */}
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#153EC1] to-[#7B3ED6] flex items-center justify-center shadow-md shadow-[#153EC1]/20 group-hover:scale-105 transition-transform">
        <span className="text-white font-black text-sm tracking-tighter">LWT</span>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className="font-extrabold text-lg tracking-tight text-[#0A0F2B]">
            LWT
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full badge-cyan">
            WORKSPACE
          </span>
        </div>
        <span className="text-[10px] tracking-wider text-[#535D80] font-semibold">
          LET'S WORK TOGETHER <span className="text-[#8E7CF6]">· LAKSHYNiTi</span>
        </span>
      </div>
    </Link>
  );
}
import Link from "next/link";

export function CTASection() {
  return (
    <section className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <div className="space-y-6">
        <h2 className="text-5xl sm:text-7xl lg:text-8xl font-vestris font-normal text-[#0A0F2B] leading-[0.98]">
          Leave the tutorials behind. <br />
          <span className="italic text-[#153EC1]">Focus on genuine execution.</span>
        </h2>

        <p className="max-w-xl mx-auto text-base text-[#58617D] leading-relaxed">
          Whether you are an aspiring developer or transitioning roles, 
          LWT provides the simulated corporate repetitions you need to stand out to employers.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#0A0F2B] hover:bg-[#153EC1] text-white font-medium text-sm shadow-md hover:shadow-lg transition-all"
          >
            Launch LWT Workspace
          </Link>
          <Link
            href="/pricing"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white hover:bg-[#F5F7FE] text-[#0A0F2B] font-medium text-sm border border-[#CBB4FF] shadow-xs transition-all"
          >
            Consult Our Tiers
          </Link>
        </div>
      </div>
    </section>
  );
}
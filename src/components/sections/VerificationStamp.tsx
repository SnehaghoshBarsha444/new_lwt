import { AnimatedHandshake } from "@/components/effects/AnimatedHandshake";

export function VerificationStamp() {
  return (
    <section className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 overflow-hidden">
      <div className="text-center mb-10 sm:mb-14">
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-editorial font-normal text-[#0A0F2B]">
          Automated review, <br />
          <span className="italic text-[#153EC1]">human credibility</span>
        </h2>
        <p className="mt-3 sm:mt-4 text-sm sm:text-base text-[#535D80] max-w-lg mx-auto">
          LWT tackles the biggest barrier in tech hiring — replacing hollow self-reported resumes 
          with cryptographically verifiable execution history.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-center text-center md:text-left">
        {/* Left Column */}
        <div className="space-y-2 sm:space-y-3">
          <h3 className="font-editorial text-xl sm:text-2xl text-[#0A0F2B]">
            A staff engineer reviews every line of code
          </h3>
          <p className="text-xs sm:text-sm text-[#535D80] leading-relaxed">
            LWT operates as your uncompromising senior tech lead. Before any ticket merges, your code is audited 
            for performance, security leaks, and architecture compliance.
          </p>
          <div className="text-xs font-semibold text-[#153EC1]">
            ✓ Real AST & SOLID standards enforced
          </div>
        </div>

        {/* Center Animated Handshake Stamp */}
        <div className="flex justify-center my-4 md:my-0">
          <div className="saas-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 w-full max-w-[320px] flex flex-col items-center justify-center text-center">
            <span className="text-[10px] sm:text-xs font-mono font-bold text-[#7B3ED6] uppercase tracking-wider mb-2">
              OFFICIAL VERIFICATION
            </span>
            <AnimatedHandshake compact={true} />
            <span className="font-editorial text-sm sm:text-base italic text-[#0A0F2B] font-bold mt-2">
              The Execution Contract
            </span>
            <span className="text-[10px] font-mono text-[#535D80]">
              LWT-VERIFIED-PROOF-2026
            </span>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-2 sm:space-y-3">
          <h3 className="font-editorial text-xl sm:text-2xl text-[#0A0F2B]">
            Reclaim your confidence in tech interviews
          </h3>
          <p className="text-xs sm:text-sm text-[#535D80] leading-relaxed">
            By experiencing genuine PR rejections and architectural sprints, 
            you speak with the authority of someone who has shipped production software.
          </p>
          <div className="text-xs font-semibold text-[#153EC1]">
            ✓ Proven track record with letters of recommendation
          </div>
        </div>
      </div>
    </section>
  );
}
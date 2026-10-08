export function WhatIsLWT() {
    return (
      <section id="what-is-lwt" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <span className="text-xs font-mono text-[#00D9D9] uppercase tracking-widest block mb-2">
            WHY LWT EXISTS
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            The Execution Gap <span className="text-[#0878FF]">is Real.</span>
          </h2>
          <p className="mt-3 text-[#D9E2EC] max-w-2xl mx-auto text-sm sm:text-base">
            Bootcamps and courses teach syntax in isolation. They don't prepare you for production PR rejections, 
            merge conflicts, or unblocking cross-functional colleagues.
          </p>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Traditional Learning Trap */}
          <div className="p-8 rounded-2xl bg-[#061426]/50 border border-red-500/20 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-xs font-mono text-red-400 mb-4">
                TRADITIONAL TUTORIAL HELL
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Passive Learning</h3>
              <ul className="space-y-3 text-sm text-[#8B9AAF]">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">✕</span> Following step-by-step videos without architectural thinking.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">✕</span> No code review, no SOLID principles enforcement, no rejected PRs.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">✕</span> Static resume bullets that recruiters know are copied projects.
                </li>
              </ul>
            </div>
          </div>
  
          {/* LWT Simulated Workplace */}
          <div className="p-8 rounded-2xl bg-[#061426] border border-[#0878FF]/40 glow-subtle flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0878FF]/15 border border-[#0878FF]/30 text-xs font-mono text-[#00D9D9] mb-4">
                LWT OPERATING ENVIRONMENT
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Verifiable Execution</h3>
              <ul className="space-y-3 text-sm text-[#D9E2EC]">
                <li className="flex items-start gap-2">
                  <span className="text-[#00D9D9] font-bold">✓</span> Assigned real sprint tickets by an autonomous AI Product Manager.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00D9D9] font-bold">✓</span> Strict code reviews from a demanding AI Tech Lead before PRs merge.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00D9D9] font-bold">✓</span> Auto-generated verifiable portfolio with letters of recommendation.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }
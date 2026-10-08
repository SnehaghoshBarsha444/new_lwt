"use client";

import { useState } from "react";

const STEPS = [
  {
    num: "01",
    title: "AI Product Manager writes production tickets",
    desc: "Marcus Chen translates business milestones into detailed technical sprint tasks with strict acceptance criteria.",
    bullets: ["Auto-generated sprint backlogs", "Dependencies linked directly to your active queue"],
    tag: "PLANNING & BACKLOG",
  },
  {
    num: "02",
    title: "You execute locally inside your native IDE",
    desc: "No shallow web playgrounds. Connect your terminal, pull the branch, write production code, and commit via git.",
    bullets: ["Full TypeScript & architecture autonomy", "Native pull request submission pipeline"],
    tag: "LOCAL RUNTIME",
  },
  {
    num: "03",
    title: "Staff Engineer conducts rigorous code reviews",
    desc: "Sarah Vance inspects your PR line-by-line for SOLID principles, memory leaks, security holes, and concurrency.",
    bullets: ["Blunt, non-sugarcoated architectural feedback", "Direct rejections if PR lacks production readiness"],
    tag: "AST REVIEW GATE",
  },
  {
    num: "04",
    title: "Verifiable portfolio proof generates automatically",
    desc: "Every completed sprint translates into verified metrics and letters of recommendation that replace traditional resumes.",
    bullets: ["Independent verification URL for recruiters", "Audit trail of actual merged pull requests"],
    tag: "VERIFIED LEDGER",
  },
];

export function WorkplaceStoryline() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section id="workflow" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-20 overflow-hidden">
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-6xl font-editorial font-normal text-[#0A0F2B]">
          Hours of work, <br />
          <span className="italic text-[#153EC1]">done in minutes</span>
        </h2>
        <p className="mt-4 text-base text-[#535D80] max-w-xl mx-auto">
          Every automated decision replicates genuine senior engineering culture — 
          you keep total control of your execution.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Interactive Timeline */}
        <div className="lg:col-span-6 relative">
          {/* Vertical Glowing Connector Line */}
          <div className="hidden sm:block absolute left-[38px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-[#153EC1]/30 via-[#2ED2EF]/50 to-[#7B3ED6]/30 pointer-events-none" />
          
          <div className="space-y-4">
            {STEPS.map((step, idx) => {
              const isActive = activeIdx === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveIdx(idx)}
                  className={`p-5 sm:p-6 rounded-2xl cursor-pointer transition-all duration-300 border relative ${
                    isActive
                      ? "bg-white border-2 border-[#153EC1] shadow-lg shadow-[#153EC1]/10 -translate-y-1"
                      : "bg-white/60 border-[#CBB4FF]/40 hover:bg-white hover:border-[#8E7CF6] hover:-translate-y-0.5"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Glowing Step Number Badge */}
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-editorial text-lg italic font-bold flex-shrink-0 transition-colors ${
                        isActive
                          ? "bg-[#153EC1] text-white shadow-md shadow-[#153EC1]/30"
                          : "bg-[#F5F7FE] text-[#7B3ED6] border border-[#CBB4FF]"
                      }`}
                    >
                      {step.num}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className="text-sm sm:text-base font-bold text-[#0A0F2B]">
                          {step.title}
                        </h3>
                        <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#2ED2EF]/15 text-[#153EC1]">
                          {step.tag}
                        </span>
                      </div>

                      <p className="mt-1 text-xs text-[#535D80] leading-relaxed">
                        {step.desc}
                      </p>

                      {isActive && (
                        <div className="mt-3 pt-3 border-t border-[#CBB4FF]/40 space-y-1 text-[11px] font-semibold text-[#153EC1]">
                          {step.bullets.map((b, bIdx) => (
                            <div key={bIdx} className="flex items-center gap-1.5">
                              <span className="text-[#2ED2EF]">✓</span> {b}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Execution Display */}
        <div className="lg:col-span-6">
          <div className="saas-card rounded-3xl p-6 sm:p-8 min-h-[380px] flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-[#FFFFFF] to-[#F5F7FE]">
            {/* Visual Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#CBB4FF]/40 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2ED2EF] animate-pulse" />
                <span className="font-bold text-[#7B3ED6] uppercase tracking-wider font-mono text-[11px]">
                  STEP {STEPS[activeIdx].num} // REAL-TIME EXECUTION CANVASES
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#153EC1]/10 text-[#153EC1] font-mono text-[10px] font-bold">
                PHASE 0{activeIdx + 1} ACTIVE
              </span>
            </div>

            {/* Central Visual Focus */}
            <div className="my-6 space-y-4">
              <span className="font-editorial text-2xl sm:text-3xl lg:text-4xl italic text-[#0A0F2B] block leading-snug">
                "{STEPS[activeIdx].title}"
              </span>
              <p className="text-sm text-[#535D80] leading-relaxed">
                {STEPS[activeIdx].desc}
              </p>

              {/* Progress Indicator Track */}
              <div className="w-full bg-[#F5F7FE] h-2 rounded-full border border-[#CBB4FF]/50 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#153EC1] via-[#2ED2EF] to-[#7B3ED6] transition-all duration-500 rounded-full"
                  style={{ width: `${((activeIdx + 1) / 4) * 100}%` }}
                />
              </div>
            </div>

            {/* Bottom Status Footer */}
            <div className="pt-4 border-t border-[#CBB4FF]/40 flex items-center justify-between text-xs">
              <span className="text-[#535D80]">Enforcing enterprise SOC2 & SOLID compliance</span>
              <span className="text-[#153EC1] font-bold">Active in Simulator &rarr;</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
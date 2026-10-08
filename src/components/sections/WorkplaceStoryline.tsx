"use client";

import { useState } from "react";

const STEPS = [
  {
    num: "01",
    title: "AI Product Manager writes production tickets",
    desc: "Marcus Chen translates business milestones into detailed technical sprint tasks with strict acceptance criteria.",
    bullets: ["Auto-generated sprint backlogs", "Dependencies linked directly to your active queue"],
  },
  {
    num: "02",
    title: "You execute locally inside your native IDE",
    desc: "No shallow web playgrounds. Connect your terminal, pull the branch, write production code, and commit via git.",
    bullets: ["Full TypeScript & architecture autonomy", "Native pull request submission pipeline"],
  },
  {
    num: "03",
    title: "Staff Engineer conducts rigorous code reviews",
    desc: "Sarah Vance inspects your PR line-by-line for SOLID principles, memory leaks, security holes, and concurrency.",
    bullets: ["Blunt, non-sugarcoated architectural feedback", "Direct rejections if PR lacks production readiness"],
  },
  {
    num: "04",
    title: "Verifiable portfolio proof generates automatically",
    desc: "Every completed sprint translates into verified metrics and letters of recommendation that replace traditional resumes.",
    bullets: ["Independent verification URL for recruiters", "Audit trail of actual merged pull requests"],
  },
];

export function WorkplaceStoryline() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section id="workflow" className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left 01-04 Checklist Items */}
        <div className="lg:col-span-6 space-y-3">
          {STEPS.map((step, idx) => (
            <div
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`p-6 rounded-2xl cursor-pointer transition-all duration-200 border ${
                activeIdx === idx
                  ? "bg-white border-2 border-[#153EC1] shadow-md"
                  : "bg-transparent border-transparent hover:bg-white/60"
              }`}
            >
              <div className="flex items-start gap-4">
                <span className="font-editorial text-2xl italic text-[#7B3ED6] pt-0.5">
                  {step.num}
                </span>
                <div>
                  <h3 className="text-base font-bold text-[#0A0F2B]">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-xs text-[#535D80] leading-relaxed">
                    {step.desc}
                  </p>

                  {activeIdx === idx && (
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
          ))}
        </div>

        {/* Right Animated Step Console */}
        <div className="lg:col-span-6">
          <div className="saas-card rounded-3xl p-8 min-h-[360px] flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-[#FFFFFF] to-[#F5F7FE]">
            <div className="flex items-center justify-between pb-4 border-b border-[#CBB4FF]/40 text-xs">
              <span className="font-bold text-[#7B3ED6] uppercase tracking-wider">
                STEP {STEPS[activeIdx].num} // REAL-TIME EXECUTION
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#2ED2EF] animate-pulse" />
            </div>

            <div className="my-8 space-y-4">
              <span className="font-editorial text-3xl sm:text-4xl italic text-[#0A0F2B] block leading-snug">
                "{STEPS[activeIdx].title}"
              </span>
              <p className="text-sm text-[#535D80] leading-relaxed">
                {STEPS[activeIdx].desc}
              </p>
            </div>

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
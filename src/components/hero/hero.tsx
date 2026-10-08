"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatedHandshake } from "@/components/effects/AnimatedHandshake";

export function Hero() {
  const [activeTab, setActiveTab] = useState<"task" | "pr" | "review">("pr");

  return (
    <section className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-16 sm:pb-20 text-center overflow-hidden">
      {/* 1. Main Headline */}
      <div className="mb-4 sm:mb-5 animate-fade-in-up">
      <span
  style={{ fontSize: "clamp(50px, 2.8vw, 60px)", lineHeight: "1.2" }}
  className="font-mono font-bold tracking-[0.28em] text-[#153EC1] uppercase block mb-2"
>
  LET&apos;S
</span>
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-[#0A0F2B] tracking-tighter uppercase leading-[0.9]">
          WORK
        </h1>
        <span className="font-mono text-lg sm:text-2xl md:text-3xl font-extrabold tracking-[0.2em] text-[#7B3ED6] uppercase block mt-1.5 sm:mt-2">
          TOGETHER
        </span>
      </div>

      {/* 2. Ecosystem Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#CBB4FF] text-[11px] sm:text-xs font-semibold text-[#535D80] mb-5 sm:mb-6 shadow-xs animate-fade-in-up anim-delay-100">
        <span className="w-2 h-2 rounded-full bg-[#153EC1] animate-ping" />
        <span>LAKSHYNiTi ECOSYSTEM · BRING YOUR PROJECTS & EXECUTE</span>
      </div>

      {/* 3. Supporting Description */}
      <p className="text-sm sm:text-base md:text-lg text-[#535D80] max-w-2xl mx-auto leading-relaxed font-normal mb-8 sm:mb-10 animate-fade-in-up anim-delay-200">
        Bring in your projects and let's get it done. LWT drops you directly into a simulated 
        enterprise tech squad where your PRs are reviewed, sprints are led, and execution is verified.
      </p>

      {/* 4. Handshake Animation */}
      <div className="mb-8 sm:mb-10 animate-fade-in-up anim-delay-300">
        <AnimatedHandshake />
      </div>

      {/* 5. CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-14 sm:mb-16 animate-fade-in-up anim-delay-300">
        <Link
          href="/dashboard"
          className="w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#153EC1] to-[#287BEB] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#153EC1]/25 hover:shadow-lg hover:shadow-[#153EC1]/35 hover:-translate-y-0.5 active:translate-y-0 transition-all"
        >
          Enter LWT Workspace &rarr;
        </Link>
        <Link
          href="#team"
          className="w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white text-[#0A0F2B] font-bold text-xs sm:text-sm border border-[#CBB4FF] hover:border-[#8E7CF6] shadow-xs hover:bg-[#F5F7FE] hover:-translate-y-0.5 active:translate-y-0 transition-all"
        >
          Inspect AI Colleagues
        </Link>
      </div>

      {/* 6. Active Sprint Console */}
      <div className="w-full max-w-5xl mx-auto">
        <div className="saas-card rounded-2xl sm:rounded-3xl overflow-hidden text-left relative">
          {/* Window Header */}
          <div className="bg-[#F5F7FE] border-b border-[#CBB4FF]/40 px-4 sm:px-6 py-3.5 sm:py-4 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#CBB4FF]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#8E7CF6]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#2ED2EF]" />
              <span className="font-bold text-[#0A0F2B] ml-1 sm:ml-2 text-[11px] sm:text-xs">
                Active Sprint #04 · FinTech Architecture Core
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#2ED2EF]/15 border border-[#2ED2EF]/40 text-[#153EC1] font-bold text-[10px] sm:text-xs flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2ED2EF] animate-pulse" />
                Staff Reviewer: Sarah Vance (Active)
              </span>
            </div>
          </div>

          {/* Window Body */}
          <div className="grid grid-cols-1 lg:grid-cols-12 bg-white">
            {/* Drawer */}
            <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-[#CBB4FF]/30 p-4 sm:p-6 bg-[#F5F7FE]/50 space-y-2 sm:space-y-3">
              <span className="text-[10px] font-bold tracking-widest text-[#7B3ED6] uppercase block">
                SPRINT DELIVERABLES
              </span>

              <button
                type="button"
                onClick={() => setActiveTab("task")}
                className={`w-full text-left p-3 rounded-xl transition-all cursor-pointer ${
                  activeTab === "task"
                    ? "bg-white border-2 border-[#153EC1] shadow-xs text-[#0A0F2B] font-bold"
                    : "text-[#535D80] hover:bg-white"
                }`}
              >
                <span className="text-[10px] text-[#8E7CF6] font-bold block">TICKET #FIN-204</span>
                <span className="text-xs block">Stripe Webhook Idempotency</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("pr")}
                className={`w-full text-left p-3 rounded-xl transition-all cursor-pointer ${
                  activeTab === "pr"
                    ? "bg-white border-2 border-[#153EC1] shadow-xs text-[#0A0F2B] font-bold"
                    : "text-[#535D80] hover:bg-white"
                }`}
              >
                <span className="text-[10px] text-[#2ED2EF] font-bold block">PULL REQUEST #419</span>
                <span className="text-xs block">Redis Setex Lock Diff</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("review")}
                className={`w-full text-left p-3 rounded-xl transition-all cursor-pointer ${
                  activeTab === "review"
                    ? "bg-white border-2 border-[#7B3ED6] shadow-xs text-[#0A0F2B] font-bold"
                    : "text-[#535D80] hover:bg-white"
                }`}
              >
                <span className="text-[10px] text-[#7B3ED6] font-bold block">AI REVIEW SIGN-OFF</span>
                <span className="text-xs block">AST Audit: 98/100 (+75 XP)</span>
              </button>
            </div>

            {/* Viewport */}
            <div className="lg:col-span-8 p-4 sm:p-6 md:p-8 flex flex-col justify-between min-h-[260px] sm:min-h-[300px]">
              {activeTab === "task" && (
                <div className="space-y-3 text-xs">
                  <h3 className="text-base sm:text-lg font-bold text-[#0A0F2B]">Acceptance Requirements</h3>
                  <p className="text-[#535D80]">
                    Stripe network retries must not execute duplicate credits. Enforce 
                    cryptographic Svix validation before asynchronously queuing payment events.
                  </p>
                  <div className="p-3.5 rounded-xl bg-[#F5F7FE] border border-[#CBB4FF]/50 text-[#0A0F2B] space-y-1">
                    <p>✓ Return HTTP 200 immediately before queue fulfillment</p>
                    <p>✓ Store event ID in Redis with 86,400s TTL</p>
                  </div>
                </div>
              )}

              {activeTab === "pr" && (
                <div className="space-y-2 font-mono text-[10px] sm:text-[11px] bg-[#0A0F2B] text-white p-4 sm:p-5 rounded-xl sm:rounded-2xl overflow-x-auto">
                  <span className="text-[#8E7CF6] font-sans text-xs font-bold block pb-2 border-b border-white/10">
                    src/api/webhooks/stripe/route.ts
                  </span>
                  <p className="text-white/50">// Idempotency check with Redis</p>
                  <p className="text-[#2ED2EF]">+ const isDuplicate = await redis.get(`evt:$&#123;event.id&#125;`);</p>
                  <p className="text-[#2ED2EF]">+ if (isDuplicate) return NextResponse.json(&#123; received: true &#125;);</p>
                  <p className="text-[#2ED2EF]">+ await redis.setex(`evt:$&#123;event.id&#125;`, 86400, "1");</p>
                </div>
              )}

              {activeTab === "review" && (
                <div className="space-y-3 p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-[#F5F7FE] border border-[#7B3ED6]/40 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#0A0F2B]">Sarah Vance (Tech Lead)</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#153EC1] text-white font-bold text-[10px]">
                      MERGED & APPROVED
                    </span>
                  </div>
                  <p className="text-[#535D80] italic">
                    "Setting the Redis lock before triggering the asynchronous queue completely eliminates 
                    the race condition window. Architecture meets our production standard."
                  </p>
                  <span className="text-[#153EC1] font-bold block pt-1">
                    +75 XP Awarded to your Public Execution Portfolio
                  </span>
                </div>
              )}

              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-[#CBB4FF]/40 flex items-center justify-between text-xs">
                <span className="text-[#535D80]">Want to test your execution?</span>
                <Link
                  href="/dashboard"
                  className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#0A0F2B] text-white hover:bg-[#153EC1] font-semibold transition-colors text-xs"
                >
                  Test PR &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatedHandshake } from "@/components/effects/AnimatedHandshake";

export function Hero() {
  const [activeTab, setActiveTab] = useState<"task" | "pr" | "review">("pr");

  return (
    <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 text-center">
      {/* Top Credibility Tag */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#CBB4FF] text-xs font-semibold text-[#535D80] mb-8 shadow-xs anim-float">
        <span className="w-2 h-2 rounded-full bg-[#153EC1] animate-ping" />
        <span>LAKSHYNiTi ECOSYSTEM · BRING YOUR PROJECTS & EXECUTE</span>
      </div>

      {/* Main Punchy Title inspired by the poster */}
      <div className="mb-4">
        <span className="font-mono text-sm sm:text-base font-bold tracking-[0.25em] text-[#153EC1] uppercase block mb-1">
          LET'S
        </span>
        <h1 className="text-6xl sm:text-8xl lg:text-9xl font-black text-[#0A0F2B] tracking-tighter uppercase leading-[0.88]">
          WORK
        </h1>
        <span className="font-mono text-xl sm:text-3xl font-extrabold tracking-[0.2em] text-[#7B3ED6] uppercase block mt-2">
          TOGETHER
        </span>
      </div>

      {/* Editorial Subtitle */}
      <p className="mt-6 text-base sm:text-lg text-[#535D80] max-w-2xl mx-auto leading-relaxed font-normal">
        Bring in your projects and let's get it done. LWT drops you directly into a simulated 
        enterprise tech squad where your PRs are reviewed, sprints are led, and execution is verified.
      </p>

      {/* 🤝 THE HERO HANDSHAKE GESTURE INTERACTION */}
      <div className="my-10">
        <AnimatedHandshake />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/dashboard"
          className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#153EC1] to-[#287BEB] text-white font-bold text-sm shadow-lg shadow-[#153EC1]/30 hover:scale-105 transition-all"
        >
          Enter LWT Workspace &rarr;
        </Link>
        <Link
          href="#squad"
          className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-[#0A0F2B] font-bold text-sm border border-[#CBB4FF] hover:border-[#8E7CF6] shadow-xs hover:bg-[#F5F7FE] transition-all"
        >
          Inspect AI Colleagues
        </Link>
      </div>

      {/* 💻 FLOATING REAL-TIME APP WINDOW WITH SCANNING SCAN-BEAM ANIMATION */}
      <div className="mt-16 max-w-5xl mx-auto">
        <div className="saas-card rounded-3xl overflow-hidden text-left relative">
          {/* Animated Scanning Radar Beam */}
          <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#2ED2EF] to-transparent anim-scan pointer-events-none" />

          {/* Window Header */}
          <div className="bg-[#F5F7FE] border-b border-[#CBB4FF]/40 px-6 py-4 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-[#CBB4FF]" />
              <span className="w-3 h-3 rounded-full bg-[#8E7CF6]" />
              <span className="w-3 h-3 rounded-full bg-[#2ED2EF]" />
              <span className="font-bold text-[#0A0F2B] ml-2">
                Active Sprint #04 · FinTech Architecture Core
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#2ED2EF]/15 border border-[#2ED2EF]/40 text-[#153EC1] font-bold text-xs flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#2ED2EF] animate-pulse" />
                Staff Reviewer: Sarah Vance (Active)
              </span>
            </div>
          </div>

          {/* Window Body */}
          <div className="grid grid-cols-1 lg:grid-cols-12 bg-white">
            {/* Drawer */}
            <div className="lg:col-span-4 border-r border-[#CBB4FF]/30 p-6 bg-[#F5F7FE]/50 space-y-3">
              <span className="text-[10px] font-bold tracking-widest text-[#7B3ED6] uppercase block">
                SPRINT DELIVERABLES
              </span>

              <button
                type="button"
                onClick={() => setActiveTab("task")}
                className={`w-full text-left p-3.5 rounded-xl transition-all ${
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
                className={`w-full text-left p-3.5 rounded-xl transition-all ${
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
                className={`w-full text-left p-3.5 rounded-xl transition-all ${
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
            <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between min-h-[300px]">
              {activeTab === "task" && (
                <div className="space-y-3 text-xs">
                  <h3 className="text-lg font-bold text-[#0A0F2B]">Acceptance Requirements</h3>
                  <p className="text-[#535D80]">
                    Stripe network retries must not execute duplicate credits. You must enforce 
                    cryptographic Svix validation before asynchronously queuing payment events.
                  </p>
                  <div className="p-4 rounded-xl bg-[#F5F7FE] border border-[#CBB4FF]/50 text-[#0A0F2B] space-y-1">
                    <p>✓ Return HTTP 200 immediately before queue fulfillment</p>
                    <p>✓ Store event ID in Redis with 86,400s TTL</p>
                  </div>
                </div>
              )}

              {activeTab === "pr" && (
                <div className="space-y-2 font-mono text-[11px] bg-[#0A0F2B] text-white p-5 rounded-2xl">
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
                <div className="space-y-3 p-5 rounded-2xl bg-[#F5F7FE] border border-[#7B3ED6]/40 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#0A0F2B]">Sarah Vance (Tech Lead)</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#153EC1] text-white font-bold text-[10px]">
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

              {/* Bottom Interactive Bar */}
              <div className="mt-6 pt-4 border-t border-[#CBB4FF]/40 flex items-center justify-between text-xs">
                <span className="text-[#535D80]">Want to test your execution?</span>
                <Link
                  href="/dashboard"
                  className="px-4 py-2 rounded-full bg-[#0A0F2B] text-white hover:bg-[#153EC1] font-semibold transition-colors"
                >
                  Test with a sample PR &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
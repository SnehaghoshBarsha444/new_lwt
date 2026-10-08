"use client";

import { useState } from "react";

export function ExecutionPipeline() {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  return (
    <div className="w-full max-w-5xl mx-auto rounded-2xl bg-[#061426] border border-[#0878FF]/30 overflow-hidden shadow-2xl">
      {/* Console Top Header */}
      <div className="px-6 py-4 bg-[#020817] border-b border-[rgba(139,154,175,0.15)] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="ml-3 text-xs font-mono text-[#8B9AAF]">
            LWT_EXECUTION_ENGINE // SPRINT_SIMULATOR
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setStep(1)}
            className={`px-3 py-1 rounded text-xs font-mono transition-all ${
              step === 1 ? "bg-[#0878FF] text-white" : "text-[#8B9AAF] hover:text-white"
            }`}
          >
            1. Sprint Plan
          </button>
          <button
            type="button"
            onClick={() => setStep(2)}
            className={`px-3 py-1 rounded text-xs font-mono transition-all ${
              step === 2 ? "bg-[#0878FF] text-white" : "text-[#8B9AAF] hover:text-white"
            }`}
          >
            2. Code Diff
          </button>
          <button
            type="button"
            onClick={() => setStep(3)}
            className={`px-3 py-1 rounded text-xs font-mono transition-all ${
              step === 3 ? "bg-[#0878FF] text-white" : "text-[#8B9AAF] hover:text-white"
            }`}
          >
            3. AI Review
          </button>
        </div>
      </div>

      {/* Console Body */}
      <div className="p-6 font-mono text-xs leading-relaxed min-h-[320px] bg-[#01040A]">
        {step === 1 && (
          <div className="space-y-4">
            <div className="text-[#00D9D9]">
              [MARCUS CHEN - AI PRODUCT MANAGER]
            </div>
            <p className="text-[#D9E2EC]">
              Project Ticket: <span className="text-white font-bold">#FIN-204 — Implement Stripe Webhook Idempotency</span>
            </p>
            <div className="p-4 rounded-lg bg-[#061426] border border-[rgba(139,154,175,0.2)] text-[#8B9AAF] space-y-2">
              <p className="text-white">Acceptance Criteria:</p>
              <p>✔ Store event ID in Redis with 24hr TTL</p>
              <p>✔ Return HTTP 200 immediately before invoking asynchronous fulfillment</p>
              <p>✔ Enforce Svix cryptographic signature validation</p>
            </div>
            <p className="text-[#8B9AAF]">
              Assigned to: <span className="text-[#00D9D9]">Junior Full-Stack Engineer</span> (XP Reward: +75 XP)
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="text-[#0878FF]">
              [DEVELOPER WORKSPACE — PULL REQUEST #419]
            </div>
            <div className="p-4 rounded-lg bg-[#061426] border border-[rgba(139,154,175,0.2)] text-[#D9E2EC] overflow-x-auto">
              <p className="text-[#8B9AAF]">// Handling webhook signature validation</p>
              <p className="text-green-400">+ const isDuplicate = await redis.get(`event:${event.id}`);</p>
              <p className="text-green-400">+ if (isDuplicate) return NextResponse.json(&#123; received: true &#125;);</p>
              <p className="text-green-400">+ await redis.setex(`event:${event.id}`, 86400, "processed");</p>
              <p className="text-[#8B9AAF]">+ await queue.push(&#123; type: event.type, data: event.data &#125;);</p>
            </div>
            <p className="text-[#8B9AAF]">Status: <span className="text-yellow-400">Awaiting Tech Lead Approval...</span></p>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="text-[#13E5E5]">
              [SARAH VANCE — AI TECH LEAD / STAFF ENGINEER REVIEW]
            </div>
            <div className="p-4 rounded-lg bg-[#061426] border border-[#00D9D9]/30 space-y-2">
              <p className="text-green-400 font-bold">STATUS: PR APPROVED & MERGED</p>
              <p className="text-[#D9E2EC]">
                "Clean handling of concurrency. Using SETEX avoids race conditions during duplicate deliveries. 
                Architecture complies with SOLID standards."
              </p>
              <div className="pt-2 flex items-center justify-between text-[#8B9AAF]">
                <span>Code Quality Score: <strong className="text-white">98/100</strong></span>
                <span className="text-[#00D9D9] font-bold">+75 XP Awarded to Portfolio</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
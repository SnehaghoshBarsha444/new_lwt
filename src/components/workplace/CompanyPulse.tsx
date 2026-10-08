"use client";

import { useEffect, useState } from "react";

const INITIAL_EVENTS = [
  { id: 1, text: "Sarah Vance (Tech Lead) approved PR #409: Redis Caching Layer", tag: "+75 XP", time: "Just now" },
  { id: 2, text: "Marcus Chen (PM) rolled over Sprint 4 backlog into active sprint", tag: "SPRINT", time: "2m ago" },
  { id: 3, text: "Elena Rostova (QA) flagged edge-case in Stripe Webhook signature", tag: "TEST", time: "5m ago" },
  { id: 4, text: "David Sterling (CEO) reviewed sprint burndown: 94% on-time velocity", tag: "METRIC", time: "8m ago" },
];

export function CompanyPulse() {
  const [events] = useState(INITIAL_EVENTS);

  return (
    <div className="w-full rounded-xl bg-[#01040A] border border-[rgba(139,154,175,0.15)] p-3 flex items-center justify-between overflow-hidden">
      <div className="flex items-center gap-2 flex-shrink-0 mr-4">
        <span className="w-2 h-2 rounded-full bg-[#00D9D9] animate-ping" />
        <span className="text-[11px] font-mono text-[#00D9D9] uppercase font-bold tracking-wider">
          COMPANY PULSE:
        </span>
      </div>

      <div className="flex items-center gap-6 overflow-x-auto no-scrollbar whitespace-nowrap text-xs">
        {events.map((event) => (
          <div key={event.id} className="inline-flex items-center gap-2 text-[#D9E2EC]">
            <span className="px-1.5 py-0.5 rounded bg-[#0878FF]/15 border border-[#0878FF]/30 text-[10px] font-mono text-[#00D9D9]">
              {event.tag}
            </span>
            <span>{event.text}</span>
            <span className="text-[10px] font-mono text-[#8B9AAF]">({event.time})</span>
            <span className="text-[#8B9AAF]/40">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
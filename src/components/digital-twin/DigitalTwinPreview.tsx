"use client";

import { useState } from "react";

interface Room {
  id: string;
  name: string;
  description: string;
  icon: string;
  activeAgents: string;
  telemetry: string;
}

const ROOMS: Room[] = [
  {
    id: "eng",
    name: "Engineering Department",
    icon: "🛠️",
    description: "AST Code review pipelines, terminal logs, and architecture linting against SOLID principles.",
    activeAgents: "Sarah Vance (Tech Lead)",
    telemetry: "Enforcing TypeScript strict mode & 0% any tolerance",
  },
  {
    id: "meet",
    name: "AI Standup & Sync Room",
    icon: "📋",
    description: "Scheduled daily standups, blocker resolution threads, and sprint burndown recalculations.",
    activeAgents: "Marcus Chen (Agile PM)",
    telemetry: "Sprint 4 velocity on track (94% target fulfillment)",
  },
  {
    id: "exec",
    name: "Executive Suite",
    icon: "💼",
    description: "Company burn rate calculations, investor briefs, and enterprise milestone alignment.",
    activeAgents: "David Sterling (CEO)",
    telemetry: "Simulating B2B enterprise tier adoption",
  },
  {
    id: "arch",
    name: "Portfolio Archive",
    icon: "📜",
    description: "Cryptographically verifiable ledger of your completed tickets, reviews, and execution XP.",
    activeAgents: "Automated Portfolio Engine",
    telemetry: "Public URL generation with AI recommendation letters",
  },
];

export function DigitalTwinPreview() {
  const [activeRoom, setActiveRoom] = useState<Room>(ROOMS[0]);

  return (
    <section id="digital-twin" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <span className="text-xs font-mono text-[#00D9D9] uppercase tracking-widest block mb-2">
          SPATIAL WORKSPACE ENVIRONMENT
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Your Digital Twin <span className="text-[#0878FF]">Company Office</span>
        </h2>
        <p className="mt-3 text-[#D9E2EC] max-w-2xl mx-auto text-sm sm:text-base">
          LWT provides a spatial 3D operating environment. Step into specific departments to initiate standups, 
          submit code reviews, or inspect executive company metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Department Room Selector Tabs */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          {ROOMS.map((room) => {
            const isSelected = activeRoom.id === room.id;
            return (
              <button
                key={room.id}
                type="button"
                onClick={() => setActiveRoom(room)}
                className={`p-4 rounded-xl text-left transition-all duration-200 border ${
                  isSelected
                    ? "bg-[#061426] border-[#0878FF] shadow-[0_0_25px_rgba(8,120,255,0.2)]"
                    : "bg-[#020817] border-[rgba(139,154,175,0.15)] hover:border-[#8B9AAF]/40"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{room.icon}</span>
                    <h3 className="text-sm font-bold text-white">{room.name}</h3>
                  </div>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-[#00D9D9] animate-pulse" />
                  )}
                </div>
                <p className="text-xs text-[#8B9AAF] line-clamp-2 mt-1">
                  {room.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* 3D Spatial Digital Viewport Screen */}
        <div className="lg:col-span-8 rounded-2xl bg-[#01040A] border border-[#0878FF]/30 p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl min-h-[380px]">
          {/* Spatial Grid Effect */}
          <div className="absolute inset-0 bg-ambient-grid opacity-40 pointer-events-none" />

          {/* Department Head Telemetry */}
          <div className="relative z-10 flex items-center justify-between pb-4 border-b border-[rgba(139,154,175,0.15)]">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{activeRoom.icon}</span>
              <div>
                <span className="text-[10px] font-mono text-[#00D9D9] tracking-wider uppercase block">
                  SPATIAL SECTOR
                </span>
                <h4 className="text-lg font-bold text-white">{activeRoom.name}</h4>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-mono text-[#8B9AAF] block">STATION LEAD</span>
              <span className="text-xs font-mono font-bold text-[#D9E2EC]">
                {activeRoom.activeAgents}
              </span>
            </div>
          </div>

          {/* Center Visual Mockup */}
          <div className="relative z-10 my-8 p-6 rounded-xl bg-[#061426]/70 border border-[#0878FF]/20 backdrop-blur-md">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#00D9D9]" />
              <span className="text-xs font-mono text-[#D9E2EC]">LIVE DEPARTMENT TELEMETRY</span>
            </div>
            <p className="text-sm text-[#D9E2EC] leading-relaxed">
              {activeRoom.description}
            </p>
            <div className="mt-4 p-3 rounded bg-[#020817] border border-[rgba(139,154,175,0.15)] font-mono text-xs text-[#00D9D9]">
              &gt; STATUS: {activeRoom.telemetry}
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="relative z-10 flex items-center justify-between pt-4 border-t border-[rgba(139,154,175,0.15)]">
            <span className="text-xs font-mono text-[#8B9AAF]">
              Integrated with Three.js Spatial Engine & Zustand Store
            </span>
            <span className="text-xs font-bold text-[#0878FF] hover:text-[#00D9D9] transition-colors cursor-pointer">
              Enter Room in 3D Mode &rarr;
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
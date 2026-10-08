"use client";

import { useState } from "react";

interface NodeData {
  id: string;
  name: string;
  role: string;
  metric: string;
  x: number;
  y: number;
}

const NODES: NodeData[] = [
  { id: "lead", name: "Sarah Vance", role: "AI Tech Lead", metric: "Strict SOLID & AST Linting", x: 18, y: 22 },
  { id: "pm", name: "Marcus Chen", role: "AI Agile PM", metric: "Backlogs & Jira Sprints", x: 82, y: 22 },
  { id: "qa", name: "Elena Rostova", role: "AI QA Lead", metric: "Edge Cases & Concurrency", x: 18, y: 78 },
  { id: "ceo", name: "David Sterling", role: "AI CEO", metric: "Burn Rate & ROI Velocity", x: 82, y: 78 },
];

export function CompanyNetwork() {
  const [activeNode, setActiveNode] = useState<NodeData | null>(NODES[0]);

  return (
    <div className="relative w-full max-w-4xl mx-auto h-[420px] rounded-2xl bg-[#061426]/70 border border-[#0878FF]/20 p-6 flex flex-col justify-between overflow-hidden shadow-2xl backdrop-blur-md">
      {/* Background SVG Grid & Animated Connectors */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0878FF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#00D9D9" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* Connector Lines from Center (50%, 50%) to Satellites */}
        <line x1="50%" y1="50%" x2="18%" y2="22%" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="4 4" className="animate-pulse" />
        <line x1="50%" y1="50%" x2="82%" y2="22%" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="4 4" className="animate-pulse" />
        <line x1="50%" y1="50%" x2="18%" y2="78%" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="4 4" className="animate-pulse" />
        <line x1="50%" y1="50%" x2="82%" y2="78%" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="4 4" className="animate-pulse" />
      </svg>

      {/* Central Hub Node */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
        <div className="w-20 h-20 rounded-2xl bg-[#020817] border-2 border-[#00D9D9] flex items-center justify-center glow-cyan">
          <div className="text-center">
            <span className="block text-[10px] font-mono text-[#00D9D9] font-bold">LWT CORE</span>
            <span className="block text-[9px] text-[#8B9AAF]">ORCHESTRATOR</span>
          </div>
        </div>
      </div>

      {/* Satellite Persona Nodes */}
      {NODES.map((node) => (
        <button
          key={node.id}
          type="button"
          onClick={() => setActiveNode(node)}
          style={{ top: `${node.y}%`, left: `${node.x}%` }}
          className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 p-3 rounded-xl transition-all duration-300 text-left border ${
            activeNode?.id === node.id
              ? "bg-[#0878FF]/20 border-[#00D9D9] shadow-[0_0_20px_rgba(0,217,217,0.35)] scale-105"
              : "bg-[#020817] border-[rgba(139,154,175,0.2)] hover:border-[#0878FF]"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00D9D9]" />
            <span className="text-xs font-bold text-white">{node.name}</span>
          </div>
          <span className="text-[10px] block text-[#8B9AAF] font-mono mt-0.5">{node.role}</span>
        </button>
      ))}

      {/* Interactive Telemetry Box at Bottom */}
      <div className="relative z-30 mt-auto w-full p-3 rounded-lg bg-[#020817]/90 border border-[#0878FF]/30 flex items-center justify-between text-xs">
        <div>
          <span className="text-[#8B9AAF] font-mono">SELECTED WORKER: </span>
          <span className="font-bold text-white">{activeNode?.name} ({activeNode?.role})</span>
        </div>
        <div className="font-mono text-[#00D9D9]">
          FUNCTION: {activeNode?.metric}
        </div>
      </div>
    </div>
  );
}
export function SystemTelemetry() {
    const metrics = [
      { label: "Active Personas", value: "4 Autonomous Colleagues" },
      { label: "Execution Sprints", value: "100+ Enterprise Scenarios" },
      { label: "Code Review SLA", value: "< 250ms Deep AST Analysis" },
      { label: "Output Standard", value: "Verifiable Public Portfolio" },
    ];
  
    return (
      <div className="w-full max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 p-2 rounded-xl bg-[#061426]/60 border border-[rgba(139,154,175,0.15)] backdrop-blur-sm">
        {metrics.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center p-3 rounded-lg bg-[#020817]/60 border border-[#0878FF]/10 text-center"
          >
            <span className="text-[11px] font-mono text-[#8B9AAF] uppercase tracking-wider mb-0.5">
              {item.label}
            </span>
            <span className="text-xs sm:text-sm font-bold text-white tracking-tight">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
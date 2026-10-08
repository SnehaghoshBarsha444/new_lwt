export function ArchitectureSection() {
    const layers = [
      {
        level: "LAYER 01",
        title: "Experience & Spatial Digital Twin",
        tech: "Next.js App Router (RSC) • React 19 • Tailwind CSS • Three.js",
        desc: "Server-first rendering architecture delivering near-zero client JS overhead. Spatial 3D environment for department navigation and agile ceremonies.",
      },
      {
        level: "LAYER 02",
        title: "AI Orchestration & Long-Term Memory Core",
        tech: "Gemini 1.5 Pro • OpenAI API • pgvector RAG Memory",
        desc: "Dual-LLM engine. Gemini handles deep AST code reviews and architectural planning; fast models manage daily conversational syncs with long-term memory across sprints.",
      },
      {
        level: "LAYER 03",
        title: "Enterprise Relational Data & Cryptographic RBAC",
        tech: "Supabase (PostgreSQL) • Row Level Security • Clerk Auth",
        desc: "Multi-tenant organization isolation. All mutations run via strongly-typed Zod Server Actions with strict database-level RLS policies.",
      },
    ];
  
    return (
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <span className="text-xs font-mono text-[#00D9D9] uppercase tracking-widest block mb-2">
            SYSTEM ARCHITECTURE
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Built as an Enterprise <span className="text-[#0878FF]">Operating System</span>
          </h2>
          <p className="mt-3 text-[#D9E2EC] max-w-2xl mx-auto text-sm sm:text-base">
            LWT is engineered strictly under clean architecture principles with full separation of concerns.
          </p>
        </div>
  
        <div className="space-y-4 max-w-4xl mx-auto">
          {layers.map((layer, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl bg-[#061426] border border-[rgba(139,154,175,0.15)] hover:border-[#0878FF]/60 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-mono text-[#00D9D9] tracking-widest">
                  {layer.level}
                </span>
                <span className="text-xs font-mono text-[#8B9AAF]">
                  {layer.tech}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{layer.title}</h3>
              <p className="text-sm text-[#D9E2EC] leading-relaxed font-normal">
                {layer.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  }
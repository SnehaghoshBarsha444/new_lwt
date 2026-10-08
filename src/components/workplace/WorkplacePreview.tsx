"use client";

const COLUMNS = [
  {
    title: "Backlog",
    count: 2,
    badgeBg: "bg-[#F5F7FE] text-[#535D80] border-[#CBB4FF]",
    tasks: [
      { id: "LWT-101", title: "Enforce Svix Cryptographic Webhook Signatures", tag: "Security", xp: "+75 XP" },
      { id: "LWT-102", title: "Setup pgvector Similarity Search for RAG Memory", tag: "Database", xp: "+100 XP" },
    ],
  },
  {
    title: "In Progress",
    count: 1,
    badgeBg: "badge-cyan",
    tasks: [
      { id: "LWT-103", title: "Sliding Window Rate Limiter with Upstash Redis", tag: "Performance", xp: "+80 XP" },
    ],
  },
  {
    title: "AI Review",
    count: 1,
    badgeBg: "badge-lilac",
    tasks: [
      { id: "LWT-104", title: "Idempotent Stripe Webhook Event Fulfillment", tag: "FinTech", xp: "+120 XP" },
    ],
  },
  {
    title: "Verified Done",
    count: 2,
    badgeBg: "bg-[#153EC1]/10 text-[#153EC1] border-[#153EC1]/30",
    tasks: [
      { id: "LWT-100", title: "PostgreSQL Multi-tenant RLS Isolation Policies", tag: "Supabase", xp: "+150 XP" },
      { id: "LWT-099", title: "Next.js 16 App Router BFF Route Handlers", tag: "Framework", xp: "+60 XP" },
    ],
  },
];

export function WorkplacePreview() {
  return (
    <section id="sprints" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-14">
        <span className="text-xs font-bold tracking-widest text-[#153EC1] uppercase block mb-2">
          REAL AGILE SPRINT BOARD
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0A0F2B] tracking-tight">
          A real sprint board. <span className="text-[#153EC1]">Zero artificial exercises.</span>
        </h2>
        <p className="mt-4 text-[#535D80] max-w-2xl mx-auto text-base">
          Tasks reflect real enterprise tickets. Complete work in your IDE, submit PRs, 
          and earn verified XP while unblocking cross-functional AI colleagues.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {COLUMNS.map((col, idx) => (
          <div key={idx} className="saas-card rounded-2xl p-4 flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-[rgba(203,180,255,0.4)] mb-4">
              <span className="font-bold text-sm text-[#0A0F2B]">
                {col.title}
              </span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${col.badgeBg}`}>
                0{col.count}
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {col.tasks.map((task) => (
                <div
                  key={task.id}
                  className="p-3.5 rounded-xl bg-[#F5F7FE] border border-[rgba(203,180,255,0.4)] hover:border-[#8E7CF6] transition-all group"
                >
                  <div className="flex items-center justify-between text-[11px] text-[#535D80] font-medium mb-1.5">
                    <span>{task.id}</span>
                    <span className="px-1.5 py-0.5 rounded bg-white border border-[#CBB4FF] text-[#153EC1] font-semibold text-[10px]">
                      {task.tag}
                    </span>
                  </div>

                  <h4 className="font-semibold text-xs text-[#0A0F2B] leading-snug group-hover:text-[#153EC1] transition-colors mb-2">
                    {task.title}
                  </h4>

                  <div className="pt-2 border-t border-[rgba(203,180,255,0.3)] flex justify-end text-[11px] font-bold text-[#7B3ED6]">
                    {task.xp}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
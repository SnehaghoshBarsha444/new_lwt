export function AIWorkforceSection() {
  return (
    <section id="team" className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      {/* Vestris Italic Heading */}
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-6xl font-vestris font-normal text-[#0A0F2B]">
          Never turn down <br />
          <span className="italic text-[#153EC1]">a complex sprint again</span>
        </h2>
        <p className="mt-4 text-base text-[#535D80] max-w-xl mx-auto">
          LWT doesn't replace the developer — it surrounds you with demanding colleagues 
          so you master production habits before your first day on the job.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Code Review */}
        <div className="rounded-3xl p-7 bg-white border border-[#CBB4FF]/60 shadow-xs flex flex-col justify-between hover:border-[#8E7CF6] transition-all">
          <div>
            <h3 className="font-bold text-base text-[#0A0F2B] mb-1">
              Automated code reviews with strict gates
            </h3>
            <p className="text-xs text-[#535D80] mb-6">
              If your code leaks memory or ignores typing, Sarah Vance rejects your PR with line-by-line feedback.
            </p>

            {/* Micro UI Mockup */}
            <div className="p-3.5 rounded-xl bg-[#F5F7FE] border border-[#CBB4FF]/50 text-[11px] font-mono text-[#0A0F2B] space-y-1 mb-6">
              <div className="flex items-center justify-between text-[#7B3ED6] font-bold mb-1">
                <span>PR #402 // AST AUDIT</span>
                <span>REJECTED</span>
              </div>
              <p className="text-[#535D80]">Line 24: Unhandled Promise rejection.</p>
              <p className="text-[#153EC1] font-semibold">&gt; Please wrap in try/catch block.</p>
            </div>
          </div>

          <div className="pt-3 border-t border-[#CBB4FF]/30 text-xs font-semibold text-[#153EC1]">
            Sarah Vance (Tech Lead)
          </div>
        </div>

        {/* Card 2: AI Sprint Backlogs */}
        <div className="rounded-3xl p-7 bg-white border border-[#CBB4FF]/60 shadow-xs flex flex-col justify-between hover:border-[#8E7CF6] transition-all">
          <div>
            <h3 className="font-bold text-base text-[#0A0F2B] mb-1">
              No developer plans in a vacuum
            </h3>
            <p className="text-xs text-[#535D80] mb-6">
              Marcus Chen breaks major epics into bite-sized Jira-style sprint tickets with acceptance tests.
            </p>

            {/* Micro UI Mockup */}
            <div className="p-3.5 rounded-xl bg-[#F5F7FE] border border-[#CBB4FF]/50 text-[11px] font-mono text-[#0A0F2B] space-y-1 mb-6">
              <div className="flex items-center justify-between text-[#153EC1] font-bold mb-1">
                <span>SPRINT 04 // BACKLOG</span>
                <span>ASSIGNED</span>
              </div>
              <p className="text-[#535D80]">4 Stories · 18 Story Points</p>
              <p className="text-[#7B3ED6] font-semibold">&gt; Ready for local checkout</p>
            </div>
          </div>

          <div className="pt-3 border-t border-[#CBB4FF]/30 text-xs font-semibold text-[#7B3ED6]">
            Marcus Chen (Agile PM)
          </div>
        </div>

        {/* Card 3: Mobile On-Call & QA Alerts */}
        <div className="rounded-3xl p-7 bg-white border border-[#CBB4FF]/60 shadow-xs flex flex-col justify-between hover:border-[#8E7CF6] transition-all">
          <div>
            <h3 className="font-bold text-base text-[#0A0F2B] mb-1">
              Chaos testing & on-call simulations
            </h3>
            <p className="text-xs text-[#535D80] mb-6">
              Elena Rostova injects latency spikes and race conditions so you learn how to handle real incidents.
            </p>

            {/* Micro UI Mockup */}
            <div className="p-3.5 rounded-xl bg-[#F5F7FE] border border-[#CBB4FF]/50 text-[11px] font-mono text-[#0A0F2B] space-y-1 mb-6">
              <div className="flex items-center justify-between text-[#2ED2EF] font-bold mb-1">
                <span>INCIDENT 01 // STRESS</span>
                <span>RESOLVED</span>
              </div>
              <p className="text-[#535D80]">Latency spike simulated at 400ms.</p>
              <p className="text-[#153EC1] font-semibold">&gt; Pool recovered successfully</p>
            </div>
          </div>

          <div className="pt-3 border-t border-[#CBB4FF]/30 text-xs font-semibold text-[#153EC1]">
            Elena Rostova (QA Lead)
          </div>
        </div>
      </div>
    </section>
  );
}
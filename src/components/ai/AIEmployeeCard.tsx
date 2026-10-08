export interface PersonaProps {
    name: string;
    role: string;
    department: string;
    focus: string;
    quote: string;
    status: string;
    codeStandard: string;
  }
  
  export function AIEmployeeCard({
    name,
    role,
    department,
    focus,
    quote,
    status,
    codeStandard,
  }: PersonaProps) {
    return (
      <div className="flex flex-col justify-between p-6 rounded-2xl bg-[#061426] border border-[rgba(139,154,175,0.15)] hover:border-[#0878FF]/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(8,120,255,0.15)] group">
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0878FF]/15 border border-[#0878FF]/30 text-[#00D9D9]">
              {department.toUpperCase()}
            </span>
            <span className="text-[11px] font-mono text-[#8B9AAF] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D9D9]" />
              {status}
            </span>
          </div>
  
          <h3 className="text-xl font-bold text-white group-hover:text-[#00D9D9] transition-colors">
            {name}
          </h3>
          <p className="text-xs font-mono text-[#8B9AAF] mb-3">{role}</p>
  
          <p className="text-sm text-[#D9E2EC] italic mb-4">
            "{quote}"
          </p>
        </div>
  
        <div className="pt-4 border-t border-[rgba(139,154,175,0.1)] space-y-2">
          <div className="text-xs">
            <span className="text-[#8B9AAF] font-mono">Domain: </span>
            <span className="text-white font-medium">{focus}</span>
          </div>
          <div className="text-xs">
            <span className="text-[#8B9AAF] font-mono">Enforcement: </span>
            <span className="text-[#00D9D9] font-mono">{codeStandard}</span>
          </div>
        </div>
      </div>
    );
  }
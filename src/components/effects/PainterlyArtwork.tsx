// 🎨 Desk Still-Life Painting (Section 2 - Vestris Tea/Desk Painting Replica)
export function DeskWatercolorArt() {
    return (
      <div className="relative w-full h-[360px] rounded-3xl overflow-hidden border border-[#CBB4FF]/70 shadow-lg bg-gradient-to-br from-[#FFFFFF] via-[#F5F7FE] to-[#CBB4FF]/30 p-6 flex flex-col justify-between">
        {/* Background Watercolor Window Sunlight Wash */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(46,210,239,0.25)_0%,rgba(203,180,255,0.3)_40%,transparent_70%)]" />
  
        {/* Top Telemetry Pill */}
        <div className="relative z-10 flex items-center justify-between text-xs">
          <span className="font-mono text-[11px] font-bold text-[#7B3ED6] uppercase tracking-wider bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-[#CBB4FF]/50">
            ● REAL-TIME EXECUTION CANVASES
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-[#2ED2EF]/20 text-[#153EC1] font-bold text-[10px]">
            Live Session
          </span>
        </div>
  
        {/* Stylized Painterly Engineering Still Life (Laptop, Coffee Cup & Blueprint) */}
        <div className="relative z-10 my-auto flex items-center justify-center">
          <svg className="w-64 h-48 drop-shadow-md" viewBox="0 0 260 190" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Wooden / Desk watercolor plane */}
            <ellipse cx="130" cy="150" rx="120" ry="32" fill="#CBB4FF" fillOpacity="0.4" />
            
            {/* Laptop Screen with Code Glow */}
            <rect x="70" y="30" width="120" height="85" rx="6" fill="#0A0F2B" />
            <rect x="75" y="35" width="110" height="75" rx="4" fill="#153EC1" fillOpacity="0.4" />
            <path d="M85 55 h30 M85 65 h50 M85 75 h40 M85 85 h60" stroke="#2ED2EF" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.8" />
            <path d="M125 55 h20 M145 65 h15 M135 75 h25" stroke="#CBB4FF" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.7" />
            {/* Laptop Base */}
            <path d="M50 115 L210 115 L190 128 L70 128 Z" fill="#7B3ED6" fillOpacity="0.85" />
  
            {/* Steaming Coffee/Tea Cup (Vestris Signature) */}
            <rect x="195" y="85" width="28" height="32" rx="4" fill="#FFFFFF" stroke="#8E7CF6" strokeWidth="2" />
            <path d="M223 93 Q 235 93 235 101 T 223 109" stroke="#8E7CF6" strokeWidth="2" fill="none" />
            {/* Steam curves */}
            <path d="M204 78 Q 207 72 203 66" stroke="#2ED2EF" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6" />
            <path d="M213 76 Q 216 70 212 64" stroke="#8E7CF6" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6" />
  
            {/* Notebook & Architectural Pen */}
            <rect x="25" y="100" width="45" height="35" rx="3" transform="rotate(-15 25 100)" fill="#FFFFFF" stroke="#CBB4FF" strokeWidth="2" />
            <line x1="28" y1="125" x2="65" y2="108" stroke="#153EC1" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>
  
        <div className="relative z-10 pt-3 border-t border-[#CBB4FF]/40 flex items-center justify-between text-xs text-[#58617D]">
          <span>Simulating deep autonomous engineering focus</span>
          <span className="text-[#153EC1] font-bold">Active in Workspace &rarr;</span>
        </div>
      </div>
    );
  }
  
  // 🏛️ Vintage Handshake Postage Stamp (Section 4 - Vestris Handshake Oil Painting Replica)
  export function HandshakeStampArt() {
    return (
      <div className="relative w-64 h-72 rounded-2xl p-6 bg-white border-2 border-dashed border-[#CBB4FF] shadow-md flex flex-col items-center justify-between text-center">
        {/* Outer Stamp Perforations Accent */}
        <span className="font-mono text-[9px] text-[#7B3ED6] uppercase tracking-widest font-bold">
          OFFICIAL VERIFICATION · 2026
        </span>
  
        {/* Framed Watercolor Painting of Two Engineers Handshaking */}
        <div className="w-48 h-36 rounded-xl border border-[#CBB4FF] overflow-hidden bg-gradient-to-br from-[#F5F7FE] to-[#CBB4FF]/30 p-2 flex items-center justify-center shadow-inner">
          <svg className="w-full h-full" viewBox="0 0 160 110" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Boardroom Painting Background */}
            <rect x="0" y="0" width="160" height="110" fill="#F8F9FE" />
            <circle cx="80" cy="45" r="40" fill="#2ED2EF" fillOpacity="0.15" />
  
            {/* Two Hands Clasped in Handshake (Oil Painting Vector) */}
            {/* Left Arm (Developer Suit) */}
            <path d="M10 65 L55 52 L68 62 L20 80 Z" fill="#0A0F2B" />
            {/* Left Cuff & Hand */}
            <rect x="53" y="49" width="7" height="16" transform="rotate(-15 53 49)" fill="#FFFFFF" />
            <path d="M60 55 C 70 50 82 55 90 62 L 78 74 L 62 65 Z" fill="#8E7CF6" />
  
            {/* Right Arm (Staff Tech Lead Suit) */}
            <path d="M150 65 L105 52 L92 62 L140 80 Z" fill="#153EC1" />
            {/* Right Cuff & Hand */}
            <rect x="100" y="47" width="7" height="16" transform="rotate(15 100 47)" fill="#FFFFFF" />
            <path d="M100 55 C 90 50 78 55 70 62 L 82 74 L 98 65 Z" fill="#7B3ED6" />
  
            {/* Golden Seal of Acceptance Star */}
            <circle cx="80" cy="62" r="8" fill="#2ED2EF" fillOpacity="0.4" />
            <circle cx="80" cy="62" r="4" fill="#153EC1" />
          </svg>
        </div>
  
        <div className="space-y-0.5">
          <span className="font-vestris text-base italic text-[#0A0F2B] font-bold block">
            Execution Ledger
          </span>
          <span className="text-[10px] font-mono text-[#153EC1] font-semibold block">
            LWT-VERIFIED-PROOF
          </span>
        </div>
      </div>
    );
  }
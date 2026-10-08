export function AmbientSystem() {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Technical Grid Pattern */}
        <div className="absolute inset-0 bg-ambient-grid opacity-60" />
  
        {/* Top Orbital Gradient Mesh */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-radial-hero blur-[80px] opacity-80" />
  
        {/* Secondary Bottom Ambient Light */}
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#00D9D9]/5 blur-[120px] rounded-full" />
      </div>
    );
  }
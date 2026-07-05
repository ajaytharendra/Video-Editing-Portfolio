import React from 'react';

interface VideoLoaderProps {
  className?: string;
}

export default function VideoLoader({ className = '' }: VideoLoaderProps) {
  return (
    <div 
      className={`flex flex-col items-center justify-center pointer-events-none select-none z-30 ${className}`}
    >
      {/* Timeline Editor Loader Box */}
      <div className="w-36 h-20 bg-black/75 backdrop-blur-md rounded border border-white/10 p-3 flex flex-col justify-between relative overflow-hidden shadow-2xl">
        
        {/* Playhead Needle (Moving Left to Right) */}
        <div 
          className="absolute top-0 bottom-0 w-[1.5px] bg-[#ff3b30] z-20 shadow-[0_0_8px_#ff3b30]"
          style={{
            animation: 'playheadMove 1.6s linear infinite',
            transform: 'translateX(-50%)'
          }}
        />

        {/* Track 3 (Top Video Layer V3) */}
        <div className="h-2 w-full bg-white/[0.03] rounded-sm relative overflow-hidden border-b border-white/[0.02]">
          <div 
            className="absolute top-0 bottom-0 bg-[#3b82f6]/30 border border-[#3b82f6]/50 rounded-sm"
            style={{ left: '15%', right: '45%' }}
          />
          <div 
            className="absolute top-0 bottom-0 bg-[#3b82f6]/30 border border-[#3b82f6]/50 rounded-sm"
            style={{ left: '60%', right: '10%' }}
          />
        </div>

        {/* Track 2 (Middle Video Layer V2) */}
        <div className="h-2 w-full bg-white/[0.03] rounded-sm relative overflow-hidden border-b border-white/[0.02]">
          <div 
            className="absolute top-0 bottom-0 bg-[#10b981]/30 border border-[#10b981]/50 rounded-sm"
            style={{ left: '5%', right: '70%' }}
          />
          <div 
            className="absolute top-0 bottom-0 bg-[#8b5cf6]/30 border border-[#8b5cf6]/50 rounded-sm"
            style={{ left: '35%', right: '25%' }}
          />
        </div>

        {/* Track 1 (Bottom Video Layer V1) */}
        <div className="h-2 w-full bg-white/[0.03] rounded-sm relative overflow-hidden">
          <div 
            className="absolute top-0 bottom-0 bg-[#ec4899]/30 border border-[#ec4899]/50 rounded-sm"
            style={{ left: '25%', right: '35%' }}
          />
          <div 
            className="absolute top-0 bottom-0 bg-[#ec4899]/30 border border-[#ec4899]/50 rounded-sm"
            style={{ left: '70%', right: '5%' }}
          />
        </div>
      </div>
      
      {/* Optional loading text below */}
      <span className="text-[9px] uppercase tracking-[0.2em] text-white/50 font-mono mt-2.5">
        Buffering Timeline...
      </span>
    </div>
  );
}

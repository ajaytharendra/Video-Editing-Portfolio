import React from 'react';

interface VideoLoaderProps {
  className?: string;
}

export default function VideoLoader({ className = '' }: VideoLoaderProps) {
  return (
    <div 
      className={`flex items-center justify-center pointer-events-none select-none z-30 ${className}`}
    >
      {/* Container for the 3 tracks - floating with no outer box or text */}
      <div className="w-48 h-12 relative flex flex-col justify-between overflow-hidden">
        
        {/* Blue Playhead Needle with Cap (Moving Left to Right) */}
        <div 
          className="absolute top-0 bottom-0 z-20 flex flex-col items-center"
          style={{
            animation: 'playheadMove 1.6s linear infinite',
            transform: 'translateX(-50%)',
            left: '0%'
          }}
        >
          {/* Editor Playhead Shield Cap */}
          <svg className="w-3.5 h-2.5 text-[#3b82f6] fill-current" viewBox="0 0 14 10">
            <path d="M 0 0 L 14 0 L 14 5 L 7 10 L 0 5 Z" />
          </svg>
          {/* Blue Playhead Line */}
          <div className="w-[1.5px] bg-[#3b82f6] flex-grow shadow-[0_0_6px_rgba(59,130,246,0.6)]" />
        </div>

        {/* Track 3 (Top Video Layer V3 - Light Blue clips) */}
        <div className="h-2.5 w-full relative">
          <div 
            className="absolute top-0 bottom-0 bg-[#85a3e0] rounded-[3px] border border-[#6b8cc4]/40"
            style={{ left: '10%', right: '55%' }}
          />
          <div 
            className="absolute top-0 bottom-0 bg-[#85a3e0] rounded-[3px] border border-[#6b8cc4]/40"
            style={{ left: '48%', right: '28%' }}
          />
          <div 
            className="absolute top-0 bottom-0 bg-[#85a3e0] rounded-[3px] border border-[#6b8cc4]/40"
            style={{ left: '75%', right: '2%' }}
          />
        </div>

        {/* Track 2 (Middle Video Layer V2 - Pink/Magenta clips) */}
        <div className="h-2.5 w-full relative">
          <div 
            className="absolute top-0 bottom-0 bg-[#e085c2] rounded-[3px] border border-[#c46bb0]/40"
            style={{ left: '2%', right: '78%' }}
          />
          <div 
            className="absolute top-0 bottom-0 bg-[#e085c2] rounded-[3px] border border-[#c46bb0]/40"
            style={{ left: '24%', right: '60%' }}
          />
          <div 
            className="absolute top-0 bottom-0 bg-[#e085c2] rounded-[3px] border border-[#c46bb0]/40"
            style={{ left: '42%', right: '5%' }}
          />
        </div>

        {/* Track 1 (Bottom Video Layer V1 - Light Cyan clips) */}
        <div className="h-2.5 w-full relative">
          <div 
            className="absolute top-0 bottom-0 bg-[#85d3e0] rounded-[3px] border border-[#6bc2c4]/40"
            style={{ left: '15%', right: '50%' }}
          />
          <div 
            className="absolute top-0 bottom-0 bg-[#85d3e0] rounded-[3px] border border-[#6bc2c4]/40"
            style={{ left: '52%', right: '15%' }}
          />
        </div>

      </div>
    </div>
  );
}

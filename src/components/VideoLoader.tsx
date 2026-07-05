import React from 'react';

interface VideoLoaderProps {
  className?: string;
}

export default function VideoLoader({ className = '' }: VideoLoaderProps) {
  return (
    <div 
      className={`flex items-center justify-center pointer-events-none select-none z-30 ${className}`}
    >
      {/* Monochromatic Mini Timeline Loader - Floating with no outer box or text */}
      <div className="w-32 h-8 relative flex flex-col justify-between overflow-hidden">
        
        {/* Monochromatic Playhead Needle with Cap (Moving Left to Right) */}
        <div 
          className="absolute top-0 bottom-0 z-20 flex flex-col items-center"
          style={{
            animation: 'playheadMove 1.6s linear infinite',
            transform: 'translateX(-50%)',
            left: '0%'
          }}
        >
          {/* Minimal Playhead Shield Cap */}
          <svg className="w-2.5 h-2 text-white/80 fill-current" viewBox="0 0 14 10">
            <path d="M 0 0 L 14 0 L 14 5 L 7 10 L 0 5 Z" />
          </svg>
          {/* White Playhead Line */}
          <div className="w-[1px] bg-white/70 flex-grow shadow-[0_0_4px_rgba(255,255,255,0.4)]" />
        </div>

        {/* Track 3 (Top Video Layer V3 - Light White/Grey clips) */}
        <div className="h-1.5 w-full relative">
          <div 
            className="absolute top-0 bottom-0 bg-white/30 rounded-[2px] border border-white/10"
            style={{ left: '10%', right: '55%' }}
          />
          <div 
            className="absolute top-0 bottom-0 bg-white/30 rounded-[2px] border border-white/10"
            style={{ left: '48%', right: '28%' }}
          />
          <div 
            className="absolute top-0 bottom-0 bg-white/30 rounded-[2px] border border-white/10"
            style={{ left: '75%', right: '2%' }}
          />
        </div>

        {/* Track 2 (Middle Video Layer V2 - Darker White/Grey clips) */}
        <div className="h-1.5 w-full relative">
          <div 
            className="absolute top-0 bottom-0 bg-white/15 rounded-[2px] border border-white/5"
            style={{ left: '2%', right: '78%' }}
          />
          <div 
            className="absolute top-0 bottom-0 bg-white/15 rounded-[2px] border border-white/5"
            style={{ left: '24%', right: '60%' }}
          />
          <div 
            className="absolute top-0 bottom-0 bg-white/15 rounded-[2px] border border-white/5"
            style={{ left: '42%', right: '5%' }}
          />
        </div>

        {/* Track 1 (Bottom Video Layer V1 - Medium White/Grey clips) */}
        <div className="h-1.5 w-full relative">
          <div 
            className="absolute top-0 bottom-0 bg-white/25 rounded-[2px] border border-white/10"
            style={{ left: '15%', right: '50%' }}
          />
          <div 
            className="absolute top-0 bottom-0 bg-white/25 rounded-[2px] border border-white/10"
            style={{ left: '52%', right: '15%' }}
          />
        </div>

      </div>
    </div>
  );
}

import { useRef, useState, useEffect } from 'react';
import { Play, Volume2, VolumeX } from 'lucide-react';
import VideoFullscreenModal from './VideoFullscreenModal';

interface VideoCardProps {
  title: string;
  category: string;
  type: '9:16' | '16:9' | '1:1';
  src?: string;
  thumbnail?: string;
  previewStart?: number;
  startTime?: number;
  endTime?: number;
  objectFit?: 'cover' | 'contain';
  rotate?: 'left' | 'right' | 'none';
  noAudio?: boolean;
}

export default function VideoCard({ title, category, type, src, thumbnail, previewStart, startTime, endTime, objectFit = 'cover', rotate = 'none', noAudio = false }: VideoCardProps) {
  const isPortrait = type === '9:16';
  const isSquare = type === '1:1';
  const videoRef = useRef<HTMLVideoElement>(null);

  const rotateStyle: React.CSSProperties = rotate === 'left' ? {
    width: '56.25%',
    height: '177.78%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%) rotate(-90deg)',
    objectFit: 'cover',
  } : rotate === 'right' ? {
    width: '56.25%',
    height: '177.78%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%) rotate(90deg)',
    objectFit: 'cover',
  } : {};
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenStartTime, setFullscreenStartTime] = useState(0);
  const [actualStartTime, setActualStartTime] = useState(0);
  const [actualEndTime, setActualEndTime] = useState<number | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = noAudio ? true : muted;
    }
  }, [muted, noAudio]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !noAudio) return;

    const handleVolumeChange = () => {
      video.muted = true;
      video.volume = 0;
    };

    video.addEventListener('volumechange', handleVolumeChange);
    return () => {
      video.removeEventListener('volumechange', handleVolumeChange);
    };
  }, [noAudio]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    let startVal = 0;
    let endVal: number | null = null;

    const updateTimes = () => {
      if (startTime !== undefined) {
        if (startTime < 0) {
          startVal = Math.max(0, video.duration + startTime);
        } else {
          startVal = startTime;
        }
      } else {
        startVal = previewStart ?? 0.0;
      }
      
      if (endTime !== undefined) {
        if (endTime < 0) {
          endVal = Math.max(startVal, video.duration + endTime);
        } else {
          endVal = endTime;
        }
      }

      setActualStartTime(startVal);
      setActualEndTime(endVal);
      video.currentTime = startVal;
    };

    const handleLoadedMetadata = () => {
      updateTimes();
    };

    const handleTimeUpdate = () => {
      if (endVal !== null && video.currentTime >= endVal) {
        video.currentTime = startVal;
      }
      if (video.currentTime < startVal) {
        video.currentTime = startVal;
      }
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);

    if (video.readyState >= 1) {
      updateTimes();
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [src, startTime, endTime, previewStart]);

  const handleMouseEnter = () => {
    if (src && videoRef.current && !isFullscreen) {
      videoRef.current.currentTime = actualStartTime;
      videoRef.current.play().catch(() => {});
      setPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    if (src && videoRef.current && !isFullscreen) {
      videoRef.current.pause();
      videoRef.current.currentTime = actualStartTime;
      setPlaying(false);
      setMuted(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMuted((prev) => !prev);
  };

  const handleCardClick = () => {
    if (src && videoRef.current) {
      setFullscreenStartTime(videoRef.current.currentTime);
      videoRef.current.pause();
      setPlaying(false);
      setMuted(false);
      setIsFullscreen(true);
    }
  };

  const handleCloseFullscreen = () => {
    setIsFullscreen(false);
    setMuted(true);
    setPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = actualStartTime;
    }
  };

  return (
    <>
      <div
        className={`group relative overflow-hidden rounded-sm bg-card border border-white/5 cursor-pointer transition-transform duration-700 hover:scale-[1.01] flex flex-col ${
          isPortrait 
            ? 'aspect-[9/16] w-[180px] mx-auto sm:w-auto sm:h-full sm:mx-0' 
            : isSquare 
              ? 'aspect-square w-[240px] mx-auto sm:w-auto sm:h-full sm:mx-0' 
              : 'aspect-video w-full max-w-[320px] mx-auto sm:w-auto sm:h-full sm:max-w-none sm:mx-0'
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleCardClick}
      >
        {src ? (
          <video
            ref={videoRef}
            src={src ? `${src}#t=${actualStartTime}` : undefined}
            poster={thumbnail || undefined}
            muted
            loop
            playsInline
            preload="metadata"
            className={`absolute inset-0 w-full h-full z-0 ${objectFit === 'contain' ? 'object-contain bg-black/90' : 'object-cover'}`}
            style={rotateStyle}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-card to-muted z-0" />
        )}

        {thumbnail && (
          <img
            src={thumbnail}
            alt={title}
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover z-[1] transition-opacity duration-700 ${playing ? 'opacity-0' : 'opacity-100'}`}
            style={rotateStyle}
          />
        )}

        <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-700 z-10" />

        {(!playing || !src) && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 scale-95 group-hover:scale-100">
            <div className="w-16 h-16 rounded-full bg-foreground flex items-center justify-center transition-transform duration-500">
              <Play className="w-6 h-6 text-background ml-1" fill="currentColor" />
            </div>
          </div>
        )}

        {playing && src && !isFullscreen && !noAudio && (
          <button
            onClick={toggleMute}
            className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-background/50 backdrop-blur-md flex items-center justify-center border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-foreground hover:text-background"
            aria-label={muted ? 'Unmute' : 'Mute'}
          >
            {muted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
        )}

        <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-8 z-20 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500">
          <div className="translate-y-2 sm:translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-out">
            <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-serif text-foreground mb-1.5 sm:mb-2 md:mb-3 leading-tight">{title}</h3>
            <span className="inline-block px-2 py-0.5 sm:px-2.5 md:px-3 md:py-1 text-[8px] sm:text-[9px] md:text-[10px] font-mono uppercase tracking-[0.15em] sm:tracking-[0.2em] text-foreground border border-white/20 rounded-full bg-white/5 backdrop-blur-sm">
              {category}
            </span>
          </div>
        </div>
      </div>

      {src && (
        <VideoFullscreenModal
          isOpen={isFullscreen}
          onClose={handleCloseFullscreen}
          src={src}
          title={title}
          poster={thumbnail}
          startTime={fullscreenStartTime}
          muted={noAudio ? true : muted}
          onMutedChange={noAudio ? () => {} : setMuted}
          trimStartTime={startTime}
          trimEndTime={endTime}
          rotate={rotate}
          noAudio={noAudio}
        />
      )}
    </>
  );
}

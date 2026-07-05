import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Volume2, VolumeX } from 'lucide-react';
import VideoLoader from './VideoLoader';

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), video[controls], [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const EASE_OUT = [0, 0, 0.2, 1] as const;
const DURATION = 0.3;

/** Viewport padding so the video never touches screen edges */
const VIEWPORT_PAD_X = 48;
const VIEWPORT_PAD_Y = 48;
/** Reserve space for the native browser control bar below the video frame */
const CONTROL_BAR_RESERVE = 52;

/**
 * Compute the display width for the video element.
 * Only width is set in CSS — height stays `auto` so native controls
 * render at full width below the video frame (not squeezed inside it).
 */
function fitVideoWidth(naturalWidth: number, naturalHeight: number): number {
  const maxW = window.innerWidth - VIEWPORT_PAD_X;
  const maxH = window.innerHeight - VIEWPORT_PAD_Y - CONTROL_BAR_RESERVE;
  const scale = Math.min(maxW / naturalWidth, maxH / naturalHeight);
  return naturalWidth * scale;
}

interface VideoFullscreenModalProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  title: string;
  poster?: string;
  startTime?: number;
  muted: boolean;
  onMutedChange: (muted: boolean) => void;
  trimStartTime?: number;
  trimEndTime?: number;
  rotate?: 'left' | 'right' | 'none';
  noAudio?: boolean;
}

export default function VideoFullscreenModal({
  isOpen,
  onClose,
  src,
  title,
  poster,
  startTime = 0,
  muted,
  onMutedChange,
  trimStartTime,
  trimEndTime,
  rotate = 'none',
  noAudio = false,
}: VideoFullscreenModalProps) {
  const titleId = useId();
  const modalRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const [displayWidth, setDisplayWidth] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const close = useCallback(() => {
    onClose();
  }, [onClose]);

  const syncDisplayWidth = useCallback(() => {
    const video = videoRef.current;
    if (!video || video.videoWidth === 0 || video.videoHeight === 0) return;
    const isRotated = rotate === 'left' || rotate === 'right';
    const w = isRotated ? video.videoHeight : video.videoWidth;
    const h = isRotated ? video.videoWidth : video.videoHeight;
    setDisplayWidth(fitVideoWidth(w, h));
  }, [rotate]);

  useEffect(() => {
    if (!isOpen) {
      setDisplayWidth(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current = document.activeElement as HTMLElement;
    document.body.style.overflow = 'hidden';
    document.body.classList.add('video-fullscreen-open');
    window.dispatchEvent(new CustomEvent('video-fullscreen-change', { detail: { open: true } }));
    window.lenis?.stop();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
        return;
      }

      if (e.key !== 'Tab' || !modalRef.current) return;

      const elements = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((el) => el.offsetParent !== null);

      if (elements.length === 0) return;

      const first = elements[0];
      const last = elements[elements.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    const handleResize = () => syncDisplayWidth();

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);

    const focusTimer = window.setTimeout(() => {
      videoRef.current?.focus();
    }, 50);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = '';
      document.body.classList.remove('video-fullscreen-open');
      window.dispatchEvent(new CustomEvent('video-fullscreen-change', { detail: { open: false } }));
      window.lenis?.start();
      previousFocusRef.current?.focus();
    };
  }, [isOpen, close, syncDisplayWidth]);

  const rotateStyle: React.CSSProperties = rotate === 'left' ? {
    position: 'absolute',
    width: '56.25%',
    height: '177.78%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%) rotate(-90deg)',
    objectFit: 'cover',
  } : rotate === 'right' ? {
    position: 'absolute',
    width: '56.25%',
    height: '177.78%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%) rotate(90deg)',
    objectFit: 'cover',
  } : {};

  const [actualStartTime, setActualStartTime] = useState(0);
  const [actualEndTime, setActualEndTime] = useState<number | null>(null);

  useEffect(() => {
    if (!isOpen || !videoRef.current) return;

    setIsPlaying(true);
    setIsLoading(true);
    const video = videoRef.current;
    let startVal = 0;
    let endVal: number | null = null;

    const updateTimes = () => {
      if (trimStartTime !== undefined) {
        if (trimStartTime < 0) {
          startVal = Math.max(0, video.duration + trimStartTime);
        } else {
          startVal = trimStartTime;
        }
      }
      
      if (trimEndTime !== undefined) {
        if (trimEndTime < 0) {
          endVal = Math.max(startVal, video.duration + trimEndTime);
        } else {
          endVal = trimEndTime;
        }
      }

      setActualStartTime(startVal);
      setActualEndTime(endVal);

      let initialTime = startTime;
      if (initialTime < startVal) {
        initialTime = startVal;
      }
      if (endVal !== null && initialTime > endVal) {
        initialTime = startVal;
      }

      video.currentTime = initialTime;
      video.muted = noAudio ? true : muted;
      video.play().catch(() => {});
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

    const handleVolumeChange = () => {
      if (noAudio) {
        video.muted = true;
        video.volume = 0;
      }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleWaiting = () => setIsLoading(true);
    const handlePlaying = () => {
      setIsPlaying(true);
      setIsLoading(false);
    };
    const handleCanPlay = () => setIsLoading(false);
    const handleSeeking = () => setIsLoading(true);
    const handleSeeked = () => setIsLoading(false);

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('volumechange', handleVolumeChange);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('playing', handlePlaying);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('seeking', handleSeeking);
    video.addEventListener('seeked', handleSeeked);

    if (video.readyState >= 1) {
      updateTimes();
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('volumechange', handleVolumeChange);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('seeking', handleSeeking);
      video.removeEventListener('seeked', handleSeeked);
    };
  }, [isOpen, src, startTime, trimStartTime, trimEndTime, muted, noAudio]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = noAudio ? true : muted;
    }
  }, [muted, noAudio]);

  const handleLoadedMetadata = () => {
    syncDisplayWidth();
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    onMutedChange(!muted);
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          data-lenis-prevent
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: DURATION, ease: EASE_OUT }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/90 cursor-default"
          onClick={close}
        >
          <span id={titleId} className="sr-only">
            {title} — fullscreen video player
          </span>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 p-2.5 text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            aria-label="Close fullscreen video"
          >
            <X className="w-6 h-6" aria-hidden="true" />
          </button>

          {isLoading && (
            <VideoLoader className="absolute z-50" />
          )}

          <motion.div
            initial={{ scale: 0.95, opacity: 0, filter: 'blur(6px)' }}
            animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
            exit={{ scale: 0.95, opacity: 0, filter: 'blur(6px)' }}
            transition={{ duration: DURATION, ease: EASE_OUT }}
            className="relative shrink-0"
            style={{
              willChange: 'transform, opacity, filter',
              width: displayWidth ? `${displayWidth}px` : 0,
              height: displayWidth && (rotate === 'left' || rotate === 'right') ? `${displayWidth * 9 / 16}px` : 'auto',
              opacity: displayWidth ? 1 : 0,
              aspectRatio: rotate === 'left' || rotate === 'right' ? '16/9' : 'auto',
              overflow: rotate === 'left' || rotate === 'right' ? 'hidden' : 'visible',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <video
              ref={videoRef}
              src={src}
              poster={poster}
              playsInline={true}
              muted={muted}
              loop
              tabIndex={0}
              onClick={togglePlay}
              onLoadedMetadata={handleLoadedMetadata}
              onLoadedData={handleLoadedMetadata}
              className="block w-full h-auto bg-black shadow-2xl outline-none focus-visible:ring-2 focus-visible:ring-primary/60 cursor-pointer"
              aria-label={title}
              style={rotateStyle}
            />

            {!isPlaying && !isLoading && (
              <div 
                className="absolute inset-0 flex items-center justify-center bg-black/35 pointer-events-none z-10"
              >
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 text-white scale-100">
                  <svg className="w-6 h-6 fill-current ml-1" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            )}

            {displayWidth && !noAudio && (
              <button
                type="button"
                onClick={toggleMute}
                className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center border border-white/20 text-white hover:bg-black/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                aria-label={muted ? 'Unmute video' : 'Mute video'}
                aria-pressed={!muted}
              >
                {muted ? (
                  <VolumeX className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <Volume2 className="w-4 h-4" aria-hidden="true" />
                )}
              </button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

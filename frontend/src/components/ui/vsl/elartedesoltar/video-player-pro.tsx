"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/vsl/elartedesoltar/button";
import { Play, Pause, Volume2, VolumeX, RotateCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface VideoPlayerProProps {
  src: string;
  srcMobile?: string;
  disableSeek?: boolean;
  onTimeUpdate?: (currentTime: number) => void;
}

const VideoPlayerPro: React.FC<VideoPlayerProProps> = ({ src, srcMobile, disableSeek = false, onTimeUpdate }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [showUnmuteButton, setShowUnmuteButton] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Get the appropriate video source (streaming directly - no blob conversion)
  const videoSrc = isMobile && srcMobile ? srcMobile : src;

  // PROTECTION: Disable right-click, keyboard shortcuts, and devtools
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Disable right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    // Disable keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Block: Ctrl+S, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, F12
      if (
        (e.ctrlKey && e.key === 's') ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.shiftKey && e.key === 'i') ||
        (e.ctrlKey && e.shiftKey && e.key === 'J') ||
        (e.ctrlKey && e.shiftKey && e.key === 'j') ||
        (e.ctrlKey && e.key === 'u') ||
        (e.ctrlKey && e.key === 'U') ||
        e.key === 'F12'
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // Disable drag
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    // Disable select
    const handleSelectStart = (e: Event) => {
      e.preventDefault();
      return false;
    };

    container.addEventListener('contextmenu', handleContextMenu);
    container.addEventListener('dragstart', handleDragStart);
    container.addEventListener('selectstart', handleSelectStart);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('contextmenu', handleContextMenu);
      container.removeEventListener('dragstart', handleDragStart);
      container.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // PROTECTION: Detect DevTools and disable video when open
  useEffect(() => {
    let devToolsOpen = false;
    const threshold = 160;

    const detectDevTools = () => {
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold = window.outerHeight - window.innerHeight > threshold;
      
      if (widthThreshold || heightThreshold) {
        if (!devToolsOpen) {
          devToolsOpen = true;
          // Pause video when devtools detected
          if (videoRef.current && !videoRef.current.paused) {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        }
      } else {
        devToolsOpen = false;
      }
    };

    const interval = setInterval(detectDevTools, 1000);
    window.addEventListener('resize', detectDevTools);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', detectDevTools);
    };
  }, []);

  // Autoplay: video MUST start muted (browser policy)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure muted for autoplay to work
    video.muted = true;
    video.volume = 1;

    // Play video as soon as possible
    const playVideo = async () => {
      try {
        await video.play();
        setIsPlaying(true);
        setIsLoaded(true);
      } catch (e) {
        console.log("Autoplay failed, will retry on interaction");
      }
    };

    // Handle when video can start playing (doesn't need full download!)
    const handleCanPlay = () => {
      setIsLoaded(true);
      playVideo();
    };

    // Try to play immediately if already loaded
    if (video.readyState >= 3) {
      handleCanPlay();
    }

    // Listen for when video is ready to play (streaming!)
    video.addEventListener('canplay', handleCanPlay);

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [videoSrc]);

  // Unmute - requires user interaction
  const handleUnmute = () => {
    const video = videoRef.current;
    if (!video) return;
    
    video.muted = false;
    setIsMuted(false);
    setShowUnmuteButton(false);
    
    // Also play if paused
    if (video.paused) {
      video.play().then(() => setIsPlaying(true));
    }
  };

  // Toggle play/pause
  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    
    if (isEnded) {
      video.currentTime = 0;
      setIsEnded(false);
    }
    
    if (video.paused) {
      video.play().then(() => setIsPlaying(true));
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [isEnded]);

  // VSL-style progress: starts VERY fast, then crawls
  const calculateVSLProgress = (realProgress: number): number => {
    if (realProgress <= 5) {
      return (realProgress / 5) * 40;
    } else if (realProgress <= 15) {
      return 40 + ((realProgress - 5) / 10) * 25;
    } else if (realProgress <= 40) {
      return 65 + ((realProgress - 15) / 25) * 15;
    } else {
      return 80 + ((realProgress - 40) / 60) * 20;
    }
  };

  // Progress update
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    const realProgress = (video.currentTime / video.duration) * 100;
    const vslProgress = calculateVSLProgress(isFinite(realProgress) ? realProgress : 0);
    setProgress(vslProgress);
    
    // Notify parent of current time
    if (onTimeUpdate) {
      onTimeUpdate(video.currentTime);
    }
  };

  // Video ended
  const handleEnded = () => {
    setIsEnded(true);
    setIsPlaying(false);
  };

  // Seek
  const handleSeek = (percent: number) => {
    if (disableSeek) return;
    const video = videoRef.current;
    if (!video) return;
    const time = (percent / 100) * video.duration;
    if (isFinite(time)) video.currentTime = time;
    setProgress(percent);
  };

  // Toggle mute
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
    if (!video.muted) setShowUnmuteButton(false);
  };

  // Toggle controls visibility on click
  const toggleControls = () => {
    setShowControls(prev => !prev);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-xl bg-black select-none"
      style={{ 
        WebkitUserSelect: 'none', 
        userSelect: 'none',
        WebkitTouchCallout: 'none'
      }}
    >
      {/* PROTECTION: Invisible overlay to prevent direct video interaction */}
      <div 
        className="absolute inset-0 z-10"
        onClick={toggleControls}
        onContextMenu={(e) => { e.preventDefault(); return false; }}
        style={{ 
          background: 'transparent',
          WebkitUserSelect: 'none',
          userSelect: 'none'
        }}
      />

      <video
        ref={videoRef}
        className="w-full pointer-events-none"
        src={videoSrc}
        muted
        playsInline
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onLoadedData={() => setIsLoaded(true)}
        // PROTECTION: Disable native controls and download
        controls={false}
        controlsList="nodownload noplaybackrate nofullscreen"
        disablePictureInPicture
        disableRemotePlayback
        style={{
          WebkitUserSelect: 'none',
          userSelect: 'none',
          pointerEvents: 'none'
        }}
        // @ts-ignore - These are valid HTML attributes
        onDragStart={(e: React.DragEvent) => e.preventDefault()}
      />

      {/* Loading overlay - shows while video is buffering */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-black flex items-center justify-center z-5">
          <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}

      {/* UNMUTE BUTTON - Shows when video is muted */}
      {showUnmuteButton && isMuted && isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <button
            onClick={handleUnmute}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-bold text-lg flex items-center gap-2 shadow-lg transition-all hover:scale-105"
          >
            <VolumeX className="w-6 h-6" />
            ACTIVAR SONIDO
          </button>
        </div>
      )}

      {/* Progress Bar - Always visible at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-2 z-20">
        <div
          className={cn(
            "relative w-full h-1.5 bg-white/30 rounded-full",
            disableSeek ? "cursor-not-allowed" : "cursor-pointer"
          )}
          onClick={(e) => {
            if (disableSeek) return;
            const rect = e.currentTarget.getBoundingClientRect();
            handleSeek((e.clientX - rect.left) / rect.width * 100);
          }}
        >
          <div
            className="absolute top-0 left-0 h-full bg-red-600 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Controls - Show on click */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[95%] backdrop-blur-md bg-black/50 rounded-xl p-3 z-30"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-1">
                {/* Play/Pause */}
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 active:bg-white/30 min-w-[44px] min-h-[44px]" onClick={(e) => { e.stopPropagation(); togglePlay(); }}>
                  {isEnded ? <RotateCw className="w-6 h-6" /> : isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </Button>

                {/* Mute/Unmute */}
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 active:bg-white/30 min-w-[44px] min-h-[44px]" onClick={(e) => { e.stopPropagation(); toggleMute(); }}>
                  {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PROTECTION: CSS to disable selection and interaction */}
      <style>{`
        video::-webkit-media-controls {
          display: none !important;
        }
        video::-webkit-media-controls-enclosure {
          display: none !important;
        }
        video::-webkit-media-controls-panel {
          display: none !important;
        }
        video::-webkit-media-controls-play-button {
          display: none !important;
        }
        video::-webkit-media-controls-start-playback-button {
          display: none !important;
        }
        video::-webkit-media-controls-overlay-play-button {
          display: none !important;
        }
        video::-internal-media-controls-download-button {
          display: none !important;
        }
        video::-webkit-media-controls-download-button {
          display: none !important;
        }
        video::-webkit-media-controls-fullscreen-button {
          display: none !important;
        }
        video::--webkit-media-controls-fullscreen-button {
          display: none !important;
        }
        video::-internal-media-controls-fullscreen-button {
          display: none !important;
        }
      `}</style>
    </div>
  );
};

export default VideoPlayerPro;

"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/elartedesoltar/button";
import { Play, Pause, Volume2, VolumeX, Maximize2, RotateCw } from "lucide-react";
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
  const [isHovering, setIsHovering] = useState(false);
  const [showUnmuteButton, setShowUnmuteButton] = useState(true);
  const [videoSrcUrl, setVideoSrcUrl] = useState<string | null>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(false);

  const [isIOS, setIsIOS] = useState(false);

  // Detect mobile and iOS
  useEffect(() => {
    const checkMobile = () => {
      const isMobileByWidth = window.innerWidth < 768;
      const isMobileByAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(isMobileByWidth || isMobileByAgent);
      
      // Detect iOS specifically (Safari doesn't support WebM)
      const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
      setIsIOS(isIOSDevice);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Convert Cloudinary WebM URL to MP4 for iOS/Safari compatibility
  const convertToMP4 = (url: string): string => {
    if (!url) return url;
    
    // Cloudinary URL format: .../upload/[optional transformations]/filename.ext
    // We need to add f_mp4 transformation to convert format on-the-fly
    if (url.includes('cloudinary.com')) {
      // Check if URL already has transformations
      const uploadIndex = url.indexOf('/upload/');
      if (uploadIndex !== -1) {
        const beforeUpload = url.substring(0, uploadIndex + 8); // includes '/upload/'
        const afterUpload = url.substring(uploadIndex + 8);
        
        // Check if there are already transformations (starts with v followed by numbers for version)
        if (afterUpload.startsWith('v') && /^v\d+\//.test(afterUpload)) {
          // Has version, add transformation after version
          const versionEnd = afterUpload.indexOf('/');
          const version = afterUpload.substring(0, versionEnd + 1);
          const rest = afterUpload.substring(versionEnd + 1);
          // Replace extension and add format transformation
          const newRest = rest.replace(/\.webm$/i, '.mp4');
          return `${beforeUpload}${version}f_mp4/${newRest}`;
        } else {
          // No version, add transformation directly
          const newAfterUpload = afterUpload.replace(/\.webm$/i, '.mp4');
          return `${beforeUpload}f_mp4/${newAfterUpload}`;
        }
      }
      // Fallback: just replace extension
      return url.replace(/\.webm$/i, '.mp4');
    }
    return url;
  };

  // Check if browser supports WebM (Safari/iOS don't)
  const supportsWebM = (): boolean => {
    if (typeof document === 'undefined') return true;
    const video = document.createElement('video');
    return video.canPlayType('video/webm; codecs="vp8, vorbis"') !== '' ||
           video.canPlayType('video/webm; codecs="vp9"') !== '';
  };

  // Get the appropriate video source - use MP4 for iOS/Safari or browsers without WebM support
  const getVideoSource = (): string => {
    const baseSource = isMobile && srcMobile ? srcMobile : src;
    // iOS Safari and some browsers don't support WebM, use MP4 instead
    if (baseSource.endsWith('.webm')) {
      // Check if it's iOS or if browser doesn't support WebM
      if (isIOS || !supportsWebM()) {
        console.log("Converting to MP4 for compatibility");
        return convertToMP4(baseSource);
      }
    }
    return baseSource;
  };

  const videoSrc = getVideoSource();

  // Set mobile-specific video attributes (needed for iOS/Android)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    // These attributes help with iOS playback
    video.setAttribute('webkit-playsinline', 'true');
    video.setAttribute('x5-playsinline', 'true');
    video.setAttribute('x5-video-player-type', 'h5');
    video.setAttribute('x5-video-player-fullscreen', 'true');
    video.setAttribute('x5-video-orientation', 'portraint');
  }, []);

  // On mobile/iOS: Use direct URL (faster, more reliable, required for iOS)
  // On desktop: Try blob for protection, fallback to direct URL
  useEffect(() => {
    let isCancelled = false;
    
    // Reset states when source changes
    setIsVideoReady(false);
    setShowPlayButton(false);
    
    const loadVideo = async () => {
      // On mobile or iOS, always use direct URL for better compatibility
      // iOS requires direct URL for proper video playback
      if (isMobile || isIOS) {
        if (!isCancelled) {
          console.log("Using direct URL for mobile/iOS:", videoSrc);
          setVideoSrcUrl(videoSrc);
        }
        return;
      }
      
      // On desktop, try blob loading for protection
      try {
        const response = await fetch(videoSrc, {
          mode: 'cors',
          credentials: 'omit'
        });
        const blob = await response.blob();
        if (!isCancelled) {
          const url = URL.createObjectURL(blob);
          setVideoSrcUrl(url);
        }
      } catch (error) {
        // Fallback to direct URL if blob fails (CORS issues)
        console.log("Blob loading failed, using direct URL");
        if (!isCancelled) {
          setVideoSrcUrl(videoSrc);
        }
      }
    };

    loadVideo();

    return () => {
      isCancelled = true;
      if (videoSrcUrl && videoSrcUrl.startsWith('blob:')) {
        URL.revokeObjectURL(videoSrcUrl);
      }
    };
  }, [videoSrc, isMobile, isIOS]);

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
    if (!video || !videoSrcUrl) return;

    // Ensure muted for autoplay to work
    video.muted = true;
    video.volume = 1;

    // Play video with mobile-friendly approach
    const playVideo = async () => {
      try {
        // Set video ready state
        setIsVideoReady(true);
        
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
              setShowPlayButton(false);
            })
            .catch((error) => {
              // Autoplay was prevented - show play button for user interaction
              console.log("Autoplay blocked, showing play button:", error.name);
              setIsPlaying(false);
              setShowPlayButton(true);
            });
        }
      } catch (e) {
        console.log("Autoplay failed, showing play button");
        setShowPlayButton(true);
      }
    };

    // Try to play on various events for maximum compatibility
    const handleCanPlay = () => {
      setIsVideoReady(true);
      playVideo();
    };

    video.addEventListener('loadeddata', handleCanPlay);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('canplaythrough', handleCanPlay);
    
    // Also try immediately if video is already loaded
    if (video.readyState >= 3) {
      handleCanPlay();
    }

    return () => {
      video.removeEventListener('loadeddata', handleCanPlay);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('canplaythrough', handleCanPlay);
    };
  }, [videoSrcUrl]);

  // Unmute - requires user interaction
  const handleUnmute = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    const video = videoRef.current;
    if (!video) return;
    
    video.muted = false;
    setIsMuted(false);
    setShowUnmuteButton(false);
    
    // Also play if paused (important for mobile)
    if (video.paused) {
      video.play()
        .then(() => {
          setIsPlaying(true);
          setShowPlayButton(false);
        })
        .catch((err) => console.log("Play after unmute failed:", err));
    }
  }, []);

  // Toggle play/pause
  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    
    if (isEnded) {
      video.currentTime = 0;
      setIsEnded(false);
    }
    
    if (video.paused) {
      video.play()
        .then(() => {
          setIsPlaying(true);
          setShowPlayButton(false);
        })
        .catch((err) => console.log("Play toggle failed:", err));
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [isEnded]);

  // Handle container click - for play/pause
  const handleContainerInteraction = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // If showing play button (autoplay was blocked), play the video
    if (showPlayButton) {
      const video = videoRef.current;
      if (video) {
        video.play()
          .then(() => {
            setIsPlaying(true);
            setShowPlayButton(false);
          })
          .catch((err) => console.log("Play on tap failed:", err));
      }
      return;
    }
    
    // Otherwise toggle play/pause
    togglePlay();
  }, [showPlayButton, togglePlay]);

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

  // Fullscreen - with mobile/iOS support
  const toggleFullscreen = useCallback(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    
    if (!container) return;
    
    // Check if already in fullscreen
    const isFullscreen = document.fullscreenElement || 
      (document as any).webkitFullscreenElement ||
      (document as any).mozFullScreenElement ||
      (document as any).msFullscreenElement;
    
    if (!isFullscreen) {
      // Try standard fullscreen API first
      if (container.requestFullscreen) {
        container.requestFullscreen().catch(() => {
          // Fallback: try video fullscreen for iOS
          if (video && (video as any).webkitEnterFullscreen) {
            (video as any).webkitEnterFullscreen();
          }
        });
      } else if ((container as any).webkitRequestFullscreen) {
        (container as any).webkitRequestFullscreen();
      } else if ((container as any).mozRequestFullScreen) {
        (container as any).mozRequestFullScreen();
      } else if ((container as any).msRequestFullscreen) {
        (container as any).msRequestFullscreen();
      } else if (video && (video as any).webkitEnterFullscreen) {
        // iOS Safari fallback - use native video fullscreen
        (video as any).webkitEnterFullscreen();
      }
    } else {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        (document as any).mozCancelFullScreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
    }
  }, []);

  // Toggle mute
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
    if (!video.muted) setShowUnmuteButton(false);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-xl bg-black select-none"
      onMouseEnter={() => !isMobile && setIsHovering(true)}
      onMouseLeave={() => !isMobile && setIsHovering(false)}
      style={{ 
        WebkitUserSelect: 'none', 
        userSelect: 'none',
        WebkitTouchCallout: 'none'
      }}
    >
      {/* PROTECTION: Invisible overlay to prevent direct video interaction */}
      <div 
        className="absolute inset-0 z-10"
        onClick={handleContainerInteraction}
        onContextMenu={(e) => { e.preventDefault(); return false; }}
        style={{ 
          background: 'transparent',
          WebkitUserSelect: 'none',
          userSelect: 'none',
          touchAction: 'manipulation'
        }}
      />

      {videoSrcUrl && (
        <video
          ref={videoRef}
          className="w-full pointer-events-none"
          src={videoSrcUrl}
          muted
          playsInline
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          onPlay={() => {
            setIsPlaying(true);
            setShowPlayButton(false);
          }}
          onPause={() => setIsPlaying(false)}
          onLoadedData={() => setIsVideoReady(true)}
          onCanPlay={() => setIsVideoReady(true)}
          onError={(e) => {
            console.error("Video load error:", e);
            // If MP4 conversion failed, try original source as last resort
            const video = e.currentTarget;
            if (video.src !== src && video.src !== srcMobile) {
              console.log("Trying original source as fallback");
              const fallbackSrc = isMobile && srcMobile ? srcMobile : src;
              setVideoSrcUrl(fallbackSrc);
            }
          }}
          // PROTECTION: Disable native controls and download
          controls={false}
          controlsList="nodownload noplaybackrate"
          disablePictureInPicture
          disableRemotePlayback
          crossOrigin="anonymous"
          style={{
            WebkitUserSelect: 'none',
            userSelect: 'none',
            pointerEvents: 'none'
          }}
          // @ts-ignore - These are valid HTML attributes
          onDragStart={(e: React.DragEvent) => e.preventDefault()}
        />
      )}

      {/* Loading state while video is loading */}
      {!videoSrcUrl && (
        <div className="w-full aspect-video bg-black flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}

      {/* PLAY BUTTON - Shows when autoplay was blocked (common on mobile) */}
      {showPlayButton && videoSrcUrl && !isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <button
            onClick={handleContainerInteraction}
            className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white w-20 h-20 md:w-24 md:h-24 rounded-full font-bold text-lg flex items-center justify-center shadow-lg transition-all hover:scale-105 active:scale-95"
            style={{ touchAction: 'manipulation' }}
          >
            <Play className="w-10 h-10 md:w-12 md:h-12 ml-1" fill="white" />
          </button>
        </div>
      )}

      {/* UNMUTE BUTTON - Shows when video is playing but muted */}
      {showUnmuteButton && isMuted && videoSrcUrl && isPlaying && !showPlayButton && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <button
            onClick={handleUnmute}
            className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white px-6 py-3 rounded-full font-bold text-lg flex items-center gap-2 shadow-lg transition-all hover:scale-105 active:scale-95"
            style={{ touchAction: 'manipulation' }}
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
            "relative w-full h-2 md:h-1.5 bg-white/30 rounded-full",
            disableSeek ? "cursor-not-allowed" : "cursor-pointer"
          )}
          onClick={(e) => {
            if (disableSeek) return;
            const rect = e.currentTarget.getBoundingClientRect();
            handleSeek((e.clientX - rect.left) / rect.width * 100);
          }}
          onTouchEnd={(e) => {
            if (disableSeek) return;
            const touch = e.changedTouches[0];
            const rect = e.currentTarget.getBoundingClientRect();
            handleSeek((touch.clientX - rect.left) / rect.width * 100);
          }}
          style={{ touchAction: 'manipulation' }}
        >
          <div
            className="absolute top-0 left-0 h-full bg-red-600 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Controls - Show on hover (desktop) or always visible (mobile) */}
      <AnimatePresence>
        {(isHovering || isMobile) && isVideoReady && (
          <motion.div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[95%] backdrop-blur-md bg-black/50 rounded-xl p-2 md:p-3 z-30"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: isMobile ? 0.9 : 1 }}
            exit={{ y: 20, opacity: 0 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 md:gap-2">
                {/* Play/Pause */}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-white hover:bg-white/20 active:bg-white/30 h-10 w-10 md:h-10 md:w-10" 
                  onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                >
                  {isEnded ? <RotateCw className="w-5 h-5" /> : isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </Button>

                {/* Mute/Unmute */}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-white hover:bg-white/20 active:bg-white/30 h-10 w-10 md:h-10 md:w-10" 
                  onClick={(e) => { e.stopPropagation(); toggleMute(); }}
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </Button>
              </div>

              {/* Fullscreen */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-white/20 active:bg-white/30 h-10 w-10 md:h-10 md:w-10" 
                onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }}
              >
                <Maximize2 className="w-5 h-5" />
              </Button>
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
      `}</style>
    </div>
  );
};

export default VideoPlayerPro;

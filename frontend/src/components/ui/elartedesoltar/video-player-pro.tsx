"use client";

import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/elartedesoltar/button";
import { Play, Pause, Volume2, VolumeX, Maximize2, RotateCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface VideoPlayerProProps {
  src: string;
  srcMobile?: string;
  disableSeek?: boolean;
}

const VideoPlayerPro: React.FC<VideoPlayerProProps> = ({ src, srcMobile, disableSeek = false }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [showUnmuteButton, setShowUnmuteButton] = useState(true);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Get the appropriate video source
  const videoSrc = isMobile && srcMobile ? srcMobile : src;

  // Autoplay: video MUST start muted (browser policy)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure muted for autoplay to work
    video.muted = true;
    video.volume = 1;

    // Play video
    const playVideo = async () => {
      try {
        await video.play();
        setIsPlaying(true);
      } catch (e) {
        console.log("Autoplay failed, will retry");
      }
    };

    // Try to play
    playVideo();

    // Retry on load events
    video.addEventListener('loadeddata', playVideo);
    video.addEventListener('canplay', playVideo);

    return () => {
      video.removeEventListener('loadeddata', playVideo);
      video.removeEventListener('canplay', playVideo);
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
  const togglePlay = () => {
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
  };

  // VSL-style progress: starts VERY fast, then crawls
  // This makes the user not know exactly how much time is left
  const calculateVSLProgress = (realProgress: number): number => {
    // realProgress is 0-100 (actual video progress)
    // We transform it so:
    // - First 5% of video = 0-40% of bar (SUPER fast)
    // - 5-15% of video = 40-65% of bar (fast)
    // - 15-40% of video = 65-80% of bar (medium)
    // - Last 60% of video = 80-100% of bar (very slow)
    
    if (realProgress <= 5) {
      // First 5% of video → 0-40% of bar (8x speed)
      return (realProgress / 5) * 40;
    } else if (realProgress <= 15) {
      // 5-15% of video → 40-65% of bar (2.5x speed)
      return 40 + ((realProgress - 5) / 10) * 25;
    } else if (realProgress <= 40) {
      // 15-40% of video → 65-80% of bar (0.6x speed)
      return 65 + ((realProgress - 15) / 25) * 15;
    } else {
      // 40-100% of video → 80-100% of bar (0.33x speed - crawling)
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

  // Fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

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
      className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-xl bg-black"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <video
        ref={videoRef}
        className="w-full"
        src={videoSrc}
        muted
        playsInline
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onClick={togglePlay}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* UNMUTE BUTTON - Shows when video is muted */}
      {showUnmuteButton && isMuted && (
        <div className="absolute inset-0 flex items-center justify-center">
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
      <div className="absolute bottom-0 left-0 right-0 p-2">
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

      {/* Controls - Show on hover */}
      <AnimatePresence>
        {isHovering && (
          <motion.div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[95%] backdrop-blur-md bg-black/50 rounded-xl p-3"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {/* Play/Pause */}
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={togglePlay}>
                  {isEnded ? <RotateCw className="w-5 h-5" /> : isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </Button>

                {/* Mute/Unmute */}
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={toggleMute}>
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </Button>
              </div>

              {/* Fullscreen */}
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={toggleFullscreen}>
                <Maximize2 className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideoPlayerPro;

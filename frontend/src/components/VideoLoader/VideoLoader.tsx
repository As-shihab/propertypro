import React, { useRef, useState, useEffect } from "react";

interface LazyLoadVideoProps {
  src: string;
  poster?: string;
  controls?: boolean;
  muted?: boolean;
  loop?: boolean;
  className?: string;
  isOnMousePlay?: boolean;
}

const LazyLoadVideo: React.FC<LazyLoadVideoProps> = ({
  src,
  poster,
  controls = true,
  muted = false,
  loop = false,
  className,
  isOnMousePlay = false,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Lazy load with IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );

    if (videoRef.current) observer.observe(videoRef.current);

    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  }, []);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleMouseEnter = () => {
    if (isOnMousePlay && videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    if (isOnMousePlay && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div
      className="relative w-full max-w-3xl group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Video */}
      <video
        ref={videoRef}
        className={`w-full rounded-xl shadow-lg transition-opacity duration-500 ${
          !isLoaded ? "opacity-0" : "opacity-100"
        } ${className}`}
        poster={poster}
        controls={controls && isPlaying}
        muted={muted}
        loop={loop}
        preload="metadata" // only fetch metadata, not full video
        onLoadedData={() => setIsLoaded(true)}
      >
        {isVisible && <source src={src} type="video/mp4" />}
      </video>

      {/* Blur Preview + Loader */}
      {!isLoaded && poster && (
        <div className="absolute inset-0 flex items-center justify-center rounded-xl overflow-hidden">
          <img
            src={poster}
            alt="video preview"
            className="w-full h-full object-cover blur-xl scale-105"
          />
          {/* Shimmer Loading Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_1.5s_infinite]"></div>
        </div>
      )}

      {/* Play button overlay (only if not hover play) */}
      {!isOnMousePlay && !isPlaying && (
        <button
          onClick={handlePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/60 transition-colors rounded-xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-white drop-shadow-xl"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default LazyLoadVideo;

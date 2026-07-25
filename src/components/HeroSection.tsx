import React, { useEffect, useRef } from 'react';

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Auto-play catch for mobile browser policies
      });
    }
  }, []);

  return (
    <section className="relative w-full h-auto aspect-[9/18] md:h-screen md:aspect-auto lg:h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20 lg:pt-0">
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source
            src="/images/athos_video.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
};

export default HeroSection;
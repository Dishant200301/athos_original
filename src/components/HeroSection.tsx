import React, { useState, useEffect, useRef } from 'react';

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(() => {
    return typeof window !== 'undefined' ? window.innerWidth < 768 : false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Auto-play catch for mobile browser policies
      });
    }
  }, [isMobile]);

  return (
    <section className="relative w-full h-auto aspect-[9/16] md:h-screen md:aspect-auto lg:h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20 lg:pt-0">
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          key={isMobile ? 'mobile' : 'desktop'}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source
            src={isMobile ? '/images/athos_video_mobile.mp4' : '/images/athos_video.mp4'}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
};

export default HeroSection;
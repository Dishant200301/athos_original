import React, { useState, useEffect } from 'react';

const HeroSection = () => {
  // Determine if mobile screen size synchronously on initial client-side render
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

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20">
      <div className="absolute inset-0">
        <video
          key={isMobile ? 'mobile' : 'desktop'}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src={isMobile ? "/images/athos_video_mobile.mp4" : "/images/athos_video.mp4"}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        {/* Mobile overlay for better text visibility if needed */}
        <div className="absolute inset-0 bg-black/20 md:bg-transparent" />
      </div>
    </section>
  );
};

export default HeroSection;
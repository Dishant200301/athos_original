import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20">
      <div className="absolute inset-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/images/athos_video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Mobile overlay for better text visibility if needed */}
        <div className="absolute inset-0 bg-black/20 md:bg-transparent" />
      </div>
    </section>
  );
};

export default HeroSection;
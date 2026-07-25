import React from 'react';

const RDSection = () => {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-4 lg:px-10">
        <h2 className="mb-4 md:mb-6 text-2xl sm:text-3xl md:text-4xl text-left" style={{ fontFamily: 'Inter', color: 'rgba(29, 129, 165, 1)', fontWeight: '500' }}>
          R & D
        </h2>
        <div className="w-full overflow-hidden rounded-xl shadow-sm">
          <img
            src="/images/R&D.png"
            alt="Research and Development"
            className="w-full h-auto max-h-[700px] object-cover block"
          />
        </div>
      </div>
    </section>
  );
};

export default RDSection;

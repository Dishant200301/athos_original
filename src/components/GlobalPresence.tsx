import React from 'react';
import { useTranslation } from 'react-i18next';

const GlobalPresence = () => {
  const { t } = useTranslation();

  const renderTextWithFiCollaLogo = (text: string) => {
    const regex = /FiColla/gi;
    const parts = text.split(regex);
    if (parts.length === 1) return text;
    return (
      <>
        {parts.reduce((acc: React.ReactNode[], part, i) => {
          if (i === 0) return [part];
          return [
            ...acc,
            <a
              key={`ficolla-link-${i}`}
              href="https://ficolla.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center align-middle mx-1 transition-all duration-300 hover:scale-105"
            >
              <img
                src="/images/Fi-Colla-Logo.png"
                alt="FiColla Logo"
                className="h-[14px] sm:h-[16px] md:h-[18px] object-contain inline-block"
              />
            </a>,
            part
          ];
        }, [])}
      </>
    );
  };

  return (
    <section className="pt-16 md:pt-20 pb-0 bg-background">
      <div className="container mx-auto px-4 md:px-4 lg:px-10">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl" style={{fontFamily: 'Inter', color: 'rgba(29, 129, 165, 1)', fontWeight: '500'}}>
            {t('home.globalPresence.title')}
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Map - Left Side */}
          <div className="relative overflow-hidden rounded-xl w-full">
            <img
              src="/images/map.jpg"
              alt="ATHOS Global Presence Map"
              className="w-full h-auto object-contain rounded-xl"
            />
          </div>

          {/* Content - Right Side */}
          <div>
            <p className="leading-relaxed text-base sm:text-lg font-inter mb-4" style={{color: 'rgba(112, 112, 112, 1)', fontFamily: 'Inter, sans-serif'}}>
              {renderTextWithFiCollaLogo(t('home.globalPresence.description'))}
            </p>
            {t('home.globalPresence.description2', { defaultValue: '' }) && (
              <p className="leading-relaxed text-base sm:text-lg font-inter" style={{color: 'rgba(112, 112, 112, 1)', fontFamily: 'Inter, sans-serif'}}>
                {renderTextWithFiCollaLogo(t('home.globalPresence.description2'))}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalPresence;
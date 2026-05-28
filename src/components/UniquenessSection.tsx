import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface UniquenessSectionProps {
  noTopPadding?: boolean;
  features?: string[];
  imageSrc?: string;
  imageAlt?: string;
  showBgImage?: boolean;
}

const UniquenessSection = ({ 
  noTopPadding = false,
  features,
  imageSrc,
  imageAlt,
  showBgImage = true
}: UniquenessSectionProps) => {
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
    <section className={`${noTopPadding ? 'pb-0' : 'pt-16 md:pt-20 pb-0'} bg-background`}>
      <div
        className="bg-white rounded-none p-6 md:p-8 lg:p-12 relative overflow-hidden mx-0"
        style={showBgImage ? {
          backgroundImage: 'url(/images/uniqueness_background.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        } : {}}
      >
        {/* Optional overlay for better text readability */}
        {showBgImage && <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]"></div>}

        {/* Content wrapper with relative positioning */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32">
          <h2 className="mb-6 md:mb-10 text-center text-2xl sm:text-3xl md:text-4xl" style={{ fontFamily: 'Inter', color: 'rgba(29, 129, 165, 1)', fontWeight: '500' }}>
            {t('home.uniqueness.title')}
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Body parts graphic */}
            <div className="flex justify-center order-2 lg:order-2">
              <img
                src={imageSrc || "/images/body_part.png"}
                alt={imageAlt || "Collagen Body Benefits"}
                className="w-full max-w-sm md:max-w-xl h-auto object-contain"
              />
            </div>

            {/* Bullet points */}
            <div className="order-1 lg:order-1">
              <ul className="space-y-2 md:space-y-3 pl-0 md:pl-2 text-base md:text-lg font-inter" style={{ color: 'rgba(112, 112, 112, 1)', fontFamily: 'Inter, sans-serif' }}>
                {(features || (t('home.uniqueness.features', { returnObjects: true }) as string[])).map((feature: string, index: number) => {
                  const colonIndex = feature.indexOf(':');
                  if (colonIndex !== -1) {
                    const title = feature.substring(0, colonIndex);
                    const rest = feature.substring(colonIndex);
                    return (
                      <li key={index} className="flex items-start gap-3">
                        <span className="mt-1.5 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] flex-shrink-0" style={{ borderBottomColor: 'rgba(106, 191, 0, 1)' }}></span>
                        <span>
                          <strong className="font-semibold" style={{ color: 'rgba(67, 67, 64, 1)' }}>{renderTextWithFiCollaLogo(title)}</strong>{renderTextWithFiCollaLogo(rest)}
                        </span>
                      </li>
                    );
                  }
                  return (
                    <li key={index} className="flex items-start gap-3">
                      <span className="mt-1.5 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] flex-shrink-0" style={{ borderBottomColor: 'rgba(106, 191, 0, 1)' }}></span>
                      <span>{renderTextWithFiCollaLogo(feature)}</span>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-6 md:mt-8">
                <Link to="/contact">
                  <Button
                    variant="outline"
                    className="px-4 md:px-6 py-4 md:py-6 text-sm md:text-base transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-green-400/30 group relative overflow-hidden athos-button-hover w-full sm:w-auto"
                    style={{ color: 'rgba(112, 112, 112, 1)' }}
                  >
                    <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                      {t('home.uniqueness.cta')}
                    </span>
                    <div
                      className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                      style={{ backgroundColor: 'rgba(106, 191, 0, 1)' }}
                    ></div>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UniquenessSection;
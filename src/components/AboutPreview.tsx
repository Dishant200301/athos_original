import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { useTranslation } from 'react-i18next';

const AboutPreview = ({ isMobile = false }: { isMobile?: boolean }) => {
  const { t } = useTranslation();
  const [imageRef, imageVisible] = useScrollAnimation(0.1);
  const [textRef, textVisible] = useScrollAnimation(0.1);

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
      <div className="container mx-auto px-4 lg:px-10 xl:px-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Image - Coming from left */}
          <div
            ref={imageRef}
            className={`order-1 flex w-full lg:w-[550px] lg:h-[404px] ${isMobile
              ? 'opacity-100 translate-x-0'
              : `transition-all duration-700 ease-out ${imageVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`
              }`}
          >
            <div className="relative flex-1 overflow-hidden rounded-tl-[32px] rounded-br-[32px] rounded-tr-none rounded-bl-none w-full min-h-[300px] sm:min-h-[400px] lg:min-h-0 lg:w-[550px] lg:h-[404px]">
              <img
                src="/images/Athos_factory.png"
                alt="ATHOS Collagen Facility"
                className="hidden sm:block w-full h-full object-cover rounded-tl-[32px] rounded-br-[32px] rounded-tr-none rounded-bl-none absolute inset-0"
              />
              <img
                src="/images/athos_factory_mobile.png"
                alt="ATHOS Collagen Facility Mobile"
                className="block sm:hidden w-full h-full object-cover rounded-tl-[32px] rounded-br-[32px] rounded-tr-none rounded-bl-none absolute inset-0"
              />
            </div>
          </div>

          {/* Content - Coming from right */}
          <div
            ref={textRef}
            className={`order-2 ${isMobile
              ? 'opacity-100 translate-x-0'
              : `transition-all duration-700 ease-out ${textVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
              }`
              }`}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-4 md:mb-6" style={{ color: 'rgba(29, 129, 165, 1)', fontFamily: 'Inter, sans-serif', fontWeight: '500' }}>
              {t('home.aboutPreview.title')}
            </h2>
            <p className="mb-4 leading-relaxed text-sm sm:text-base font-inter" style={{ color: 'rgba(112, 112, 112, 1)', fontFamily: 'Inter, sans-serif' }}>
              {renderTextWithFiCollaLogo(t('home.aboutPreview.description1'))}
            </p>
            <p className="mb-6 md:mb-4 leading-relaxed text-sm sm:text-base font-inter" style={{ color: 'rgba(112, 112, 112, 1)', fontFamily: 'Inter, sans-serif' }}>
              {renderTextWithFiCollaLogo(t('home.aboutPreview.description2'))}
            </p>

            {/* Our Strength and Our Commitment - Side by Side */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-6 md:mb-8 lg:mb-0">
              {/* Our Strength Section */}
              <div>
                <h3 className="text-lg md:text-xl mb-3 md:mb-4" style={{ color: 'rgba(29, 129, 165, 1)', fontFamily: 'Inter, sans-serif', fontWeight: '500' }}>{t('home.aboutPreview.ourStrength')}</h3>
                <div className="space-y-2 md:space-y-3">
                  <div className="flex items-center space-x-2 md:space-x-3">
                    <img
                      src="/images/Our_Strength/Group_49548.png"
                      alt="Authenticity"
                      className="h-5 w-5 sm:h-6 sm:w-6 object-contain"
                    />
                    <span className="text-sm sm:text-base" style={{ color: 'rgba(112, 112, 112, 1)', fontFamily: 'Inter, sans-serif' }}>{t('home.aboutPreview.authenticity')}</span>
                  </div>
                  <div className="flex items-center space-x-2 md:space-x-3">
                    <img
                      src="/images/Our_Strength/Group_49562.png"
                      alt="Integrity"
                      className="h-5 w-5 sm:h-6 sm:w-6 object-contain"
                    />
                    <span className="text-sm sm:text-base" style={{ color: 'rgba(112, 112, 112, 1)', fontFamily: 'Inter, sans-serif' }}>{t('home.aboutPreview.integrity')}</span>
                  </div>
                  <div className="flex items-center space-x-2 md:space-x-3">
                    <img
                      src="/images/Our_Strength/Group_49564.png"
                      alt="Honesty"
                      className="h-5 w-5 sm:h-6 sm:w-6 object-contain"
                    />
                    <span className="text-sm sm:text-base" style={{ color: 'rgba(112, 112, 112, 1)', fontFamily: 'Inter, sans-serif' }}>{t('home.aboutPreview.honesty')}</span>
                  </div>
                </div>
              </div>

              {/* Our Commitment Section */}
              <div>
                <h3 className="text-lg md:text-xl mb-3 md:mb-4" style={{ color: 'rgba(29, 129, 165, 1)', fontFamily: 'Inter, sans-serif', fontWeight: '500' }}>{t('home.aboutPreview.ourCommitment')}</h3>
                <div className="space-y-2 md:space-y-3">
                  <div className="flex items-center space-x-2 md:space-x-3">
                    <img
                      src="/images/Our_Commitment/Group_49566.png"
                      alt="Best Quality"
                      className="h-5 w-5 sm:h-6 sm:w-6 object-contain"
                    />
                    <span className="text-sm sm:text-base" style={{ color: 'rgba(112, 112, 112, 1)', fontFamily: 'Inter, sans-serif' }}>{t('home.aboutPreview.bestQuality')}</span>
                  </div>
                  <div className="flex items-center space-x-2 md:space-x-3">
                    <img
                      src="/images/Our_Commitment/Group_49567.png"
                      alt="Better Service"
                      className="h-5 w-5 sm:h-6 sm:w-6 object-contain"
                    />
                    <span className="text-sm sm:text-base" style={{ color: 'rgba(112, 112, 112, 1)', fontFamily: 'Inter, sans-serif' }}>{t('home.aboutPreview.betterService')}</span>
                  </div>
                  <div className="flex items-center space-x-2 md:space-x-3">
                    <img
                      src="/images/Our_Commitment/Group_49752.png"
                      alt="Competitive Price"
                      className="h-5 w-5 sm:h-6 sm:w-6 object-contain"
                    />
                    <span className="text-sm sm:text-base" style={{ color: 'rgba(112, 112, 112, 1)', fontFamily: 'Inter, sans-serif' }}>{t('home.aboutPreview.competitivePrice')}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
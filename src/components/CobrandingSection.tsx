import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CobrandingSection = () => {
  const { t } = useTranslation();
  return (
    <section className="pt-16 md:pt-20 pb-0 bg-background">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32">
        {/* Mobile Title */}
        <h2 className="block lg:hidden mb-6 text-center text-2xl sm:text-3xl md:text-4xl" style={{fontFamily: 'Inter', color: 'rgba(29, 129, 165, 1)', fontWeight: '500'}}>
          {t('home.cobranding.title')}
        </h2>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center w-full">
          <div className="flex justify-center order-1 lg:order-2 lg:pl-12">
            <img
              src="/images/athos_product.png"
              alt="ATHOS Co-branding Products"
              className="w-full max-w-md md:max-w-lg lg:max-w-xl h-auto object-contain transition-transform duration-500 ease-in-out hover:scale-105 cursor-pointer"
            />
          </div>

          <div className="order-2 lg:order-1">
            {/* Desktop Title */}
            <h2 className="hidden lg:block mb-3 md:mb-4 text-2xl sm:text-3xl md:text-4xl" style={{fontFamily: 'Inter', color: 'rgba(29, 129, 165, 1)', fontWeight: '500'}}>{t('home.cobranding.title')}</h2>
            <p className="mb-4 md:mb-6 leading-relaxed text-base md:text-lg font-inter" style={{ color: 'rgba(112, 112, 112, 1)', fontFamily: 'Inter, sans-serif' }}>
              {t('home.cobranding.description')}
            </p>
            <Link to="/contact">
              <Button 
                variant="outline" 
                className="px-4 md:px-6 py-4 md:py-6 text-sm md:text-base transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-green-400/30 group relative overflow-hidden athos-button-hover w-full sm:w-auto" 
                style={{color: 'rgba(112, 112, 112, 1)'}}
              >
                <span className="relative z-10 group-hover:text-white transition-colors duration-300 flex items-center justify-center">
                  {t('home.cobranding.cta')} 
                  <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
                <div 
                  className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                  style={{backgroundColor: 'rgba(106, 191, 0, 1)'}}
                ></div>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CobrandingSection;

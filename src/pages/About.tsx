import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactTeaser from '@/components/ContactTeaser';
import { Button } from '@/components/ui/button';
import { ArrowRight, Target, Eye, Download, Mail, Youtube, Instagram } from 'lucide-react';
import facilityImg from '@/assets/athos-facility.jpg';
import rdLabImg from '@/assets/rd-lab.jpg';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { useTranslation } from 'react-i18next';

const About = () => {
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
  const [heroRef, heroVisible] = useScrollAnimation(0.1);
  const [aboutRef, aboutVisible] = useScrollAnimation(0.1);
  const [missionRef, missionVisible] = useScrollAnimation(0.1);
  const [rdRef, rdVisible] = useScrollAnimation(0.1);
  const [facilitiesRef, facilitiesVisible] = useScrollAnimation(0.1);
  // const [certificationsRef, certificationsVisible] = useScrollAnimation(0.1);
  const [contactRef, contactVisible] = useScrollAnimation(0.1);

  const facilities = [
    {
      name: 'ATHOS_Manufacturing_Hub',
      location: 'Norway',
      image: facilityImg,
      description: 'Primary_production_facility_with_advanced_extraction_technology'
    },
    {
      name: 'Research_&_Development_Center',
      location: 'Japan',
      image: rdLabImg,
      description: 'Innovation_center_for_marine_collagen_research'
    },
    {
      name: 'Quality_Control_Laboratory',
      location: 'Germany',
      image: facilityImg,
      description: 'State-of-the-art_testing_and_certification_facility'
    }
  ];

  useEffect(() => {
    document.title = 'About Us - Athos Collagen Pvt. Ltd';
  }, []);

  return (
    <div className="bg-background w-full" style={{ overflowX: 'clip' }}>
      <Navbar />
      <main className="relative">
        {/* Hero Section */}
        <div
          ref={heroRef}
          className={`transition-all duration-500 ease-out ${
            heroVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <section className="relative h-[calc(100vh-5rem)] flex items-end justify-center overflow-hidden mt-20" style={{minHeight: 'calc(100vh - 5rem)'}}>
            <div className="absolute inset-0">
              <img
                src="/images/athos_about.jpg"
                alt="ATHOS Collagen"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 text-left pb-20">
              <h1 className="text-white font-medium leading-tight text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl max-w-5xl">
                {t('about.heroTitle')}
              </h1>
            </div>
          </section>
        </div>

        {/* About Content */}
        <div 
          ref={aboutRef}
          className={`transition-all duration-500 ease-out ${
            aboutVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          <section className="pt-12 md:pt-20 pb-0 bg-background">
            <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32">
              <h2 className="mb-4 md:mb-6 text-2xl sm:text-3xl md:text-4xl" style={{ fontFamily: 'Inter', color: 'rgba(29, 129, 165, 1)', fontWeight: '500' }}>{t('about.title')}</h2>
              
              <ul className="space-y-3 md:space-y-4 text-foreground leading-relaxed text-base md:text-lg font-inter" style={{ fontFamily: 'Inter, sans-serif' }}>
                {(t('about.aboutContent', { returnObjects: true }) as string[]).map((content: string, index: number) => (
                  <li key={index} className="block text-left">
                    <span>{renderTextWithFiCollaLogo(content)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        {/* Mission, Vision & Core Values Section */}
        <div 
          ref={missionRef}
          className={`transition-all duration-500 ease-out delay-100 ${
            missionVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Mission Section */}
          <section className="py-12 md:py-20 bg-background">
            <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32">
              <div className="w-full text-left">
                <h2 className="mb-4 md:mb-6 text-2xl sm:text-3xl md:text-4xl" style={{ fontFamily: 'Inter', color: 'rgba(29, 129, 165, 1)', fontWeight: '500' }}>
                  {t('about.mission.title')}
                </h2>
                <p className="text-foreground leading-relaxed text-base md:text-lg font-inter w-full">
                  {renderTextWithFiCollaLogo(t('about.mission.description'))}
                </p>
              </div>
            </div>
          </section>

          {/* "athos" Section with Sticky Left and Scrolling Right */}
          <section className="py-16 md:py-24" style={{ backgroundColor: 'rgba(225, 240, 245, 0.5)' }}>
            <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32">
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
                {/* Left Side: Sticky on Desktop */}
                <div 
                  className="w-full lg:w-5/12 self-start flex flex-col items-start space-y-4 lg:sticky lg:top-[100px] lg:z-10"
                >
                  <div className="mb-2">
                    <img 
                      src="/images/athos_logo.webp" 
                      alt="ATHOS Logo" 
                      className="h-14 md:h-16 w-auto object-contain"
                    />
                  </div>
                  <p className="text-foreground/90 leading-relaxed text-base md:text-lg text-left font-inter">
                    {renderTextWithFiCollaLogo(t('about.athosSection.description'))}
                  </p>
                </div>

                {/* Right Side: Scrollable */}
                <div className="w-full lg:w-7/12 space-y-8 md:space-y-12">
                  {Object.keys(t('about.athosSection.values', { returnObjects: true }) || {}).map((key) => {
                    const valObj = t(`about.athosSection.values.${key}`, { returnObjects: true }) as { title: string; description: string };
                    return (
                      <div 
                        key={key} 
                        className="py-4 border-b border-cyan-800/10 last:border-b-0 transition-all duration-300 hover:translate-x-1"
                      >
                        <h3 className="mb-2 text-xl md:text-2xl" style={{ fontFamily: 'Inter', color: 'rgba(29, 129, 165, 1)', fontWeight: '600' }}>
                          {valObj.title}
                        </h3>
                        <p className="text-foreground leading-relaxed text-base md:text-lg text-left font-inter">
                          {renderTextWithFiCollaLogo(valObj.description)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* Vision Section */}
          <section className="pt-12 md:pt-20 pb-0 bg-background">
            <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32">
              <div className="max-w-4xl text-left">
                <h2 className="mb-4 md:mb-6 text-2xl sm:text-3xl md:text-4xl" style={{ fontFamily: 'Inter', color: 'rgba(29, 129, 165, 1)', fontWeight: '500' }}>
                  {t('about.vision.title')}
                </h2>
                <p className="text-foreground leading-relaxed text-base md:text-lg font-inter max-w-2xl">
                  {renderTextWithFiCollaLogo(t('about.vision.description'))}
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Our Facilities */}
        <div 
          ref={facilitiesRef}
          className={`transition-all duration-500 ease-out delay-150 ${
            facilitiesVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          <section className="pt-12 md:pt-20 pb-0 bg-background">
            <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32">
              <h2 className="mb-4 md:mb-6 text-2xl sm:text-3xl md:text-4xl text-left" style={{ fontFamily: 'Inter', color: 'rgba(29, 129, 165, 1)', fontWeight: '500' }}>{t('about.facilities.title')}</h2>
              
              <div className="space-y-4 w-full" style={{ fontFamily: 'Inter, sans-serif' }}>
                {(t('about.facilities.descriptions', { returnObjects: true }) as string[]).map((description: string, index: number) => (
                  <p 
                    key={index} 
                    className="block text-foreground leading-relaxed text-base md:text-lg text-left font-inter"
                  >
                    {renderTextWithFiCollaLogo(description)}
                  </p>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* R&D Video Section */}
        <div 
          ref={rdRef}
          className={`transition-all duration-500 ease-out delay-200 ${
            rdVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          <section className="py-12 md:py-20 bg-background">
            <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32">
              <div className="max-w-6xl mx-auto">
                <div className="relative bg-black rounded-xl overflow-hidden aspect-video">
                  <img
                    src={rdLabImg}
                    alt="R&D Laboratory"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Certifications Logos
        <div 
          ref={certificationsRef}
          className={`transition-all duration-500 ease-out delay-250 ${
            certificationsVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          <section className="py-12 md:py-20 bg-background">
            <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32">
              <h2 className="mb-4 md:mb-6 text-2xl sm:text-3xl md:text-4xl text-center" style={{ fontFamily: 'Inter', color: 'rgba(29, 129, 165, 1)', fontWeight: '500' }}>{t('about.certifications.title')}</h2>
              <img 
                src="/images/logo_grid.png" 
                alt="Certifications and Quality Standards" 
                className="w-full max-w-5xl mx-auto h-auto object-contain"
              />
            </div>
          </section>
        </div> */}

        {/* Contact Us Section */}
        <div 
          ref={contactRef}
          className={`transition-all duration-500 ease-out delay-300 ${
            contactVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          <ContactTeaser />
        </div>


      </main>
      <Footer />
    </div>
  );
};

export default About;
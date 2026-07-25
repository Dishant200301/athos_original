import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactTeaser from '@/components/ContactTeaser';
import { useTranslation } from 'react-i18next';

const fallbackAthosValues = [
  {
    title: "Authenticity",
    description:
      "We defines our foundation where precision sourcing meets uncompromising global standards",
  },
  {
    title: "Trust",
    description:
      "Trust is not claimed it is earned through unwavering precision, absolute transparency, and a legacy of excellence",
  },
  {
    title: "Health",
    description:
      "Health, engineered with precision and elevated through science.",
  },
  {
    title: "Oblige",
    description:
      "We operate with a deep sense of obligation to excellence and integrity. Delivering not just ingredients, but long-term reliability and accountability.",
  },
  {
    title: "System",
    description:
      "Built on structured precision, our systems ensure consistency at every stage. Delivering seamless quality through advanced processes and controlled environments.",
  },
];

const About = () => {
  const { t } = useTranslation();

  const renderTextWithFiCollaLogo = (text: string) => {
    if (!text) return text;
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

  useEffect(() => {
    document.title = `${t('about.title', { defaultValue: 'About Us' })} - Athos Collagen Pvt. Ltd`;
  }, [t]);

  return (
    <div className="bg-background w-full min-h-screen flex flex-col overflow-x-clip">
      <Navbar />

      <main className="flex-1">
        {/* 1. About Hero Section (with mt-20 navbar spacing) */}
        <section className="relative w-full h-[300px] md:h-[500px] lg:h-[85vh] xl:h-[90vh] overflow-hidden mt-20">
          <img
            src="/images/about-img.webp"
            alt="About Athos Collagen"
            className="w-full h-full object-cover"
          />
        </section>

        {/* 2. About Us Content */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32">
            <h2 className="text-[32px] font-bold text-[#1D7AA3] mb-6 md:mb-8 text-left" style={{ fontFamily: 'Inter' }}>
              {t('about.title', { defaultValue: 'About Us' })}
            </h2>
            <div className="space-y-6 text-[16px] leading-[27px] text-[#555555] font-inter">
              {Array.isArray(t('about.aboutContent', { returnObjects: true })) ? (
                (t('about.aboutContent', { returnObjects: true }) as string[]).map((paragraph: string, index: number) => (
                  <p key={index} className="text-[16px] leading-[27px] text-[#555555] font-inter">
                    {renderTextWithFiCollaLogo(paragraph)}
                  </p>
                ))
              ) : (
                <p className="text-[16px] leading-[27px] text-[#555555] font-inter">
                  {renderTextWithFiCollaLogo(
                    t('about.aboutContent', { 
                      defaultValue: "Athos Collagen Pvt. Ltd. is a global manufacturer and supplier of specialty ingredients serving the pharmaceutical, nutraceutical, animal nutrition, biotechnology and fermentation industries. Our expanding portfolio includes premium proteins, enzymes, peptones, probiotics, fermentation ingredients and functional nutritional ingredients, supported by strict quality systems and worldwide export capabilities." 
                    })
                  )}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* 3. Mission & Vision */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-0">
              {/* Mission Card */}
              <div className="w-[280px] h-[280px] rounded-full bg-[#66b036] flex items-center justify-center shadow-lg flex-shrink-0">
                <div className="text-center px-8">
                  <h3 className="text-white font-bold text-[24px] mb-4">
                    {t('about.mission.title', { defaultValue: 'Mission' })}
                  </h3>
                  <p className="text-white text-[14px] leading-[20px]">
                    {t('about.mission.description', { defaultValue: 'Mission To be the most trusted and innovative leader in the ingredients industry' })}
                  </p>
                </div>
              </div>

              {/* Divider - Desktop Only */}
              <div className="hidden lg:block w-[100px] border-t-2 border-dashed border-gray-300"></div>

              {/* Logo Card */}
              <div className="w-[280px] h-[280px] rounded-full bg-[#F4F4F4] flex items-center justify-center flex-shrink-0">
                <img src="/images/athos-logo-full-form.webp" alt="Athos Collagen" className="w-[280px] h-auto object-contain" />
              </div>

              {/* Divider - Desktop Only */}
              <div className="hidden lg:block w-[100px] border-t-2 border-dashed border-gray-300"></div>

              {/* Vision Card */}
              <div className="w-[280px] h-[280px] rounded-full bg-[#1D7AA3] flex items-center justify-center shadow-lg flex-shrink-0">
                <div className="text-center px-8">
                  <h3 className="text-white font-bold text-[24px] mb-4">
                    {t('about.vision.title', { defaultValue: 'Vision' })}
                  </h3>
                  <p className="text-white text-[14px] leading-[20px]">
                    {t('about.vision.description', { defaultValue: 'To be the most trusted and innovative leader in the marine collagen industry' })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. ATHOS Brand Values Section */}
        <section className="py-12 md:py-16 lg:py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
              {/* Left Column - Centered Logo */}
              <div className="lg:col-span-5 flex items-center justify-start self-center py-4">
                <img
                  src="/images/logo.webp"
                  alt="Athos Collagen"
                  className="h-[50px] md:h-[70px] lg:h-[80px] w-auto object-contain mx-auto"
                />
              </div>

              {/* Right Column - Brand Values List */}
              <div className="lg:col-span-7 space-y-6 md:space-y-8">
                {(() => {
                  const valuesObj = t('about.athosSection.values', { returnObjects: true });
                  if (valuesObj && typeof valuesObj === 'object' && !Array.isArray(valuesObj)) {
                    const keys = Object.keys(valuesObj);
                    return keys.map((key, index) => {
                      const valObj = valuesObj[key as keyof typeof valuesObj] as { title: string; description: string };
                      return (
                        <div
                          key={key}
                          className={`pb-6 md:pb-8 ${
                            index !== keys.length - 1 ? "border-b border-[#d8ebf5]" : ""
                          }`}
                        >
                          <h3 className="text-[20px] md:text-[24px] font-bold text-[#1D7AA3] mb-3">
                            {valObj.title}
                          </h3>
                          <p className="text-[#555555] text-sm md:text-base leading-[26px]">
                            {renderTextWithFiCollaLogo(valObj.description)}
                          </p>
                        </div>
                      );
                    });
                  }
                  return fallbackAthosValues.map((item, index) => (
                    <div
                      key={item.title}
                      className={`pb-6 md:pb-8 ${
                        index !== fallbackAthosValues.length - 1 ? "border-b border-[#d8ebf5]" : ""
                      }`}
                    >
                      <h3 className="text-[20px] md:text-[24px] font-bold text-[#1D7AA3] mb-3">
                        {item.title}
                      </h3>
                      <p className="text-[#555555] text-sm md:text-base leading-[26px]">
                        {renderTextWithFiCollaLogo(item.description)}
                      </p>
                    </div>
                  ));
                })()}
              </div>
            </div>
          </div>
        </section>

        {/* 5. R&D Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32">
            <h2 className="text-[32px] font-bold text-[#1D7AA3] mb-6 md:mb-8 text-left" style={{ fontFamily: 'Inter' }}>
              R&D
            </h2>
            <div className="w-full overflow-hidden rounded-xl shadow-sm">
              <img
                src="/images/R&D.png"
                alt="Research and Development"
                className="w-full h-[500px] md:h-[650px] object-cover block"
              />
            </div>
          </div>
        </section>

        {/* 6. Contact Teaser */}
        <ContactTeaser />
      </main>

      <Footer />
    </div>
  );
};

export default About;
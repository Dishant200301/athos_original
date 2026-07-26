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
          <div className="container mx-auto px-4 lg:px-10 xl:px-32">
            <h2 className="text-[32px] font-medium text-[#1D7AA3] mb-6 md:mb-8 text-left" style={{ fontFamily: 'Inter' }}>
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

        {/* 3. Mission Section */}
        <section className="pb-6 bg-white">
          <div className="container mx-auto px-4 lg:px-10 xl:px-32">
            <h2 className="text-[32px] font-medium text-[#1D7AA3] mb-4 text-left" style={{ fontFamily: 'Inter' }}>
              {t('about.mission.title', { defaultValue: 'Mission' })}
            </h2>
            <p className="text-[16px] leading-[27px] text-[#555555] font-inter text-left">
              {renderTextWithFiCollaLogo(
                t('about.mission.description', { 
                  defaultValue: 'Our mission is to offer world-class ingredients that elevate the well-being and daily lives of people globally.' 
                })
              )}
            </p>
          </div>
        </section>

        {/* 4. ATHOS Brand Values Section */}
        <section className="py-12 md:py-12 lg:py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-10 xl:px-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column - Centered Logo */}
              <div className="lg:col-span-4 flex items-center justify-center self-center py-2">
                <img
                  src="/images/athos_brand_values.png"
                  alt="Athos Collagen Brand Values"
                  className="w-full max-w-[260px] sm:max-w-[300px] md:max-w-[340px] h-auto object-contain mx-auto"
                />
              </div>

              {/* Right Column - Brand Values List */}
              <div className="lg:col-span-8 space-y-5 md:space-y-4">
                {(() => {
                  const valuesObj = t('about.athosSection.values', { returnObjects: true });
                  if (valuesObj && typeof valuesObj === 'object' && !Array.isArray(valuesObj)) {
                    const keys = Object.keys(valuesObj);
                    return keys.map((key, index) => {
                      const valObj = valuesObj[key as keyof typeof valuesObj] as { title: string; description: string };
                      return (
                        <div
                          key={key}
                          className={`pb-2 md:pb-4 ${
                            index !== keys.length - 1 ? "border-b border-[#d8ebf5]" : ""
                          }`}
                        >
                          <h3 className="text-[18px] md:text-[22px] lg:text-[24px] font-medium text-[#1D7AA3] mb-1.5 md:mb-2">
                            {valObj.title}
                          </h3>
                          <p className="text-[#555555] text-sm md:text-base leading-relaxed lg:leading-[25px]">
                            {renderTextWithFiCollaLogo(valObj.description)}
                          </p>
                        </div>
                      );
                    });
                  }
                  return fallbackAthosValues.map((item, index) => (
                    <div
                      key={item.title}
                      className={`pb-3 md:pb-4 ${
                        index !== fallbackAthosValues.length - 1 ? "border-b border-[#d8ebf5]" : ""
                      }`}
                    >
                      <h3 className="text-[18px] md:text-[22px] lg:text-[24px] font-medium text-[#1D7AA3] mb-1.5 md:mb-2">
                        {item.title}
                      </h3>
                      <p className="text-[#555555] text-sm md:text-base leading-relaxed lg:leading-[25px]">
                        {renderTextWithFiCollaLogo(item.description)}
                      </p>
                    </div>
                  ));
                })()}
              </div>
            </div>
          </div>
        </section>

        {/* 5. Vision Section */}
        <section className="py-12 md:py-10 lg:pt-4 bg-white">
          <div className="container mx-auto px-4 lg:px-10 xl:px-32">
            <h2 className="text-[32px] font-medium text-[#1D7AA3] mb-4 text-left" style={{ fontFamily: 'Inter' }}>
              {t('about.vision.title', { defaultValue: 'Vision' })}
            </h2>
            <p className="text-[16px] leading-[27px] text-[#555555] font-inter text-left">
              {renderTextWithFiCollaLogo(
                t('about.vision.description', { 
                  defaultValue: 'To be the most trusted and innovative leader in the ingredient industry.' 
                })
              )}
            </p>
          </div>
        </section>

        {/* 5. R&D Section */}
        <section className="py-12 md:py-12 lg:pb-28 lg:pt-10 bg-white">
          <div className="container mx-auto px-4 lg:px-10 xl:px-32">
            <h2 className="text-[32px] font-medium text-[#1D7AA3] mb-6 md:mb-8 text-left" style={{ fontFamily: 'Inter' }}>
              R&D
            </h2>
            <div className="w-full overflow-hidden rounded-xl shadow-sm">
              <img
                src="/images/R&D.png"
                alt="Research and Development"
                className="w-full h-[500px] md:h-[530px] object-cover block"
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
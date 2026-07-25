import React from 'react';
import { useTranslation } from 'react-i18next';

const CertificationsCarousel = () => {
  const { t } = useTranslation();
  
  // Actual certification logos from public/certificate folder
  const certifications = [
    { name: 'USFD', logo: '/images/certificate/USFD.png' },
    { name: 'HALAL_INDIA', logo: '/images/certificate/HALAL_INDIA.png' },
    { name: 'MPEDA', logo: '/images/certificate/MPEDA.png' },
    { name: 'KOSHER', logo: '/images/certificate/KOSHER.png' },
    { name: 'EIC', logo: '/images/certificate/EIC.png' },
    { name: 'FIEO', logo: '/images/certificate/FIEO.png' },
    { name: 'FSSAI', logo: '/images/certificate/FSSAI.png' },
    { name: 'SGS_-_GHP', logo: '/images/certificate/SGS_-_GHP.png' },
    { name: 'ISO_22000', logo: '/images/certificate/22000.png' },
    { name: 'ISO_9001', logo: '/images/certificate/9001.png' },
    { name: 'GMP', logo: '/images/certificate/GMP.png' },
    { name: 'HACCP', logo: '/images/certificate/HACCP.png' },
  ];

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 md:px-4 lg:px-10">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="mb-3 md:mb-4 text-2xl sm:text-3xl md:text-4xl" style={{fontFamily: 'Inter', color: 'rgba(29, 129, 165, 1)', fontWeight: '500'}}>
            {t('home.certifications.title')}
          </h2>
        </div>

        {/* Certification Logos Carousel */}
        <div className="relative overflow-hidden">
          <div className="marquee-container">
            <div className="marquee-content">
              {/* First set */}
              {certifications.map((cert, index) => (
                <div
                  key={`first-${index}`}
                  className="certification-item"
                >
                  <img
                    src={cert.logo}
                    alt={cert.name}
                    className="certification-logo"
                  />
                </div>
              ))}
              
              {/* Second set for seamless loop */}
              {certifications.map((cert, index) => (
                <div
                  key={`second-${index}`}
                  className="certification-item"
                >
                  <img
                    src={cert.logo}
                    alt={cert.name}
                    className="certification-logo"
                  />
                </div>
              ))}
              
              {/* Third set for extra smoothness */}
              {certifications.map((cert, index) => (
                <div
                  key={`third-${index}`}
                  className="certification-item"
                >
                  <img
                    src={cert.logo}
                    alt={cert.name}
                    className="certification-logo"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CertificationsCarousel;
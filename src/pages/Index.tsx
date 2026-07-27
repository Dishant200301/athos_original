import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutPreview from '@/components/AboutPreview';
import ProductCategoriesSection from '@/components/ProductCategoriesSection';
import GlobalPresence from '@/components/GlobalPresence';
// import CollagenBenefits from '@/components/CollagenBenefits';
import NewCollagenBenefits from '@/components/NewCollagenBenefits';
// import CertificationsCarousel from '@/components/CertificationsCarousel';
// import ProductShowcase from '@/components/ProductShowcase';
import UniquenessSection from '@/components/UniquenessSection';
import CobrandingSection from '@/components/CobrandingSection';
import ContactTeaser from '@/components/ContactTeaser';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

const Index = () => {
  const [aboutRef, aboutVisible] = useScrollAnimation(0.1);
  const [globalRef, globalVisible] = useScrollAnimation(0.1);
  const [newBenefitsRef, newBenefitsVisible] = useScrollAnimation(0.1);
  // const [benefitsRef, benefitsVisible] = useScrollAnimation(0.1);
  // const [certificationsRef, certificationsVisible] = useScrollAnimation(0.1);
  // const [productsRef, productsVisible] = useScrollAnimation(0.1);
  const [uniquenessRef, uniquenessVisible] = useScrollAnimation(0.1);
  const [cobrandingRef, cobrandingVisible] = useScrollAnimation(0.1);
  const [contactRef, contactVisible] = useScrollAnimation(0.1);

  const [isMobile, setIsMobile] = React.useState(() => {
    return typeof window !== 'undefined' ? window.innerWidth < 768 : false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const productSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Fish Collagen Peptide (Hydrolyzed Collagen)',
      description: 'High-purity Hydrolyzed Fish Collagen Peptide manufactured for pharmaceutical, nutraceutical, and cosmetic applications.',
      brand: {
        '@type': 'Brand',
        name: 'Athos Collagen',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Fish Gelatin',
      description: 'High-quality Fish Gelatin engineered for pharmaceutical capsules, food & beverage, and biotechnology applications.',
      brand: {
        '@type': 'Brand',
        name: 'Athos Collagen',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemPage',
      name: 'Applications - Fish Collagen Peptide - Athos Collagen Pvt. Ltd',
      description: 'Applications of Hydrolyzed Fish Collagen Peptide across pharmaceutical, food & beverage, cosmetics, and nutraceutical industries.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemPage',
      name: 'Applications - Fish Gelatin - Athos Collagen Pvt. Ltd',
      description: 'Applications of Fish Gelatin across food industry, cosmetics, biomedical, and pharmaceutical sectors.',
    }
  ];

  return (
    <div className="bg-background overflow-x-hidden w-full">
      <SEO 
        title="Athos Collagen Pvt. Ltd - Leading Marine Collagen Solutions" 
        schema={productSchemas}
      />
      <Navbar />
      <main className="relative home-page-layout">
        {/* 1. Hero Section */}
        <HeroSection />
        
        {/* 2. About Section */}
        <div 
          ref={aboutRef}
          className={
            isMobile 
              ? "" 
              : `transition-all duration-500 ease-out ${
                  aboutVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`
          }
        >
          <AboutPreview isMobile={isMobile} />
        </div>

        {/* Product Categories Section */}
        <ProductCategoriesSection />
        
        {/* 3. Uniqueness Section */}
        <div 
          ref={uniquenessRef}
          className={`transition-all duration-500 ease-out delay-100 ${
            uniquenessVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          {/* <UniquenessSection /> */}
        </div>
        
        {/* 4. Our Premium Products
        <div 
          ref={productsRef}
          className={`transition-all duration-500 ease-out delay-150 ${
            productsVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          <ProductShowcase />
        </div> */}
        
        {/* 5. Benefits of Athos Fish Collagen Peptide */}
        <div 
          ref={newBenefitsRef}
          className={`transition-all duration-500 ease-out delay-200 ${
            newBenefitsVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          {/* <NewCollagenBenefits /> */}
        </div>
        
        {/* 6. Applications of Collagen
        <div 
          ref={benefitsRef}
          className={`transition-all duration-500 ease-out delay-250 ${
            benefitsVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          <CollagenBenefits />
        </div> */}
        
        {/* 7. Presence Globally */}
        <div 
          ref={globalRef}
          className={`transition-all duration-500 ease-out delay-300 ${
            globalVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          <GlobalPresence />
        </div>
        
        {/* 8. Our Globally Recognized Certifications
        <div 
          ref={certificationsRef}
          className={`transition-all duration-500 ease-out delay-350 ${
            certificationsVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          <CertificationsCarousel />
        </div> */}
        
        {/* 8. Cobranding Opportunities */}
        <div 
          ref={cobrandingRef}
          className={`transition-all duration-500 ease-out delay-350 ${
            cobrandingVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          {/* <CobrandingSection /> */}
        </div>
        
        {/* 9. Contact with us */}
        <div 
          ref={contactRef}
          className={`transition-all duration-500 ease-out delay-400 ${
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

export default Index;
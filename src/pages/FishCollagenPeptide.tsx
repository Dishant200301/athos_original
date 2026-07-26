import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactTeaser from '@/components/ContactTeaser';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mail, Youtube, Instagram } from 'lucide-react';
import collagenPeptideImg from '@/assets/collagen-peptide-product.jpg';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import PieChart from '@/components/PieChart';
import UniquenessSection from '@/components/UniquenessSection';
import NewCollagenBenefits from '@/components/NewCollagenBenefits';
import CollagenBenefits from '@/components/CollagenBenefits';

const FishCollagenPeptide = () => {
  const { t } = useTranslation();
  
  const uniquenessFeatures = t('fishCollagen.uniqueness.features', { returnObjects: true }) as string[] || [];

  const [activeCategory, setActiveCategory] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isManualClick, setIsManualClick] = useState(false);
  const navigate = useNavigate();

  const [heroRef, heroVisible] = useScrollAnimation(0.1);
  const [categoriesRef, categoriesVisible] = useScrollAnimation(0.1);
  const [replacementRef, replacementVisible] = useScrollAnimation(0.1);
  const [insightsRef, insightsVisible] = useScrollAnimation(0.1);
  const [insightsImageRef, insightsImageVisible] = useScrollAnimation(0.1);
  const [insightsTextRef, insightsTextVisible] = useScrollAnimation(0.1);
  const [whatIsRef, whatIsVisible] = useScrollAnimation(0.1);
  const [discoverRef, discoverVisible] = useScrollAnimation(0.1);
  const [productsRef, productsVisible] = useScrollAnimation(0.1);
  const [uniquenessRef, uniquenessVisible] = useScrollAnimation(0.1);
  const [newBenefitsRef, newBenefitsVisible] = useScrollAnimation(0.1);
  const [benefitsRef, benefitsVisible] = useScrollAnimation(0.1);
  const [contactRef, contactVisible] = useScrollAnimation(0.1);

  const pageTitle = `${t('fishCollagen.heroTitle')} - Athos Collagen Pvt. Ltd`;

  const handleDiscoverMore = (categoryId: string) => {
    navigate(`/category/${categoryId}`);
  };

  // Keep image filenames stable across languages by mapping IDs to English filenames
  const categoryImageNameById: Record<string, string> = {
    'food-beverages': 'Food_and_Beverages',
    'nutraceuticals': 'Nutraceuticals_and_Dietary_Supplements',
    'cosmetics': 'Cosmetics_and_Skincare',
    'pharmaceuticals': 'Pharmaceuticals',
    'pet-food': 'Pet_Food',
    'biotechnology': 'Biotechnology'
  };

  const getCategoryImageName = (id: string): string => categoryImageNameById[id] ?? id;

  const categories = [
    {
      id: 'nutraceuticals',
      name: t('fishCollagen.productShowcase.categories.nutraceuticals.name'),
      description: t('fishCollagen.productShowcase.categories.nutraceuticals.description'),
      applications: t('fishCollagen.productShowcase.categories.nutraceuticals.applications', { returnObjects: true }) as string[]
    },
    {
      id: 'food-beverages',
      name: t('fishCollagen.productShowcase.categories.foodBeverages.name'),
      description: t('fishCollagen.productShowcase.categories.foodBeverages.description'),
      applications: t('fishCollagen.productShowcase.categories.foodBeverages.applications', { returnObjects: true }) as string[]
    },
    {
      id: 'pharmaceuticals',
      name: t('fishCollagen.productShowcase.categories.pharmaceuticals.name'),
      description: t('fishCollagen.productShowcase.categories.pharmaceuticals.description'),
      applications: t('fishCollagen.productShowcase.categories.pharmaceuticals.applications', { returnObjects: true }) as string[]
    },
    {
      id: 'cosmetics',
      name: t('fishCollagen.productShowcase.categories.cosmetics.name'),
      description: t('fishCollagen.productShowcase.categories.cosmetics.description'),
      applications: t('fishCollagen.productShowcase.categories.cosmetics.applications', { returnObjects: true }) as string[]
    },
    {
      id: 'pet-food',
      name: t('fishCollagen.productShowcase.categories.petFood.name'),
      description: t('fishCollagen.productShowcase.categories.petFood.description'),
      applications: t('fishCollagen.productShowcase.categories.petFood.applications', { returnObjects: true }) as string[]
    },
    {
      id: 'biotechnology',
      name: t('fishCollagen.productShowcase.categories.biotechnology.name'),
      description: t('fishCollagen.productShowcase.categories.biotechnology.description'),
      applications: t('fishCollagen.productShowcase.categories.biotechnology.applications', { returnObjects: true }) as string[]
    }
  ];

  const chartData = {
    protein: 90,
    moisture: 8,
    ash: 1.5,
    fat: 0.5
  };

  useEffect(() => {
    let isInCategoriesSection = false;
    let lastCategoryIndex = -1;
    let animationFrameId: number;

    const handleScroll = () => {
      // Don't process scroll events during manual clicks
      if (isManualClick) return;

      // Cancel previous animation frame
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = requestAnimationFrame(() => {
        const categoriesSection = document.getElementById('categories-section');
        if (!categoriesSection) return;

        const sectionRect = categoriesSection.getBoundingClientRect();
        const sectionTop = sectionRect.top;
        const sectionHeight = sectionRect.height;
        const viewportHeight = window.innerHeight;

        // Check if we're in the categories section - show it when section is approaching
        const currentlyInSection = sectionTop <= 100 && sectionTop + sectionHeight > 0;

        if (currentlyInSection && !isScrolling) {
          if (!isInCategoriesSection) {
            // Just entered the section
            setActiveCategory(0);
            lastCategoryIndex = 0;
            isInCategoriesSection = true;
          } else {
            // Calculate which category should be active based on scroll position
            const scrollProgress = Math.max(0, Math.min(1, -sectionTop / (sectionHeight - viewportHeight)));
            const categoryIndex = Math.min(
              Math.round(scrollProgress * (categories.length - 1)),
              categories.length - 1
            );

            // Update category immediately when it changes, with more sensitivity
            if (categoryIndex !== lastCategoryIndex && categoryIndex >= 0) {
              setActiveCategory(categoryIndex);
              lastCategoryIndex = categoryIndex;
            }
          }
        } else if (!currentlyInSection) {
          // Not in categories section, reset
          isInCategoriesSection = false;
          lastCategoryIndex = -1;
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [categories.length, isScrolling, isManualClick]);

  const scrollToCategory = (index: number) => {
    const categoriesSection = document.getElementById('categories-section');
    if (categoriesSection) {
      // Set flags to prevent scroll interference
      setIsManualClick(true);
      setIsScrolling(true);
      setActiveCategory(index);

      const sectionHeight = categoriesSection.offsetHeight;
      const viewportHeight = window.innerHeight;

      // Calculate the exact scroll position for this category
      const scrollPosition = categoriesSection.offsetTop + (index * viewportHeight);

      // Scroll to the position
      window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
      });

      // Re-enable scroll detection after animation completes
      setTimeout(() => {
        setIsScrolling(false);
        setIsManualClick(false);
      }, 1200);
    }
  };

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Fish Collagen Peptide (Hydrolyzed Collagen)',
    description: 'High-purity Hydrolyzed Fish Collagen Peptide manufactured for pharmaceutical, nutraceutical, and cosmetic applications.',
    brand: {
      '@type': 'Brand',
      name: 'Athos Collagen',
    },
  };

  return (
    <div className="bg-background overflow-x-hidden w-full">
      <SEO title={pageTitle} schema={productSchema} />
      <Navbar />
      <main>
        {/* Hero Section */}
        <div
          ref={heroRef}
          className={`transition-all duration-500 ease-out transition-stable ${heroVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
            }`}
        >
          <section className="relative h-screen flex items-center justify-center sm:justify-start overflow-hidden pt-16 md:pt-20">
            <div className="absolute inset-0 overflow-hidden">
              <img
                src="/images/background1.png"
                alt="Fish Collagen Peptide"
                className="hidden sm:block w-full h-full object-cover scale-150 md:scale-[1.6]"
              />
              <img
                src="/images/background1_mobile.png"
                alt="Fish Collagen Peptide Mobile"
                className="block sm:hidden w-full h-full object-cover"
              />
            </div>

            <div className="container mx-auto px-4 lg:px-10 xl:px-32 relative z-10 text-center sm:text-left">
              <h1 
                className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight max-w-4xl"
                style={{ color: 'rgba(40, 123, 153, 1)' }}
              >
                {t('fishCollagen.heroTitle')}
              </h1>
            </div>
          </section>
        </div>

        {/* Introductory Highlights Section */}
        <section className="py-12 md:py-16 bg-background border-b border-gray-100">
          <div className="container mx-auto px-4 lg:px-10 xl:px-32 flex flex-col items-center justify-center space-y-6 w-full">
            <h2 
              className="text-[18px] min-[375px]:text-[20px] min-[425px]:text-[22px] sm:text-[28px] md:text-[33px] text-center leading-tight font-inter w-full"
              style={{ color: 'rgba(40, 123, 153, 1)', fontWeight: 700 }}
            >
              <span className="sm:hidden block space-y-1">
                <span className="block whitespace-nowrap">Athos Collagen Pvt. Ltd. is leading</span>
                <span className="block whitespace-nowrap">Manufacturer and Exporter of Fish</span>
                <span className="block whitespace-nowrap">Collagen Peptide from India.</span>
              </span>
              <span className="hidden sm:block">
                {t('fishCollagen.introTitle')}
              </span>
            </h2>
            <p 
              className="text-[18px] md:text-[24px] text-center leading-relaxed font-inter w-full"
              style={{ color: 'rgba(40, 123, 153, 1)', fontWeight: 600 }}
            >
              {t('fishCollagen.introSubtitle')}
            </p>
          </div>
        </section>

        {/* Uniqueness Of Athos Collagen Peptide SECTION */}
        <div
          ref={uniquenessRef}
          className={`transition-all duration-500 ease-out ${uniquenessVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
            }`}
        >
          <UniquenessSection 
            noTopPadding={true} 
            features={uniquenessFeatures}
            imageSrc="/images/clinically_tested.png"
            imageAlt="Clinically Tested Collagen"
            showBgImage={false}
          />
        </div>

        {/* PIE CHART SECTION */}
        <div
          ref={replacementRef}
          className={`transition-all duration-500 ease-out ${replacementVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
            }`}
        >
          <section className="py-12 md:py-20 bg-background">
            <div className="container mx-auto px-4 lg:px-10 xl:px-32">
              <PieChart />
            </div>
          </section>
        </div>

        {/* Applications of Athos Collagen Peptide SECTION */}
        <div
          ref={benefitsRef}
          className={`transition-all duration-500 ease-out ${benefitsVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
            }`}
        >
          <CollagenBenefits />
        </div>

        {/* CATEGORY SECTION IN COMMENT
        <div className="lg:hidden">
          ... (mobile categories)
        </div>
        <div className="hidden lg:block -mt-20">
          ... (desktop categories)
        </div>
        */}

        {/* INSIGHT SECTION IN COMMENT
        <div className="overflow-x-hidden">
          ... (insights)
        </div>
        */}

        {/* Discover Section */}
        <div>
          <section className="py-8 md:py-12 bg-background">
            <div className="container mx-auto px-4 lg:px-10 xl:px-32">
              <h2 className="mb-4 text-2xl sm:text-3xl md:text-4xl" style={{ fontFamily: 'Inter', color: 'rgba(29, 129, 165, 1)', fontWeight: '500' }}>{t('fishCollagen.discover.title')}</h2>
            </div>
          </section>

          <div 
            className="relative h-[400px] sm:h-[450px] md:h-[500px] lg:h-[70vh] lg:min-h-[500px] lg:max-h-[650px] flex items-end sm:items-center justify-center lg:justify-end overflow-hidden pb-8 sm:pb-0"
          >
            <div className="absolute inset-0">
              <img
                src="/images/background1.png"
                alt=""
                className="hidden sm:block w-full h-full object-cover"
              />
              <img
                src="/images/discover1_mobile.png"
                alt=""
                className="block sm:hidden w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-black/30"></div>

            <div className="container mx-auto px-4 lg:px-10 xl:px-32 relative z-10 h-full flex items-end sm:items-center justify-center lg:justify-end pb-8 sm:pb-0">
              <div className="bg-black/60 backdrop-blur-sm p-4 sm:p-6 md:p-8 lg:p-12 max-w-2xl text-center lg:text-left">
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4 md:mb-6" style={{ fontFamily: 'Inter' }}>
                  {t('fishCollagen.discover.selectApplication')}
                </h3>

                <p className="text-white text-xs sm:text-sm md:text-base lg:text-lg font-inter mb-4 sm:mb-6 md:mb-8 leading-relaxed" style={{ color: 'rgba(255, 255, 255, 1)', fontFamily: 'Inter, sans-serif' }}>
                  {t('fishCollagen.discover.description')}
                </p>

                <Button
                  variant="outline"
                  className="border border-white text-white bg-transparent text-sm sm:text-base md:text-lg p-3 sm:p-4 md:p-5 transition-all duration-300 ease-in-out hover:scale-105 group relative overflow-hidden justify-center"
                  onClick={() => navigate('/fish-collagen-applications')}
                >
                  <span className="relative z-10 group-hover:text-black transition-colors duration-300 flex items-center justify-center">
                    {t('fishCollagen.discover.cta')}
                    <span className="ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </span>
                  <div
                    className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left bg-white"
                  ></div>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Us Section */}
        <ContactTeaser />

      </main>
      <Footer />
    </div>
  );
};

export default FishCollagenPeptide;
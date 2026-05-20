import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactTeaser from '@/components/ContactTeaser';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mail, Youtube, Instagram } from 'lucide-react';
import collagenPeptideImg from '@/assets/collagen-peptide-product.jpg';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import PieChart from '@/components/PieChart';
import GelatinBenefits from '@/components/GelatinBenefits';

const FishGelatin = () => {
  const { t } = useTranslation();
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
  const [benefitsRef, benefitsVisible] = useScrollAnimation(0.1);
  const [contactRef, contactVisible] = useScrollAnimation(0.1);

  // Individual category image animations
  const [foodIndustryRef, foodIndustryVisible] = useScrollAnimation(0.05);
  const [nutraceuticalsRef, nutraceuticalsVisible] = useScrollAnimation(0.05);
  const [cosmeticsRef, cosmeticsVisible] = useScrollAnimation(0.05);
  const [pharmaceuticalsRef, pharmaceuticalsVisible] = useScrollAnimation(0.05);
  const [petFoodRef, petFoodVisible] = useScrollAnimation(0.05);
  const [biotechnologyRef, biotechnologyVisible] = useScrollAnimation(0.05);
  const [biomedicalRef, biomedicalVisible] = useScrollAnimation(0.05);
  const [pharmaIndustryRef, pharmaIndustryVisible] = useScrollAnimation(0.05);

  useEffect(() => {
    document.title = `${t('fishGelatin.heroTitle')} - Athos Collagen Pvt. Ltd`;
  }, [t]);

  const handleDiscoverMore = (categoryId: string) => {
    navigate(`/category/${categoryId}`);
  };

  // Map category IDs to original English filenames for images
  const categoryImageNameById: { [key: string]: string } = {
    'food-industry': 'Food_Industry.png',
    'pharma-industry': 'Pharma_Industry.png',
    'cosmetics-skincare': 'Cosmetics_and_Skincare1.png',
    'biomedical-applications': 'Biomedical_applications.png'
  };

  const getCategoryImageName = (categoryId: string): string => {
    return categoryImageNameById[categoryId] || 'placeholder.png';
  };

  const categories = [
    {
      id: 'food-industry',
      name: t('fishGelatin.productShowcase.categories.foodIndustry.name'),
      description: t('fishGelatin.productShowcase.categories.foodIndustry.description'),
      applications: t('fishGelatin.productShowcase.categories.foodIndustry.applications', { returnObjects: true }) as string[]
    },
    {
      id: 'pharma-industry',
      name: t('fishGelatin.productShowcase.categories.pharmaIndustry.name'),
      description: t('fishGelatin.productShowcase.categories.pharmaIndustry.description'),
      applications: t('fishGelatin.productShowcase.categories.pharmaIndustry.applications', { returnObjects: true }) as string[]
    },
    {
      id: 'cosmetics-skincare',
      name: t('fishGelatin.productShowcase.categories.cosmeticsSkincare.name'),
      description: t('fishGelatin.productShowcase.categories.cosmeticsSkincare.description'),
      applications: t('fishGelatin.productShowcase.categories.cosmeticsSkincare.applications', { returnObjects: true }) as string[]
    },
    {
      id: 'biomedical-applications',
      name: t('fishGelatin.productShowcase.categories.biomedicalApplications.name'),
      description: t('fishGelatin.productShowcase.categories.biomedicalApplications.description'),
      applications: t('fishGelatin.productShowcase.categories.biomedicalApplications.applications', { returnObjects: true }) as string[]
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

  return (
    <div className="min-h-screen">
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
          <section className="relative h-screen flex items-center justify-start overflow-hidden pt-16 md:pt-20">
            <div className="absolute inset-0">
              <img
                src="/images/background2.png"
                alt="Fish Gelatin"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 relative z-10 text-left">
              <h1 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight max-w-4xl"
                style={{ color: 'rgba(40, 123, 153, 1)' }}
              >
                {t('fishGelatin.heroTitle')}
              </h1>
            </div>
          </section>
        </div>

        {/* Introductory Highlights Section */}
        <section className="py-12 md:py-16 bg-background border-b border-gray-100">
          <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 flex flex-col items-center justify-center space-y-6 max-w-5xl">
            <h2 
              className="text-[26px] md:text-[33px] text-center leading-tight font-inter"
              style={{ color: 'rgba(40, 123, 153, 1)', fontWeight: 600 }}
            >
              {t('fishGelatin.introTitle')}
            </h2>
            <p 
              className="text-[18px] md:text-[18px] text-center leading-relaxed font-inter"
              style={{ color: 'rgba(67, 67, 64, 1)', fontSize: '18px' }}
            >
              {t('fishGelatin.introDesc1')}
            </p>
            <p 
              className="text-[18px] md:text-[18px] text-center leading-relaxed font-inter"
              style={{ color: 'rgba(67, 67, 64, 1)', fontSize: '18px' }}
            >
              {t('fishGelatin.introDesc2')}
            </p>
          </div>
        </section>

        {/* Image Grid Section */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 flex justify-center">
            <img 
              src="/images/fish_gelatin_grid.png" 
              alt="Fish Gelatin Applications Grid" 
              className="w-full max-w-5xl h-auto object-contain rounded-lg shadow-md"
            />
          </div>
        </section>


        {/* Applications of Fish Gelatin SECTION */}
        <div
          ref={benefitsRef}
          className={`transition-all duration-500 ease-out ${benefitsVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
            }`}
        >
          <GelatinBenefits />
        </div>

        {/* Discover Section */}
        <div>
          <section className="py-8 md:py-12 bg-background">
            <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32">
              <h2 className="mb-4 text-2xl sm:text-3xl md:text-4xl" style={{ fontFamily: 'Inter', color: 'rgba(29, 129, 165, 1)', fontWeight: '500' }}>{t('fishGelatin.discover.title')}</h2>
            </div>
          </section>

          <div className="relative h-[400px] md:h-[500px] flex items-center overflow-hidden">
            <div className="absolute inset-0">
              <img
                src="/images/fish_gelatin_discover.png"
                alt="Fish Gelatin Discover Background"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 relative z-10 h-full flex items-center justify-center lg:justify-end">
              <div className="bg-black/60 backdrop-blur-sm p-4 sm:p-6 md:p-8 lg:p-12 max-w-2xl text-center lg:text-left">
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4 md:mb-6" style={{ fontFamily: 'Inter' }}>
                  {t('fishGelatin.discover.selectApplication')}
                </h3>

                <p className="text-white text-xs sm:text-sm md:text-base lg:text-lg font-inter mb-4 sm:mb-6 md:mb-8 leading-relaxed" style={{ color: 'rgba(255, 255, 255, 1)', fontFamily: 'Inter, sans-serif' }}>
                  {t('fishGelatin.discover.description')}
                </p>

                <Button
                  variant="outline"
                  className="border-white text-white bg-transparent text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-2 sm:py-3 transition-all duration-300 ease-in-out hover:scale-105 group relative overflow-hidden"
                >
                  <span className="relative z-10 group-hover:text-black transition-colors duration-300 flex items-center">
                    {t('fishGelatin.discover.cta')}
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

export default FishGelatin;
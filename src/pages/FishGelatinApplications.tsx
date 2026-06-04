import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactTeaser from '@/components/ContactTeaser';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

const FishGelatinApplications = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isManualClick, setIsManualClick] = useState(false);
  const navigate = useNavigate();

  const [heroRef, heroVisible] = useScrollAnimation(0.1);
  const [categoriesRef, categoriesVisible] = useScrollAnimation(0.1);
  const [insightsImageRef, insightsImageVisible] = useScrollAnimation(0.1);
  const [insightsTextRef, insightsTextVisible] = useScrollAnimation(0.1);

  useEffect(() => {
    document.title = `Applications - ${t('fishGelatin.heroTitle')} - Athos Collagen Pvt. Ltd`;
  }, [t]);

  const handleDiscoverMore = (categoryId: string) => {
    navigate(`/category/${categoryId}`);
  };

  const categoryImageNameById: { [key: string]: string } = {
    'food-industry': 'Food_Industry.png',
    'cosmetics-skincare': 'Cosmetics_and_Skincare1.png',
    'biomedical-applications': 'Biomedical_applications.png',
    'pharma-industry': 'Pharma_Industry.png'
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

  useEffect(() => {
    let isInCategoriesSection = false;
    let lastCategoryIndex = -1;
    let animationFrameId: number;

    const handleScroll = () => {
      if (isManualClick) return;
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

        const currentlyInSection = sectionTop <= 100 && sectionTop + sectionHeight > 0;

        if (currentlyInSection && !isScrolling) {
          if (!isInCategoriesSection) {
            setActiveCategory(0);
            lastCategoryIndex = 0;
            isInCategoriesSection = true;
          } else {
            const scrollProgress = Math.max(0, Math.min(1, -sectionTop / (sectionHeight - viewportHeight)));
            const categoryIndex = Math.min(
              Math.round(scrollProgress * (categories.length - 1)),
              categories.length - 1
            );

            if (categoryIndex !== lastCategoryIndex && categoryIndex >= 0) {
              setActiveCategory(categoryIndex);
              lastCategoryIndex = categoryIndex;
            }
          }
        } else if (!currentlyInSection) {
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
      setIsManualClick(true);
      setIsScrolling(true);
      setActiveCategory(index);

      const sectionHeight = categoriesSection.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrollPosition = categoriesSection.offsetTop + (index * viewportHeight);

      window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
      });

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
          <section className="relative h-screen flex items-center justify-center sm:justify-start overflow-hidden pt-16 md:pt-20">
            <div className="absolute inset-0">
              <img
                src="/images/background2.png"
                alt="Fish Gelatin"
                className="hidden sm:block w-full h-full object-cover"
              />
              <img
                src="/images/background2_mobile.png"
                alt="Fish Gelatin Applications Mobile"
                className="block sm:hidden w-full h-full object-cover"
              />
            </div>

            <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 relative z-10 text-center sm:text-left">
              <h1 
                className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight max-w-4xl"
                style={{ color: 'rgba(40, 123, 153, 1)' }}
              >
                {t('fishGelatin.heroTitle')}
              </h1>
            </div>
          </section>
        </div>

        {/* Mobile Categories Section */}
        <div className="lg:hidden">
          <section className="py-12 bg-background">
            <div className="container mx-auto px-4 sm:px-6 md:px-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8" style={{ fontFamily: 'Inter', color: 'rgba(29, 129, 165, 1)', fontWeight: '500' }}>
                {t('fishGelatin.productShowcase.usageTitle')}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {categories.map((category) => (
                  <div key={category.id} className="bg-white rounded-lg shadow-lg p-6">
                    <div className="mb-4 flex justify-center">
                      <img
                        src={`/images/Fish_Gelatin/${getCategoryImageName(category.id)}`}
                        alt={category.name}
                        className="w-40 h-40 object-contain"
                      />
                    </div>
                    <h3 className="text-lg font-semibold mb-3 text-center">{category.name}</h3>
                    <p className="text-sm text-gray-600 mb-4 text-center">{category.description}</p>
                    <div className="space-y-2 mb-4">
                      {category.applications.map((app, appIndex) => (
                        <div key={appIndex} className="flex items-start space-x-3">
                          <span className="mt-1 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[8px] flex-shrink-0" style={{ borderBottomColor: 'rgba(106, 191, 0, 1)' }}></span>
                          <span className="text-sm text-gray-600">{app}</span>
                        </div>
                      ))}
                    </div>
                    <Button
                      onClick={() => handleDiscoverMore(category.id)}
                      className="w-full"
                      style={{ backgroundColor: 'rgba(106, 191, 0, 1)' }}
                    >
                      {t('fishGelatin.productShowcase.discoverMore')}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Desktop Categories Section */}
        <div className="hidden lg:block">
          <div
            ref={categoriesRef}
            className={`transition-all duration-500 ease-out delay-100 ${categoriesVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
              }`}
          >
            <section id="categories-section" className="relative bg-background" style={{ height: `${categories.length * 100}vh` }}>
              <div className="sticky top-0 h-screen overflow-hidden">
                <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 h-full flex items-center">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 w-full">
                    <div className="lg:sticky lg:top-0 lg:h-screen lg:flex lg:items-center">
                      <nav className="space-y-1 w-full">
                        {categories.map((category, index) => (
                          <button
                            key={category.id}
                            onClick={() => scrollToCategory(index)}
                            className={`w-full text-left py-4 text-lg transition-colors duration-150 ease-out ${activeCategory === index
                              ? 'text-primary font-semibold'
                              : 'text-muted-foreground hover:text-foreground'
                              }`}
                          >
                            {category.name}
                          </button>
                        ))}
                      </nav>
                    </div>

                    <div className="lg:col-span-3">
                      <div className="relative h-full flex items-center justify-center">
                        <div className="grid lg:grid-cols-2 gap-8 items-center w-full max-w-6xl">
                          <div>
                            <h3 className="mb-6 text-[40px] font-medium" style={{ color: 'rgba(29, 129, 165, 1)' }}>
                              {categories[activeCategory].name}
                            </h3>
                            <p className="text-muted-foreground leading-tight mb-8 text-[16px]" style={{ color: 'rgba(112, 112, 112, 1)' }}>
                              {categories[activeCategory].description}
                            </p>
                            <div className="space-y-4 mb-8">
                              {categories[activeCategory].applications.map((app, index) => (
                                <div key={index} className="flex items-start space-x-4">
                                  <span className="mt-2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] flex-shrink-0" style={{ borderBottomColor: 'rgba(106, 191, 0, 1)' }}></span>
                                  <span className="text-lg text-muted-foreground" style={{ color: 'rgba(112, 112, 112, 1)' }}>{app}</span>
                                </div>
                              ))}
                            </div>
                            <Button
                              variant="ghost"
                              className="text-gray-600 hover:bg-gray-100 text-lg"
                              onClick={() => handleDiscoverMore(categories[activeCategory].id)}
                            >
                              {t('fishGelatin.productShowcase.discoverMore')}
                              <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                          </div>

                          <div className="flex justify-end">
                            <div className="relative w-80 h-80 flex items-center justify-center">
                              {categories.map((category, index) => (
                                <div
                                  key={category.id}
                                  className={`absolute w-80 h-80 flex items-center justify-center transition-all duration-300 ease-out ${activeCategory === index ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-95 z-0'}`}
                                >
                                  <img
                                    src={`/images/Fish_Gelatin/${getCategoryImageName(category.id)}`}
                                    alt={category.name}
                                    className="w-80 h-auto object-contain"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Insights Section */}
        <div className="overflow-x-hidden">
          <section className="py-12 md:py-20 bg-background">
            <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-6 items-center">
                {/* Left Side - Image - Coming from left */}
                <div
                  ref={insightsImageRef}
                  className={`transition-all duration-500 ease-out transition-stable ${insightsImageVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 -translate-x-12'
                    }`}
                >
                  <h2 className="mb-4 md:mb-8" style={{ fontFamily: 'Inter', color: 'rgba(29, 129, 165, 1)', fontSize: window.innerWidth < 768 ? '24px' : window.innerWidth < 1024 ? '32px' : '40px', fontWeight: '500' }}>{t('fishGelatin.insights.title')}</h2>
                  <img
                    src="/images/insight_2.png"
                    alt="Fish Gelatin Insights"
                    className="w-full max-w-[28rem] h-[28rem] object-cover rounded-lg"
                  />
                </div>

                {/* Right Side - Content - Coming from right */}
                <div
                  ref={insightsTextRef}
                  className={`flex flex-col justify-center h-full transition-all duration-500 ease-out transition-stable ${insightsTextVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12'
                    }`}
                >
                  <h2 className="mb-4 md:mb-8" style={{ fontFamily: 'Inter', color: 'rgba(29, 129, 165, 1)', fontSize: window.innerWidth < 768 ? '24px' : window.innerWidth < 1024 ? '32px' : '40px', fontWeight: '500' }}>{t('fishGelatin.insights.whatIsTitle')}</h2>
                  <div className="space-y-4 md:space-y-6">
                    {(t('fishGelatin.insights.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                      <div key={index} className="flex items-start space-x-3 md:space-x-4">
                        <img
                          src={`/images/${index === 0 ? '26' : index === 1 ? '24' : index === 2 ? '23' : '25'}.png`}
                          alt={`Icon ${index + 1}`}
                          className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 mt-1"
                          style={{ filter: `grayscale(100%) brightness(${index === 3 ? '1.5' : '1.2'})` }}
                        />
                        <p className="text-muted-foreground text-sm sm:text-base md:text-lg font-inter" style={{ color: 'rgba(112, 112, 112, 1)', fontFamily: 'Inter, sans-serif' }}>{item}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8">
                    <Button 
                      variant="outline" 
                      onClick={() => navigate('/fish-gelatin')}
                      className="px-4 md:px-6 py-4 md:py-6 text-sm md:text-base transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-green-400/30 group relative overflow-hidden athos-button-hover w-full sm:w-auto" 
                      style={{color: 'rgba(112, 112, 112, 1)'}}
                    >
                      <span className="relative z-10 group-hover:text-white transition-colors duration-300 flex items-center justify-center font-semibold">
                        {t('common.discoverMoreInfo')} 
                        <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300 font-bold">→</span>
                      </span>
                      <div 
                        className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                        style={{backgroundColor: 'rgba(106, 191, 0, 1)'}}
                      ></div>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <ContactTeaser />
      </main>
      <Footer />
    </div>
  );
};

export default FishGelatinApplications;

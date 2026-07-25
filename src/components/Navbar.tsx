import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
];

const productCategories = [
  {
    title: "Enzymes",
    slug: "enzymes",
    href: "/products/enzymes",
    subProducts: [
      "Serratiopeptidase", "Trypsin", "Pancreatin", "Pepsin", "Amylase",
      "Bromelain", "Rennet", "Lactase", "Lipase", "Papain",
      "Phospholipase", "Protease", "Dextranase", "Cellulase", "Beta-Glucanase",
      "Transglutaminase", "Laccase", "Polygalacturonase", "Xylanase", "Galactosidase",
      "Pectinase"
    ]
  },
  {
    title: "Peptones",
    slug: "peptones",
    href: "/products/peptones",
    subProducts: [
      "Bovine Collagen Peptide", "Veg Collagen", "Fish Collagen Peptide", "Chicken Collagen",
      "Egg Membrane Collagen", "Undenatured Collagen", "Bovine Gelatin", "Fish Gelatin",
      "Mucopolysaccharides", "Corn Hydrolysate Protein", "Wheat Peptide", "Pea Peptide",
      "Brown Rice Protein", "Soy Protein", "Whey Protein"
    ]
  },
  {
    title: "Probiotic and Fermentation Ingredients",
    slug: "probiotic-fermentation-ingredients",
    href: "/products/probiotic-fermentation-ingredients",
    subProducts: [
      "Malt Extract", "Yeast Extract", "Liver Extract", "Meat Extract",
      "Lactobacillus Buchneri", "Streptococcus Thermophilus", "Lactobacillus Casei", "Bifidobacterium Adolescentis",
      "Enterococcus Faecium", "Pediococcus Acidilactici", "Bacillus Coagulans", "Bacillus Subtilis",
      "Lactobacillus Brevis", "Saccharomyces Cerevisiae", "Bacillus Clausii", "Bifidobacterium Animalis",
      "Bifidobacterium Longum", "Bifidobacterium Infantis", "Lactobacillus Bulgaricus", "Streptococcus Faecium"
    ]
  },
  {
    title: "Nutraceutical and Pharmaceuticals Ingredients",
    slug: "nutraceutical-pharmaceutical-ingredients",
    href: "/products/nutraceutical-pharmaceutical-ingredients",
    subProducts: [
      "L-Glutathione", "Chondroitin Sulfate", "Hyaluronic Acid", "Methylsulfonylmethane (MSM)",
      "Glucosamine", "Coenzyme Q10", "Maltodextrin", "Sodium Alginate",
      "Guar Gum", "Bovine Colostrum Powder", "Agar Agar", "Pectin",
      "Lecithin", "Sodium Caseinate", "Microcrystalline Cellulose"
    ]
  },
  {
    title: "Animal Nutrition",
    slug: "animal-nutrition",
    href: "/products/animal-nutrition",
    subProducts: [
      "Sodium Butyrate", "Calcium Butyrate", "Mannan Oligosaccharide", "Amino Chelated Minerals",
      "Sodium Propionate", "Calcium Propionate", "Protein Hydrolysate", "Active Dry Yeast"
    ]
  },
  {
    title: "Extract and Essential Oils",
    slug: "extract-and-essential-oils",
    href: "/products/extract-and-essential-oils",
    subProducts: [
      "SCFE Black Pepper Oleoresin",
      "Piperine",
      "SCFE Ginger Oleoresin",
      "Ginger Extract Granules",
      "SCFE Vanilla Extract",
      "SCFE Holy Basil Oleoresin",
      "SCFE Seabuckthorn Oil"
    ]
  }
];

const getSubProductSlug = (name: string) => {
  if (name.includes("MSM")) return "msm";
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
};

const Navbar = () => {
  const { t } = useTranslation();
  const { language, changeLanguage } = useLanguage();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isMobileLanguageOpen, setIsMobileLanguageOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>(null);

  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<typeof productCategories[0] | null>(null);
  const [isSubProductsExpanded, setIsSubProductsExpanded] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];
  const [isScrolled, setIsScrolled] = useState(false);

  const languageTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsSubProductsExpanded(false);
  }, [activeCategory]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleLanguageMouseEnter = () => {
    if (languageTimeoutRef.current) {
      clearTimeout(languageTimeoutRef.current);
      languageTimeoutRef.current = null;
    }
    setIsLanguageOpen(true);
  };

  const handleLanguageMouseLeave = () => {
    languageTimeoutRef.current = setTimeout(() => {
      setIsLanguageOpen(false);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (languageTimeoutRef.current) {
        clearTimeout(languageTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isMenuOpen 
        ? 'h-20 bg-white border-b border-gray-200 shadow-md'
        : isScrolled 
          ? 'h-16 bg-white/90 backdrop-blur-md border-b border-white/40 shadow-lg' 
          : 'h-20 bg-white/80 backdrop-blur-md border-b border-white/30 shadow-sm'
    }`}>
      <nav className="container mx-auto px-4 md:px-4 lg:px-10 h-full flex items-center justify-between relative mobile-nav-container">
        {/* ATHOS Logo */}
        <div className="flex items-center flex-shrink-0 z-10">
          <Link to="/" className="flex items-center">
            <img 
              src="/images/athos_logo.webp" 
              alt="ATHOS Collagen" 
              className="h-10 md:h-12 w-auto max-h-full transition-all duration-300 hover:scale-105"
            />
          </Link>
        </div>

        {/* Desktop Navigation (Laptop View - lg and above) */}
        <div className="hidden lg:flex items-center justify-center flex-grow mx-4 lg:mx-8">
          <div className="flex items-center space-x-6 lg:space-x-8 xl:space-x-10">
            {/* Home */}
            <Link
              to="/"
              className={`text-sm lg:text-base font-medium whitespace-nowrap transition-colors ${
                isActive('/') ? 'text-[#6ABF00] font-semibold' : 'text-[#555555] hover:text-[#6ABF00]'
              }`}
            >
              {t('nav.home', { defaultValue: 'Home' })}
            </Link>

            {/* About Us */}
            <Link
              to="/about"
              className={`text-sm lg:text-base font-medium whitespace-nowrap transition-colors ${
                isActive('/about') ? 'text-[#6ABF00] font-semibold' : 'text-[#555555] hover:text-[#6ABF00]'
              }`}
            >
              {t('nav.about', { defaultValue: 'About Us' })}
            </Link>

            {/* Products with Mega Menu */}
            <div 
              className="relative group h-full flex items-center"
              onMouseEnter={() => {
                setIsMegaMenuOpen(true);
              }}
              onMouseLeave={() => {
                setIsMegaMenuOpen(false);
                setActiveCategory(null);
              }}
            >
              <button
                className={`flex items-center gap-1 text-sm lg:text-base font-medium whitespace-nowrap transition-colors py-4 ${
                  isActive('/products') || isMegaMenuOpen ? 'text-[#6ABF00] font-semibold' : 'text-[#555555] hover:text-[#6ABF00]'
                }`}
              >
                <span>{t('nav.products', { defaultValue: 'Products' })}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMegaMenuOpen ? 'rotate-180 text-[#6ABF00]' : ''}`} />
              </button>

              {/* Mega Menu Dropdown */}
              <div 
                style={{ left: 'calc(50% - 215px)' }}
                className={`absolute top-full bg-white border border-gray-200 rounded-xl shadow-2xl transition-all duration-300 z-50 overflow-hidden flex ${
                  isMegaMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
                } ${
                  activeCategory ? "w-[760px]" : "w-[430px]"
                }`}
              >
                {/* Left Column: Categories List */}
                <div className={`transition-all duration-300 p-2.5 space-y-1 ${
                  activeCategory ? "w-[430px] bg-gray-50/50 border-r border-gray-100" : "w-full bg-white"
                }`}>
                  {productCategories.map((cat) => (
                    <div
                      key={cat.title}
                      onClick={() => setActiveCategory(activeCategory?.title === cat.title ? null : cat)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg cursor-pointer transition-all duration-200 ${
                        activeCategory?.title === cat.title
                          ? "bg-[#f4faec] text-[#6ABF00] font-semibold"
                          : "text-[#555555] hover:bg-gray-100 hover:text-[#6ABF00]"
                      }`}
                    >
                      <span className="flex-1 text-[13px] sm:text-sm flex items-center whitespace-nowrap font-medium pr-3">
                        {t(`categories.${cat.slug}.title`, { defaultValue: cat.title })}
                      </span>
                      <ChevronRight className={`w-4 h-4 flex-shrink-0 transition-colors ${
                        activeCategory?.title === cat.title
                          ? "text-[#6ABF00]"
                          : "text-gray-400"
                      }`} />
                    </div>
                  ))}
                </div>

                {/* Right Column: Subproducts List */}
                <div className={`transition-all duration-300 bg-white flex flex-col justify-between ${
                  activeCategory 
                    ? "w-[320px] p-5 min-h-[350px] opacity-100 visible" 
                    : "w-0 p-0 opacity-0 invisible overflow-hidden min-h-0 h-0"
                }`}>
                  {activeCategory && (() => {
                    const hasMoreThanLimit = activeCategory.subProducts.length > 10;
                    const visibleSubProducts = hasMoreThanLimit && !isSubProductsExpanded
                      ? activeCategory.subProducts.slice(0, 8)
                      : activeCategory.subProducts;
                    const showViewMore = hasMoreThanLimit && !isSubProductsExpanded;
                    const showCategoryPageButton = !hasMoreThanLimit || isSubProductsExpanded;

                    return (
                      <>
                        <div>
                          <div className="grid grid-cols-1 gap-y-2.5 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                            {visibleSubProducts.map((sub, idx) => {
                              const subSlug = getSubProductSlug(sub);
                              return (
                                <Link
                                  key={idx}
                                  to={`/products/${activeCategory.slug}#${subSlug}`}
                                  className="flex items-center gap-2 text-sm text-[#555555] hover:text-[#6ABF00] transition-colors duration-150 py-0.5"
                                  onClick={() => {
                                    setIsMegaMenuOpen(false);
                                    setActiveCategory(null);
                                  }}
                                >
                                  <span className="text-[#6ABF00] text-[8px] flex-shrink-0">▶</span>
                                  <span className="font-medium leading-tight">{sub}</span>
                                </Link>
                              );
                            })}

                            {showViewMore && (
                              <button
                                onClick={() => setIsSubProductsExpanded(true)}
                                className="text-[13px] font-bold text-[#6ABF00] hover:text-[#589e00] flex items-center gap-1.5 mt-2.5 w-fit hover:underline text-left cursor-pointer transition-colors"
                              >
                                <span>{t('nav.viewMore', { defaultValue: 'View More' })}</span>
                                <span>▼</span>
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Mega Menu Footer */}
                        {showCategoryPageButton && (
                          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-start">
                            <Link
                              to={activeCategory.href}
                              onClick={() => {
                                setIsMegaMenuOpen(false);
                                setActiveCategory(null);
                              }}
                            >
                              <Button className="bg-[#6ABF00] hover:bg-[#589e00] text-white text-sm px-4 py-2.5 h-auto font-semibold rounded-lg shadow-sm w-fit transition-all duration-300">
                                {t('nav.viewCategoryPage', { defaultValue: 'View Category Page' })}
                              </Button>
                            </Link>
                          </div>
                        )}
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>

            {/* Contact Us */}
            <Link
              to="/contact"
              className={`text-sm lg:text-base font-medium whitespace-nowrap transition-colors ${
                isActive('/contact') ? 'text-[#6ABF00] font-semibold' : 'text-[#555555] hover:text-[#6ABF00]'
              }`}
            >
              {t('nav.contact', { defaultValue: 'Contact Us' })}
            </Link>
          </div>
        </div>

        {/* Laptop View Right Actions: Language Switcher & Inquiry Button */}
        <div className="hidden lg:flex items-center space-x-3 lg:space-x-4 flex-shrink-0 z-10">
          {/* Language Switcher */}
          <div 
            className="relative"
            onMouseEnter={handleLanguageMouseEnter}
            onMouseLeave={handleLanguageMouseLeave}
          >
            <button
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              className="flex items-center space-x-1 lg:space-x-2 px-2 py-1.5 nav-link text-xs lg:text-sm font-medium"
              aria-label="Language selector"
            >
              <span className="text-base">{currentLanguage.flag}</span>
              <span className="text-xs lg:text-sm font-medium uppercase">{currentLanguage.code}</span>
              <ChevronDown className="h-3 w-3" />
            </button>

            {isLanguageOpen && (
              <div className="absolute right-0 top-full pt-1.5 z-50">
                <div 
                  className="w-48 bg-white rounded-lg shadow-lg border border-gray-200 dropdown-enter-active"
                  onMouseEnter={handleLanguageMouseEnter}
                  onMouseLeave={handleLanguageMouseLeave}
                >
                  <div className="py-2.5">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          changeLanguage(lang.code);
                          setIsLanguageOpen(false);
                        }}
                        className={`w-full flex items-center space-x-3 px-4 py-2.5 text-sm transition-colors ${
                          currentLanguage.code === lang.code 
                            ? 'bg-[#f4faec] text-[#6ABF00] font-semibold' 
                            : 'hover:bg-gray-50 text-[#555555]'
                        }`}
                      >
                        <span className="text-base">{lang.flag}</span>
                        <span className="text-sm font-medium">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Inquiry Button */}
          <Link to="/contact">
            <Button 
              className="text-white text-xs lg:text-sm px-4 py-1.5 h-9 hover:opacity-90 transition-opacity font-medium rounded-lg shadow-sm"
              style={{ backgroundColor: 'rgba(190, 230, 140, 1)' }}
            >
              INQUIRY
            </Button>
          </Link>
        </div>

        {/* Mobile & Tablet View Right Actions: Language Switcher (Left of Menu Toggle) & Menu Button */}
        <div className="lg:hidden flex items-center space-x-2 sm:space-x-3 mobile-nav-right">
          {/* Language Selector (Left of Menu Toggle) */}
          <div className="relative">
            <button
              onClick={() => setIsMobileLanguageOpen(!isMobileLanguageOpen)}
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-medium border border-gray-200 bg-white text-[#555555] hover:text-[#6ABF00] hover:border-[#6ABF00] transition-colors shadow-xs"
              aria-label="Language selector"
            >
              <span className="text-sm">{currentLanguage.flag}</span>
              <span className="text-xs font-semibold uppercase">{currentLanguage.code}</span>
              <ChevronDown className={`h-3 w-3 text-gray-500 transition-transform duration-200 ${isMobileLanguageOpen ? 'rotate-180' : ''}`} />
            </button>

            {isMobileLanguageOpen && (
              <div className="absolute right-0 top-full mt-2 w-44 bg-white rounded-lg shadow-xl border border-gray-200 z-50 py-1.5 dropdown-enter-active">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      changeLanguage(lang.code);
                      setIsMobileLanguageOpen(false);
                    }}
                    className={`w-full flex items-center space-x-2.5 px-3 py-2 text-xs transition-colors ${
                      currentLanguage.code === lang.code 
                        ? 'bg-[#f4faec] text-[#6ABF00] font-semibold' 
                        : 'hover:bg-gray-50 text-[#555555]'
                    }`}
                  >
                    <span className="text-base">{lang.flag}</span>
                    <span className="text-xs font-medium">{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Hamburger Menu Icon */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0 text-[#555555]"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6 text-[#6ABF00]" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile & Tablet Full-Page Screen Drawer Menu */}
      {isMenuOpen && (
        <div className={`lg:hidden fixed left-0 right-0 bottom-0 w-full bg-white border-t border-gray-200 shadow-2xl overflow-y-auto z-50 custom-scrollbar flex flex-col justify-between ${
          isScrolled ? 'top-16 h-[calc(100vh-4rem)]' : 'top-20 h-[calc(100vh-5rem)]'
        }`}>
          <div className="container mx-auto px-4 md:px-12 py-6 bg-white flex-1 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Home */}
              <Link
                to="/"
                className={`block py-3 text-lg font-medium border-b border-gray-100 transition-colors ${
                  isActive('/') ? 'text-[#6ABF00] font-semibold' : 'text-[#555555] hover:text-[#6ABF00]'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.home', { defaultValue: 'Home' })}
              </Link>
              
              {/* About Us */}
              <Link
                to="/about"
                className={`block py-3 text-lg font-medium border-b border-gray-100 transition-colors ${
                  isActive('/about') ? 'text-[#6ABF00] font-semibold' : 'text-[#555555] hover:text-[#6ABF00]'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.about', { defaultValue: 'About Us' })}
              </Link>
              
              {/* Products Accordion Section */}
              <div className="py-1 border-b border-gray-100">
                <button
                  onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
                  className={`flex items-center justify-between w-full py-3 text-lg font-semibold transition-colors ${
                    isActive('/products') || isMobileProductsOpen ? 'text-[#6ABF00]' : 'text-[#555555] hover:text-[#6ABF00]'
                  }`}
                >
                  <span>{t('nav.products', { defaultValue: 'Products' })}</span>
                  <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${isMobileProductsOpen ? 'rotate-180 text-[#6ABF00]' : 'text-gray-500'}`} />
                </button>

                {isMobileProductsOpen && (
                  <div className="pt-2 pb-3 space-y-1 bg-white">
                    {productCategories.map((cat) => {
                      const isCatExpanded = expandedMobileCategory === cat.slug;
                      return (
                        <div key={cat.title} className="border-b border-gray-100/80 last:border-none py-1">
                          <button
                            onClick={() => setExpandedMobileCategory(isCatExpanded ? null : cat.slug)}
                            className={`flex items-center justify-between w-full py-2.5 px-3 rounded-lg text-base font-medium transition-colors ${
                              isCatExpanded ? 'text-[#6ABF00]' : 'text-[#555555] hover:text-[#6ABF00] hover:bg-gray-50'
                            }`}
                          >
                            <span className="text-left font-medium">
                              {t(`categories.${cat.slug}.title`, { defaultValue: cat.title })}
                            </span>
                            <ChevronDown className={`h-4 w-4 flex-shrink-0 transition-transform duration-200 ${isCatExpanded ? 'rotate-180 text-[#6ABF00]' : 'text-gray-400'}`} />
                          </button>

                          {isCatExpanded && (
                            <div className="pl-2 pr-2 py-3 space-y-2 rounded-b-lg mt-1 ">
                              <div className="grid grid-cols-1 gap-2">
                                {cat.subProducts.map((sub, idx) => {
                                  const subSlug = getSubProductSlug(sub);
                                  return (
                                    <Link
                                      key={idx}
                                      to={`/products/${cat.slug}#${subSlug}`}
                                      className="flex items-center gap-2 text-xs sm:text-sm text-[#555555] hover:text-[#6ABF00] transition-colors py-1 px-1 rounded font-medium"
                                      onClick={() => setIsMenuOpen(false)}
                                    >
                                      <span className="text-[#6ABF00] text-[8px] flex-shrink-0">▶</span>
                                      <span>{sub}</span>
                                    </Link>
                                  );
                                })}
                              </div>
                              <div className="pt-2.5 border-t border-gray-200/60">
                                <Link
                                  to={cat.href}
                                  className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#6ABF00] hover:underline"
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  <span>{t('nav.viewCategoryPage', { defaultValue: 'View Category Page' })}</span>
                                  <span>→</span>
                                </Link>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Contact Us */}
              <Link
                to="/contact"
                className={`block py-3 text-lg font-medium border-b border-gray-100 transition-colors ${
                  isActive('/contact') ? 'text-[#6ABF00] font-semibold' : 'text-[#555555] hover:text-[#6ABF00]'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.contact', { defaultValue: 'Contact Us' })}
              </Link>
            </div>

            {/* Inquiry Button inside Mobile & Tablet Drawer */}
            <div className="pt-6 mt-6 border-t border-gray-100">
              <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                <Button 
                  className="w-full text-white text-base py-3.5 h-auto font-semibold rounded-xl shadow-md hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: 'rgba(190, 230, 140, 1)' }}
                >
                  INQUIRY
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Mail } from 'lucide-react';
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
  },
  {
    title: "Peptones",
    slug: "peptones",
    href: "/products/peptones",
  },
  {
    title: "Probiotic and Fermentation Ingredients",
    slug: "probiotic-fermentation-ingredients",
    href: "/products/probiotic-fermentation-ingredients",
  },
  {
    title: "Nutraceutical and Pharmaceuticals Ingredients",
    slug: "nutraceutical-pharmaceutical-ingredients",
    href: "/products/nutraceutical-pharmaceutical-ingredients",
  },
  {
    title: "Animal Nutrition",
    slug: "animal-nutrition",
    href: "/products/animal-nutrition",
  },
  {
    title: "Extract and Essential Oils",
    slug: "extract-and-essential-oils",
    href: "/products/extract-and-essential-oils",
  }
];

const Navbar = () => {
  const { t } = useTranslation();
  const { language, changeLanguage } = useLanguage();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);

  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];
  const [isScrolled, setIsScrolled] = useState(false);

  const languageTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
    <header className={`fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-300 ${
      isMenuOpen 
        ? 'bg-white border-b border-gray-200 shadow-md'
        : isScrolled 
          ? 'bg-white/90 backdrop-blur-md border-b border-white/40 shadow-lg' 
          : 'bg-white/80 backdrop-blur-md border-b border-white/30 shadow-sm'
    }`}>
      <nav className="container mx-auto px-4 lg:px-10 xl:px-12 h-full flex items-center justify-between relative mobile-nav-container">
        {/* Mobile & Tablet Left Action: Hamburger Menu Toggle */}
        <div className="lg:hidden flex items-center z-10">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0 text-[#555555]"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6 text-[#6ABF00]" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* ATHOS Logo (Centered on Mobile & Tablet, Left-aligned on Desktop) */}
        <div className="lg:static absolute left-1/2 -translate-x-1/2 lg:translate-x-0 flex items-center flex-shrink-0 z-10">
          <Link to="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
            <img 
              src="/images/athos_logo.webp" 
              alt="ATHOS Collagen" 
              className="h-10 md:h-12 w-auto max-h-full transition-all duration-300"
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

            {/* Products Dropdown (Main Products Only) */}
            <div 
              className="relative group h-full flex items-center"
              onMouseEnter={() => setIsProductsDropdownOpen(true)}
              onMouseLeave={() => setIsProductsDropdownOpen(false)}
            >
              <button
                className={`flex items-center gap-1 text-sm lg:text-base font-medium whitespace-nowrap transition-colors py-4 ${
                  isActive('/products') || isProductsDropdownOpen ? 'text-[#6ABF00] font-semibold' : 'text-[#555555] hover:text-[#6ABF00]'
                }`}
              >
                <span>{t('nav.products', { defaultValue: 'Products' })}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isProductsDropdownOpen ? 'rotate-180 text-[#6ABF00]' : ''}`} />
              </button>

              {/* Main Products Dropdown Menu */}
              <div 
                className={`absolute top-full left-1/2 -translate-x-1/2 bg-white border border-gray-200 rounded-xl shadow-xl transition-all duration-200 z-50 overflow-hidden w-[380px] p-2 space-y-1 ${
                  isProductsDropdownOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2 pointer-events-none"
                }`}
              >
                {productCategories.map((cat) => (
                  <Link
                    key={cat.title}
                    to={cat.href}
                    onClick={() => setIsProductsDropdownOpen(false)}
                    className="flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 text-[#555555] hover:bg-[#f4faec] hover:text-[#6ABF00]"
                  >
                    <span className="text-sm font-medium leading-snug">
                      {t(`categories.${cat.slug}.title`, { defaultValue: cat.title })}
                    </span>
                  </Link>
                ))}
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

        {/* Laptop View Right Actions: Language Switcher, Inquiry Button & Email Icon */}
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

          {/* Email Icon Button */}
          <a
            href="mailto:inquiry@athoscollagen.com?subject=Inquiry from ATHOS Website&body=Hello ATHOS Team,%0D%0A%0D%0AI am interested in learning more about your collagen products.%0D%0A%0D%0APlease contact me at your earliest convenience.%0D%0A%0D%0AThank you!"
            className="p-2 rounded-lg text-[#555555] hover:text-[#6ABF00] hover:bg-[#f4faec] transition-all duration-200 flex items-center justify-center"
            title="Send Email"
            aria-label="Send Email"
          >
            <Mail className="w-5 h-5 transition-transform duration-200 hover:scale-110" />
          </a>
        </div>

        {/* Mobile & Tablet View Right Actions: Email Icon Button */}
        <div className="lg:hidden flex items-center space-x-2 sm:space-x-3 mobile-nav-right z-10">
          {/* Email Icon Button */}
          <a
            href="mailto:inquiry@athoscollagen.com?subject=Inquiry from ATHOS Website&body=Hello ATHOS Team,%0D%0A%0D%0AI am interested in learning more about your collagen products.%0D%0A%0D%0APlease contact me at your earliest convenience.%0D%0A%0D%0AThank you!"
            className="p-2 rounded-lg text-[#555555] hover:text-[#6ABF00] hover:bg-[#f4faec] transition-all duration-200 flex items-center justify-center"
            title="Send Email"
            aria-label="Send Email"
          >
            <Mail className="w-5 h-5 transition-transform duration-200 hover:scale-110" />
          </a>
        </div>
      </nav>

      {/* Mobile & Tablet Full-Page Screen Drawer Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed left-0 right-0 bottom-0 w-full bg-white border-t border-gray-200 shadow-2xl overflow-y-auto z-50 custom-scrollbar flex flex-col justify-between top-20 h-[calc(100vh-5rem)]">
          <div className="container mx-auto px-4 py-2 bg-white flex-1 flex flex-col justify-between">
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
                    {productCategories.map((cat) => (
                      <Link
                        key={cat.title}
                        to={cat.href}
                        className="flex items-center justify-between w-full py-2.5 px-3 rounded-lg text-base font-medium text-[#555555] hover:text-[#6ABF00] hover:bg-[#f4faec] transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="text-left font-medium">
                          {t(`categories.${cat.slug}.title`, { defaultValue: cat.title })}
                        </span>
                      </Link>
                    ))}
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
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
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

const Navbar = () => {
  const { t } = useTranslation();
  const { language, changeLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isApplicationsOpen, setIsApplicationsOpen] = useState(false);
  const [isMobileLanguageOpen, setIsMobileLanguageOpen] = useState(false);
  const [isMobileApplicationsOpen, setIsMobileApplicationsOpen] = useState(false);
  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Timeout refs for smooth dropdown behavior
  const languageTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const applicationsTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper functions for smooth dropdown behavior

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
    }, 150); // Small delay before closing
  };

  const handleApplicationsMouseEnter = () => {
    if (applicationsTimeoutRef.current) {
      clearTimeout(applicationsTimeoutRef.current);
      applicationsTimeoutRef.current = null;
    }
    setIsApplicationsOpen(true);
  };

  const handleApplicationsMouseLeave = () => {
    applicationsTimeoutRef.current = setTimeout(() => {
      setIsApplicationsOpen(false);
    }, 150); // Small delay before closing
  };

  // Cleanup timeouts on unmount
  React.useEffect(() => {
    return () => {
      if (languageTimeoutRef.current) {
        clearTimeout(languageTimeoutRef.current);
      }
      if (applicationsTimeoutRef.current) {
        clearTimeout(applicationsTimeoutRef.current);
      }
    };
  }, []);



  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isMenuOpen 
        ? 'h-20 bg-white/95 backdrop-blur-md border-b border-white/30 shadow-lg'
        : isScrolled 
          ? 'h-16 bg-white/90 backdrop-blur-md border-b border-white/40 shadow-lg' 
          : 'h-20 bg-white/80 backdrop-blur-md border-b border-white/30 shadow-sm'
    }`}>
      <nav className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 h-full flex items-center justify-between relative mobile-nav-container">
        {/* ATHOS Logo (Left aligned on all viewports) */}
        <div className="flex items-center flex-shrink-0 z-10">
          <Link to="/" className="flex items-center">
            <img 
              src="/images/athos_logo.webp" 
              alt="ATHOS Collagen" 
              className="h-10 md:h-12 w-auto max-h-full transition-all duration-300 hover:scale-105"
            />
          </Link>
        </div>

        {/* Desktop Navigation (Centered) */}
        <div className="hidden md:flex items-center justify-center flex-grow mx-4 lg:mx-8">
          <div className="flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
            {/* Home */}
            <Link
              to="/"
              className="nav-link text-xs lg:text-sm font-medium whitespace-nowrap"
            >
              {t('nav.home')}
            </Link>

            {/* About Us */}
            <Link
              to="/about"
              className="nav-link text-xs lg:text-sm font-medium whitespace-nowrap"
            >
              {t('nav.about')}
            </Link>

            {/* FiColla Logo in the middle */}
            <a 
              href="https://ficolla.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center flex-shrink-0"
            >
              <img 
                src="/images/Fi-Colla-Logo.png" 
                alt="FiColla Logo" 
                className="h-[14px] lg:h-[16px] w-auto object-contain transition-all duration-300 hover:scale-105"
              />
            </a>

            {/* Fish Collagen Peptide */}
            <Link
              to="/fish-collagen-peptide"
              className="nav-link text-xs lg:text-sm font-medium whitespace-nowrap"
            >
              {t('nav.fishCollagen')}
            </Link>

            {/* Fish Gelatin */}
            <Link
              to="/fish-gelatin"
              className="nav-link text-xs lg:text-sm font-medium whitespace-nowrap"
            >
              {t('nav.fishGelatin')}
            </Link>

            {/* Applications Dropdown */}
            <div 
              className="relative"
              onMouseEnter={handleApplicationsMouseEnter}
              onMouseLeave={handleApplicationsMouseLeave}
            >
              <button
                className="flex items-center space-x-1 nav-link text-xs lg:text-sm font-medium whitespace-nowrap"
                aria-label="Applications selector"
              >
                <span>{t('about.applications')}</span>
                <ChevronDown className="h-3 w-3" />
              </button>

              {isApplicationsOpen && (
                <>
                  {/* Invisible bridge to cover the gap */}
                  <div className="absolute top-full left-0 right-0 h-1 bg-transparent" />
                  <div 
                    className="absolute top-full left-0 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50 dropdown-enter-active"
                    onMouseEnter={handleApplicationsMouseEnter}
                    onMouseLeave={handleApplicationsMouseLeave}
                  >
                    <div className="py-2">
                      <Link 
                        to="/fish-collagen-applications"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-accent transition-colors"
                        onClick={() => setIsApplicationsOpen(false)}
                      >
                        {t('nav.fishCollagen')}
                      </Link>
                      <Link 
                        to="/fish-gelatin-applications"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-accent transition-colors"
                        onClick={() => setIsApplicationsOpen(false)}
                      >
                        {t('nav.fishGelatin')}
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right Actions: Language Switcher & Inquiry Button */}
        <div className="hidden md:flex items-center space-x-3 lg:space-x-4 flex-shrink-0 z-10">
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
              <>
                {/* Invisible bridge to cover the gap */}
                <div className="absolute top-full left-0 right-0 h-1 bg-transparent" />
                <div 
                  className="absolute top-full right-0 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 dropdown-enter-active"
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
                            ? 'bg-accent text-primary' 
                            : 'hover:bg-accent text-gray-700'
                        }`}
                      >
                        <span className="text-base">{lang.flag}</span>
                        <span className="text-sm font-medium">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
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

        {/* Mobile Actions: Inquiry Button & Menu Toggle */}
        <div className="md:hidden flex items-center space-x-1 mobile-nav-right">
          <Link to="/contact">
            <Button 
              className="text-white text-xs px-3 py-1 h-7 flex-shrink-0 hover:opacity-90 transition-opacity font-medium rounded shadow-sm"
              style={{ backgroundColor: 'rgba(190, 230, 140, 1)' }}
            >
              INQUIRY
            </Button>
          </Link>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-1.5 rounded-lg hover:bg-accent transition-colors flex-shrink-0"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-white/30 shadow-lg">
          <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 py-4">
            <div className="space-y-3">
              {/* Home */}
              <Link
                to="/"
                className="block py-2 nav-link text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.home')}
              </Link>
              
              {/* About Us */}
              <Link
                to="/about"
                className="block py-2 nav-link text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.about')}
              </Link>
              
              {/* Fish Collagen */}
              <Link
                to="/fish-collagen-peptide"
                className="block py-2 nav-link text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.fishCollagen')}
              </Link>
              
              {/* Fish Gelatin */}
              <Link
                to="/fish-gelatin"
                className="block py-2 nav-link text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.fishGelatin')}
              </Link>

              {/* Applications Mobile Dropdown */}
              <div className="pt-2">
                <button
                  onClick={() => setIsMobileApplicationsOpen(!isMobileApplicationsOpen)}
                  className="flex items-center justify-between w-full py-2 nav-link text-sm"
                >
                  <span>{t('about.applications')}</span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isMobileApplicationsOpen ? 'rotate-180' : ''}`} />
                </button>
                {isMobileApplicationsOpen && (
                   <div className="pl-4 space-y-2 pt-2">
                     <Link 
                       to="/fish-collagen-applications"
                       className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                       onClick={() => setIsMenuOpen(false)}
                     >
                       {t('nav.fishCollagen')}
                     </Link>
                     <Link 
                       to="/fish-gelatin-applications"
                       className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                       onClick={() => setIsMenuOpen(false)}
                     >
                       {t('nav.fishGelatin')}
                     </Link>
                   </div>
                 )}
              </div>
              
              {/* Mobile Language Switcher */}
              <div className="pt-4 border-t border-border">
                <button
                  onClick={() => setIsMobileLanguageOpen(!isMobileLanguageOpen)}
                  className="flex items-center justify-between w-full mb-3 py-2"
                >
                  <div className="flex items-center space-x-2">
                    <Globe className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs font-medium text-muted-foreground">Language</span>
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isMobileLanguageOpen ? 'rotate-180' : ''}`} />
                </button>
                {isMobileLanguageOpen && (
                  <div className="grid grid-cols-2 gap-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          changeLanguage(lang.code);
                          setIsMenuOpen(false);
                        }}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-left transition-colors ${
                          currentLanguage.code === lang.code ? 'bg-accent text-primary' : 'hover:bg-accent'
                        }`}
                      >
                        <span className="text-sm">{lang.flag}</span>
                        <span className="text-xs">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
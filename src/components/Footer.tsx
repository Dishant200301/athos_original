import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Linkedin, Instagram, Youtube, Facebook } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/hooks/use-toast';

const Footer = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [email, setEmail] = useState('');

  const isBusinessEmail = (emailStr: string): boolean => {
    const personalDomains = [
      'gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com',
      'aol.com', 'icloud.com', 'mail.com', 'zoho.com',
      'protonmail.com', 'proton.me', 'live.com', 'gmx.com',
      'yandex.com', 'mail.ru'
    ];
    const emailParts = emailStr.toLowerCase().trim().split('@');
    if (emailParts.length !== 2) return false;
    const domain = emailParts[1];
    return !personalDomains.includes(domain);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isBusinessEmail(email)) {
      toast({
        title: "Only business email addresses are accepted.",
        description: "Please do not use personal domains like Gmail, Yahoo, etc.",
        variant: "destructive",
      });
      return;
    }
    // Valid business email
    console.log('Subscribe:', email);
    toast({
      title: "Thank you for subscribing!",
      description: "You have successfully joined our mailing list.",
    });
    setEmail('');
  };

  const usefulLinks = [
    { name: t('footer.downloadBrochure'), href: '#' },
    { name: t('footer.blogs'), href: '/blog' },
    { name: t('footer.contact'), href: '/contact' }
  ];

  const qualityProducts = [
    { name: t('footer.productsList.peptide'), href: '/fish-collagen-peptide' },
    { name: t('footer.productsList.granules'), href: '/fish-collagen-peptide' }, // Linking to main page for now
    { name: t('footer.productsList.highBulkDensity'), href: '/fish-collagen-peptide' }, // Linking to main page for now
    { name: t('footer.productsList.gelatin'), href: '/fish-gelatin' }
  ];

  const applications = [
    { name: t('footer.applicationsList.nutraceutical'), href: '/category/nutraceuticals' },
    { name: t('footer.applicationsList.foodBeverages'), href: '/category/food-beverages' },
    { name: t('footer.applicationsList.pharmaceutical'), href: '/category/pharmaceuticals' },
    { name: t('footer.applicationsList.cosmeceutical'), href: '/category/cosmetics' },
    { name: t('footer.applicationsList.petFoods'), href: '/category/pet-food' },
    { name: t('footer.applicationsList.biomedical'), href: '/category/biotechnology' }
  ];

  return (
    <>
      {/* Wave Animation */}
      <div className="ondebox">
        <svg className="onde" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
             viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
          <defs>
            <path id="onda" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352Z" />
          </defs>
          <g className="parallaxonde">
            <use xlinkHref="#onda" x="48" y="8" fill="rgba(27, 125, 161,0.05)" />
            <use xlinkHref="#onda" x="48" y="3" fill="rgb(27, 125, 161,0.3)" />
            <use xlinkHref="#onda" x="48" y="5" fill="rgb(27, 125, 161,0.4)" />
            <use xlinkHref="#onda" x="48" y="7" fill="rgb(27, 125, 161)" />
          </g>
        </svg>
      </div>
      
      <footer style={{
        backgroundColor: 'rgb(27, 125, 161)',
        position: 'relative'
      }}>
        {/* Bubbles Animation */}
        <div className="bubbles">
          <div className="bubble bubble1"></div>
          <div className="bubble bubble2"></div>
          <div className="bubble bubble3"></div>
          <div className="bubble bubble4"></div>
          <div className="bubble bubble5"></div>
          <div className="bubble bubble6"></div>
          <div className="bubble bubble7"></div>
          <div className="bubble bubble8"></div>
          <div className="bubble bubble9"></div>
          <div className="bubble bubble10"></div>
          <div className="bubble bubble11"></div>
          <div className="bubble bubble12"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 pt-8 pb-8" style={{position: 'relative', zIndex: 10}}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 w-full">
            
            {/* Column 1: Useful Links */}
            <div className="text-left">
              <h4 className="text-white font-bold text-lg mb-4">{t('footer.usefulLinks')}</h4>
              <ul className="space-y-2 mb-6">
                {usefulLinks.map((link, index) => (
                  <li key={index}>
                    <Link 
                      to={link.href} 
                      className="text-white hover:text-[rgba(106,191,0,1)] transition-colors text-base"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Join our Mail list */}
              <div>
                <h4 className="text-white text-base mb-2">{t('footer.joinMailList')}</h4>
                <div className="flex justify-start">
                  <form onSubmit={handleSubscribe} className="rounded-sm flex overflow-hidden w-full max-w-xs bg-white border border-white">
                    <Input
                      type="email"
                      placeholder={t('footer.emailPlaceholder')}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 border-0 focus:ring-0 text-sm px-3 py-2 text-gray-700 h-10 rounded-none"
                      required
                    />
                    <Button 
                      type="submit" 
                      className="px-3 py-2 rounded-none h-10" 
                      style={{backgroundColor: 'rgb(27, 125, 161)'}} 
                    >
                      <Send className="h-4 w-4 text-white" />
                    </Button>
                  </form>
                </div>
              </div>
            </div>

            {/* Column 2: Quality Products */}
            <div className="text-left">
              <h4 className="text-white font-bold text-lg mb-4">{t('footer.qualityProducts')}</h4>
              <ul className="space-y-2">
                {qualityProducts.map((product, index) => (
                  <li key={index}>
                    <Link 
                      to={product.href} 
                      className="text-white hover:text-[rgba(106,191,0,1)] transition-colors text-base whitespace-pre-line"
                    >
                      {product.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Get In Touch */}
            <div className="text-left">
              <h4 className="text-white font-bold text-lg mb-4">Get In Touch</h4>
              <a 
                href="mailto:info@athoscollagen.com" 
                className="text-white hover:text-[rgba(106,191,0,1)] transition-colors text-base underline underline-offset-4"
              >
                info@athoscollagen.com
              </a>
              
              <div className="mt-8">
                <h4 className="text-white font-bold text-lg mb-4">Follow us</h4>
                <div className="flex items-center space-x-6">
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[rgba(106,191,0,1)] transition-colors">
                    <Linkedin className="h-8 w-8 stroke-[1.5]" />
                  </a>
                  <a href="https://instagram.com/athoscollagen" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[rgba(106,191,0,1)] transition-colors">
                    <Instagram className="h-8 w-8 stroke-[1.5]" />
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[rgba(106,191,0,1)] transition-colors">
                    <Youtube className="h-8 w-8 stroke-[1.5]" />
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[rgba(106,191,0,1)] transition-colors">
                    <Facebook className="h-8 w-8 stroke-[1.5]" />
                  </a>
                </div>
              </div>
            </div>

          </div>
          
          {/* Copyright */}
          <div className="mt-12 text-center">
            <p className="text-white text-sm opacity-80">
              © 2026 Athos Collagen Pvt. Ltd. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      
      <style>{`
        .ondebox {
          position: relative;
          width: 100%;
          overflow: hidden;
          line-height: 0;
        }
        
        .onde {
          position: relative;
          width: 100%;
          height: 15vh;
          margin-bottom: -7px;
          min-height: 100px;
          max-height: 150px;
        }
        
        @media (max-width: 768px) {
          .onde {
            height: 40px;
            min-height: 40px;
          }
        }
        
        .parallaxonde > use {
          animation: move-forever 15s cubic-bezier(.55,.5,.45,.5) infinite;
        }
        
        .parallaxonde > use:nth-child(1) {
          animation-delay: -2s;
          animation-duration: 4s;
          animation: move-left 4s linear infinite;
        }
        
        .parallaxonde > use:nth-child(2) {
          animation-delay: -3s;
          animation-duration: 6s;
          animation: move-right 6s linear infinite;
        }
        
        .parallaxonde > use:nth-child(3) {
          animation-delay: -4s;
          animation-duration: 8s;
          animation: move-left 8s linear infinite;
        }
        
        .parallaxonde > use:nth-child(4) {
          animation-delay: -5s;
          animation-duration: 12s;
          animation: move-right 12s linear infinite;
        }
        
        @keyframes move-forever {
          0% {
            transform: translate3d(-90px,0,0);
          }
          100% {
            transform: translate3d(85px,0,0);
          }
        }
        
        @keyframes move-left {
          0% {
            transform: translate3d(90px,0,0);
          }
          100% {
            transform: translate3d(-85px,0,0);
          }
        }
        
        @keyframes move-right {
          0% {
            transform: translate3d(-90px,0,0);
          }
          100% {
            transform: translate3d(85px,0,0);
          }
        }

        /* Bubbles Animation */
        .bubbles {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          z-index: 5;
          pointer-events: none;
        }

        .bubble {
          position: absolute;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          animation: bubble-rise 4s infinite ease-in-out;
        }

        .bubble1 {
          width: 4px;
          height: 4px;
          left: 8%;
          animation-delay: 0s;
          animation-duration: 2.8s;
        }

        .bubble2 {
          width: 15px;
          height: 15px;
          left: 18%;
          animation-delay: 0.3s;
          animation-duration: 4.2s;
        }

        .bubble3 {
          width: 7px;
          height: 7px;
          left: 28%;
          animation-delay: 0.8s;
          animation-duration: 3.1s;
        }

        .bubble4 {
          width: 12px;
          height: 12px;
          left: 42%;
          animation-delay: 1.2s;
          animation-duration: 4.7s;
        }

        .bubble5 {
          width: 5px;
          height: 5px;
          left: 55%;
          animation-delay: 1.8s;
          animation-duration: 2.9s;
        }

        .bubble6 {
          width: 9px;
          height: 9px;
          left: 68%;
          animation-delay: 2.1s;
          animation-duration: 3.6s;
        }

        .bubble7 {
          width: 6px;
          height: 6px;
          left: 78%;
          animation-delay: 2.7s;
          animation-duration: 3.4s;
        }

        .bubble8 {
          width: 13px;
          height: 13px;
          left: 88%;
          animation-delay: 3.2s;
          animation-duration: 4.9s;
        }

        .bubble9 {
          width: 3px;
          height: 3px;
          left: 15%;
          animation-delay: 0.6s;
          animation-duration: 2.5s;
        }

        .bubble10 {
          width: 18px;
          height: 18px;
          left: 35%;
          animation-delay: 1.5s;
          animation-duration: 5.2s;
        }

        .bubble11 {
          width: 8px;
          height: 8px;
          left: 62%;
          animation-delay: 2.3s;
          animation-duration: 3.8s;
        }

        .bubble12 {
          width: 11px;
          height: 11px;
          left: 82%;
          animation-delay: 3.8s;
          animation-duration: 4.1s;
        }

        @keyframes bubble-rise {
          0% {
            bottom: 0;
            opacity: 0;
            transform: translateX(0) scale(0.5);
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            bottom: 100%;
            opacity: 0;
            transform: translateX(20px) scale(1.2);
          }
        }
      `}</style>

    </>
  );
};

export default Footer;
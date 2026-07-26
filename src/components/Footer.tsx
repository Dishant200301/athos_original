import React from "react";
import { Mail, Linkedin, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const usefulLinks = [
  { label: "Home", href: "/", key: "nav.home" },
  { label: "About Us", href: "/about", key: "nav.about" },
  { label: "Products", href: "/products/enzymes", key: "nav.products" },
  { label: "Contact Us", href: "/contact", key: "nav.contact" },
];

const Footer = () => {
  const { t } = useTranslation();

  return (
    <div className="relative">
      {/* Animated Wave Separator */}
      <div className="ondebox">
        <svg className="onde" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
          <defs>
            <path id="onda" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352Z" />
          </defs>
          <g className="parallaxonde">
            <use xlinkHref="#onda" x="48" y="8" fill="rgba(29, 122, 163, 0.05)" />
            <use xlinkHref="#onda" x="48" y="3" fill="rgba(29, 122, 163, 0.3)" />
            <use xlinkHref="#onda" x="48" y="5" fill="rgba(29, 122, 163, 0.4)" />
            <use xlinkHref="#onda" x="48" y="7" fill="#1D7AA3" />
          </g>
        </svg>
      </div>

      {/* Main Footer with Blue Background & Floating Dots/Bubbles */}
      <footer className="bg-[#1D7AA3] py-8 lg:py-4 relative overflow-hidden text-white">
        {/* Animated Floating Bubbles / Dots */}
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

        <div className="container mx-auto px-4 lg:px-10 xl:px-32 relative z-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 text-left">
            {/* Useful Links */}
            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <h3 className="text-lg font-medium text-white mb-6 font-inter tracking-wide">
                {t('footer.usefulLinks', { defaultValue: 'Useful Links' })}
              </h3>
              <ul className="space-y-4">
                {usefulLinks.map((link, index) => (
                  <li key={link.label} style={{ animationDelay: `${0.2 + index * 0.1}s` }} className="animate-fade-in">
                    <Link
                      to={link.href}
                      className="group flex items-center gap-2 text-white/90 hover:text-white transition-all duration-300"
                    >
                      <ChevronRight className="w-4 h-4 text-white/80 transition-transform duration-300 group-hover:translate-x-1 flex-shrink-0" />
                      <span className="relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-white after:origin-bottom-right after:transition-transform after:duration-300 group-hover:after:scale-x-100 group-hover:after:origin-bottom-left font-medium text-[15px]">
                        {t(link.key || `nav.${link.label.toLowerCase().replace(/\s+/g, '')}`, { defaultValue: link.label })}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Get In Touch */}
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-lg font-medium text-white mb-6 font-inter tracking-wide">
                {t('footer.getInTouch', { defaultValue: 'Get In Touch' })}
              </h3>

              <a
                href="mailto:inquiry@athoscollagen.com?subject=Inquiry from ATHOS Website&body=Hello ATHOS Team,%0D%0A%0D%0AI am interested in learning more about your collagen products.%0D%0A%0D%0APlease contact me at your earliest convenience.%0D%0A%0D%0AThank you!"
                className="group flex items-center gap-3 text-white/90 hover:text-white transition-all duration-300 mb-6"
              >
                <Mail className="w-5 h-5 text-white/80 transition-transform duration-300 group-hover:scale-110 flex-shrink-0" />
                <span className="relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-white after:origin-bottom-right after:transition-transform after:duration-300 group-hover:after:scale-x-100 group-hover:after:origin-bottom-left text-[15px]">
                  inquiry@athoscollagen.com
                </span>
              </a>

              <div>
                <p className="text-white/90 font-medium mb-4 text-[15px]">Follow Us:</p>
                <div className="flex items-center gap-4">
                  <a
                    href="https://www.linkedin.com/company/athoscollagen/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#0A66C2] hover:scale-110 group shadow-sm"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5 text-white transition-colors duration-300" />
                  </a>
                </div>
              </div>
            </div>

            {/* Addresses */}
            <div className="animate-fade-in sm:col-span-2 lg:col-span-1" style={{ animationDelay: '0.3s' }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8 sm:gap-12 lg:gap-8">
                <div>
                  <h3 className="text-lg font-medium text-white mb-3 font-inter tracking-wide">
                    Head Office
                  </h3>
                  <p className="text-white/90 leading-[27px] text-[15px]">
                    317, Blu Eminence, Opp. Sangini, Jahangirabad, Dahin Nagar, Surat, Gujarat 395005, India
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-white mb-3 font-inter tracking-wide">
                    Factory Address
                  </h3>
                  <p className="text-white/90 leading-[27px] text-[15px]">
                    Plot No. B-19, Gujarat Agro Infrastructure Mega Food Park, Village Shah & Vasravi,
                    Tal. Mangrol, Dist. Surat 394410, Gujarat, India
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Bottom Bar */}
      <section className="bg-[#1D7AA3] py-3.5">
        <div className="container mx-auto px-4 lg:px-10 xl:px-32 flex items-center justify-center">
          <p className="text-sm text-white/90 text-center font-medium">
            © {new Date().getFullYear()} Athos Collagen Pvt. Ltd. All rights reserved.
          </p>
        </div>
      </section>

      {/* Styles for Wave and Bubble Animations */}
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
        
        @media (min-width: 1024px) {
          .onde {
            height: 70px;
            min-height: 50px;
            max-height: 80px;
          }
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
    </div>
  );
};

export default Footer;
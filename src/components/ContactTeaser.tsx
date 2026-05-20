import React from 'react';
import { Mail, Youtube, Instagram } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ContactTeaser = () => {
  const { t } = useTranslation();
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-8">
            <div className="text-left w-full sm:w-auto">
              <h2 className="text-3xl md:text-4xl" style={{fontFamily: 'Inter', color: 'rgba(29, 129, 165, 1)', fontWeight: '500'}}>Connect with</h2>
              <p className="text-sm md:text-base mt-1" style={{fontFamily: 'Inter', color: 'rgba(112, 112, 112, 1)', fontWeight: '400'}}>Athos Collagen Pvt Ltd</p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 md:gap-16 lg:gap-24 w-full lg:w-auto">
              {/* Email */}
              <a 
                href="mailto:inquiry@athoscollagen.com?subject=Inquiry from ATHOS Website&body=Hello ATHOS Team,%0D%0A%0D%0AI am interested in learning more about your collagen products.%0D%0A%0D%0APlease contact me at your earliest convenience.%0D%0A%0D%0AThank you!" 
                className="contact-card flex items-center space-x-4 md:space-x-6 cursor-pointer group"
                onClick={(e) => {
                  // Fallback for environments where mailto doesn't work
                  if (!e.defaultPrevented) {
                    window.location.href = 'mailto:inquiry@athoscollagen.com?subject=Inquiry from ATHOS Website&body=Hello ATHOS Team,%0D%0A%0D%0AI am interested in learning more about your collagen products.%0D%0A%0D%0APlease contact me at your earliest convenience.%0D%0A%0D%0AThank you!';
                  }
                }}
              >
                <Mail className="contact-icon h-10 w-10 md:h-12 md:w-12 transition-colors duration-300 flex-shrink-0" style={{color: 'rgba(112, 112, 112, 1)', strokeWidth: 1}} />
                <span className="contact-text text-lg md:text-xl lg:text-2xl font-medium transition-colors duration-300" style={{color: 'rgba(112, 112, 112, 1)'}}>Email</span>
                <span className="contact-arrow text-2xl md:text-3xl transition-all duration-300" style={{color: 'rgba(112, 112, 112, 1)'}}>→</span>
              </a>

              {/* WhatsApp */}
              <a href="https://wa.me/918780321239" target="_blank" rel="noopener noreferrer" className="contact-card flex items-center space-x-4 md:space-x-6 cursor-pointer group">
                <svg className="contact-icon h-10 w-10 md:h-12 md:w-12 transition-colors duration-300 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{color: 'rgba(112, 112, 112, 1)'}}>
                  <path d="M17.5 14.5c-.3-.1-1.8-.9-2.1-1-.3-.1-.5-.1-.7.2-.2.3-.8 1-.9 1.2-.2.2-.4.2-.7.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4-.1-.5-.1-.1-.7-1.6-1-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.1-1.4-.1-.1-.3-.2-.6-.3z" />
                  <path d="M12 21.5c-1.7 0-3.3-.5-4.8-1.3l-4.4 1.2 1.2-4.3c-1-1.5-1.5-3.3-1.5-5.1 0-5.2 4.3-9.5 9.5-9.5s9.5 4.3 9.5 9.5-4.3 9.5-9.5 9.5z" />
                </svg>
                <span className="contact-text text-lg md:text-xl lg:text-2xl font-medium transition-colors duration-300" style={{color: 'rgba(112, 112, 112, 1)'}}>Whatsapp</span>
                <span className="contact-arrow text-2xl md:text-3xl transition-all duration-300" style={{color: 'rgba(112, 112, 112, 1)'}}>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactTeaser;
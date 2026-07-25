import React from 'react';
import { Mail, MessageCircle, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ContactTeaser = () => {
  const { t } = useTranslation();
  return (
    <section className="py-10 md:py-14 bg-white">
      <div className="max-w-[1290px] mx-auto px-4 xl:px-0 flex flex-col items-center justify-center text-center gap-6 md:gap-8">
        {/* Centered Heading */}
        <h2 className="text-2xl md:text-3xl lg:text-[32px] font-medium text-[#1D7AA3] text-center">
          {t('contact.title', { defaultValue: 'Contact Us' })}
        </h2>

        {/* Right Clickable Links */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-48">
          {/* Email Link */}
          <a
            href="mailto:inquiry@athoscollagen.com?subject=Inquiry from ATHOS Website&body=Hello ATHOS Team,%0D%0A%0D%0AI am interested in learning more about your collagen products.%0D%0A%0D%0APlease contact me at your earliest convenience.%0D%0A%0D%0AThank you!"
            className="group flex items-center gap-3 lg:gap-4 text-[#444444] hover:text-[#1D7AA3] transition-colors cursor-pointer"
          >
            <Mail className="w-6 h-6 lg:w-9 lg:h-9 stroke-[1.5] text-[#555555] group-hover:text-[#1D7AA3] transition-colors flex-shrink-0" />
            <span className="text-base md:text-lg lg:text-2xl font-medium">{t('contact.email', { defaultValue: 'Email' })}</span>
            <ArrowRight className="w-4 h-4 lg:w-6 lg:h-6 text-[#666666] group-hover:text-[#1D7AA3] group-hover:translate-x-2 transition-all duration-200 flex-shrink-0" />
          </a>

          {/* Whatsapp Link */}
          <a
            href="https://wa.me/918780321239"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 lg:gap-4 text-[#444444] hover:text-[#1D7AA3] transition-colors cursor-pointer"
          >
            <svg
              className="w-6 h-6 lg:w-9 lg:h-9 stroke-[1] text-[#555555] group-hover:text-[#1D7AA3] fill-current transition-colors flex-shrink-0"
              viewBox="0 0 448 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
            </svg>
            <span className="text-base md:text-lg lg:text-2xl font-medium">{t('contact.whatsapp', { defaultValue: 'Whatsapp' })}</span>
            <ArrowRight className="w-4 h-4 lg:w-6 lg:h-6 text-[#666666] group-hover:text-[#1D7AA3] group-hover:translate-x-2 transition-all duration-200 flex-shrink-0" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactTeaser;
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
          {t('contact.title', { defaultValue: 'Connect us' })}
        </h2>

        {/* Right Clickable Links */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-48">
          {/* Email Link */}
          <a
            href="mailto:inquiry@athoscollagen.com?subject=Inquiry from ATHOS Website&body=Hello ATHOS Team,%0D%0A%0D%0AI am interested in learning more about your collagen products.%0D%0A%0D%0APlease contact me at your earliest convenience.%0D%0A%0D%0AThank you!"
            className="group flex items-center gap-3 lg:gap-4 text-[#444444] hover:text-[#1D7AA3] transition-colors cursor-pointer"
          >
            <Mail className="w-6 h-6 lg:w-9 lg:h-9 stroke-[1] text-[#555555] group-hover:text-[#1D7AA3] transition-colors flex-shrink-0" />
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
            <MessageCircle className="w-6 h-6 lg:w-9 lg:h-9 stroke-[1] text-[#555555] group-hover:text-[#1D7AA3] transition-colors flex-shrink-0" />
            <span className="text-base md:text-lg lg:text-2xl font-medium">{t('contact.whatsapp', { defaultValue: 'Whatsapp' })}</span>
            <ArrowRight className="w-4 h-4 lg:w-6 lg:h-6 text-[#666666] group-hover:text-[#1D7AA3] group-hover:translate-x-2 transition-all duration-200 flex-shrink-0" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactTeaser;
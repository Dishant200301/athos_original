import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactTeaser from '@/components/ContactTeaser';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Factory, Building2 } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios'; // Import axios
import { API_BASE_URL } from '../lib/apiConfig'; // Import API_BASE_URL

const Contact = () => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    companyName: '',
    name: '',
    email: '',
    subject: '',
    product: '',
    message: ''
  });
  const [emailError, setEmailError] = useState('');

  const [heroRef, heroVisible] = useScrollAnimation(0.1);
  const [contactInfoRef, contactInfoVisible] = useScrollAnimation(0.1);
  const [contactFormRef, contactFormVisible] = useScrollAnimation(0.1);
  const [factoryInfoRef, factoryInfoVisible] = useScrollAnimation(0.1);
  const [mapRef, mapVisible] = useScrollAnimation(0.1);
  const [contactTeaserRef, contactTeaserVisible] = useScrollAnimation(0.1);

  const pageTitle = `${t('contact.title')} - Athos Collagen Pvt. Ltd`;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEmailChange = (val: string) => {
    handleInputChange('email', val);

    const personalDomains = [
      'gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com',
      'aol.com', 'icloud.com', 'mail.com', 'zoho.com',
      'protonmail.com', 'proton.me', 'live.com', 'gmx.com',
      'yandex.com', 'mail.ru'
    ];

    const trimmed = val.trim().toLowerCase();
    const parts = trimmed.split('@');
    if (parts.length === 2) {
      const domain = parts[1];
      if (personalDomains.includes(domain)) {
        setEmailError('Personal email domains (e.g. Gmail, Yahoo) are not allowed. Please use a business email.');
      } else {
        setEmailError('');
      }
    } else {
      setEmailError('');
    }
  };

  const handleEmailBlur = () => {
    const val = formData.email.trim().toLowerCase();
    if (!val) {
      setEmailError('');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    const personalDomains = [
      'gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com',
      'aol.com', 'icloud.com', 'mail.com', 'zoho.com',
      'protonmail.com', 'proton.me', 'live.com', 'gmx.com',
      'yandex.com', 'mail.ru'
    ];

    const parts = val.split('@');
    if (parts.length === 2) {
      const domain = parts[1];
      if (personalDomains.includes(domain)) {
        setEmailError('Personal email domains (e.g. Gmail, Yahoo) are not allowed. Please use a business email.');
        toast({
          title: "Business Email Required",
          description: "Please do not use personal domains like Gmail, Yahoo, etc.",
          variant: "destructive",
        });
      } else {
        setEmailError('');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Final check for business email
    const val = formData.email.trim().toLowerCase();
    const personalDomains = [
      'gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com',
      'aol.com', 'icloud.com', 'mail.com', 'zoho.com',
      'protonmail.com', 'proton.me', 'live.com', 'gmx.com',
      'yandex.com', 'mail.ru'
    ];
    const parts = val.split('@');
    if (parts.length === 2) {
      const domain = parts[1];
      if (personalDomains.includes(domain)) {
        setEmailError('Personal email domains (e.g. Gmail, Yahoo) are not allowed. Please use a business email.');
        toast({
          title: "Business Email Required",
          description: "Please do not use personal domains like Gmail, Yahoo, etc.",
          variant: "destructive",
        });
        return;
      }
    }

    if (emailError) {
      toast({
        title: "Invalid Input",
        description: "Please correct the email domain error before submitting.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/contact`, formData);
      console.log('Form submission successful:', response.data);
      alert('Your inquiry has been sent successfully!');
      // Optionally reset form
      setFormData({
        companyName: '',
        name: '',
        email: '',
        subject: '',
        product: '',
        message: ''
      });
      setEmailError('');
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Failed to send your inquiry. Please try again later.');
    }
  };

  const contactPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: pageTitle,
    description: 'Contact Athos Collagen Pvt. Ltd for business inquiries, sales, and partnerships.',
    mainEntity: {
      '@type': 'Organization',
      name: 'Athos Collagen Pvt. Ltd',
      email: 'info@athoscollagen.com',
    },
  };

  return (
    <div className="bg-background overflow-x-hidden w-full">
      <SEO title={pageTitle} schema={contactPageSchema} />
      <Navbar />
      <main className="pt-12 md:pt-20 bg-background mt-20">
        <div className="container mx-auto px-4 lg:px-10 xl:px-12">

          {/* Top Section - Contact Information & Address */}
          <div
            ref={contactInfoRef}
            className={`transition-all duration-700 ease-out ${contactInfoVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
              }`}
          >
            {/* Title */}
            <div className="text-center mb-12">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium" style={{ fontFamily: 'Inter', color: 'rgba(29, 129, 165, 1)' }}>
                {i18n.language.startsWith('en') ? "Get in touch for a better connection" : t('contact.hero.heading')}
              </h1>
            </div>

            {/* Row 1: WhatsApp/Call & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-10">
              {/* WhatsApp / Call Section */}
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="flex justify-center">
                  <svg className="h-14 w-14" style={{ color: 'rgba(106, 191, 0, 1)' }} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl mb-2 font-medium" style={{ fontFamily: 'Inter', color: 'rgba(51, 51, 51, 1)' }}>
                    {i18n.language.startsWith('en') ? 'WhatsApp / Call' : t('contact.hero.whatsappCall')}
                  </h3>
                  <a
                    href="https://wa.me/918780321239"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-medium hover:text-green-500 transition-colors duration-300 cursor-pointer"
                    style={{ fontFamily: 'Inter', color: 'rgba(119, 119, 119, 1)' }}
                  >
                    +91 87803 21239
                  </a>
                </div>
              </div>

              {/* Email Section */}
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="flex justify-center">
                  <Mail className="h-14 w-14" style={{ color: 'rgba(106, 191, 0, 1)' }} />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl mb-2 font-medium" style={{ fontFamily: 'Inter', color: 'rgba(51, 51, 51, 1)' }}>
                    {i18n.language.startsWith('en') ? 'Email' : t('contact.hero.email')}
                  </h3>
                  <a
                    href="mailto:inquiry@athoscollagen.com?subject=Inquiry from ATHOS Website&body=Hello ATHOS Team,%0D%0A%0D%0AI am interested in learning more about your collagen products.%0D%0A%0D%0APlease contact me at your earliest convenience.%0D%0A%0D%0AThank you!"
                    className="text-base font-medium hover:text-green-500 transition-colors duration-300 cursor-pointer"
                    style={{ fontFamily: 'Inter', color: 'rgba(119, 119, 119, 1)' }}
                  >
                    inquiry@athoscollagen.com
                  </a>
                </div>
              </div>
            </div>

            {/* Row 2: Addresses */}
            <div className="flex justify-center max-w-4xl mx-auto mb-16 md:mb-24">
              {/* Head Office Address */}
              {/* <div className="flex flex-col items-center text-center space-y-4 px-4">
                <div className="flex justify-center">
                  <Building2 className="h-14 w-14" style={{ color: 'rgba(106, 191, 0, 1)' }} />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl mb-2 font-medium" style={{ fontFamily: 'Inter', color: 'rgba(51, 51, 51, 1)' }}>
                    {i18n.language.startsWith('en') ? 'Head Office' : 'Head Office'}
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed max-w-sm mx-auto" style={{ fontFamily: 'Inter', color: 'rgba(119, 119, 119, 1)' }}>
                    317, Blu Eminence, Opp. Sangini, Jahangirabad, Dahin Nagar, Surat, Gujarat 395005, India
                  </p>
                </div>
              </div> */}

              {/* Factory Address */}
              <div className="flex flex-col items-center text-center space-y-4 px-4">
                <div className="flex justify-center">
                  <Factory className="h-14 w-14" style={{ color: 'rgba(106, 191, 0, 1)' }} />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl mb-2 font-medium" style={{ fontFamily: 'Inter', color: 'rgba(51, 51, 51, 1)' }}>
                    {i18n.language.startsWith('en') ? 'Factory Address' : t('contact.factory.title')}
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed max-w-sm mx-auto" style={{ fontFamily: 'Inter', color: 'rgba(119, 119, 119, 1)' }}>
                    {t('contact.factory.address.line1')} {t('contact.factory.address.line2')} {t('contact.factory.address.line3')}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Section - Form & Map Side-by-Side */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-10 items-stretch mb-16 lg:mb-28 xl:mb">

            {/* Left Side: Contact Form */}
            <div
              ref={contactFormRef}
              className={`bg-white transition-all duration-700 ease-out ${contactFormVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-12'
                }`}
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Company Name */}
                <div>
                  <Input
                    type="text"
                    placeholder={t('contact.form.companyName')}
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    className="w-full h-12 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                    style={{ fontFamily: 'Inter', color: 'rgba(153, 153, 153, 1)' }}
                  />
                </div>

                {/* Name and Email in single line */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Input
                      type="text"
                      placeholder={t('contact.form.name')}
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full h-12 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                      style={{ fontFamily: 'Inter', color: 'rgba(153, 153, 153, 1)' }}
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder={t('contact.form.email')}
                      value={formData.email}
                      onChange={(e) => handleEmailChange(e.target.value)}
                      onBlur={handleEmailBlur}
                      className={`w-full h-12 px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm ${emailError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                        }`}
                      style={{ fontFamily: 'Inter', color: 'rgba(153, 153, 153, 1)' }}
                    />
                    {emailError && (
                      <p className="text-red-500 text-xs mt-1 text-left" style={{ fontFamily: 'Inter' }}>
                        {emailError}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <Input
                    type="text"
                    placeholder={t('contact.form.subject')}
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className="w-full h-12 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                    style={{ fontFamily: 'Inter', color: 'rgba(153, 153, 153, 1)' }}
                  />
                </div>

                {/* Product Dropdown */}
                <div>
                  <Select value={formData.product} onValueChange={(value) => handleInputChange('product', value)}>
                    <SelectTrigger className="w-full h-12 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm" style={{ fontFamily: 'Inter', color: 'rgba(153, 153, 153, 1)' }}>
                      <SelectValue placeholder={t('contact.form.product')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fish-collagen" className="text-sm" style={{ fontFamily: 'Inter' }}>{t('contact.form.products.fishCollagen')}</SelectItem>
                      <SelectItem value="fish-gelatin" className="text-sm" style={{ fontFamily: 'Inter' }}>{t('contact.form.products.fishGelatin')}</SelectItem>
                      <SelectItem value="other" className="text-sm" style={{ fontFamily: 'Inter' }}>{t('contact.form.products.other')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Message */}
                <div>
                  <Textarea
                    placeholder={t('contact.form.message')}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="w-full h-32 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 resize-none text-sm"
                    style={{ fontFamily: 'Inter', color: 'rgba(153, 153, 153, 1)' }}
                  />
                </div>

                {/* Submit Button */}
                <div>
                  <Button
                    type="submit"
                    className="w-full h-12 text-white font-medium text-sm rounded-md transition-colors"
                    style={{ backgroundColor: 'rgba(106, 191, 0, 1)', fontFamily: 'Inter' }}
                    onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = 'rgba(89, 163, 0, 1)'}
                    onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = 'rgba(106, 191, 0, 1)'}
                  >
                    {t('contact.form.sendMessage')}
                  </Button>
                </div>
              </form>
            </div>

            {/* Right Side: Map */}
            <div
              ref={mapRef}
              className={`w-full min-h-[400px] lg:min-h-[450px] bg-gray-200 rounded-lg overflow-hidden transition-all duration-700 ease-out ${mapVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-12'
                }`}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.123456789!2d73.1310301!3d21.4328513!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04d4cecf1f011:0xeb9277b71e8bf6ef!2zMjHCsDI1JzU4LjMiTiA3M8KwMDcnNTcuMSJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Athos Collagen Pvt. Ltd. - B-19, Gujarat Agro Infrastructure Mega Food Park"
              ></iframe>
            </div>

          </div>

        </div>

        {/* Contact Teaser Section */}
        <div
          ref={contactTeaserRef}
          className={`transition-all duration-500 ease-out delay-200 ${contactTeaserVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
            }`}
        >
          <ContactTeaser />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
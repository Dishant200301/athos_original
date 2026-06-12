import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Linkedin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/hooks/use-toast';

const countryCodes = [
  { code: '+93', country: 'AF', label: '🇦🇫 Afghanistan (+93)' },
  { code: '+355', country: 'AL', label: '🇦🇱 Albania (+355)' },
  { code: '+213', country: 'DZ', label: '🇩🇿 Algeria (+213)' },
  { code: '+376', country: 'AD', label: '🇦🇩 Andorra (+376)' },
  { code: '+244', country: 'AO', label: '🇦🇴 Angola (+244)' },
  { code: '+1-268', country: 'AG', label: '🇦🇬 Antigua & Barbuda (+1-268)' },
  { code: '+54', country: 'AR', label: '🇦🇷 Argentina (+54)' },
  { code: '+374', country: 'AM', label: '🇦🇲 Armenia (+374)' },
  { code: '+61', country: 'AU', label: '🇦🇺 Australia (+61)' },
  { code: '+43', country: 'AT', label: '🇦🇹 Austria (+43)' },
  { code: '+994', country: 'AZ', label: '🇦🇿 Azerbaijan (+994)' },
  { code: '+1-242', country: 'BS', label: '🇧🇸 Bahamas (+1-242)' },
  { code: '+973', country: 'BH', label: '🇧🇭 Bahrain (+973)' },
  { code: '+880', country: 'BD', label: '🇧🇩 Bangladesh (+880)' },
  { code: '+1-246', country: 'BB', label: '🇧🇧 Barbados (+1-246)' },
  { code: '+375', country: 'BY', label: '🇧🇾 Belarus (+375)' },
  { code: '+32', country: 'BE', label: '🇧🇪 Belgium (+32)' },
  { code: '+501', country: 'BZ', label: '🇧🇿 Belize (+501)' },
  { code: '+229', country: 'BJ', label: '🇧🇯 Benin (+229)' },
  { code: '+975', country: 'BT', label: '🇧🇹 Bhutan (+975)' },
  { code: '+591', country: 'BO', label: '🇧🇴 Bolivia (+591)' },
  { code: '+387', country: 'BA', label: '🇧🇦 Bosnia & Herzegovina (+387)' },
  { code: '+267', country: 'BW', label: '🇧🇼 Botswana (+267)' },
  { code: '+55', country: 'BR', label: '🇧🇷 Brazil (+55)' },
  { code: '+673', country: 'BN', label: '🇧🇳 Brunei (+673)' },
  { code: '+359', country: 'BG', label: '🇧🇬 Bulgaria (+359)' },
  { code: '+226', country: 'BF', label: '🇧🇫 Burkina Faso (+226)' },
  { code: '+257', country: 'BI', label: '🇧🇮 Burundi (+257)' },
  { code: '+855', country: 'KH', label: '🇰🇭 Cambodia (+855)' },
  { code: '+237', country: 'CM', label: '🇨🇲 Cameroon (+237)' },
  { code: '+1', country: 'CA', label: '🇨🇦 Canada (+1)' },
  { code: '+238', country: 'CV', label: '🇨🇻 Cape Verde (+238)' },
  { code: '+236', country: 'CF', label: '🇨🇫 Central African Republic (+236)' },
  { code: '+235', country: 'TD', label: '🇹🇩 Chad (+235)' },
  { code: '+56', country: 'CL', label: '🇨🇱 Chile (+56)' },
  { code: '+86', country: 'CN', label: '🇨🇳 China (+86)' },
  { code: '+57', country: 'CO', label: '🇨🇴 Colombia (+57)' },
  { code: '+269', country: 'KM', label: '🇰🇲 Comoros (+269)' },
  { code: '+242', country: 'CG', label: '🇨🇬 Congo (+242)' },
  { code: '+243', country: 'CD', label: '🇨🇩 DR Congo (+243)' },
  { code: '+506', country: 'CR', label: '🇨🇷 Costa Rica (+506)' },
  { code: '+225', country: 'CI', label: '🇨🇮 Ivory Coast (+225)' },
  { code: '+385', country: 'HR', label: '🇭🇷 Croatia (+385)' },
  { code: '+53', country: 'CU', label: '🇨🇺 Cuba (+53)' },
  { code: '+357', country: 'CY', label: '🇨🇾 Cyprus (+357)' },
  { code: '+420', country: 'CZ', label: '🇨🇿 Czechia (+420)' },
  { code: '+45', country: 'DK', label: '🇩🇰 Denmark (+45)' },
  { code: '+253', country: 'DJ', label: '🇩🇯 Djibouti (+253)' },
  { code: '+1-767', country: 'DM', label: '🇩🇲 Dominica (+1-767)' },
  { code: '+1-809', country: 'DO', label: '🇩🇴 Dominican Republic (+1-809)' },
  { code: '+593', country: 'EC', label: '🇪🇨 Ecuador (+593)' },
  { code: '+20', country: 'EG', label: '🇪🇬 Egypt (+20)' },
  { code: '+503', country: 'SV', label: '🇸🇻 El Salvador (+503)' },
  { code: '+240', country: 'GQ', label: '🇬🇶 Equatorial Guinea (+240)' },
  { code: '+291', country: 'ER', label: '🇪🇷 Eritrea (+291)' },
  { code: '+372', country: 'EE', label: '🇪🇪 Estonia (+372)' },
  { code: '+268', country: 'SZ', label: '🇸🇿 Eswatini (+268)' },
  { code: '+251', country: 'ET', label: '🇪🇹 Ethiopia (+251)' },
  { code: '+679', country: 'FJ', label: '🇫🇯 Fiji (+679)' },
  { code: '+358', country: 'FI', label: '🇫🇮 Finland (+358)' },
  { code: '+33', country: 'FR', label: '🇫🇷 France (+33)' },
  { code: '+241', country: 'GA', label: '🇬🇦 Gabon (+241)' },
  { code: '+220', country: 'GM', label: '🇬🇲 Gambia (+220)' },
  { code: '+995', country: 'GE', label: '🇬🇪 Georgia (+995)' },
  { code: '+49', country: 'DE', label: '🇩🇪 Germany (+49)' },
  { code: '+233', country: 'GH', label: '🇬🇭 Ghana (+233)' },
  { code: '+30', country: 'GR', label: '🇬🇷 Greece (+30)' },
  { code: '+1-473', country: 'GD', label: '🇬🇩 Grenada (+1-473)' },
  { code: '+502', country: 'GT', label: '🇬🇹 Guatemala (+502)' },
  { code: '+224', country: 'GN', label: '🇬🇳 Guinea (+224)' },
  { code: '+245', country: 'GW', label: '🇬🇼 Guinea-Bissau (+245)' },
  { code: '+592', country: 'GY', label: '🇬🇾 Guyana (+592)' },
  { code: '+509', country: 'HT', label: '🇭🇹 Haiti (+509)' },
  { code: '+504', country: 'HN', label: 'HN Honduras (+504)' },
  { code: '+852', country: 'HK', label: '🇭🇰 Hong Kong (+852)' },
  { code: '+36', country: 'HU', label: '🇭🇺 Hungary (+36)' },
  { code: '+354', country: 'IS', label: '🇮🇸 Iceland (+354)' },
  { code: '+91', country: 'IN', label: '🇮🇳 India (+91)' },
  { code: '+62', country: 'ID', label: '🇮🇩 Indonesia (+62)' },
  { code: '+98', country: 'IR', label: '🇮🇷 Iran (+98)' },
  { code: '+964', country: 'IQ', label: '🇮🇶 Iraq (+964)' },
  { code: '+353', country: 'IE', label: '🇮🇪 Ireland (+353)' },
  { code: '+972', country: 'IL', label: '🇮🇱 Israel (+972)' },
  { code: '+39', country: 'IT', label: '🇮🇹 Italy (+39)' },
  { code: '+1-876', country: 'JM', label: '🇯🇲 Jamaica (+1-876)' },
  { code: '+81', country: 'JP', label: '🇯🇵 Japan (+81)' },
  { code: '+962', country: 'JO', label: '🇯🇴 Jordan (+962)' },
  { code: '+7', country: 'KZ', label: '🇰🇿 Kazakhstan (+7)' },
  { code: '+254', country: 'KE', label: '🇰🇪 Kenya (+254)' },
  { code: '+686', country: 'KI', label: '🇰🇮 Kiribati (+686)' },
  { code: '+850', country: 'KP', label: '🇰🇵 North Korea (+850)' },
  { code: '+82', country: 'KR', label: '🇰🇷 South Korea (+82)' },
  { code: '+965', country: 'KW', label: '🇰🇼 Kuwait (+965)' },
  { code: '+996', country: 'KG', label: '🇰🇬 Kyrgyzstan (+996)' },
  { code: '+856', country: 'LA', label: '🇱🇦 Laos (+856)' },
  { code: '+371', country: 'LV', label: '🇱🇻 Latvia (+371)' },
  { code: '+961', country: 'LB', label: '🇱🇧 Lebanon (+961)' },
  { code: '+266', country: 'LS', label: '🇱🇸 Lesotho (+266)' },
  { code: '+231', country: 'LR', label: '🇱🇷 Liberia (+231)' },
  { code: '+218', country: 'LY', label: '🇱🇾 Libya (+218)' },
  { code: '+423', country: 'LI', label: '🇱🇮 Liechtenstein (+423)' },
  { code: '+370', country: 'LT', label: '🇱🇹 Lithuania (+370)' },
  { code: '+352', country: 'LU', label: '🇱🇺 Luxembourg (+352)' },
  { code: '+853', country: 'MO', label: '🇲🇴 Macau (+853)' },
  { code: '+389', country: 'MK', label: '🇲🇰 North Macedonia (+389)' },
  { code: '+261', country: 'MG', label: '🇲🇬 Madagascar (+261)' },
  { code: '+265', country: 'MW', label: '🇲🇼 Malawi (+265)' },
  { code: '+60', country: 'MY', label: '🇲🇾 Malaysia (+60)' },
  { code: '+960', country: 'MV', label: '🇲🇻 Maldives (+960)' },
  { code: '+223', country: 'ML', label: '🇲🇱 Mali (+223)' },
  { code: '+356', country: 'MT', label: '🇲🇹 Malta (+356)' },
  { code: '+692', country: 'MH', label: '🇲🇭 Marshall Islands (+692)' },
  { code: '+222', country: 'MR', label: '🇲🇷 Mauritania (+222)' },
  { code: '+230', country: 'MU', label: '🇲🇺 Mauritius (+230)' },
  { code: '+52', country: 'MX', label: '🇲🇽 Mexico (+52)' },
  { code: '+691', country: 'FM', label: '🇫🇲 Micronesia (+691)' },
  { code: '+373', country: 'MD', label: '🇲🇩 Moldova (+373)' },
  { code: '+377', country: 'MC', label: '🇲🇨 Monaco (+377)' },
  { code: '+976', country: 'MN', label: '🇲🇳 Mongolia (+976)' },
  { code: '+382', country: 'ME', label: '🇲🇪 Montenegro (+382)' },
  { code: '+212', country: 'MA', label: '🇲🇦 Morocco (+212)' },
  { code: '+258', country: 'MZ', label: '🇲🇿 Mozambique (+258)' },
  { code: '+95', country: 'MM', label: '🇲🇲 Myanmar (+95)' },
  { code: '+264', country: 'NA', label: '🇳🇦 Namibia (+264)' },
  { code: '+674', country: 'NR', label: '🇳🇷 Nauru (+674)' },
  { code: '+977', country: 'NP', label: '🇳🇵 Nepal (+977)' },
  { code: '+31', country: 'NL', label: '🇳🇱 Netherlands (+31)' },
  { code: '+64', country: 'NZ', label: '🇳🇿 New Zealand (+64)' },
  { code: '+505', country: 'NI', label: '🇳🇮 Nicaragua (+505)' },
  { code: '+227', country: 'NE', label: '🇳🇪 Niger (+227)' },
  { code: '+234', country: 'NG', label: '🇳🇬 Nigeria (+234)' },
  { code: '+47', country: 'NO', label: '🇳🇴 Norway (+47)' },
  { code: '+968', country: 'OM', label: '🇴🇲 Oman (+968)' },
  { code: '+92', country: 'PK', label: '🇵🇰 Pakistan (+92)' },
  { code: '+680', country: 'PW', label: '🇵🇼 Palau (+680)' },
  { code: '+970', country: 'PS', label: '🇵🇸 Palestine (+970)' },
  { code: '+507', country: 'PA', label: '🇵🇦 Panama (+507)' },
  { code: '+675', country: 'PG', label: '🇵🇬 Papua New Guinea (+675)' },
  { code: '+595', country: 'PY', label: '🇵🇾 Paraguay (+595)' },
  { code: '+51', country: 'PE', label: '🇵🇪 Peru (+51)' },
  { code: '+63', country: 'PH', label: '🇵🇭 Philippines (+63)' },
  { code: '+48', country: 'PL', label: '🇵🇱 Poland (+48)' },
  { code: '+351', country: 'PT', label: '🇵🇹 Portugal (+351)' },
  { code: '+974', country: 'QA', label: '🇶🇦 Qatar (+974)' },
  { code: '+40', country: 'RO', label: '🇷🇴 Romania (+40)' },
  { code: '+7', country: 'RU', label: '🇷🇺 Russia (+7)' },
  { code: '+250', country: 'RW', label: '🇷🇼 Rwanda (+250)' },
  { code: '+1-758', country: 'LC', label: '🇱🇨 St. Lucia (+1-758)' },
  { code: '+1-784', country: 'VC', label: '🇻🇨 St. Vincent (+1-784)' },
  { code: '+685', country: 'WS', label: '🇼🇸 Samoa (+685)' },
  { code: '+378', country: 'SM', label: '🇸🇲 San Marino (+378)' },
  { code: '+239', country: 'ST', label: '🇸🇹 Sao Tome (+239)' },
  { code: '+966', country: 'SA', label: '🇸🇦 Saudi Arabia (+966)' },
  { code: '+221', country: 'SN', label: '🇸🇳 Senegal (+221)' },
  { code: '+381', country: 'RS', label: '🇷🇸 Serbia (+381)' },
  { code: '+248', country: 'SC', label: '🇸🇨 Seychelles (+248)' },
  { code: '+232', country: 'SL', label: '🇸🇱 Sierra Leone (+232)' },
  { code: '+65', country: 'SG', label: '🇸🇬 Singapore (+65)' },
  { code: '+421', country: 'SK', label: '🇸🇰 Slovakia (+421)' },
  { code: '+386', country: 'SI', label: '🇸🇮 Slovenia (+386)' },
  { code: '+677', country: 'SB', label: '🇸🇧 Solomon Islands (+677)' },
  { code: '+252', country: 'SO', label: '🇸🇴 Somalia (+252)' },
  { code: '+27', country: 'ZA', label: '🇿🇦 South Africa (+27)' },
  { code: '+34', country: 'ES', label: '🇪🇸 Spain (+34)' },
  { code: '+94', country: 'LK', label: '🇱🇰 Sri Lanka (+94)' },
  { code: '+249', country: 'SD', label: '🇸🇩 Sudan (+249)' },
  { code: '+597', country: 'SR', label: '🇸🇷 Suriname (+597)' },
  { code: '+46', country: 'SE', label: '🇸🇪 Sweden (+46)' },
  { code: '+41', country: 'CH', label: '🇨🇭 Switzerland (+41)' },
  { code: '+963', country: 'SY', label: '🇸🇾 Syria (+963)' },
  { code: '+886', country: 'TW', label: '🇹🇼 Taiwan (+886)' },
  { code: '+992', country: 'TJ', label: '🇹🇯 Tajikistan (+992)' },
  { code: '+255', country: 'TZ', label: '🇹🇿 Tanzania (+255)' },
  { code: '+66', country: 'TH', label: '🇹🇭 Thailand (+66)' },
  { code: '+228', country: 'TG', label: '🇹🇬 Togo (+228)' },
  { code: '+676', country: 'TO', label: '🇹🇴 Tonga (+676)' },
  { code: '+1-868', country: 'TT', label: '🇹🇹 Trinidad & Tobago (+1-868)' },
  { code: '+216', country: 'TN', label: '🇹🇳 Tunisia (+216)' },
  { code: '+90', country: 'TR', label: '🇹🇷 Turkey (+90)' },
  { code: '+993', country: 'TM', label: '🇹🇲 Turkmenistan (+993)' },
  { code: '+256', country: 'UG', label: '🇺🇬 Uganda (+256)' },
  { code: '+380', country: 'UA', label: '🇺🇦 Ukraine (+380)' },
  { code: '+971', country: 'AE', label: '🇦🇪 UAE (+971)' },
  { code: '+44', country: 'GB', label: '🇬🇧 UK (+44)' },
  { code: '+1', country: 'US', label: '🇺🇸 USA (+1)' },
  { code: '+598', country: 'UY', label: '🇺🇾 Uruguay (+598)' },
  { code: '+998', country: 'UZ', label: '🇺🇿 Uzbekistan (+998)' },
  { code: '+678', country: 'VU', label: '🇻🇺 Vanuatu (+678)' },
  { code: '+58', country: 'VE', label: '🇻🇪 Venezuela (+58)' },
  { code: '+84', country: 'VN', label: '🇻🇳 Vietnam (+84)' },
  { code: '+967', country: 'YE', label: '🇾🇪 Yemen (+967)' },
  { code: '+260', country: 'ZM', label: '🇿🇲 Zambia (+260)' },
  { code: '+263', country: 'ZW', label: '🇿🇼 Zimbabwe (+263)' }
];

const Footer = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [selectedCountryCode, setSelectedCountryCode] = useState('+91');
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);
  const [brochureEmail, setBrochureEmail] = useState('');
  const [brochureMobile, setBrochureMobile] = useState('');
  const [emailError, setEmailError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [countrySearchQuery, setCountrySearchQuery] = useState('');

  const selectedCountry = countryCodes.find(c => c.code === selectedCountryCode) || countryCodes[0];

  const filteredCountryCodes = countryCodes.filter(c => 
    c.label.toLowerCase().includes(countrySearchQuery.toLowerCase()) ||
    c.code.includes(countrySearchQuery) ||
    c.country.toLowerCase().includes(countrySearchQuery.toLowerCase())
  );

  const isValidMobile = (localPhone: string): boolean => {
    const cleaned = localPhone.replace(/[\s\-()]/g, '');
    
    // 1. Must be only digits
    if (!/^[0-9]+$/.test(cleaned)) return false;
    
    // 2. Mobile number length check (typically 8 to 11 digits without country code)
    if (cleaned.length < 8 || cleaned.length > 11) return false;
    
    // 3. Mobile numbers should not start with 0 or 1 in almost all major countries
    if (cleaned.startsWith('0') || cleaned.startsWith('1')) return false;
    
    // 4. Block repetitive patterns (e.g., 99999999, 12121212, 123123123)
    const isPattern = (str: string): boolean => {
      if (/^(.)\1+$/.test(str)) return true;
      if (str.length >= 6 && /^(.{2})\1+$/.test(str)) return true;
      if (str.length >= 9 && /^(.{3})\1+$/.test(str)) return true;
      return false;
    };
    if (isPattern(cleaned)) return false;
    
    // 5. Block sequential numbers (e.g., 12345678, 87654321)
    const isSequential = (str: string): boolean => {
      let isIncreasing = true;
      let isDecreasing = true;
      for (let i = 1; i < str.length; i++) {
        const prev = parseInt(str[i-1]);
        const curr = parseInt(str[i]);
        if (curr !== prev + 1) isIncreasing = false;
        if (curr !== prev - 1) isDecreasing = false;
      }
      return isIncreasing || isDecreasing;
    };
    if (isSequential(cleaned)) return false;
    
    return true;
  };

  const downloadBrochurePDF = () => {
    const link = document.createElement('a');
    link.href = '/images/Athos_new.pdf';
    link.download = 'Athos_Collagen_Brochure.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleBrochureDownloadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');
    setMobileError('');

    let isValid = true;

    // Validate email
    const trimmedEmail = brochureEmail.trim();
    if (!trimmedEmail) {
      setEmailError('Company email is required.');
      isValid = false;
    } else if (!isBusinessEmail(trimmedEmail)) {
      setEmailError('Personal email domains (e.g. Gmail, Yahoo) are not allowed.');
      isValid = false;
    }

    // Validate mobile
    const trimmedMobile = brochureMobile.trim();
    if (!trimmedMobile) {
      setMobileError('Mobile number is required.');
      isValid = false;
    } else if (!isValidMobile(trimmedMobile)) {
      setMobileError('Please enter a valid mobile number.');
      isValid = false;
    }

    if (!isValid) return;

    // Successful submit
    downloadBrochurePDF();

    toast({
      title: "Brochure download started!",
      description: "Thank you for your interest in Athos Collagen. The PDF is downloading.",
    });

    // Reset and close
    setBrochureEmail('');
    setBrochureMobile('');
    setSelectedCountryCode('+91');
    setIsBrochureModalOpen(false);
  };

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
    { name: t('footer.productsList.ficolla'), href: '/fish-collagen-peptide' },
    { name: t('footer.productsList.granules'), href: '/fish-collagen-peptide' },
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
                    {link.name === t('footer.downloadBrochure') ? (
                      <button
                        onClick={() => setIsBrochureModalOpen(true)}
                        className="text-white hover:text-[rgba(106,191,0,1)] transition-colors text-base text-left bg-transparent border-0 p-0 cursor-pointer focus:outline-none"
                      >
                        {link.name}
                      </button>
                    ) : (
                      <Link 
                        to={link.href} 
                        className="text-white hover:text-[rgba(106,191,0,1)] transition-colors text-base"
                      >
                        {link.name}
                      </Link>
                    )}
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
                href="mailto:inquiry@athoscollagen.com" 
                className="text-white hover:text-[rgba(106,191,0,1)] transition-colors text-base underline underline-offset-4"
              >
                inquiry@athoscollagen.com
              </a>
              
              <div className="mt-8">
                <h4 className="text-white font-bold text-lg mb-4">Follow us</h4>
                <div className="flex items-center space-x-6">
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[rgba(106,191,0,1)] transition-colors">
                    <Linkedin className="h-8 w-8 stroke-[1.5]" />
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

      {isBrochureModalOpen && createPortal(
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[999] flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-5 sm:p-8 border border-gray-100 relative animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 flex flex-col text-left">
            {/* Close Button */}
            <button
              onClick={() => {
                setIsBrochureModalOpen(false);
                setEmailError('');
                setMobileError('');
                setBrochureEmail('');
                setBrochureMobile('');
              }}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 focus:outline-none"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="mb-6">
              <h3 className="text-2xl font-bold font-inter text-[#1b7db5] mb-2">
                Download Brochure
              </h3>
              <p className="text-sm text-gray-500 font-inter">
                Please enter your corporate contact details to download the premium product brochure.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleBrochureDownloadSubmit} className="space-y-5">
              {/* Company Email Field */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2 font-inter">
                  Company Email Address *
                </label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={brochureEmail}
                  onChange={(e) => {
                    setBrochureEmail(e.target.value);
                    if (emailError) setEmailError('');
                  }}
                  className={`w-full border ${
                    emailError ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-[#1b7db5] focus:ring-[#1b7db5]'
                  } rounded-xl px-4 py-3 focus:outline-none focus:ring-1 font-inter text-gray-800 text-sm`}
                  required
                />
                {emailError ? (
                  <p className="text-xs text-red-500 mt-1.5 font-medium">{emailError}</p>
                ) : (
                  <p className="text-[11px] text-gray-400 mt-1 font-inter leading-relaxed">
                    Personal emails (e.g. Gmail, Yahoo, Outlook) are not accepted.
                  </p>
                )}
              </div>

              {/* Mobile Number Field */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2 font-inter">
                  Mobile Number *
                </label>
                <div className="flex gap-2 relative">
                  {/* Custom Searchable Country Select Dropdown */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                      className="border border-gray-200 rounded-xl px-3 py-3 focus:outline-none focus:ring-1 focus:ring-[#1b7db5] font-inter text-gray-800 text-sm bg-white cursor-pointer w-[96px] sm:w-[130px] flex-shrink-0 flex items-center justify-between select-none h-full"
                    >
                      <span className="truncate">{selectedCountry.label.split(' ')[0]} {selectedCountry.code}</span>
                      <svg className={`w-4 h-4 text-gray-400 flex-shrink-0 ml-1 transition-transform duration-200 ${isCountryDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {isCountryDropdownOpen && (
                      <>
                        {/* Transparent backdrop overlay to dismiss dropdown on click-away */}
                        <div 
                          className="fixed inset-0 z-40 bg-transparent" 
                          onClick={() => {
                            setIsCountryDropdownOpen(false);
                            setCountrySearchQuery('');
                          }}
                        />
                        
                        {/* Searchable Options Panel */}
                        <div className="absolute top-full left-0 mt-1.5 w-[240px] sm:w-[280px] bg-white border border-gray-100 rounded-2xl shadow-2xl z-50 p-3 flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
                          {/* Search box */}
                          <div className="relative flex items-center">
                            <svg className="w-4 h-4 text-gray-400 absolute left-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                              type="text"
                              placeholder="Search country or code..."
                              value={countrySearchQuery}
                              onChange={(e) => setCountrySearchQuery(e.target.value)}
                              className="w-full pl-9 pr-3 py-2 border border-gray-100 rounded-xl text-xs font-inter focus:outline-none focus:border-[#1b7db5] focus:ring-1 focus:ring-[#1b7db5]"
                              autoFocus
                            />
                          </div>

                          {/* Options List */}
                          <div className="max-h-[180px] overflow-y-auto flex flex-col gap-0.5 scrollbar-thin">
                            {filteredCountryCodes.length > 0 ? (
                              filteredCountryCodes.map((c) => (
                                <button
                                  key={`${c.country}-${c.code}`}
                                  type="button"
                                  onClick={() => {
                                    setSelectedCountryCode(c.code);
                                    setIsCountryDropdownOpen(false);
                                    setCountrySearchQuery('');
                                  }}
                                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-inter flex items-center justify-between transition-colors ${
                                    selectedCountryCode === c.code 
                                      ? 'bg-[#1b7db5]/10 text-[#1b7db5] font-semibold' 
                                      : 'hover:bg-slate-50 text-gray-700'
                                  }`}
                                >
                                  <span className="truncate">{c.label}</span>
                                  <span className="text-gray-400 font-normal text-[10px] ml-2">{c.country}</span>
                                </button>
                              ))
                            ) : (
                              <p className="text-xs text-gray-400 text-center py-4 font-inter">No countries found</p>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <input
                    type="tel"
                    placeholder="98765 43210"
                    value={brochureMobile}
                    onChange={(e) => {
                      setBrochureMobile(e.target.value.replace(/[^0-9\s\-()]/g, ''));
                      if (mobileError) setMobileError('');
                    }}
                    className={`flex-1 min-w-0 border ${
                      mobileError ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-[#1b7db5] focus:ring-[#1b7db5]'
                    } rounded-xl px-4 py-3 focus:outline-none focus:ring-1 font-inter text-gray-800 text-sm`}
                    required
                  />
                </div>
                {mobileError ? (
                  <p className="text-xs text-red-500 mt-1.5 font-medium">{mobileError}</p>
                ) : (
                  <p className="text-[11px] text-gray-400 mt-1 font-inter leading-relaxed">
                    Please select your country code and enter your corporate mobile number.
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full text-white font-bold py-3.5 h-auto text-sm rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 mt-2"
                style={{ backgroundColor: 'rgb(27, 125, 161)' }}
              >
                <span>Submit & Download Brochure</span>
              </Button>
            </form>
          </div>
        </div>,
        document.body
      )}

    </>
  );
};

export default Footer;
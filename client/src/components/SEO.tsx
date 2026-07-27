import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  schema?: object | object[];
}

const DEFAULT_TITLE = 'Athos Collagen Pvt. Ltd - Leading Marine Collagen Solutions';
const DEFAULT_DESCRIPTION =
  'Athos Collagen Pvt. Ltd. is a global manufacturer and supplier of specialty ingredients serving the pharmaceutical, nutraceutical, animal nutrition, biotechnology and fermentation industries.';
const DEFAULT_KEYWORDS =
  'marine collagen, fish gelatin, collagen peptide, hydrolysed collagen, Athos Collagen, ingredients supplier';

const defaultOrganizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Athos Collagen Pvt. Ltd',
  url: 'https://athoscollagen.com',
  logo: 'https://athoscollagen.com/images/athos_logo.webp',
  description: DEFAULT_DESCRIPTION,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'B-19, Gujarat Agro Infrastructure Mega Food Park',
    addressLocality: 'Surat',
    addressRegion: 'Gujarat',
    countryName: 'India',
  },
};

const defaultWebsiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Athos Collagen Pvt. Ltd',
  url: 'https://athoscollagen.com',
};

export const SEO: React.FC<SEOProps> = ({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  canonical,
  ogType = 'website',
  ogImage = '/images/logo_grid.png',
  schema,
}) => {
  const metaTitle = title ? title : DEFAULT_TITLE;

  const combinedSchemas = schema
    ? Array.isArray(schema)
      ? [defaultOrganizationSchema, defaultWebsiteSchema, ...schema]
      : [defaultOrganizationSchema, defaultWebsiteSchema, schema]
    : [defaultOrganizationSchema, defaultWebsiteSchema];

  return (
    <Helmet>
      <title>{metaTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {canonical && <link rel="canonical" href={canonical} />}

      {/* Schema.org JSON-LD Structured Data */}
      {combinedSchemas.map((sch, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(sch)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;

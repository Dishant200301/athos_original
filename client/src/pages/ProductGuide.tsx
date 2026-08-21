import React, { useEffect } from 'react';
import SEO from '@/components/SEO';

const ProductGuide: React.FC = () => {
  useEffect(() => {
    // Detect mobile and tablet devices (Android, iPhone, iPad, Windows mobile, etc.)
    const isTouchOrMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) ||
      window.innerWidth <= 1024;

    if (isTouchOrMobile) {
      // Direct opening ensures full-screen native mobile PDF view with zoom & download controls
      window.location.replace('/pdf/athos-product-guide.pdf');
    }
  }, []);

  return (
    <>
      <SEO
        title="Athos Collagen Product Guide | Athos Collagen Pvt. Ltd"
        description="View and download the official Athos Collagen Product Guide detailing our marine collagen peptides and specialty ingredients."
        canonical="https://athoscollagen.com/product-guide"
      />
      <div className="w-full h-screen min-h-screen m-0 p-0 overflow-hidden bg-neutral-900">
        <iframe
          src="/pdf/athos-product-guide.pdf#toolbar=1&navpanes=1"
          title="Athos Collagen Product Guide"
          className="w-full h-full border-0 block"
          style={{ width: '100%', height: '100vh', border: 'none' }}
        />
      </div>
    </>
  );
};

export default ProductGuide;

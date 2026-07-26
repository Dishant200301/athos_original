import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ProductShowcase = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const products = [
    {
      id: 1,
      name: t('home.products.fishCollagen'),
      image: '/images/Peptide.png',
      href: '/fish-collagen-peptide'
    },
    {
      id: 2,
      name: t('home.products.fishGelatin'),
      image: '/images/Gelatin.png',
      href: '/fish-gelatin'
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-10 xl:px-32">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="mb-4 md:mb-6 text-2xl sm:text-3xl md:text-4xl" style={{fontFamily: 'Inter', color: 'rgba(29, 129, 165, 1)', fontWeight: '500'}}>{t('home.products.title')}</h2>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="rounded-lg p-6 md:p-12 shadow-sm" style={{backgroundColor: 'rgba(250, 250, 250, 1)'}}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {products.map((product) => (
                <div 
                  key={product.id}
                  className="text-center"
                >
                  <h3 
                    className="mb-4 md:mb-6"
                    style={{
                      fontFamily: 'Inter',
                      fontSize: '26px',
                      fontWeight: '500',
                      color: 'rgba(29, 129, 165, 1)'
                    }}
                  >
                    {product.name}
                  </h3>
                  
                  <div 
                    className="cursor-pointer transition-transform duration-300 hover:scale-105"
                    onClick={() => navigate(product.href)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-60 sm:h-80 object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
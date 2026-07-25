import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CollagenBenefits = () => {
  const { t } = useTranslation();
  
  const benefits = [
    {
      title: t('home.benefits.categories.nutraceuticals'),
      image: '/images/Nutraceuticals_Supplements.jpg',
      categoryId: 'nutraceuticals'
    },
    {
      title: t('home.benefits.categories.foodBeverages'),
      image: '/images/Food_and_Beverages.jpg',
      categoryId: 'food-beverages'
    },
    {
      title: t('home.benefits.categories.pharmaceuticals'),
      image: '/images/Pharmaceuticals.png',
      categoryId: 'pharmaceuticals'
    },
    {
      title: t('home.benefits.categories.cosmeticsSkincare'),
      image: '/images/Cosmetics_and_Skincare.jpg',
      categoryId: 'cosmetics-skincare'
    },
    {
      title: t('home.benefits.categories.petFood'),
      image: '/images/Pet_Food.jpg',
      categoryId: 'pet-food'
    },
    {
      title: t('home.benefits.categories.biotechnology'),
      image: '/images/Biotechnology.jpg',
      categoryId: 'biotechnology'
    }
  ];

  return (
    <>
      <style>{`
        @keyframes marquee-collagen {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-25%);
          }
        }
        .animate-marquee-container-collagen {
          display: flex;
          width: max-content;
          gap: 1.5rem;
          animation: marquee-collagen 30s linear infinite;
        }
        .animate-marquee-container-collagen:hover {
          animation-play-state: paused;
        }
      `}</style>
      <section className="py-16 md:py-20 bg-background overflow-hidden">
        <div className="w-full">
          <div className="text-center mb-8 md:mb-12 container mx-auto px-4 md:px-4 lg:px-10">
            <h2 className="mb-4 md:mb-6 text-2xl sm:text-3xl md:text-4xl" style={{fontFamily: 'Inter', color: 'rgba(29, 129, 165, 1)', fontWeight: '500'}}>{t('home.benefits.title')}</h2>
          </div>

          <div className="relative w-full overflow-hidden py-4 px-4">
            <div className="animate-marquee-container-collagen">
              {/* Duplicate the array 4 times to create a seamless infinite loop even on ultra-wide screens */}
              {[...benefits, ...benefits, ...benefits, ...benefits].map((benefit, index) => (
                <Link 
                  key={index} 
                  to={`/category/${benefit.categoryId}`} 
                  className="w-[280px] sm:w-[320px] flex-shrink-0 group block"
                >
                  <div className="relative overflow-hidden rounded-xl bg-white shadow-sm border border-gray-200 aspect-square transition-all duration-300 ease-in-out group-hover:scale-[1.03] group-hover:shadow-lg group-hover:shadow-gray-300/50 cursor-pointer">
                    <img
                      src={benefit.image}
                      alt={benefit.title}
                      className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                    />
                    <div 
                      className="absolute bottom-0 left-0 right-0 h-16 md:h-20 px-4 pt-2 pb-1 flex items-center justify-center transition-all duration-300 ease-in-out group-hover:h-20 md:group-hover:h-24" 
                      style={{ background: 'linear-gradient(180deg, rgba(228, 222, 213, 0) 14.56%, rgba(243, 240, 237, 0.509615) 50.61%, #EFEFEF 85.01%)' }}
                    >
                      <h3 
                        className="text-[20px] md:text-[22px] text-center font-inter transition-colors duration-300" 
                        style={{ color: 'rgba(67, 67, 64, 1)', fontWeight: '500' }}
                      >
                        {benefit.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CollagenBenefits;
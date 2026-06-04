import React from 'react';
import { useTranslation } from 'react-i18next';

const NewCollagenBenefits = () => {
  const { t } = useTranslation();
  
  const benefits = [
    {
      title: t('home.newBenefits.categories.skinCare', 'Skin Care'),
      image: '/images/Benefits/skin_health.png',
      gradientStyle: 'linear-gradient(180deg, rgba(228, 222, 213, 0) 14.56%, rgba(243, 240, 237, 0.509615) 50.61%, #EFEFEF 85.01%)'
    },
    {
      title: t('home.newBenefits.categories.antiAgeing', 'Anti Ageing'),
      image: '/images/Benefits/anti_ageing.png',
      gradientStyle: 'linear-gradient(180deg, rgba(228, 222, 213, 0) 14.56%, rgba(243, 240, 237, 0.509615) 50.61%, #EFEFEF 85.01%)'
    },
    {
      title: t('home.newBenefits.categories.hairNails', 'Hair & Nails'),
      image: '/images/Benefits/Hair_Nails.png',
      gradientStyle: 'linear-gradient(180deg, rgba(228, 222, 213, 0) 14.56%, rgba(243, 240, 237, 0.509615) 50.61%, #EFEFEF 85.01%)'
    },
    {
      title: t('home.newBenefits.categories.sportsDrink', 'Sports Drink'),
      image: '/images/Benefits/Sports_Drink.png',
      gradientStyle: 'linear-gradient(180deg, rgba(228, 222, 213, 0) 14.56%, rgba(243, 240, 237, 0.509615) 50.61%, #EFEFEF 85.01%)'
    },
    {
      title: t('home.newBenefits.categories.proteinBars', 'Protein bars'),
      image: '/images/Benefits/Protein_bars.png',
      gradientStyle: 'linear-gradient(180deg, rgba(228, 222, 213, 0) 14.56%, rgba(243, 240, 237, 0.509615) 50.61%, #EFEFEF 85.01%)'
    },
    {
      title: t('home.newBenefits.categories.bonesJoints', 'Bones & Joints'),
      image: '/images/Benefits/Bone_Join.png',
      gradientStyle: 'linear-gradient(180deg, rgba(228, 222, 213, 0) 14.56%, rgba(243, 240, 237, 0.509615) 50.61%, #EFEFEF 85.01%)'
    },
    {
      title: t('home.newBenefits.categories.improveSleepQuality', 'Improve Sleep Quality'),
      image: '/images/Benefits/Improve_Sleep_Quality.png',
      gradientStyle: 'linear-gradient(180deg, rgba(228, 222, 213, 0) 14.56%, rgba(243, 240, 237, 0.509615) 50.61%, #EFEFEF 85.01%)'
    },
    {
      title: t('home.newBenefits.categories.gutHealth', 'Gut Health'),
      image: '/images/Benefits/Gut_Health.png',
      gradientStyle: 'linear-gradient(180deg, rgba(228, 222, 213, 0) 14.56%, rgba(243, 240, 237, 0.509615) 50.61%, #EFEFEF 85.01%)'
    },
    {
      title: t('home.newBenefits.categories.woundHealing', 'Wound Healing'),
      image: '/images/Benefits/Wound_Healing.png',
      gradientStyle: 'linear-gradient(180deg, rgba(228, 222, 213, 0) 14.56%, rgba(243, 240, 237, 0.509615) 50.61%, #EFEFEF 85.01%)'
    }
  ];

  return (
    <section className="pt-16 md:pt-20 pb-0 bg-background">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="mb-4 md:mb-6 text-2xl sm:text-3xl md:text-4xl" style={{fontFamily: 'Inter', color: 'rgba(29, 129, 165, 1)', fontWeight: '500'}}>
            <span className="sm:hidden block">Benefits of Athos</span>
            <span className="sm:hidden block">Fish Collagen Peptide</span>
            <span className="hidden sm:block">{t('home.newBenefits.title')}</span>
          </h2>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="relative overflow-hidden rounded-xl mb-3 md:mb-4 bg-white shadow-sm border border-gray-200 aspect-square transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-gray-300/50 cursor-pointer">
                  <img
                    src={benefit.image}
                    alt={benefit.title}
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-14 md:h-18 px-2 md:px-4 pt-1 md:pt-2 pb-1 flex items-center justify-center transition-all duration-300 ease-in-out group-hover:h-16 md:group-hover:h-22" style={{background: benefit.gradientStyle}}>
                    <h3 className="text-[22px] md:text-[24px] text-center transition-all duration-300 ease-in-out group-hover:text-[20px] md:group-hover:text-[22px]" style={{color: 'rgba(67, 67, 64, 1)', fontWeight: '400', fontFamily: 'Inter'}}>
                      {benefit.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewCollagenBenefits;

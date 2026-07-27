import React from 'react';
import { useTranslation } from 'react-i18next';

const PieChart = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full flex flex-col items-center justify-center py-4">
      <h2 
        className="mb-8 md:mb-12 text-center text-2xl sm:text-3xl md:text-4xl" 
        style={{ 
          fontFamily: 'Inter, sans-serif', 
          fontWeight: '500',
          color: 'rgba(29, 129, 165, 1)' 
        }}
      >
        {t('fishCollagen.pie.title')}
      </h2>
      <div className="w-full max-w-4xl mx-auto flex items-center justify-center overflow-hidden bg-transparent">
        <img 
          src="/images/pie_chart.png" 
          alt={t('fishCollagen.pie.title')} 
          className="w-full h-auto max-h-[650px] object-contain transition-transform duration-500 hover:scale-[1.01]"
        />
      </div>
    </div>
  );
};

export default PieChart;
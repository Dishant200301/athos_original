import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactTeaser from '@/components/ContactTeaser';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import collagenPeptideImg from '@/assets/collagen-peptide-product.jpg';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

const CategoryDetail = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Scroll animation hooks
  const [heroRef, heroVisible] = useScrollAnimation(0.1);
  const [subcategoriesRef, subcategoriesVisible] = useScrollAnimation(0.1);
  const [contactRef, contactVisible] = useScrollAnimation(0.1);

  useEffect(() => {
    const categoryName = categoryId ? t(`categoryDetails.categories.${categoryId}.title`, categoryId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())) : 'Category';
    document.title = `${categoryName} - Athos Collagen Pvt. Ltd`;
  }, [categoryId, t]);

  // Function to get translated category data
  const getCategoryData = () => {
    const categoryMap = {
      'food-beverages': 'foodBeverages',
      'nutraceuticals': 'nutraceuticals',
      'cosmetics': 'cosmetics',
      'pharmaceuticals': 'pharmaceuticals',
      'pet-food': 'petFood',
      'biotechnology': 'biotechnology',
      'food-industry': 'foodIndustry',
      'cosmetics-skincare': 'cosmeticsSkincare',
      'biomedical-applications': 'biomedicalApplications',
      'pharma-industry': 'pharmaIndustry'
    };

    const categoryKey = categoryMap[categoryId as keyof typeof categoryMap];
    
    if (!categoryKey) {
      return null;
    }

    return {
      title: t(`categoryDetails.categories.${categoryKey}.title`),
      description: t(`categoryDetails.categories.${categoryKey}.description`),
      hero: getHeroImage(categoryId),
      subcategories: getSubcategories(categoryId, categoryKey),
      products: getProducts(categoryId, categoryKey)
    };
  };

  // Helper functions for images and data
  const getHeroImage = (id: string) => {
    const imageMap = {
      'food-beverages': '/images/Fish_Collagen_Peptide/Food_and_Beverages.png',
      'nutraceuticals': '/images/Fish_Collagen_Peptide/Nutraceuticals_and_Dietary_Supplements.png',
      'cosmetics': '/images/Fish_Collagen_Peptide/Cosmetics_and_Skincare.png',
      'pharmaceuticals': '/images/Fish_Collagen_Peptide/Pharmaceuticals.png',
      'pet-food': '/images/Fish_Collagen_Peptide/Pet_Food.png',
      'biotechnology': '/images/Fish_Collagen_Peptide/Biotechnology.png',
      'food-industry': '/images/Fish_Gelatin/Food_Industry.png',
      'cosmetics-skincare': '/images/Fish_Gelatin/Cosmetics_and_Skincare1.png',
      'biomedical-applications': '/images/Fish_Gelatin/Biomedical_applications.png',
      'pharma-industry': '/images/Fish_Gelatin/Pharma_Industry.png'
    };
    return imageMap[id as keyof typeof imageMap] || collagenPeptideImg;
  };

  const getSubcategories = (id: string, categoryKey: string) => {
    const subcategoryMap = {
      'food-beverages': [
        { key: 'collagenWaterBeverages', image: '/images/Nutraceuticals_and_Dietary_Supplements/Drink_beverages.png' },
        { key: 'proteinShakesSmoothies', image: '/images/Nutraceuticals_and_Dietary_Supplements/Protein_shakes.png' },
        { key: 'functionalFoodsFortified', image: '/images/Nutraceuticals_and_Dietary_Supplements/Functional_foods.png' },
        { key: 'dietarySupplements', image: '/images/Nutraceuticals_and_Dietary_Supplements/Dietary_Supplements.png' },
        { key: 'cerealsEnergyDrinks', image: '/images/Nutraceuticals_and_Dietary_Supplements/Drink_beverages.png' },
        { key: 'snacks', image: '/images/Nutraceuticals_and_Dietary_Supplements/Snacks.png' },
        { key: 'improveStability', image: '/images/Food_and_Beverages/Powder.png' },
        { key: 'helpDigestion', image: '/images/Food_and_Beverages/Joint_health_supplements.png' }
      ],
      'nutraceuticals': [
        { key: 'proteinBars', image: '/images/Food_and_Beverages/Protein_Bars.png' },
        { key: 'drinks', image: '/images/Food_and_Beverages/Drinks.png' },
        { key: 'jointHealthSupplements', image: '/images/Food_and_Beverages/Joint_health_supplements.png' },
        { key: 'powders', image: '/images/Food_and_Beverages/Powder.png' }
      ],
      'cosmetics': [
        { key: 'antiAgingCreamsSerums', image: '/images/Cosmetics_and_Skincare/Anti_Aging_Formulations.png' },
        { key: 'moisturizers', image: '/images/Cosmetics_and_Skincare/Moisturization_&_Hydration.png' },
        { key: 'hairCareProducts', image: '/images/Cosmetics_and_Skincare/Hair_&_Nail_Strengthening.png' },
        { key: 'nailCareTreatments', image: '/images/Cosmetics_and_Skincare/Brightening_and_Even_Skin.png' },
        { key: 'faceMasks', image: '/images/Cosmetics_and_Skincare/Skin_Repair_&_Regeneration.png' }
      ],
      'pharmaceuticals': [
        { key: 'drugDeliverySystems', image: '/images/Pharmaceuticals/Drug_Delivery_Systems.png' },
        { key: 'helpJointPain', image: '/images/Pharmaceuticals/Oral_Supplements.png' },
        { key: 'injectionOrganItems', image: '/images/Pharmaceuticals/Surgical.png' },
        { key: 'treatMusculoskeletal', image: '/images/Pharmaceuticals/Tissue_Engineering_&_Biomaterials.png' },
        { key: 'stabilizeBloodSugar', image: '/images/Pharmaceuticals/Drug_Formulation_Stabilizer.png' },
        { key: 'supportHairNail', image: '/images/Cosmetics_and_Skincare/Hair_&_Nail_Strengthening.png' },
        { key: 'woundHealingProducts', image: '/images/Pharmaceuticals/Wound_Healing.png' },
        { key: 'tissueEngineering', image: '/images/Pharmaceuticals/Tissue_Engineering_&_Biomaterials.png' }
      ],
      'pet-food': [
        { key: 'jointFunction', image: '/images/Pet_Food/Joint_&_Bone_Health.png' },
        { key: 'skinHealth', image: '/images/Pet_Food/Skin_&_Coat_Health.png' },
        { key: 'gutHealthMobility', image: '/images/Pet_Food/Digestive_Health.png' }
      ],
      'biotechnology': [
        { key: 'scaffoldMaterials', image: '/images/Biomedical/Cell_Culture_&_Research.png' },
        { key: 'biocompatibleMaterials', image: '/images/Biomedical/Biocompatible_Medical_Implants.png' }
      ],
      'food-industry': [
        { key: 'stabilizer', image: '/images/Food_Industry/Stabilizer.png' },
        { key: 'clarifyingAgent', image: '/images/Food_Industry/Clarifying_Agent.png' },
        { key: 'emulsifier', image: '/images/Food_Industry/Emulsifier.png' },
        { key: 'gummyCandy', image: '/images/Food_Industry/Gummy_&_Candy.png' },
        { key: 'thickener', image: '/images/Food_Industry/Thickner.png' },
        { key: 'gellingTexturizerDairy', image: '/images/Food_Industry/Gellin_Texturizer.png' },
        { key: 'confectionery', image: '/images/Food_Industry/Confectionery.png' },
        { key: 'dairy', image: '/images/Food_Industry/Dairy_Products.png' },
        { key: 'desserts', image: '/images/Food_Industry/Desserts.png' }
      ],
      'cosmetics-skincare': [
        { key: 'moisturizer', image: '/images/Cosmetics/Moisturizer.png' },
        { key: 'serum', image: '/images/Cosmetics/Serum.png' },
        { key: 'antiAgingProducts', image: '/images/Cosmetics/Anti_ageing_Products.png' },
        { key: 'hairNailCare', image: '/images/Cosmetics/Hair_&_Nail_Care.png' },
        { key: 'makeupBeauty', image: '/images/Cosmetics/Makeup_&_Beauty.png' }
      ],
      'biomedical-applications': [
        { key: 'woundDressingsMedicalFilms', image: '/images/Biomedical_applications/Wound_Dressings.png' },
        { key: 'controlledDrugRelease', image: '/images/Biomedical_applications/Drug_Release_Systems.png' },
        { key: 'embolizationLyoprotection', image: '/images/Biomedical_applications/Embolization_healing.png' },
        { key: 'bioprintingTissue', image: '/images/Biomedical_applications/3D_bioprinting.png' },
        { key: 'microcarriers', image: '/images/Biomedical_applications/Microcarriers.png' },
        { key: 'cellDelivery', image: '/images/Biomedical_applications/Cell_delivery.png' },
        { key: 'drugDelivery', image: '/images/Biomedical_applications/Drug_delivery.png' },
        { key: 'regenerativeMedicine', image: '/images/Biomedical_applications/Regenerative_medicine.png' },
        { key: 'plasma', image: '/images/Biomedical_applications/Plasma.png' },
        { key: 'cryoprotection', image: '/images/Biomedical_applications/Lyoprotection_vaccines.png' },
        { key: 'lyoprotectionVaccines', image: '/images/Biomedical_applications/Lyoprotection_vaccines.png' }
      ],
      'pharma-industry': [
        { key: 'capsuleProduction', image: '/images/Pharma_Industry/Capsule_Production.png' },
        { key: 'tabletCoating', image: '/images/Pharma_Industry/Tablet_Coating.png' },
        { key: 'encapsulationVitamins', image: '/images/Pharma_Industry/Encapsulation_of_Vitamins.png' },
        { key: 'bindingAgentTablets', image: '/images/Pharma_Industry/Binding_Agent_in_Tablets.png' },
        { key: 'controlledDrugRelease', image: '/images/Pharma_Industry/Controlled_Drug_Release.png' },
        { key: 'plasmaExpanders', image: '/images/Pharma_Industry/Plasma_Expanders.png' }
      ]
    };

    const subcategories = subcategoryMap[id as keyof typeof subcategoryMap] || [];
    
    return subcategories.map(subcategory => ({
      title: t(`categoryDetails.categories.${categoryKey}.subcategories.${subcategory.key}`),
      description: '',
      image: subcategory.image
    }));
  };

  const getProducts = (id: string, categoryKey: string) => {
    // For now, return empty array - products can be added later
    return [];
  };

  const category = getCategoryData();

  if (!category) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-20 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-foreground mb-6">{t('categoryDetails.notFound')}</h1>
            <Button onClick={() => navigate(-1)} className="btn-primary">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('categoryDetails.goBack')}
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <main className="pt-20">

        {/* Hero Section */}
        <section className="min-h-screen flex items-center py-16 md:py-20" style={{backgroundColor: 'rgba(247, 246, 247, 1)'}}>
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-center">
              {/* Left Side - Image */}
              <div 
                ref={heroRef}
                className={`flex justify-center lg:justify-start order-2 lg:order-1 transition-all duration-700 ease-out ${
                  heroVisible
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-12'
                }`}
              >
                <img
                  src={category.hero}
                  alt={category.title}
                  className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[28rem] xl:h-[28rem] object-cover rounded-lg"
                />
              </div>

              {/* Right Side - Content */}
              <div 
                className={`order-1 lg:order-2 text-center lg:text-left transition-all duration-700 ease-out delay-200 ${
                  heroVisible
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-12'
                }`}
              >
                <h1 className="text-3xl lg:text-4xl xl:text-5xl mb-4 lg:mb-6 leading-tight" style={{fontFamily: 'Inter', color: 'rgba(29, 129, 165, 1)', fontWeight: '500'}}>
                  {category.title}
                </h1>
                <p className="leading-relaxed mb-6 lg:mb-8 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl" style={{fontFamily: 'Inter, sans-serif', fontWeight: '400', color: 'rgba(112, 112, 112, 1)'}}>
                  {category.description}
                </p>
              </div>
            </div>
          </div>
        </section>
 
        {/* Subcategories Grid Section */}
        <div
          ref={subcategoriesRef}
          className={`transition-all duration-500 ease-out delay-100 ${
            subcategoriesVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <section className="py-12 md:py-16 bg-white">
            <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32">
              <div className="text-center mb-8 md:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl" style={{fontFamily: 'Inter', color: 'rgba(29, 129, 165, 1)', fontWeight: '500'}}>
                  {category.title}
                </h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                {category.subcategories?.map((subcategory, index) => (
                  <div 
                    key={index}
                    className="bg-white overflow-hidden max-w-[220px] w-full mx-auto transform transition-all duration-300 hover:scale-105"
                  >
                    {/* Image */}
                    <div className="w-full aspect-square mb-2 rounded-lg overflow-hidden">
                      <img
                        src={subcategory.image}
                        alt={subcategory.title}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="text-center">
                       <h3 className="mb-1 text-sm sm:text-base md:text-lg" style={{fontFamily: 'Inter', color: 'rgba(112, 112, 112, 1)', fontWeight: '400'}}>
                         {subcategory.title}
                      </h3>
                    
                      <p className="text-xs sm:text-sm font-inter leading-relaxed" style={{fontFamily: 'Inter, sans-serif', color: 'rgba(112, 112, 112, 1)'}}>
                        {subcategory.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Contact Teaser Section */}
        <div
          ref={contactRef}
          className={`transition-all duration-500 ease-out delay-200 ${
            contactVisible
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

export default CategoryDetail;

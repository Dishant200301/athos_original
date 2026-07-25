import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    title: "Enzymes",
    slug: "enzymes",
    description:
      "Enzymes are specialized biocatalysts that accelerate chemical reactions in biological systems. We provide high-quality enzyme solutions that meet the evolving requirements of the pharmaceutical, healthcare, and food industries.",
    bullets: [
      "Accelerates chemical reactions in biological systems",
      "Specialized biocatalysts for pharmaceutical & healthcare",
      "Formulated for safety, stability, and high efficacy",
      "Industry-compliant processing and quality assurance"
    ]
  },
  {
    title: "Peptones",
    slug: "peptones",
    description:
      "High-quality hydrolysates and peptides developed for biological media, cell culture, and pharmaceutical nutrition applications. Our peptone solutions deliver exceptional amino acid profiles, solubility, and batch consistency.",
    bullets: [
      "Hydrolysates and peptides for cell culture & media",
      "Exceptional amino acid profiles and high solubility",
      "Consistent batch-to-batch composition",
      "Suitable for biotechnology and pharmaceutical research"
    ]
  },
  {
    title: "Probiotic and Fermentation Ingredients",
    slug: "probiotic-fermentation-ingredients",
    description:
      "Harness the power of science and nature with our premium range of probiotic strains and fermentation-derived ingredients, cultured to support digestive wellness, immune health, and functional nutrition.",
    bullets: [
      "Cultured strains for digestive & immune wellness",
      "Advanced probiotic bacteria and yeast extracts",
      "High viability and formulation stability",
      "Ideal for dietary supplements and functional foods"
    ]
  },
  {
    title: "Nutraceutical and Pharmaceuticals Ingredients",
    slug: "nutraceutical-pharmaceutical-ingredients",
    description:
      "Athos Collagen Pvt. Ltd. offers a comprehensive portfolio of premium nutraceutical and pharmaceutical ingredients, sourced and supplied to support targeted wellness, dietary supplements, and health formulations.",
    bullets: [
      "High-purity bioactive compounds for health support",
      "Formulated for bone, joint, skin, and metabolic health",
      "Complies with globally accepted safety standards",
      "Wide range of versatile raw materials"
    ]
  },
  {
    title: "Animal Nutrition",
    slug: "animal-nutrition",
    description:
      "Athos offers a comprehensive range of functional ingredients designed for modern animal nutrition applications. Our portfolio supports feed manufacturers, premix companies, and animal health businesses.",
    bullets: [
      "Functional ingredients for modern livestock & feed",
      "Promotes intestinal health and feed absorption",
      "Designed for premix companies & feed manufacturers",
      "High formulation flexibility and consistent quality"
    ]
  },
  {
    title: "Extract and Essential Oils",
    slug: "extract-and-essential-oils",
    description:
      "Our high-purity SCFE plant extracts, oleoresins, and pure essential oils are derived using advanced Supercritical Fluid Extraction technologies for maximum biological potency, purity, and active botanical benefits.",
    bullets: [
      "Advanced Supercritical Fluid Extraction (SCFE) technology",
      "Solvent-free pure plant extracts & oleoresins",
      "Maximum biological potency and active botanical benefits",
      "Premium aromatic essential oils for wellness & pharma"
    ]
  }
];

const ProductCategoriesSection: React.FC = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-4  md:px-4 lg:px-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4"
            style={{ color: '#6ABF00', fontFamily: 'Inter, sans-serif' }}
          >
            Our Product Categories
          </h2>
        
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((cat) => (
            <div
              key={cat.slug}
              className="bg-white border border-[#E9ECEF] rounded-[16px] p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Heading */}
                <h3
                  className="text-[22px] font-bold mb-3 pb-2 border-b border-gray-100 leading-tight"
                  style={{ color: '#6ABF00', fontFamily: 'Inter, sans-serif' }}
                >
                  {cat.title}
                </h3>

                {/* Paragraph Description */}
                <p className="text-[14px] text-[#555555] leading-[1.6] mb-4 font-inter">
                  {cat.description}
                </p>

                {/* Bullets List */}
                <ul className="space-y-2.5 mb-6">
                  {cat.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-[#555555]">
                      <span className="text-[#6ABF00] mt-1 text-[10px] flex-shrink-0">▲</span>
                      <span className="text-[14px] leading-[1.4] font-inter">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Read More Link */}
              <div className="pt-4 border-t border-gray-100 mt-auto">
                <Link
                  to={`/products/${cat.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#6ABF00] hover:text-[#58a000] transition-colors font-inter"
                >
                  <span>Read More</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategoriesSection;

import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    title: "Enzymes",
    slug: "enzymes",
    href: "/products/enzymes",
  },
  {
    title: "Peptones",
    slug: "peptones",
    href: "/products/peptones",
  },
  {
    title: "Probiotic and Fermentation Ingredients",
    slug: "probiotic-fermentation-ingredients",
    href: "/products/probiotic-fermentation-ingredients",
  },
  {
    title: "Nutraceutical and Pharmaceuticals Ingredients",
    slug: "nutraceutical-pharmaceutical-ingredients",
    href: "/products/nutraceutical-pharmaceutical-ingredients",
  },
  {
    title: "Animal Nutrition",
    slug: "animal-nutrition",
    href: "/products/animal-nutrition",
  },
  {
    title: "Extract and Essential Oils",
    slug: "extract-and-essential-oils",
    href: "/products/extract-and-essential-oils",
  }
];

const ProductCategoriesSection: React.FC = () => {
  return (
    <section className="py-16 md:py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-10 xl:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-[32px] font-medium text-[#1D7AA3] leading-tight mb-4">
            Products
          </h2>
        </div>

        {/* Cards Grid matching athos-ui-build style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              to={cat.href}
              className="group bg-white rounded-[16px] p-6 sm:p-6 shadow-md border border-gray-100/80 hover:shadow-[0_10px_20px_rgba(29,122,163,0.28)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden relative"
            >
             
              <div>
                {/* Heading matching screenshot style */}
                <h3 className="text-[20px] font-medium text-[#1D7AA3] mb-3 pb-2 leading-tight group-hover:text-[#176283] transition-colors">
                  {cat.title}
                </h3>
              </div>

              {/* Bottom Category Page Link */}
              <div className="pt-4 mt-2">
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#1D7AA3] group-hover:text-[#176283] transition-colors">
                  <span>Read More</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategoriesSection;

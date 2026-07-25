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
    <section className="py-16 md:py-20 lg:py-24 bg-background">
      <div className="max-w-[1290px] mx-auto px-4 md:px-4 lg:px-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-[32px] font-bold text-[#1D7AA3] leading-tight mb-4">
            Products
          </h2>
        </div>

        {/* Cards Grid matching athos-ui-build style */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((cat) => (
            <div
              key={cat.slug}
              className="bg-white rounded-[16px] p-6 shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Heading matching screenshot style */}
                <h3 className="text-[20px] font-bold text-[#1D7AA3] mb-3 pb-2 leading-tight">
                  {cat.title}
                </h3>
              </div>

              {/* Bottom Category Page Link */}
              <div className="">
                <Link
                  to={cat.href}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#1D7AA3] hover:text-[#1D7AA3] transition-colors"
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

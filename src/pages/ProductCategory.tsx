import { useEffect, useRef, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ContactTeaser from "@/components/ContactTeaser";
import Footer from "@/components/Footer";
import NotFound from "./NotFound";
import { useTranslation } from "react-i18next";

interface SubProduct {
  name: string;
  slug: string;
  description?: string;
  bullets: string[];
}

interface CategoryData {
  title: string;
  description: string;
  subProducts: SubProduct[];
}

const productCategoryData: Record<string, CategoryData> = {
  enzymes: {
    title: "Enzymes",
    description:
      "Enzymes are specialized biocatalysts that accelerate chemical reactions in biological systems. At Athos Collagen Pvt. Ltd., we provide high-quality enzyme solutions that meet the evolving requirements of the pharmaceutical, healthcare, and food industries. Our focus on innovation, quality assurance, and scientific excellence enables us to support manufacturers in developing safe, effective, and reliable formulations.",
    subProducts: [
      {
        name: "Serratiopeptidase",
        slug: "serratiopeptidase",
        bullets: [
          "Facilitates the breakdown of inflammatory protein complexes",
          "Helps maintain a balanced inflammatory response",
          "Promotes natural tissue recovery processes",
          "Aids in reducing localized swelling and discomfort",
          "Supports post-surgical recovery formulations",
          "Enhances enzymatic activity in therapeutic preparations",
          "Contributes to improved protein metabolism",
          "Enables targeted applications in pharmaceutical formulations",
          "Provides effective solutions for enzyme-based therapies",
          "Offers versatile uses in healthcare and nutraceutical products"
        ]
      },
      {
        name: "Trypsin",
        slug: "trypsin",
        bullets: [
          "Facilitates protein breakdown through enzymatic hydrolysis",
          "Aids efficient digestion of protein-based compounds",
          "Promotes controlled tissue processing applications",
          "Contributes to wound care and recovery formulations",
          "Supports removal of non-viable protein materials",
          "Assists in protein modification and analysis processes",
          "Provides reliable performance in enzyme-based therapies",
          "Offers versatile applications across healthcare and biotechnology sectors"
        ]
      },
      {
        name: "Pancreatin",
        slug: "pancreatin",
        bullets: [
          "Facilitates digestion of proteins, fats, and carbohydrates",
          "Aids efficient breakdown of complex nutrients",
          "Promotes effective digestive enzyme activity",
          "Enhances nutrient availability from food sources",
          "Supports balanced gastrointestinal enzyme function",
          "Contributes to digestive health formulations",
          "Helps optimize nutrient processing within the digestive system",
          "Enables development of enzyme replacement products"
        ]
      },
      {
        name: "Pepsin",
        slug: "pepsin",
        bullets: [
          "Facilitates efficient breakdown of dietary proteins",
          "Aids conversion of proteins into smaller peptides",
          "Promotes effective gastric digestion processes",
          "Enhances utilization of protein-derived nutrients",
          "Contributes to balanced digestive enzyme activity",
          "Enables controlled protein hydrolysis applications",
          "Assists in pharmaceutical and nutraceutical preparations",
          "Provides reliable enzymatic performance in acidic conditions",
          "Offers versatile applications in biotechnology and healthcare industries"
        ]
      },
      {
        name: "Amylase",
        slug: "amylase",
        bullets: [
          "Facilitates the breakdown of starch into simple sugars",
          "Aids efficient carbohydrate digestion processes",
          "Promotes better utilization of energy-rich nutrients",
          "Supports digestive health formulations",
          "Enables effective processing of starch-based ingredients",
          "Contributes to improved nutritional ingredient availability",
          "Assists in pharmaceutical and nutraceutical applications",
          "Provides reliable performance in industrial enzyme processes",
          "Offers versatile solutions across healthcare and biotechnology sectors"
        ]
      },
      {
        name: "Rennet",
        slug: "rennet",
        bullets: [
          "Facilitates milk protein coagulation processes",
          "Enables efficient cheese manufacturing applications",
          "Promotes controlled conversion of casein proteins",
          "Enhances texture and consistency of dairy products",
          "Supports optimized dairy processing operations",
          "Aids precise enzymatic modification of milk components",
          "Improves production efficiency in food biotechnology",
          "Contributes to consistent product quality",
          "Provides reliable performance in industrial applications"
        ]
      },
      {
        name: "Lactase",
        slug: "lactase",
        bullets: [
          "Breaks down lactose into easily digestible sugars",
          "Facilitates better dairy product digestion",
          "Helps minimize lactose-related digestive discomfort",
          "Promotes efficient nutrient utilization from dairy foods",
          "Enables improved lactose tolerance",
          "Supports balanced digestive enzyme activity",
          "Enhances the usability of dairy-based nutrition products",
          "Aids smooth carbohydrate digestion processes"
        ]
      },
      {
        name: "Lipase",
        slug: "lipase",
        bullets: [
          "Facilitates the breakdown of dietary fats",
          "Aids efficient lipid digestion and absorption",
          "Helps maintain healthy digestive enzyme balance",
          "Supports effective metabolism of fats",
          "Contributes to improved digestive efficiency",
          "Assists in the formulation of digestive enzyme supplements",
          "Enables better processing of fat-containing ingredients",
          "Plays a vital role in gastrointestinal wellness formulations"
        ]
      },
      {
        name: "Papain",
        slug: "papain",
        bullets: [
          "Facilitates natural protein breakdown",
          "Aids efficient digestion of protein-rich foods",
          "Promotes better nutrient utilization",
          "Helps maintain digestive enzyme balance",
          "Contributes to healthy tissue recovery processes",
          "Assists in reducing protein-related digestive challenges",
          "Supports versatile pharmaceutical and nutraceutical applications",
          "Enhances enzymatic activity in various formulations",
          "Enables effective processing of protein-based ingredients",
          "Provides valuable benefits in digestive health products"
        ]
      },
      {
        name: "Phospholipase",
        slug: "phospholipase",
        bullets: [
          "Facilitates the breakdown of phospholipids",
          "Aids efficient lipid metabolism processes",
          "Contributes to balanced cellular membrane activity",
          "Assists in advanced pharmaceutical and nutraceutical formulations",
          "Enables targeted modification of phospholipid compounds",
          "Improves processing efficiency in biotechnology applications",
          "Provides valuable applications in research and healthcare industries"
        ]
      },
      {
        name: "Protease",
        slug: "protease",
        bullets: [
          "Facilitates the breakdown of complex proteins",
          "Aids efficient protein digestion processes",
          "Promotes better absorption of amino acids",
          "Contributes to balanced digestive enzyme activity",
          "Supports protein processing in pharmaceutical formulations",
          "Enhances nutritional utilization of protein sources",
          "Assists in the removal of unwanted protein residues",
          "Enables efficient biocatalytic applications",
          "Helps optimize enzymatic manufacturing processes",
          "Provides versatile uses across healthcare and biotechnology sectors"
        ]
      },
      {
        name: "Dextranase",
        slug: "dextranase",
        bullets: [
          "Breaks down complex dextran polymers efficiently",
          "Helps control biofilm-forming dextran structures",
          "Facilitates carbohydrate polymer degradation",
          "Contributes to effective microbial polysaccharide management",
          "Provides valuable applications in pharmaceutical formulations",
          "Offers versatility across healthcare and industrial enzyme solutions"
        ]
      },
      {
        name: "Cellulase",
        slug: "cellulase",
        bullets: [
          "Facilitates the breakdown of cellulose fibers",
          "Enhances plant-based ingredient digestion",
          "Aids efficient release of nutrients from fiber sources",
          "Promotes improved utilization of vegetable-based materials",
          "Enables effective processing of cellulose-rich compounds",
          "Contributes to biotechnology and pharmaceutical applications",
          "Improves extraction efficiency of bioactive components",
          "Assists in optimizing industrial enzyme processes",
          "Provides versatile solutions for nutraceutical and healthcare formulations"
        ]
      },
      {
        name: "Beta-Glucanase",
        slug: "beta-glucanase",
        bullets: [
          "Facilitates the breakdown of beta-glucan polymers",
          "Enhances the utilization of cereal-based ingredients",
          "Aids efficient degradation of complex carbohydrates",
          "Improves processing performance in food and biotechnology applications",
          "Contributes to optimized enzymatic processing methods",
          "Assists in reducing viscosity caused by beta-glucans",
          "Provides versatile applications in pharmaceutical and nutraceutical industries"
        ]
      },
      {
        name: "Transglutaminase",
        slug: "transglutaminase",
        bullets: [
          "Catalyzes protein cross-linking reactions efficiently",
          "Enhances functional properties of protein-based formulations",
          "Improves texture and stability of protein structures",
          "Facilitates development of advanced biomaterial applications",
          "Enables modification of protein characteristics",
          "Provides versatile solutions across healthcare and industrial sectors"
        ]
      },
      {
        name: "Laccase",
        slug: "laccase",
        bullets: [
          "Catalyzes oxidation reactions with high efficiency",
          "Facilitates transformation of various organic compounds",
          "Promotes efficient utilization of bioactive compounds",
          "Provides versatile applications in research and industrial formulations",
          "Supports innovative enzyme technology development"
        ]
      },
      {
        name: "Polygalacturonase",
        slug: "polygalacturonase",
        bullets: [
          "Facilitates the breakdown of pectin compounds",
          "Enhances degradation of complex plant cell wall materials",
          "Improves extraction of bioactive plant components",
          "Aids efficient processing of pectin-rich ingredients",
          "Promotes better clarification and filtration processes",
          "Supports biotechnology and enzyme-based applications",
          "Enables controlled modification of polysaccharide structures",
          "Contributes to optimized industrial processing methods",
          "Enhances utilization of plant-derived materials",
          "Provides versatile solutions for pharmaceutical and nutraceutical formulations"
        ]
      },
      {
        name: "Xylanase",
        slug: "xylanase",
        bullets: [
          "Facilitates the breakdown of xylan-based polysaccharides",
          "Enhances utilization of plant-derived carbohydrate sources",
          "Aids efficient degradation of complex hemicellulose structures",
          "Improves processing of fiber-rich materials",
          "Promotes better release of valuable bioactive compounds",
          "Supports enzyme-based biotechnology applications",
          "Enables modification of plant cell wall components",
          "Contributes to optimized industrial processing efficiency",
          "Assists in improving formulation performance",
          "Provides versatile applications across pharmaceutical and nutraceutical industries"
        ]
      },
      {
        name: "Galactosidase",
        slug: "galactosidase",
        bullets: [
          "Facilitates the breakdown of galactose-containing compounds",
          "Aids efficient carbohydrate digestion processes",
          "Assists in biotechnology and pharmaceutical applications",
          "Enhances enzymatic processing efficiency",
          "Provides versatile solutions for nutraceutical and healthcare formulations"
        ]
      },
      {
        name: "Pectinase",
        slug: "pectinase",
        bullets: [
          "Facilitates the breakdown of pectin compounds",
          "Enhances processing of plant-based materials",
          "Aids efficient extraction of bioactive ingredients",
          "Improves clarification and filtration efficiency",
          "Promotes effective degradation of complex polysaccharides",
          "Contributes to optimized enzyme-based manufacturing processes",
          "Assists in improving formulation and processing quality",
          "Provides versatile applications in pharmaceutical and nutraceutical industries"
        ]
      }
    ]
  },
  peptones: {
    title: "Peptones",
    description:
      "Peptones are complex mixtures of peptides, amino acids, and nitrogenous compounds obtained through controlled enzymatic or chemical hydrolysis of proteins. They serve as valuable nutritional components in microbiological culture media, pharmaceutical manufacturing, biotechnology research, and industrial fermentation processes. At Athos Collagen Pvt. Ltd., we provide high-quality peptones developed to meet the demanding requirements of pharmaceutical, biotechnology, and research applications. Our peptones offer excellent nutritional value, consistent composition, and reliable performance for supporting microbial growth and biological production processes.",
    subProducts: [
      {
        name: "Bovine Collagen Peptide",
        slug: "bovine-collagen-peptide",
        bullets: [
          "Provides a rich source of bioactive collagen-derived peptides",
          "Contributes to maintaining healthy skin structure and elasticity",
          "Aids in supporting connective tissue integrity",
          "Promotes collagen synthesis within the body",
          "Helps maintain joint and cartilage health",
          "Enhances nutritional value in wellness formulations",
          "Supports development of beauty and healthcare products",
          "Offers high bioavailability for effective peptide utilization",
          "Enables versatile applications in nutraceutical formulations",
          "Provides functional benefits across health and nutrition industries"
        ]
      },
      {
        name: "Veg Collagen",
        slug: "veg-collagen",
        bullets: [
          "Provides plant-based ingredients for collagen-focused formulations",
          "Supports natural skin care and beauty applications",
          "Helps maintain skin hydration and appearance",
          "Contributes to healthy hair and nail wellness formulations",
          "Supplies valuable botanical nutrients and bioactive compounds",
          "Enables development of vegan-friendly wellness products",
          "Supports innovative plant-based healthcare solutions",
          "Offers an alternative approach to traditional collagen products"
        ]
      },
      {
        name: "Fish Collagen Peptide",
        slug: "fish-collagen-peptide",
        bullets: [
          "Provides highly bioavailable marine collagen peptides",
          "Supports healthy skin structure and elasticity",
          "Contributes to maintaining skin hydration and firmness",
          "Aids in promoting collagen formation within the body",
          "Helps maintain joint and connective tissue wellness",
          "Enhances nutritional value of beauty and health formulations",
          "Offers easy absorption due to low molecular peptide size",
          "Supports development of premium nutraceutical products",
          "Provides functional benefits for skin, hair, and nail care",
          "Enables versatile applications in wellness and cosmetic industries"
        ]
      },
      {
        name: "Chicken Collagen",
        slug: "chicken-collagen",
        bullets: [
          "Provides a natural source of collagen-derived peptides",
          "Supports connective tissue structure and flexibility",
          "Contributes to joint and cartilage wellness formulations",
          "Helps maintain skin firmness and elasticity",
          "Aids in promoting collagen production within the body",
          "Enhances nutritional value of health supplements",
          "Supports development of beauty and wellness products",
          "Offers functional benefits for mobility and tissue health",
          "Enables versatile applications in nutraceutical formulations"
        ]
      },
      {
        name: "Egg Membrane Collagen",
        slug: "egg-membrane-collagen",
        bullets: [
          "Provides a natural source of collagen and bioactive proteins",
          "Supports joint and connective tissue wellness",
          "Contributes to maintaining skin elasticity and firmness",
          "Aids in promoting healthy cartilage structure",
          "Enhances beauty and wellness supplement formulations",
          "Supplies essential amino acids for collagen synthesis",
          "Supports mobility and flexibility-related applications",
          "Helps maintain healthy skin hydration and appearance",
          "Enables development of premium nutraceutical products",
          "Offers versatile applications in healthcare, nutrition, and cosmetic industries"
        ]
      },
      {
        name: "Undenatured Collagen",
        slug: "undenatured-collagen",
        bullets: [
          "Preserves the natural triple-helix structure of collagen",
          "Supports joint cartilage and connective tissue wellness",
          "Helps maintain healthy joint flexibility and mobility",
          "Provides functional benefits for musculoskeletal formulations",
          "Contributes to maintaining structural integrity of tissues",
          "Offers bioactive collagen properties in low-temperature processing",
          "Supports development of specialized nutraceutical products",
          "Provides naturally occurring collagen peptides and proteins",
          "Enables applications in advanced healthcare and wellness solutions"
        ]
      },
      {
        name: "Bovine Gelatin",
        slug: "bovine-gelatin",
        bullets: [
          "Provides a rich source of collagen-derived proteins",
          "Supports development of pharmaceutical and nutraceutical formulations",
          "Enhances texture and stability of capsule-based products",
          "Offers excellent gelling and binding properties",
          "Contributes to functional food and supplement applications",
          "Provides valuable amino acids including glycine and proline",
          "Enables efficient formulation of softgel and hard capsule products",
          "Supports versatile applications in healthcare industries",
          "Improves structural properties of various formulations",
          "Delivers consistent quality for pharmaceutical and food applications"
        ]
      },
      {
        name: "Fish Gelatin",
        slug: "fish-gelatin",
        bullets: [
          "Provides a marine-derived source of collagen proteins",
          "Supports development of clean-label nutraceutical formulations",
          "Offers excellent gelling and stabilizing properties",
          "Enhances functionality of capsule and supplement products",
          "Supplies valuable amino acids for nutritional applications",
          "Enables production of softgel and hard capsule formulations",
          "Provides an alternative gelatin solution for diverse applications",
          "Supports innovative pharmaceutical and healthcare products",
          "Contributes to improved texture and consistency in formulations",
          "Delivers reliable performance across food, cosmetic, and nutraceutical industries"
        ]
      },
      {
        name: "Mucopolysaccharides",
        slug: "mucopolysaccharides",
        bullets: [
          "Provides essential structural components of connective tissues",
          "Contributes to maintaining joint and cartilage integrity",
          "Supports healthy skin hydration and elasticity",
          "Aids in maintaining extracellular matrix function",
          "Enhances development of advanced nutraceutical formulations",
          "Provides valuable applications in tissue health products",
          "Supports mobility and flexibility-related wellness solutions",
          "Contributes to skin and beauty care formulations",
          "Enables innovative applications in pharmaceutical research",
          "Offers versatile use in healthcare and biotechnology industries"
        ]
      },
      {
        name: "Corn Hydrolysate Protein",
        slug: "corn-hydrolysate-protein",
        bullets: [
          "Provides a rich source of bioavailable plant-based peptides",
          "Delivers essential amino acids for nutritional formulations",
          "Facilitates rapid absorption and utilization of proteins",
          "Enhances the nutritional profile of health supplements",
          "Supports development of plant-based nutraceutical products",
          "Contributes to protein-enriched functional formulations",
          "Enables versatile applications in food and healthcare industries"
        ]
      },
      {
        name: "Wheat Peptide",
        slug: "wheat-peptide",
        bullets: [
          "Provides a concentrated source of plant-derived peptides",
          "Delivers valuable amino acids for nutritional formulations",
          "Facilitates efficient protein utilization",
          "Supports development of functional health products",
          "Enhances the nutritional profile of supplement formulations",
          "Promotes easy incorporation into dietary applications"
        ]
      },
      {
        name: "Pea Peptide",
        slug: "pea-peptide",
        bullets: [
          "Provides a high-quality source of plant-based peptides",
          "Delivers essential amino acids for nutritional support",
          "Facilitates efficient protein absorption and utilization",
          "Offers excellent digestibility for functional applications",
          "Promotes innovative plant-based health solutions",
          "Provides a reliable ingredient for modern nutrition products"
        ]
      },
      {
        name: "Brown Rice Protein",
        slug: "brown-rice-protein",
        bullets: [
          "Provides a plant-based source of high-quality protein",
          "Supports development of vegan and vegetarian formulations",
          "Offers excellent digestibility and bioavailability",
          "Contributes to balanced dietary protein intake",
          "Enables versatile applications in nutraceutical products",
          "Promotes innovative plant-based nutrition solutions",
          "Provides a reliable ingredient for health and wellness industries"
        ]
      },
      {
        name: "Soy Protein",
        slug: "soy-protein",
        bullets: [
          "Provides a complete plant-based protein source",
          "Delivers essential amino acids for nutritional formulations",
          "Facilitates muscle and wellness-focused applications"
        ]
      },
      {
        name: "Whey Protein",
        slug: "whey-protein",
        bullets: [
          "Enhances protein content in functional nutrition products",
          "Supports development of sports and wellness supplements",
          "Offers excellent digestibility and bioavailability",
          "Contributes to balanced dietary protein solutions",
          "Enables versatile use in nutraceutical formulations",
          "Promotes innovative health and performance products",
          "Provides reliable functionality across nutrition industries"
        ]
      }
    ]
  },
  "probiotic-fermentation-ingredients": {
    title: "Probiotic and Fermentation Ingredients",
    description:
      "Harness the power of science and nature with our premium range of probiotic and fermentation ingredients. Designed to support innovation across the food, beverage, dietary supplement, and health & wellness industries, our solutions are sourced from trusted global partners and manufactured to high standards of quality, safety, and consistency. Our portfolio is developed to help create products that meet evolving consumer expectations for health, functionality, and performance. As we continue to expand our offerings, we are introducing a comprehensive selection of advanced probiotic strains, fermentation-derived ingredients, and specialty solutions tailored to diverse formulation needs. Whether you're developing next-generation nutritional supplements, functional foods, or wellness products, our team is committed to providing reliable ingredients, technical expertise, and responsive support to help bring your innovations to market.",
    subProducts: [
      {
        name: "Malt Extract",
        slug: "malt-extract",
        bullets: [
          "Premium-quality ingredient obtained from carefully selected malted grains through a controlled extraction process.",
          "Appreciated for its rich nutritional profile, natural flavor, and excellent processing characteristics.",
          "Widely utilized across food, beverage, fermentation, microbiological, and nutritional applications.",
          "Offers consistent composition and dependable performance for commercial manufacturing requirements.",
          "Available in powder and liquid forms to accommodate diverse formulation preferences.",
          "Produced under stringent quality management systems to ensure purity, safety, and batch-to-batch uniformity.",
          "Easily incorporated into various production processes because of its excellent solubility and handling properties.",
          "Supplied with complete technical documentation, including specifications and certificates to support quality assurance.",
          "Suitable for industrial-scale production, research laboratories, and specialized formulation projects.",
          "Backed by reliable logistics, responsive customer support, and flexible packaging options to meet global supply requirements."
        ]
      },
      {
        name: "Yeast Extract",
        slug: "yeast-extract",
        bullets: [
          "Produced through a carefully controlled autolysis process to obtain a highly functional yeast-derived ingredient.",
          "Valued for its balanced nutritional composition and broad compatibility across multiple industrial sectors.",
          "Extensively incorporated into food, biotechnology, microbiological, fermentation, and nutritional formulations.",
          "Delivers reliable quality attributes that support consistent manufacturing outcomes.",
          "Offered in various grades and physical forms to satisfy diverse processing and application requirements.",
          "Manufactured in accordance with rigorous quality standards using validated production procedures.",
          "Demonstrates excellent dispersibility and ease of incorporation into a wide range of formulation systems.",
          "Accompanied by comprehensive product specifications, analytical reports, and quality documentation.",
          "Suitable for commercial production, laboratory research, product innovation, and specialized development projects.",
          "Supported by dependable inventory management, efficient global distribution, and dedicated technical assistance."
        ]
      },
      {
        name: "Liver Extract",
        slug: "liver-extract",
        bullets: [
          "Carefully processed from premium raw materials to deliver a dependable ingredient for specialized applications.",
          "Recognized for its rich biochemical composition and suitability for research, fermentation, and microbiological use.",
          "Developed under controlled manufacturing conditions to maintain consistency throughout every production batch.",
          "Applicable across laboratory, biotechnology, pharmaceutical, and industrial formulation environments.",
          "Available in customized grades and packaging options to accommodate varied commercial requirements.",
          "Manufactured following established quality systems with comprehensive process monitoring and control.",
          "Exhibits excellent compatibility with diverse production methodologies and formulation techniques.",
          "Supplied with complete technical specifications, certificates of analysis, and supporting quality documentation.",
          "Designed to meet the expectations of organizations seeking reliable ingredients for advanced product development.",
          "Supported by responsive technical consultation, efficient order fulfillment, and a dependable global supply network."
        ]
      },
      {
        name: "Meat Extract",
        slug: "meat-extract",
        bullets: [
          "Produced from carefully selected raw materials using standardized extraction techniques to ensure reliable quality.",
          "Widely recognized as a valuable ingredient for microbiological, fermentation, biotechnology, and laboratory applications.",
          "Processed under controlled manufacturing conditions to achieve consistent composition and dependable performance.",
          "Suitable for research institutions, industrial manufacturers, and specialized formulation projects.",
          "Available in multiple specifications and packaging configurations to meet diverse customer requirements.",
          "Manufactured in compliance with stringent quality assurance protocols and established production standards.",
          "Offers excellent processing characteristics, enabling smooth integration into various manufacturing systems.",
          "Delivered with detailed product specifications, analytical documentation, and complete quality support.",
          "Preferred by organizations seeking dependable ingredients for advanced scientific and industrial applications.",
          "Supported by efficient logistics, responsive customer service, and a reliable international distribution network."
        ]
      },
      {
        name: "Lactobacillus Buchneri",
        slug: "lactobacillus-buchneri",
        bullets: [
          "High-quality probiotic bacterial strain produced under controlled fermentation processes.",
          "Widely recognized for its excellent stability in specialized microbial applications.",
          "Suitable for formulation in dietary supplements, functional nutrition, and research products.",
          "Manufactured in facilities following stringent quality management standards.",
          "Available in customized potency levels to meet diverse formulation requirements.",
          "Offers outstanding compatibility with multi-strain probiotic and synbiotic blends.",
          "Carefully processed to preserve viability throughout production and storage.",
          "Supplied in convenient powder form for capsules, sachets, tablets, and beverage mixes.",
          "Packaged using moisture-protective systems to help maintain product integrity.",
          "Ideal for global nutraceutical manufacturers seeking reliable probiotic ingredients."
        ]
      },
      {
        name: "Streptococcus Thermophilus",
        slug: "streptococcus-thermophilus",
        bullets: [
          "Lactic acid bacterial culture extensively used in probiotic, fermented dairy, and functional nutrition products.",
          "Cultivated through precision fermentation to achieve defined microbial characteristics.",
          "Offered in multiple CFU concentrations to accommodate diverse formulation requirements.",
          "Integrates efficiently into capsules, tablets, sachets, stick packs, powder blends, and dairy-based applications.",
          "Combines successfully with probiotic cultures, prebiotics, vitamins, minerals, and postbiotic ingredients.",
          "Recognized for its application in cultured dairy products, synbiotic formulations, and microbiome-focused innovations.",
          "Retains microbial viability under recommended manufacturing, handling, and storage conditions.",
          "Chosen by formulators developing functional foods, dietary supplements, and nutritional solutions.",
          "Adaptable to customized product development across global health and wellness markets.",
          "Serves as a scientifically established probiotic culture for contemporary nutrition and fermentation technologies."
        ]
      },
      {
        name: "Lactobacillus Casei",
        slug: "lactobacillus-casei",
        bullets: [
          "Well-characterized probiotic microorganism recognized for its extensive use in nutritional science.",
          "Cultivated using controlled fermentation technology to achieve defined microbial characteristics.",
          "Offered in multiple CFU strengths to accommodate diverse formulation objectives.",
          "Integrates efficiently into capsules, tablets, sachets, stick packs, gummies, and powdered supplements.",
          "Combines effectively with prebiotics, additional probiotic cultures, vitamins, minerals, and botanical ingredients.",
          "Adaptable to synbiotic formulations, fermented foods, and functional nutrition products.",
          "Developed with emphasis on microbial viability, process consistency, and formulation performance.",
          "Selected by product developers for applications requiring scientifically established probiotic cultures.",
          "Fits a broad range of dietary supplement, food, and nutritional innovation projects.",
          "Represents a trusted probiotic solution for contemporary microbiome-focused product development."
        ]
      },
      {
        name: "Bifidobacterium Adolescentis",
        slug: "bifidobacterium-adolescentis",
        bullets: [
          "Premium probiotic strain developed for advanced nutraceutical and functional nutrition applications.",
          "Produced using controlled fermentation technology to ensure exceptional purity and consistency.",
          "Available in customized CFU strengths to accommodate diverse formulation requirements.",
          "Suitable for capsules, tablets, sachets, powder blends, and functional beverage formulations.",
          "Excellent compatibility with multi-strain probiotic, synbiotic, and microbiome-focused products.",
          "Processed under optimized conditions to help maintain microbial stability and viability.",
          "Manufactured in compliance with GMP and internationally recognized quality standards.",
          "Supplied in moisture-resistant packaging to preserve product integrity during storage and transportation.",
          "Ideal for dietary supplements, functional foods, and innovative health nutrition formulations.",
          "Available with complete technical documentation, including Certificate of Analysis (COA), product specifications, and quality certifications upon request."
        ]
      },
      {
        name: "Enterococcus Faecium",
        slug: "enterococcus-faecium",
        bullets: [
          "High-quality probiotic strain manufactured using precision-controlled fermentation technology.",
          "Produced under stringent quality systems to ensure purity, consistency, and batch-to-batch reliability.",
          "Suitable for incorporation into capsules, tablets, sachets, powder blends, and functional nutrition products.",
          "Demonstrates excellent compatibility with multi-strain probiotic and synbiotic formulations.",
          "Carefully processed to support microbial stability throughout production, packaging, and storage.",
          "Manufactured in compliance with GMP and internationally recognized quality standards.",
          "Offered in flexible bulk packaging solutions for industrial, OEM, and private-label applications.",
          "Designed for research, nutraceutical, and specialized probiotic formulation applications."
        ]
      },
      {
        name: "Pediococcus Acidilactici",
        slug: "pediococcus-acidilactici",
        bullets: [
          "Lactic acid bacterial culture recognized for its application in probiotic and functional nutrition products.",
          "Developed through controlled cultivation processes to achieve defined microbial characteristics.",
          "Integrates smoothly into capsules, tablets, sachets, stick packs, powder blends, and chewable formats.",
          "Combines efficiently with prebiotics, probiotic blends, postbiotics, vitamins, minerals, and botanical extracts.",
          "Demonstrates strong formulation compatibility across dietary supplements and functional food applications.",
          "Adaptable to synbiotic concepts, fermented nutrition products, and microbiome-focused innovations.",
          "Selected by formulators seeking robust probiotic cultures for specialized nutritional solutions.",
          "Fits commercial product development ranging from daily wellness supplements to advanced nutritional formulations.",
          "Represents a scientifically established microbial ingredient for contemporary probiotic product innovation."
        ]
      },
      {
        name: "Bacillus Coagulans",
        slug: "bacillus-coagulans",
        bullets: [
          "Premium spore-forming probiotic strain manufactured using advanced fermentation technology.",
          "Produced under stringent quality controls to ensure exceptional purity, consistency, and reliability.",
          "Naturally resilient spore-forming structure offers enhanced stability during processing and storage.",
          "Suitable for capsules, tablets, sachets, powder blends, stick packs, and functional beverage applications.",
          "Compatible with multi-strain probiotic, synbiotic, and functional nutrition formulations.",
          "Supplied in moisture-resistant packaging to help maintain product integrity throughout shelf life.",
          "Ideal for nutraceutical, dietary supplement, and functional food product innovations.",
          "Supported by comprehensive technical documentation, including COA, product specifications, and quality certifications upon request."
        ]
      },
      {
        name: "Bacillus Subtilis",
        slug: "bacillus-subtilis",
        bullets: [
          "Spore-forming probiotic microorganism recognized for its durability and formulation versatility.",
          "Cultivated through controlled microbial fermentation to obtain defined biological characteristics.",
          "Features naturally resilient spores designed to withstand challenging manufacturing conditions.",
          "Available in multiple CFU concentrations to accommodate diverse product specifications.",
          "Integrates efficiently into capsules, tablets, sachets, stick packs, powder blends, and chewable formulations.",
          "Combines effectively with prebiotics, additional probiotic cultures, enzymes, vitamins, and mineral complexes.",
          "Demonstrates strong stability across processing, transportation, and extended storage environments.",
          "Selected by formulators developing probiotic supplements, functional foods, and microbiome-focused products.",
          "Suitable for synbiotic concepts, nutritional innovations, and specialized wellness formulations.",
          "Represents a robust microbial ingredient for next-generation probiotic product development."
        ]
      },
      {
        name: "Lactobacillus Brevis",
        slug: "lactobacillus-brevis",
        bullets: [
          "Probiotic bacterial culture developed for dietary supplement and functional nutrition applications.",
          "Cultivated through controlled fermentation to achieve defined microbial characteristics.",
          "Incorporates efficiently into capsules, tablets, sachets, powder blends, stick packs, and beverage mixes.",
          "Combines effectively with prebiotics, additional probiotic strains, postbiotics, and botanical ingredients.",
          "Demonstrates strong adaptability across synbiotic and microbiome-focused product concepts.",
          "Selected for nutritional innovations requiring stable probiotic cultures.",
          "Fits a broad range of wellness, digestive health, and functional food formulations.",
          "Maintains microbial viability under recommended manufacturing and storage conditions."
        ]
      },
      {
        name: "Saccharomyces Cerevisiae",
        slug: "saccharomyces-cerevisiae",
        bullets: [
          "Functional yeast culture utilized across nutraceutical, food, feed, and biotechnology industries.",
          "Produced through carefully managed fermentation to obtain uniform microbial characteristics.",
          "Available in multiple grades and technical specifications for specialized product development.",
          "Integrates seamlessly into nutritional supplements, functional foods, fermentation systems, and yeast-based formulations.",
          "Combines efficiently with probiotics, enzymes, vitamins, minerals, amino acids, and botanical extracts.",
          "Recognized for broad formulation compatibility across diverse manufacturing platforms.",
          "Selected by product developers for nutritional, fermentation, and specialty ingredient applications.",
          "Demonstrates dependable performance throughout commercial production processes.",
          "Suitable for wellness, functional nutrition, and industrial biotechnology concepts.",
          "Represents a well-established yeast ingredient for contemporary formulation and innovation projects."
        ]
      },
      {
        name: "Bacillus Clausii",
        slug: "bacillus-clausii",
        bullets: [
          "Naturally resilient spores provide enhanced stability during processing, storage, and transportation.",
          "Suitable for capsules, tablets, sachets, powder blends, stick packs, and functional beverage applications.",
          "Compatible with multi-strain probiotic, synbiotic, and functional nutrition formulations.",
          "Packaged in moisture-barrier materials to help maintain microbial viability and product integrity.",
          "Ideal for dietary supplements, functional foods, and innovative nutraceutical product development."
        ]
      },
      {
        name: "Bifidobacterium Animalis",
        slug: "bifidobacterium-animalis",
        bullets: [
          "Well-documented probiotic culture incorporated into modern nutritional formulations.",
          "Cultivated under controlled fermentation conditions to achieve defined microbial characteristics.",
          "Integrates efficiently into capsules, tablets, sachets, stick packs, gummies, and powdered supplements.",
          "Combines effectively with prebiotics, probiotic blends, vitamins, minerals, and dietary fibers.",
          "Demonstrates strong formulation compatibility across synbiotic and microbiome-focused products.",
          "Chosen for functional foods, dietary supplements, and daily wellness product concepts.",
          "Maintains microbial activity under recommended manufacturing and storage conditions.",
          "Adaptable to commercial product development across global nutrition markets.",
          "Represents a scientifically established probiotic ingredient for next-generation nutritional innovations."
        ]
      },
      {
        name: "Bifidobacterium Longum",
        slug: "bifidobacterium-longum",
        bullets: [
          "Probiotic microorganism recognized for its application in functional nutrition and dietary supplements.",
          "Developed through precision fermentation to obtain consistent microbial characteristics.",
          "Offered in customized CFU concentrations for diverse formulation objectives.",
          "Blends smoothly with prebiotics, botanical extracts, vitamins, minerals, and complementary probiotic cultures.",
          "Suitable for capsules, tablets, sachets, stick packs, chewables, and powdered formulations.",
          "Demonstrates reliable performance across synbiotic and microbiome-oriented product concepts.",
          "Selected by formulators creating innovative wellness and nutrition solutions.",
          "Accommodates specialized dietary supplement and functional food developments.",
          "Preserves microbial viability under appropriate formulation and storage practices.",
          "Represents a trusted probiotic component for contemporary health-focused product portfolios."
        ]
      },
      {
        name: "Bifidobacterium Infantis",
        slug: "bifidobacterium-infantis",
        bullets: [
          "Premium probiotic strain manufactured through advanced fermentation technology for exceptional quality and consistency.",
          "Supplied in moisture-resistant packaging to help preserve product integrity during storage and transportation."
        ]
      },
      {
        name: "Lactobacillus Bulgaricus",
        slug: "lactobacillus-bulgaricus",
        bullets: [
          "Demonstrates formulation compatibility across synbiotic, fermented food, and microbiome-focused product concepts.",
          "Retains microbial viability under recommended manufacturing, handling, and storage conditions.",
          "Chosen by product developers for functional foods, dietary supplements, and cultured nutrition applications.",
          "Accommodates customized product development for wellness, digestive nutrition, and specialty formulations.",
          "Represents a scientifically recognized probiotic culture for contemporary nutritional innovation."
        ]
      },
      {
        name: "Streptococcus Faecium",
        slug: "streptococcus-faecium",
        bullets: [
          "Integrates smoothly into capsules, tablets, sachets, stick packs, powder blends, and chewable formats.",
          "Combines efficiently with probiotic cultures, prebiotics, postbiotics, vitamins, minerals, and botanical ingredients.",
          "Adapted for dietary supplements, functional foods, synbiotic concepts, and microbiome-focused innovations.",
          "Maintains microbial activity under recommended formulation, handling, and storage conditions.",
          "Chosen by product developers for commercial nutrition and wellness applications.",
          "Fits customized formulation strategies for global nutraceutical and food markets.",
          "Represents a well-characterized probiotic culture for contemporary microbial ingredient development."
        ]
      }
    ]
  },
  "nutraceutical-pharmaceutical-ingredients": {
    title: "Nutraceutical and Pharmaceuticals Ingredients",
    description:
      "Athos Collagen Pvt. Ltd. offers a comprehensive portfolio of premium nutraceutical and pharmaceutical ingredients, sourced and supplied to meet global quality standards. Our range supports dietary supplements, functional foods, pharmaceuticals, and specialized health formulations with consistent quality, purity, and reliability.",
    subProducts: [
      {
        name: "L-Glutathione",
        slug: "l-glutathione",
        bullets: [
          "Premium-quality ingredient developed for advanced nutraceutical and pharmaceutical formulations.",
          "Characterized by exceptional purity and consistent product performance.",
          "Available in customized grades and specifications to suit diverse application requirements.",
          "Easily incorporated into capsules, tablets, sachets, powder blends, and functional beverages.",
          "Demonstrates excellent compatibility with vitamins, minerals, amino acids, collagen, and botanical extracts.",
          "Suitable for innovative wellness, sports nutrition, beauty-from-within, and functional nutrition products.",
          "Manufactured using precision-controlled processing techniques to ensure product consistency.",
          "Supports flexible formulation development for domestic and international markets.",
          "Designed to meet the evolving needs of OEM, private-label, and bulk ingredient buyers.",
          "An excellent choice for premium health and nutrition product development."
        ]
      },
      {
        name: "Chondroitin Sulfate",
        slug: "chondroitin-sulfate",
        bullets: [
          "Carefully refined to deliver exceptional purity and consistent product performance.",
          "Available in customized grades and specifications to meet diverse formulation requirements.",
          "Suitable for capsules, tablets, sachets, powder blends, and functional nutrition products.",
          "Blends efficiently with glucosamine, collagen peptides, MSM, hyaluronic acid, and vitamin complexes.",
          "Ideal for developing innovative wellness, mobility, and sports nutrition formulations.",
          "Manufactured using precision-controlled production processes for dependable quality consistency.",
          "Adaptable for use in dietary supplements, functional foods, and specialized health formulations.",
          "An excellent choice for premium nutritional products designed for global markets."
        ]
      },
      {
        name: "Hyaluronic Acid",
        slug: "hyaluronic-acid",
        bullets: [
          "Premium-quality ingredient designed for advanced nutraceutical and pharmaceutical formulations.",
          "Produced with high purity to ensure consistent quality and dependable performance.",
          "Available in multiple molecular weight options and customized specifications.",
          "Suitable for capsules, tablets, sachets, powder blends, gummies, and functional beverages.",
          "Blends seamlessly with collagen peptides, vitamins, minerals, amino acids, and botanical extracts.",
          "Ideal for beauty nutrition, wellness, functional foods, and innovative dietary supplement applications.",
          "Developed using advanced manufacturing processes to deliver excellent formulation versatility.",
          "Well-suited for premium product development in health, nutrition, and personal wellness categories."
        ]
      },
      {
        name: "Methylsulfonylmethane (MSM)",
        slug: "msm",
        bullets: [
          "Organic sulfur compound developed for advanced nutraceutical and pharmaceutical applications.",
          "Characterized by exceptional purity and consistent performance across diverse formulations.",
          "Available in customized grades and particle sizes to meet specific product development requirements.",
          "Suitable for capsules, tablets, sachets, powder blends, gummies, and functional beverage formulations.",
          "Blends effectively with collagen peptides, glucosamine, chondroitin sulfate, hyaluronic acid, and vitamin complexes.",
          "Designed for innovative wellness, sports nutrition, beauty nutrition, and functional food applications.",
          "Offers excellent formulation versatility for single-ingredient as well as combination products.",
          "Supports OEM, private-label, contract manufacturing, and bulk ingredient supply requirements.",
          "Widely utilized by global manufacturers for premium dietary supplement and health nutrition products.",
          "An ideal ingredient for next-generation nutraceutical innovations requiring reliable quality and formulation flexibility."
        ]
      },
      {
        name: "Glucosamine",
        slug: "glucosamine",
        bullets: [
          "Amino sugar ingredient developed for advanced nutraceutical and pharmaceutical applications.",
          "Manufactured to deliver exceptional purity, consistency, and dependable product performance.",
          "Available in multiple grades and customized specifications to meet diverse formulation requirements.",
          "Suitable for capsules, tablets, sachets, powder blends, gummies, and functional beverage applications.",
          "Blends efficiently with chondroitin sulfate, MSM, collagen peptides, hyaluronic acid, and vitamin complexes.",
          "Ideal for wellness, active lifestyle, sports nutrition, and functional health product development.",
          "Offers excellent formulation compatibility for standalone as well as multi-ingredient nutritional products.",
          "Preferred by global nutraceutical manufacturers for premium dietary supplement formulations.",
          "An excellent choice for innovative health and nutrition products requiring high-quality functional ingredients."
        ]
      },
      {
        name: "Coenzyme Q10",
        slug: "coenzyme-q10",
        bullets: [
          "Premium-quality bioactive ingredient developed for advanced nutraceutical and pharmaceutical formulations.",
          "Produced with exceptional purity to ensure consistent quality and reliable performance.",
          "Available in customized grades and specifications to meet diverse formulation requirements.",
          "Suitable for capsules, tablets, softgels, sachets, powder blends, and functional beverage applications.",
          "Blends efficiently with vitamins, minerals, omega-3 fatty acids, amino acids, and botanical extracts.",
          "Ideal for wellness, active lifestyle, healthy aging, and functional nutrition product development.",
          "Offers excellent formulation versatility for standalone as well as multi-ingredient supplement combinations.",
          "Features excellent dispersibility and compatibility across a wide range of nutritional formulations.",
          "Widely selected by global nutraceutical brands for premium dietary supplement innovations.",
          "An ideal ingredient for developing high-value health and wellness products with superior formulation flexibility."
        ]
      },
      {
        name: "Maltodextrin",
        slug: "maltodextrin",
        bullets: [
          "Produced with high purity to deliver consistent quality and dependable formulation performance.",
          "Available in multiple dextrose equivalent (DE) grades to meet specific product requirements.",
          "Suitable for powder blends, tablets, capsules, sachets, functional beverages, and nutritional products.",
          "Provides excellent solubility, dispersibility, and flow characteristics for efficient processing.",
          "Functions as an ideal carrier, bulking agent, and processing aid in complex formulations.",
          "Compatible with proteins, vitamins, minerals, botanical extracts, amino acids, and functional ingredients.",
          "Widely utilized in sports nutrition, dietary supplements, infant nutrition, and food manufacturing.",
          "Enables smooth blending and uniform distribution across multi-ingredient formulations.",
          "An excellent choice for innovative product development requiring versatility, stability, and consistent performance."
        ]
      },
      {
        name: "Sodium Alginate",
        slug: "sodium-alginate",
        bullets: [
          "Ultra high-quality natural polysaccharide extracted from selected brown seaweed sources.",
          "Produced with exceptional purity to ensure consistent quality and reliable performance.",
          "Available in multiple viscosity grades to suit diverse formulation and processing requirements.",
          "Suitable for nutraceutical, pharmaceutical, food, beverage, and industrial applications.",
          "Delivers excellent thickening, stabilizing, gelling, and film-forming properties.",
          "Compatible with proteins, dietary fibers, botanical extracts, vitamins, minerals, and functional ingredients.",
          "Offers outstanding water-binding capacity for enhanced formulation versatility.",
          "Performs efficiently in capsules, tablets, powders, gels, suspensions, and functional food products.",
          "Preferred by formulators for developing innovative products with superior texture and processing characteristics.",
          "An ideal ingredient for next-generation formulations requiring stability, consistency, and multifunctional performance."
        ]
      },
      {
        name: "Guar Gum",
        slug: "guar-gum",
        bullets: [
          "A natural polysaccharide derived from carefully selected guar beans.",
          "Processed to deliver exceptional purity, consistency, and dependable product performance.",
          "Available in multiple viscosity grades to meet diverse formulation requirements.",
          "Suitable for nutraceutical, pharmaceutical, food, beverage, and industrial applications.",
          "Provides excellent thickening, stabilizing, binding, and emulsifying functionality.",
          "Demonstrates outstanding hydration and water-holding capacity in various formulations.",
          "Compatible with proteins, dietary fibers, botanical extracts, vitamins, minerals, and functional ingredients.",
          "Performs efficiently in tablets, capsules, powder blends, beverages, sauces, and bakery applications.",
          "Favored by formulators for developing products with improved texture, viscosity, and processing efficiency.",
          "An excellent ingredient for innovative formulations requiring multifunctional performance and formulation flexibility."
        ]
      },
      {
        name: "Bovine Colostrum Powder",
        slug: "bovine-colostrum-powder",
        bullets: [
          "Naturally derived dairy ingredient obtained from carefully selected bovine colostrum sources.",
          "Carefully processed to preserve its original nutritional profile and functional characteristics.",
          "Available in customized grades and specifications to suit diverse formulation requirements.",
          "Suitable for dietary supplements, functional foods, sports nutrition, and wellness products.",
          "Blends seamlessly with collagen peptides, proteins, probiotics, vitamins, minerals, and botanical extracts.",
          "Offers excellent dispersibility for efficient incorporation into dry mixes and beverage formulations.",
          "Compatible with capsules, tablets, sachets, stick packs, powder blends, and nutritional drinks.",
          "Widely utilized in advanced nutrition and functional ingredient applications across global markets.",
          "Delivers consistent quality and dependable performance for innovative product development."
        ]
      },
      {
        name: "Agar Agar",
        slug: "agar-agar",
        bullets: [
          "Extracted from selected species of red seaweed.",
          "Renowned for its exceptional gelling, thickening, and stabilizing properties across diverse applications.",
          "Available in multiple grades and customized specifications to meet formulation requirements.",
          "Suitable for nutraceutical, pharmaceutical, food, beverage, and specialty industrial products.",
          "Delivers excellent water-binding capacity and outstanding gel strength.",
          "Integrates efficiently with proteins, dietary fibers, plant extracts, vitamins, and functional ingredients.",
          "Ideal for capsules, gummies, desserts, confectionery, dairy alternatives, and powdered formulations.",
          "Offers excellent thermal stability and reliable performance during processing.",
          "Widely utilized by formulators for developing innovative products with superior texture and consistency.",
          "An excellent ingredient for next-generation formulations requiring versatility, functionality, and dependable performance."
        ]
      },
      {
        name: "Pectin",
        slug: "pectin",
        bullets: [
          "Widely recognized for its outstanding gelling, thickening, and stabilizing functionality.",
          "Available in multiple grades and customized specifications to suit diverse formulation requirements.",
          "Suitable for nutraceutical, pharmaceutical, food, beverage, and confectionery applications.",
          "Provides excellent texture, consistency, and moisture retention in finished products.",
          "Blends efficiently with dietary fibers, proteins, botanical extracts, vitamins, and functional ingredients.",
          "Ideal for gummies, jams, jellies, fruit preparations, beverages, capsules, and powdered formulations.",
          "Delivers reliable processing performance across a wide range of manufacturing conditions.",
          "Preferred by product developers for creating clean-label and plant-based formulations.",
          "An excellent ingredient for innovative applications requiring versatility, stability, and superior functionality."
        ]
      },
      {
        name: "Lecithin",
        slug: "lecithin",
        bullets: [
          "Multifunctional phospholipid ingredient valued for advanced formulation applications.",
          "Enhances emulsification and promotes uniform ingredient dispersion.",
          "Offered in liquid, powder, and granule variants for manufacturing flexibility.",
          "Supports stable incorporation of oil- and water-based components.",
          "Compatible with nutraceutical, pharmaceutical, food, beverage, and cosmetic formulations.",
          "Performs efficiently across tablets, capsules, instant powders, softgels, chocolates, and bakery systems.",
          "Contributes to improved processing efficiency during blending and production.",
          "Selected by formulators for complex nutritional and functional ingredient combinations.",
          "Adaptable to diverse product development strategies across global industries.",
          "Delivers dependable functionality for high-performance formulation requirements."
        ]
      },
      {
        name: "Sodium Caseinate",
        slug: "sodium-caseinate",
        bullets: [
          "Milk-derived protein ingredient recognized for its outstanding functional performance in nutritional formulations.",
          "Delivers excellent emulsification properties for stable and homogeneous product development.",
          "Exhibits high solubility, enabling smooth incorporation into a variety of liquid and powdered systems.",
          "Available in tailored specifications to accommodate diverse manufacturing requirements.",
          "Compatible with protein blends, vitamins, minerals, collagen peptides, and functional ingredients.",
          "Performs effectively in sports nutrition, meal replacement, dairy, bakery, beverage, and nutraceutical applications.",
          "Contributes to improved texture, mouthfeel, and consistency in finished formulations.",
          "Designed for seamless integration into capsules, sachets, powder blends, ready-to-mix products, and nutritional beverages.",
          "Preferred by product developers seeking reliable performance across complex formulation matrices.",
          "A versatile functional ingredient supporting innovative food, nutrition, and health product development."
        ]
      },
      {
        name: "Microcrystalline Cellulose",
        slug: "microcrystalline-cellulose",
        bullets: [
          "Highly refined cellulose ingredient engineered for superior formulation performance.",
          "Recognized for its exceptional binding and compressibility characteristics in solid dosage forms.",
          "Available in multiple particle sizes and grades to accommodate diverse processing requirements.",
          "Enables efficient tablet compression with excellent flow and uniformity.",
          "Integrates effectively with vitamins, minerals, botanical extracts, amino acids, and functional ingredients.",
          "Applicable across nutraceutical, pharmaceutical, food, and specialty formulation developments.",
          "Supports consistent blend homogeneity for enhanced manufacturing efficiency.",
          "Performs reliably in tablets, capsules, powder blends, sachets, and dry granulation systems.",
          "Selected by formulators for its versatility, stability, and processing advantages.",
          "An indispensable excipient for modern product development requiring precision, consistency, and dependable functionality."
        ]
      }
    ]
  },
  "animal-nutrition": {
    title: "Animal Nutrition",
    description:
      "Athos offers a comprehensive range of functional ingredients designed for modern animal nutrition applications. Our portfolio supports feed manufacturers, premix companies, and animal health businesses with reliable nutritional solutions focused on quality, consistency, and formulation flexibility.",
    subProducts: [
      {
        name: "Sodium Butyrate",
        slug: "sodium-butyrate",
        bullets: [
          "Short-chain fatty acid salt developed for advanced animal nutrition and feed formulation applications.",
          "Provides a stable source of butyric acid for functional feed solutions.",
          "Designed to support innovative livestock, poultry, and aquaculture nutrition programs.",
          "Available in customized specifications to meet different feed industry requirements.",
          "Compatible with premixes, compound feeds, concentrates, and specialty nutritional blends.",
          "Offers excellent handling properties for convenient incorporation into feed formulations.",
          "Manufactured with controlled processing techniques to ensure consistent product characteristics.",
          "Suitable for integration with probiotics, enzymes, vitamins, minerals, and other feed additives.",
          "Used by nutrition formulators developing performance-oriented animal feed solutions.",
          "A versatile ingredient for modern feed strategies requiring reliable functionality and formulation flexibility."
        ]
      },
      {
        name: "Calcium Butyrate",
        slug: "calcium-butyrate",
        bullets: [
          "Organic acid salt ingredient developed for advanced animal nutrition and feed additive applications.",
          "Convenient source of butyric acid in nutritional formulations.",
          "Designed for incorporation into poultry, livestock, aquaculture, and specialty feed programs.",
          "Available in customized specifications to match diverse feed manufacturing requirements.",
          "Compatible with premixes, compound feeds, concentrates, and functional feed blends.",
          "Offers excellent stability and handling characteristics during storage and processing.",
          "Integrates effectively with probiotics, enzymes, minerals, vitamins, and other nutritional additives.",
          "Utilized by feed formulators seeking reliable functional ingredients for modern animal diets.",
          "Enables flexible development of innovative feed solutions across different animal nutrition segments.",
          "A versatile calcium-based additive for advanced formulation strategies in the global feed industry."
        ]
      },
      {
        name: "Mannan Oligosaccharide",
        slug: "mannan-oligosaccharide",
        bullets: [
          "Functional prebiotic ingredient derived from specialized yeast-based sources for animal nutrition applications.",
          "Designed for inclusion in advanced feed formulations for poultry, livestock, aquaculture, and companion animals.",
          "Offers excellent compatibility with probiotics, enzymes, organic acids, vitamins, and mineral blends.",
          "Available in customized specifications to meet different feed formulation requirements.",
          "Easily incorporated into premixes, compound feeds, concentrates, and nutritional supplements.",
          "Provides valuable functional properties for modern animal feed development strategies.",
          "Demonstrates strong formulation stability across diverse feed processing conditions.",
          "Enables the creation of innovative nutritional programs focused on animal performance and feed efficiency.",
          "Selected by feed manufacturers for its versatility and compatibility with multi-ingredient solutions.",
          "An important functional component for next-generation animal nutrition formulations."
        ]
      },
      {
        name: "Amino Chelated Minerals",
        slug: "amino-chelated-minerals",
        bullets: [
          "Advanced mineral complex designed for modern animal nutrition and feed formulation applications.",
          "Combines essential minerals with amino acids to create highly functional nutritional compounds.",
          "Available in customized mineral combinations including zinc, iron, copper, manganese, and other trace elements.",
          "Developed for incorporation into poultry, livestock, aquaculture, and specialty animal feed programs.",
          "Offers excellent compatibility with premixes, concentrates, mineral mixtures, and complete feed systems.",
          "Improved formulation flexibility compared with conventional mineral sources.",
          "Suitable for integration with vitamins, enzymes, probiotics, organic acids, and other feed additives.",
          "Designed to meet the evolving requirements of precision animal nutrition programs.",
          "Enables formulators to develop balanced feed solutions with consistent mineral delivery.",
          "A versatile ingredient category for innovative animal health and nutrition product development."
        ]
      },
      {
        name: "Sodium Propionate",
        slug: "sodium-propionate",
        bullets: [
          "Organic acid salt ingredient developed for animal nutrition and feed preservation applications.",
          "Effective functional properties in modern feed formulation systems.",
          "Available in consistent specifications to meet diverse livestock and feed industry requirements.",
          "Suitable for poultry, cattle, aquaculture, and specialty animal nutrition programs.",
          "Easily incorporated into premixes, compound feeds, concentrates, and nutritional blends.",
          "Offers excellent processing compatibility across various feed manufacturing conditions.",
          "Works efficiently alongside probiotics, enzymes, vitamins, minerals, and other functional additives.",
          "Designed for formulators seeking reliable solutions for advanced feed development.",
          "Contributes to improved formulation stability and overall feed quality management.",
          "A versatile ingredient for innovative animal nutrition strategies and functional feed applications."
        ]
      },
      {
        name: "Calcium Propionate",
        slug: "calcium-propionate",
        bullets: [
          "Calcium-based feed additive developed for modern animal nutrition applications.",
          "A reliable source of propionate functionality in livestock and poultry feed systems.",
          "Manufactured in different grades to meet varied requirements of feed manufacturers.",
          "Incorporated into compound feeds, premixes, concentrates, and nutritional blends.",
          "Compatible with enzymes, probiotics, trace minerals, vitamins, and other feed components.",
          "Offers good handling characteristics for efficient processing and feed preparation.",
          "Used across poultry, dairy, cattle, aquaculture, and other animal nutrition segments.",
          "Helps formulators create balanced feed programs with functional additive solutions.",
          "Designed for integration into commercial feed production and specialty nutrition products.",
          "Delivers dependable performance for manufacturers developing animal nutrition solutions."
        ]
      },
      {
        name: "Protein Hydrolysate",
        slug: "protein-hydrolysate",
        bullets: [
          "Enzymatically processed protein ingredient designed for advanced nutrition applications.",
          "Contains smaller peptide fractions that enhance formulation versatility across multiple product categories.",
          "Available from different protein sources including marine, dairy, plant, and animal origins.",
          "Manufactured with controlled hydrolysis processes to achieve desired peptide profiles.",
          "Used in sports nutrition, dietary supplements, functional foods, and animal feed formulations.",
          "Blends efficiently with amino acids, collagen peptides, vitamins, minerals, and botanical ingredients.",
          "Offered in customized specifications including protein content, solubility, and peptide distribution.",
          "Suitable for powders, beverages, capsules, tablets, and specialized nutritional products.",
          "Selected by formulators for developing targeted protein-based nutrition solutions.",
          "Provides a reliable foundation for creating next-generation nutritional formulations."
        ]
      },
      {
        name: "Active Dry Yeast",
        slug: "active-dry-yeast",
        bullets: [
          "Dehydrated yeast ingredient produced through controlled fermentation processes for nutritional applications.",
          "Contains naturally occurring yeast cells preserved in a stable dry form for convenient handling.",
          "Available in different specifications to meet food, feed, and nutritional formulation requirements.",
          "Designed for incorporation into animal feed, bakery, fermentation, and specialty nutrition products.",
          "Provides functional yeast characteristics for diverse formulation and processing needs.",
          "Compatible with enzymes, probiotics, minerals, vitamins, and other nutritional additives.",
          "Maintains good storage stability when handled under recommended conditions.",
          "Suitable for powders, premixes, feed blends, and nutritional supplement applications.",
          "Used by formulators developing yeast-based solutions across multiple industry segments.",
          "Delivers reliable performance for manufacturers seeking functional fermentation-derived ingredients."
        ]
      }
    ]
  },
  "extract-and-essential-oils": {
    title: "Extract and Essential Oils",
    description:
      "Our high-purity SCFE plant extracts, oleoresins, and pure essential oils are derived using advanced Supercritical Fluid Extraction technologies. Formulated for pharmaceutical, cosmetic, nutraceutical, and therapeutic applications, these products ensure maximum biological potency, purity, and active botanical benefits.",
    subProducts: [
      { name: "SCFE Black Pepper Oleoresin", slug: "scfe-black-pepper-oleoresin", bullets: ["Standardization: 65% Piperine", "Extracted via solvent-free Supercritical Fluid Extraction (SCFE)", "Delivers intense pungent aroma and active piperine bioactivity", "Used in pharmaceutical, spice, and digestive health formulations"] },
      { name: "Piperine", slug: "piperine", bullets: ["Standardization: 95% Piperine", "High purity natural alkaloid refined from black pepper", "Significantly enhances bioavailability of vitamins and active nutraceuticals", "Widely incorporated in health supplements and therapeutic formulations"] },
      { name: "SCFE Ginger Oleoresin", slug: "scfe-ginger-oleoresin", bullets: ["Standardization: 20% Total Gingerols, 30% Total Gingerols, 40% Total Gingerols", "Pure concentrated ginger oleoresin with customizable active strengths", "Promotes gastrointestinal motility, anti-nausea, and immune support", "Ideal for food, beverage, and nutraceutical applications"] },
      { name: "Ginger Extract Granules", slug: "ginger-extract-granules", bullets: ["Standardization: 5% Total Gingerols, 10% Total Gingerols, 15% Total Gingerols", "Free-flowing granular powder for convenient compression and blending", "Retains natural ginger flavor profile and active bioactive compounds", "Suitable for tablets, capsules, and instant beverage mixes"] },
      { name: "SCFE Vanilla Extract", slug: "scfe-vanilla-extract", bullets: ["Standardization: 6% Vanillin, 12% Vanillin, 26% Vanillin", "Premium vanilla extract produced using gentle SCFE technology", "Preserves delicate aromatic notes without synthetic solvent residues", "Used in high-grade confectionery, cosmetics, and health products"] },
      { name: "SCFE Holy Basil Oleoresin", slug: "scfe-holy-basil-oleoresin", bullets: ["Standardization: 2% Ursolic Acid", "Rich in adaptogenic compounds from Tulsi (Holy Basil)", "Supports natural stress response, cellular wellness, and metabolic balance", "Ideal for dietary supplements and holistic health preparations"] },
      { name: "SCFE Seabuckthorn Oil", slug: "scfe-seabuckthorn-oil", bullets: ["Standardization: 30% Omega 7 (Palmitoleic Acid)", "Rich source of rare Omega-7 fatty acids, antioxidants, and carotenoids", "Promotes skin elasticity, mucosal health, and cardiovascular resilience", "Extensively utilized in cosmetic, dermatological, and nutraceutical products"] },
    ]
  }
};

const ProductCategory = () => {
  const { categoryKey: rawCategoryKey } = useParams<{ categoryKey: string }>();
  const { t } = useTranslation();
  const location = useLocation();
  const categoryKey = rawCategoryKey || "enzymes";
  const category = productCategoryData[categoryKey];

  const [activeSub, setActiveSub] = useState<string>("");
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollTime = useRef<number>(0);

  useEffect(() => {
    document.title = category ? `${category.title} - Athos Collagen Pvt. Ltd` : 'Products - Athos Collagen Pvt. Ltd';
  }, [category]);

  // Sync hash changes and initialize starting active index/subproduct
  useEffect(() => {
    if (!category) return;
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const cleanHash = hash.replace("#", "");
        const idx = category.subProducts.findIndex((sub) => sub.slug === cleanHash);
        if (idx !== -1) {
          setActiveIdx(idx);
          setActiveSub(cleanHash);
        } else {
          setActiveIdx(0);
          if (category.subProducts.length > 0) {
            const fallbackSlug = category.subProducts[0].slug;
            setActiveSub(fallbackSlug);
            window.history.replaceState(null, "", `#${fallbackSlug}`);
          }
        }
      } else {
        setActiveIdx(0);
        if (category.subProducts.length > 0) {
          setActiveSub(category.subProducts[0].slug);
        }
      }
    };

    handleHashScroll();

    window.addEventListener("hashchange", handleHashScroll);
    return () => {
      window.removeEventListener("hashchange", handleHashScroll);
    };
  }, [categoryKey, category, location.hash]);

  // Native wheel scroll listener for responsive desktop layout switcher
  useEffect(() => {
    if (!category) return;
    const container = containerRef.current;
    if (!container) return;

    const handleNativeWheel = (e: WheelEvent) => {
      if (window.innerWidth < 1024) return;

      const now = Date.now();
      if (now - lastScrollTime.current < 700) {
        e.preventDefault();
        return;
      }

      const direction = e.deltaY;
      if (direction > 0) {
        if (activeIdx < category.subProducts.length - 1) {
          e.preventDefault();
          lastScrollTime.current = now;
          setActiveIdx((prev) => {
            const nextIdx = prev + 1;
            const nextSlug = category.subProducts[nextIdx].slug;
            setActiveSub(nextSlug);
            window.history.replaceState(null, "", `#${nextSlug}`);
            return nextIdx;
          });
        }
      } else if (direction < 0) {
        if (activeIdx > 0) {
          e.preventDefault();
          lastScrollTime.current = now;
          setActiveIdx((prev) => {
            const prevIdx = prev - 1;
            const prevSlug = category.subProducts[prevIdx].slug;
            setActiveSub(prevSlug);
            window.history.replaceState(null, "", `#${prevSlug}`);
            return prevIdx;
          });
        }
      }
    };

    container.addEventListener("wheel", handleNativeWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleNativeWheel);
    };
  }, [activeIdx, category, categoryKey]);

  const handleNavClick = (slug: string, index: number) => {
    setActiveSub(slug);
    setActiveIdx(index);
    window.history.replaceState(null, "", `#${slug}`);
  };

  if (!category) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background overflow-hidden">
      <Navbar />

      <main className="flex-1 mt-20">
        {/* Content Section */}
        <section ref={containerRef} className="py-12 bg-white lg:py-0 lg:h-[calc(100vh-110px)] lg:flex lg:items-center">
          <div className="container mx-auto  px-4 lg:px-10 xl:px-32 w-full">

            {/* Desktop / Laptop Layout: Side Navigation + Single Active Details */}
            <div className="hidden lg:flex gap-16 items-start relative w-full">

              {/* Sticky Sidebar Navigation */}
              <div className="w-[240px] shrink-0 sticky top-[110px] max-h-[calc(100vh-140px)] overflow-y-auto pr-3 custom-scrollbar">
                <nav className="flex flex-col space-y-1.5 py-1">
                  {category.subProducts.map((sub, idx) => {
                    const isSelected = activeSub === sub.slug;
                    return (
                      <button
                        key={sub.slug}
                        onClick={() => handleNavClick(sub.slug, idx)}
                        className={`text-left py-[1px] text-[15px] leading-tight font-medium transition-all ${isSelected
                          ? "text-[#6ABF00] font-semibold"
                          : "text-[#555555] hover:text-[#6ABF00]"
                          }`}
                      >
                        {sub.name}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Single Active Subproduct Detail view */}
              <div className="flex-1 min-h-[400px]">
                {category.subProducts[activeIdx] && (
                  <div
                    key={category.subProducts[activeIdx].slug}
                    className="animate-fade-in py-0"
                  >
                    <h2 className="text-[32px] font-semibold text-[#6ABF00] mb-6 pb-2 border-b border-gray-100">
                      {category.subProducts[activeIdx].name}
                    </h2>

                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:md:grid-cols-1 gap-x-8 gap-y-4">
                      {category.subProducts[activeIdx].bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-[#555555]">
                          <span className="text-[#6ABF00] mt-1.5 text-[12px] flex-shrink-0">▲</span>
                          <span className="text-[16px] leading-[1.6]">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile / Tablet Layout: Cards */}
            <div className="lg:hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.subProducts.map((sub) => (
                  <div
                    key={sub.slug}
                    className="bg-white border border-[#E9ECEF] rounded-[16px] p-6 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <h2 className="text-[22px] font-bold text-[#6ABF00] mb-4 pb-2 border-b border-gray-100">
                        {sub.name}
                      </h2>
                      <ul className="space-y-3">
                        {sub.bullets.map((bullet, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-[#555555]">
                            <span className="text-[#6ABF00] mt-1 text-[10px] flex-shrink-0">▲</span>
                            <span className="text-[14px] leading-[1.4]">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>
      </main>

      <ContactTeaser />
      <Footer />
    </div>
  );
};

export default ProductCategory;

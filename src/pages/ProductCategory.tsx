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
        name: "Bromelain",
        slug: "bromelain",
        bullets: [
          "Facilitates natural protein breakdown and digestion",
          "Helps support healthy inflammatory responses",
          "Aids in tissue recovery and comfort",
          "Enhances enzymatic activity in dietary supplements",
          "Provides versatile uses in health and nutrition formulations"
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
      "Our probiotic and fermentation ingredients are scientifically cultured and prepared to support digestive wellness, immune responses, and industrial biological production. Athos Collagen Pvt. Ltd. provides consistent, highly active microbial and yeast-derived cultures suitable for health formulations.",
    subProducts: [
      { name: "Malt Extract", slug: "malt-extract", bullets: ["Serves as a rich nitrogen and carbohydrate source", "Supports microbial culture growth in biological settings", "Offers consistent composition for fermentation processes"] },
      { name: "Yeast Extract", slug: "yeast-extract", bullets: ["Provides essential B-vitamins and amino acids", "Accelerates fermentation rates in industrial cultures", "Promotes cell viability and high-yield biological production"] },
      { name: "Liver Extract", slug: "liver-extract", bullets: ["Supplies growth factors and vitamins", "Supports specific microorganism cultivation", "Enhances nutritional availability in biological media"] },
      { name: "Meat Extract", slug: "meat-extract", bullets: ["Offers organic nitrogen compounds and mineral salts", "Provides stable nutrient profile for cell cultures", "Aids in standard microbiological investigations"] },
      { name: "Lactobacillus Buchneri", slug: "lactobacillus-buchneri", bullets: ["Supports organic acid production", "Aids silage preservation and fermentation efficiency", "Promotes microflora balance in metabolic formulations"] },
      { name: "Streptococcus Thermophilus", slug: "streptococcus-thermophilus", bullets: ["Supports lactic acid production in dairy formulations", "Enhances gastrointestinal health profiles", "Enables consistent yogurt and cheese manufacturing"] },
      { name: "Lactobacillus Casei", slug: "lactobacillus-casei", bullets: ["Promotes digestive enzyme balance", "Supports immune system health", "Enhances microflora populations in gut health products"] },
      { name: "Bifidobacterium Adolescentis", slug: "bifidobacterium-adolescentis", bullets: ["Supports metabolic balance and digestive comfort", "Produces short-chain fatty acids", "Aids in intestinal mucosal defense"] },
      { name: "Enterococcus Faecium", slug: "enterococcus-faecium", bullets: ["Promotes gut microflora balance", "Enhances intestinal barrier function", "Supports overall livestock and pet health"] },
      { name: "Pediococcus Acidilactici", slug: "pediococcus-acidilactici", bullets: ["Supports lactic acid fermentation", "Enhances feed preservation", "Promotes gut health stability"] },
      { name: "Bacillus Coagulans", slug: "bacillus-coagulans", bullets: ["Provides spore-forming stability for digestive supplements", "Survives harsh stomach acid environments", "Supports gut health and digestive comfort"] },
      { name: "Bacillus Subtilis", slug: "bacillus-subtilis", bullets: ["Produces beneficial enzymes for nutrient breakdown", "Promotes balanced intestinal microflora", "Supports robust immune health"] },
      { name: "Lactobacillus Brevis", slug: "lactobacillus-brevis", bullets: ["Produces GABA and organic acids", "Supports immune and gut health", "Enhances fermentation profiles"] },
      { name: "Saccharomyces Cerevisiae", slug: "saccharomyces-cerevisiae", bullets: ["Provides rich source of B-complex vitamins", "Supports gut fermentation and digestion", "Enhances livestock feed efficiency"] },
      { name: "Bacillus Clausii", slug: "bacillus-clausii", bullets: ["Survives gastric acidity to reach the gut", "Helps restore intestinal flora balance", "Supports immune system defenses"] },
      { name: "Bifidobacterium Animalis", slug: "bifidobacterium-animalis", bullets: ["Supports colonic fermentation", "Aids in bowel regularity and digestive comfort", "Promotes immune system function"] },
      { name: "Bifidobacterium Longum", slug: "bifidobacterium-longum", bullets: ["Assists in maintaining gut barrier integrity", "Supports immune system modulation", "Aids in reducing digestive stress"] },
      { name: "Bifidobacterium Infantis", slug: "bifidobacterium-infantis", bullets: ["Supports infant and adult intestinal health", "Aids in carbohydrate digestion", "Promotes protective microflora balance"] },
      { name: "Lactobacillus Bulgaricus", slug: "lactobacillus-bulgaricus", bullets: ["Supports lactic acid fermentation in dairy", "Promotes gut digestion and lactose tolerance", "Enhances dairy product texture and flavor"] },
      { name: "Streptococcus Faecium", slug: "streptococcus-faecium", bullets: ["Aids in maintaining gut bacterial balance", "Supports overall gastrointestinal health", "Enhances microbial fermentation efficiency"] }
    ]
  },
  "nutraceutical-pharmaceutical-ingredients": {
    title: "Nutraceutical and Pharmaceutical Ingredients",
    description:
      "We deliver high-purity bioactive ingredients that provide targeted health support. These nutraceutical compounds are designed for bone, joint, skin, and metabolic formulations, ensuring compliance with globally accepted safety standards.",
    subProducts: [
      { name: "L-Glutathione", slug: "l-glutathione", bullets: ["Acts as a powerful cellular antioxidant", "Supports detoxification pathways within the body", "Contributes to skin brightness and texture formulations"] },
      { name: "Chondroitin Sulfate", slug: "chondroitin-sulfate", bullets: ["Promotes joint fluid retention and lubrication", "Supports structural cartilage health and resilience", "Enables effective bone-and-joint health supplements"] },
      { name: "Hyaluronic Acid", slug: "hyaluronic-acid", bullets: ["Enhances hydration retention in tissues and skin", "Supports joint lubrication and cartilage function", "Provides key hydration benefits in cosmetic and health formulas"] },
      { name: "Methylsulfonylmethane (MSM)", slug: "msm", bullets: ["Supplies organic sulfur for tissue maintenance", "Supports joint comfort and mobility profiles", "Aids in reducing cellular oxidative stress responses"] },
      { name: "Glucosamine", slug: "glucosamine", bullets: ["Supports cartilage repair and maintenance", "Promotes joint flexibility and mobility", "Aids in reducing joint discomfort"] },
      { name: "Coenzyme Q10", slug: "coenzyme-q10", bullets: ["Supports cellular energy production (ATP)", "Acts as a potent lipid antioxidant", "Promotes cardiovascular and vascular health"] },
      { name: "Maltodextrin", slug: "maltodextrin", bullets: ["Provides easily digestible complex carbohydrates", "Acts as a versatile carrier and binder in supplements", "Enhances solubility in powdered drink mixes"] },
      { name: "Sodium Alginate", slug: "sodium-alginate", bullets: ["Provides effective gelling and thickening properties", "Supports gastroprotective raft-forming formulations", "Aids controlled-release drug delivery systems"] },
      { name: "Guar Gum", slug: "guar-gum", bullets: ["Acts as a natural dietary fiber and thickener", "Supports digestive regularity and gut health", "Enhances viscosity in liquid formulations"] },
      { name: "Bovine Colostrum Powder", slug: "bovine-colostrum-powder", bullets: ["Rich in immunoglobulins (IgG) and growth factors", "Supports gut mucosal lining integrity", "Promotes immune system resilience"] },
      { name: "Agar Agar", slug: "agar-agar", bullets: ["Provides strong plant-based gelling properties", "Acts as a stabilizer in microbiological media and foods", "Offers clean-label vegetarian gelatin alternative"] },
      { name: "Pectin", slug: "pectin", bullets: ["Acts as a natural soluble fiber and gelling agent", "Supports digestive health and gut motility", "Enables production of gummies and chewables"] },
      { name: "Lecithin", slug: "lecithin", bullets: ["Provides essential phospholipids (phosphatidylcholine)", "Supports brain and liver metabolic health", "Acts as a natural emulsifier in liquid and capsule formulations"] },
      { name: "Sodium Caseinate", slug: "sodium-caseinate", bullets: ["High-quality milk protein isolate", "Provides excellent emulsification and binding", "Supports nutritional powder formulations"] },
      { name: "Microcrystalline Cellulose", slug: "microcrystalline-cellulose", bullets: ["Acts as a widely used tablet binder and diluent", "Provides compressibility in capsule and tablet manufacturing", "Ensures consistent dosage form stability"] }
    ]
  },
  "animal-nutrition": {
    title: "Animal Nutrition",
    description:
      "Designed specifically for agricultural, veterinary, and livestock applications, our animal nutrition products promote intestinal health, feed absorption, and metabolic resilience across various animal species.",
    subProducts: [
      { name: "Sodium Butyrate", slug: "sodium-butyrate", bullets: ["Supports gut mucosal structure and integrity", "Enhances feed digestion and absorption efficiency", "Aids in stabilizing intestinal microflora populations"] },
      { name: "Calcium Butyrate", slug: "calcium-butyrate", bullets: ["Delivers highly bioavailable calcium and butyrate", "Promotes skeletal and digestive development", "Supports immune defense systems in growing livestock"] },
      { name: "Mannan Oligosaccharide", slug: "mannan-oligosaccharide", bullets: ["Aids in binding and flushing harmful gut pathogens", "Supports natural immune responses in animals", "Enhances overall intestinal health and growth performance"] },
      { name: "Amino Chelated Minerals", slug: "amino-chelated-minerals", bullets: ["Provides highly absorbable chelated mineral complexes", "Enhances metabolic bio-availability", "Supports immune and reproductive health in livestock"] },
      { name: "Sodium Propionate", slug: "sodium-propionate", bullets: ["Acts as an effective antifungal and feed preservative", "Provides readily available gluconeogenic energy", "Helps prevent ketosis in ruminants"] },
      { name: "Calcium Propionate", slug: "calcium-propionate", bullets: ["Supplies bioavailable calcium and propionate energy", "Inhibits mold growth in feed formulations", "Supports metabolic health in dairy cattle"] },
      { name: "Protein Hydrolysate", slug: "protein-hydrolysate", bullets: ["Delivers easily digestible amino acids and peptides", "Supports animal growth and muscle development", "Enhances feed palatability and intake"] },
      { name: "Active Dry Yeast", slug: "active-dry-yeast", bullets: ["Promotes rumen fiber digestion and fermentation", "Stabilizes rumen pH and microflora balance", "Enhances overall animal performance and feed efficiency"] }
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
          <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 w-full">

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

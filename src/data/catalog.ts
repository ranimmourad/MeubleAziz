// Catalog data for MEUBLE AZIZ
// This acts as the default seed data. The admin dashboard can override it
// via localStorage. Structured to map cleanly onto Supabase tables later.

export type Category = {
  id: string;
  slug: string;
  name: string;
  image: string;
};

export type Product = {
  id: string;
  title: string;
  categorySlug: string;
  price: number; // in TND
  description: string;
  images: string[];
  specs: { label: string; value: string }[];
  featured?: boolean;
};

export const categories: Category[] = [
  { id: "c1", slug: "meubles-tv", name: "Meubles TV", image: "/images/products/meuble-tv-marbre-blanc.jpg" },
  { id: "c2", slug: "cuisines", name: "Cuisines", image: "/images/products/cuisine-beige-moderne.jpg" },
  { id: "c3", slug: "dressings", name: "Dressings", image: "/images/products/dressing-bois-verre.jpg" },
  { id: "c4", slug: "coiffeuses", name: "Coiffeuses", image: "/images/products/coiffeuse-ronde-led.jpg" },
  { id: "c5", slug: "chambres", name: "Chambres", image: "/images/products/chambre-dressing-chene.jpg" },
  { id: "c6", slug: "meubles-muraux", name: "Meubles muraux", image: "/images/products/etageres-murales-chene.jpg" },
  { id: "c7", slug: "rangements", name: "Rangements", image: "/images/products/bibliotheque-bois.jpg" },
];

export const products: Product[] = [
  {
    id: "p1",
    title: "Meuble TV Marbre & Bois Cannelé",
    categorySlug: "meubles-tv",
    price: 2450,
    description:
      "Meuble TV mural moderne associant un panneau en marbre clair veiné d'or à des lattes de bois cannelé. Caisson suspendu pour un rendu épuré et contemporain.",
    images: ["/images/products/meuble-tv-marbre-blanc.jpg", "/images/products/meuble-tv-marbre-bois.jpg"],
    specs: [
      { label: "Matériau", value: "MDF laqué, placage marbre, bois cannelé" },
      { label: "Montage", value: "Mural suspendu" },
      { label: "Fabrication", value: "Sur mesure" },
    ],
    featured: true,
  },
  {
    id: "p2",
    title: "Meuble TV Gris Mural avec Étagère",
    categorySlug: "meubles-tv",
    price: 1980,
    description:
      "Ensemble mural TV gris anthracite avec colonne de rangement et étagère murale assortie. Lignes nettes et finition mate élégante.",
    images: ["/images/products/meuble-tv-gris.jpg"],
    specs: [
      { label: "Matériau", value: "MDF finition mate" },
      { label: "Couleur", value: "Gris anthracite" },
      { label: "Fabrication", value: "Sur mesure" },
    ],
    featured: true,
  },
  {
    id: "p3",
    title: "Meuble TV Bois & Lattes Verticales",
    categorySlug: "meubles-tv",
    price: 2200,
    description:
      "Panneau TV en bois avec habillage de lattes verticales et caisson bas suspendu. Apporte chaleur et caractère au salon.",
    images: ["/images/products/meuble-tv-bois-slat.jpg"],
    specs: [
      { label: "Matériau", value: "Placage bois, lattes massives" },
      { label: "Montage", value: "Mural" },
      { label: "Fabrication", value: "Sur mesure" },
    ],
  },
  {
    id: "p4",
    title: "Meuble TV Blanc Suspendu",
    categorySlug: "meubles-tv",
    price: 1450,
    description:
      "Meuble TV blanc laqué suspendu avec colonne d'étagères ouvertes. Solution compacte et lumineuse pour les petits espaces.",
    images: ["/images/products/meuble-tv-blanc.jpg"],
    specs: [
      { label: "Matériau", value: "MDF laqué blanc" },
      { label: "Montage", value: "Mural suspendu" },
      { label: "Fabrication", value: "Sur mesure" },
    ],
  },
  {
    id: "p5",
    title: "Habillage Mural TV Marbre & Bois",
    categorySlug: "meubles-tv",
    price: 2750,
    description:
      "Habillage mural complet pour TV combinant marbre clair et panneau de bois cannelé avec caisson bas en bois suspendu.",
    images: ["/images/products/meuble-tv-marbre-bois.jpg"],
    specs: [
      { label: "Matériau", value: "Marbre, bois cannelé" },
      { label: "Montage", value: "Mural" },
      { label: "Fabrication", value: "Sur mesure" },
    ],
  },
  {
    id: "p6",
    title: "Cuisine Beige Moderne en L",
    categorySlug: "cuisines",
    price: 6800,
    description:
      "Cuisine sur mesure en L avec façades beige brillant, colonnes hautes et plan de travail en quartz. Optimisation maximale de l'espace.",
    images: ["/images/products/cuisine-beige-moderne.jpg"],
    specs: [
      { label: "Configuration", value: "Cuisine en L" },
      { label: "Façades", value: "Laqué beige brillant" },
      { label: "Fabrication", value: "Sur mesure" },
    ],
    featured: true,
  },
  {
    id: "p7",
    title: "Cuisine Bois Naturel",
    categorySlug: "cuisines",
    price: 5900,
    description:
      "Cuisine moderne aux façades en bois naturel veiné, poignées noires et plan de travail blanc. Ambiance chaleureuse et contemporaine.",
    images: ["/images/products/cuisine-bois-moderne.jpg"],
    specs: [
      { label: "Façades", value: "Placage bois naturel" },
      { label: "Poignées", value: "Noir mat" },
      { label: "Fabrication", value: "Sur mesure" },
    ],
  },
  {
    id: "p8",
    title: "Dressing Bois & Portes Vitrées",
    categorySlug: "dressings",
    price: 3600,
    description:
      "Dressing intégré en bois avec portes battantes et vitrine centrale à cadre noir et éclairage LED intérieur. Élégance et fonctionnalité.",
    images: ["/images/products/dressing-bois-verre.jpg"],
    specs: [
      { label: "Matériau", value: "Placage bois, cadre métal noir" },
      { label: "Éclairage", value: "LED intégré" },
      { label: "Fabrication", value: "Sur mesure" },
    ],
    featured: true,
  },
  {
    id: "p9",
    title: "Coiffeuse Murale Miroir Rond LED",
    categorySlug: "coiffeuses",
    price: 1650,
    description:
      "Coiffeuse murale blanche avec grand miroir rond rétroéclairé LED et caisson de tiroirs assorti. Touche moderne et lumineuse.",
    images: ["/images/products/coiffeuse-ronde-led.jpg"],
    specs: [
      { label: "Miroir", value: "Rond rétroéclairé LED" },
      { label: "Finition", value: "Blanc laqué" },
      { label: "Fabrication", value: "Sur mesure" },
    ],
    featured: true,
  },
  {
    id: "p10",
    title: "Coiffeuse Blanche Miroir & Tiroirs",
    categorySlug: "coiffeuses",
    price: 1380,
    description:
      "Coiffeuse murale blanche avec miroir mural rectangulaire, miroir rond et colonne de tiroirs. Solution compacte et raffinée.",
    images: ["/images/products/coiffeuse-blanche-miroir.jpg"],
    specs: [
      { label: "Finition", value: "Blanc brillant" },
      { label: "Rangement", value: "5 tiroirs" },
      { label: "Fabrication", value: "Sur mesure" },
    ],
  },
  {
    id: "p11",
    title: "Chambre avec Dressing & Coiffeuse Chêne",
    categorySlug: "chambres",
    price: 4200,
    description:
      "Ensemble de chambre en chêne clair : armoires hautes, dressing intégré et coiffeuse avec miroir central. Aménagement complet sur mesure.",
    images: ["/images/products/chambre-dressing-chene.jpg"],
    specs: [
      { label: "Matériau", value: "Mélaminé chêne clair" },
      { label: "Composition", value: "Armoires + coiffeuse intégrée" },
      { label: "Fabrication", value: "Sur mesure" },
    ],
    featured: true,
  },
  {
    id: "p12",
    title: "Bibliothèque Bois Modulable",
    categorySlug: "rangements",
    price: 1750,
    description:
      "Bibliothèque en bois aux compartiments asymétriques. Design contemporain idéal pour livres et objets de décoration.",
    images: ["/images/products/bibliotheque-bois.jpg"],
    specs: [
      { label: "Matériau", value: "Bois massif / placage" },
      { label: "Style", value: "Compartiments modulables" },
      { label: "Fabrication", value: "Sur mesure" },
    ],
  },
  {
    id: "p13",
    title: "Étagère Déco Blanche & Bois",
    categorySlug: "rangements",
    price: 890,
    description:
      "Étagère décorative bi-matière blanc et bois sur pieds. Touche scandinave moderne pour salon ou entrée.",
    images: ["/images/products/etagere-deco-blanche.jpg"],
    specs: [
      { label: "Matériau", value: "Bois + MDF blanc" },
      { label: "Pieds", value: "Bois massif" },
      { label: "Fabrication", value: "Sur mesure" },
    ],
  },
  {
    id: "p14",
    title: "Étagères Murales Chêne (lot)",
    categorySlug: "meubles-muraux",
    price: 540,
    description:
      "Lot d'étagères murales en chêne clair, finition épurée. Parfaites pour mettre en valeur vases et objets déco.",
    images: ["/images/products/etageres-murales-chene.jpg"],
    specs: [
      { label: "Matériau", value: "Chêne clair" },
      { label: "Dimensions", value: "60 x 20 cm" },
      { label: "Fabrication", value: "Sur mesure" },
    ],
  },
  {
    id: "p15",
    title: "Étagères Murales Bois Massif",
    categorySlug: "meubles-muraux",
    price: 620,
    description:
      "Étagères murales flottantes en bois massif teinté noyer. Robustes et chaleureuses, fixation invisible.",
    images: ["/images/products/etageres-bois-massif.jpg"],
    specs: [
      { label: "Matériau", value: "Bois massif teinté noyer" },
      { label: "Dimensions", value: "60 x 20 cm" },
      { label: "Fixation", value: "Invisible" },
    ],
  },
  {
    id: "p16",
    title: "Bureau avec Rangement Intégré",
    categorySlug: "rangements",
    price: 1290,
    description:
      "Bureau en mélaminé chêne clair avec module de rangement supérieur, étagères ouvertes et caisson à tiroirs. Idéal bureau ou chambre d'étudiant.",
    images: ["/images/products/bureau-rangement.jpg"],
    specs: [
      { label: "Matériau", value: "Mélaminé chêne clair" },
      { label: "Rangement", value: "3 tiroirs + étagères" },
      { label: "Fabrication", value: "Sur mesure" },
    ],
  },
];

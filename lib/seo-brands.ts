export interface SEOBrand {
  slug: string;
  name: string;
  description: string;
  usps: string[];
}

const BRAND_DESCRIPTIONS: Record<string, SEOBrand> = {
  peugeot: {
    slug: 'peugeot',
    name: 'Peugeot',
    description:
      "Peugeot, constructeur français emblématique, séduit par son design félin et ses motorisations efficientes. De la 208 citadine au 3008 SUV, les modèles Peugeot d'occasion offrent un excellent rapport qualité-prix et un habitacle i-Cockpit reconnu pour son ergonomie. Chez Activ Automobiles, chaque Peugeot d'occasion est rigoureusement inspectée et livrée avec une garantie de 12 mois minimum.",
    usps: ['i-Cockpit ergonomique', 'Motorisations PureTech économiques', 'Réseau de pièces dense en France', 'Forte valeur résiduelle'],
  },
  citroen: {
    slug: 'citroen',
    name: 'Citroën',
    description:
      "Citroën incarne le confort à la française avec ses suspensions à butées hydrauliques progressives et son design audacieux. De la C3 compacte au C5 Aircross familial, les Citroën d'occasion se distinguent par leur habitabilité et leurs équipements de série généreux. Activ Automobiles sélectionne les meilleurs modèles Citroën d'occasion, contrôlés et garantis pour votre tranquillité.",
    usps: ['Confort de suspension unique', 'Équipements généreux de série', 'Entretien accessible', 'Design distinctif'],
  },
  renault: {
    slug: 'renault',
    name: 'Renault',
    description:
      "Premier constructeur français, Renault propose une gamme complète allant de la Clio, best-seller incontournable, au Captur et à l'Arkana. Les Renault d'occasion sont appréciées pour leur polyvalence, leur habitabilité et leur coût d'entretien raisonnable. Chez Activ Automobiles, retrouvez un large stock de Renault d'occasion récentes, chacune contrôlée et garantie 12 mois.",
    usps: ['Gamme la plus complète du marché', 'Pièces détachées abordables', 'Motorisations hybrides E-Tech', 'Multimédia OpenR Link'],
  },
  bmw: {
    slug: 'bmw',
    name: 'BMW',
    description:
      "BMW, référence du plaisir de conduire, conjugue sportivité et raffinement dans chaque modèle. Des Série 1 et 3 aux SUV X1 et X3, les BMW d'occasion séduisent les conducteurs exigeants par leur dynamisme et leur finition haut de gamme. Activ Automobiles vous propose des BMW d'occasion soigneusement vérifiées, avec historique complet et garantie 12 mois incluse.",
    usps: ['Plaisir de conduite légendaire', 'Finitions premium', 'Technologies iDrive', 'Excellente tenue de route'],
  },
  mercedes: {
    slug: 'mercedes',
    name: 'Mercedes-Benz',
    description:
      "Mercedes-Benz symbolise le luxe automobile allemand depuis plus d'un siècle. Classe A, C, GLA ou GLC : chaque modèle d'occasion allie confort, sécurité et prestige. Nos Mercedes d'occasion chez Activ Automobiles sont sélectionnées avec soin, bénéficient d'un contrôle technique complet et sont accompagnées d'une garantie de 12 mois pour un achat en toute sérénité.",
    usps: ['Prestige et image de marque', 'Sécurité de pointe', 'Confort inégalé', 'Systèmes MBUX innovants'],
  },
  audi: {
    slug: 'audi',
    name: 'Audi',
    description:
      "Audi se distingue par sa technologie Quattro, ses lignes épurées et ses intérieurs ultra-modernes. A1, A3, Q3, Q5 : les Audi d'occasion conservent une image premium et une fiabilité reconnue. Activ Automobiles sélectionne des Audi d'occasion en excellent état, avec historique d'entretien vérifié et garantie constructeur ou 12 mois selon le kilométrage.",
    usps: ['Transmission Quattro', 'Cockpit virtuel digital', 'Qualité de fabrication exemplaire', 'Design intemporel'],
  },
  volkswagen: {
    slug: 'volkswagen',
    name: 'Volkswagen',
    description:
      "Volkswagen, symbole de fiabilité allemande, propose des véhicules polyvalents et bien finis. Golf, Polo, T-Roc, Tiguan : chaque Volkswagen d'occasion est un choix sûr grâce à sa solidité mécanique et sa valeur de revente élevée. Chez Activ Automobiles, nos Volkswagen d'occasion sont inspectées point par point et garanties 12 mois minimum.",
    usps: ['Fiabilité reconnue', 'Excellente valeur résiduelle', 'Finitions soignées', 'Large gamme de motorisations TSI et TDI'],
  },
  toyota: {
    slug: 'toyota',
    name: 'Toyota',
    description:
      "Toyota, pionnier de l'hybride avec la Yaris et le C-HR, est synonyme de fiabilité légendaire. Les Toyota d'occasion sont parmi les véhicules les plus recherchés grâce à leur faible coût d'entretien et leur longévité exceptionnelle. Activ Automobiles vous propose des Toyota d'occasion contrôlées, garanties 12 mois, avec des motorisations hybrides particulièrement économiques à l'usage.",
    usps: ['Fiabilité légendaire', 'Technologie hybride éprouvée', 'Coût d\'entretien minimal', 'Valeur de revente premium'],
  },
  hyundai: {
    slug: 'hyundai',
    name: 'Hyundai',
    description:
      "Hyundai a conquis le marché européen grâce à un rapport qualité-prix imbattable et une garantie constructeur généreuse. Tucson, i20, Kona : les Hyundai d'occasion offrent des équipements de série riches et des motorisations modernes. Retrouvez chez Activ Automobiles des Hyundai d'occasion récentes, inspectées et couvertes par notre garantie 12 mois.",
    usps: ['Rapport qualité-prix optimal', 'Équipements de série complets', 'Design moderne', 'Motorisations hybrides 48V'],
  },
  kia: {
    slug: 'kia',
    name: 'Kia',
    description:
      "Kia s'est imposé en Europe avec des modèles au design affirmé et une garantie constructeur de 7 ans. Sportage, Ceed, Niro : les Kia d'occasion combinent style, technologie et fiabilité. Chez Activ Automobiles, nos Kia d'occasion sont vérifiées mécaniquement et bénéficient d'une garantie 12 mois pour un achat serein et sans mauvaise surprise.",
    usps: ['Garantie constructeur 7 ans', 'Design primé', 'Technologies embarquées avancées', 'Gamme électrifiée complète'],
  },
  seat: {
    slug: 'seat',
    name: 'Seat',
    description:
      "Seat, la marque espagnole du groupe Volkswagen, séduit par son tempérament sportif et ses tarifs attractifs. Ibiza, Leon, Arona, Ateca : les Seat d'occasion offrent la fiabilité des plateformes Volkswagen avec une touche de dynamisme méditerranéen. Activ Automobiles vous propose des Seat d'occasion en excellent état, avec garantie et financement personnalisé.",
    usps: ['Plateforme Volkswagen fiable', 'Tempérament sportif', 'Prix attractifs', 'Design dynamique'],
  },
  skoda: {
    slug: 'skoda',
    name: 'Škoda',
    description:
      "Škoda, souvent élue meilleur rapport habitabilité-prix, propose des véhicules généreux en espace et en équipements. Octavia, Kamiq, Karoq, Superb : les Škoda d'occasion sont des choix pragmatiques et intelligents. Chez Activ Automobiles, chaque Škoda d'occasion profite d'un contrôle qualité rigoureux et de notre garantie 12 mois standard.",
    usps: ['Espace intérieur généreux', 'Rapport qualité-prix exceptionnel', 'Fiabilité du groupe Volkswagen', 'Fonctionnalités Simply Clever'],
  },
  ford: {
    slug: 'ford',
    name: 'Ford',
    description:
      "Ford, constructeur américain historique en Europe, propose des véhicules au comportement routier référent. Fiesta, Focus, Puma, Kuga : les Ford d'occasion se distinguent par leur châssis dynamique et leur plaisir de conduite. Activ Automobiles sélectionne les meilleures Ford d'occasion du marché, toutes garanties 12 mois et disponibles avec financement adapté.",
    usps: ['Châssis dynamique de référence', 'Motorisations EcoBoost performantes', 'Design européen', 'Bon rapport prestations-prix'],
  },
  opel: {
    slug: 'opel',
    name: 'Opel',
    description:
      "Opel, désormais dans le giron Stellantis, propose des véhicules modernes et bien équipés. Corsa, Astra, Crossland, Grandland : les Opel d'occasion séduisent par leur confort et leur polyvalence au quotidien. Retrouvez chez Activ Automobiles des Opel d'occasion récentes, intégralement vérifiées et bénéficiant de notre garantie 12 mois.",
    usps: ['Confort de conduite', 'Sièges ergonomiques certifiés AGR', 'Motorisations économiques', 'Équipements technologiques modernes'],
  },
  dacia: {
    slug: 'dacia',
    name: 'Dacia',
    description:
      "Dacia est la référence du marché automobile accessible. Sandero, Duster, Jogger : les Dacia d'occasion offrent une robustesse et un rapport prix-prestations inégalés. Idéales pour les budgets maîtrisés, nos Dacia d'occasion chez Activ Automobiles sont contrôlées et garanties 12 mois pour un achat sans compromis sur la fiabilité.",
    usps: ['Prix les plus bas du marché', 'Robustesse éprouvée', 'Entretien très économique', 'Mécanique Renault fiable'],
  },
  fiat: {
    slug: 'fiat',
    name: 'Fiat',
    description:
      "Fiat, icône de l'automobile italienne, brille par ses citadines pleines de caractère. 500, Panda, Tipo : les Fiat d'occasion sont parfaites pour la ville grâce à leur compacité et leur consommation modérée. Chez Activ Automobiles, nos Fiat d'occasion sont sélectionnées pour leur bon état général et bénéficient de notre garantie 12 mois.",
    usps: ['Compacité idéale en ville', 'Style italien distinctif', 'Consommation maîtrisée', 'Gamme électrique Fiat 500e'],
  },
  mini: {
    slug: 'mini',
    name: 'MINI',
    description:
      "MINI, marque du groupe BMW, cultive un style unique et un plaisir de conduite hors norme pour sa catégorie. Cooper, Countryman, Clubman : les MINI d'occasion séduisent par leur personnalité et leur tenue de route go-kart. Activ Automobiles vous propose des MINI d'occasion soigneusement entretenues, avec garantie 12 mois et financement flexible.",
    usps: ['Style iconique personnalisable', 'Tenue de route go-kart', 'Qualité de fabrication BMW', 'Forte communauté de passionnés'],
  },
  porsche: {
    slug: 'porsche',
    name: 'Porsche',
    description:
      "Porsche, synonyme d'excellence sportive, propose des véhicules d'exception même sur le marché de l'occasion. Cayenne, Macan, 911, Panamera : chaque Porsche d'occasion chez Activ Automobiles est minutieusement inspectée, avec vérification complète de l'historique et garantie 12 mois. Offrez-vous le mythe Porsche à prix maîtrisé.",
    usps: ['Performance légendaire', 'Qualité de fabrication exceptionnelle', 'Valeur résiduelle élevée', 'Technologies de pointe'],
  },
  'land-rover': {
    slug: 'land-rover',
    name: 'Land Rover',
    description:
      "Land Rover, spécialiste britannique du tout-terrain premium, propose des SUV au caractère affirmé. Range Rover Evoque, Discovery Sport, Defender : les Land Rover d'occasion allient luxe, polyvalence et capacités off-road inégalées. Activ Automobiles sélectionne des Land Rover d'occasion en parfait état, avec historique vérifié et garantie 12 mois.",
    usps: ['Capacités tout-terrain inégalées', 'Intérieurs luxueux', 'Présence routière imposante', 'Technologie Terrain Response'],
  },
  volvo: {
    slug: 'volvo',
    name: 'Volvo',
    description:
      "Volvo, constructeur suédois, est la référence mondiale en matière de sécurité automobile. XC40, XC60, V60 : les Volvo d'occasion séduisent par leur design scandinave épuré, leur confort et leurs systèmes de sécurité avancés. Chez Activ Automobiles, nos Volvo d'occasion sont contrôlées et garanties 12 mois pour un achat en toute sérénité.",
    usps: ['Sécurité de référence mondiale', 'Design scandinave élégant', 'Intérieurs premium en matériaux durables', 'Motorisations hybrides rechargeables'],
  },
};

export function getBrandSEO(brandName: string): SEOBrand {
  const slug = brandName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  if (BRAND_DESCRIPTIONS[slug]) {
    return BRAND_DESCRIPTIONS[slug];
  }

  // Generic description for brands not in the curated list
  return {
    slug,
    name: brandName,
    description: `Découvrez notre sélection de ${brandName} d'occasion chez Activ Automobiles. Chaque véhicule ${brandName} de notre catalogue est rigoureusement inspecté par nos techniciens et bénéficie d'une garantie minimum de 12 mois. Profitez de prix compétitifs, d'un financement sur mesure et de la reprise de votre ancien véhicule.`,
    usps: ['Contrôle technique complet', 'Garantie 12 mois incluse', 'Financement personnalisé', 'Reprise de votre véhicule'],
  };
}

export function getAllSEOBrands(): SEOBrand[] {
  return Object.values(BRAND_DESCRIPTIONS);
}

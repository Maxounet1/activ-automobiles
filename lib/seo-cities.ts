export interface SEOCity {
  slug: string;
  name: string;
  department: string;
  region: string;
  nearestAgencyId: string;
  nearestAgencyCity: string;
  description: string;
  nearbyCitySlugs: string[];
}

export const SEO_CITIES: SEOCity[] = [
  {
    slug: 'nancy',
    name: 'Nancy',
    department: 'Meurthe-et-Moselle',
    region: 'Grand Est',
    nearestAgencyId: 'agence-nancy-laxou',
    nearestAgencyCity: 'Nancy-Laxou',
    description:
      "Vous recherchez une voiture d'occasion fiable à Nancy ? Activ Automobiles vous accueille dans son agence de Nancy-Laxou, à quelques minutes du centre-ville. Notre équipe sélectionne rigoureusement chaque véhicule : contrôle technique, historique d'entretien et garantie minimum 12 mois incluse. Que vous habitiez Vandœuvre-lès-Nancy, Villers-lès-Nancy ou le centre historique de Nancy, profitez d'un large choix de berlines, SUV, citadines et utilitaires d'occasion à prix compétitif. Nous proposons également le financement sur mesure, la reprise de votre ancien véhicule et la livraison à domicile dans toute la Meurthe-et-Moselle.",
    nearbyCitySlugs: ['metz', 'epinal', 'strasbourg'],
  },
  {
    slug: 'metz',
    name: 'Metz',
    department: 'Moselle',
    region: 'Grand Est',
    nearestAgencyId: 'agence-talange',
    nearestAgencyCity: 'Talange',
    description:
      "Trouvez votre prochaine voiture d'occasion à Metz chez Activ Automobiles. Notre agence de Talange, idéalement située à 10 minutes de Metz-Centre par l'A31, dispose d'un parc automobile varié et régulièrement renouvelé. De la citadine économique au SUV familial, chaque véhicule est inspecté par nos techniciens certifiés et livré avec une garantie 12 mois. Que vous soyez à Montigny-lès-Metz, Woippy ou dans le Technopôle, accédez facilement à notre showroom moderne. Financement adapté à votre budget, reprise de votre véhicule actuel et possibilité de livraison partout en Moselle.",
    nearbyCitySlugs: ['nancy', 'thionville', 'strasbourg'],
  },
  {
    slug: 'epinal',
    name: 'Épinal',
    department: 'Vosges',
    region: 'Grand Est',
    nearestAgencyId: 'agence-epinal-chavelot',
    nearestAgencyCity: 'Épinal-Chavelot',
    description:
      "Achetez votre voiture d'occasion en toute confiance à Épinal avec Activ Automobiles. Notre agence d'Épinal-Chavelot, située à proximité directe de la ville, vous propose un catalogue complet de véhicules d'occasion contrôlés et garantis 12 mois. Des Vosges au cœur d'Épinal, nos clients apprécient la transparence de nos prix et la qualité de notre accompagnement. SUV, berlines, compactes ou breaks : trouvez le véhicule qui correspond à votre quotidien. Profitez de notre service de financement personnalisé et d'estimation gratuite pour la reprise de votre véhicule actuel.",
    nearbyCitySlugs: ['nancy', 'strasbourg'],
  },
  {
    slug: 'bordeaux',
    name: 'Bordeaux',
    department: 'Gironde',
    region: 'Nouvelle-Aquitaine',
    nearestAgencyId: 'agence-bordeaux',
    nearestAgencyCity: 'Bordeaux',
    description:
      "Découvrez notre sélection de voitures d'occasion à Bordeaux chez Activ Automobiles. Installée à Saint-Jean-d'Illac, notre agence bordelaise est facilement accessible depuis la rocade et propose un large choix de véhicules soigneusement sélectionnés. Chaque voiture bénéficie d'un contrôle mécanique approfondi et d'une garantie de 12 mois minimum. De Mérignac à Pessac, de Talence à Bègles, les Bordelais font confiance à Activ pour leur achat automobile. Financement flexible, reprise de votre ancien véhicule au meilleur prix et possibilité de livraison dans toute la Gironde et le Sud-Ouest.",
    nearbyCitySlugs: ['rennes', 'nantes'],
  },
  {
    slug: 'rennes',
    name: 'Rennes',
    department: 'Ille-et-Vilaine',
    region: 'Bretagne',
    nearestAgencyId: 'agence-rennes',
    nearestAgencyCity: 'Rennes',
    description:
      "Activ Automobiles Rennes vous accueille à Saint-Grégoire, au nord de la capitale bretonne, pour vous proposer un vaste choix de voitures d'occasion vérifiées et garanties. Notre showroom, accessible en quelques minutes depuis le centre de Rennes via la rocade, regroupe des véhicules de toutes marques et tous budgets. Citadines idéales pour circuler dans le centre historique, SUV pour les escapades sur la côte d'Émeraude ou berlines confortables pour les trajets vers Nantes ou Paris : nous avons le véhicule qu'il vous faut. Garantie 12 mois, financement personnalisé et reprise avantageuse inclus.",
    nearbyCitySlugs: ['nantes', 'vannes'],
  },
  {
    slug: 'la-roche-sur-yon',
    name: 'La Roche-sur-Yon',
    department: 'Vendée',
    region: 'Pays de la Loire',
    nearestAgencyId: 'agence-la-mothe-achard',
    nearestAgencyCity: 'La Mothe-Achard',
    description:
      "À La Roche-sur-Yon, Activ Automobiles est votre partenaire de confiance pour l'achat d'une voiture d'occasion. Notre agence de La Mothe-Achard, située à seulement 20 minutes, vous offre un large panel de véhicules inspectés et garantis 12 mois. Que vous recherchiez une citadine pratique pour vos trajets en ville, un break familial pour les vacances vendéennes ou un SUV polyvalent, notre équipe vous guide dans votre choix. Nous assurons le financement adapté à votre situation, la reprise de votre véhicule actuel et la livraison dans toute la Vendée.",
    nearbyCitySlugs: ['nantes', 'vannes'],
  },
  {
    slug: 'nantes',
    name: 'Nantes',
    department: 'Loire-Atlantique',
    region: 'Pays de la Loire',
    nearestAgencyId: 'agence-la-mothe-achard',
    nearestAgencyCity: 'La Mothe-Achard',
    description:
      "Nantais, trouvez votre voiture d'occasion chez Activ Automobiles ! Notre agence la plus proche, située à La Mothe-Achard en Vendée, vous propose un catalogue varié de véhicules d'occasion contrôlés et garantis 12 mois. Facilement accessible depuis Nantes par la N137, notre showroom accueille les automobilistes de la métropole nantaise et de toute la Loire-Atlantique. Du quartier de l'Île de Nantes aux communes de Rezé, Saint-Herblain ou Orvault, bénéficiez de notre service de livraison à domicile, de notre financement sur mesure et de notre reprise au meilleur prix.",
    nearbyCitySlugs: ['rennes', 'la-roche-sur-yon', 'vannes'],
  },
  {
    slug: 'strasbourg',
    name: 'Strasbourg',
    department: 'Bas-Rhin',
    region: 'Grand Est',
    nearestAgencyId: 'agence-nancy-laxou',
    nearestAgencyCity: 'Nancy-Laxou',
    description:
      "Vous cherchez une voiture d'occasion de qualité à Strasbourg ? Activ Automobiles met à votre disposition un vaste choix de véhicules contrôlés depuis son agence de Nancy-Laxou, la plus proche du réseau en Grand Est. Bien que située à environ 1h30 par l'autoroute A4, notre agence propose un service de livraison dans toute l'Alsace. Chaque véhicule est inspecté, garanti 12 mois et finançable selon vos besoins. Que vous habitiez l'Eurométropole, Schiltigheim, Illkirch ou Lingolsheim, profitez de prix compétitifs et d'un accompagnement personnalisé pour votre prochain achat automobile.",
    nearbyCitySlugs: ['nancy', 'metz'],
  },
  {
    slug: 'thionville',
    name: 'Thionville',
    department: 'Moselle',
    region: 'Grand Est',
    nearestAgencyId: 'agence-talange',
    nearestAgencyCity: 'Talange',
    description:
      "Thionvillois, votre voiture d'occasion vous attend chez Activ Automobiles Talange ! Située à seulement 15 minutes de Thionville par l'A31, notre agence vous propose un large choix de véhicules d'occasion récents, contrôlés et garantis 12 mois. Idéalement placée entre Thionville et Metz, notre concession dessert tout le nord de la Moselle, y compris Hayange, Fameck et Yutz. Nos conseillers vous accompagnent de la sélection du véhicule au financement personnalisé, en passant par la reprise de votre auto actuelle. Livraison possible dans tout le département.",
    nearbyCitySlugs: ['metz', 'nancy', 'strasbourg'],
  },
  {
    slug: 'vannes',
    name: 'Vannes',
    department: 'Morbihan',
    region: 'Bretagne',
    nearestAgencyId: 'agence-rennes',
    nearestAgencyCity: 'Rennes',
    description:
      "Envie d'acheter une voiture d'occasion à Vannes ? Activ Automobiles Rennes, votre agence la plus proche, vous propose un catalogue complet de véhicules soigneusement sélectionnés et garantis 12 mois. Située à Saint-Grégoire, notre concession est accessible en environ 1h15 depuis Vannes via la voie express. Nous offrons également un service de livraison à domicile dans tout le Morbihan. SUV pour les escapades dans le Golfe du Morbihan, citadines pour le centre-ville de Vannes ou breaks pour la famille : chaque véhicule est contrôlé par nos techniciens et proposé à prix transparent.",
    nearbyCitySlugs: ['rennes', 'nantes', 'la-roche-sur-yon'],
  },
];

export function getCityBySlug(slug: string): SEOCity | undefined {
  return SEO_CITIES.find((c) => c.slug === slug);
}

export function getAllCitySlugs(): string[] {
  return SEO_CITIES.map((c) => c.slug);
}

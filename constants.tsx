
import React from 'react';
import { ProcessStep, StyleCard } from './types';

export const OWNER_CONTACT = {
  email: 'contact@atelier-mariage.fr',
  phone: '33767663155', // Format international sans le + (07 67 66 31 55 -> 33 7 67 66 31 55)
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 1,
    title: 'Premier rendez-vous',
    description: 'Premier rendez-vous et échange sur le projet.',
    icon: 'fa-comments'
  },
  {
    id: 2,
    title: 'Choix & Essayages',
    description: "Essayage de modèles, choix des formes, tissus et dentelles.",
    icon: 'fa-layer-group'
  },
  {
    id: 3,
    title: 'Croquis et devis',
    description: 'Croquis et devis.',
    icon: 'fa-pencil-alt'
  },
  {
    id: 4,
    title: 'Ajustements',
    description: 'Plusieurs essayages pour ajuster la robe.',
    icon: 'fa-ruler-vertical'
  },
  {
    id: 5,
    title: 'Livraison',
    description: 'Retouches finales et livraison de la robe.',
    icon: 'fa-gift'
  }
];

export const STYLE_CARDS: StyleCard[] = [
  {
    id: 'boheme',
    name: 'Bohème',
    imageUrl: '/images/style-boheme.png',
    description: 'La robe bohème incarne la liberté et la romance. Avec ses dentelles délicates, ses manches fluides et sa silhouette décontractée, elle est parfaite pour un mariage champêtre ou en plein air.',
    characteristics: [
      'Dentelles délicates et romantiques',
      'Silhouette fluide et légère',
      'Manches longues ou trois-quarts',
      'Décolleté en V ou dos nu',
      'Parfaite pour mariages en extérieur'
    ],
    idealFor: 'Les mariées bohèmes qui recherchent une allure naturelle et romantique, parfait pour les mariages champêtres ou sur la plage.'
  },
  {
    id: 'sirene',
    name: 'Sirène',
    imageUrl: '/images/style-sirene.png',
    description: 'La robe sirène épouse parfaitement les courbes jusqu\'aux genoux avant de s\'évaser en une élégante traîne. Elle sublime la silhouette avec sophistication et glamour.',
    characteristics: [
      'Ajustée sur le corps jusqu\'aux genoux',
      'Évasement spectaculaire en bas',
      'Met en valeur les courbes',
      'Silhouette sculptante et élégante',
      'Style hollywoodien et glamour'
    ],
    idealFor: 'Les mariées confiantes qui souhaitent mettre en valeur leur silhouette avec élégance et glamour.'
  },
  {
    id: 'empire',
    name: 'Empire',
    imageUrl: '/images/style-empire.png',
    description: 'La robe empire se caractérise par sa taille haute juste sous la poitrine et sa jupe fluide qui tombe gracieusement. Elle allonge la silhouette et offre un confort incomparable.',
    characteristics: [
      'Taille haute sous la poitrine',
      'Jupe fluide et aérienne',
      'Silhouette allongée et gracieuse',
      'Confortable et élégante',
      'Style intemporel et romantique'
    ],
    idealFor: 'Les mariées enceintes ou celles qui recherchent une robe confortable tout en restant élégante et raffinée.'
  },
  {
    id: 'fourreau',
    name: 'Fourreau',
    imageUrl: '/images/style-fourreau.png',
    description: 'La robe fourreau est épurée et élégante, suivant les lignes naturelles du corps de façon fluide. Elle incarne la sophistication minimaliste et l\'élégance moderne.',
    characteristics: [
      'Coupe droite et épurée',
      'Suit naturellement la silhouette',
      'Élégance minimaliste',
      'Tissu fluide de qualité',
      'Style moderne et sophistiqué'
    ],
    idealFor: 'Les mariées au style épuré qui apprécient l\'élégance minimaliste et la simplicité raffinée.'
  },
  {
    id: 'a-line',
    name: 'A-Line',
    imageUrl: '/images/style-a-line.png',
    description: 'La robe A-Line est le style le plus polyvalent, avec sa silhouette qui s\'évase progressivement de la taille vers le bas, formant un "A". Elle flatte toutes les morphologies.',
    characteristics: [
      'Silhouette universellement flatteuse',
      'Évasement progressif depuis la taille',
      'Ajustée au buste, fluide en bas',
      'Style classique et intemporel',
      'Convient à tous les types de mariage'
    ],
    idealFor: 'Toutes les mariées ! C\'est le style le plus polyvalent qui convient à toutes les morphologies et tous les types de cérémonies.'
  }
];

export const GALLERY_IMAGES = [
  '/images/gallery/1325710b74cfeb9e91b399062b285fcc.jpg',
  '/images/gallery/6717ebbc31d3eb3e94512c5b_Robe de mariée Rochas (2).jpg',
  '/images/gallery/E85A0708.jpg',
  '/images/gallery/Image_1_67_.webp',
  '/images/gallery/MOGRA-B1-scaled.webp',
  '/images/gallery/Rendez-vous-essayage-robe-de-Mariee-a-Paris-Creatrice-de-robe-de-Mariage-sur-mesure-a-Paris-Boutique-robes-de-mariage-a-Paris-Robe-de-mariee-princesse-et-longue-traine-PASSIONEMENT-3.jpg',
  '/images/gallery/Robe-de-Mariee-Atelier-Pronovias-1-300x300.webp',
  '/images/gallery/portrait-isabella-boutin.png',
  '/images/gallery/pronovias-loire_b-copie.jpg',
  '/images/gallery/robe-de-mariee-aurore-2x-1.webp',
  '/images/gallery/robe-de-mariee-de-luxe-sirene-4_turbo-902487_1200x.webp',
  '/images/gallery/robe-de-mariee-princesse.webp',
  '/images/gallery/robe-mariage_bd59c7e1-9fd3-49f1-840f-d62f9d53ae08_640x.webp',
  '/images/gallery/Essayage_robe_de_mariee_sur_mesure_a_Bordeaux_boutique_mariage_Christelle_Vasseur.webp',
  '/images/gallery/Wedding-dress-shapes-silhouettes-1-1.jpg',
  '/images/gallery/image00015.webp',
  '/images/gallery/ml-mariage-3_3_237894-161243093383572.jpeg',
  '/images/gallery/sur_mesure2.jpg'
];

export const WHY_CHOOSE_US = [
  { icon: 'fa-cut', text: 'Création 100% sur mesure.' },
  { icon: 'fa-user-check', text: 'Conseils morphologie et style.' },
  { icon: 'fa-gem', text: 'Tissus de qualité, dentelles fines, finitions soignées.' },
  { icon: 'fa-map-marker-alt', text: 'Atelier proche de Montauban, facilement accessible.' },
  { icon: 'fa-heart', text: 'Expérience chaleureuse et bienveillante.' }
];

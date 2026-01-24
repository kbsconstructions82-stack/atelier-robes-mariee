import React, { useState } from 'react';

interface SoldDress {
  id: string;
  title: string;
  date: string;
  description: string;
  images: string[];
  price?: string;
  features: string[];
}

const SOLD_DRESSES: SoldDress[] = [
  {
    id: 'sold-1',
    title: 'Robe "Céleste"',
    date: '24 Janvier 2026',
    description: 'Une création unique en soie sauvage et dentelle de Calais, conçue pour une cérémonie hivernale. Le dos nu plongeant et la traîne cathédrale ajoutent une touche de majesté intemporelle.',
    images: ['/images/1.png', '/images/2.png'],
    price: 'Vendue',
    features: ['Soie sauvage', 'Dentelle de Calais', 'Traîne 2.5m', 'Dos nu']
  },
  {
    id: 'sold-2',
    title: 'Modèle "Aurore"',
    date: '15 Décembre 2023',
    description: 'Robe bohème chic en mousseline de soie, légère et fluide. Parfaite pour un mariage champêtre, avec ses délicates broderies florales main.',
    images: ['/images/gallery/11.jpg'],
    features: ['Mousseline de soie', 'Broderies main', 'Style Bohème']
  },
  {
    id: 'sold-3',
    title: 'Création "Élégance"',
    date: '02 Novembre 2023',
    description: 'Une silhouette sirène structurée en crêpe georgette, mettant en valeur les courbes avec une élégance minimaliste. Manches longues et boutons de nacre.',
    images: ['/images/gallery/12.webp'],
    features: ['Crêpe Georgette', 'Silhouette Sirène', 'Manches longues']
  },
  {
    id: 'sold-4',
    title: 'Robe "Princesse moderne"',
    date: '10 Octobre 2023',
    description: 'Volume spectaculaire en tulle pailleté pour cette robe de bal moderne. Corsage baleiné et décolleté cœur pour un maintien parfait.',
    images: ['/images/gallery/13.jpg'],
    features: ['Tulle pailleté', 'Corsage baleiné', 'Volume XXL']
  },
   {
    id: 'sold-5',
    title: 'Robe "Romance"',
    date: '28 Septembre 2023',
    description: 'Douceur et romantisme pour ce modèle en satin duchesse. Les plis délicats du bustier s\'épanouissent en une jupe ample avec poches cachées.',
    images: ['/images/gallery/14.webp'],
    features: ['Satin duchesse', 'Poches intégrées', 'Bustier drapé']
  }
];

const Realisations: React.FC = () => {
  const [latest, ...others] = SOLD_DRESSES;
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % latest.images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + latest.images.length) % latest.images.length);
  };

  return (
    <div className="min-h-screen pb-24 bg-atelier-cream/30">
      {/* Hero Section for Latest Dress */}
      <section className="relative w-full py-16 bg-white overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 bg-atelier-gold/10 rounded-br-full -z-0"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-atelier-dark mb-3">Dernière Création Vendue</h2>
            <div className="w-24 h-1 bg-atelier-gold mx-auto rounded-full"></div>
            <p className="text-gray-500 mt-4 italic">L'excellence de notre savoir-faire, fraîchement sortie de l'atelier</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="relative">
                  <div className="relative group rounded-2xl overflow-hidden shadow-2xl aspect-[3/4] max-h-[600px] lg:max-h-[700px] w-full">
                      <img 
                          src={latest.images[currentSlide]} 
                          alt={latest.title} 
                          className="w-full h-full object-cover transition-opacity duration-500"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg z-20">
                          <span className="text-atelier-gold font-bold tracking-wider text-sm uppercase">Vendu le {latest.date}</span>
                      </div>
                      
                      {/* Carousel Controls */}
                      {latest.images.length > 1 && (
                        <>
                          <button 
                            onClick={prevSlide}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 backdrop-blur-sm text-white p-3 rounded-full transition-all hover:scale-110 z-20"
                          >
                            <i className="fas fa-chevron-left text-xl"></i>
                          </button>
                          <button 
                            onClick={nextSlide}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 backdrop-blur-sm text-white p-3 rounded-full transition-all hover:scale-110 z-20"
                          >
                            <i className="fas fa-chevron-right text-xl"></i>
                          </button>
                          
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                            {latest.images.map((_, idx) => (
                              <button
                                key={idx}
                                onClick={() => setCurrentSlide(idx)}
                                className={`w-2.5 h-2.5 rounded-full transition-all ${
                                  currentSlide === idx ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80'
                                }`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                  </div>
                </div>

                <div className="flex flex-col space-y-8">
                    <div>
                        <h3 className="font-serif text-4xl md:text-5xl text-gray-900 mb-4 leading-tight">{latest.title}</h3>
                        <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light">
                            {latest.description}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {latest.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-3 bg-[#DFC79F] p-4 rounded-xl shadow-sm border border-gray-100">
                                <div className="w-10 h-10 rounded-full bg-atelier-cream flex items-center justify-center text-atelier-gold">
                                    <i className="fas fa-check"></i>
                                </div>
                                <span className="text-gray-700 font-medium">{feature}</span>
                            </div>
                        ))}
                    </div>

                    <div className="pt-6 border-t border-gray-200">
                         <div className="inline-block bg-[#DFC79F] text-white px-8 py-4 rounded-full font-serif text-lg shadow-lg">
                            Modèle Unique
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Grid for Other Sold Dresses */}
      <section className="py-16 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
            <h2 className="font-serif text-3xl text-gray-800 mb-4">Nos Précédentes Réalisations</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Découvrez les histoires d'amour que nous avons eu l'honneur d'accompagner</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {others.map((dress) => (
                <div key={dress.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full border border-gray-50">
                    <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                        <img 
                            src={dress.images[0]} 
                            alt={dress.title} 
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                         <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                            <span className="text-white text-sm font-medium"><i className="far fa-calendar-alt mr-2"></i>{dress.date}</span>
                        </div>
                    </div>
                    
                    <div className="p-6 flex-grow flex flex-col justify-between">
                        <div>
                            <h3 className="font-serif text-2xl text-gray-900 mb-3">{dress.title}</h3>
                            <p className="text-gray-600 mb-4 text-sm line-clamp-3 leading-relaxed">
                                {dress.description}
                            </p>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-gray-100">
                            <div className="flex flex-wrap gap-2">
                                {dress.features.slice(0, 3).map((f, i) => (
                                    <span key={i} className="text-xs bg-atelier-cream text-gray-800 px-2 py-1 rounded-md">
                                        {f}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default Realisations;

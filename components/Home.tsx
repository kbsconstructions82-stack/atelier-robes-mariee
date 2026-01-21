
import React, { useState, useEffect, useRef } from 'react';
import { PROCESS_STEPS, STYLE_CARDS, WHY_CHOOSE_US, OWNER_CONTACT } from '../constants';
import DressModal from './DressModal';
import { StyleCard } from '../types';

const HERO_IMAGES = [
  "/images/hero-1.jpg",
  "/images/hero-2.jpg",
  "/images/hero-3.jpg"
];

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedDress, setSelectedDress] = useState<StyleCard | null>(null);
  const stylesScrollRef = useRef<HTMLDivElement>(null);
  const processScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const openContactForm = () => {
    document.dispatchEvent(new CustomEvent('openContactForm'));
  };

  const scrollStyles = (direction: 'left' | 'right') => {
    if (stylesScrollRef.current) {
      const scrollAmount = direction === 'left' ? -250 : 250;
      stylesScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollProcess = (direction: 'left' | 'right') => {
    if (processScrollRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      processScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full">
      {selectedDress && (
        <DressModal
          dress={selectedDress}
          onClose={() => setSelectedDress(null)}
        />
      )}
      {/* Hero Section with Carousel */}
      <section className="relative w-full h-[650px] overflow-hidden flex flex-col justify-center items-center text-center px-6">
        {HERO_IMAGES.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
              }`}
            style={{ transition: 'opacity 1s ease-in-out, transform 8s ease-out' }}
          >
            <img
              src={img}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/35"></div>
          </div>
        ))}

        <div className="relative z-10 max-w-lg">
          <h2 className="font-serif text-4xl md:text-6xl text-white font-bold leading-tight drop-shadow-2xl mb-8">
            Atelier de Robes de Mariée
          </h2>
          <p className="text-white text-base md:text-xl font-light mb-12 drop-shadow-lg opacity-95 max-w-sm mx-auto leading-relaxed">
            Créations uniques, confection sur mesure et retouches à Nègrepelisse.
            Donnez vie à la robe de vos rêves.
          </p>
          <button
            onClick={openContactForm}
            className="bg-atelier-green/85 backdrop-blur-md hover:bg-atelier-green transition-all transform hover:scale-105 active:scale-95 text-white font-bold py-5 px-14 rounded-full shadow-2xl tracking-wider text-lg"
          >
            Prendre rendez-vous
          </button>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-12 flex gap-3 z-20">
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-1.5 rounded-full transition-all ${i === currentSlide ? 'bg-white w-8' : 'bg-white/40 w-3'
                }`}
            />
          ))}
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24 px-6 max-w-4xl mx-auto text-center">
        <span className="text-atelier-gold font-bold text-xs uppercase tracking-widest mb-4 block">Bienvenue</span>
        <h3 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 mb-8 leading-tight">Une expérience unique pour votre grand jour</h3>
        <p className="text-gray-600 leading-relaxed text-base md:text-lg mb-10">
          Dans mon atelier situé près de Montauban, je vous accompagne pour créer la robe qui vous ressemble.
          Que vous souhaitiez une création entièrement sur mesure ou des retouches pour sublimer une robe existante,
          chaque détail compte.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {/* Note: In a real app, these would be Links from react-router-dom */}
          {/* Since we use state-based routing in App.tsx, we can't easily link from here without passing props. 
               For now, we'll just keep the buttons simple or remove them if navigation is enough. */}
        </div>
      </section>

      {/* Styles Section */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h3 className="font-serif text-3xl font-bold text-gray-800">
                Nos Inspirations
              </h3>
              <p className="text-gray-500 mt-2">Découvrez les différents styles pour vous inspirer.</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => scrollStyles('left')}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-atelier-green hover:text-white transition-all active:scale-90"
              >
                <i className="fas fa-chevron-left text-xs"></i>
              </button>
              <button
                onClick={() => scrollStyles('right')}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-atelier-green hover:text-white transition-all active:scale-90"
              >
                <i className="fas fa-chevron-right text-xs"></i>
              </button>
            </div>
          </div>

          <div
            ref={stylesScrollRef}
            className="flex overflow-x-auto gap-6 pb-6 no-scrollbar snap-x snap-mandatory"
          >
            {STYLE_CARDS.map((style) => (
              <div
                key={style.id}
                onClick={() => setSelectedDress(style)}
                className="snap-start shrink-0 w-[80%] md:w-1/4 aspect-[3/4] relative rounded-[2rem] overflow-hidden shadow-xl group cursor-pointer transform transition-transform hover:scale-[1.02]"
              >
                <img
                  src={style.imageUrl}
                  alt={style.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                <div className="absolute bottom-8 inset-x-0 flex justify-center">
                  <span className="bg-white/20 backdrop-blur-md px-8 py-3 rounded-full text-white text-sm font-bold tracking-widest shadow-xl border border-white/30 group-hover:bg-atelier-gold transition-colors">
                    {style.name.toUpperCase()}
                  </span>
                </div>
                {/* Click indicator */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <i className="fas fa-expand text-gray-700 text-xs"></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us & Infos Pratiques */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24 items-start">
          {/* Why Choose Us */}
          <div className="flex-1 w-full">
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-gray-800 mb-10">Pourquoi choisir cet atelier ?</h3>
            <ul className="space-y-6 md:space-y-8">
              {WHY_CHOOSE_US.map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="mt-1 w-6 h-6 flex items-center justify-center text-atelier-gold shrink-0">
                    <i className={`fas ${item.icon} text-sm md:text-xl`}></i>
                  </div>
                  <span className="text-gray-600 font-medium text-base md:text-lg leading-snug">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Practical Info */}
          <div className="flex-1 w-full space-y-10 md:space-y-12">
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-gray-800">Informations pratiques</h3>
            <div className="space-y-8 md:space-y-10">
              <div className="flex items-start gap-4">
                <i className="fas fa-map-marker-alt text-gray-300 mt-1 shrink-0 text-xl"></i>
                <div>
                  <h4 className="font-bold text-xs md:text-sm mb-2 uppercase tracking-widest text-gray-400">Zone</h4>
                  <p className="text-gray-700 text-base md:text-lg font-medium leading-relaxed">
                    Nègrepelisse, Montauban,<br />
                    Tarn-et-Garonne, Occitanie.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <i className="far fa-calendar-check text-gray-300 mt-1 shrink-0 text-xl"></i>
                <div>
                  <h4 className="font-bold text-xs md:text-sm mb-2 uppercase tracking-widest text-gray-400">Rendez-vous</h4>
                  <p className="text-gray-700 text-base md:text-lg font-medium">Sur rendez-vous uniquement.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4 border-t border-gray-100">
                <i className="far fa-file-alt text-atelier-gold mt-1 shrink-0 text-xl"></i>
                <p className="text-gray-800 text-base md:text-lg font-bold">Possibilité de demander un devis sans engagement.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="px-6 py-20 bg-atelier-cream/50">
        <div className="max-w-xl mx-auto text-center space-y-8">
          <h3 className="font-serif text-3xl font-bold text-gray-800">Prête à dire oui à votre robe ?</h3>
          <p className="text-gray-600 text-lg">
            Réservez un rendez-vous ou envoyez-moi un message avec votre date de mariage et quelques idées de robe.
          </p>
          <button
            onClick={openContactForm}
            className="w-full md:w-auto bg-[#25D366] hover:bg-[#128C7E] transition-all transform hover:scale-105 active:scale-95 text-white font-bold py-6 px-10 rounded-full shadow-2xl flex items-center justify-center gap-4 text-xl mx-auto"
          >
            <i className="fab fa-whatsapp text-3xl"></i>
            <span>Je prends rendez-vous via WhatsApp</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;

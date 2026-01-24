import React, { useState } from 'react';
import { ContactForm, ContactFormData } from './ContactForm';

const SurMesure: React.FC = () => {
  const [showContactForm, setShowContactForm] = useState(false);

  const handleContactSubmit = (formData: ContactFormData) => {
    const subject = encodeURIComponent(`Nouvelle demande de RDV : ${formData.name}`);
    const body = encodeURIComponent(`
Nom: ${formData.name}
Email: ${formData.email}
Téléphone: ${formData.phone}
Date souhaitée: ${formData.date}

Message:
${formData.message}
    `);
    
    const targetEmail = 'mazyoudjamila@gmail.com';
    const mailtoLink = `mailto:${targetEmail}?subject=${subject}&body=${body}`;
    
    const link = document.createElement('a');
    link.href = mailtoLink;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setShowContactForm(false);
  };

  return (
    <div className="w-full bg-white pb-32">
      {showContactForm && (
        <ContactForm 
          onClose={() => setShowContactForm(false)} 
          onSubmit={handleContactSubmit} 
        />
      )}

      {/* Header Image */}
      <div className="w-full h-[50vh] md:h-[60vh] relative">
        <img 
          src="/images/gallery/atelier4.jpg" 
          alt="Robe sur mesure" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl text-white font-serif font-bold text-center drop-shadow-xl px-4">
            Votre robe de mariée sur mesure
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-20">
        
        {/* Introduction */}
        <section className="text-center space-y-8">
          <h2 className="text-3xl font-serif text-gray-800 font-bold">
            Créée rien que pour vous
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Parce que chaque mariée est unique, votre robe doit l’être aussi.<br/>
            Dans notre atelier de création situé en Occitanie, nous imaginons et confectionnons des robes de mariée entièrement sur mesure, pensées pour sublimer votre silhouette, votre personnalité et votre histoire.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed italic">
            Du premier rendez-vous aux derniers ajustements, vous êtes accompagnée avec écoute, douceur et bienveillance.
          </p>
          <button 
            onClick={() => setShowContactForm(true)}
            className="inline-block bg-atelier-gold text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-atelier-gold-dark transition-all transform hover:scale-105 shadow-lg"
          >
            Prendre rendez-vous à l’atelier
          </button>
        </section>

        {/* À propos de l’atelier */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-serif text-gray-800 font-bold">À propos de l’atelier</h2>
            <p className="text-gray-600 leading-relaxed">
              Passionnée par la couture et le travail artisanal, la créatrice vous accueille dans son atelier pour donner vie à la robe dont vous rêvez.
              Chaque création est réalisée avec précision, amour du détail et respect des matières.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Ici, tout commence par l’écoute.<br/>
              Vos envies, votre morphologie, votre style et votre personnalité sont au cœur de chaque décision. Vous êtes guidée, conseillée et accompagnée à chaque étape, dans un cadre intime et rassurant.
            </p>
          </div>
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
            <img 
              src="/images/gallery/atelier2.jpg" 
              alt="L'Atelier" 
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* Le sur-mesure, comment ça se passe ? */}
        <section className="space-y-10">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-serif text-gray-800 font-bold">Le sur-mesure, comment ça se passe ?</h2>
            <p className="text-gray-600">
              Le processus est simple, fluide et pensé pour que vous viviez cette expérience en toute sérénité :
            </p>
          </div>
          
          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <span className="text-5xl font-serif text-atelier-gold/20 font-bold -mt-2">1</span>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Premier rendez-vous</h3>
                <p className="text-gray-600">Un temps d’échange pour parler de votre mariage, de vos envies et de votre budget.</p>
              </div>
            </div>
            
            <div className="flex gap-6 items-start">
              <span className="text-5xl font-serif text-atelier-gold/20 font-bold -mt-2">2</span>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Essayages et inspirations</h3>
                <p className="text-gray-600">Découverte des formes, matières, dentelles et styles qui vous mettent en valeur.</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <span className="text-5xl font-serif text-atelier-gold/20 font-bold -mt-2">3</span>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Croquis et devis personnalisé</h3>
                <p className="text-gray-600">Votre robe prend forme sur le papier. Le devis est clair et sans surprise.</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <span className="text-5xl font-serif text-atelier-gold/20 font-bold -mt-2">4</span>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Essayages intermédiaires</h3>
                <p className="text-gray-600">Plusieurs rendez-vous pour ajuster la robe à votre silhouette avec précision.</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <span className="text-5xl font-serif text-atelier-gold/20 font-bold -mt-2">5</span>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Retouches finales et livraison</h3>
                <p className="text-gray-600">Votre robe est prête, parfaitement ajustée, pour le grand jour.</p>
              </div>
            </div>
          </div>

          <p className="text-center text-gray-600 italic mt-8">
            Tout est conçu pour que vous vous sentiez confiante, écoutée et sublimée.
          </p>
        </section>

        {/* Styles de robes proposés */}
        <section className="space-y-10">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-serif text-gray-800 font-bold">Styles de robes proposés</h2>
            <p className="text-gray-600">
              Chaque robe est unique, mais peut s’inspirer de différents univers :
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <img src="/images/gallery/4.jpg" alt="Bohème" className="w-full h-64 object-cover rounded-xl shadow-md"/>
              <h3 className="text-xl font-bold text-gray-800">Robe de mariée bohème</h3>
              <p className="text-gray-600">Fluide et naturelle</p>
            </div>
            <div className="space-y-2">
              <img src="/images/gallery/14.webp" alt="Princesse" className="w-full h-64 object-cover rounded-xl shadow-md"/>
              <h3 className="text-xl font-bold text-gray-800">Robe de mariée princesse</h3>
              <p className="text-gray-600">Élégante et majestueuse</p>
            </div>
            <div className="space-y-2">
              <img src="/images/gallery/15.webp" alt="Sirène" className="w-full h-64 object-cover rounded-xl shadow-md"/>
              <h3 className="text-xl font-bold text-gray-800">Robe de mariée sirène</h3>
              <p className="text-gray-600">Féminine et sculptante</p>
            </div>
            <div className="space-y-2">
              <img src="/images/gallery/11.jpg" alt="Minimaliste" className="w-full h-64 object-cover rounded-xl shadow-md"/>
              <h3 className="text-xl font-bold text-gray-800">Robe de mariée minimaliste</h3>
              <p className="text-gray-600">Moderne et épurée</p>
            </div>
            <div className="space-y-2 md:col-span-2">
              <img src="/images/gallery/13.jpg" alt="Romantique" className="w-full h-64 object-cover rounded-xl shadow-md"/>
              <h3 className="text-xl font-bold text-gray-800 text-center">Robe de mariée romantique ou vintage</h3>
            </div>
          </div>

          <p className="text-center text-gray-600 mt-4">
            Votre robe est créée spécialement pour vous, en accord avec votre style et le thème de votre mariage.
          </p>
        </section>

        {/* Pourquoi choisir cet atelier ? */}
        <section className="bg-atelier-cream/30 p-8 rounded-2xl space-y-6">
          <h2 className="text-3xl font-serif text-gray-800 font-bold text-center">Pourquoi choisir cet atelier ?</h2>
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-center gap-3">
              <i className="fas fa-check text-atelier-gold"></i>
              Création 100 % sur mesure, du croquis à la robe finale
            </li>
            <li className="flex items-center gap-3">
              <i className="fas fa-check text-atelier-gold"></i>
              Conseils personnalisés selon votre morphologie et votre style
            </li>
            <li className="flex items-center gap-3">
              <i className="fas fa-check text-atelier-gold"></i>
              Tissus de qualité, dentelles fines et finitions soignées
            </li>
            <li className="flex items-center gap-3">
              <i className="fas fa-check text-atelier-gold"></i>
              Atelier proche de Nègrepelisse, près de Montauban
            </li>
            <li className="flex items-center gap-3">
              <i className="fas fa-check text-atelier-gold"></i>
              Une expérience humaine, chaleureuse et bienveillante
            </li>
          </ul>
        </section>

        {/* Informations pratiques */}
        <section className="space-y-6 text-center">
          <h2 className="text-3xl font-serif text-gray-800 font-bold">Informations pratiques</h2>
          <div className="space-y-2 text-gray-700">
            <p><i className="fas fa-map-marker-alt text-atelier-gold mr-2"></i>Atelier situé à Nègrepelisse, en Occitanie</p>
            <p><i className="fas fa-clock text-atelier-gold mr-2"></i>Accueil uniquement sur rendez-vous</p>
            <p><i className="fas fa-file-invoice text-atelier-gold mr-2"></i>Devis gratuit et sans engagement</p>
            <p><i className="fas fa-calendar-alt text-atelier-gold mr-2"></i>Délais de création adaptés à la date de votre mariage</p>
          </div>
        </section>

        {/* Parlons de votre robe de mariée (CTA) */}
        <section className="text-center space-y-8 pt-8 border-t border-gray-200">
          <h2 className="text-3xl font-serif text-gray-800 font-bold">Parlons de votre robe de mariée</h2>
          <p className="text-gray-600 leading-relaxed">
            Vous vous mariez prochainement et rêvez d’une robe qui vous ressemble vraiment ?<br/>
            Prenez rendez-vous à l’atelier et parlons ensemble de votre projet.
          </p>
          <p className="text-gray-600">
            Vous pouvez déjà indiquer votre date de mariage, vos inspirations et vos envies.<br/>
            Chaque belle histoire commence par une rencontre.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <button 
              onClick={() => setShowContactForm(true)}
              className="bg-atelier-green text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-atelier-green-dark transition-all shadow-lg"
            >
              Je prends rendez-vous
            </button>

          </div>
        </section>

      </div>
    </div>
  );
};

export default SurMesure;
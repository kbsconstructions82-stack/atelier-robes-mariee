import React, { useState } from 'react';

interface FAQItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => {
    return (
        <div className="border border-gray-100 rounded-2xl bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
            <button
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                onClick={onClick}
            >
                <span className="font-serif text-lg font-medium text-gray-800">{question}</span>
                <i
                    className={`fas fa-chevron-down text-atelier-gold transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''
                        }`}
                ></i>
            </button>
            <div
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'
                    }`}
            >
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                    {answer}
                </p>
            </div>
        </div>
    );
};

const FAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: "Combien de temps à l'avance faut-il s'y prendre ?",
            answer: "L'idéal est de nous contacter 6 à 8 mois avant la date de votre mariage. Cela nous permet de prendre le temps nécessaire pour la création, les essayages et les finitions sans stress. Pour les délais plus courts (moins de 4 mois), n'hésitez pas à nous contacter pour voir si notre planning le permet."
        },
        {
            question: "Quel est le budget moyen pour une robe sur mesure ?",
            answer: "Nos créations sur mesure débutent généralement à partir de 1500€. Le prix final dépendra du choix des tissus (soie, dentelle de Calais, etc.), de la complexité du modèle et du temps de travail nécessaire. Un devis détaillé est établi après le premier rendez-vous."
        },
        {
            question: "Comment se déroulent les essayages ?",
            answer: "Le processus se déroule généralement en 3 à 4 étapes : un premier rendez-vous découverte et croquis, la prise de mesures, un essayage de la 'toile' (brouillon de la robe) pour ajuster le patron, et enfin 1 à 2 essayages de la robe dans son tissu final pour les derniers ajustements."
        },
        {
            question: "Faites-vous des retouches sur des robes d'autres marques ?",
            answer: "Notre atelier se consacre principalement à la création de nos propres modèles sur mesure afin de garantir notre standard de qualité. Toutefois, selon notre charge de travail, nous pouvons parfois accepter des retouches complexes sur des robes de mariée extérieures. Contactez-nous pour en discuter."
        },
        {
            question: "Puis-je venir accompagnée ?",
            answer: "Absolument ! C’est un moment important et émouvant. Nous vous recommandons de venir accompagnée de 1 ou 2 personnes de confiance dont l'avis compte pour vous. Pour le bon déroulement des essayages dans notre atelier intimiste, nous limitons les accompagnants à 3 personnes maximum."
        }
    ];

    return (
        <div className="min-h-screen bg-atelier-cream/30 py-12 px-4 md:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <span className="text-atelier-gold font-bold text-xs uppercase tracking-widest mb-2 block">
                        Questions Fréquentes
                    </span>
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Tout savoir sur votre robe
                    </h2>
                    <p className="text-gray-500 max-w-lg mx-auto">
                        Nous avons rassemblé ici les réponses aux questions que vous nous posez le plus souvent.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === index}
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        />
                    ))}
                </div>

                <div className="mt-16 text-center bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                    <h3 className="font-serif text-xl font-bold text-gray-800 mb-2">
                        Vous ne trouvez pas votre réponse ?
                    </h3>
                    <p className="text-gray-500 mb-6">
                        N'hésitez pas à nous écrire directement, nous serons ravies de vous renseigner.
                    </p>
                    <button
                        onClick={() => document.dispatchEvent(new CustomEvent('openContactForm'))}
                        className="inline-flex items-center gap-2 text-atelier-green font-bold hover:text-atelier-green-dark transition-colors border-b-2 border-atelier-green/20 hover:border-atelier-green pb-1"
                    >
                        <i className="far fa-envelope"></i>
                        Envoyer un message
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FAQ;

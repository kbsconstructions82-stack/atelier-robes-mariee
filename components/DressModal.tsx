
import React, { useEffect } from 'react';
import { StyleCard } from '../types';

interface DressModalProps {
    dress: StyleCard;
    onClose: () => void;
}

export const DressModal: React.FC<DressModalProps> = ({ dress, onClose }) => {
    useEffect(() => {
        // Disable body scroll when modal is open
        document.body.style.overflow = 'hidden';

        // ESC key to close
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);

        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
            onClick={onClose}
        >
            <div
                className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-slideUp"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-lg transition-all hover:scale-110 active:scale-95"
                    aria-label="Fermer"
                >
                    <i className="fas fa-times text-gray-700 text-xl"></i>
                </button>

                {/* Content */}
                <div className="grid md:grid-cols-2 gap-0">
                    {/* Left: Image */}
                    <div className="relative aspect-[3/4] md:aspect-auto md:min-h-[600px] overflow-hidden rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
                        <img
                            src={dress.imageUrl}
                            alt={dress.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                    </div>

                    {/* Right: Details */}
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                        {/* Category Badge */}
                        <span className="inline-block w-fit bg-atelier-gold/10 text-atelier-gold font-bold px-4 py-2 rounded-full text-xs uppercase tracking-widest mb-6">
                            Style de robe
                        </span>

                        {/* Title */}
                        <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                            {dress.name}
                        </h2>

                        {/* Description */}
                        {dress.description && (
                            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
                                {dress.description}
                            </p>
                        )}

                        {/* Characteristics */}
                        {dress.characteristics && dress.characteristics.length > 0 && (
                            <div className="mb-8">
                                <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wider mb-4">
                                    Caractéristiques
                                </h3>
                                <ul className="space-y-3">
                                    {dress.characteristics.map((char, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <i className="fas fa-check text-atelier-green mt-1 shrink-0"></i>
                                            <span className="text-gray-600 leading-relaxed">{char}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Ideal For */}
                        {dress.idealFor && (
                            <div className="bg-atelier-cream/30 rounded-2xl p-6 border-l-4 border-atelier-gold">
                                <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <i className="fas fa-heart text-atelier-gold"></i>
                                    Idéal pour
                                </h3>
                                <p className="text-gray-700 leading-relaxed">
                                    {dress.idealFor}
                                </p>
                            </div>
                        )}

                        {/* CTA Button */}
                        <button
                            onClick={onClose}
                            className="mt-10 w-full bg-atelier-green hover:bg-atelier-green/90 text-white font-bold py-4 px-8 rounded-full transition-all transform hover:scale-105 active:scale-95 shadow-lg"
                        >
                            Parfait, j'ai compris !
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
        </div>
    );
};

export default DressModal;


import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../emailConfig';

interface ContactFormProps {
  onClose: () => void;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  message: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    message: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('idle');
    setErrorMessage('');

    try {
      // Préparer les paramètres pour le template EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        preferred_date: formData.date,
        message: formData.message || 'Aucun message spécifique',
        to_email: 'mazioudjamila@gmail.com'
      };

      console.log('Envoi email avec:', {
        service: EMAILJS_CONFIG.SERVICE_ID,
        template: EMAILJS_CONFIG.TEMPLATE_ID,
        params: templateParams
      });

      // Utilisation de fetch direct pour contourner le problème SDK/Extensions
      const data = {
        service_id: EMAILJS_CONFIG.SERVICE_ID,
        template_id: EMAILJS_CONFIG.TEMPLATE_ID,
        user_id: EMAILJS_CONFIG.PUBLIC_KEY,
        template_params: templateParams
      };

      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erreur API (${response.status}): ${errorText}`);
      }

      setStatus('success');

      // Fermer le formulaire après 2 secondes
      setTimeout(() => {
        onClose();
      }, 2000);

    } catch (error: any) {
      console.error('Erreur EmailJS:', error);
      setStatus('error');
      // Afficher un message plus détaillé si disponible
      if (error.text) {
        setErrorMessage(`Erreur: ${error.text} (${error.status})`);
      } else {
        setErrorMessage('Une erreur technique est survenue. Vérifiez la console.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4 animate-fade-in">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <i className="fas fa-times text-xl"></i>
        </button>

        <h2 className="font-serif text-2xl font-bold text-gray-800 mb-6 text-center">Prendre Rendez-vous</h2>

        {status === 'success' && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
            <i className="fas fa-check-circle text-green-500 text-xl"></i>
            <p className="text-green-700 font-medium">Message envoyé avec succès ! Nous vous contacterons bientôt.</p>
          </div>
        )}

        {status === 'error' && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
            <i className="fas fa-exclamation-circle text-red-500 text-xl"></i>
            <p className="text-red-700 text-sm">{errorMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-atelier-green focus:border-transparent outline-none"
              placeholder="Votre nom"
              disabled={isLoading}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-atelier-green focus:border-transparent outline-none"
                placeholder="votre@email.com"
                disabled={isLoading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-atelier-green focus:border-transparent outline-none"
                placeholder="06 12 34 56 78"
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date souhaitée</label>
            <input
              type="date"
              required
              value={formData.date}
              min={new Date().toISOString().split('T')[0]}
              onChange={e => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-atelier-green focus:border-transparent outline-none"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message (Optionnel)</label>
            <textarea
              rows={3}
              value={formData.message}
              onChange={e => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-atelier-green focus:border-transparent outline-none"
              placeholder="Précisez votre demande..."
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-atelier-green hover:bg-atelier-green-dark text-white font-bold py-3 rounded-xl transition-all transform hover:scale-105 shadow-lg mt-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                Envoi en cours...
              </>
            ) : (
              'Envoyer la demande'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

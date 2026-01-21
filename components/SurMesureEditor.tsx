import React, { useState, useEffect } from 'react';
import { GALLERY_IMAGES } from '../constants';

interface CustomContent {
  text: string;
  images: string[];
}

const SurMesureEditor: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState<CustomContent>({ text: '', images: [] });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const savedContent = localStorage.getItem('surMesureCustomContent');
    if (savedContent) {
      setContent(JSON.parse(savedContent));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('surMesureCustomContent', JSON.stringify(content));
    setIsEditing(false);
  };

  const toggleImageSelection = (img: string) => {
    setContent(prev => {
      const isSelected = prev.images.includes(img);
      if (isSelected) {
        return { ...prev, images: prev.images.filter(i => i !== img) };
      } else {
        return { ...prev, images: [...prev.images, img] };
      }
    });
  };

  if (!isEditing) {
    // View Mode
    if (!content.text && content.images.length === 0) {
      return (
        <div className="py-12 text-center">
           <button 
            onClick={() => setIsEditing(true)}
            className="bg-gray-100 text-gray-600 px-6 py-3 rounded-full hover:bg-gray-200 transition-colors"
          >
            <i className="fas fa-plus mr-2"></i>
            Ajouter du contenu personnalisé
          </button>
        </div>
      );
    }

    return (
      <div className="py-12 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-serif text-2xl text-gray-800">Votre contenu personnalisé</h3>
            <button 
              onClick={() => setIsEditing(true)}
              className="text-atelier-green hover:underline text-sm"
            >
              <i className="fas fa-edit mr-1"></i> Modifier
            </button>
          </div>
          
          {content.text && (
            <div className="prose prose-lg text-gray-600 mb-10 whitespace-pre-wrap">
              {content.text}
            </div>
          )}

          {content.images.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.images.map((img, idx) => (
                <div key={idx} className="aspect-[3/4] rounded-xl overflow-hidden shadow-md">
                  <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Edit Mode
  return (
    <div className="py-12 bg-gray-50 border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="font-serif text-2xl text-gray-800 mb-6">Éditer le contenu</h3>
          
          {/* Text Editor */}
          <div className="mb-8">
            <label className="block text-sm font-bold text-gray-700 mb-2">Votre texte</label>
            <textarea
              value={content.text}
              onChange={(e) => setContent(prev => ({ ...prev, text: e.target.value }))}
              className="w-full h-40 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-atelier-gold focus:border-transparent transition-all"
              placeholder="Écrivez votre texte ici... (Les sauts de ligne sont conservés)"
            />
            <p className="text-xs text-gray-400 mt-2">Astuce : Utilisez des tirets (-) pour faire des listes.</p>
          </div>

          {/* Image Selector */}
          <div className="mb-8">
            <label className="block text-sm font-bold text-gray-700 mb-4">Sélectionner des images de la galerie ({content.images.length} sélectionnées)</label>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 max-h-96 overflow-y-auto p-2 border border-gray-200 rounded-xl">
              {GALLERY_IMAGES.map((img, idx) => {
                const isSelected = content.images.includes(img);
                return (
                  <div 
                    key={idx}
                    onClick={() => toggleImageSelection(img)}
                    className={`relative aspect-square cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                      isSelected ? 'border-atelier-green ring-2 ring-atelier-green/30' : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img src={img} alt={`Select ${idx}`} className="w-full h-full object-cover" />
                    {isSelected && (
                      <div className="absolute inset-0 bg-atelier-green/40 flex items-center justify-center">
                        <i className="fas fa-check-circle text-white text-2xl drop-shadow-md"></i>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
            <button 
              onClick={() => setIsEditing(false)}
              className="px-6 py-3 text-gray-500 hover:text-gray-700 font-medium transition-colors"
            >
              Annuler
            </button>
            <button 
              onClick={handleSave}
              className="px-8 py-3 bg-atelier-green text-white rounded-full hover:bg-atelier-green-dark shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 font-bold"
            >
              <i className="fas fa-save mr-2"></i> Enregistrer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurMesureEditor;
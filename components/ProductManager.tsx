
import React, { useState, useEffect } from 'react';
import { Product, FabricType, ProductMeasurements, ProductStatus, ProductCategory } from '../types';
import { OWNER_CONTACT } from '../constants';
import { EMAILJS_CONFIG, CONTACT_EMAIL } from '../emailConfig';

const FABRIC_OPTIONS: FabricType[] = ['Soie', 'Dentelle', 'Satin', 'Tulle', 'Mousseline', 'Crêpe', 'Autre'];
const CATEGORY_OPTIONS: ProductCategory[] = ['Robe', 'Accessoire', 'Tenue'];

const STATUS_LABELS: Record<ProductStatus, string> = {
  pending: 'En attente',
  fitting: 'Essayage',
  completed: 'Terminé'
};

const STATUS_COLORS: Record<ProductStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  fitting: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800'
};

export const ProductManager: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [lastSavedProduct, setLastSavedProduct] = useState<Product | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({
    measurements: { length: 0, width: 0 },
    color: { hex: '#ffffff', name: 'Blanc' },
    fabric: 'Soie',
    category: 'Robe',
    imageUrl: '',
    email: '',
    phone: '',
    status: 'pending'
  });

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('atelier_products');
    if (saved) {
      try {
        setProducts(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load products', e);
      }
    }
  }, []);

  // Save to local storage whenever products change
  useEffect(() => {
    localStorage.setItem('atelier_products', JSON.stringify(products));
  }, [products]);

  const formatProductMessage = (product: Product) => {
    return `Nouvelle fiche produit - ${product.name}
    
Détails techniques :
- Tissu : ${product.fabric}
- Couleur : ${product.color.name}
- Dimensions : L ${product.measurements.length}cm x l ${product.measurements.width}cm
${product.measurements.bust ? `- Poitrine : ${product.measurements.bust}cm` : ''}
${product.measurements.waist ? `- Taille : ${product.measurements.waist}cm` : ''}

Client :
${product.email ? `- Email : ${product.email}` : ''}
${product.phone ? `- Tel : ${product.phone}` : ''}

Notes : ${product.notes || 'Aucune'}
`;
  };

  const handleSendEmail = async () => {
    if (!lastSavedProduct) return;

    setIsSending(true);
    try {
      const message = formatProductMessage(lastSavedProduct);

      const templateParams = {
        from_name: lastSavedProduct.name || 'Client Atelier',
        from_email: lastSavedProduct.email || 'Pas d\'email fourni',
        phone: lastSavedProduct.phone || 'Pas de téléphone',
        message: message,
        to_email: CONTACT_EMAIL
      };

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
        throw new Error('Erreur lors de l\'envoi');
      }

      alert('Fiche technique envoyée avec succès !');
      setShowShareOptions(false);
      setLastSavedProduct(null);

    } catch (error) {
      console.error('Erreur envoi email:', error);
      alert('Erreur lors de l\'envoi de l\'email. Veuillez réessayer.');
    } finally {
      setIsSending(false);
    }
  };

  const handleWhatsAppShare = () => {
    if (!lastSavedProduct) return;
    const message = formatProductMessage(lastSavedProduct);
    const url = `https://wa.me/${OWNER_CONTACT.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setShowShareOptions(false);
    setLastSavedProduct(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Empêcher la soumission si on n'est pas à la dernière étape
    if (currentStep !== 2) {
      return;
    }

    if (!currentProduct.name || !currentProduct.measurements) return;

    const newProduct: Product = {
      id: currentProduct.id || crypto.randomUUID(),
      name: currentProduct.name,
      measurements: currentProduct.measurements as ProductMeasurements,
      fabric: currentProduct.fabric as FabricType,
      color: currentProduct.color || { hex: '#ffffff', name: 'Blanc' },
      category: currentProduct.category || 'Robe',
      imageUrl: currentProduct.imageUrl,
      notes: currentProduct.notes,
      email: currentProduct.email,
      phone: currentProduct.phone,
      status: currentProduct.status || 'pending',
      createdAt: currentProduct.createdAt || Date.now()
    };

    if (currentProduct.id) {
      setProducts(products.map(p => p.id === newProduct.id ? newProduct : p));
    } else {
      setProducts([...products, newProduct]);
    }

    setLastSavedProduct(newProduct);
    setIsEditing(false);
    setShowShareOptions(true);
    resetForm();
  };

  const resetForm = () => {
    setCurrentProduct({
      measurements: { length: 0, width: 0 },
      color: { hex: '#ffffff', name: 'Blanc' },
      fabric: 'Soie',
      category: 'Robe',
      imageUrl: '',
      email: '',
      phone: '',
      status: 'pending'
    });
    setCurrentStep(1);
  };

  const handleEdit = (product: Product) => {
    setCurrentProduct(product);
    setCurrentStep(1);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Êtes-vous sûre de vouloir supprimer ce produit ?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleReport = (product: Product) => {
    const subject = `Signalement : ${product.name}`;
    const body = `Bonjour,\n\nJe souhaite signaler un problème avec la fiche produit "${product.name}" (ID: ${product.id}).\n\nRaison : Contenu inapproprié ou hors-sujet.\n\nMerci de vérifier.`;
    const url = `mailto:${OWNER_CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(products, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = `atelier_backup_${new Date().toISOString().split('T')[0]}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedProducts = JSON.parse(e.target?.result as string);
        if (Array.isArray(importedProducts)) {
          if (confirm(`Importer ${importedProducts.length} produits ? Cela remplacera la liste actuelle.`)) {
            setProducts(importedProducts);
            alert('Import réussi !');
          }
        } else {
          alert('Format de fichier invalide');
        }
      } catch (error) {
        alert('Erreur lors de la lecture du fichier');
      }
    };
    reader.readAsText(file);
  };

  if (showShareOptions) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-check text-green-500 text-3xl"></i>
          </div>
          <h2 className="font-serif text-2xl font-bold text-gray-800 mb-2">Fiche enregistrée !</h2>
          <p className="text-gray-500 mb-8">Voulez-vous envoyer les détails maintenant ?</p>

          <div className="space-y-4">
            <button
              onClick={handleWhatsAppShare}
              className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-transform hover:scale-105"
            >
              <i className="fab fa-whatsapp text-2xl"></i>
              Envoyer par WhatsApp
            </button>

            <button
              onClick={handleSendEmail}
              disabled={isSending}
              className={`w-full text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-transform hover:scale-105 ${isSending ? 'bg-blue-400 cursor-wait' : 'bg-blue-600 hover:bg-blue-700'
                }`}
            >
              {isSending ? (
                <>
                  <i className="fas fa-spinner fa-spin text-2xl"></i>
                  Envoi en cours...
                </>
              ) : (
                <>
                  <i className="far fa-envelope text-2xl"></i>
                  Envoyer par Email (Direct)
                </>
              )}
            </button>

            <button
              onClick={() => { setShowShareOptions(false); setLastSavedProduct(null); }}
              className="w-full text-gray-400 font-medium hover:text-gray-600 py-2"
            >
              Non, plus tard
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg my-8">
        {/* Header with Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-serif text-2xl text-gray-800 font-bold">
              {currentProduct.id ? 'Modifier le produit' : 'Nouveau produit'}
            </h2>
            <button
              onClick={() => setIsEditing(false)}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Fermer"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>

          <div className="flex justify-between relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -z-10"></div>
            {[1, 2].map((step) => (
              <div
                key={step}
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step === currentStep
                  ? 'bg-atelier-green text-white'
                  : step < currentStep
                    ? 'bg-green-100 text-green-600'
                    : 'bg-gray-100 text-gray-400'
                  }`}
              >
                {step}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2 px-1">
            <span>Informations Client</span>
            <span>Mesures & Finitions</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: General Info */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Informations Client</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom du modèle / Client *</label>
                <input
                  type="text"
                  required
                  value={currentProduct.name || ''}
                  onChange={e => {
                    const val = e.target.value;
                    // Basic "Auto-Moderation" check
                    if (val.toLowerCase().includes('viagra') || val.toLowerCase().includes('casino')) {
                      alert('Contenu inapproprié détecté. Veuillez utiliser des termes liés à la couture.');
                      return;
                    }
                    setCurrentProduct({ ...currentProduct, name: val });
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-atelier-green focus:border-transparent outline-none transition-all"
                  placeholder="Ex: Robe Marie - Essai 1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
                <select
                  value={currentProduct.category || 'Robe'}
                  onChange={e => setCurrentProduct({ ...currentProduct, category: e.target.value as ProductCategory })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-atelier-green outline-none bg-white"
                >
                  {CATEGORY_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={currentProduct.email || ''}
                    onChange={e => setCurrentProduct({ ...currentProduct, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-atelier-green focus:border-transparent outline-none transition-all"
                    placeholder="client@exemple.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                  <input
                    type="tel"
                    value={currentProduct.phone || ''}
                    onChange={e => setCurrentProduct({ ...currentProduct, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-atelier-green focus:border-transparent outline-none transition-all"
                    placeholder="06 12 34 56 78"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                <select
                  value={currentProduct.status || 'pending'}
                  onChange={e => setCurrentProduct({ ...currentProduct, status: e.target.value as ProductStatus })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-atelier-green outline-none bg-white"
                >
                  <option value="pending">En attente</option>
                  <option value="fitting">Essayage</option>
                  <option value="completed">Terminé</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 2: Measurements & Finitions */}
          {currentStep === 2 && (
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Prise de Mesures (cm)</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Longueur *</label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={currentProduct.measurements?.length || ''}
                      onChange={e => setCurrentProduct({
                        ...currentProduct,
                        measurements: { ...currentProduct.measurements!, length: Number(e.target.value) }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-atelier-green outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Largeur / Carrure *</label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={currentProduct.measurements?.width || ''}
                      onChange={e => setCurrentProduct({
                        ...currentProduct,
                        measurements: { ...currentProduct.measurements!, width: Number(e.target.value) }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-atelier-green outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tour de poitrine</label>
                    <input
                      type="number"
                      min="0"
                      value={currentProduct.measurements?.bust || ''}
                      onChange={e => setCurrentProduct({
                        ...currentProduct,
                        measurements: { ...currentProduct.measurements!, bust: Number(e.target.value) }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-atelier-green outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tour de taille</label>
                    <input
                      type="number"
                      min="0"
                      value={currentProduct.measurements?.waist || ''}
                      onChange={e => setCurrentProduct({
                        ...currentProduct,
                        measurements: { ...currentProduct.measurements!, waist: Number(e.target.value) }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-atelier-green outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Matériaux & Finitions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type de tissu</label>
                    <select
                      value={currentProduct.fabric}
                      onChange={e => setCurrentProduct({ ...currentProduct, fabric: e.target.value as FabricType })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-atelier-green outline-none bg-white"
                    >
                      {FABRIC_OPTIONS.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Couleur</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={currentProduct.color?.hex}
                        onChange={e => setCurrentProduct({
                          ...currentProduct,
                          color: { ...currentProduct.color!, hex: e.target.value }
                        })}
                        className="h-12 w-14 rounded cursor-pointer border-0 p-0"
                      />
                      <input
                        type="text"
                        value={currentProduct.color?.name}
                        onChange={e => setCurrentProduct({

                        ...currentProduct,
                        color: { ...currentProduct.color!, name: e.target.value }
                      })}
                      placeholder="Nom (ex: Blanc cassé)"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-atelier-green outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes techniques / Spécifications</label>
                <textarea
                  rows={4}
                  value={currentProduct.notes || ''}
                  onChange={e => setCurrentProduct({ ...currentProduct, notes: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-atelier-green outline-none"
                  placeholder="Détails supplémentaires..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Photo du modèle (URL)</label>
                <input
                  type="url"
                  value={currentProduct.imageUrl || ''}
                  onChange={e => setCurrentProduct({ ...currentProduct, imageUrl: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-atelier-green outline-none"
                  placeholder="https://..."
                />
                <p className="text-xs text-gray-500 mt-1">L'image doit être de haute qualité et liée au mariage.</p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4 pt-4 border-t border-gray-100 mt-8">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-6 py-3 border border-gray-300 text-gray-700 font-bold rounded-full hover:bg-gray-50 transition-colors"
              >
                Précédent
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 font-bold rounded-full hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
            )}

            {currentStep < 2 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep + 1)}
                className="flex-1 px-6 py-3 bg-atelier-green text-white font-bold rounded-full hover:bg-atelier-green-dark shadow-lg transition-all"
              >
                Suivant
              </button>
            ) : (
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-atelier-green text-white font-bold rounded-full hover:bg-atelier-green-dark shadow-lg transition-all transform hover:scale-105"
              >
                Enregistrer
              </button>
            )}
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pb-24">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="font-serif text-3xl text-gray-800 font-bold">Gestion Atelier</h2>
          <p className="text-gray-500">Gérez vos créations et stocks de tissus</p>
        </div>
        <div className="flex gap-2">
          <div className="hidden md:flex gap-2">
            <button
              onClick={handleExport}
              className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-3 rounded-full font-bold transition-all flex items-center gap-2"
              title="Exporter les données (JSON)"
            >
              <i className="fas fa-download"></i>
            </button>
            <label className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-3 rounded-full font-bold transition-all flex items-center gap-2 cursor-pointer" title="Importer des données">
              <i className="fas fa-upload"></i>
              <input type="file" accept=".json" onChange={handleImport} className="hidden" />
            </label>
          </div>
          <button
            onClick={() => { resetForm(); setIsEditing(true); }}
            className="bg-atelier-gold hover:bg-[#B08D55] text-white px-6 py-3 rounded-full shadow-md font-bold transition-all flex items-center gap-2"
          >
            <i className="fas fa-plus"></i>
            <span className="hidden md:inline">Nouveau Produit</span>
          </button>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-200">
          <div className="text-gray-300 text-6xl mb-4">
            <i className="fas fa-tshirt"></i>
          </div>
          <p className="text-gray-500 text-lg mb-6">Aucun produit enregistré pour le moment.</p>
          <button
            onClick={() => { resetForm(); setIsEditing(true); }}
            className="text-atelier-green font-bold hover:underline"
          >
            Commencer une nouvelle fiche technique
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow p-6 group">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-gray-800 text-lg">{product.name}</h3>
                    <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full ${STATUS_COLORS[product.status || 'pending']}`}>
                      {STATUS_LABELS[product.status || 'pending']}
                    </span>
                  </div>
                  {(product.email || product.phone) && (
                    <div className="text-xs text-gray-500 mt-1">
                      {product.email && <div className="flex items-center gap-1"><i className="far fa-envelope"></i> {product.email}</div>}
                      {product.phone && <div className="flex items-center gap-1"><i className="fas fa-phone-alt"></i> {product.phone}</div>}
                    </div>
                  )}
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(product.createdAt).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <div className="w-8 h-8 rounded-full shadow-inner border border-gray-200" style={{ backgroundColor: product.color.hex }} title={product.color.name}></div>
                  {product.imageUrl && (
                    <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-cover rounded-lg border border-gray-200" />
                  )}
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Tissu</span>
                  <span className="font-medium text-gray-800">{product.fabric}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Dimensions</span>
                  <span className="font-medium text-gray-800">{product.measurements.length} x {product.measurements.width} cm</span>
                </div>
              </div>

              <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleReport(product)}
                  className="text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 p-2 rounded-lg"
                  title="Signaler (Contenu inapproprié)"
                >
                  <i className="fas fa-flag"></i>
                </button>
                <button
                  onClick={() => handleEdit(product)}
                  className="text-atelier-green hover:text-atelier-green-dark bg-atelier-sage-light/50 p-2 rounded-lg"
                  title="Modifier"
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="text-red-400 hover:text-red-600 bg-red-50 p-2 rounded-lg"
                  title="Supprimer"
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

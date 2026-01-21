
import React, { useState, Suspense, useEffect } from 'react';
import { AppTab } from './types';
import Home from './components/Home';
import SurMesure from './components/SurMesure';
import Layout from './components/Layout';
import FAQ from './components/FAQ';
import { ContactForm } from './components/ContactForm';

// Lazy load the ProductManager to improve initial load time
const ProductManager = React.lazy(() => import('./components/ProductManager').then(module => ({ default: module.ProductManager })));

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.HOME);
  const [showContactForm, setShowContactForm] = useState(false);

  useEffect(() => {
    const handleOpenContact = () => setShowContactForm(true);
    document.addEventListener('openContactForm', handleOpenContact);
    return () => document.removeEventListener('openContactForm', handleOpenContact);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.HOME:
        return <Home />;
      case AppTab.CREATIONS:
        return (
          <Suspense fallback={
            <div className="flex justify-center items-center min-h-[50vh]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-atelier-green"></div>
            </div>
          }>
            <ProductManager />
          </Suspense>
        );
      case AppTab.PROCESS:
        return <SurMesure />;
      case AppTab.FAQ:
        return <FAQ />;
      default:
        return <Home />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
      {showContactForm && <ContactForm onClose={() => setShowContactForm(false)} />}
    </Layout>
  );
};

export default App;

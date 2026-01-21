
import React from 'react';
import { AppTab } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  return (
    <div className="min-h-screen bg-atelier-cream text-gray-800 flex flex-col">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-md py-4 px-6 border-b border-white/40 sticky top-0 z-50 shadow-sm flex items-center justify-center">
        <h1 className="font-serif text-lg md:text-xl font-semibold tracking-wide text-gray-900">
          Atelier Robes de Mariée
        </h1>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Bottom Navigation - Fixed as requested */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-auto max-w-[95vw] bg-white/80 backdrop-blur-md border border-white/40 shadow-2xl z-[100] rounded-full px-2 py-2">
        <div className="flex items-center gap-1">
          <button
            onClick={() => onTabChange(AppTab.HOME)}
            className={`flex items-center justify-center gap-2 px-5 py-3 rounded-full transition-all duration-300 ${activeTab === AppTab.HOME
              ? 'bg-atelier-gold text-white shadow-lg'
              : 'text-gray-500 hover:bg-gray-100/50 hover:text-gray-900'
              }`}
          >
            <i className="fas fa-home text-lg"></i>
            <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Accueil</span>
          </button>

          <button
            onClick={() => onTabChange(AppTab.CREATIONS)}
            className={`flex items-center justify-center gap-2 px-5 py-3 rounded-full transition-all duration-300 ${activeTab === AppTab.CREATIONS
              ? 'bg-atelier-gold text-white shadow-lg'
              : 'text-gray-500 hover:bg-gray-100/50 hover:text-gray-900'
              }`}
          >
            <i className="fas fa-pencil-ruler text-lg"></i>
            <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Atelier</span>
          </button>

          <button
            onClick={() => onTabChange(AppTab.PROCESS)}
            className={`flex items-center justify-center gap-2 px-5 py-3 rounded-full transition-all duration-300 ${activeTab === AppTab.PROCESS
              ? 'bg-atelier-gold text-white shadow-lg'
              : 'text-gray-500 hover:bg-gray-100/50 hover:text-gray-900'
              }`}
          >
            <i className="fas fa-user-clock text-lg"></i>
            <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Sur Mesure</span>
          </button>

          <button
            onClick={() => onTabChange(AppTab.FAQ)}
            className={`flex items-center justify-center gap-2 px-5 py-3 rounded-full transition-all duration-300 ${activeTab === AppTab.FAQ
              ? 'bg-atelier-gold text-white shadow-lg'
              : 'text-gray-500 hover:bg-gray-100/50 hover:text-gray-900'
              }`}
          >
            <i className="far fa-question-circle text-lg"></i>
            <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">FAQ</span>
          </button>
        </div>
      </nav>

      {/* Spacer for bottom nav to prevent content cut-off */}
      <div className="h-20"></div>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/33767663155"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 right-6 md:bottom-10 md:right-10 w-14 h-14 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full shadow-2xl flex items-center justify-center transition-all transform hover:scale-110 z-[90]"
        aria-label="Contacter sur WhatsApp"
        title="Discuter sur WhatsApp"
      >
        <i className="fab fa-whatsapp text-3xl"></i>
      </a>
    </div>
  );
};

export default Layout;

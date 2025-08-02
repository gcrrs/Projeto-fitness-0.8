import React, { useState } from 'react';

// Importa os novos componentes de seção
import NutricaoDiaria from './Nutricao.jsx';
import TreinoHoje from './Treino.jsx';
import Progresso from './Progresso.jsx';
import PerfilRapido from './Perfil.jsx';

function Dashboard({ userProfile, onReset }) {
  const [activeSection, setActiveSection] = useState('treino');

  const renderContent = () => {
    switch (activeSection) {
      case 'treino': 
        return <TreinoHoje userProfile={userProfile} />;
      case 'nutricao': 
        return <NutricaoDiaria userProfile={userProfile} />;
      case 'progresso': 
        return <Progresso userProfile={userProfile} />;
      case 'perfil': 
        return <PerfilRapido userProfile={userProfile} onReset={onReset} />;
      default: 
        return <TreinoHoje userProfile={userProfile} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">FitCore</h1>
          <nav className="flex flex-wrap justify-center space-x-2 sm:space-x-4">
            <button onClick={() => setActiveSection('treino')} className={`px-3 py-2 rounded-md text-sm font-medium ${activeSection === 'treino' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-200'}`}>Treino</button>
            <button onClick={() => setActiveSection('nutricao')} className={`px-3 py-2 rounded-md text-sm font-medium ${activeSection === 'nutricao' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-200'}`}>Nutrição</button>
            <button onClick={() => setActiveSection('progresso')} className={`px-3 py-2 rounded-md text-sm font-medium ${activeSection === 'progresso' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-200'}`}>Progresso</button>
            <button onClick={() => setActiveSection('perfil')} className={`px-3 py-2 rounded-md text-sm font-medium ${activeSection === 'perfil' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-200'}`}>Perfil</button>
          </nav>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {userProfile ? renderContent() : <div className="text-center p-10">Carregando perfil...</div>}
      </main>
    </div>
  );
}

export default Dashboard;
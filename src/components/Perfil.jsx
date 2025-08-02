import React from 'react';
import { exportarParaPDF, exportarParaCSV } from '../utils/exportarDados.js';
import Card from './ui/Card.jsx';

const PerfilRapido = ({ userProfile, onReset }) => {
  
  const handleExportPDF = () => exportarParaPDF(userProfile, {});
  const handleExportCSV = () => exportarParaCSV(userProfile, {});

  return (
    <Card title="Meu Perfil">
      <div className="space-y-3 bg-gray-50 p-4 rounded-lg border">
        <p><strong>Objetivo:</strong> <span className="capitalize">{userProfile.objetivo}</span></p>
        <p><strong>Experiência:</strong> <span className="capitalize">{userProfile.experiencia}</span></p>
        <p><strong>Peso:</strong> {userProfile.peso} kg</p>
        <p><strong>Altura:</strong> {userProfile.altura} cm</p>
        <p><strong>Frequência:</strong> {userProfile.frequencia}x por semana</p>
      </div>
      <div className="mt-6 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <button onClick={handleExportPDF} className="flex-1 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700">Exportar PDF</button>
          <button onClick={handleExportCSV} className="flex-1 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700">Exportar CSV</button>
          <button onClick={onReset} className="flex-1 px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600">Resetar Perfil</button>
      </div>
    </Card>
  );
};

export default PerfilRapido;
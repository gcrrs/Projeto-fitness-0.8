import React, { useState, useEffect } from 'react';
import { exercicios } from '../data/exercicios.js';

const ModalSubstituirExercicio = ({ exercicioOriginal, onSelect, onClose, userProfile }) => {
  const [opcoes, setOpcoes] = useState([]);
  const [loading, setLoading] = useState(true);

  // =================== TRAVA DE SEGURANÇA ADICIONADA AQUI ===================
  // Se, por qualquer motivo, o componente for renderizado sem um exercício,
  // ele não fará nada e evitará o erro.
  if (!exercicioOriginal) {
    return null;
  }
  // =======================================================================

  useEffect(() => {
    setLoading(true);
    
    // Filtra exercícios do mesmo músculo, com equipamentos e dificuldade compatíveis
    const alternativas = exercicios.filter(ex => 
        ex.musculo_principal === exercicioOriginal.musculo_principal &&
        ex.id !== exercicioOriginal.id &&
        (userProfile.equipamentos.includes(ex.equipamento) || ex.equipamento === 'body_only')
    ).slice(0, 5); // Limita a 5 opções

    setOpcoes(alternativas);
    setLoading(false);
  }, [exercicioOriginal]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg animate-fade-in-up">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Substituir {exercicioOriginal.nome}</h2>
          <button onClick={onClose} className="text-3xl font-light text-gray-500 hover:text-gray-900">&times;</button>
        </div>
        
        <p className="text-gray-600 mb-4">Escolha um exercício alternativo para o mesmo grupo muscular.</p>

        <div className="space-y-3 max-h-80 overflow-y-auto">
          {loading && <p className="text-center text-gray-500">Buscando alternativas...</p>}
          {!loading && opcoes.length === 0 && <p className="text-center text-gray-500">Nenhuma alternativa compatível encontrada.</p>}
          {opcoes.map(opcao => (
            <button
              key={opcao.id}
              onClick={() => onSelect(opcao)}
              className="w-full text-left p-4 bg-gray-100 hover:bg-blue-100 rounded-lg transition-colors"
            >
              <p className="font-semibold text-blue-800">{opcao.nome}</p>
              <p className="text-sm text-gray-500 capitalize">Equipamento: {opcao.equipamento.replace(/_/g, ' ')}</p>
            </button>
          ))}
        </div>

        <button onClick={onClose} className="mt-6 w-full py-2 px-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600">
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default ModalSubstituirExercicio;
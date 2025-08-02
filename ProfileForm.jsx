// Arquivo: src/components/ProfileForm.jsx

import React, { useState } from 'react';

const equipamentosDisponiveis = [
  { id: 'sem_equipamentos', label: 'Nenhum (Peso Corporal)' },
  { id: 'halteres', label: 'Halteres' },
  { id: 'barra', label: 'Barra e Anilhas' },
  { id: 'kettlebell', label: 'Kettlebell' },
  { id: 'elastico', label: 'Elásticos de Resistência' },
  { id: 'maquina', label: 'Máquinas de Musculação' },
];

function ProfileForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    sexo: 'masculino',
    idade: 30,
    peso: 70,
    altura: 175,
    objetivo: 'manter',
    experiencia: 'iniciante',
    frequencia: '3',
    equipamentos: [],
    restricoes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEquipamentoChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      const equipamentos = prev.equipamentos;
      if (checked) {
        return { ...prev, equipamentos: [...equipamentos, value] };
      } else {
        return { ...prev, equipamentos: equipamentos.filter(eq => eq !== value) };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { peso, altura } = formData;
    const imc = (peso / ((altura / 100) ** 2)).toFixed(1);
    onSubmit({ ...formData, imc });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-800">Crie seu Perfil FitCore</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campos de Sexo, Idade, Peso, Altura... */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="sexo" className="block text-sm font-medium text-gray-700">Sexo</label>
              <select id="sexo" name="sexo" value={formData.sexo} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm">
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
              </select>
            </div>
            <div>
              <label htmlFor="idade" className="block text-sm font-medium text-gray-700">Idade</label>
              <input type="number" id="idade" name="idade" value={formData.idade} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
            </div>
            <div>
              <label htmlFor="peso" className="block text-sm font-medium text-gray-700">Peso (kg)</label>
              <input type="number" id="peso" name="peso" value={formData.peso} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
            </div>
            <div>
              <label htmlFor="altura" className="block text-sm font-medium text-gray-700">Altura (cm)</label>
              <input type="number" id="altura" name="altura" value={formData.altura} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
            </div>
          </div>
          {/* ... Objetivo, Experiência, Frequência ... */}

          {/* NOVO CAMPO DE EQUIPAMENTOS COM CHECKBOXES */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Equipamentos Disponíveis</label>
            <div className="mt-2 space-y-2">
              {equipamentosDisponiveis.map(eq => (
                <div key={eq.id} className="flex items-center">
                  <input
                    id={eq.id}
                    name="equipamentos"
                    type="checkbox"
                    value={eq.id}
                    checked={formData.equipamentos.includes(eq.id)}
                    onChange={handleEquipamentoChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label htmlFor={eq.id} className="ml-3 block text-sm text-gray-800">{eq.label}</label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="restricoes" className="block text-sm font-medium text-gray-700">Restrições Físicas (opcional)</label>
            <textarea id="restricoes" name="restricoes" value={formData.restricoes} onChange={handleChange} rows="2" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"></textarea>
          </div>

          <button type="submit" className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700">
            Criar Perfil
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfileForm;
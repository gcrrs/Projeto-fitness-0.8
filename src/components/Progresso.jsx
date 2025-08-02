import React, { useState, useEffect, useMemo } from 'react';
import GraficoEvolucao from './GraficoEvolucao.jsx';
import Card from './ui/Card.jsx';
import Dropdown from './ui/Dropdown.jsx'; // Importa nosso novo componente

const Progresso = ({ userProfile }) => {
  const [historicoPeso, setHistoricoPeso] = useState(() => JSON.parse(localStorage.getItem('fitcoreHistoricoPeso') || '[]'));
  const [historicoTreinos, setHistoricoTreinos] = useState(() => JSON.parse(localStorage.getItem('fitcoreHistoricoTreinos') || '{}'));
  
  // ALTERADO: O estado agora pode guardar o objeto inteiro do exercício, ou null
  const [exercicioSelecionado, setExercicioSelecionado] = useState(null);

  useEffect(() => {
    if (userProfile && historicoPeso.length === 0 && userProfile.peso) {
      const registroInicial = { date: new Date().toISOString(), value: userProfile.peso };
      setHistoricoPeso([registroInicial]);
      localStorage.setItem('fitcoreHistoricoPeso', JSON.stringify([registroInicial]));
    }
  }, [userProfile]);

  const handleRegistrarPeso = (e) => {
    e.preventDefault();
    const novoPesoInput = e.target.elements.peso;
    const novoPeso = novoPesoInput.value;
    if (!novoPeso || novoPeso <= 0) { alert("Por favor, insira um peso válido."); return; }
    const novoRegistro = { date: new Date().toISOString(), value: parseFloat(novoPeso) };
    setHistoricoPeso(prevHistorico => {
      const novoHistorico = [...prevHistorico, novoRegistro].sort((a, b) => new Date(a.date) - new Date(b.date));
      localStorage.setItem('fitcoreHistoricoPeso', JSON.stringify(novoHistorico));
      return novoHistorico;
    });
    novoPesoInput.value = '';
  };

  const dadosGraficoForca = useMemo(() => {
    if (!exercicioSelecionado) return [];
    const historicoDoExercicio = [];
    Object.keys(historicoTreinos).sort().forEach(date => {
      // ALTERADO: Usa exercicioSelecionado.id para a busca
      const exercicioDoDia = historicoTreinos[date].find(ex => ex.id === exercicioSelecionado.id);
      if (exercicioDoDia) {
        historicoDoExercicio.push({ date: date, value: exercicioDoDia.carga });
      }
    });
    return historicoDoExercicio;
  }, [exercicioSelecionado, historicoTreinos]);

  const listaExerciciosUnicos = useMemo(() => {
    const exercicios = new Map();
    Object.values(historicoTreinos).flat().forEach(ex => {
      if (!exercicios.has(ex.id)) {
        // Guarda o objeto com id e nome para o dropdown
        exercicios.set(ex.id, { id: ex.id, nome: ex.nome });
      }
    });
    return Array.from(exercicios.values());
  }, [historicoTreinos]);

  return (
    <div className="space-y-6">
      <Card title="Sua Evolução de Peso">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Registrar Peso de Hoje</h3>
          <form onSubmit={handleRegistrarPeso} className="flex items-center gap-2">
            <input type="number" name="peso" step="0.1" placeholder={`Ex: ${userProfile.peso}`} className="flex-grow p-2 border border-gray-300 rounded-md" aria-label="Registrar peso"/>
            <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">Salvar</button>
          </form>
        </div>
        <GraficoEvolucao historico={historicoPeso} label="Peso" unidade="kg" />
      </Card>

      <Card title="Sua Evolução de Força">
        <div className="mb-8">
          <label htmlFor="exercicio-select" className="block text-lg font-semibold text-gray-700 mb-3">Selecione um exercício para ver o progresso:</label>
          {listaExerciciosUnicos.length > 0 ? (
            // ALTERADO: Substituímos o <select> pelo novo componente <Dropdown>
            <Dropdown
              options={listaExerciciosUnicos}
              selected={exercicioSelecionado}
              setSelected={setExercicioSelecionado}
              placeholder="-- Escolha um exercício --"
            />
          ) : (<p className="text-gray-500">Conclua alguns treinos para começar a registrar sua evolução de força.</p>)}
        </div>
        {exercicioSelecionado && (<GraficoEvolucao historico={dadosGraficoForca} label="Carga" unidade="kg"/>)}
      </Card>
    </div>
  );
};

export default Progresso;
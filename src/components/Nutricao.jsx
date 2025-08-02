import React, { useState, useEffect } from 'react';
import { gerarCardapio, substituirAlimentoProporcional, sugerirSubstituicoes, adicionarAlimentoNaRefeicao } from "../utils/geradorCardapio.js";
import { buscarAlimentoPorNome } from '../utils/api.js';
import GraficoMacros from './GraficoMacros.jsx';
import BarraProgresso from './BarraProgresso.jsx';
import Card from './ui/Card.jsx';

const NutricaoDiaria = ({ userProfile }) => {
  const [cardapiosGerados, setCardapiosGerados] = useState([]);
  const [cardapioDoDia, setCardapioDoDia] = useState(null);
  const [accordionAberto, setAccordionAberto] = useState(0);
  const [substituicaoState, setSubstituicaoState] = useState({ visible: false, refeicaoId: null, alimentoOriginal: null, opcoes: [] });
  const [consumoAtual, setConsumoAtual] = useState({ calorias: 0, proteinas: 0, carboidratos: 0, gorduras: 0 });
  const [refeicoesConcluidas, setRefeicoesConcluidas] = useState(() => {
    const hoje = new Date().toISOString().slice(0, 10);
    const saved = JSON.parse(localStorage.getItem('refeicoesConcluidas') || '{}');
    return saved[hoje] || {};
  });

  // Hooks para a visualização detalhada, agora no topo
  const [termoBusca, setTermoBusca] = useState('');
  const [resultadosBusca, setResultadosBusca] = useState([]);
  const [buscando, setBuscando] = useState(false);
  const [refeicaoSelecionada, setRefeicaoSelecionada] = useState('almoco');
  const [quantidadesBusca, setQuantidadesBusca] = useState({});
  const [buscaModal, setBuscaModal] = useState('');
  const [resultadosBuscaModal, setResultadosBuscaModal] = useState([]);
  const [buscandoModal, setBuscandoModal] = useState(false);

  useEffect(() => {
    if (userProfile && cardapiosGerados.length === 0) {
      const estilos = ['equilibrado', 'low_carb', 'rico_em_proteina', 'vegetariano'];
      const planos = estilos.map(estilo => gerarCardapio(userProfile, estilo)).filter(p => p !== null);
      setCardapiosGerados(planos);
    }
  }, [userProfile, cardapiosGerados.length]);

  useEffect(() => {
    if (cardapioDoDia) {
      let consumoInicial = { calorias: 0, proteinas: 0, carboidratos: 0, gorduras: 0 };
      Object.keys(refeicoesConcluidas).forEach(refeicaoId => {
        const refeicao = cardapioDoDia.refeicoes[refeicaoId];
        if (refeicao) {
          refeicao.alimentos.forEach(alimento => {
            consumoInicial.calorias += alimento.macros.calorias;
            consumoInicial.proteinas += alimento.macros.proteinas;
            consumoInicial.carboidratos += alimento.macros.carboidratos;
            consumoInicial.gorduras += alimento.macros.gorduras;
          });
        }
      });
      setConsumoAtual(consumoInicial);
      setRefeicaoSelecionada(Object.keys(cardapioDoDia.refeicoes)[0] || 'almoco');
    }
  }, [cardapioDoDia, refeicoesConcluidas]);

  const limparProgressoDoDia = () => {
    setRefeicoesConcluidas({});
    setConsumoAtual({ calorias: 0, proteinas: 0, carboidratos: 0, gorduras: 0 });
    const hoje = new Date().toISOString().slice(0, 10);
    const saved = JSON.parse(localStorage.getItem('refeicoesConcluidas') || '{}');
    delete saved[hoje];
    localStorage.setItem('refeicoesConcluidas', JSON.stringify(saved));
  };

  const handleSelecionarPlano = (plano) => setCardapioDoDia(plano);
  const handleVoltarParaSelecao = () => {
    setCardapioDoDia(null);
    setAccordionAberto(0);
    limparProgressoDoDia();
  };

  const isRefeicaoConcluida = (refeicaoId) => !!refeicoesConcluidas[refeicaoId];
  const handleMarcarRefeicao = (refeicaoId, refeicao) => {
    if (isRefeicaoConcluida(refeicaoId)) return;
    const macrosDaRefeicao = refeicao.alimentos.reduce((acc, al) => {
        acc.calorias += al.macros.calorias; acc.proteinas += al.macros.proteinas;
        acc.carboidratos += al.macros.carboidratos; acc.gorduras += al.macros.gorduras;
        return acc;
    }, { calorias: 0, proteinas: 0, carboidratos: 0, gorduras: 0 });
    setConsumoAtual(prev => ({
        calorias: prev.calorias + macrosDaRefeicao.calorias,
        proteinas: prev.proteinas + macrosDaRefeicao.proteinas,
        carboidratos: prev.carboidratos + macrosDaRefeicao.carboidratos,
        gorduras: prev.gorduras + macrosDaRefeicao.gorduras,
    }));
    const hoje = new Date().toISOString().slice(0, 10);
    const saved = JSON.parse(localStorage.getItem('refeicoesConcluidas') || '{}');
    const newState = { ...saved, [hoje]: { ...(saved[hoje] || {}), [refeicaoId]: true } };
    localStorage.setItem('refeicoesConcluidas', JSON.stringify(newState));
    setRefeicoesConcluidas(newState[hoje]);
  };
  
  const handleAbrirModalSubstituicao = (refeicaoId, alimentoOriginal) => {
    const opcoes = sugerirSubstituicoes(alimentoOriginal, userProfile.objetivo);
    setSubstituicaoState({ visible: true, refeicaoId, alimentoOriginal, opcoes });
  };
  const handleCancelarSubstituicao = () => setSubstituicaoState({ visible: false, refeicaoId: null, alimentoOriginal: null, opcoes: [] });
  const handleConfirmarSubstituicao = (novoAlimento) => {
    const { refeicaoId, alimentoOriginal } = substituicaoState;
    const novoCardapio = substituirAlimentoProporcional(cardapioDoDia, refeicaoId, alimentoOriginal.id, novoAlimento);
    setCardapioDoDia(novoCardapio);
    handleCancelarSubstituicao();
  };
  const fecharModalElimparBusca = () => { handleCancelarSubstituicao(); setBuscaModal(''); setResultadosBuscaModal([]); };
  const handleBuscaNoModal = async (e) => { e.preventDefault(); if (buscaModal.trim() === '') return; setBuscandoModal(true); const resultados = await buscarAlimentoPorNome(buscaModal); setResultadosBuscaModal(resultados); setBuscandoModal(false); };
  const handleBusca = async (e) => { e.preventDefault(); if (termoBusca.trim() === '') return; setBuscando(true); setResultadosBusca([]); const resultados = await buscarAlimentoPorNome(termoBusca); setResultadosBusca(resultados); setBuscando(false); };
  const handleQuantidadeChange = (alimentoId, quantidade) => { setQuantidadesBusca(prev => ({...prev, [alimentoId]: quantidade })); };
  const handleAdicionarAlimento = (alimento) => { const quantidade = parseInt(quantidadesBusca[alimento.id] || 100, 10); if (isNaN(quantidade) || quantidade <= 0) { alert("Por favor, insira uma quantidade válida."); return; } const novoCardapio = adicionarAlimentoNaRefeicao(cardapioDoDia, refeicaoSelecionada, alimento, quantidade); setCardapioDoDia(novoCardapio); alert(`${quantidade}g de ${alimento.nome} adicionado(s) à refeição '${refeicaoSelecionada}'!`); };

  if (!cardapioDoDia) {
    return (
      <Card title="Escolha seu Plano Alimentar">
        <p className="text-gray-600 mb-6">Geramos algumas opções com base no seu perfil.</p>
        <div className="space-y-2">
            {cardapiosGerados.length > 0 ? cardapiosGerados.map((plano, index) => (
              <div key={index} className="border rounded-lg overflow-hidden transition-shadow hover:shadow-lg">
                <button onClick={() => setAccordionAberto(accordionAberto === index ? null : index)} className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100"><span className="font-bold text-lg text-blue-700">{plano.nome} (~{plano.resumo.calorias_total} kcal)</span><span className={`transform transition-transform ${accordionAberto === index ? 'rotate-180' : ''}`}>▼</span></button>
                {accordionAberto === index && (
                  <div className="p-4 bg-white">
                    <p className="text-sm text-gray-600 mb-4">{plano.descricao}</p>
                    <div className="space-y-3">{Object.values(plano.refeicoes).filter(r => r).map((refeicao, idx) => (<div key={idx}><p className="font-semibold">{refeicao.emoji} {refeicao.nome}</p><p className="text-xs text-gray-500 pl-2">{refeicao.alimentos.map(a => a.nome).join(', ') || 'Nenhum alimento encontrado.'}</p></div>))}</div>
                    <button onClick={() => handleSelecionarPlano(plano)} className="w-full mt-4 py-2 px-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700">Escolher este Plano</button>
                  </div>
                )}
              </div>
            )) : <p>Gerando planos alimentares...</p>}
          </div>
      </Card>
    );
  }

  const { resumo, metas } = cardapioDoDia;
  return (
    <div className="space-y-6">
      {substituicaoState.visible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h3 className="text-xl font-bold mb-2">Trocar {substituicaoState.alimentoOriginal?.nome}</h3><p className="text-sm text-gray-600 mb-3">Sugestões rápidas:</p><div className="space-y-2">{substituicaoState.opcoes.map(opcao => (<button key={opcao.id} onClick={() => handleConfirmarSubstituicao(opcao)} className="w-full text-left p-3 bg-gray-100 hover:bg-blue-100 rounded-lg transition-colors">{opcao.nome}</button>))}</div><hr className="my-4" /><form onSubmit={handleBuscaNoModal}><label className="text-sm text-gray-600 mb-2 block">Ou pesquise outro alimento:</label><div className="flex gap-2"><input type="text" value={buscaModal} onChange={(e) => setBuscaModal(e.target.value)} placeholder="Ex: 'Quinoa'" className="flex-grow p-2 border border-gray-300 rounded-md" /><button type="submit" disabled={buscandoModal} className="px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 disabled:bg-gray-400">{buscandoModal ? '...' : 'Buscar'}</button></div></form><div className="mt-3 space-y-2 max-h-40 overflow-y-auto">{resultadosBuscaModal.map(opcao => (<button key={opcao.id} onClick={() => handleConfirmarSubstituicao(opcao)} className="w-full text-left p-3 bg-gray-50 hover:bg-blue-100 rounded-lg transition-colors text-sm">{opcao.nome}</button>))}</div><button onClick={fecharModalElimparBusca} className="mt-6 w-full p-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Cancelar</button>
          </div>
        </div>
      )}
      <div className="flex justify-between items-center">
        <div><h2 className="text-3xl font-bold text-gray-800">{cardapioDoDia.nome}</h2></div>
        <button onClick={handleVoltarParaSelecao} className="text-sm bg-blue-100 text-blue-700 hover:bg-blue-200 rounded px-3 py-1 transition-colors">Trocar de Plano</button>
      </div>
      <Card>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col items-center justify-center"><h3 className="text-lg font-semibold text-gray-700 mb-2">Distribuição de Calorias (Consumidas)</h3><GraficoMacros proteinas={consumoAtual.proteinas} carboidratos={consumoAtual.carboidratos} gorduras={consumoAtual.gorduras} /></div>
              <div className="space-y-4"><h3 className="text-lg font-semibold text-gray-700 mb-2">Metas Diárias</h3><BarraProgresso label="Calorias" valor={consumoAtual.calorias} meta={metas.calorias_total} unidade="kcal" cor="bg-yellow-400" /><BarraProgresso label="Proteínas" valor={consumoAtual.proteinas} meta={metas.proteinas_total} unidade="g" cor="bg-blue-500" /><BarraProgresso label="Carboidratos" valor={consumoAtual.carboidratos} meta={metas.carboidratos_total} unidade="g" cor="bg-amber-500" /><BarraProgresso label="Gorduras" valor={consumoAtual.gorduras} meta={metas.gorduras_total} unidade="g" cor="bg-red-500" /></div>
          </div>
      </Card>
      <Card title="Buscar e Adicionar Alimento">
          <form onSubmit={handleBusca} className="flex flex-col sm:flex-row gap-2"><input type="text" value={termoBusca} onChange={(e) => setTermoBusca(e.target.value)} placeholder="Ex: 'Iogurte Grego'" className="flex-grow p-2 border border-gray-300 rounded-md" /><button type="submit" disabled={buscando} className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 disabled:bg-gray-400">{buscando ? 'Buscando...' : 'Buscar'}</button></form>
          <div className="mt-4 space-y-2 max-h-48 overflow-y-auto">{buscando && <p className="text-gray-500 text-sm p-3 text-center">Buscando...</p>}{!buscando && resultadosBusca.length === 0 && termoBusca !== '' && (<p className="text-gray-500 text-sm p-3 text-center">Nenhum resultado encontrado para "{termoBusca}".</p>)}{resultadosBusca.map(alimento => (<div key={alimento.id} className="p-3 bg-white rounded-lg flex flex-col sm:flex-row justify-between items-center gap-3 border"><div className="text-sm text-left flex-grow"><p className="font-bold">{alimento.nome}</p><p className="text-xs text-gray-500">100g: {alimento.calorias_100g?.toFixed(0)}kcal | P:{alimento.macros_100g?.proteinas?.toFixed(1)}g | C:{alimento.macros_100g?.carboidratos?.toFixed(1)}g | G:{alimento.macros_100g?.gorduras?.toFixed(1)}g</p></div><div className="flex items-center gap-2"><input type="number" placeholder="100" className="w-20 p-1 border border-gray-300 rounded text-sm" value={quantidadesBusca[alimento.id] || ''} onChange={(e) => handleQuantidadeChange(alimento.id, e.target.value)} /><span className="text-sm">g</span><select onChange={(e) => setRefeicaoSelecionada(e.target.value)} defaultValue={refeicaoSelecionada} className="text-xs p-1 border border-gray-300 rounded">{cardapioDoDia && Object.keys(cardapioDoDia.refeicoes).map(id => <option key={id} value={id}>{cardapioDoDia.refeicoes[id].nome}</option>)}</select><button onClick={() => handleAdicionarAlimento(alimento)} className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Adicionar</button></div></div>))}</div>
      </Card>
      <Card title="Seu Cardápio do Dia">
        <div className="space-y-4">{Object.entries(cardapioDoDia.refeicoes).map(([refeicaoId, refeicao]) => (<div key={refeicaoId} className={`p-4 rounded-lg border transition-all ${isRefeicaoConcluida(refeicaoId) ? 'bg-green-50 border-green-200' : 'bg-white'}`}><div className="flex justify-between items-start"><div><h4 className="text-lg font-semibold text-gray-800 mb-2">{refeicao.emoji} {refeicao.nome}</h4><ul className="list-disc list-inside text-gray-700">{refeicao.alimentos.map((alimento) => (<li key={`${alimento.id}-${alimento.quantidade}`} className="flex justify-between items-center py-1"><span>{alimento.nome} (~{alimento.quantidade}g)</span><button onClick={() => handleAbrirModalSubstituicao(refeicaoId, alimento)} className="text-xs bg-blue-100 text-blue-700 hover:bg-blue-200 rounded px-2 py-1 ml-4 transition-colors">Trocar</button></li>))}</ul></div>{!isRefeicaoConcluida(refeicaoId) && (<button onClick={() => handleMarcarRefeicao(refeicaoId, refeicao)} className="px-3 py-1 bg-green-500 text-white text-sm font-semibold rounded-lg hover:bg-green-600">✅ Concluir</button>)}</div></div>))}</div>
      </Card>
    </div>
  );
};

export default NutricaoDiaria;
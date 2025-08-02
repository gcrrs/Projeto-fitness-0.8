import React, { useState, useEffect } from 'react';
import { gerarProgramaAvancado, validarPrograma, analisarPrograma } from '../utils/geradorAvancado';
import ModalExercicio from './ModalExercicio.jsx';
import Card from './ui/Card.jsx';
import QuestionarioTreino from './QuestionarioTreino.jsx';
import ModalSubstituirExercicio from './ModalSubstituirExercicio.jsx';
import ModoExecucao from './ModoExecucao.jsx';
import HistoricoTreinos from './HistoricoTreinos.jsx';
import EstatisticasTreino from './EstatisticasTreino.jsx';
import { Play, BarChart3, History, Settings, Timer, Target, TrendingUp } from 'lucide-react';

const Treino = ({ userProfile }) => {
  const [programa, setPrograma] = useState(() => {
    const saved = localStorage.getItem('fitcoreProgramaTreino');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [abaSelecionada, setAbaSelecionada] = useState('programa');
  const [diaAtivo, setDiaAtivo] = useState(0);
  const [exercicioDetalhe, setExercicioDetalhe] = useState(null);
  const [exercicioSubstituir, setExercicioSubstituir] = useState(null);
  const [mostrarEstatisticas, setMostrarEstatisticas] = useState(false);
  const [modoExecucao, setModoExecucao] = useState(false);
  
  // Estados para tracking de treinos
  const [historicoTreinos, setHistoricoTreinos] = useState(() => {
    const saved = localStorage.getItem('fitcoreHistoricoTreinos');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [treinoAtual, setTreinoAtual] = useState(null);
  const [progressaoCargas, setProgressaoCargas] = useState(() => {
    const saved = localStorage.getItem('fitcoreProgressaoCargas');
    return saved ? JSON.parse(saved) : {};
  });

  // Salvar dados no localStorage sempre que mudarem
  useEffect(() => {
    if (historicoTreinos.length > 0) {
      localStorage.setItem('fitcoreHistoricoTreinos', JSON.stringify(historicoTreinos));
    }
  }, [historicoTreinos]);

  useEffect(() => {
    if (Object.keys(progressaoCargas).length > 0) {
      localStorage.setItem('fitcoreProgressaoCargas', JSON.stringify(progressaoCargas));
    }
  }, [progressaoCargas]);

  const handleTrocarPrograma = () => {
    setPrograma(null);
    localStorage.removeItem('fitcoreProgramaTreino');
    setAbaSelecionada('programa');
  };

  const handleSubstituirExercicio = (exAtual, novoEx) => {
    const novoPrograma = { ...programa };
    novoPrograma.divisao[diaAtivo].exercicios = novoPrograma.divisao[diaAtivo].exercicios.map(ex =>
      ex.id === exAtual.id ? { ...novoEx, series: exAtual.series, repeticoes: exAtual.repeticoes, descanso: exAtual.descanso, cadencia: exAtual.cadencia, carga: exAtual.carga } : ex
    );
    setPrograma(novoPrograma);
    setExercicioSubstituir(null);
    localStorage.setItem('fitcoreProgramaTreino', JSON.stringify(novoPrograma));
  };

  const iniciarTreino = () => {
    if (!programa || !programa.divisao[diaAtivo]) return;
    
    const novoTreino = {
      id: Date.now().toString(),
      data: new Date().toISOString(),
      diaPrograma: diaAtivo,
      nomeTreino: programa.divisao[diaAtivo].nome,
      exercicios: programa.divisao[diaAtivo].exercicios.map(ex => ({
        ...ex,
        seriesCompletas: 0,
        cargasUtilizadas: [],
        observacoes: '',
        completo: false
      })),
      iniciado: new Date().toISOString(),
      finalizado: null,
      tempoTotal: 0
    };
    
    setTreinoAtual(novoTreino);
    setModoExecucao(true);
  };

  const finalizarTreino = (treinoCompleto) => {
    const treinoFinalizado = {
      ...treinoCompleto,
      finalizado: new Date().toISOString(),
      tempoTotal: Math.floor((new Date() - new Date(treinoCompleto.iniciado)) / 1000 / 60) // em minutos
    };

    setHistoricoTreinos(prev => [treinoFinalizado, ...prev]);
    setTreinoAtual(null);
    setModoExecucao(false);

    // Atualizar progressão de cargas
    treinoCompleto.exercicios.forEach(ex => {
      if (ex.cargasUtilizadas.length > 0) {
        const cargaMaxima = Math.max(...ex.cargasUtilizadas.map(c => parseFloat(c) || 0));
        setProgressaoCargas(prev => ({
          ...prev,
          [ex.id]: {
            ...prev[ex.id],
            ultimaCarga: cargaMaxima,
            historico: [...(prev[ex.id]?.historico || []), {
              data: new Date().toISOString(),
              carga: cargaMaxima,
              series: ex.seriesCompletas
            }]
          }
        }));
      }
    });
  };

  const calcularEstatisticasGerais = () => {
    const ultimosSete = historicoTreinos.filter(t => {
      const dataT = new Date(t.data);
      const agora = new Date();
      const diferenca = agora - dataT;
      return diferenca <= 7 * 24 * 60 * 60 * 1000;
    });

    const totalTreinos = historicoTreinos.length;
    const treinosUltimaSemana = ultimosSete.length;
    const tempoMedioTreino = historicoTreinos.length > 0 
      ? Math.round(historicoTreinos.reduce((sum, t) => sum + (t.tempoTotal || 0), 0) / historicoTreinos.length)
      : 0;

    // Calcular streak
    let streak = 0;
    const hoje = new Date();
    for (let i = 0; i < historicoTreinos.length; i++) {
      const dataTreino = new Date(historicoTreinos[i].data);
      const diasDiferenca = Math.floor((hoje - dataTreino) / (1000 * 60 * 60 * 24));
      
      if (diasDiferenca === streak) {
        streak++;
      } else if (diasDiferenca === streak + 1) {
        streak++;
      } else {
        break;
      }
    }

    return {
      totalTreinos,
      treinosUltimaSemana,
      tempoMedioTreino,
      streak
    };
  };

  const sugerirCarga = (exercicioId) => {
    const progressao = progressaoCargas[exercicioId];
    if (!progressao || !progressao.ultimaCarga) return '';
    
    // Sugerir aumento de 2.5kg ou 5% da carga anterior
    const aumento = Math.max(2.5, progressao.ultimaCarga * 0.05);
    const novaCarga = progressao.ultimaCarga + aumento;
    return `${novaCarga.toFixed(1)}kg (↑${aumento.toFixed(1)}kg)`;
  };

  // Primeiro verifica se programa existe
  if (!programa) {
    return (
      <QuestionarioTreino
        onProgramaGerado={(perfil) => {
          console.log('Gerando programa com perfil:', perfil);
          
          const novo = gerarProgramaAvancado(perfil, perfil.split);
          console.log('Programa gerado:', novo);
          
          if (validarPrograma(novo)) {
            setPrograma(novo);
            localStorage.setItem('fitcoreProgramaTreino', JSON.stringify(novo));
            setDiaAtivo(0);
            setAbaSelecionada('programa');
            
            const stats = analisarPrograma(novo);
            console.log('Estatísticas do programa:', stats);
            
            if (novo.metadados?.recomendacoes?.length > 0) {
              console.log('Recomendações:', novo.metadados.recomendacoes);
            }
          } else {
            console.error('Programa inválido gerado');
            alert('Erro ao gerar programa. Verifique se selecionou equipamentos suficientes e tente novamente.');
          }
        }}
      />
    );
  }

  if (modoExecucao && treinoAtual) {
    return (
      <ModoExecucao
        treino={treinoAtual}
        onFinalizarTreino={finalizarTreino}
        onVoltarPrograma={() => setModoExecucao(false)}
        progressaoCargas={progressaoCargas}
      />
    );
  }

  const estatisticasGerais = calcularEstatisticasGerais();

  // Só depois verifica se a divisão existe
  if (!programa.divisao || !programa.divisao[diaAtivo]) {
    return (
      <div className="text-center mt-10">
        <p className="text-gray-600 mb-4">Erro ao carregar o treino.</p>
        <button 
          onClick={handleTrocarPrograma}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Criar Novo Treino
        </button>
      </div>
    );
  }

  const treinoDoDia = programa.divisao[diaAtivo];
  const estatisticas = analisarPrograma(programa);

  const renderAbas = () => (
    <div className="border-b border-gray-200 mb-6">
      <nav className="-mb-px flex space-x-8">
        {[
          { id: 'programa', nome: 'Programa', icon: Target },
          { id: 'estatisticas', nome: 'Estatísticas', icon: BarChart3 },
          { id: 'historico', nome: 'Histórico', icon: History }
        ].map(({ id, nome, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setAbaSelecionada(id)}
            className={`flex items-center gap-2 py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
              abaSelecionada === id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Icon size={16} />
            {nome}
          </button>
        ))}
      </nav>
    </div>
  );

  const renderDashboardCards = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-lg text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm">Treinos Total</p>
            <p className="text-2xl font-bold">{estatisticasGerais.totalTreinos}</p>
          </div>
          <TrendingUp className="text-blue-200" size={24} />
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-lg text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 text-sm">Esta Semana</p>
            <p className="text-2xl font-bold">{estatisticasGerais.treinosUltimaSemana}</p>
          </div>
          <Target className="text-green-200" size={24} />
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-lg text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-100 text-sm">Tempo Médio</p>
            <p className="text-2xl font-bold">{estatisticasGerais.tempoMedioTreino}min</p>
          </div>
          <Timer className="text-purple-200" size={24} />
        </div>
      </div>

      <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 rounded-lg text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-orange-100 text-sm">Sequência</p>
            <p className="text-2xl font-bold">{estatisticasGerais.streak} dias</p>
          </div>
          <div className="text-orange-200 text-2xl">🔥</div>
        </div>
      </div>
    </div>
  );

  const renderConteudoPrograma = () => (
    <>
      {renderDashboardCards()}
      
      <Card>
        {/* Cabeçalho com informações do programa */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">{programa.nomePrograma}</h2>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-2">
              <span>📊 {estatisticas?.totalExercicios} exercícios</span>
              <span>⏱️ ~{estatisticas?.tempoMedioTreino} min/treino</span>
              <span>🎯 {programa.objetivo?.replace('_', ' ')}</span>
              <span>📈 {programa.experiencia}</span>
            </div>
            <p className="text-gray-500 mt-1">Clique em um exercício para ver detalhes ou substituí-lo.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <button 
              onClick={iniciarTreino}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-lg"
            >
              <Play size={18} />
              Iniciar Treino
            </button>
            <button 
              onClick={() => setMostrarEstatisticas(!mostrarEstatisticas)} 
              className="px-4 py-2 bg-blue-100 text-blue-800 text-sm font-semibold rounded-lg hover:bg-blue-200 transition-colors"
            >
              {mostrarEstatisticas ? 'Ocultar' : 'Ver'} Detalhes
            </button>
            <button 
              onClick={handleTrocarPrograma} 
              className="px-4 py-2 bg-red-100 text-red-800 text-sm font-semibold rounded-lg hover:bg-red-200 transition-colors"
            >
              Nova Ficha
            </button>
          </div>
        </div>

        {/* Estatísticas detalhadas (opcionais) */}
        {mostrarEstatisticas && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
            <h3 className="font-semibold text-gray-700 mb-3">📈 Detalhes do Programa</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Total de Dias:</span>
                <p className="font-semibold">{estatisticas?.totalDias}</p>
              </div>
              <div>
                <span className="text-gray-600">Total Exercícios:</span>
                <p className="font-semibold">{estatisticas?.totalExercicios}</p>
              </div>
              <div>
                <span className="text-gray-600">Tempo Médio:</span>
                <p className="font-semibold">{estatisticas?.tempoMedioTreino} min</p>
              </div>
              <div>
                <span className="text-gray-600">Versão:</span>
                <p className="font-semibold">{programa.metadados?.versao || '1.0'}</p>
              </div>
            </div>
            
            {programa.metadados?.recomendacoes && programa.metadados.recomendacoes.length > 0 && (
              <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">💡 Recomendações Personalizadas:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  {programa.metadados.recomendacoes.map((rec, index) => (
                    <li key={index}>• {rec}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Navegação entre dias */}
        <div className="border-b border-gray-200 mb-4">
          <nav className="-mb-px flex space-x-6 overflow-x-auto">
            {programa.divisao.map((dia, index) => (
              <button 
                key={index} 
                onClick={() => setDiaAtivo(index)} 
                className={`whitespace-nowrap py-3 px-2 border-b-2 font-medium text-sm transition-colors ${
                  diaAtivo === index 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {dia.nome.split(' - ')[0]}
                <span className="block text-xs text-gray-400">
                  {dia.exercicios?.length} ex. • {dia.tempoEstimado}min
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Informações do treino do dia */}
        <div className="mb-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-700">{treinoDoDia.nome}</h3>
            <div className="text-sm text-gray-500">
              <span>🎯 Foco: {treinoDoDia.focoPrincipal}</span>
            </div>
          </div>
        </div>

        {/* Tabela de exercícios */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Exercício
                </th>
                <th className="py-3 px-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Séries
                </th>
                <th className="py-3 px-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Reps
                </th>
                <th className="py-3 px-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Descanso
                </th>
                <th className="py-3 px-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Carga Sugerida
                </th>
                <th className="py-3 px-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {treinoDoDia.exercicios.map((ex, index) => (
                <tr key={ex.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-start">
                      <span className="text-xs text-gray-400 mr-3 mt-1">{index + 1}.</span>
                      <div>
                        <div 
                          className="font-medium text-gray-800 cursor-pointer hover:text-blue-600 transition-colors" 
                          onClick={() => setExercicioDetalhe(ex)}
                        >
                          {ex.nome}
                        </div>
                        <div className="text-xs text-gray-500 capitalize mt-1">
                          {ex.musculo_principal} • {ex.equipamento.replace('_', ' ')}
                        </div>
                        {ex.observacoes && (
                          <div className="text-xs text-blue-600 mt-1" title={ex.observacoes}>
                            💡 {ex.observacoes.length > 30 ? ex.observacoes.substring(0, 30) + '...' : ex.observacoes}
                          </div>
                        )}
                        {progressaoCargas[ex.id] && (
                          <div className="text-xs text-green-600 mt-1">
                            📈 Última: {progressaoCargas[ex.id].ultimaCarga}kg
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="text-center font-medium">{ex.series}</td>
                  <td className="text-center">{ex.repeticoes}</td>
                  <td className="text-center">{ex.descanso}</td>
                  <td className="text-center">
                    <div className="text-sm">
                      {sugerirCarga(ex.id) || 'Definir carga'}
                    </div>
                  </td>
                  <td className="text-center">
                    <button 
                      onClick={() => setExercicioSubstituir(ex)} 
                      className="text-blue-600 hover:text-blue-800 hover:underline text-sm transition-colors mr-2"
                      title="Substituir exercício"
                    >
                      🔄
                    </button>
                    <button 
                      onClick={() => setExercicioDetalhe(ex)} 
                      className="text-gray-600 hover:text-gray-800 hover:underline text-sm transition-colors"
                      title="Ver detalhes"
                    >
                      ℹ️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Rodapé com informações do treino */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div>
              <strong>Tempo estimado:</strong> {treinoDoDia.tempoEstimado} minutos
            </div>
            <div>
              <strong>Exercícios:</strong> {treinoDoDia.exercicios.length}
            </div>
            <div>
              <strong>Gerado em:</strong> {new Date(programa.metadados?.dataGeracao || Date.now()).toLocaleDateString('pt-BR')}
            </div>
          </div>
        </div>
      </Card>
    </>
  );

  return (
    <>
      {renderAbas()}
      
      {abaSelecionada === 'programa' && renderConteudoPrograma()}
      
      {abaSelecionada === 'estatisticas' && (
        <EstatisticasTreino 
          historicoTreinos={historicoTreinos}
          progressaoCargas={progressaoCargas}
          programa={programa}
        />
      )}
      
      {abaSelecionada === 'historico' && (
        <HistoricoTreinos 
          historicoTreinos={historicoTreinos}
          onDeletarTreino={(id) => {
            setHistoricoTreinos(prev => prev.filter(t => t.id !== id));
          }}
        />
      )}

      {/* Modais */}
      {exercicioDetalhe && (
        <ModalExercicio 
          exercicio={exercicioDetalhe} 
          onClose={() => setExercicioDetalhe(null)} 
        />
      )}

      {exercicioSubstituir && (
        <ModalSubstituirExercicio
          exercicioOriginal={exercicioSubstituir}
          userProfile={userProfile}
          onClose={() => setExercicioSubstituir(null)}
          onSelect={(novoEx) => handleSubstituirExercicio(exercicioSubstituir, novoEx)}
        />
      )}
    </>
  );
};

export default Treino;
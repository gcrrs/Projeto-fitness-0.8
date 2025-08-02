import React, { useState } from 'react';
import { TrendingUp, Target, Clock, Award, BarChart3, Calendar } from 'lucide-react';
import Card from './ui/Card.jsx';

const EstatisticasTreino = ({ historicoTreinos, progressaoCargas, programa }) => {
  const [periodoSelecionado, setPeriodoSelecionado] = useState('mes');
  const [musculoSelecionado, setMusculoSelecionado] = useState('todos');

  // Calcular estatísticas baseadas no período
  const calcularEstatisticasPeriodo = () => {
    const agora = new Date();
    let dataLimite;

    switch (periodoSelecionado) {
      case 'semana':
        dataLimite = new Date(agora.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'mes':
        dataLimite = new Date(agora.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case 'trimestre':
        dataLimite = new Date(agora.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      default:
        dataLimite = new Date(0); // Todos os tempos
    }

    const treinosPeriodo = historicoTreinos.filter(t => new Date(t.data) >= dataLimite);
    
    return {
      totalTreinos: treinosPeriodo.length,
      tempoTotal: treinosPeriodo.reduce((sum, t) => sum + (t.tempoTotal || 0), 0),
      exerciciosCompletos: treinosPeriodo.reduce((sum, t) => 
        sum + (t.exercicios?.filter(ex => ex.completo).length || 0), 0
      ),
      exerciciosTotal: treinosPeriodo.reduce((sum, t) => sum + (t.exercicios?.length || 0), 0),
      treinosPeriodo
    };
  };

  // Análise de progressão de cargas
  const analisarProgressaoCargas = () => {
    const progressoes = {};
    
    Object.entries(progressaoCargas).forEach(([exercicioId, dados]) => {
      if (dados.historico && dados.historico.length >= 2) {
        const primeiro = dados.historico[0];
        const ultimo = dados.historico[dados.historico.length - 1];
        const aumento = ultimo.carga - primeiro.carga;
        const percentualAumento = ((aumento / primeiro.carga) * 100).toFixed(1);
        
        progressoes[exercicioId] = {
          nome: dados.nome || exercicioId,
          aumentoAbsoluto: aumento,
          percentualAumento: parseFloat(percentualAumento),
          cargaInicial: primeiro.carga,
          cargaAtual: ultimo.carga,
          sessoes: dados.historico.length
        };
      }
    });

    return Object.values(progressoes).sort((a, b) => b.percentualAumento - a.percentualAumento);
  };

  // Análise de volume por grupo muscular
  const analisarVolumePorMusculo = () => {
    const volumePorMusculo = {};
    
    historicoTreinos.forEach(treino => {
      treino.exercicios?.forEach(exercicio => {
        const musculo = exercicio.musculo_principal;
        if (!volumePorMusculo[musculo]) {
          volumePorMusculo[musculo] = {
            series: 0,
            exercicios: new Set(),
            cargaTotal: 0,
            sessoes: 0
          };
        }
        
        volumePorMusculo[musculo].series += exercicio.seriesCompletas || 0;
        volumePorMusculo[musculo].exercicios.add(exercicio.nome);
        
        if (exercicio.cargasUtilizadas) {
          const cargaMedia = exercicio.cargasUtilizadas.reduce((sum, c) => sum + parseFloat(c || 0), 0) / exercicio.cargasUtilizadas.length || 0;
          volumePorMusculo[musculo].cargaTotal += cargaMedia * (exercicio.seriesCompletas || 0);
        }
        
        if (exercicio.completo) {
          volumePorMusculo[musculo].sessoes += 1;
        }
      });
    });

    return Object.entries(volumePorMusculo).map(([musculo, dados]) => ({
      musculo,
      series: dados.series,
      exerciciosUnicos: dados.exercicios.size,
      cargaTotal: Math.round(dados.cargaTotal),
      sessoes: dados.sessoes
    })).sort((a, b) => b.series - a.series);
  };

  // Análise de consistência (dias da semana)
  const analisarConsistencia = () => {
    const treinosPorDia = {
      0: { nome: 'Dom', count: 0 },
      1: { nome: 'Seg', count: 0 },
      2: { nome: 'Ter', count: 0 },
      3: { nome: 'Qua', count: 0 },
      4: { nome: 'Qui', count: 0 },
      5: { nome: 'Sex', count: 0 },
      6: { nome: 'Sáb', count: 0 }
    };

    historicoTreinos.forEach(treino => {
      const dia = new Date(treino.data).getDay();
      treinosPorDia[dia].count++;
    });

    return Object.values(treinosPorDia);
  };

  // Calcular streak atual
  const calcularStreak = () => {
    if (historicoTreinos.length === 0) return 0;
    
    const hoje = new Date().toDateString();
    let streak = 0;
    const datasUnicas = [...new Set(historicoTreinos.map(t => new Date(t.data).toDateString()))].sort((a, b) => new Date(b) - new Date(a));
    
    for (let i = 0; i < datasUnicas.length; i++) {
      const data = new Date(datasUnicas[i]);
      const diasDiferenca = Math.floor((new Date(hoje) - data) / (1000 * 60 * 60 * 24));
      
      if (diasDiferenca === streak || (streak === 0 && diasDiferenca <= 1)) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  // Identificar recordes pessoais
  const identificarRecordes = () => {
    const recordes = {};
    
    Object.entries(progressaoCargas).forEach(([exercicioId, dados]) => {
      if (dados.historico && dados.historico.length > 0) {
        const cargaMaxima = Math.max(...dados.historico.map(h => h.carga));
        const ultimoRecorde = dados.historico.find(h => h.carga === cargaMaxima);
        
        recordes[exercicioId] = {
          nome: dados.nome || exercicioId,
          carga: cargaMaxima,
          data: ultimoRecorde?.data,
          isRecente: ultimoRecorde && new Date(ultimoRecorde.data) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        };
      }
    });

    return Object.values(recordes).sort((a, b) => b.carga - a.carga);
  };

  const estatisticas = calcularEstatisticasPeriodo();
  const progressoes = analisarProgressaoCargas();
  const volumePorMusculo = analisarVolumePorMusculo();
  const consistencia = analisarConsistencia();
  const streak = calcularStreak();
  const recordes = identificarRecordes();

  const formatarTempo = (minutos) => {
    if (minutos < 60) return `${minutos}min`;
    const horas = Math.floor(minutos / 60);
    const mins = minutos % 60;
    return `${horas}h${mins > 0 ? `${mins}min` : ''}`;
  };

  return (
    <div className="space-y-6">
      {/* Seletores de período */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={periodoSelecionado}
          onChange={(e) => setPeriodoSelecionado(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="semana">Última Semana</option>
          <option value="mes">Último Mês</option>
          <option value="trimestre">Último Trimestre</option>
          <option value="todos">Todos os Tempos</option>
        </select>
      </div>

      {/* Cards de estatísticas principais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Treinos Realizados</p>
              <p className="text-3xl font-bold">{estatisticas.totalTreinos}</p>
            </div>
            <Target className="text-blue-200" size={32} />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Tempo Total</p>
              <p className="text-3xl font-bold">{formatarTempo(estatisticas.tempoTotal)}</p>
            </div>
            <Clock className="text-green-200" size={32} />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Taxa de Conclusão</p>
              <p className="text-3xl font-bold">
                {estatisticas.exerciciosTotal > 0 
                  ? Math.round((estatisticas.exerciciosCompletos / estatisticas.exerciciosTotal) * 100)
                  : 0}%
              </p>
            </div>
            <BarChart3 className="text-purple-200" size={32} />
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Sequência Atual</p>
              <p className="text-3xl font-bold">{streak}</p>
              <p className="text-orange-100 text-xs">dias consecutivos</p>
            </div>
            <div className="text-orange-200 text-3xl">🔥</div>
          </div>
        </div>
      </div>

      {/* Gráfico de consistência semanal */}
      <Card title="Consistência Semanal">
        <div className="flex items-end justify-between gap-2 h-32 mb-4">
          {consistencia.map((dia, index) => {
            const maxTreinos = Math.max(...consistencia.map(d => d.count));
            const altura = maxTreinos > 0 ? (dia.count / maxTreinos) * 100 : 10;
            
            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className={`rounded-t w-full transition-all duration-500 ${
                    dia.count > 0 ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-200'
                  }`}
                  style={{ 
                    height: `${Math.max(altura, 10)}%`,
                    minHeight: dia.count > 0 ? '20px' : '8px'
                  }}
                  title={`${dia.count} treinos`}
                ></div>
                <div className="text-xs text-gray-600 mt-2 text-center">
                  <div className="font-semibold">{dia.count}</div>
                  <div>{dia.nome}</div>
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-sm text-gray-600 text-center">
          Melhor dia: <span className="font-semibold">
            {consistencia.reduce((max, dia) => dia.count > max.count ? dia : max).nome}
          </span>
        </p>
      </Card>

      {/* Progressão de cargas */}
      <Card title="Melhores Progressões de Carga">
        {progressoes.length > 0 ? (
          <div className="space-y-4">
            {progressoes.slice(0, 5).map((prog, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                    index === 0 ? 'bg-gold bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-400'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{prog.nome}</p>
                    <p className="text-sm text-gray-600">
                      {prog.cargaInicial}kg → {prog.cargaAtual}kg ({prog.sessoes} sessões)
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">+{prog.percentualAumento}%</div>
                  <div className="text-sm text-gray-500">+{prog.aumentoAbsoluto}kg</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <TrendingUp size={48} className="mx-auto mb-4 text-gray-300" />
            <p>Faça mais treinos para ver sua progressão!</p>
          </div>
        )}
      </Card>

      {/* Volume por grupo muscular */}
      <Card title="Volume de Treino por Grupo Muscular">
        <div className="space-y-3">
          {volumePorMusculo.map((grupo, index) => {
            const maxSeries = Math.max(...volumePorMusculo.map(g => g.series));
            const porcentagem = maxSeries > 0 ? (grupo.series / maxSeries) * 100 : 0;
            
            return (
              <div key={index} className="relative">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium capitalize text-gray-700">{grupo.musculo}</span>
                  <span className="text-sm text-gray-500">{grupo.series} séries</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${porcentagem}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{grupo.exerciciosUnicos} exercícios únicos</span>
                  <span>{grupo.cargaTotal}kg total</span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Recordes pessoais */}
      <Card title="Recordes Pessoais">
        {recordes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recordes.slice(0, 8).map((recorde, index) => (
              <div key={index} className={`p-4 rounded-lg border-2 ${
                recorde.isRecente ? 'border-yellow-300 bg-yellow-50' : 'border-gray-200 bg-gray-50'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-800">{recorde.nome}</p>
                    <p className="text-sm text-gray-600">
                      {recorde.data ? new Date(recorde.data).toLocaleDateString('pt-BR') : 'N/A'}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">{recorde.carga}kg</div>
                    {recorde.isRecente && (
                      <div className="text-xs text-yellow-600 font-medium">🔥 NOVO!</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Award size={48} className="mx-auto mb-4 text-gray-300" />
            <p>Seus recordes aparecerão aqui conforme você treina!</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default EstatisticasTreino;
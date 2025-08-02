import React, { useState } from 'react';
import { Calendar, Clock, Trash2, TrendingUp, Target, Award, Filter } from 'lucide-react';
import Card from './ui/Card.jsx';

const HistoricoTreinos = ({ historicoTreinos, onDeletarTreino }) => {
  const [filtroMes, setFiltroMes] = useState('todos');
  const [treinoDetalhado, setTreinoDetalhado] = useState(null);

  // Filtrar treinos por mês
  const treinosFiltrados = filtroMes === 'todos' 
    ? historicoTreinos 
    : historicoTreinos.filter(treino => {
        const dataTreino = new Date(treino.data);
        const agora = new Date();
        const mesAtual = agora.getMonth();
        const anoAtual = agora.getFullYear();
        
        return dataTreino.getMonth() === mesAtual && dataTreino.getFullYear() === anoAtual;
      });

  // Calcular estatísticas
  const calcularEstatisticas = () => {
    if (historicoTreinos.length === 0) return null;

    const totalTreinos = historicoTreinos.length;
    const tempoTotal = historicoTreinos.reduce((sum, t) => sum + (t.tempoTotal || 0), 0);
    const tempoMedio = Math.round(tempoTotal / totalTreinos);
    
    // Treinos por mês (últimos 6 meses)
    const treinosPorMes = {};
    const agora = new Date();
    
    for (let i = 0; i < 6; i++) {
      const data = new Date(agora.getFullYear(), agora.getMonth() - i, 1);
      const chave = `${data.getFullYear()}-${data.getMonth()}`;
      treinosPorMes[chave] = {
        nome: data.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' }),
        quantidade: 0
      };
    }

    historicoTreinos.forEach(treino => {
      const data = new Date(treino.data);
      const chave = `${data.getFullYear()}-${data.getMonth()}`;
      if (treinosPorMes[chave]) {
        treinosPorMes[chave].quantidade++;
      }
    });

    // Treino mais longo
    const treinoMaisLongo = historicoTreinos.reduce((max, treino) => 
      (treino.tempoTotal || 0) > (max.tempoTotal || 0) ? treino : max
    , historicoTreinos[0]);

    // Músculo mais treinado
    const musculosCount = {};
    historicoTreinos.forEach(treino => {
      treino.exercicios?.forEach(ex => {
        const musculo = ex.musculo_principal;
        musculosCount[musculo] = (musculosCount[musculo] || 0) + ex.seriesCompletas;
      });
    });
    
    const musculoMaisTreinado = Object.entries(musculosCount).reduce(
      (max, [musculo, count]) => count > max.count ? { musculo, count } : max,
      { musculo: '', count: 0 }
    );

    return {
      totalTreinos,
      tempoTotal,
      tempoMedio,
      treinosPorMes: Object.values(treinosPorMes).reverse(),
      treinoMaisLongo,
      musculoMaisTreinado
    };
  };

  const estatisticas = calcularEstatisticas();

  const formatarTempo = (minutos) => {
    if (minutos < 60) return `${minutos}min`;
    const horas = Math.floor(minutos / 60);
    const mins = minutos % 60;
    return `${horas}h${mins > 0 ? `${mins}min` : ''}`;
  };

  const formatarData = (dataISO) => {
    return new Date(dataISO).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calcularEficiencia = (treino) => {
    const exerciciosCompletos = treino.exercicios?.filter(ex => ex.completo).length || 0;
    const totalExercicios = treino.exercicios?.length || 1;
    return Math.round((exerciciosCompletos / totalExercicios) * 100);
  };

  if (!estatisticas) {
    return (
      <Card title="Histórico de Treinos">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Nenhum treino realizado ainda</h3>
          <p className="text-gray-500">Seus treinos aparecerão aqui após você completá-los.</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Cards de estatísticas resumidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total de Treinos</p>
              <p className="text-2xl font-bold">{estatisticas.totalTreinos}</p>
            </div>
            <Target className="text-blue-200" size={24} />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Tempo Total</p>
              <p className="text-2xl font-bold">{formatarTempo(estatisticas.tempoTotal)}</p>
            </div>
            <Clock className="text-green-200" size={24} />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Tempo Médio</p>
              <p className="text-2xl font-bold">{formatarTempo(estatisticas.tempoMedio)}</p>
            </div>
            <TrendingUp className="text-purple-200" size={24} />
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Mais Treinado</p>
              <p className="text-xl font-bold capitalize">{estatisticas.musculoMaisTreinado.musculo}</p>
            </div>
            <Award className="text-orange-200" size={24} />
          </div>
        </div>
      </div>

      {/* Gráfico simples de treinos por mês */}
      <Card title="Treinos nos Últimos Meses">
        <div className="flex items-end justify-between gap-2 h-32">
          {estatisticas.treinosPorMes.map((mes, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="bg-blue-500 rounded-t w-full transition-all duration-500 hover:bg-blue-600"
                style={{ 
                  height: `${Math.max((mes.quantidade / Math.max(...estatisticas.treinosPorMes.map(m => m.quantidade))) * 100, 10)}%`,
                  minHeight: mes.quantidade > 0 ? '20px' : '4px'
                }}
                title={`${mes.quantidade} treinos`}
              ></div>
              <div className="text-xs text-gray-600 mt-2 text-center">
                <div className="font-semibold">{mes.quantidade}</div>
                <div>{mes.nome}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Lista de treinos */}
      <Card>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Histórico Detalhado</h2>
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-500" />
            <select
              value={filtroMes}
              onChange={(e) => setFiltroMes(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="todos">Todos os treinos</option>
              <option value="mes_atual">Este mês</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {treinosFiltrados.map((treino, index) => (
            <div key={treino.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-800">{treino.nomeTreino}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      calcularEficiencia(treino) === 100 
                        ? 'bg-green-100 text-green-800' 
                        : calcularEficiencia(treino) >= 80
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {calcularEficiencia(treino)}% completo
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {formatarData(treino.data)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {formatarTempo(treino.tempoTotal)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Target size={14} />
                      {treino.exercicios?.length} exercícios
                    </span>
                  </div>

                  {/* Preview dos exercícios */}
                  <div className="flex flex-wrap gap-2">
                    {treino.exercicios?.slice(0, 3).map((ex, exIndex) => (
                      <span key={exIndex} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                        {ex.nome.length > 20 ? ex.nome.substring(0, 20) + '...' : ex.nome}
                      </span>
                    ))}
                    {treino.exercicios?.length > 3 && (
                      <span className="px-2 py-1 bg-gray-200 text-gray-600 rounded text-xs">
                        +{treino.exercicios.length - 3} mais
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <button 
                    onClick={() => setTreinoDetalhado(treino)}
                    className="px-3 py-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors text-sm"
                  >
                    Ver Detalhes
                  </button>
                  <button 
                    onClick={() => onDeletarTreino(treino.id)}
                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                    title="Deletar treino"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {treinosFiltrados.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">📅</div>
            <p>Nenhum treino encontrado para o filtro selecionado.</p>
          </div>
        )}
      </Card>

      {/* Modal de detalhes do treino */}
      {treinoDetalhado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{treinoDetalhado.nomeTreino}</h2>
                  <p className="text-gray-600">{formatarData(treinoDetalhado.data)}</p>
                </div>
                <button 
                  onClick={() => setTreinoDetalhado(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[70vh]">
              {/* Estatísticas do treino */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-blue-600 font-semibold">Duração Total</div>
                  <div className="text-2xl font-bold text-blue-800">
                    {formatarTempo(treinoDetalhado.tempoTotal)}
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-green-600 font-semibold">Exercícios Completos</div>
                  <div className="text-2xl font-bold text-green-800">
                    {treinoDetalhado.exercicios?.filter(ex => ex.completo).length || 0}/
                    {treinoDetalhado.exercicios?.length || 0}
                  </div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-purple-600 font-semibold">Eficiência</div>
                  <div className="text-2xl font-bold text-purple-800">
                    {calcularEficiencia(treinoDetalhado)}%
                  </div>
                </div>
              </div>

              {/* Lista detalhada de exercícios */}
              <h3 className="text-lg font-semibold mb-4">Exercícios Realizados</h3>
              <div className="space-y-3">
                {treinoDetalhado.exercicios?.map((exercicio, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                          {exercicio.nome}
                          {exercicio.completo ? (
                            <span className="text-green-500 text-sm">✓ Completo</span>
                          ) : (
                            <span className="text-orange-500 text-sm">⚠️ Incompleto</span>
                          )}
                        </h4>
                        <p className="text-sm text-gray-600 capitalize">
                          {exercicio.musculo_principal} • {exercicio.equipamento.replace('_', ' ')}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Séries realizadas</div>
                        <div className="text-lg font-bold">
                          {exercicio.seriesCompletas || 0}/{exercicio.series}
                        </div>
                      </div>
                    </div>

                    {/* Cargas utilizadas */}
                    {exercicio.cargasUtilizadas && exercicio.cargasUtilizadas.length > 0 && (
                      <div className="mb-3">
                        <div className="text-sm text-gray-600 mb-1">Cargas utilizadas:</div>
                        <div className="flex flex-wrap gap-2">
                          {exercicio.cargasUtilizadas.map((carga, cIndex) => (
                            <span key={cIndex} className="px-2 py-1 bg-gray-100 rounded text-sm">
                              Série {cIndex + 1}: {carga}kg
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Observações */}
                    {exercicio.observacoes && (
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Observações:</div>
                        <div className="text-sm bg-yellow-50 p-2 rounded border border-yellow-200">
                          {exercicio.observacoes}
                        </div>
                      </div>
                    )}

                    {/* Progresso das séries visual */}
                    <div className="mt-3">
                      <div className="flex gap-1">
                        {Array.from({ length: exercicio.series }, (_, i) => (
                          <div
                            key={i}
                            className={`flex-1 h-2 rounded-full ${
                              i < (exercicio.seriesCompletas || 0)
                                ? 'bg-green-500'
                                : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Notas gerais do treino */}
              {treinoDetalhado.observacoesGerais && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">Notas do Treino</h4>
                  <p className="text-blue-700">{treinoDetalhado.observacoesGerais}</p>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex justify-end gap-3">
                <button 
                  onClick={() => setTreinoDetalhado(null)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoricoTreinos;
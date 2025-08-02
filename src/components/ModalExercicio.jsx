import React, { useState } from 'react';
import { X, Play, AlertTriangle, Target, Settings, BookOpen, Star } from 'lucide-react';

const ModalExercicio = ({ exercicio, onClose, progressaoCargas }) => {
  const [abaAtiva, setAbaAtiva] = useState('instrucoes');
  const [favoritado, setFavoritado] = useState(false);

  if (!exercicio) return null;

  const progressao = progressaoCargas?.[exercicio.id];
  const temProgressao = progressao && progressao.historico && progressao.historico.length > 0;

  const renderMapaCorpo = () => {
    const musculos = {
      'peito': { top: '35%', left: '45%', color: 'bg-red-500' },
      'lats': { top: '40%', left: '35%', color: 'bg-blue-500' },
      'middle_back': { top: '35%', left: '35%', color: 'bg-blue-400' },
      'ombros': { top: '28%', left: '42%', color: 'bg-yellow-500' },
      'biceps': { top: '45%', left: '48%', color: 'bg-green-500' },
      'triceps': { top: '45%', left: '40%', color: 'bg-green-400' },
      'quadriceps': { top: '65%', left: '45%', color: 'bg-purple-500' },
      'hamstrings': { top: '70%', left: '35%', color: 'bg-purple-400' },
      'glutes': { top: '55%', left: '35%', color: 'bg-pink-500' },
      'panturrilhas': { top: '85%', left: '45%', color: 'bg-orange-500' },
      'abdominais': { top: '50%', left: '45%', color: 'bg-cyan-500' },
      'trapezio': { top: '30%', left: '35%', color: 'bg-indigo-500' }
    };

    return (
      <div className="relative w-32 h-48 mx-auto bg-gray-100 rounded-lg overflow-hidden">
        {/* Silhueta simplificada do corpo */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-200 to-gray-300 opacity-50"></div>
        
        {/* Músculo principal destacado */}
        {musculos[exercicio.musculo_principal] && (
          <div
            className={`absolute w-6 h-6 rounded-full ${musculos[exercicio.musculo_principal].color} opacity-80 animate-pulse border-2 border-white shadow-lg`}
            style={{
              top: musculos[exercicio.musculo_principal].top,
              left: musculos[exercicio.musculo_principal].left,
              transform: 'translate(-50%, -50%)'
            }}
            title={exercicio.musculo_principal}
          ></div>
        )}
        
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 font-medium capitalize">
          {exercicio.musculo_principal}
        </div>
      </div>
    );
  };

  const renderDicasTecnica = () => {
    const dicasPorMusculo = {
      'peito': [
        'Mantenha os ombros retraídos e o peito estufado',
        'Controle a fase excêntrica (descida)',
        'Não arqueie excessivamente as costas'
      ],
      'lats': [
        'Inicie o movimento com as escápulas',
        'Pense em puxar os cotovelos, não as mãos',
        'Mantenha o core ativado'
      ],
      'quadriceps': [
        'Mantenha os joelhos alinhados com os pés',
        'Desça até pelo menos 90 graus',
        'Distribua o peso por toda a planta do pé'
      ],
      'ombros': [
        'Evite elevar os ombros durante o movimento',
        'Mantenha os cotovelos ligeiramente flexionados',
        'Controle a amplitude de movimento'
      ]
    };

    return dicasPorMusculo[exercicio.musculo_principal] || [
      'Mantenha a postura correta durante todo o movimento',
      'Controle a velocidade de execução',
      'Respire corretamente: expire no esforço, inspire no retorno'
    ];
  };

  const renderVariacoes = () => {
    // Aqui poderia vir de uma base de dados mais robusta
    const variacoes = {
      'supino_reto_barra': [
        { nome: 'Supino Inclinado', dificuldade: 'intermediario' },
        { nome: 'Supino com Halteres', dificuldade: 'iniciante' },
        { nome: 'Supino Declinado', dificuldade: 'intermediario' }
      ],
      'agachamento_livre': [
        { nome: 'Agachamento Frontal', dificuldade: 'avancado' },
        { nome: 'Agachamento Sumo', dificuldade: 'intermediario' },
        { nome: 'Agachamento Búlgaro', dificuldade: 'intermediario' }
      ]
    };

    return variacoes[exercicio.id] || [];
  };

  const abas = [
    { id: 'instrucoes', nome: 'Instruções', icon: BookOpen },
    { id: 'tecnica', nome: 'Técnica', icon: Target },
    { id: 'progressao', nome: 'Progressão', icon: Star },
    { id: 'variacoes', nome: 'Variações', icon: Settings }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[95vh] flex flex-col animate-fade-in-up">
        
        {/* Header */}
        <div className="flex justify-between items-start p-6 pb-4 border-b">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-bold text-gray-800">{exercicio.nome}</h2>
              <button
                onClick={() => setFavoritado(!favoritado)}
                className={`p-2 rounded-full transition-colors ${
                  favoritado ? 'text-yellow-500 bg-yellow-100' : 'text-gray-400 hover:text-yellow-500'
                }`}
              >
                <Star size={20} fill={favoritado ? 'currentColor' : 'none'} />
              </button>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                exercicio.dificuldade === 'iniciante' ? 'bg-green-100 text-green-800' :
                exercicio.dificuldade === 'intermediario' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {exercicio.dificuldade === 'iniciante' ? '🟢 Iniciante' :
                 exercicio.dificuldade === 'intermediario' ? '🟡 Intermediário' :
                 '🔴 Avançado'}
              </span>
              
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium capitalize">
                🎯 {exercicio.musculo_principal}
              </span>
              
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium capitalize">
                🏋️ {exercicio.equipamento.replace(/_/g, ' ')}
              </span>

              {exercicio.tags && exercicio.tags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
          
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navegação por abas */}
        <div className="border-b px-6">
          <nav className="-mb-px flex space-x-8">
            {abas.map(aba => {
              const Icon = aba.icon;
              return (
                <button
                  key={aba.id}
                  onClick={() => setAbaAtiva(aba.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    abaAtiva === aba.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon size={16} />
                  {aba.nome}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Conteúdo das abas */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Coluna principal */}
            <div className="lg:col-span-2 space-y-6">
              
              {abaAtiva === 'instrucoes' && (
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <BookOpen className="text-blue-600" size={20} />
                    Instruções Passo a Passo
                  </h3>
                  <div className="space-y-4">
                    {exercicio.instrucoes.map((passo, index) => (
                      <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-700 leading-relaxed">
                            {passo.trim().endsWith('.') ? passo.trim() : `${passo.trim()}.`}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {abaAtiva === 'tecnica' && (
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Target className="text-green-600" size={20} />
                    Dicas de Técnica
                  </h3>
                  <div className="space-y-4">
                    {renderDicasTecnica().map((dica, index) => (
                      <div key={index} className="flex gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="text-green-600 font-bold">💡</div>
                        <p className="text-gray-700">{dica}</p>
                      </div>
                    ))}
                  </div>

                  {/* Alertas de segurança */}
                  <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <h4 className="font-bold text-orange-800 mb-2 flex items-center gap-2">
                      <AlertTriangle size={18} />
                      Cuidados Importantes
                    </h4>
                    <ul className="text-orange-700 text-sm space-y-1">
                      <li>• Sempre aqueça antes de executar o exercício</li>
                      <li>• Pare imediatamente se sentir dor articular</li>
                      <li>• Mantenha a respiração controlada durante o movimento</li>
                      <li>• Use cargas adequadas ao seu nível de condicionamento</li>
                    </ul>
                  </div>
                </div>
              )}

              {abaAtiva === 'progressao' && (
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Star className="text-purple-600" size={20} />
                    Seu Progresso
                  </h3>
                  
                  {temProgressao ? (
                    <div className="space-y-6">
                      {/* Estatísticas gerais */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                          <div className="text-blue-600 font-semibold text-sm">Carga Atual</div>
                          <div className="text-2xl font-bold text-blue-800">{progressao.ultimaCarga}kg</div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                          <div className="text-green-600 font-semibold text-sm">Sessões Realizadas</div>
                          <div className="text-2xl font-bold text-green-800">{progressao.historico.length}</div>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                          <div className="text-purple-600 font-semibold text-sm">Evolução Total</div>
                          <div className="text-2xl font-bold text-purple-800">
                            +{(progressao.ultimaCarga - progressao.historico[0].carga).toFixed(1)}kg
                          </div>
                        </div>
                      </div>

                      {/* Gráfico simples de evolução */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-700 mb-3">Evolução das Cargas</h4>
                        <div className="flex items-end gap-2 h-32">
                          {progressao.historico.slice(-8).map((registro, index) => {
                            const maxCarga = Math.max(...progressao.historico.map(r => r.carga));
                            const altura = (registro.carga / maxCarga) * 100;
                            
                            return (
                              <div key={index} className="flex-1 flex flex-col items-center">
                                <div 
                                  className="bg-blue-500 rounded-t w-full min-h-4 transition-all hover:bg-blue-600"
                                  style={{ height: `${altura}%` }}
                                  title={`${registro.carga}kg - ${new Date(registro.data).toLocaleDateString('pt-BR')}`}
                                ></div>
                                <div className="text-xs text-gray-600 mt-1 text-center">
                                  <div className="font-semibold">{registro.carga}kg</div>
                                  <div>{new Date(registro.data).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}</div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Sugestões de progressão */}
                      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                        <h4 className="font-semibold text-yellow-800 mb-2">💡 Próxima Progressão</h4>
                        <p className="text-yellow-700 text-sm mb-2">
                          Baseado no seu histórico, sugerimos:
                        </p>
                        <ul className="text-yellow-700 text-sm space-y-1">
                          <li>• Aumentar para {(progressao.ultimaCarga + 2.5).toFixed(1)}kg na próxima sessão</li>
                          <li>• Ou tentar mais 1-2 repetições com a carga atual</li>
                          <li>• Focar na técnica perfeita antes de aumentar a carga</li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">📈</div>
                      <h4 className="text-xl font-semibold text-gray-700 mb-2">Ainda sem dados de progressão</h4>
                      <p className="text-gray-500 mb-4">
                        Execute este exercício em um treino para começar a acompanhar sua evolução.
                      </p>
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-left">
                        <h5 className="font-semibold text-blue-800 mb-2">Como progredir:</h5>
                        <ul className="text-blue-700 text-sm space-y-1">
                          <li>• Comece com uma carga que permita completar todas as séries</li>
                          <li>• Aumente 2,5-5kg quando conseguir fazer todas as séries facilmente</li>
                          <li>• Para exercícios de peso corporal, aumente as repetições gradualmente</li>
                          <li>• Foque sempre na técnica correta</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {abaAtiva === 'variacoes' && (
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Settings className="text-indigo-600" size={20} />
                    Variações e Alternativas
                  </h3>
                  
                  {renderVariacoes().length > 0 ? (
                    <div className="space-y-4">
                      {renderVariacoes().map((variacao, index) => (
                        <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold text-gray-800">{variacao.nome}</h4>
                              <span className={`inline-block px-2 py-1 rounded text-xs font-medium mt-1 ${
                                variacao.dificuldade === 'iniciante' ? 'bg-green-100 text-green-800' :
                                variacao.dificuldade === 'intermediario' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {variacao.dificuldade}
                              </span>
                            </div>
                            <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                              Ver detalhes →
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-4">🔄</div>
                      <p className="text-gray-500">Nenhuma variação cadastrada ainda para este exercício.</p>
                    </div>
                  )}

                  {/* Dicas gerais de variação */}
                  <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                    <h4 className="font-semibold text-indigo-800 mb-2">💡 Dicas para Variar</h4>
                    <ul className="text-indigo-700 text-sm space-y-1">
                      <li>• Altere a pegada (mais larga, mais fechada)</li>
                      <li>• Mude o ângulo (inclinado, declinado)</li>
                      <li>• Varie a velocidade de execução</li>
                      <li>• Experimente diferentes equipamentos</li>
                      <li>• Use técnicas avançadas (drop sets, rest-pause)</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Coluna lateral */}
            <div className="space-y-6">
              {/* Mapa do corpo */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-700 mb-3 text-center">Músculo Trabalhado</h4>
                {renderMapaCorpo()}
              </div>

              {/* Informações técnicas */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-700 mb-3">📊 Informações Técnicas</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Músculo Principal:</span>
                    <span className="font-medium capitalize text-blue-600">{exercicio.musculo_principal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Equipamento:</span>
                    <span className="font-medium capitalize">{exercicio.equipamento.replace(/_/g, ' ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dificuldade:</span>
                    <span className="font-medium capitalize">{exercicio.dificuldade}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tipo:</span>
                    <span className="font-medium">
                      {exercicio.tags?.includes('composto') ? 'Composto' : 'Isolador'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Play size={18} />
                  Iniciar Timer
                </button>
                
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  Substituir Exercício
                </button>
              </div>

              {/* Últimas execuções (se houver) */}
              {temProgressao && (
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-3">🕒 Últimas Execuções</h4>
                  <div className="space-y-2 text-sm">
                    {progressao.historico.slice(-3).reverse().map((registro, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-green-700">
                          {new Date(registro.data).toLocaleDateString('pt-BR')}
                        </span>
                        <span className="font-medium text-green-800">
                          {registro.carga}kg × {registro.series}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalExercicio;
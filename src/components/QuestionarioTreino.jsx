import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Target, Dumbbell, Calendar, Settings, Zap } from 'lucide-react';

const QuestionarioTreino = ({ onProgramaGerado }) => {
  const [etapaAtual, setEtapaAtual] = useState(0);
  const [respostas, setRespostas] = useState({
    objetivo: 'ganhar_massa',
    experiencia: 'iniciante',
    equipamentos: [],
    frequencia: 3,
    split: 'abc',
    tempoDisponivel: 60,
    lesoes: [],
    preferencias: []
  });

  const etapas = [
    {
      id: 'objetivo',
      titulo: 'Qual é seu objetivo principal?',
      subtitulo: 'Isso ajudará a personalizar seu treino',
      icon: Target,
      opcoes: [
        { value: 'ganhar_massa', label: '💪 Ganhar Massa Muscular', desc: 'Hipertrofia e força' },
        { value: 'definir', label: '🎯 Definir e Tonificar', desc: 'Reduzir gordura e definir músculos' },
        { value: 'emagrecer', label: '🔥 Emagrecer', desc: 'Perda de peso e queima de gordura' },
        { value: 'manter', label: '⚖️ Manter Forma Física', desc: 'Manutenção da condição atual' }
      ]
    },
    {
      id: 'experiencia',
      titulo: 'Qual seu nível de experiência?',
      subtitulo: 'Isso determinará a complexidade dos exercícios',
      icon: Zap,
      opcoes: [
        { value: 'iniciante', label: '🌱 Iniciante', desc: '0-1 ano de treino (ou voltando agora)' },
        { value: 'intermediario', label: '🚀 Intermediário', desc: '1-3 anos de treino consistente' },
        { value: 'avancado', label: '⭐ Avançado', desc: '3+ anos de experiência sólida' }
      ]
    },
    {
      id: 'frequencia',
      titulo: 'Quantas vezes por semana você pode treinar?',
      subtitulo: 'Seja realista com sua disponibilidade',
      icon: Calendar,
      tipo: 'range',
      min: 2,
      max: 6,
      recomendacoes: {
        2: 'Ideal para iniciantes ou pessoas muito ocupadas',
        3: 'Frequência clássica para resultados consistentes',
        4: 'Ótima para intermediários e avançados',
        5: 'Para quem tem experiência e tempo disponível',
        6: 'Apenas para avançados com boa recuperação'
      }
    },
    {
      id: 'equipamentos',
      titulo: 'Quais equipamentos você tem acesso?',
      subtitulo: 'Selecione todos que estão disponíveis para você',
      icon: Dumbbell,
      tipo: 'multipla',
      opcoes: [
        { value: 'barra', label: '🏋️ Barras', desc: 'Barra olímpica, barra W, etc.' },
        { value: 'halteres', label: '🔩 Halteres', desc: 'Halteres fixos ou ajustáveis' },
        { value: 'maquina', label: '⚙️ Máquinas', desc: 'Máquinas de musculação' },
        { value: 'body_only', label: '🤸 Peso Corporal', desc: 'Exercícios sem equipamento' },
        { value: 'barra_fixa', label: '💪 Barra Fixa', desc: 'Para puxadas e abdominais' }
      ]
    },
    {
      id: 'tempo',
      titulo: 'Quanto tempo você tem por treino?',
      subtitulo: 'Incluindo aquecimento e alongamento',
      icon: Settings,
      tipo: 'range',
      min: 30,
      max: 120,
      step: 15,
      unidade: 'min',
      recomendacoes: {
        30: 'Treino expresso - exercícios básicos',
        45: 'Tempo padrão para a maioria das pessoas',
        60: 'Tempo ideal para treinos completos',
        75: 'Para treinos mais detalhados',
        90: 'Treinos extensos com aquecimento completo',
        120: 'Sessões longas para atletas avançados'
      }
    }
  ];

  const handleProximaEtapa = () => {
    if (etapaAtual < etapas.length - 1) {
      setEtapaAtual(etapaAtual + 1);
    } else {
      finalizarQuestionario();
    }
  };

  const handleEtapaAnterior = () => {
    if (etapaAtual > 0) {
      setEtapaAtual(etapaAtual - 1);
    }
  };

  const handleRespostaChange = (campo, valor) => {
    setRespostas(prev => {
      const novasRespostas = { ...prev, [campo]: valor };
      
      // Auto-sugerir split baseado na experiência e frequência
      if (campo === 'experiencia' || campo === 'frequencia') {
        const exp = campo === 'experiencia' ? valor : prev.experiencia;
        const freq = campo === 'frequencia' ? valor : prev.frequencia;
        
        let splitSugerido = 'abc';
        
        if (exp === 'iniciante') {
          splitSugerido = freq <= 3 ? 'full_body' : 'ab';
        } else if (exp === 'intermediario') {
          if (freq <= 3) splitSugerido = 'ab';
          else if (freq <= 4) splitSugerido = 'abc';
          else splitSugerido = 'abcd';
        } else if (exp === 'avancado') {
          if (freq <= 3) splitSugerido = 'abc';
          else if (freq <= 5) splitSugerido = 'abcd';
          else splitSugerido = 'abcde';
        }
        
        novasRespostas.split = splitSugerido;
      }
      
      return novasRespostas;
    });
  };

  const finalizarQuestionario = () => {
    // Validações
    if (respostas.equipamentos.length === 0) {
      alert('Por favor, selecione pelo menos um equipamento disponível.');
      return;
    }

    const perfilCompleto = {
      ...respostas,
      frequencia: parseInt(respostas.frequencia),
      tempoDisponivel: parseInt(respostas.tempoDisponivel || 60)
    };
    
    console.log('Perfil completo enviado:', perfilCompleto);
    onProgramaGerado(perfilCompleto);
  };

  const podeAvancar = () => {
    const etapa = etapas[etapaAtual];
    const valor = respostas[etapa.id];
    
    if (etapa.tipo === 'multipla') {
      return Array.isArray(valor) && valor.length > 0;
    }
    
    return valor !== undefined && valor !== null && valor !== '';
  };

  const renderEtapa = () => {
    const etapa = etapas[etapaAtual];
    const Icon = etapa.icon;

    return (
      <div className="space-y-6">
        {/* Cabeçalho da etapa */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Icon className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{etapa.titulo}</h2>
          <p className="text-gray-600">{etapa.subtitulo}</p>
        </div>

        {/* Conteúdo da etapa */}
        {etapa.tipo === 'range' ? (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {respostas[etapa.id]}{etapa.unidade || ''}
              </div>
              {etapa.recomendacoes && respostas[etapa.id] && (
                <p className="text-sm text-gray-600 italic">
                  {etapa.recomendacoes[respostas[etapa.id]]}
                </p>
              )}
            </div>
            
            <div className="px-4">
              <input
                type="range"
                min={etapa.min}
                max={etapa.max}
                step={etapa.step || 1}
                value={respostas[etapa.id] || etapa.min}
                onChange={(e) => handleRespostaChange(etapa.id, parseInt(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${((respostas[etapa.id] - etapa.min) / (etapa.max - etapa.min)) * 100}%, #E5E7EB ${((respostas[etapa.id] - etapa.min) / (etapa.max - etapa.min)) * 100}%, #E5E7EB 100%)`
                }}
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>{etapa.min}{etapa.unidade || ''}</span>
                <span>{etapa.max}{etapa.unidade || ''}</span>
              </div>
            </div>
          </div>
        ) : etapa.tipo === 'multipla' ? (
          <div className="grid grid-cols-1 gap-3">
            {etapa.opcoes.map(opcao => (
              <label key={opcao.value} className={`cursor-pointer p-4 border-2 rounded-xl transition-all hover:shadow-md ${
                respostas[etapa.id]?.includes(opcao.value)
                  ? 'border-blue-500 bg-blue-50 shadow-lg' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}>
                <input
                  type="checkbox"
                  checked={respostas[etapa.id]?.includes(opcao.value) || false}
                  onChange={(e) => {
                    const atual = respostas[etapa.id] || [];
                    const novoArray = e.target.checked 
                      ? [...atual, opcao.value]
                      : atual.filter(item => item !== opcao.value);
                    handleRespostaChange(etapa.id, novoArray);
                  }}
                  className="sr-only"
                />
                <div className="flex items-center space-x-3">
                  <div className={`w-5 h-5 border-2 rounded flex items-center justify-center ${
                    respostas[etapa.id]?.includes(opcao.value)
                      ? 'border-blue-500 bg-blue-500' 
                      : 'border-gray-300'
                  }`}>
                    {respostas[etapa.id]?.includes(opcao.value) && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800">{opcao.label}</div>
                    <div className="text-sm text-gray-600">{opcao.desc}</div>
                  </div>
                </div>
              </label>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {etapa.opcoes.map(opcao => (
              <button
                key={opcao.value}
                onClick={() => handleRespostaChange(etapa.id, opcao.value)}
                className={`p-6 border-2 rounded-xl text-left transition-all hover:shadow-md ${
                  respostas[etapa.id] === opcao.value
                    ? 'border-blue-500 bg-blue-50 shadow-lg' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="font-semibold text-lg text-gray-800 mb-2">{opcao.label}</div>
                <div className="text-gray-600">{opcao.desc}</div>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Barra de progresso */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Etapa {etapaAtual + 1} de {etapas.length}</span>
          <span>{Math.round(((etapaAtual + 1) / etapas.length) * 100)}% concluído</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((etapaAtual + 1) / etapas.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="bg-white shadow-xl rounded-2xl p-8 mb-6">
        {renderEtapa()}
      </div>

      {/* Navegação */}
      <div className="flex justify-between items-center">
        <button
          onClick={handleEtapaAnterior}
          disabled={etapaAtual === 0}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
            etapaAtual === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <ChevronLeft size={18} />
          Anterior
        </button>

        <div className="flex gap-2">
          {etapas.map((_, index) => (
            <button
              key={index}
              onClick={() => setEtapaAtual(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === etapaAtual
                  ? 'bg-blue-500 scale-125'
                  : index < etapaAtual
                  ? 'bg-blue-300'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleProximaEtapa}
          disabled={!podeAvancar()}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
            !podeAvancar()
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : etapaAtual === etapas.length - 1
              ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-lg'
              : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg'
          }`}
        >
          {etapaAtual === etapas.length - 1 ? (
            <>
              🚀 Gerar Treino
              <ChevronRight size={18} />
            </>
          ) : (
            <>
              Próximo
              <ChevronRight size={18} />
            </>
          )}
        </button>
      </div>

      {/* Resumo das respostas (na última etapa) */}
      {etapaAtual === etapas.length - 1 && (
        <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
          <h3 className="font-semibold text-blue-800 mb-4">📋 Resumo do seu perfil:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-blue-600 font-medium">Objetivo:</span>
              <span className="ml-2 capitalize">{respostas.objetivo?.replace('_', ' ')}</span>
            </div>
            <div>
              <span className="text-blue-600 font-medium">Experiência:</span>
              <span className="ml-2 capitalize">{respostas.experiencia}</span>
            </div>
            <div>
              <span className="text-blue-600 font-medium">Frequência:</span>
              <span className="ml-2">{respostas.frequencia}x por semana</span>
            </div>
            <div>
              <span className="text-blue-600 font-medium">Tempo por treino:</span>
              <span className="ml-2">{respostas.tempoDisponivel || 60} minutos</span>
            </div>
            <div className="md:col-span-2">
              <span className="text-blue-600 font-medium">Equipamentos:</span>
              <span className="ml-2">{respostas.equipamentos?.length || 0} selecionados</span>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-blue-100 rounded border border-blue-300">
            <p className="text-blue-800 text-sm">
              💡 <strong>Split sugerido:</strong> {respostas.split?.toUpperCase()} - Baseado na sua experiência e frequência semanal
            </p>
          </div>
        </div>
      )}

      {/* Dicas contextuais */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-2">💡 Dicas:</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Seja honesto sobre sua experiência para receber exercícios adequados</li>
          <li>• Escolha uma frequência que você consegue manter consistentemente</li>
          <li>• Selecione apenas equipamentos que você realmente tem acesso regular</li>
          <li>• O sistema criará automaticamente a melhor divisão para seu perfil</li>
        </ul>
      </div>
    </div>
  );
};

export default QuestionarioTreino;
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, Pause, RotateCcw, Check, Timer, AlertCircle } from 'lucide-react';

const ModoExecucao = ({ treino, onFinalizarTreino, onVoltarPrograma, progressaoCargas }) => {
  const [treinoAtual, setTreinoAtual] = useState(treino);
  const [exercicioAtivo, setExercicioAtivo] = useState(0);
  const [serieAtiva, setSerieAtiva] = useState(0);
  const [timerDescanso, setTimerDescanso] = useState(0);
  const [timerAtivo, setTimerAtivo] = useState(false);
  const [tempoTotalTreino, setTempoTotalTreino] = useState(0);
  const [mostrarCongratulacoes, setMostrarCongratulacoes] = useState(false);

  // Timer para descanso entre séries
  useEffect(() => {
    let interval = null;
    if (timerAtivo && timerDescanso > 0) {
      interval = setInterval(() => {
        setTimerDescanso(timer => {
          if (timer <= 1) {
            setTimerAtivo(false);
            // Vibração e notificação sonora (se suportado)
            if (navigator.vibrate) {
              navigator.vibrate([200, 100, 200]);
            }
            return 0;
          }
          return timer - 1;
        });
      }, 1000);
    } else if (!timerAtivo) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerAtivo, timerDescanso]);

  // Timer para tempo total do treino
  useEffect(() => {
    const interval = setInterval(() => {
      setTempoTotalTreino(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const exercicioAtualObj = treinoAtual.exercicios[exercicioAtivo];
  const tempoDescanso = parseInt(exercicioAtualObj?.descanso?.replace('s', '') || 60);

  const marcarSerieCompleta = (carga, observacao = '') => {
    const novoTreino = { ...treinoAtual };
    const exercicio = novoTreino.exercicios[exercicioAtivo];
    
    exercicio.seriesCompletas += 1;
    exercicio.cargasUtilizadas.push(carga);
    if (observacao) {
      exercicio.observacoes += (exercicio.observacoes ? ' | ' : '') + observacao;
    }

    // Verificar se completou todas as séries do exercício
    if (exercicio.seriesCompletas >= exercicio.series) {
      exercicio.completo = true;
      
      // Avançar para próximo exercício ou finalizar
      if (exercicioAtivo < treinoAtual.exercicios.length - 1) {
        setExercicioAtivo(prev => prev + 1);
        setSerieAtiva(0);
        setTimerDescanso(0);
        setTimerAtivo(false);
      } else {
        // Treino completo!
        setMostrarCongratulacoes(true);
        setTimeout(() => {
          onFinalizarTreino(novoTreino);
        }, 3000);
      }
    } else {
      // Iniciar timer de descanso
      setSerieAtiva(prev => prev + 1);
      setTimerDescanso(tempoDescanso);
      setTimerAtivo(true);
    }

    setTreinoAtual(novoTreino);
  };

  const pularDescanso = () => {
    setTimerDescanso(0);
    setTimerAtivo(false);
  };

  const pausarRetomarTimer = () => {
    setTimerAtivo(!timerAtivo);
  };

  const reiniciarTimer = () => {
    setTimerDescanso(tempoDescanso);
    setTimerAtivo(true);
  };

  const formatarTempo = (segundos) => {
    const mins = Math.floor(segundos / 60);
    const secs = segundos % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const calcularProgresso = () => {
    const exerciciosCompletos = treinoAtual.exercicios.filter(ex => ex.completo).length;
    return (exerciciosCompletos / treinoAtual.exercicios.length) * 100;
  };

  const sugerirCarga = (exercicioId) => {
    const progressao = progressaoCargas[exercicioId];
    if (!progressao || !progressao.ultimaCarga) return '';
    
    const aumento = Math.max(2.5, progressao.ultimaCarga * 0.05);
    const novaCarga = progressao.ultimaCarga + aumento;
    return novaCarga.toFixed(1);
  };

  if (mostrarCongratulacoes) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
        <div className="text-center text-white p-8">
          <div className="text-8xl mb-4 animate-bounce">🎉</div>
          <h1 className="text-4xl font-bold mb-4">Parabéns! Treino Concluído!</h1>
          <p className="text-xl mb-2">Tempo total: {formatarTempo(tempoTotalTreino)}</p>
          <p className="text-lg">Excelente trabalho! Continue assim! 💪</p>
          <div className="mt-6 animate-pulse">
            <div className="text-6xl">⭐</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header com informações do treino */}
      <div className="bg-gray-800 shadow-lg sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={onVoltarPrograma}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              <ArrowLeft size={18} />
              Voltar
            </button>
            
            <div className="text-center">
              <h1 className="text-lg font-bold">{treinoAtual.nomeTreino}</h1>
              <p className="text-sm text-gray-300">Tempo: {formatarTempo(tempoTotalTreino)}</p>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-300">Progresso</p>
              <p className="text-lg font-bold">{Math.round(calcularProgresso())}%</p>
            </div>
          </div>

          {/* Barra de progresso */}
          <div className="mt-3 w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${calcularProgresso()}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Timer de descanso (quando ativo) */}
        {timerDescanso > 0 && (
          <div className="mb-6 p-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Timer size={24} />
              <h2 className="text-xl font-bold">Tempo de Descanso</h2>
            </div>
            <div className="text-6xl font-mono font-bold mb-4">
              {formatarTempo(timerDescanso)}
            </div>
            <div className="flex gap-3 justify-center">
              <button 
                onClick={pausarRetomarTimer}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              >
                {timerAtivo ? <Pause size={18} /> : <Play size={18} />}
                {timerAtivo ? 'Pausar' : 'Retomar'}
              </button>
              <button 
                onClick={reiniciarTimer}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              >
                <RotateCcw size={18} />
                Reiniciar
              </button>
              <button 
                onClick={pularDescanso}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg transition-colors font-semibold"
              >
                Pular Descanso
              </button>
            </div>
          </div>
        )}

        {/* Exercício atual */}
        <div className="bg-gray-800 rounded-xl p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">{exercicioAtualObj.nome}</h2>
              <div className="flex gap-4 text-sm text-gray-300">
                <span className="capitalize">🎯 {exercicioAtualObj.musculo_principal}</span>
                <span className="capitalize">🏋️ {exercicioAtualObj.equipamento.replace('_', ' ')}</span>
                <span>⏱️ {exercicioAtualObj.descanso} descanso</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-300">Exercício</p>
              <p className="text-xl font-bold">{exercicioAtivo + 1}/{treinoAtual.exercicios.length}</p>
            </div>
          </div>

          {/* Progresso das séries */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-300">Séries</span>
              <span className="text-sm text-gray-300">
                {exercicioAtualObj.seriesCompletas}/{exercicioAtualObj.series}
              </span>
            </div>
            <div className="flex gap-2">
              {Array.from({ length: exercicioAtualObj.series }, (_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-2 rounded-full ${
                    i < exercicioAtualObj.seriesCompletas
                      ? 'bg-green-500'
                      : i === serieAtiva
                      ? 'bg-blue-500 animate-pulse'
                      : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Informações da série atual */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-700 p-3 rounded-lg text-center">
              <p className="text-sm text-gray-300">Repetições</p>
              <p className="text-xl font-bold">{exercicioAtualObj.repeticoes}</p>
            </div>
            <div className="bg-gray-700 p-3 rounded-lg text-center">
              <p className="text-sm text-gray-300">Cadência</p>
              <p className="text-xl font-bold">{exercicioAtualObj.cadencia}</p>
            </div>
            <div className="bg-gray-700 p-3 rounded-lg text-center">
              <p className="text-sm text-gray-300">Série Atual</p>
              <p className="text-xl font-bold">{serieAtiva + 1}</p>
            </div>
            <div className="bg-gray-700 p-3 rounded-lg text-center">
              <p className="text-sm text-gray-300">Carga Sugerida</p>
              <p className="text-xl font-bold">{sugerirCarga(exercicioAtualObj.id) || '--'}kg</p>
            </div>
          </div>

          {/* Registro da série */}
          <SerieInput 
            onSerieCompleta={marcarSerieCompleta}
            cargaSugerida={sugerirCarga(exercicioAtualObj.id)}
            disabled={timerDescanso > 0}
          />
        </div>

        {/* Lista de exercícios restantes */}
        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Próximos Exercícios</h3>
          <div className="space-y-3">
            {treinoAtual.exercicios.slice(exercicioAtivo + 1, exercicioAtivo + 4).map((ex, index) => (
              <div key={ex.id} className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg">
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-sm">
                  {exercicioAtivo + index + 2}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{ex.nome}</p>
                  <p className="text-sm text-gray-300">{ex.series}x{ex.repeticoes}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente para input da série
const SerieInput = ({ onSerieCompleta, cargaSugerida, disabled }) => {
  const [carga, setCarga] = useState(cargaSugerida || '');
  const [observacao, setObservacao] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!carga) {
      alert('Por favor, informe a carga utilizada');
      return;
    }
    
    onSerieCompleta(carga, observacao);
    setObservacao('');
    setFeedback('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-300 mb-2">Carga utilizada (kg)</label>
          <input
            type="number"
            step="0.5"
            value={carga}
            onChange={(e) => setCarga(e.target.value)}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white text-lg"
            placeholder="Ex: 20"
            disabled={disabled}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-2">Como foi a série?</label>
          <select
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
            disabled={disabled}
          >
            <option value="">Selecione...</option>
            <option value="facil">😊 Muito fácil</option>
            <option value="bom">👍 Na medida certa</option>
            <option value="dificil">😤 Difícil</option>
            <option value="maximo">🔥 Esforço máximo</option>
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-sm text-gray-300 mb-2">Observações (opcional)</label>
        <input
          type="text"
          value={observacao}
          onChange={(e) => setObservacao(e.target.value)}
          placeholder="Ex: Técnica melhorou, dor no joelho..."
          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
          disabled={disabled}
        />
      </div>

      <button
        type="submit"
        disabled={disabled}
        className={`w-full flex items-center justify-center gap-2 py-4 px-6 rounded-lg font-semibold text-lg transition-all ${
          disabled
            ? 'bg-gray-600 cursor-not-allowed'
            : 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 shadow-lg hover:shadow-xl'
        }`}
      >
        <Check size={20} />
        {disabled ? 'Aguarde o descanso...' : 'Série Completa'}
      </button>
    </form>
  );
};

export default ModoExecucao;
// Sistema de Geração de Treinos Inteligente e Aprimorado - FitCore v3.0
import { exercicios } from '../data/exercicios.js';

// Configurações mais detalhadas por objetivo
const configsPorObjetivo = {
  ganhar_massa: { 
    series: [3, 4, 5], 
    repeticoes: ['6-8', '8-10', '8-12', '10-12'], 
    descanso: [90, 120, 150], 
    cadencia: ['3010', '2012', '4010'],
    intensidade: 'alta',
    volume: 'alto',
    progressaoSemanal: 2.5, // kg por semana
    focoPrincipal: 'hipertrofia'
  },
  definir: { 
    series: [3, 4], 
    repeticoes: ['12-15', '15-20', '12-18'], 
    descanso: [45, 60, 75], 
    cadencia: ['1011', '2011', '1010'],
    intensidade: 'moderada',
    volume: 'moderado',
    progressaoSemanal: 1.5,
    focoPrincipal: 'definicao'
  },
  emagrecer: { 
    series: [2, 3, 4], 
    repeticoes: ['15-20', '20-25', '12-20'], 
    descanso: [30, 45, 60], 
    cadencia: ['1010', '2010', '1011'],
    intensidade: 'moderada',
    volume: 'alto',
    progressaoSemanal: 1.0,
    focoPrincipal: 'queima_calorica'
  },
  manter: { 
    series: [3, 4], 
    repeticoes: ['8-12', '10-15', '12-15'], 
    descanso: [60, 75, 90], 
    cadencia: ['2011', '2012', '3011'],
    intensidade: 'moderada',
    volume: 'moderado',
    progressaoSemanal: 1.5,
    focoPrincipal: 'manutencao'
  }
};

// Divisões de treino expandidas e otimizadas
const divisoesDeTreino = {
  full_body: {
    nome: 'Full Body',
    frequencia_recomendada: [2, 3],
    nivel_recomendado: ['iniciante'],
    descrição: 'Treina todos os grupos musculares em cada sessão',
    vantagens: ['Eficiente para iniciantes', 'Permite mais descanso', 'Menos tempo por semana'],
    dias: [{
      nome: 'Treino A - Corpo Inteiro',
      musculos: ['peito', 'lats', 'quadriceps', 'ombros', 'biceps', 'triceps'],
      prioridade: ['peito', 'quadriceps', 'lats'],
      aquecimento: ['mobilidade_articular', 'cardio_leve'],
      alongamento: ['geral']
    }]
  },
  ab: {
    nome: 'Upper/Lower (AB)',
    frequencia_recomendada: [3, 4],
    nivel_recomendado: ['iniciante', 'intermediario'],
    descrição: 'Alterna entre membros superiores e inferiores',
    vantagens: ['Boa recuperação', 'Mais volume por grupo', 'Flexível'],
    dias: [
      {
        nome: 'Treino A - Superiores',
        musculos: ['peito', 'lats', 'ombros', 'biceps', 'triceps'],
        prioridade: ['peito', 'lats'],
        aquecimento: ['mobilidade_ombros', 'ativacao_escapular'],
        alongamento: ['superiores']
      },
      {
        nome: 'Treino B - Inferiores',
        musculos: ['quadriceps', 'hamstrings', 'glutes', 'panturrilhas'],
        prioridade: ['quadriceps', 'glutes'],
        aquecimento: ['mobilidade_quadril', 'ativacao_gluteos'],
        alongamento: ['inferiores']
      }
    ]
  },
  abc: {
    nome: 'Push/Pull/Legs (ABC)',
    frequencia_recomendada: [3, 4, 5, 6],
    nivel_recomendado: ['intermediario', 'avancado'],
    descrição: 'Divide por padrões de movimento',
    vantagens: ['Excelente recuperação', 'Alta especialização', 'Muito versátil'],
    dias: [
      {
        nome: 'Treino A - Empurrar (Push)',
        musculos: ['peito', 'ombros', 'triceps'],
        prioridade: ['peito', 'ombros'],
        aquecimento: ['mobilidade_ombros', 'ativacao_peitoral'],
        alongamento: ['peito_ombros']
      },
      {
        nome: 'Treino B - Puxar (Pull)',
        musculos: ['lats', 'middle_back', 'biceps', 'trapezio'],
        prioridade: ['lats', 'middle_back'],
        aquecimento: ['ativacao_escapular', 'mobilidade_toracica'],
        alongamento: ['costas_biceps']
      },
      {
        nome: 'Treino C - Pernas (Legs)',
        musculos: ['quadriceps', 'hamstrings', 'glutes', 'panturrilhas'],
        prioridade: ['quadriceps', 'hamstrings', 'glutes'],
        aquecimento: ['mobilidade_quadril', 'ativacao_gluteos'],
        alongamento: ['pernas_completo']
      }
    ]
  },
  abcd: {
    nome: 'Treino ABCD',
    frequencia_recomendada: [4, 5],
    nivel_recomendado: ['intermediario', 'avancado'],
    descrição: 'Especialização moderada por grupos',
    vantagens: ['Bom volume por grupo', 'Recuperação adequada', 'Permite foco'],
    dias: [
      {
        nome: 'Treino A - Peito e Tríceps',
        musculos: ['peito', 'triceps'],
        prioridade: ['peito'],
        aquecimento: ['mobilidade_ombros', 'ativacao_peitoral'],
        alongamento: ['peito_triceps']
      },
      {
        nome: 'Treino B - Costas e Bíceps',
        musculos: ['lats', 'middle_back', 'biceps'],
        prioridade: ['lats', 'middle_back'],
        aquecimento: ['ativacao_escapular', 'mobilidade_toracica'],
        alongamento: ['costas_biceps']
      },
      {
        nome: 'Treino C - Pernas Completo',
        musculos: ['quadriceps', 'hamstrings', 'glutes', 'panturrilhas'],
        prioridade: ['quadriceps', 'glutes'],
        aquecimento: ['mobilidade_quadril', 'ativacao_gluteos'],
        alongamento: ['pernas_completo']
      },
      {
        nome: 'Treino D - Ombros e Core',
        musculos: ['ombros', 'abdominais', 'trapezio'],
        prioridade: ['ombros'],
        aquecimento: ['mobilidade_ombros', 'ativacao_core'],
        alongamento: ['ombros_core']
      }
    ]
  },
  abcde: {
    nome: 'Treino ABCDE',
    frequencia_recomendada: [5, 6],
    nivel_recomendado: ['avancado'],
    descrição: 'Máxima especialização por grupo muscular',
    vantagens: ['Volume máximo', 'Especialização total', 'Para competidores'],
    dias: [
      {
        nome: 'Treino A - Peito',
        musculos: ['peito'],
        prioridade: ['peito'],
        aquecimento: ['mobilidade_ombros', 'ativacao_peitoral'],
        alongamento: ['peito_completo']
      },
      {
        nome: 'Treino B - Costas',
        musculos: ['lats', 'middle_back', 'trapezio'],
        prioridade: ['lats', 'middle_back'],
        aquecimento: ['ativacao_escapular', 'mobilidade_toracica'],
        alongamento: ['costas_completo']
      },
      {
        nome: 'Treino C - Pernas',
        musculos: ['quadriceps', 'hamstrings', 'glutes', 'panturrilhas'],
        prioridade: ['quadriceps', 'hamstrings', 'glutes'],
        aquecimento: ['mobilidade_quadril', 'ativacao_gluteos'],
        alongamento: ['pernas_completo']
      },
      {
        nome: 'Treino D - Ombros',
        musculos: ['ombros'],
        prioridade: ['ombros'],
        aquecimento: ['mobilidade_ombros', 'ativacao_deltoide'],
        alongamento: ['ombros_completo']
      },
      {
        nome: 'Treino E - Braços e Core',
        musculos: ['biceps', 'triceps', 'abdominais'],
        prioridade: ['biceps', 'triceps'],
        aquecimento: ['mobilidade_cotovelos', 'ativacao_core'],
        alongamento: ['bracos_core']
      }
    ]
  }
};

// Sistema avançado de pontuação para exercícios
const avaliarExercicio = (exercicio, objetivo, experiencia, equipamentos, contexto = {}) => {
  let pontuacao = 0;

  // Verificar se o exercício existe
  if (!exercicio) return 0;

  // Pontuação base por tipo de exercício
  if (exercicio.tags?.includes('composto')) pontuacao += 20;
  if (exercicio.tags?.includes('isolador')) pontuacao += 12;
  if (exercicio.tags?.includes('força')) pontuacao += 15;
  if (exercicio.tags?.includes('hipertrofia')) pontuacao += 12;
  if (exercicio.tags?.includes('calistenia')) pontuacao += 8;

  // Pontuação específica por objetivo
  const config = configsPorObjetivo[objetivo];
  if (config) {
    if (config.focoPrincipal === 'hipertrofia' && exercicio.tags?.includes('composto')) pontuacao += 15;
    if (config.focoPrincipal === 'definicao' && exercicio.tags?.includes('isolador')) pontuacao += 10;
    if (config.focoPrincipal === 'queima_calorica' && exercicio.equipamento === 'body_only') pontuacao += 8;
  }

  // Pontuação por experiência vs dificuldade
  const matchExperiencia = {
    'iniciante': { 'iniciante': 15, 'intermediario': -8, 'avancado': -15 },
    'intermediario': { 'iniciante': 8, 'intermediario': 15, 'avancado': 5 },
    'avancado': { 'iniciante': 5, 'intermediario': 10, 'avancado': 20 }
  };
  
  if (exercicio.dificuldade && matchExperiencia[experiencia]) {
    pontuacao += matchExperiencia[experiencia][exercicio.dificuldade] || 0;
  }

  // Pontuação por disponibilidade e adequação de equipamento
  if (equipamentos && equipamentos.includes(exercicio.equipamento)) {
    pontuacao += 20;
    
    // Bônus para equipamentos mais versáteis
    if (exercicio.equipamento === 'halteres') pontuacao += 5;
    if (exercicio.equipamento === 'barra') pontuacao += 8;
  }
  if (exercicio.equipamento === 'body_only') pontuacao += 8; // Sempre disponível

  // Contexto específico (posição no treino, músculos já trabalhados, etc.)
  if (contexto.isPrimeiro && exercicio.tags?.includes('composto')) pontuacao += 10;
  if (contexto.isUltimo && exercicio.tags?.includes('isolador')) pontuacao += 8;
  if (contexto.muscuJaTrabalhado && exercicio.tags?.includes('isolador')) pontuacao += 5;

  // Penalizações
  if (equipamentos && !equipamentos.includes(exercicio.equipamento) && exercicio.equipamento !== 'body_only') {
    pontuacao -= 30;
  }

  return Math.max(0, pontuacao);
};

// Sistema inteligente de periodização
const aplicarPeriodizacao = (exerciciosArray, semana = 1) => {
  if (!Array.isArray(exerciciosArray)) return [];
  
  const faseAtual = Math.floor(semana / 4) % 3; // Ciclos de 12 semanas
  
  return exerciciosArray.map(ex => {
    let novoEx = { ...ex };
    
    switch (faseAtual) {
      case 0: // Fase de Adaptação (semanas 1-4)
        if (ex.series > 3) novoEx.series = 3;
        novoEx.intensidade = 'moderada';
        break;
      case 1: // Fase de Intensificação (semanas 5-8)
        novoEx.series = Math.min(ex.series + 1, 5);
        novoEx.intensidade = 'alta';
        break;
      case 2: // Fase de Realização (semanas 9-12)
        novoEx.series = Math.max(ex.series - 1, 2);
        novoEx.intensidade = 'muito_alta';
        break;
    }
    
    return novoEx;
  });
};

// Função para embaralhar array de forma mais eficiente
const shuffleArray = (array) => {
  if (!Array.isArray(array)) return [];
  
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Função para selecionar valor aleatório de array com pesos
const escolherAleatorioComPeso = (array, pesos = null) => {
  if (!Array.isArray(array) || array.length === 0) return null;
  
  if (!pesos) return array[Math.floor(Math.random() * array.length)];
  
  const totalPeso = pesos.reduce((sum, peso) => sum + peso, 0);
  let random = Math.random() * totalPeso;
  
  for (let i = 0; i < array.length; i++) {
    random -= pesos[i];
    if (random <= 0) return array[i];
  }
  
  return array[array.length - 1];
};

// Sistema super inteligente de seleção de exercícios
const selecionarExercicios = (musculos, exerciciosDisponiveis, objetivo, experiencia, equipamentos, usados = new Set(), contexto = {}) => {
  const exerciciosSelecionados = [];
  const config = configsPorObjetivo[objetivo];
  
  if (!Array.isArray(musculos) || !Array.isArray(exerciciosDisponiveis)) {
    console.warn('Parâmetros inválidos para selecionarExercicios');
    return exerciciosSelecionados;
  }

  musculos.forEach((musculo, muscuIndex) => {
    // Filtrar exercícios disponíveis para este músculo
    const candidatos = exerciciosDisponiveis.filter(ex => 
      ex && ex.musculo_principal === musculo && !usados.has(ex.id)
    );

    if (candidatos.length === 0) return;

    // Determinar quantidade e tipo de exercícios por músculo
    const isMusculoGrande = ['peito', 'lats', 'middle_back', 'quadriceps', 'glutes', 'hamstrings'].includes(musculo);
    const isMusculoPequeno = ['biceps', 'triceps', 'panturrilhas', 'abdominais'].includes(musculo);
    const isMusculoPrioritario = contexto.prioridades?.includes(musculo);
    
    let quantidade = 1; // Padrão

    // Lógica inteligente para quantidade de exercícios
    if (isMusculoGrande) {
      quantidade = objetivo === 'ganhar_massa' && experiencia !== 'iniciante' ? 3 : 2;
      if (isMusculoPrioritario) quantidade = Math.min(quantidade + 1, 4);
    } else if (isMusculoPequeno) {
      quantidade = objetivo === 'ganhar_massa' && experiencia === 'avancado' ? 2 : 1;
    }

    // Ajustar baseado no tempo disponível
    if (contexto.tempoDisponivel && contexto.tempoDisponivel < 60) {
      quantidade = Math.max(1, quantidade - 1);
    }

    // Avaliar e selecionar exercícios
    const candidatosAvaliados = candidatos.map(ex => ({
      exercicio: ex,
      pontuacao: avaliarExercicio(ex, objetivo, experiencia, equipamentos, {
        isPrimeiro: exerciciosSelecionados.length === 0,
        isUltimo: muscuIndex === musculos.length - 1,
        muscuJaTrabalhado: exerciciosSelecionados.some(sel => sel.musculo_principal === musculo)
      })
    }));

    // Ordenar por pontuação
    candidatosAvaliados.sort((a, b) => b.pontuacao - a.pontuacao);

    // Selecionar os melhores exercícios
    const selecionados = candidatosAvaliados
      .slice(0, quantidade)
      .map(item => item.exercicio);

    selecionados.forEach(ex => {
      // Aplicar configurações baseadas no objetivo
      const exercicioCompleto = {
        ...ex,
        series: escolherAleatorioComPeso(config.series) || 3,
        repeticoes: escolherAleatorioComPeso(config.repeticoes) || '8-12',
        descanso: escolherAleatorioComPeso(config.descanso) || 60,
        cadencia: escolherAleatorioComPeso(config.cadencia) || '2011',
        carga: 0 // Será definida pelo usuário
      };

      exerciciosSelecionados.push(exercicioCompleto);
      usados.add(ex.id);
    });
  });

  return exerciciosSelecionados;
};

// Função principal para gerar programa
export const gerarProgramaAvancado = (perfilUsuario, tipoDivisao = 'abc') => {
  try {
    // Validar entrada
    if (!perfilUsuario || !exercicios || !Array.isArray(exercicios)) {
      throw new Error('Dados de entrada inválidos');
    }

    const divisaoEscolhida = divisoesDeTreino[tipoDivisao];
    if (!divisaoEscolhida) {
      throw new Error(`Divisão '${tipoDivisao}' não encontrada`);
    }

    const config = configsPorObjetivo[perfilUsuario.objetivo];
    if (!config) {
      throw new Error(`Objetivo '${perfilUsuario.objetivo}' não encontrado`);
    }

    const exerciciosDisponiveis = exercicios.filter(ex => 
      ex && perfilUsuario.equipamentos.includes(ex.equipamento)
    );

    if (exerciciosDisponiveis.length === 0) {
      throw new Error('Nenhum exercício disponível para os equipamentos selecionados');
    }

    const usados = new Set();
    const programa = {
      nomePrograma: `Programa ${divisaoEscolhida.nome} - ${perfilUsuario.objetivo.replace('_', ' ').toUpperCase()}`,
      objetivo: perfilUsuario.objetivo,
      experiencia: perfilUsuario.experiencia,
      frequencia: perfilUsuario.frequencia,
      divisao: [],
      metadados: {
        dataGeracao: new Date().toISOString(),
        versao: '3.0',
        recomendacoes: []
      }
    };

    // Gerar treinos baseados na divisão
    divisaoEscolhida.dias.forEach(dia => {
      const contexto = {
        prioridades: dia.prioridade || [],
        tempoDisponivel: perfilUsuario.tempoDisponivel || 60
      };

      const exerciciosDoDia = selecionarExercicios(
        dia.musculos,
        exerciciosDisponiveis,
        perfilUsuario.objetivo,
        perfilUsuario.experiencia,
        perfilUsuario.equipamentos,
        usados,
        contexto
      );

      // Calcular tempo estimado
      const tempoEstimado = Math.ceil(
        exerciciosDoDia.length * 3 + // 3 min por exercício (setup)
        exerciciosDoDia.reduce((sum, ex) => sum + (ex.series * (parseInt(ex.descanso) || 60) / 60), 0) + // tempo de descanso
        10 // aquecimento e alongamento
      );

      programa.divisao.push({
        nome: dia.nome,
        musculos: dia.musculos,
        exercicios: exerciciosDoDia,
        aquecimento: dia.aquecimento || [],
        alongamento: dia.alongamento || [],
        tempoEstimado,
        focoPrincipal: config.focoPrincipal
      });
    });

    // Adicionar recomendações
    programa.metadados.recomendacoes = gerarRecomendacoes(perfilUsuario, programa);

    return programa;
  } catch (error) {
    console.error('Erro ao gerar programa:', error);
    return null;
  }
};

// Função para gerar recomendações personalizadas
const gerarRecomendacoes = (perfil, programa) => {
  const recomendacoes = [];

  if (perfil.experiencia === 'iniciante') {
    recomendacoes.push('Foque na técnica correta antes de aumentar cargas');
    recomendacoes.push('Comece com cargas leves e aumente progressivamente');
  }

  if (perfil.objetivo === 'ganhar_massa') {
    recomendacoes.push('Mantenha uma alimentação hipercalórica rica em proteínas');
    recomendacoes.push('Descanse adequadamente entre treinos para recuperação');
  }

  if (perfil.frequencia >= 5) {
    recomendacoes.push('Com alta frequência, monitore sinais de overtraining');
  }

  return recomendacoes;
};

// Função para validar programa gerado
export const validarPrograma = (programa) => {
  if (!programa || !programa.divisao || !Array.isArray(programa.divisao)) {
    return false;
  }

  return programa.divisao.every(dia => 
    dia && Array.isArray(dia.exercicios) && dia.exercicios.length > 0
  );
};

// Função para analisar programa
export const analisarPrograma = (programa) => {
  if (!validarPrograma(programa)) {
    return null;
  }

  const totalDias = programa.divisao.length;
  const totalExercicios = programa.divisao.reduce((sum, dia) => sum + dia.exercicios.length, 0);
  const tempoMedioTreino = Math.round(
    programa.divisao.reduce((sum, dia) => sum + dia.tempoEstimado, 0) / totalDias
  );

  return {
    totalDias,
    totalExercicios,
    tempoMedioTreino,
    exerciciosPorDia: totalExercicios / totalDias
  };
};

export { divisoesDeTreino, configsPorObjetivo };
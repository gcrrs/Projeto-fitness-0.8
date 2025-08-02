// Sistema de Conquistas do FitCore System

export const conquistas = [
  // Conquistas de Treino
  {
    id: 'primeiro_treino',
    nome: 'Primeiro Passo',
    descricao: 'Complete seu primeiro treino',
    emoji: '🎯',
    categoria: 'treino',
    condicao: { tipo: 'treinos_concluidos', valor: 1 },
    pontos: 10
  },
  {
    id: 'sequencia_3_treinos',
    nome: 'Consistência',
    descricao: 'Complete 3 treinos seguidos',
    emoji: '🔥',
    categoria: 'treino',
    condicao: { tipo: 'sequencia_treinos', valor: 3 },
    pontos: 25
  },
  {
    id: 'sequencia_7_treinos',
    nome: 'Dedicação',
    descricao: 'Complete 7 treinos seguidos',
    emoji: '💪',
    categoria: 'treino',
    condicao: { tipo: 'sequencia_treinos', valor: 7 },
    pontos: 50
  },
  {
    id: 'treinos_mes',
    nome: 'Guerreiro do Mês',
    descricao: 'Complete 20 treinos em um mês',
    emoji: '👑',
    categoria: 'treino',
    condicao: { tipo: 'treinos_mes', valor: 20 },
    pontos: 100
  },
  {
    id: 'evolucao_carga',
    nome: 'Mais Forte',
    descricao: 'Aumente a carga em 10kg em qualquer exercício',
    emoji: '⚡',
    categoria: 'treino',
    condicao: { tipo: 'evolucao_carga', valor: 10 },
    pontos: 30
  },

  // Conquistas de Nutrição
  {
    id: 'primeira_refeicao',
    nome: 'Bem Alimentado',
    descricao: 'Complete sua primeira refeição',
    emoji: '🍽️',
    categoria: 'nutricao',
    condicao: { tipo: 'refeicoes_concluidas', valor: 1 },
    pontos: 5
  },
  {
    id: 'dia_completo_nutricao',
    nome: 'Dia Perfeito',
    descricao: 'Complete todas as 5 refeições do dia',
    emoji: '🌟',
    categoria: 'nutricao',
    condicao: { tipo: 'refeicoes_dia_completo', valor: 5 },
    pontos: 20
  },
  {
    id: 'meta_proteina',
    nome: 'Proteína Master',
    descricao: 'Atinja sua meta de proteína diária',
    emoji: '🥩',
    categoria: 'nutricao',
    condicao: { tipo: 'meta_proteina_atingida', valor: 1 },
    pontos: 15
  },
  {
    id: 'sequencia_nutricao',
    nome: 'Disciplina Alimentar',
    descricao: 'Complete todas as refeições por 7 dias seguidos',
    emoji: '📅',
    categoria: 'nutricao',
    condicao: { tipo: 'sequencia_nutricao_completa', valor: 7 },
    pontos: 75
  },

  // Conquistas de Progresso
  {
    id: 'primeira_pesagem',
    nome: 'Ponto de Partida',
    descricao: 'Registre seu primeiro peso',
    emoji: '⚖️',
    categoria: 'progresso',
    condicao: { tipo: 'pesagens_registradas', valor: 1 },
    pontos: 5
  },
  {
    id: 'perda_peso_2kg',
    nome: 'Emagrecendo',
    descricao: 'Perca 2kg do peso inicial',
    emoji: '📉',
    categoria: 'progresso',
    condicao: { tipo: 'perda_peso', valor: 2 },
    pontos: 40
  },
  {
    id: 'ganho_peso_2kg',
    nome: 'Ganhando Massa',
    descricao: 'Ganhe 2kg do peso inicial',
    emoji: '📈',
    categoria: 'progresso',
    condicao: { tipo: 'ganho_peso', valor: 2 },
    pontos: 40
  },
  {
    id: 'medidas_registradas',
    nome: 'Medindo Progresso',
    descricao: 'Registre suas medidas corporais',
    emoji: '📏',
    categoria: 'progresso',
    condicao: { tipo: 'medidas_registradas', valor: 1 },
    pontos: 10
  },

  // Conquistas Especiais
  {
    id: 'perfil_completo',
    nome: 'Perfil Completo',
    descricao: 'Preencha todos os dados do seu perfil',
    emoji: '✅',
    categoria: 'especial',
    condicao: { tipo: 'perfil_completo', valor: 1 },
    pontos: 15
  },
  {
    id: 'primeiro_mes',
    nome: 'Um Mês de Jornada',
    descricao: 'Use o FitCore por 30 dias',
    emoji: '🗓️',
    categoria: 'especial',
    condicao: { tipo: 'dias_uso', valor: 30 },
    pontos: 100
  },
  {
    id: 'madrugador',
    nome: 'Madrugador',
    descricao: 'Complete um treino antes das 7h',
    emoji: '🌅',
    categoria: 'especial',
    condicao: { tipo: 'treino_madrugada', valor: 1 },
    pontos: 20
  },
  {
    id: 'noturno',
    nome: 'Coruja Fitness',
    descricao: 'Complete um treino depois das 22h',
    emoji: '🦉',
    categoria: 'especial',
    condicao: { tipo: 'treino_noturno', valor: 1 },
    pontos: 20
  }
]

// Níveis baseados em pontos
export const niveis = [
  { nivel: 1, pontos_minimos: 0, nome: 'Iniciante', emoji: '🌱' },
  { nivel: 2, pontos_minimos: 50, nome: 'Aprendiz', emoji: '🌿' },
  { nivel: 3, pontos_minimos: 150, nome: 'Praticante', emoji: '🌳' },
  { nivel: 4, pontos_minimos: 300, nome: 'Dedicado', emoji: '💪' },
  { nivel: 5, pontos_minimos: 500, nome: 'Experiente', emoji: '🔥' },
  { nivel: 6, pontos_minimos: 750, nome: 'Avançado', emoji: '⚡' },
  { nivel: 7, pontos_minimos: 1000, nome: 'Expert', emoji: '🏆' },
  { nivel: 8, pontos_minimos: 1500, nome: 'Mestre', emoji: '👑' },
  { nivel: 9, pontos_minimos: 2000, nome: 'Lenda', emoji: '🌟' },
  { nivel: 10, pontos_minimos: 3000, nome: 'Imortal', emoji: '💎' }
]

// Função para verificar conquistas
export const verificarConquistas = (dadosUsuario, conquistasDesbloqueadas = []) => {
  const novasConquistas = []
  
  conquistas.forEach(conquista => {
    // Verificar se já foi desbloqueada
    if (conquistasDesbloqueadas.includes(conquista.id)) {
      return
    }
    
    // Verificar condição
    let condicaoAtendida = false
    
    switch (conquista.condicao.tipo) {
      case 'treinos_concluidos':
        condicaoAtendida = dadosUsuario.treinos_concluidos >= conquista.condicao.valor
        break
      case 'sequencia_treinos':
        condicaoAtendida = dadosUsuario.sequencia_treinos_atual >= conquista.condicao.valor
        break
      case 'treinos_mes':
        condicaoAtendida = dadosUsuario.treinos_mes_atual >= conquista.condicao.valor
        break
      case 'evolucao_carga':
        condicaoAtendida = dadosUsuario.maior_evolucao_carga >= conquista.condicao.valor
        break
      case 'refeicoes_concluidas':
        condicaoAtendida = dadosUsuario.refeicoes_concluidas >= conquista.condicao.valor
        break
      case 'refeicoes_dia_completo':
        condicaoAtendida = dadosUsuario.dias_nutricao_completa >= conquista.condicao.valor
        break
      case 'meta_proteina_atingida':
        condicaoAtendida = dadosUsuario.dias_meta_proteina >= conquista.condicao.valor
        break
      case 'sequencia_nutricao_completa':
        condicaoAtendida = dadosUsuario.sequencia_nutricao_atual >= conquista.condicao.valor
        break
      case 'pesagens_registradas':
        condicaoAtendida = dadosUsuario.pesagens_registradas >= conquista.condicao.valor
        break
      case 'perda_peso':
        condicaoAtendida = dadosUsuario.perda_peso_total >= conquista.condicao.valor
        break
      case 'ganho_peso':
        condicaoAtendida = dadosUsuario.ganho_peso_total >= conquista.condicao.valor
        break
      case 'medidas_registradas':
        condicaoAtendida = dadosUsuario.medidas_registradas >= conquista.condicao.valor
        break
      case 'perfil_completo':
        condicaoAtendida = dadosUsuario.perfil_completo === true
        break
      case 'dias_uso':
        condicaoAtendida = dadosUsuario.dias_uso >= conquista.condicao.valor
        break
      case 'treino_madrugada':
        condicaoAtendida = dadosUsuario.treinos_madrugada >= conquista.condicao.valor
        break
      case 'treino_noturno':
        condicaoAtendida = dadosUsuario.treinos_noturnos >= conquista.condicao.valor
        break
    }
    
    if (condicaoAtendida) {
      novasConquistas.push(conquista)
    }
  })
  
  return novasConquistas
}

// Função para calcular nível atual
export const calcularNivel = (pontosTotal) => {
  let nivelAtual = niveis[0]
  
  for (let i = niveis.length - 1; i >= 0; i--) {
    if (pontosTotal >= niveis[i].pontos_minimos) {
      nivelAtual = niveis[i]
      break
    }
  }
  
  return nivelAtual
}

// Função para calcular progresso para próximo nível
export const calcularProgressoNivel = (pontosTotal) => {
  const nivelAtual = calcularNivel(pontosTotal)
  const proximoNivel = niveis.find(n => n.nivel === nivelAtual.nivel + 1)
  
  if (!proximoNivel) {
    return { progresso: 100, pontosRestantes: 0, proximoNivel: null }
  }
  
  const pontosNecessarios = proximoNivel.pontos_minimos - nivelAtual.pontos_minimos
  const pontosProgresso = pontosTotal - nivelAtual.pontos_minimos
  const progresso = Math.round((pontosProgresso / pontosNecessarios) * 100)
  const pontosRestantes = proximoNivel.pontos_minimos - pontosTotal
  
  return { progresso, pontosRestantes, proximoNivel }
}

// Função para obter conquistas por categoria
export const obterConquistasPorCategoria = (categoria) => {
  return conquistas.filter(c => c.categoria === categoria)
}

// Função para calcular estatísticas de conquistas
export const calcularEstatisticasConquistas = (conquistasDesbloqueadas) => {
  const totalConquistas = conquistas.length
  const conquistasObtidas = conquistasDesbloqueadas.length
  const porcentagem = Math.round((conquistasObtidas / totalConquistas) * 100)
  
  const pontosTotais = conquistas
    .filter(c => conquistasDesbloqueadas.includes(c.id))
    .reduce((total, c) => total + c.pontos, 0)
  
  const conquistasPorCategoria = {
    treino: conquistas.filter(c => c.categoria === 'treino' && conquistasDesbloqueadas.includes(c.id)).length,
    nutricao: conquistas.filter(c => c.categoria === 'nutricao' && conquistasDesbloqueadas.includes(c.id)).length,
    progresso: conquistas.filter(c => c.categoria === 'progresso' && conquistasDesbloqueadas.includes(c.id)).length,
    especial: conquistas.filter(c => c.categoria === 'especial' && conquistasDesbloqueadas.includes(c.id)).length
  }
  
  return {
    totalConquistas,
    conquistasObtidas,
    porcentagem,
    pontosTotais,
    conquistasPorCategoria
  }
}


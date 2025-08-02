// Sistema de Exportação de Dados do FitCore System

// Função para exportar dados para PDF
export const exportarParaPDF = (userProfile, dadosProgresso, conquistasDesbloqueadas) => {
  const dadosExportacao = {
    perfil: userProfile,
    progresso: dadosProgresso,
    conquistas: conquistasDesbloqueadas,
    dataExportacao: new Date().toLocaleDateString('pt-BR')
  }
  
  // Simular geração de PDF (em uma implementação real, usaria jsPDF)
  const conteudoPDF = gerarConteudoPDF(dadosExportacao)
  
  // Criar blob e download
  const blob = new Blob([conteudoPDF], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `fitcore-relatorio-${new Date().toISOString().split('T')[0]}.txt`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
  
  return true
}

// Função para exportar dados para CSV
export const exportarParaCSV = (userProfile, dadosProgresso, conquistasDesbloqueadas) => {
  const csvContent = gerarConteudoCSV(userProfile, dadosProgresso, conquistasDesbloqueadas)
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `fitcore-dados-${new Date().toISOString().split('T')[0]}.csv`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
  
  return true
}

// Função para gerar conteúdo do PDF (formato texto)
const gerarConteudoPDF = (dados) => {
  return `
===========================================
        RELATÓRIO FITCORE SYSTEM
===========================================

Data de Exportação: ${dados.dataExportacao}

===========================================
              PERFIL DO USUÁRIO
===========================================

Nome: Usuário FitCore
Sexo: ${dados.perfil.sexo}
Idade: ${dados.perfil.idade} anos
Peso: ${dados.perfil.peso} kg
Altura: ${dados.perfil.altura} cm
IMC: ${dados.perfil.imc}

Objetivo: ${dados.perfil.objetivo}
Experiência: ${dados.perfil.experiencia}
Frequência: ${dados.perfil.frequencia}x por semana

Equipamentos Disponíveis:
${dados.perfil.equipamentos.map(eq => `- ${eq.replace('_', ' ')}`).join('\n')}

${dados.perfil.restricoes ? `Restrições Físicas:\n${dados.perfil.restricoes}` : ''}

===========================================
              PROGRESSO ATUAL
===========================================

Peso Atual: ${dados.progresso?.peso_atual || dados.perfil.peso} kg
Variação: ${dados.progresso?.variacao_peso || 0} kg

Medidas Corporais:
- Bíceps: ${dados.progresso?.biceps || 35} cm
- Cintura: ${dados.progresso?.cintura || 85} cm  
- Coxa: ${dados.progresso?.coxa || 58} cm

Evolução de Cargas:
- Supino: ${dados.progresso?.supino || 50} kg
- Agachamento: ${dados.progresso?.agachamento || 75} kg
- Remada: ${dados.progresso?.remada || 35} kg

Estatísticas de Treino:
- Treinos Concluídos: ${dados.progresso?.treinos_concluidos || 12}
- Sequência Atual: ${dados.progresso?.sequencia_atual || 3} dias
- Treinos Este Mês: ${dados.progresso?.treinos_mes || 8}

Estatísticas de Nutrição:
- Refeições Concluídas: ${dados.progresso?.refeicoes_concluidas || 45}
- Dias com Meta de Proteína: ${dados.progresso?.dias_meta_proteina || 15}
- Média de Calorias/Dia: ${dados.progresso?.media_calorias || 1850} kcal

===========================================
              CONQUISTAS
===========================================

Total de Conquistas: ${dados.conquistas.length}
Pontos Acumulados: ${dados.conquistas.reduce((total, c) => total + (c.pontos || 10), 0)}

Conquistas Desbloqueadas:
${dados.conquistas.map(c => `🏆 ${c.nome || c} - ${c.descricao || 'Conquista desbloqueada'}`).join('\n')}

===========================================
              RECOMENDAÇÕES
===========================================

Baseado no seu perfil e progresso:

1. Continue mantendo a consistência nos treinos
2. Foque em progressão gradual das cargas
3. Mantenha o acompanhamento nutricional
4. Registre medidas corporais semanalmente
5. Hidrate-se adequadamente durante os treinos

===========================================
        Relatório gerado pelo FitCore System
        Sua jornada fitness personalizada
===========================================
`
}

// Função para gerar conteúdo CSV
const gerarConteudoCSV = (userProfile, dadosProgresso, conquistasDesbloqueadas) => {
  const csvLines = []
  
  // Cabeçalho
  csvLines.push('Categoria,Campo,Valor')
  
  // Dados do perfil
  csvLines.push(`Perfil,Sexo,${userProfile.sexo}`)
  csvLines.push(`Perfil,Idade,${userProfile.idade}`)
  csvLines.push(`Perfil,Peso,${userProfile.peso}`)
  csvLines.push(`Perfil,Altura,${userProfile.altura}`)
  csvLines.push(`Perfil,IMC,${userProfile.imc}`)
  csvLines.push(`Perfil,Objetivo,${userProfile.objetivo}`)
  csvLines.push(`Perfil,Experiência,${userProfile.experiencia}`)
  csvLines.push(`Perfil,Frequência,${userProfile.frequencia}`)
  csvLines.push(`Perfil,Equipamentos,"${userProfile.equipamentos.join(', ')}"`)
  
  if (userProfile.restricoes) {
    csvLines.push(`Perfil,Restrições,"${userProfile.restricoes}"`)
  }
  
  // Dados de progresso (simulados)
  csvLines.push(`Progresso,Peso Atual,${dadosProgresso?.peso_atual || userProfile.peso}`)
  csvLines.push(`Progresso,Bíceps,${dadosProgresso?.biceps || 35}`)
  csvLines.push(`Progresso,Cintura,${dadosProgresso?.cintura || 85}`)
  csvLines.push(`Progresso,Coxa,${dadosProgresso?.coxa || 58}`)
  csvLines.push(`Progresso,Supino,${dadosProgresso?.supino || 50}`)
  csvLines.push(`Progresso,Agachamento,${dadosProgresso?.agachamento || 75}`)
  csvLines.push(`Progresso,Remada,${dadosProgresso?.remada || 35}`)
  csvLines.push(`Progresso,Treinos Concluídos,${dadosProgresso?.treinos_concluidos || 12}`)
  csvLines.push(`Progresso,Refeições Concluídas,${dadosProgresso?.refeicoes_concluidas || 45}`)
  
  // Conquistas
  conquistasDesbloqueadas.forEach((conquista, index) => {
    csvLines.push(`Conquista,${index + 1},"${conquista.nome || conquista}"`)
  })
  
  // Data de exportação
  csvLines.push(`Sistema,Data Exportação,${new Date().toLocaleDateString('pt-BR')}`)
  
  return csvLines.join('\n')
}

// Função para gerar relatório de progresso
export const gerarRelatorioProgresso = (userProfile, dadosProgresso) => {
  const relatorio = {
    resumo: {
      objetivo: userProfile.objetivo,
      tempo_uso: dadosProgresso?.dias_uso || 30,
      treinos_concluidos: dadosProgresso?.treinos_concluidos || 12,
      refeicoes_concluidas: dadosProgresso?.refeicoes_concluidas || 45
    },
    evolucao_fisica: {
      peso_inicial: userProfile.peso,
      peso_atual: dadosProgresso?.peso_atual || userProfile.peso,
      variacao_peso: dadosProgresso?.variacao_peso || 0,
      imc_inicial: userProfile.imc,
      imc_atual: dadosProgresso?.imc_atual || userProfile.imc
    },
    evolucao_cargas: {
      supino: {
        inicial: 40,
        atual: dadosProgresso?.supino || 50,
        evolucao: (dadosProgresso?.supino || 50) - 40
      },
      agachamento: {
        inicial: 60,
        atual: dadosProgresso?.agachamento || 75,
        evolucao: (dadosProgresso?.agachamento || 75) - 60
      },
      remada: {
        inicial: 30,
        atual: dadosProgresso?.remada || 35,
        evolucao: (dadosProgresso?.remada || 35) - 30
      }
    },
    medidas_corporais: {
      biceps: {
        inicial: 33,
        atual: dadosProgresso?.biceps || 35,
        evolucao: (dadosProgresso?.biceps || 35) - 33
      },
      cintura: {
        inicial: 88,
        atual: dadosProgresso?.cintura || 85,
        evolucao: (dadosProgresso?.cintura || 85) - 88
      },
      coxa: {
        inicial: 56,
        atual: dadosProgresso?.coxa || 58,
        evolucao: (dadosProgresso?.coxa || 58) - 56
      }
    },
    estatisticas_nutricao: {
      media_calorias_dia: dadosProgresso?.media_calorias || 1850,
      media_proteinas_dia: dadosProgresso?.media_proteinas || 120,
      dias_meta_atingida: dadosProgresso?.dias_meta_proteina || 15,
      percentual_aderencia: Math.round(((dadosProgresso?.dias_meta_proteina || 15) / (dadosProgresso?.dias_uso || 30)) * 100)
    }
  }
  
  return relatorio
}

// Função para compartilhar progresso
export const compartilharProgresso = (userProfile, dadosProgresso) => {
  const textoCompartilhamento = `
🏋️‍♂️ Meu progresso no FitCore System!

💪 Objetivo: ${userProfile.objetivo}
📊 ${dadosProgresso?.treinos_concluidos || 12} treinos concluídos
🥗 ${dadosProgresso?.refeicoes_concluidas || 45} refeições registradas
⚖️ Variação de peso: ${dadosProgresso?.variacao_peso || 0}kg

#FitCore #Fitness #Saúde #Treino #Nutrição
  `.trim()
  
  if (navigator.share) {
    navigator.share({
      title: 'Meu Progresso FitCore',
      text: textoCompartilhamento
    })
  } else {
    // Fallback para copiar para clipboard
    navigator.clipboard.writeText(textoCompartilhamento).then(() => {
      alert('Texto copiado para a área de transferência!')
    })
  }
}

// Função para backup de dados
export const criarBackupDados = (userProfile, dadosProgresso, conquistasDesbloqueadas) => {
  const backup = {
    versao: '1.0',
    data_backup: new Date().toISOString(),
    perfil: userProfile,
    progresso: dadosProgresso,
    conquistas: conquistasDesbloqueadas,
    configuracoes: {
      tema: 'claro',
      notificacoes: true,
      unidade_peso: 'kg',
      unidade_altura: 'cm'
    }
  }
  
  const backupJson = JSON.stringify(backup, null, 2)
  const blob = new Blob([backupJson], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `fitcore-backup-${new Date().toISOString().split('T')[0]}.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
  
  return true
}


import { alimentos, filtrarPorObjetivo, calcularMacros } from '../data/alimentos.js';
import { calcularMetasCaloricas } from './calculosNutricionais.js';

const configNutricional = {
  emagrecer: { proteina_por_kg: 1.8, carboidrato_percentual: 35, gordura_percentual: 30, distribuicao_refeicoes: [0.25, 0.15, 0.35, 0.15, 0.10] },
  ganhar_massa: { proteina_por_kg: 2.0, carboidrato_percentual: 45, gordura_percentual: 25, distribuicao_refeicoes: [0.20, 0.15, 0.30, 0.20, 0.15] },
  definir: { proteina_por_kg: 2.2, carboidrato_percentual: 30, gordura_percentual: 25, distribuicao_refeicoes: [0.25, 0.15, 0.30, 0.20, 0.10] },
  manter: { proteina_por_kg: 1.6, carboidrato_percentual: 40, gordura_percentual: 30, distribuicao_refeicoes: [0.25, 0.15, 0.30, 0.15, 0.15] }
};

const estruturaRefeicoes = {
  cafe_manha: { nome: 'Café da Manhã', emoji: '🌅', categorias: ['proteina', 'carboidrato', 'fruta'] },
  almoco: { nome: 'Almoço', emoji: '🍽️', categorias: ['proteina', 'carboidrato', 'vegetal', 'gordura'] },
  lanche_tarde: { nome: 'Lanche da Tarde', emoji: '🥜', categorias: ['proteina', 'gordura'] },
  jantar: { nome: 'Jantar', emoji: '🌙', categorias: ['proteina', 'carboidrato', 'vegetal'] },
};

const configsPorEstilo = {
  equilibrado: { nome: "Equilibrado", descricao: "Uma dieta balanceada com proporções clássicas de macronutrientes.", modificador: {} },
  low_carb: { nome: "Low Carb", descricao: "Foco em proteínas e gorduras, com carboidratos de baixo índice glicêmico.", modificador: { carboidrato_percentual: 20, gordura_percentual: 45, } },
  rico_em_proteina: { nome: "Rico em Proteína", descricao: "Aumenta a ingestão de proteínas para maior saciedade e suporte muscular.", modificador: { proteina_por_kg: 2.2, } },
  vegetariano: { nome: "Vegetariano", descricao: "Um plano sem carnes ou peixes, com fontes de proteína vegetal.", modificador: {} }
};

const distribuicaoMacrosPorRefeicao = {
  cafe_manha:    { proteinas: 0.25, carboidratos: 0.30, gorduras: 0.15 },
  almoco:        { proteinas: 0.40, carboidratos: 0.40, gorduras: 0.35 },
  lanche_tarde:  { proteinas: 0.10, carboidratos: 0.10, gorduras: 0.30 },
  jantar:        { proteinas: 0.25, carboidratos: 0.20, gorduras: 0.20 },
};

const calcularMetasNutricionais = (userProfile, configBase, modificadorEstilo) => {
  const config = { ...configBase, ...modificadorEstilo };
  const calorias_total = calcularMetasCaloricas(userProfile);
  const proteinas_total = Math.round(userProfile.peso * config.proteina_por_kg);
  const calorias_proteinas = proteinas_total * 4;
  const calorias_restantes = calorias_total - calorias_proteinas;
  const total_percentual = config.carboidrato_percentual + config.gordura_percentual;
  const percentual_carbo = config.carboidrato_percentual / total_percentual;
  const calorias_carboidratos = calorias_restantes * percentual_carbo;
  const calorias_gorduras = calorias_restantes * (1 - percentual_carbo);
  const carboidratos_total = Math.round(calorias_carboidratos / 4);
  const gorduras_total = Math.round(calorias_gorduras / 9);
  return { calorias_total, proteinas_total, carboidratos_total, gorduras_total };
};

const gerarRefeicao = (estrutura, metasMacros, alimentosDisponiveis, alimentosJaUsados) => {
  const refeicao = { nome: estrutura.nome, emoji: estrutura.emoji, alimentos: [] };
  const metasRestantes = { ...metasMacros };
  const ordemDePreenchimento = ['proteina', 'carboidrato', 'gordura', 'vegetal', 'fruta'];

  ordemDePreenchimento.forEach(categoria => {
    if (estrutura.categorias.includes(categoria)) {
      const metaCategoriaGrams = metasRestantes[categoria + 's'] || 0;
      if (metaCategoriaGrams <= 5 && !['vegetal', 'fruta'].includes(categoria)) return;
      
      const alimentosCategoria = alimentosDisponiveis.filter(a => a.categoria === categoria && !alimentosJaUsados.has(a.id));
      if (alimentosCategoria.length > 0) {
        const alimentoEscolhido = alimentosCategoria[Math.floor(Math.random() * alimentosCategoria.length)];
        alimentosJaUsados.add(alimentoEscolhido.id);
        let quantidade = 100;
        if (categoria === 'proteina' || categoria === 'carboidrato' || categoria === 'gordura') {
          const macroNoAlimento = alimentoEscolhido.macros_100g[categoria + 's'];
          if (macroNoAlimento > 0) {
            quantidade = (metaCategoriaGrams / macroNoAlimento) * 100;
          }
        } else {
            quantidade = alimentoEscolhido.porcao_padrao;
        }
        quantidade = Math.max(Math.round(quantidade / 5) * 5, 20);
        const macrosConsumidos = calcularMacros(alimentoEscolhido, quantidade);
        refeicao.alimentos.push({ ...alimentoEscolhido, quantidade, macros: macrosConsumidos });
        metasRestantes.proteinas -= macrosConsumidos.proteinas;
        metasRestantes.carboidratos -= macrosConsumidos.carboidratos;
        metasRestantes.gorduras -= macrosConsumidos.gorduras;
      }
    }
  });
  return refeicao;
};

const recalcularResumoCardapio = (cardapio) => {
    const resumo = { calorias_total: 0, proteinas_total: 0, carboidratos_total: 0, gorduras_total: 0 };
    Object.values(cardapio.refeicoes).forEach(refeicao => { refeicao.alimentos.forEach(item => { resumo.calorias_total += item.macros.calorias; resumo.proteinas_total += item.macros.proteinas; resumo.carboidratos_total += item.macros.carboidratos; resumo.gorduras_total += item.macros.gorduras; }); });
    Object.keys(resumo).forEach(key => resumo[key] = Math.round(resumo[key]));
    return resumo;
};

export const gerarCardapio = (userProfile, estilo) => {
  const configBase = configNutricional[userProfile.objetivo];
  const estiloConfig = configsPorEstilo[estilo];
  if (!configBase || !estiloConfig) return null;

  const metasDiarias = calcularMetasNutricionais(userProfile, configBase, estiloConfig.modificador);
  const cardapio = {
    nome: estiloConfig.nome,
    descricao: estiloConfig.descricao,
    objetivo: userProfile.objetivo,
    metas: metasDiarias,
    refeicoes: {},
    resumo: {}
  };

  let alimentosDisponiveis = filtrarPorObjetivo(userProfile.objetivo);
  if (estilo === 'vegetariano') {
    alimentosDisponiveis = alimentosDisponiveis.filter(a => !a.tags.includes('carne_branca') && !a.tags.includes('carne_vermelha') && !a.tags.includes('peixe'));
  }
  
  const alimentosJaUsados = new Set();

  Object.keys(estruturaRefeicoes).forEach((refeicaoId) => {
    const refeicaoEstrutura = estruturaRefeicoes[refeicaoId];
    const distribuicao = distribuicaoMacrosPorRefeicao[refeicaoId];
    const metasMacrosRefeicao = {
        proteinas: metasDiarias.proteinas_total * distribuicao.proteinas,
        carboidratos: metasDiarias.carboidratos_total * distribuicao.carboidratos,
        gorduras: metasDiarias.gorduras_total * distribuicao.gorduras,
    };
    cardapio.refeicoes[refeicaoId] = gerarRefeicao(refeicaoEstrutura, metasMacrosRefeicao, alimentosDisponiveis, alimentosJaUsados);
  });
  
  // Etapa de Validação para garantir que não há refeições vazias
  Object.keys(cardapio.refeicoes).forEach(refeicaoId => {
    const refeicao = cardapio.refeicoes[refeicaoId];
    if (!refeicao || !refeicao.alimentos || refeicao.alimentos.length === 0) {
      delete cardapio.refeicoes[refeicaoId];
    }
  });

  cardapio.resumo = recalcularResumoCardapio(cardapio);
  return cardapio;
};

export const sugerirSubstituicoes = (alimento, objetivo) => {
  const alimentosFiltrados = filtrarPorObjetivo(objetivo);
  const alimentosCategoria = alimentosFiltrados.filter(a => a.categoria === alimento.categoria && a.id !== alimento.id);
  return alimentosCategoria.slice(0, 3);
};

export const substituirAlimentoProporcional = (cardapio, refeicaoId, idAlimentoOriginal, novoAlimento) => {
  const cardapioAtualizado = JSON.parse(JSON.stringify(cardapio));
  const refeicao = cardapioAtualizado.refeicoes[refeicaoId];
  const indiceAlimento = refeicao.alimentos.findIndex(a => a.id === idAlimentoOriginal);
  if (indiceAlimento === -1) {
    console.error("Alimento original não encontrado.");
    return cardapio;
  }
  const alimentoOriginal = refeicao.alimentos[indiceAlimento];
  const categoria = alimentoOriginal.categoria;
  const macroPrincipal = categoria === 'gordura' ? 'gorduras' : categoria + 's';

  if (!alimentoOriginal.macros_100g[macroPrincipal] === undefined || !novoAlimento.macros_100g[macroPrincipal] === undefined || novoAlimento.macros_100g[macroPrincipal] === 0) {
    console.error(`Erro ao calcular proporção: macronutriente inválido ('${macroPrincipal}')`);
    return cardapio;
  }
  const macroGramasOriginal = (alimentoOriginal.quantidade / 100) * alimentoOriginal.macros_100g[macroPrincipal];
  let novaQuantidade = (macroGramasOriginal / novoAlimento.macros_100g[macroPrincipal]) * 100;
  novaQuantidade = Math.max(Math.round(novaQuantidade / 5) * 5, 5);
  const alimentoSubstituto = { ...novoAlimento, quantidade: novaQuantidade, macros: calcularMacros(novoAlimento, novaQuantidade) };
  refeicao.alimentos.splice(indiceAlimento, 1, alimentoSubstituto);
  cardapioAtualizado.resumo = recalcularResumoCardapio(cardapioAtualizado);
  return cardapioAtualizado;
};

export const adicionarAlimentoNaRefeicao = (cardapio, refeicaoId, alimento, quantidade) => {
  const cardapioAtualizado = JSON.parse(JSON.stringify(cardapio));
  const refeicao = cardapioAtualizado.refeicoes[refeicaoId];
  if (!refeicao) {
    console.error("Refeição não encontrada:", refeicaoId);
    return cardapio;
  }
  const macros = calcularMacros(alimento, quantidade);
  const novoItem = { ...alimento, quantidade, macros };
  refeicao.alimentos.push(novoItem);
  cardapioAtualizado.resumo = recalcularResumoCardapio(cardapioAtualizado);
  return cardapioAtualizado;
};
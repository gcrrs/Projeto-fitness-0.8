// Fatores de atividade baseados na frequência de treino semanal
const fatoresAtividade = {
  1: 1.2,    // Sedentário / Treino Leve 1x
  2: 1.375,  // Exercício Leve 2x
  3: 1.45,   // Exercício Moderado 3x
  4: 1.55,   // Exercício Moderado 4x
  5: 1.65,   // Exercício Intenso 5x
  6: 1.725,  // Exercício Intenso 6x
  7: 1.9,    // Exercício Muito Intenso / Atleta
};

// Ajuste de calorias com base no objetivo
const ajustesObjetivo = {
  emagrecer: -400, // Déficit calórico para perda de peso
  manter: 0,
  ganhar_massa: 400, // Superávit calórico para ganho de massa
  definir: -250,   // Leve déficit para definição
};

/**
 * Calcula a Taxa Metabólica Basal (TMB) usando a fórmula de Mifflin-St Jeor.
 * @param {object} perfil - O perfil do usuário com sexo, peso, altura, idade.
 * @returns {number} O valor da TMB em kcal.
 */
const calcularTMB = ({ sexo, peso, altura, idade }) => {
  if (sexo === 'masculino') {
    // Fórmula para homens
    return 10 * peso + 6.25 * altura - 5 * idade + 5;
  } else {
    // Fórmula para mulheres
    return 10 * peso + 6.25 * altura - 5 * idade - 161;
  }
};

/**
 * Calcula as metas calóricas diárias totais (TDEE) ajustadas para o objetivo.
 * @param {object} userProfile - O perfil completo do usuário.
 * @returns {number} A meta final de calorias diárias.
 */
export const calcularMetasCaloricas = (userProfile) => {
  // 1. Calcula a Taxa Metabólica Basal (TMB)
  const tmb = calcularTMB(userProfile);

  // 2. Encontra o fator de atividade com base na frequência de treinos
  const fatorAtividade = fatoresAtividade[userProfile.frequencia] || 1.45; // Padrão de 3x/semana

  // 3. Calcula o gasto calórico total diário (TDEE) para manutenção
  const tdee = tmb * fatorAtividade;

  // 4. Aplica o ajuste com base no objetivo do usuário (emagrecer, ganhar, etc.)
  const ajuste = ajustesObjetivo[userProfile.objetivo] || 0;

  // 5. Retorna a meta final de calorias, arredondada
  const metaFinal = Math.round((tdee + ajuste) / 10) * 10; // Arredonda para o múltiplo de 10 mais próximo

  return metaFinal;
};
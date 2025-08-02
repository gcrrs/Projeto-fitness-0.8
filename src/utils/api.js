// Função para buscar alimentos (já existente)
export const buscarAlimentoPorNome = async (nomeDoAlimento) => {
  const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(nomeDoAlimento)}&search_simple=1&action=process&json=1&page_size=10`;
  try {
    const resposta = await fetch(url);
    if (!resposta.ok) throw new Error(`Erro de rede: ${resposta.statusText}`);
    const dados = await resposta.json();
    if (dados.products && dados.products.length > 0) {
      return dados.products.map(produto => {
        const nome = produto.product_name_pt || produto.product_name;
        if (!nome) return null;
        return { id: produto.code, nome, categoria: 'importado', calorias_100g: Number(produto.nutriments.energy_kcal_100g) || 0, macros_100g: { proteinas: Number(produto.nutriments.proteins_100g) || 0, carboidratos: Number(produto.nutriments.carbohydrates_100g) || 0, gorduras: Number(produto.nutriments.fat_100g) || 0 }, porcao_padrao: 100, objetivos_recomendados: ['emagrecer', 'ganhar_massa', 'manter', 'definir'], tags: [] };
      }).filter(p => p !== null);
    }
    return [];
  } catch (error) {
    console.error("Erro ao buscar dados da API de Alimentos:", error);
    return [];
  }
};

// Função para buscar exercícios
export const buscarExerciciosPorMusculo = async (musculo) => {
  // SUA CHAVE DE API FOI INSERIDA AQUI:
  const apiKey = 'kfu3ryh3sXzF7zG9ZsSx8A==Owm7rjF41W3EuefD'; 
  const url = `https://api.api-ninjas.com/v1/exercises?muscle=${musculo}`;

  try {
    const resposta = await fetch(url, { headers: { 'X-Api-Key': apiKey } });
    if (!resposta.ok) {
      throw new Error(`Erro de rede: ${resposta.status} ${resposta.statusText}`);
    }
    const dados = await resposta.json();
    return dados.map(ex => ({
      id: ex.name.toLowerCase().replace(/ /g, '_'),
      nome: ex.name,
      tipo: 'força',
      musculo_principal: ex.muscle,
      musculos_secundarios: [],
      equipamento: ex.equipment.replace(/ /g, '_'),
      dificuldade: ex.difficulty,
      instrucoes: ex.instructions.split('. ').filter(frase => frase.length > 1), // Filtra frases vazias
    }));
  } catch (error) {
    console.error("Erro ao buscar exercícios na API:", error);
    return [];
  }
};
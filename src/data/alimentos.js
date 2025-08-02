// Arquivo: src/data/alimentos.js

export const alimentos = [
  // =======================================================================
  // --- PROTEÍNAS ---
  // =======================================================================
  {
    id: 'ovo_cozido',
    nome: 'Ovo Cozido',
    categoria: 'proteina',
    calorias_100g: 155,
    macros_100g: { proteinas: 13, carboidratos: 1.1, gorduras: 11 },
    porcao_padrao: 100, // ~2 ovos
    objetivos_recomendados: ['emagrecer', 'ganhar_massa', 'manter', 'definir'],
    tags: ['low_carb_ok', 'rico_em_proteina', 'vegetariano']
  },
  {
    id: 'frango_grelhado',
    nome: 'Peito de Frango Grelhado',
    categoria: 'proteina',
    calorias_100g: 165,
    macros_100g: { proteinas: 31, carboidratos: 0, gorduras: 3.6 },
    porcao_padrao: 150,
    objetivos_recomendados: ['emagrecer', 'ganhar_massa', 'manter', 'definir'],
    tags: ['low_carb_ok', 'rico_em_proteina', 'carne_branca']
  },
  {
    id: 'tilapia_grelhada',
    nome: 'Filé de Tilápia Grelhado',
    categoria: 'proteina',
    calorias_100g: 128,
    macros_100g: { proteinas: 26, carboidratos: 0, gorduras: 2.6 },
    porcao_padrao: 150,
    objetivos_recomendados: ['emagrecer', 'ganhar_massa', 'manter', 'definir'],
    tags: ['low_carb_ok', 'rico_em_proteina', 'peixe']
  },
  {
    id: 'salmao_grelhado',
    nome: 'Salmão Grelhado',
    categoria: 'proteina',
    calorias_100g: 208,
    macros_100g: { proteinas: 20, carboidratos: 0, gorduras: 13 },
    porcao_padrao: 150,
    objetivos_recomendados: ['emagrecer', 'ganhar_massa', 'manter', 'definir'],
    tags: ['low_carb_ok', 'rico_em_proteina', 'gordura_boa', 'peixe']
  },
  {
    id: 'carne_moida_patinho',
    nome: 'Carne Moída (Patinho 90/10)',
    categoria: 'proteina',
    calorias_100g: 185,
    macros_100g: { proteinas: 21, carboidratos: 0, gorduras: 10 },
    porcao_padrao: 120,
    objetivos_recomendados: ['ganhar_massa', 'manter', 'definir'],
    tags: ['low_carb_ok', 'rico_em_proteina', 'carne_vermelha']
  },
  {
    id: 'bife_alcatra',
    nome: 'Bife de Alcatra Grelhado',
    categoria: 'proteina',
    calorias_100g: 200,
    macros_100g: { proteinas: 31, carboidratos: 0, gorduras: 8 },
    porcao_padrao: 120,
    objetivos_recomendados: ['ganhar_massa', 'manter', 'definir'],
    tags: ['low_carb_ok', 'rico_em_proteina', 'carne_vermelha']
  },
  {
    id: 'lombo_porco',
    nome: 'Lombo de Porco Assado',
    categoria: 'proteina',
    calorias_100g: 143,
    macros_100g: { proteinas: 26, carboidratos: 0, gorduras: 3.5 },
    porcao_padrao: 150,
    objetivos_recomendados: ['emagrecer', 'ganhar_massa', 'manter', 'definir'],
    tags: ['low_carb_ok', 'rico_em_proteina', 'carne_branca']
  },
  {
    id: 'atum_lata_agua',
    nome: 'Atum em Lata (em água)',
    categoria: 'proteina',
    calorias_100g: 116,
    macros_100g: { proteinas: 26, carboidratos: 0, gorduras: 1 },
    porcao_padrao: 80,
    objetivos_recomendados: ['emagrecer', 'manter', 'definir'],
    tags: ['low_carb_ok', 'rico_em_proteina', 'peixe']
  },
  {
    id: 'queijo_cottage',
    nome: 'Queijo Cottage',
    categoria: 'proteina',
    calorias_100g: 98,
    macros_100g: { proteinas: 11, carboidratos: 3.4, gorduras: 4.3 },
    porcao_padrao: 100,
    objetivos_recomendados: ['emagrecer', 'manter', 'definir'],
    tags: ['low_carb_ok', 'rico_em_proteina', 'vegetariano', 'laticinio']
  },
  {
    id: 'iogurte_grego_natural',
    nome: 'Iogurte Grego Natural (sem açúcar)',
    categoria: 'proteina',
    calorias_100g: 59,
    macros_100g: { proteinas: 10, carboidratos: 3.6, gorduras: 0.4 },
    porcao_padrao: 150,
    objetivos_recomendados: ['emagrecer', 'manter', 'definir'],
    tags: ['low_carb_ok', 'rico_em_proteina', 'vegetariano', 'laticinio']
  },
  {
    id: 'whey_protein',
    nome: 'Whey Protein (Pó)',
    categoria: 'proteina',
    calorias_100g: 400,
    macros_100g: { proteinas: 80, carboidratos: 8, gorduras: 5 },
    porcao_padrao: 30,
    objetivos_recomendados: ['emagrecer', 'ganhar_massa', 'manter', 'definir'],
    tags: ['suplemento', 'rico_em_proteina', 'vegetariano']
  },
  {
    id: 'peito_peru',
    nome: 'Peito de Peru Fatiado',
    categoria: 'proteina',
    calorias_100g: 135,
    macros_100g: { proteinas: 29, carboidratos: 1, gorduras: 1 },
    porcao_padrao: 50,
    objetivos_recomendados: ['emagrecer', 'manter', 'definir'],
    tags: ['low_carb_ok', 'rico_em_proteina', 'carne_branca', 'processado']
  },

  // =======================================================================
  // --- PROTEÍNAS VEGETAIS E LEGUMINOSAS ---
  // =======================================================================
  {
    id: 'tofu',
    nome: 'Tofu',
    categoria: 'proteina',
    calorias_100g: 76,
    macros_100g: { proteinas: 8, carboidratos: 1.9, gorduras: 4.8 },
    porcao_padrao: 150,
    objetivos_recomendados: ['emagrecer', 'ganhar_massa', 'manter', 'definir'],
    tags: ['low_carb_ok', 'vegetariano', 'vegano']
  },
  {
    id: 'lentilha_cozida',
    nome: 'Lentilha Cozida',
    categoria: 'proteina',
    calorias_100g: 116,
    macros_100g: { proteinas: 9, carboidratos: 20, gorduras: 0.4 },
    porcao_padrao: 150,
    objetivos_recomendados: ['emagrecer', 'ganhar_massa', 'manter', 'definir'],
    tags: ['rico_em_fibras', 'vegetariano', 'vegano', 'leguminosa']
  },
  {
    id: 'feijao_carioca',
    nome: 'Feijão Carioca Cozido',
    categoria: 'proteina',
    calorias_100g: 76,
    macros_100g: { proteinas: 5, carboidratos: 14, gorduras: 0.5 },
    porcao_padrao: 150,
    objetivos_recomendados: ['emagrecer', 'ganhar_massa', 'manter', 'definir'],
    tags: ['rico_em_fibras', 'vegano', 'vegetariano', 'leguminosa']
  },
  {
    id: 'grao_de_bico',
    nome: 'Grão-de-Bico Cozido',
    categoria: 'proteina',
    calorias_100g: 139,
    macros_100g: { proteinas: 8.4, carboidratos: 27, gorduras: 2.1 },
    porcao_padrao: 150,
    objetivos_recomendados: ['emagrecer', 'ganhar_massa', 'manter', 'definir'],
    tags: ['rico_em_fibras', 'vegano', 'vegetariano', 'leguminosa']
  },

  // =======================================================================
  // --- CARBOIDRATOS ---
  // =======================================================================
  {
    id: 'arroz_branco',
    nome: 'Arroz Branco',
    categoria: 'carboidrato',
    calorias_100g: 130,
    macros_100g: { proteinas: 2.7, carboidratos: 28, gorduras: 0.3 },
    porcao_padrao: 150,
    objetivos_recomendados: ['ganhar_massa', 'manter'],
    tags: ['alto_carboidrato', 'vegano', 'vegetariano', 'sem_gluten']
  },
  {
    id: 'arroz_integral',
    nome: 'Arroz Integral',
    categoria: 'carboidrato',
    calorias_100g: 111,
    macros_100g: { proteinas: 2.6, carboidratos: 23, gorduras: 0.9 },
    porcao_padrao: 150,
    objetivos_recomendados: ['emagrecer', 'ganhar_massa', 'manter', 'definir'],
    tags: ['rico_em_fibras', 'vegano', 'vegetariano', 'sem_gluten']
  },
  {
    id: 'batata_doce',
    nome: 'Batata Doce Cozida',
    categoria: 'carboidrato',
    calorias_100g: 86,
    macros_100g: { proteinas: 1.6, carboidratos: 20, gorduras: 0.1 },
    porcao_padrao: 200,
    objetivos_recomendados: ['emagrecer', 'ganhar_massa', 'manter', 'definir'],
    tags: ['low_carb_ok', 'vegano', 'vegetariano', 'sem_gluten', 'raiz']
  },
  {
    id: 'batata_inglesa',
    nome: 'Batata Inglesa Cozida',
    categoria: 'carboidrato',
    calorias_100g: 77,
    macros_100g: { proteinas: 2, carboidratos: 17, gorduras: 0.1 },
    porcao_padrao: 200,
    objetivos_recomendados: ['emagrecer', 'ganhar_massa', 'manter', 'definir'],
    tags: ['vegano', 'vegetariano', 'sem_gluten', 'raiz']
  },
  {
    id: 'mandioca_cozida',
    nome: 'Mandioca (Aipim) Cozida',
    categoria: 'carboidrato',
    calorias_100g: 125,
    macros_100g: { proteinas: 0.6, carboidratos: 30, gorduras: 0.3 },
    porcao_padrao: 150,
    objetivos_recomendados: ['ganhar_massa', 'manter'],
    tags: ['alto_carboidrato', 'vegano', 'vegetariano', 'sem_gluten', 'raiz']
  },
  {
    id: 'macarrao_integral',
    nome: 'Macarrão Integral Cozido',
    categoria: 'carboidrato',
    calorias_100g: 124,
    macros_100g: { proteinas: 5, carboidratos: 26, gorduras: 0.8 },
    porcao_padrao: 150,
    objetivos_recomendados: ['ganhar_massa', 'manter', 'definir'],
    tags: ['rico_em_fibras', 'vegano', 'vegetariano']
  },
  {
    id: 'pao_integral',
    nome: 'Pão Integral',
    categoria: 'carboidrato',
    calorias_100g: 250,
    macros_100g: { proteinas: 13, carboidratos: 41, gorduras: 4 },
    porcao_padrao: 50, // 2 fatias
    objetivos_recomendados: ['ganhar_massa', 'manter', 'definir'],
    tags: ['rico_em_fibras', 'vegetariano']
  },
  {
    id: 'aveia_flocos',
    nome: 'Aveia em Flocos',
    categoria: 'carboidrato',
    calorias_100g: 389,
    macros_100g: { proteinas: 17, carboidratos: 66, gorduras: 7 },
    porcao_padrao: 40,
    objetivos_recomendados: ['emagrecer', 'ganhar_massa', 'manter', 'definir'],
    tags: ['rico_em_fibras', 'vegano', 'vegetariano']
  },
  {
    id: 'quinoa_cozida',
    nome: 'Quinoa Cozida',
    categoria: 'carboidrato',
    calorias_100g: 120,
    macros_100g: { proteinas: 4.4, carboidratos: 21, gorduras: 1.9 },
    porcao_padrao: 150,
    objetivos_recomendados: ['emagrecer', 'manter', 'definir'],
    tags: ['rico_em_proteina', 'rico_em_fibras', 'vegano', 'vegetariano', 'sem_gluten']
  },
  {
    id: 'tapioca',
    nome: 'Tapioca (goma hidratada)',
    categoria: 'carboidrato',
    calorias_100g: 240,
    macros_100g: { proteinas: 0, carboidratos: 60, gorduras: 0 },
    porcao_padrao: 50,
    objetivos_recomendados: ['ganhar_massa', 'manter'],
    tags: ['alto_carboidrato', 'vegano', 'vegetariano', 'sem_gluten']
  },
  {
    id: 'cuscuz_milho',
    nome: 'Cuscuz de Milho',
    categoria: 'carboidrato',
    calorias_100g: 112,
    macros_100g: { proteinas: 3.5, carboidratos: 24, gorduras: 0.5 },
    porcao_padrao: 150,
    objetivos_recomendados: ['ganhar_massa', 'manter'],
    tags: ['alto_carboidrato', 'vegano', 'vegetariano', 'sem_gluten']
  },

  // =======================================================================
  // --- GORDURAS SAUDÁVEIS ---
  // =======================================================================
  {
    id: 'abacate',
    nome: 'Abacate',
    categoria: 'gordura',
    calorias_100g: 160,
    macros_100g: { proteinas: 2, carboidratos: 9, gorduras: 15 },
    porcao_padrao: 50,
    objetivos_recomendados: ['emagrecer', 'ganhar_massa', 'manter', 'definir'],
    tags: ['low_carb_ok', 'gordura_boa', 'vegano', 'vegetariano']
  },
  {
    id: 'azeite_oliva',
    nome: 'Azeite de Oliva Extra Virgem',
    categoria: 'gordura',
    calorias_100g: 884,
    macros_100g: { proteinas: 0, carboidratos: 0, gorduras: 100 },
    porcao_padrao: 10, // 1 colher de sopa
    objetivos_recomendados: ['emagrecer', 'ganhar_massa', 'manter', 'definir'],
    tags: ['low_carb_ok', 'gordura_boa', 'vegano', 'vegetariano']
  },
  {
    id: 'castanha_para',
    nome: 'Castanha-do-Pará',
    categoria: 'gordura',
    calorias_100g: 656,
    macros_100g: { proteinas: 14, carboidratos: 12, gorduras: 66 },
    porcao_padrao: 30,
    objetivos_recomendados: ['emagrecer', 'ganhar_massa', 'manter', 'definir'],
    tags: ['low_carb_ok', 'gordura_boa', 'vegano', 'vegetariano']
  },
  {
    id: 'amendoas',
    nome: 'Amêndoas',
    categoria: 'gordura',
    calorias_100g: 579,
    macros_100g: { proteinas: 21, carboidratos: 22, gorduras: 49 },
    porcao_padrao: 30,
    objetivos_recomendados: ['emagrecer', 'ganhar_massa', 'manter', 'definir'],
    tags: ['low_carb_ok', 'gordura_boa', 'vegano', 'vegetariano']
  },
  {
    id: 'pasta_amendoim',
    nome: 'Pasta de Amendoim Integral',
    categoria: 'gordura',
    calorias_100g: 588,
    macros_100g: { proteinas: 25, carboidratos: 20, gorduras: 50 },
    porcao_padrao: 30,
    objetivos_recomendados: ['ganhar_massa', 'manter'],
    tags: ['rico_em_proteina', 'gordura_boa', 'vegano', 'vegetariano']
  },
  {
    id: 'semente_chia',
    nome: 'Semente de Chia',
    categoria: 'gordura',
    calorias_100g: 486,
    macros_100g: { proteinas: 17, carboidratos: 42, gorduras: 31 },
    porcao_padrao: 15,
    objetivos_recomendados: ['emagrecer', 'manter', 'definir'],
    tags: ['gordura_boa', 'rico_em_fibras', 'vegano', 'vegetariano']
  },

  // =======================================================================
  // --- VEGETAIS E LEGUMES ---
  // =======================================================================
  {
    id: 'brocolis',
    nome: 'Brócolis Cozido',
    categoria: 'vegetal',
    calorias_100g: 35,
    macros_100g: { proteinas: 2.4, carboidratos: 7, gorduras: 0.4 },
    porcao_padrao: 150,
    objetivos_recomendados: ['emagrecer', 'ganhar_massa', 'manter', 'definir'],
    tags: ['low_carb_ok', 'vegano', 'vegetariano', 'folhoso']
  },
  {
    id: 'espinafre',
    nome: 'Espinafre Cozido',
    categoria: 'vegetal',
    calorias_100g: 23,
    macros_100g: { proteinas: 3, carboidratos: 3.6, gorduras: 0.3 },
    porcao_padrao: 150,
    objetivos_recomendados: ['emagrecer', 'ganhar_massa', 'manter', 'definir'],
    tags: ['low_carb_ok', 'vegano', 'vegetariano', 'folhoso']
  },
  {
    id: 'couve',
    nome: 'Couve Refogada',
    categoria: 'vegetal',
    calorias_100g: 32,
    macros_100g: { proteinas: 3, carboidratos: 6, gorduras: 0.5 },
    porcao_padrao: 100,
    objetivos_recomendados: ['emagrecer', 'manter', 'definir'],
    tags: ['low_carb_ok', 'vegano', 'vegetariano', 'folhoso']
  },
  {
    id: 'alface',
    nome: 'Alface',
    categoria: 'vegetal',
    calorias_100g: 15,
    macros_100g: { proteinas: 1.4, carboidratos: 2.9, gorduras: 0.2 },
    porcao_padrao: 100,
    objetivos_recomendados: ['emagrecer', 'manter', 'definir'],
    tags: ['low_carb_ok', 'vegano', 'vegetariano', 'folhoso']
  },
  {
    id: 'tomate',
    nome: 'Tomate',
    categoria: 'vegetal',
    calorias_100g: 18,
    macros_100g: { proteinas: 0.9, carboidratos: 3.9, gorduras: 0.2 },
    porcao_padrao: 100,
    objetivos_recomendados: ['emagrecer', 'manter', 'definir'],
    tags: ['low_carb_ok', 'vegano', 'vegetariano']
  },
  {
    id: 'cebola',
    nome: 'Cebola',
    categoria: 'vegetal',
    calorias_100g: 40,
    macros_100g: { proteinas: 1.1, carboidratos: 9, gorduras: 0.1 },
    porcao_padrao: 30,
    objetivos_recomendados: ['emagrecer', 'ganhar_massa', 'manter', 'definir'],
    tags: ['low_carb_ok', 'vegano', 'vegetariano']
  },
  {
    id: 'pimentao',
    nome: 'Pimentão',
    categoria: 'vegetal',
    calorias_100g: 20,
    macros_100g: { proteinas: 1, carboidratos: 4.6, gorduras: 0.2 },
    porcao_padrao: 100,
    objetivos_recomendados: ['emagrecer', 'manter', 'definir'],
    tags: ['low_carb_ok', 'vegano', 'vegetariano']
  },
  {
    id: 'abobrinha',
    nome: 'Abobrinha Refogada',
    categoria: 'vegetal',
    calorias_100g: 17,
    macros_100g: { proteinas: 1.2, carboidratos: 3.1, gorduras: 0.3 },
    porcao_padrao: 150,
    objetivos_recomendados: ['emagrecer', 'manter', 'definir'],
    tags: ['low_carb_ok', 'vegano', 'vegetariano']
  },
  {
    id: 'berinjela',
    nome: 'Berinjela Grelhada',
    categoria: 'vegetal',
    calorias_100g: 25,
    macros_100g: { proteinas: 1, carboidratos: 6, gorduras: 0.2 },
    porcao_padrao: 150,
    objetivos_recomendados: ['emagrecer', 'manter', 'definir'],
    tags: ['low_carb_ok', 'vegano', 'vegetariano']
  },
  {
    id: 'cenoura',
    nome: 'Cenoura Crua',
    categoria: 'vegetal',
    calorias_100g: 41,
    macros_100g: { proteinas: 0.9, carboidratos: 10, gorduras: 0.2 },
    porcao_padrao: 100,
    objetivos_recomendados: ['emagrecer', 'manter', 'definir'],
    tags: ['vegano', 'vegetariano']
  },
  {
    id: 'beterraba',
    nome: 'Beterraba Cozida',
    categoria: 'vegetal',
    calorias_100g: 44,
    macros_100g: { proteinas: 1.7, carboidratos: 10, gorduras: 0.2 },
    porcao_padrao: 100,
    objetivos_recomendados: ['emagrecer', 'manter', 'definir'],
    tags: ['vegano', 'vegetariano']
  },

  // =======================================================================
  // --- FRUTAS ---
  // =======================================================================
  {
    id: 'banana',
    nome: 'Banana',
    categoria: 'fruta',
    calorias_100g: 89,
    macros_100g: { proteinas: 1.1, carboidratos: 23, gorduras: 0.3 },
    porcao_padrao: 120, // 1 média
    objetivos_recomendados: ['ganhar_massa', 'manter'],
    tags: ['alto_carboidrato', 'vegano', 'vegetariano']
  },
  {
    id: 'maca',
    nome: 'Maçã',
    categoria: 'fruta',
    calorias_100g: 52,
    macros_100g: { proteinas: 0.3, carboidratos: 14, gorduras: 0.2 },
    porcao_padrao: 150, // 1 média
    objetivos_recomendados: ['emagrecer', 'manter', 'definir'],
    tags: ['rico_em_fibras', 'vegano', 'vegetariano']
  },
  {
    id: 'morango',
    nome: 'Morango',
    categoria: 'fruta',
    calorias_100g: 32,
    macros_100g: { proteinas: 0.7, carboidratos: 8, gorduras: 0.3 },
    porcao_padrao: 150,
    objetivos_recomendados: ['emagrecer', 'manter', 'definir'],
    tags: ['low_carb_ok', 'vegano', 'vegetariano']
  },
  {
    id: 'laranja',
    nome: 'Laranja',
    categoria: 'fruta',
    calorias_100g: 47,
    macros_100g: { proteinas: 0.9, carboidratos: 12, gorduras: 0.1 },
    porcao_padrao: 180,
    objetivos_recomendados: ['emagrecer', 'manter', 'definir'],
    tags: ['vegano', 'vegetariano']
  },
  {
    id: 'mamao',
    nome: 'Mamão Formosa',
    categoria: 'fruta',
    calorias_100g: 45,
    macros_100g: { proteinas: 0.5, carboidratos: 11.6, gorduras: 0.1 },
    porcao_padrao: 200,
    objetivos_recomendados: ['emagrecer', 'manter', 'definir'],
    tags: ['rico_em_fibras', 'vegano', 'vegetariano']
  },
  {
    id: 'manga',
    nome: 'Manga',
    categoria: 'fruta',
    calorias_100g: 60,
    macros_100g: { proteinas: 0.8, carboidratos: 15, gorduras: 0.4 },
    porcao_padrao: 150,
    objetivos_recomendados: ['ganhar_massa', 'manter'],
    tags: ['alto_carboidrato', 'vegano', 'vegetariano']
  },
  {
    id: 'abacaxi',
    nome: 'Abacaxi',
    categoria: 'fruta',
    calorias_100g: 50,
    macros_100g: { proteinas: 0.5, carboidratos: 13, gorduras: 0.1 },
    porcao_padrao: 150,
    objetivos_recomendados: ['emagrecer', 'manter', 'definir'],
    tags: ['vegano', 'vegetariano']
  },
  {
    id: 'uva',
    nome: 'Uva',
    categoria: 'fruta',
    calorias_100g: 69,
    macros_100g: { proteinas: 0.7, carboidratos: 18, gorduras: 0.2 },
    porcao_padrao: 150,
    objetivos_recomendados: ['ganhar_massa', 'manter'],
    tags: ['vegano', 'vegetariano']
  },
  
  // =======================================================================
  // --- LATICÍNIOS E BEBIDAS (além dos já listados em proteínas) ---
  // =======================================================================
  {
    id: 'leite_integral',
    nome: 'Leite Integral',
    categoria: 'gordura', // Categoria mista, mas gordura é diferencial
    calorias_100g: 61,
    macros_100g: { proteinas: 3.2, carboidratos: 4.8, gorduras: 3.3 },
    porcao_padrao: 200, // 1 copo
    objetivos_recomendados: ['ganhar_massa', 'manter'],
    tags: ['laticinio', 'vegetariano']
  },
  {
    id: 'leite_desnatado',
    nome: 'Leite Desnatado',
    categoria: 'proteina',
    calorias_100g: 35,
    macros_100g: { proteinas: 3.4, carboidratos: 5, gorduras: 0.1 },
    porcao_padrao: 200,
    objetivos_recomendados: ['emagrecer', 'manter', 'definir'],
    tags: ['laticinio', 'vegetariano']
  },
  {
    id: 'cafe_preto',
    nome: 'Café Preto (sem açúcar)',
    categoria: 'vegetal', // Categoria neutra
    calorias_100g: 2,
    macros_100g: { proteinas: 0.1, carboidratos: 0, gorduras: 0 },
    porcao_padrao: 200,
    objetivos_recomendados: ['emagrecer', 'ganhar_massa', 'manter', 'definir'],
    tags: ['vegano', 'vegetariano', 'low_carb_ok']
  },
];

// =======================================================================
// --- FUNÇÕES AUXILIARES ---
// =======================================================================

export const filtrarPorCategoria = (categoria) => {
  return alimentos.filter(alimento => alimento.categoria === categoria);
};

export const calcularMacros = (alimento, quantidade) => {
  const fator = quantidade / 100;
  return {
    calorias: (alimento.calorias_100g || 0) * fator,
    proteinas: (alimento.macros_100g.proteinas || 0) * fator,
    carboidratos: (alimento.macros_100g.carboidratos || 0) * fator,
    gorduras: (alimento.macros_100g.gorduras || 0) * fator,
  };
};

export const filtrarPorObjetivo = (objetivo) => {
  if (!objetivo) return alimentos;
  return alimentos.filter(alimento => 
    alimento.objetivos_recomendados && alimento.objetivos_recomendados.includes(objetivo)
  );
};
import { exercicios } from '../data/exercicios.js';

const configsPorObjetivo = {
  ganhar_massa: { series: 4, repeticoes: '8-12', descanso: 90, cadencia: '2012' },
  definir: { series: 3, repeticoes: '12-15', descanso: 60, cadencia: '1011' },
  emagrecer: { series: 3, repeticoes: '15-20', descanso: 45, cadencia: '1010' },
  manter: { series: 3, repeticoes: '10-15', descanso: 75, cadencia: '2011' },
};

const divisoesDeTreino = {
  full_body: { nome: 'Full Body', dias: [{ nome: 'Treino A - Corpo Inteiro', musculos: ['peito', 'costas', 'quadriceps', 'ombros', 'biceps', 'triceps'] }] },
  ab: { nome: 'Upper/Lower (AB)', dias: [{ nome: 'Treino A - Superiores', musculos: ['peito', 'costas', 'ombros', 'biceps', 'triceps'] }, { nome: 'Treino B - Inferiores', musculos: ['quadriceps', 'hamstrings', 'glutes', 'panturrilhas'] }] },
  abc: { nome: 'Push/Pull/Legs (ABC)', dias: [{ nome: 'Treino A - Empurrar', musculos: ['peito', 'ombros', 'triceps'] }, { nome: 'Treino B - Puxar', musculos: ['lats', 'middle_back', 'biceps'] }, { nome: 'Treino C - Pernas', musculos: ['quadriceps', 'hamstrings', 'glutes'] }] },
  abcd: { nome: 'Treino ABCD', dias: [{ nome: 'Treino A - Peito e Tríceps', musculos: ['peito', 'triceps'] }, { nome: 'Treino B - Costas e Bíceps', musculos: ['lats', 'biceps'] }, { nome: 'Treino C - Pernas', musculos: ['quadriceps', 'hamstrings'] }, { nome: 'Treino D - Ombros e Abdômen', musculos: ['ombros', 'abdominais'] }] },
  abcde: { nome: 'Treino ABCDE', dias: [{ nome: 'Treino A - Peito', musculos: ['peito'] }, { nome: 'Treino B - Costas', musculos: ['lats', 'middle_back'] }, { nome: 'Treino C - Pernas', musculos: ['quadriceps', 'hamstrings', 'glutes'] }, { nome: 'Treino D - Ombros', musculos: ['ombros'] }, { nome: 'Treino E - Braços e Abdômen', musculos: ['biceps', 'triceps', 'abdominais'] }] },
};

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const gerarProgramaDeTreino = (userProfile, tipoDeSplit) => {
  const { objetivo, experiencia, equipamentos } = userProfile;
  const config = configsPorObjetivo[objetivo];
  const divisaoInfo = divisoesDeTreino[tipoDeSplit];

  if (!divisaoInfo) {
    console.error("Tipo de split inválido:", tipoDeSplit);
    return null;
  }

  const dificuldadesPermitidas = {
    iniciante: ['iniciante'],
    intermediario: ['iniciante', 'intermediario'],
    avancado: ['iniciante', 'intermediario', 'avancado'],
  };
  const niveisPermitidos = dificuldadesPermitidas[experiencia] || ['iniciante'];
  
  const exerciciosDisponiveis = exercicios.filter(ex => 
    (equipamentos.includes(ex.equipamento) || ex.equipamento === 'body_only') &&
    niveisPermitidos.includes(ex.dificuldade)
  );

  const programaFinal = divisaoInfo.dias.map(diaDeTreino => {
    let exerciciosDoDia = [];
    
    diaDeTreino.musculos.forEach(musculo => {
      const isMusculoGrande = ['peito', 'lats', 'quadriceps', 'glutes', 'hamstrings', 'middle_back'].includes(musculo);
      const isMusculoPequeno = ['biceps', 'triceps', 'panturrilhas'].includes(musculo);
      let numExercicios = 1; // Padrão
      if (isMusculoGrande) numExercicios = 2;
      if (isMusculoPequeno && objetivo === 'ganhar_massa') numExercicios = 2;
      
      const exerciciosParaEsteMusculo = shuffleArray(
        exerciciosDisponiveis.filter(ex => ex.musculo_principal === musculo)
      ).slice(0, numExercicios);
      exerciciosDoDia.push(...exerciciosParaEsteMusculo);
    });

    return {
      nome: diaDeTreino.nome,
      exercicios: exerciciosDoDia.map(ex => ({
        ...ex,
        series: config.series,
        repeticoes: config.repeticoes,
        carga: '___ kg',
        descanso: config.descanso,
        cadencia: config.cadencia,
      })),
    };
  });

  return {
    nomePrograma: divisaoInfo.nome,
    divisao: programaFinal,
  };
};

// Cole esta nova função no final do arquivo geradorDeProgramas.js

export const substituirExercicioNoPrograma = (programa, diaIndex, idExercicioAntigo, novoExercicio) => {
  // Cria uma cópia profunda para não modificar o estado original
  const programaAtualizado = JSON.parse(JSON.stringify(programa));
  
  const diaDeTreino = programaAtualizado.divisao[diaIndex];
  const indiceExercicio = diaDeTreino.exercicios.findIndex(ex => ex.id === idExercicioAntigo);

  if (indiceExercicio === -1) {
    console.error("Exercício a ser substituído não encontrado.");
    return programa; // Retorna o original se não encontrar
  }

  // Mantém as configurações de séries, reps, etc., do exercício original
  const exercicioOriginal = diaDeTreino.exercicios[indiceExercicio];
  const exercicioFormatado = {
    ...novoExercicio, // Pega os dados do novo exercício (nome, instruções, etc.)
    series: exercicioOriginal.series,
    repeticoes: exercicioOriginal.repeticoes,
    descanso: exercicioOriginal.descanso,
    cadencia: exercicioOriginal.cadencia,
    carga: '___ kg', // Reseta a carga
  };

  // Substitui o exercício antigo pelo novo na ficha
  diaDeTreino.exercicios.splice(indiceExercicio, 1, exercicioFormatado);

  return programaAtualizado;
};
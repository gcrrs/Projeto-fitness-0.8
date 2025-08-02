# FitCore System - Arquitetura e Funcionalidades

## Tecnologias Utilizadas
- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Ícones**: Lucide React
- **Gráficos**: Recharts
- **Animações**: Framer Motion
- **Roteamento**: React Router DOM

## Estrutura da Aplicação

### 1. Fluxo Principal
1. **Formulário de Perfil** (sem login)
2. **Dashboard Principal** (4 seções)
3. **Funcionalidades Avançadas**

### 2. Componentes Principais

#### Formulário de Perfil
- Coleta de dados básicos (sexo, idade, peso, altura)
- Cálculo automático de IMC
- Seleção de objetivos com ícones
- Escolha de experiência e frequência
- Seleção de equipamentos disponíveis
- Campo para restrições físicas

#### Dashboard (4 Seções)
1. **Treino Hoje**
   - Lista de exercícios do dia
   - Cronômetro integrado
   - Visualização anatômica 3D
   - GIFs demonstrativos

2. **Nutrição Diária**
   - 5 refeições programadas
   - Cálculo de calorias em tempo real
   - Sliders para ajuste de quantidades
   - Barras de progresso nutricional

3. **Progresso**
   - Gráficos de peso e medidas
   - Evolução de cargas
   - Upload de fotos comparativas
   - Histórico de treinos

4. **Perfil Rápido**
   - Edição de dados pessoais
   - Exportação de dados
   - Configurações do sistema

### 3. Funcionalidades Inteligentes

#### Sistema de Treino
- Geração automática baseada em perfil
- Periodização inteligente
- Banco de 100+ exercícios
- Cálculo de calorias queimadas (MET)

#### Sistema de Nutrição
- Sugestões baseadas em objetivos
- Substituições inteligentes
- Cálculo nutricional automático
- Cardápios personalizados

#### Gamificação
- Sistema de conquistas
- Metas e desafios
- Progresso visual
- Motivação contínua

## Estrutura de Dados

### Perfil do Usuário
```javascript
{
  sexo: 'masculino' | 'feminino',
  idade: number,
  peso: number,
  altura: number,
  imc: number, // calculado
  objetivo: 'emagrecer' | 'ganhar_massa' | 'definir' | 'manter',
  experiencia: 'iniciante' | 'intermediario' | 'avancado',
  frequencia: 3 | 4 | 5 | 6,
  equipamentos: string[],
  restricoes: string
}
```

### Exercício
```javascript
{
  id: string,
  nome: string,
  musculo_primario: string,
  musculo_secundario: string[],
  equipamento: string,
  dificuldade: 'iniciante' | 'intermediario' | 'avancado',
  met: number,
  instrucoes: string[],
  gif_url: string
}
```

### Treino
```javascript
{
  data: Date,
  exercicios: [{
    exercicio_id: string,
    series: number,
    repeticoes: number,
    carga: number,
    concluido: boolean
  }]
}
```

## Responsividade
- Design mobile-first
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly para dispositivos móveis
- Navegação adaptativa

## Performance
- Lazy loading de componentes
- Otimização de imagens
- Cache de dados locais
- Animações suaves com Framer Motion


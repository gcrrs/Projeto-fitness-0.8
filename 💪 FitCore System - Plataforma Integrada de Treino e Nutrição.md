# 💪 FitCore System - Plataforma Integrada de Treino e Nutrição

## 🎯 Visão Geral

O **FitCore System** é uma plataforma completa de treino e nutrição que oferece acesso direto ao dashboard personalizado sem necessidade de cadastro ou login tradicional. O sistema coleta informações básicas do usuário em um formulário rápido e gera automaticamente treinos e cardápios personalizados baseados nos objetivos individuais.

## ✨ Características Principais

### 🚀 **Acesso Direto ao Dashboard**
- ❌ **Sem cadastro/login tradicional**
- ⚡ **Formulário rápido de perfil**
- 🎯 **Dashboard personalizado instantâneo**

### 📊 **Dashboard com 4 Seções Principais**

#### 🏋️‍♂️ **1. Treino Hoje**
- Cronômetro de treino integrado
- Lista de exercícios personalizados
- Sistema de marcação de exercícios concluídos
- Estimativa de calorias queimadas
- Treinos baseados no objetivo e equipamentos

#### 🥗 **2. Nutrição Diária**
- Cardápio com 5 refeições personalizadas
- Cálculo automático de calorias e macronutrientes
- Barras de progresso em tempo real
- Sistema de marcação de refeições
- Metas nutricionais baseadas no objetivo

#### 📈 **3. Progresso**
- Sistema de gamificação com níveis e pontos
- Conquistas e badges
- Evolução de medidas corporais
- Progresso de cargas nos exercícios
- Estatísticas de desempenho

#### 👤 **4. Perfil Rápido**
- Visualização completa dos dados
- Exportação de relatórios (PDF/CSV)
- Sistema de compartilhamento
- Backup de dados
- Opção de resetar perfil

## 🧠 Sistemas Inteligentes

### 🎯 **Sistema de Treino Inteligente**
- **Geração automática** baseada em:
  - Objetivo (Emagrecer, Ganhar Massa, Definir, Manter)
  - Experiência (Iniciante, Intermediário, Avançado)
  - Equipamentos disponíveis
  - Frequência semanal

- **Configurações por Objetivo:**
  - **Emagrecer:** 3-4 séries, 12-20 reps, 45s descanso
  - **Ganhar Massa:** 3-5 séries, 6-12 reps, 90s descanso
  - **Definir:** 3-4 séries, 10-15 reps, 60s descanso
  - **Manter:** 2-3 séries, 10-15 reps, 60s descanso

### 🍎 **Sistema de Nutrição Inteligente**
- **Cálculo automático de macronutrientes:**
  - **Emagrecer:** 25 kcal/kg, 1.6g proteína/kg
  - **Ganhar Massa:** 40 kcal/kg, 2.0g proteína/kg
  - **Definir:** 30 kcal/kg, 1.8g proteína/kg
  - **Manter:** 32 kcal/kg, 1.4g proteína/kg

- **Cardápios personalizados** com alimentos específicos para cada objetivo

## 🏆 Sistema de Gamificação

### 📊 **Níveis e Progressão**
- 10 níveis de progressão (Iniciante → Imortal)
- Sistema de pontos baseado em ações reais
- Barra de progresso para próximo nível

### 🎖️ **Conquistas**
- **Treino:** Primeiro Passo, Madrugador, Coruja Fitness
- **Nutrição:** Bem Alimentado, Chef Saudável
- **Progresso:** Perfil Completo, Evoluindo
- **Especiais:** Conquistas por consistência

## 🛠️ Tecnologias Utilizadas

- **Frontend:** React 18 + Vite
- **Styling:** Tailwind CSS
- **Estado:** React Hooks (useState, useEffect)
- **Persistência:** localStorage
- **Ícones:** Emojis nativos
- **Responsividade:** Mobile-first design

## 📁 Estrutura do Projeto

```
fitcore-system/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx          # Dashboard principal
│   │   └── ProfileForm.jsx        # Formulário de perfil
│   ├── data/
│   │   ├── exercicios.js          # Banco de exercícios
│   │   └── alimentos.js           # Banco de alimentos
│   ├── utils/
│   │   ├── geradorTreinos.js      # Sistema de treinos
│   │   ├── geradorCardapio.js     # Sistema de nutrição
│   │   ├── sistemaConquistas.js   # Sistema de gamificação
│   │   └── exportarDados.js       # Sistema de exportação
│   ├── App.jsx                    # Componente principal
│   └── main.jsx                   # Ponto de entrada
├── public/
├── package.json
└── README.md
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- pnpm (recomendado) ou npm

### Instalação
```bash
# Clonar o repositório
git clone <repository-url>
cd fitcore-system

# Instalar dependências
pnpm install

# Executar em modo desenvolvimento
pnpm run dev

# Build para produção
pnpm run build
```

### Acesso
- **Desenvolvimento:** http://localhost:5173
- **Produção:** Após build, servir a pasta `dist/`

## 📱 Funcionalidades Detalhadas

### 🎯 **Formulário de Perfil**
- Coleta de dados básicos (sexo, idade, peso, altura)
- Cálculo automático de IMC
- Seleção visual de objetivos com emojis
- Escolha de experiência e frequência
- Seleção múltipla de equipamentos
- Campo para restrições físicas

### ⏱️ **Cronômetro de Treino**
- Iniciar/Pausar/Reset
- Contagem em tempo real
- Interface visual clara
- Integração com exercícios

### 📊 **Sistema de Progresso**
- Acompanhamento de peso e medidas
- Evolução de cargas por exercício
- Estatísticas de treinos e refeições
- Sistema de conquistas visual

### 📄 **Exportação de Dados**
- **Relatório PDF:** Informações completas do usuário
- **CSV:** Dados estruturados para análise
- **Compartilhamento:** Progresso em redes sociais
- **Backup:** Dados completos em JSON

## 🎨 Design e UX

### 🌈 **Paleta de Cores**
- **Azul:** Informações e dados
- **Verde:** Sucesso e progresso
- **Roxo:** Gamificação e conquistas
- **Vermelho:** Ações importantes
- **Cinza:** Elementos neutros

### 📱 **Responsividade**
- Design mobile-first
- Layout adaptativo
- Touch-friendly
- Navegação intuitiva

## 🔧 Configurações Avançadas

### 🏋️‍♂️ **Banco de Exercícios**
- 20+ exercícios categorizados
- Informações de MET para cálculo de calorias
- Instruções detalhadas
- Músculos trabalhados
- Equipamentos necessários

### 🍽️ **Banco de Alimentos**
- 18+ alimentos categorizados
- Informações nutricionais completas
- Porções padrão
- Recomendações por objetivo

## 📈 Métricas e Cálculos

### 🔥 **Calorias Queimadas**
```
kcal = MET × peso(kg) × tempo(h)
```

### 📊 **IMC**
```
IMC = peso(kg) / altura(m)²
```

### 🥗 **Macronutrientes**
- Proteínas: baseado no objetivo (1.4-2.0g/kg)
- Carboidratos: 25-45% das calorias totais
- Gorduras: 25-30% das calorias totais

## 🎯 Objetivos Suportados

### 🔥 **Emagrecer**
- Déficit calórico
- Treinos com mais repetições
- Cardápio baixo em calorias
- Foco em queima de gordura

### 💪 **Ganhar Massa**
- Superávit calórico
- Treinos de força
- Cardápio hipercalórico
- Foco em hipertrofia

### ⚡ **Definir**
- Calorias moderadas
- Treinos mistos
- Cardápio equilibrado
- Foco em definição muscular

### 🧘 **Manter**
- Calorias de manutenção
- Treinos equilibrados
- Cardápio balanceado
- Foco em manutenção

## 🔒 Privacidade e Dados

- **Armazenamento local:** Todos os dados ficam no dispositivo
- **Sem servidor:** Não há coleta de dados externos
- **Privacidade total:** Informações pessoais protegidas
- **Controle total:** Usuário pode exportar ou apagar dados

## 🚀 Próximas Funcionalidades

- [ ] Visualização anatômica 3D dos exercícios
- [ ] GIFs demonstrativos
- [ ] Gráficos de progresso avançados
- [ ] Integração com wearables
- [ ] Modo offline completo
- [ ] Planos de treino de longo prazo

## 📞 Suporte

Para dúvidas ou sugestões sobre o FitCore System, entre em contato através dos canais oficiais.

---

**FitCore System** - Sua jornada fitness começa aqui! 💪🚀


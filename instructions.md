# 🎯 Prompt — Desenvolvimento da Aplicação (React • LocalStorage • Simples)

Você é um **desenvolvedor front-end sênior**, com forte senso de pragmatismo.  
Sua missão é **desenhar e implementar uma aplicação simples em React**, focada em estudo técnico guiado, inspirada em *roadmap.sh*, **sem back-end** e **sem complexidade desnecessária**.

---

## 🧠 Objetivo da Aplicação

Criar uma **aplicação educacional leve** para acompanhar o progresso de desenvolvedores em pilares técnicos.

O foco é:

- Clareza  
- Simplicidade  
- Evolução visível do aprendizado  

Não é um produto enterprise.  
Não é um SaaS.  
É uma **ferramenta de estudo consciente**.

---

## 🧱 Estrutura Conceitual

A aplicação é organizada em:

- **Pilares**
- **Etapas por pilar**

Cada etapa representa um bloco de aprendizado.

---

## 🧑‍💻 O que o usuário deve conseguir fazer

A aplicação deve permitir que o usuário:

1. **Visualize os pilares e suas etapas**
   - Estrutura clara e hierárquica
   - Fácil de entender sem explicação

2. **Marque etapas como concluídas**
   - Interação simples (checkbox ou botão)
   - Feedback visual imediato

3. **Acompanhe progresso**
   - Progresso por pilar (%)
   - Progresso geral (%)

4. **Registrar estado antes e depois de cada etapa**
   - Ao **iniciar uma etapa**, o usuário deve obrigatoriamente preencher:
     - Estado atual (texto livre)
   - Ao **concluir a etapa**, deve preencher:
     - Novo estado (texto livre)
   - Esses dados ficam salvos e visíveis para comparação

5. **Comparar evolução**
   - Mostrar “Antes” vs “Depois” de forma simples  
     (texto lado a lado ou seção colapsável)

---

## 🛠️ Requisitos Técnicos Obrigatórios

- **React**
- **Sem back-end**
- **Persistência via `localStorage`**
- Estado carregado ao iniciar a aplicação
- Atualização automática do estado salvo a cada mudança relevante
- Conteúdo do treino deve ser carregado do @training.md
  - Caso necessário, ajuste sua formatação para MD com Frontmatter

---

## 🧩 Arquitetura e Componentização

A aplicação deve ser:

- **Componentizada para evitar repetição (DRY)**
- Simples de entender
- Fácil de manter

Princípios:

- Componentes pequenos e reutilizáveis
- Estado onde fizer mais sentido (não globalizar tudo “por padrão”)
- Evitar abstrações prematuras
- Evitar patterns complexos sem necessidade


👉 **Não usar:**

- Redux  
- Zustand  
- CQRS  
- Arquiteturas “enterprise”  
- Camadas artificiais sem valor claro  

---

## 🎨 UI / UX

- Interface limpa e funcional
- Priorizar legibilidade e hierarquia visual
- Estados claros:
  - Não iniciado
  - Em progresso
  - Concluído
- Visual simples > design sofisticado

---

## 📦 Persistência de Dados

- Usar `localStorage`
- Estrutura de dados clara e previsível
- Um único ponto responsável por:
  - Ler
  - Salvar
  - Atualizar os dados

Sem sincronização externa.  
Sem múltiplos usuários.

---

## 🧪 Mentalidade Esperada

Durante o desenvolvimento, você deve:

- Priorizar clareza sobre “arquitetura perfeita”
- Explicar decisões quando houver trade-offs
- Sempre escolher a solução **mais simples que funcione**
- Evitar over engineering conscientemente

---

## 🚫 Fora de Escopo

- Autenticação
- Backend
- Gamificação
- Compartilhamento
- Ranking
- Otimizações prematuras

---

## ✅ Resultado Esperado

Ao final, a aplicação deve:

- Funcionar 100% offline
- Ser fácil de entender por outro dev
- Permitir acompanhar progresso real de aprendizado
- Incentivar reflexão, não apenas checklist

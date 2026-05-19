# Aurora Subtasks
## Subtasks Técnicas do Primeiro Ciclo de Implementação

---

# 1. Objetivo do documento

Este documento transforma as primeiras histórias de usuário do MVP Aurora em subtasks técnicas.

O objetivo é orientar a implementação inicial do produto de forma alinhada ao DNA do Aurora:

> Menos ansiedade e desorganização financeira.  
> Mais consciência, autonomia e inteligência financeira — sem planilhas.

Este documento deve servir como ponte entre:
- visão de produto
- histórias de usuário
- implementação em código
- prompts para o Codex

---

# 2. Escopo do primeiro ciclo

O primeiro ciclo de implementação deve entregar a menor experiência completa possível do Aurora.

A experiência mínima precisa permitir que o usuário:

1. informe dados financeiros iniciais
2. visualize o fluxo mensal
3. veja percentual de gastos e investimentos
4. crie projetos de vida básicos
5. visualize reservatório Segurança
6. visualize reservatório Liberdade
7. veja score de inteligência financeira
8. receba uma próxima ação prioritária

---

# 3. Histórias incluídas no primeiro ciclo

## Histórias priorizadas

1. História 1.1 — Informar dados iniciais mínimos
2. História 2.1 — Visualizar entradas, gastos e investimentos mensais
3. História 2.2 — Mostrar percentual do fluxo direcionado para gastos e investimentos
4. História 3.1 — Criar projetos de vida
5. História 4.1 — Criar reservatório Segurança
6. História 4.2 — Criar reservatório Liberdade
7. História 5.1 — Visualizar score de inteligência financeira
8. História 6.1 — Receber uma próxima ação prioritária

---

# 4. Princípios técnicos do primeiro ciclo

A implementação deve:

- reaproveitar a base atual do Aurora
- evitar refatoração excessiva
- preservar a UI existente quando possível
- usar TypeScript com tipos explícitos
- manter funções puras nos engines
- usar localStorage para persistência inicial
- não depender de backend
- não depender de Open Finance
- não exigir IA real no primeiro ciclo
- manter fallback para mocks quando não houver dados reais

---

# 5. Modelo de dados mínimo do primeiro ciclo

## Objetivo

Criar uma camada mínima de dados que já se aproxime do novo domínio Aurora sem exigir refatoração completa.

---

## Tipos sugeridos

Criar ou adaptar:

```ts
export interface FlowInput {
  monthlyIncome: number;
  monthlyExpenses: number;
  monthlyInvestments: number;
  monthlyBalance: number;
  annualExtraIncome?: number;
  annualExtraExpenses?: number;
}

export type ReservoirType = 'security' | 'autonomy' | 'freedom';

export interface LifeProjectInput {
  id: string;
  name: string;
  type: ReservoirType;
  targetAmount?: number;
  currentAmount?: number;
  monthlyContribution?: number;
  targetDate?: string;
  priority?: number;
}

export interface AuroraMvpState {
  flow: FlowInput;
  projects: LifeProjectInput[];
  hasCompletedInitialSnapshot: boolean;
  createdAt: string;
  updatedAt: string;
}
````

---

## Subtasks

* [ ] Criar `src/types/aurora-mvp.ts`
* [ ] Criar tipo `FlowInput`
* [ ] Criar tipo `LifeProjectInput`
* [ ] Criar tipo `ReservoirType`
* [ ] Criar tipo `AuroraMvpState`
* [ ] Criar função para converter `AuroraMvpState` em `AuroraUserState`
* [ ] Manter compatibilidade com engines atuais

---

# 6. Persistência local

## Objetivo

Permitir que o usuário preencha os dados iniciais e continue vendo os dados ao recarregar o app.

---

## Arquivo sugerido

```txt
src/lib/aurora-mvp-storage.ts
```

---

## Funções sugeridas

```ts
saveAuroraMvpState(state: AuroraMvpState): void

loadAuroraMvpState(): AuroraMvpState | null

clearAuroraMvpState(): void

hasAuroraMvpState(): boolean
```

---

## Subtasks

* [ ] Criar helper de localStorage
* [ ] Salvar estado inicial após preenchimento
* [ ] Carregar estado ao abrir o app
* [ ] Criar fallback para mock se não houver estado salvo
* [ ] Criar botão ou ação temporária para limpar estado salvo
* [ ] Garantir tratamento de JSON inválido no localStorage

---

# 7. História 1.1 — Informar dados iniciais mínimos

## Objetivo

Criar uma experiência simples para o usuário informar os dados básicos do fluxo.

---

## Tela sugerida

Criar:

```txt
src/pages/InitialSnapshotPage.tsx
```

Ou adaptar uma tela existente se fizer mais sentido.

---

## Campos mínimos

* renda mensal aproximada
* gastos mensais aproximados
* valor mensal investido ou poupado
* reserva atual
* investimentos atuais
* primeiro projeto de vida opcional

---

## Subtasks de UI

* [ ] Criar página de Snapshot Inicial
* [ ] Criar formulário simples de fluxo mensal
* [ ] Criar input para renda mensal
* [ ] Criar input para gastos mensais
* [ ] Criar input para investimentos mensais
* [ ] Criar input para reserva atual
* [ ] Criar input para investimentos atuais
* [ ] Criar input opcional para primeiro projeto de vida
* [ ] Permitir salvar mesmo com campos opcionais vazios
* [ ] Mostrar texto explicando que os dados podem ser refinados depois

---

## Subtasks de lógica

* [ ] Calcular saldo mensal automaticamente
* [ ] Validar números negativos quando não fizer sentido
* [ ] Normalizar valores monetários
* [ ] Criar `AuroraMvpState`
* [ ] Salvar no localStorage
* [ ] Redirecionar para Home após salvar
* [ ] Atualizar fonte ativa de dados do app

---

## Copy sugerida

```text
Comece com uma visão simples.
Você não precisa organizar tudo agora. Informe apenas alguns números aproximados para o Aurora gerar sua primeira leitura.
```

CTA:

```text
Gerar minha primeira leitura
```

---

# 8. História 2.1 — Visualizar entradas, gastos e investimentos mensais

## Objetivo

Criar ou adaptar componente para mostrar o fluxo mensal.

---

## Componente sugerido

```txt
src/components/aurora/FlowMapCard.tsx
```

---

## Deve mostrar

* entradas mensais
* gastos mensais
* investimentos mensais
* saldo mensal

---

## Subtasks

* [ ] Criar `FlowMapCard`
* [ ] Receber `flow` como prop
* [ ] Exibir entradas mensais
* [ ] Exibir gastos mensais
* [ ] Exibir investimentos mensais
* [ ] Exibir saldo mensal
* [ ] Aplicar formatação monetária brasileira
* [ ] Integrar card na HomePageV2
* [ ] Usar dados do `AuroraMvpState` quando disponíveis
* [ ] Manter fallback para mock

---

## Copy sugerida

Título:

```text
Mapa do Fluxo
```

Mensagem:

```text
Veja como sua renda mensal se distribui entre gastos, investimentos e resultado.
```

---

# 9. História 2.2 — Mostrar percentual do fluxo direcionado para gastos e investimentos

## Objetivo

Mostrar a qualidade do fluxo financeiro de forma simples.

---

## Cálculos

```ts
expenseRate = monthlyExpenses / monthlyIncome

investmentRate = monthlyInvestments / monthlyIncome

balanceRate = monthlyBalance / monthlyIncome
```

---

## Subtasks

* [ ] Criar função `calculateFlowRatios`
* [ ] Calcular percentual de gastos
* [ ] Calcular percentual de investimentos
* [ ] Calcular percentual de saldo
* [ ] Tratar renda igual a zero
* [ ] Exibir percentuais no `FlowMapCard`
* [ ] Gerar frase interpretativa simples

---

## Frases interpretativas iniciais

### Quando investimento mensal > 0

```text
Você já direciona parte do seu fluxo para construção de futuro.
```

### Quando investimento mensal = 0

```text
Seu fluxo ainda está sendo consumido principalmente no presente.
```

### Quando gastos > renda

```text
Seu fluxo está pressionado: as saídas superam as entradas neste mês.
```

### Quando saldo positivo e investimentos baixos

```text
Existe espaço para transformar parte do saldo em construção de futuro.
```

---

# 10. História 3.1 — Criar projetos de vida

## Objetivo

Permitir que o usuário crie projetos de vida básicos.

---

## Tela ou componente sugerido

```txt
src/pages/LifeProjectsPage.tsx
```

ou adaptar:

```txt
src/pages/ObjectivesPageV2.tsx
```

---

## Campos iniciais

* nome do projeto
* tipo:

  * Segurança
  * Autonomia
  * Liberdade
* valor alvo opcional
* valor atual opcional
* aporte mensal opcional
* prazo opcional

---

## Subtasks

* [ ] Criar ou adaptar tela de projetos
* [ ] Criar formulário de novo projeto
* [ ] Criar lista de projetos existentes
* [ ] Salvar projetos no `AuroraMvpState`
* [ ] Permitir edição simples de projeto
* [ ] Permitir exclusão de projeto
* [ ] Garantir que projetos sejam usados para gerar reservatórios
* [ ] Integrar projetos na Home ou Objectives

---

## Copy sugerida

```text
Projetos de vida são destinos para o seu fluxo financeiro.
Eles ajudam você a transformar dinheiro em segurança, autonomia e liberdade.
```

---

# 11. História 4.1 — Criar reservatório Segurança

## Objetivo

Garantir que todo usuário tenha um reservatório padrão de Segurança.

---

## Regra de negócio

O reservatório Segurança deve existir sempre.

Se o usuário informou reserva atual, esse valor deve alimentar o reservatório Segurança.

---

## Campos

* nome: Segurança
* tipo: security
* valor atual: reserva atual
* valor alvo: sugerido com base em meses de gastos
* aporte mensal: opcional
* progresso percentual

---

## Sugestão de meta

```ts
securityTarget = monthlyExpenses * 6
```

No futuro, permitir usuário escolher entre 3, 6, 9 ou 12 meses.

---

## Subtasks

* [ ] Criar função `buildDefaultSecurityReservoir`
* [ ] Usar reserva atual como valor atual
* [ ] Usar 6 meses de gastos como valor alvo inicial
* [ ] Calcular progresso
* [ ] Exibir na lista de reservatórios
* [ ] Criar mensagem interpretativa

---

## Copy sugerida

```text
Sua Segurança representa a capacidade de lidar com imprevistos sem perder tranquilidade.
```

---

# 12. História 4.2 — Criar reservatório Liberdade

## Objetivo

Garantir que todo usuário tenha um reservatório padrão de Liberdade.

---

## Regra de negócio

O reservatório Liberdade deve existir sempre.

Se o usuário informou investimentos atuais além da reserva, esse valor pode alimentar inicialmente o reservatório Liberdade, salvo se estiver alocado em outros projetos.

---

## Campos

* nome: Liberdade
* tipo: freedom
* valor atual: investimentos atuais menos reserva, quando aplicável
* valor alvo: opcional ou estimado futuramente
* aporte mensal: opcional
* progresso percentual

---

## Subtasks

* [ ] Criar função `buildDefaultFreedomReservoir`
* [ ] Usar investimentos atuais como base inicial quando disponível
* [ ] Evitar dupla contagem com Segurança
* [ ] Permitir valor alvo opcional
* [ ] Exibir na lista de reservatórios
* [ ] Criar mensagem interpretativa

---

## Copy sugerida

```text
Sua Liberdade representa a construção de autonomia financeira de longo prazo.
```

---

# 13. História 5.1 — Visualizar score de inteligência financeira

## Objetivo

Adaptar o score atual para comunicar evolução de inteligência financeira.

---

## Subtasks

* [ ] Revisar labels do score na UI
* [ ] Substituir linguagem de “saúde financeira” por “inteligência financeira” onde fizer sentido
* [ ] Garantir que o score não pareça julgamento de riqueza
* [ ] Conectar score ao Flow, Projects e Reservoirs
* [ ] Atualizar explicação do score
* [ ] Manter compatibilidade com `financial-health-engine`
* [ ] Planejar futura renomeação de tipos, se necessário

---

## Copy sugerida

```text
Seu score não mede riqueza. Ele ajuda você a entender se sua relação com dinheiro está evoluindo de forma mais consciente, sustentável e alinhada aos seus objetivos.
```

---

# 14. História 6.1 — Receber uma próxima ação prioritária

## Objetivo

Gerar uma próxima ação com base no estado inicial do usuário.

---

## Regras iniciais sugeridas

### Se não houver dados mínimos

```text
Complete seu snapshot inicial para gerar uma leitura mais clara.
```

### Se não houver projeto de vida

```text
Crie um primeiro projeto de vida para dar destino ao seu fluxo financeiro.
```

### Se Segurança estiver abaixo de 30%

```text
Defina um aporte mensal para fortalecer sua Segurança.
```

### Se investimentos mensais forem zero

```text
Escolha um valor pequeno para começar a alimentar um reservatório.
```

### Se houver saldo positivo sem destino

```text
Direcione parte do seu saldo para um projeto de vida.
```

---

## Subtasks

* [ ] Adaptar `next-action-engine`
* [ ] Incluir regras de projetos e reservatórios
* [ ] Priorizar Segurança quando estiver muito frágil
* [ ] Priorizar criação de projeto quando não houver projeto
* [ ] Priorizar conexão do saldo positivo com reservatório
* [ ] Exibir próxima ação na Home
* [ ] Garantir apenas uma ação principal
* [ ] Manter linguagem leve e contextual

---

# 15. Integração com HomePageV2

## Objetivo

Adaptar a Home para refletir o novo MVP.

---

## Subtasks

* [ ] Usar `AuroraMvpState` quando disponível
* [ ] Converter `AuroraMvpState` para estado consumido pelos engines
* [ ] Adicionar `FlowMapCard`
* [ ] Mostrar reservatórios padrão
* [ ] Atualizar diagnóstico para linguagem de inteligência financeira
* [ ] Atualizar próxima ação
* [ ] Manter fallback para mock
* [ ] Garantir build sem erros

---

# 16. Integração com rotas

## Objetivo

Adicionar as rotas mínimas do primeiro ciclo.

---

## Rotas sugeridas

```txt
/snapshot
/home
/score
/projects
/reservoirs
```

---

## Subtasks

* [ ] Criar rota `/snapshot`
* [ ] Criar ou adaptar rota `/projects`
* [ ] Criar ou adaptar rota `/reservoirs`
* [ ] Atualizar navegação
* [ ] Garantir redirecionamento inicial se não houver snapshot
* [ ] Permitir voltar para Home após salvar

---

# 17. Critérios de aceite do primeiro ciclo completo

O primeiro ciclo estará pronto quando:

* [ ] usuário consegue preencher snapshot inicial
* [ ] app salva dados localmente
* [ ] Home usa dados do snapshot
* [ ] Home mostra Mapa do Fluxo
* [ ] Home mostra entradas, gastos, investimentos e saldo
* [ ] Home mostra percentuais de gastos e investimentos
* [ ] usuário consegue criar pelo menos um projeto de vida
* [ ] sistema cria reservatório Segurança
* [ ] sistema cria reservatório Liberdade
* [ ] score aparece como inteligência financeira
* [ ] próxima ação é gerada com base nos dados iniciais
* [ ] app continua funcionando com fallback para mock
* [ ] build passa sem erros

---

# 18. Prompt para o Codex — Primeiro Ciclo MVP

```text
Implement the first MVP cycle of Aurora based on the new product DNA.

Context:
Aurora is no longer just a financial dashboard.
It is a platform for evolving financial consciousness and financial intelligence.

The first MVP cycle must allow the user to:
1. input a lightweight initial financial snapshot
2. see a Flow Map with monthly income, expenses, investments and balance
3. see percentages of flow allocated to expenses and investments
4. create basic life projects
5. see default reservoirs for Security and Freedom
6. view the score as Financial Intelligence Score
7. receive one priority next action based on the current state

Do not overengineer.
Do not add backend.
Do not add Open Finance.
Use localStorage for persistence.
Keep fallback to existing mocks when no user data exists.
Preserve current visual style as much as possible.

Create or adapt:

- src/types/aurora-mvp.ts
- src/lib/aurora-mvp-storage.ts
- src/lib/aurora-mvp-adapter.ts
- src/components/aurora/FlowMapCard.tsx
- src/pages/InitialSnapshotPage.tsx
- src/pages/LifeProjectsPage.tsx or adapt ObjectivesPageV2
- src/pages/ReservoirsPage.tsx or adapt ObjectivesPageV2
- update HomePageV2
- update FinancialHealthPageV3 if needed
- update next-action-engine

Data model:

Create FlowInput:
- monthlyIncome
- monthlyExpenses
- monthlyInvestments
- monthlyBalance
- annualExtraIncome?
- annualExtraExpenses?

Create LifeProjectInput:
- id
- name
- type: 'security' | 'autonomy' | 'freedom'
- targetAmount?
- currentAmount?
- monthlyContribution?
- targetDate?
- priority?

Create AuroraMvpState:
- flow
- projects
- hasCompletedInitialSnapshot
- createdAt
- updatedAt

Implementation rules:

1. Initial Snapshot
Create a lightweight form for:
- monthly income
- monthly expenses
- monthly investments
- current emergency reserve
- current investments
- optional first life project

The user should be able to save approximate data.
Explain that data can be refined later.

2. Flow Map
Create a card showing:
- income
- expenses
- investments
- balance
- expense rate
- investment rate

Generate simple interpretation:
- if expenses > income: flow is pressured
- if investments > 0: user is already building future
- if balance > 0 and investments are low: user has room to direct flow
- if investments are zero: flow is mostly consumed in the present

3. Projects
Allow the user to create simple life projects with:
- name
- type
- target amount
- current amount
- monthly contribution
- target date

4. Reservoirs
Always create two default reservoirs:
- Security
- Freedom

Security:
- use current emergency reserve as current amount
- target = monthly expenses * 6

Freedom:
- use current investments as current amount when available
- target can be optional for now

Projects of type autonomy should become custom reservoirs.

5. Score
Update UI language so the score is communicated as Financial Intelligence Score.
Add explanatory copy:
"Your score does not measure wealth. It helps you understand whether your relationship with money is evolving in a more conscious, sustainable and goal-aligned way."

6. Next Action
Update next-action logic:
- if no snapshot: ask user to complete snapshot
- if no project: ask user to create first life project
- if Security reservoir is below 30%: suggest defining monthly contribution to Security
- if monthly investments are zero: suggest starting with a small contribution
- if balance is positive and not allocated: suggest directing part of balance to a life project
- otherwise suggest maintaining routine

7. Persistence
Use localStorage:
- saveAuroraMvpState
- loadAuroraMvpState
- clearAuroraMvpState

8. Integration
HomePageV2 should use AuroraMvpState when available.
Otherwise use existing mock fallback.
Do not break CSV import flow.
Do not remove current engines.

At the end, summarize:
- files created
- files updated
- how MVP state works
- how Flow Map works
- how reservoirs are generated
- how next action was updated
- remaining TODOs
```

---

# 19. Recomendações para implementação

## Ordem ideal para o Codex

Peça para o Codex implementar em duas etapas:

### Etapa 1

* tipos
* storage
* adapter
* snapshot
* flow map

### Etapa 2

* projetos
* reservatórios
* next action
* integração Home/Score

---

# 20. Próximo documento

Depois de implementar ou revisar esse primeiro ciclo, o próximo documento deve ser:

```txt
AURORA_ACCEPTANCE_TESTS.md
```

Esse documento vai trazer cenários para validar se o MVP está funcionando como produto, não só como código.

```

Agora vocês já têm a cadeia completa até subtasks + prompt de implementação do primeiro ciclo.
```
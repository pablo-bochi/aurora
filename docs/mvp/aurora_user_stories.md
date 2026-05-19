# Aurora User Stories
## Histórias de Usuário do MVP Aurora

---

# 1. Objetivo do documento

Este documento detalha as histórias de usuário iniciais do MVP Aurora.

As histórias foram derivadas dos épicos prioritários definidos em `AURORA_EPICS.md`.

O objetivo é transformar a visão do produto em entregas claras, testáveis e orientadas a valor para o usuário.

A transformação central do Aurora continua sendo:

> Menos ansiedade e desorganização financeira.  
> Mais consciência, autonomia e inteligência financeira — sem planilhas.

---

# 2. Princípios das histórias

Toda história de usuário do Aurora deve respeitar os seguintes princípios:

- gerar clareza
- reduzir fricção
- evitar culpa financeira
- evitar linguagem excessivamente técnica
- ajudar o usuário a evoluir progressivamente
- conectar dinheiro a projetos de vida
- estimular consciência, autonomia e inteligência financeira

---

# 3. Épico 1 — Onboarding e Snapshot Financeiro Inicial

---

## História 1.1 — Informar dados iniciais mínimos

Como usuário,  
quero informar poucos dados financeiros iniciais,  
para receber uma primeira leitura da minha situação sem precisar preencher uma planilha.

### Critérios de aceite

- O usuário consegue iniciar o Aurora com poucos campos.
- Os campos iniciais devem incluir, no mínimo:
  - renda mensal aproximada
  - gastos mensais aproximados
  - valor mensal investido ou poupado
  - reserva atual ou investimentos atuais
- O usuário entende que os dados podem ser refinados depois.
- O sistema não exige precisão absoluta para gerar a primeira leitura.
- O fluxo deve transmitir leveza, não burocracia.

### Resultado esperado

O usuário sente:

> “Consegui começar sem organizar toda a minha vida financeira antes.”

---

## História 1.2 — Pular perguntas incertas

Como usuário,  
quero poder pular perguntas que ainda não sei responder,  
para não travar meu início no app.

### Critérios de aceite

- Perguntas não essenciais podem ser puladas.
- O sistema informa que os dados podem ser completados depois.
- O diagnóstico inicial ainda é gerado com base nos dados disponíveis.
- O usuário não é penalizado por não saber responder tudo no início.
- O app deve sugerir completar dados gradualmente em outro momento.

### Resultado esperado

O usuário sente:

> “Não preciso ter tudo perfeito para começar.”

---

## História 1.3 — Informar projetos principais

Como usuário,  
quero informar meus principais projetos de vida,  
para começar a conectar meu dinheiro aos meus objetivos.

### Critérios de aceite

- O usuário consegue informar pelo menos um projeto.
- Cada projeto pode começar apenas com nome e prazo aproximado.
- Valor alvo e aporte mensal podem ser adicionados depois.
- O sistema sugere exemplos de projetos:
  - reserva de emergência
  - viagem
  - apartamento
  - educação
  - liberdade financeira
- O app explica que projetos ajudam a transformar dinheiro em direção.

### Resultado esperado

O usuário sente:

> “Meu dinheiro começa a ter destino.”

---

## História 1.4 — Gerar primeiro diagnóstico

Como usuário,  
quero receber um primeiro diagnóstico financeiro com base nos dados iniciais,  
para entender rapidamente minha situação atual.

### Critérios de aceite

- O diagnóstico deve ser gerado mesmo com dados incompletos.
- O diagnóstico deve usar linguagem simples e humana.
- O diagnóstico não deve usar tom de julgamento.
- O diagnóstico deve indicar:
  - situação geral do fluxo
  - principal ponto de atenção
  - uma direção inicial de evolução
- O diagnóstico deve deixar claro que é uma primeira leitura, não uma análise definitiva.

### Resultado esperado

O usuário sente:

> “Agora entendo melhor meu ponto de partida.”

---

# 4. Épico 2 — Mapa do Fluxo Financeiro

---

## História 2.1 — Visualizar entradas, gastos e investimentos mensais

Como usuário,  
quero visualizar minhas entradas, gastos e investimentos mensais,  
para entender como meu dinheiro se distribui.

### Critérios de aceite

- O sistema mostra total de entradas mensais.
- O sistema mostra total de gastos mensais.
- O sistema mostra total investido ou poupado no mês.
- O sistema mostra resultado mensal.
- A visualização separa claramente:
  - dinheiro consumido
  - dinheiro direcionado para construção de futuro
- O usuário entende a visão sem precisar interpretar uma tabela complexa.

### Resultado esperado

O usuário sente:

> “Agora consigo enxergar meu fluxo mensal.”

---

## História 2.2 — Mostrar percentual do fluxo direcionado para gastos e investimentos

Como usuário,  
quero ver quanto da minha renda está indo para gastos e quanto está indo para investimentos,  
para entender a qualidade do meu fluxo financeiro.

### Critérios de aceite

- O sistema calcula percentual da renda destinado a gastos.
- O sistema calcula percentual da renda destinado a investimentos.
- O sistema mostra se o fluxo está muito consumido no presente.
- O sistema mostra se existe capacidade de construção de futuro.
- O app gera uma frase interpretativa sobre essa distribuição.

### Resultado esperado

O usuário sente:

> “Agora entendo se meu dinheiro está sendo consumido ou construindo futuro.”

---

## História 2.3 — Considerar entradas anuais

Como usuário,  
quero informar entradas anuais como bônus, décimo terceiro ou renda extraordinária,  
para entender meu fluxo financeiro de forma mais realista.

### Critérios de aceite

- O usuário pode informar entradas anuais.
- O sistema diferencia renda recorrente de renda extraordinária.
- O app mostra impacto anual dessas entradas.
- O sistema evita misturar automaticamente bônus com renda mensal recorrente.
- O app pode interpretar se o usuário depende muito de entradas anuais para investir.

### Resultado esperado

O usuário sente:

> “Agora consigo entender meu fluxo do ano, não só do mês.”

---

## História 2.4 — Receber interpretação do fluxo

Como usuário,  
quero receber uma interpretação simples do meu fluxo financeiro,  
para entender o que os números significam.

### Critérios de aceite

- O app gera uma frase interpretativa com base no fluxo.
- A frase deve indicar um insight relevante.
- A linguagem deve ser simples, humana e não culpabilizante.
- A interpretação pode mencionar:
  - fluxo pressionado
  - boa capacidade de aporte
  - dependência de bônus
  - baixa alocação para futuro
  - excesso de consumo no presente
- A frase deve conectar número com consciência.

### Resultado esperado

O usuário sente:

> “O Aurora não só mostra números; ele me ajuda a entender.”

---

# 5. Épico 3 — Organização de Projetos de Vida

---

## História 3.1 — Criar projetos de vida

Como usuário,  
quero criar projetos de vida,  
para organizar o que meu dinheiro deve construir.

### Critérios de aceite

- O usuário pode criar um ou mais projetos.
- Cada projeto deve ter pelo menos um nome.
- Campos opcionais podem incluir:
  - prazo
  - valor alvo
  - valor atual
  - aporte mensal
  - prioridade
- O app sugere exemplos de projetos.
- O projeto pode ser criado mesmo com informações incompletas.

### Resultado esperado

O usuário sente:

> “Consigo tirar meus objetivos da cabeça e organizar em um lugar.”

---

## História 3.2 — Definir prazo e valor alvo

Como usuário,  
quero definir prazo e valor alvo para meus projetos,  
para entender quanto preciso construir.

### Critérios de aceite

- O usuário pode informar valor alvo.
- O usuário pode informar prazo desejado.
- O sistema calcula quanto falta para o objetivo.
- O sistema pode estimar aporte mensal necessário.
- O app informa se os dados ainda são aproximados.
- O usuário pode editar prazo e valor depois.

### Resultado esperado

O usuário sente:

> “Agora sei o tamanho financeiro do meu projeto.”

---

## História 3.3 — Informar valor já investido

Como usuário,  
quero informar quanto já tenho investido em cada projeto,  
para entender meu progresso atual.

### Critérios de aceite

- O usuário pode informar valor atual por projeto.
- O sistema calcula progresso percentual.
- O sistema mostra quanto falta para atingir a meta.
- O valor pode ser ajustado manualmente.
- O app não exige conexão com conta ou corretora nessa fase.

### Resultado esperado

O usuário sente:

> “Agora vejo quanto já avancei.”

---

## História 3.4 — Definir aporte mensal por projeto

Como usuário,  
quero definir um aporte mensal para cada projeto,  
para conectar meu fluxo financeiro aos meus objetivos.

### Critérios de aceite

- O usuário pode informar aporte mensal planejado.
- O sistema relaciona aporte mensal ao fluxo disponível.
- O sistema sinaliza se o aporte total dos projetos é maior que a capacidade de aporte.
- O app mostra impacto do aporte no progresso do projeto.
- O usuário pode ajustar aportes depois.

### Resultado esperado

O usuário sente:

> “Agora meu fluxo mensal está conectado aos meus objetivos.”

---

## História 3.5 — Priorizar projetos

Como usuário,  
quero priorizar meus projetos,  
para saber onde direcionar meu dinheiro primeiro.

### Critérios de aceite

- O usuário pode marcar prioridade dos projetos.
- O sistema sugere foco quando há muitos projetos.
- O app indica quando algum projeto prioritário está sem aporte.
- A priorização influencia a próxima ação.
- A priorização não bloqueia a existência de outros projetos.

### Resultado esperado

O usuário sente:

> “Agora sei onde focar primeiro.”

---

# 6. Épico 4 — Reservatórios de Vida Financeira

---

## História 4.1 — Criar reservatório Segurança

Como usuário,  
quero visualizar minha reserva de segurança como um reservatório,  
para entender minha tranquilidade financeira atual.

### Critérios de aceite

- O reservatório Segurança existe como padrão.
- O usuário pode informar valor atual.
- O usuário pode informar ou receber sugestão de valor alvo.
- O valor alvo pode ser baseado em meses de gastos.
- O sistema mostra progresso percentual.
- O app explica a função emocional da segurança: tranquilidade e proteção.

### Resultado esperado

O usuário sente:

> “Agora entendo minha proteção financeira atual.”

---

## História 4.2 — Criar reservatório Liberdade

Como usuário,  
quero visualizar minha liberdade financeira como um reservatório,  
para entender minha construção de longo prazo.

### Critérios de aceite

- O reservatório Liberdade existe como padrão.
- O usuário pode informar valor atual.
- O usuário pode informar uma meta de longo prazo.
- O sistema mostra progresso.
- O app explica que liberdade financeira é construção progressiva.
- O app evita promessas irreais de independência financeira rápida.

### Resultado esperado

O usuário sente:

> “Agora vejo minha liberdade futura como algo construível.”

---

## História 4.3 — Transformar projetos em reservatórios personalizados

Como usuário,  
quero transformar meus projetos de vida em reservatórios,  
para acompanhar meu progresso com mais significado.

### Critérios de aceite

- Todo projeto pode virar reservatório.
- O reservatório herda:
  - nome
  - prazo
  - valor alvo
  - valor atual
  - aporte mensal
- O sistema mostra progresso visual.
- O app conecta o reservatório a segurança, autonomia ou liberdade.
- O usuário entende a função daquele reservatório.

### Resultado esperado

O usuário sente:

> “Meu dinheiro está construindo algo que importa para mim.”

---

## História 4.4 — Ver progresso dos reservatórios

Como usuário,  
quero ver o progresso de cada reservatório,  
para sentir evolução e manter motivação.

### Critérios de aceite

- Cada reservatório mostra valor atual.
- Cada reservatório mostra valor alvo.
- Cada reservatório mostra percentual de progresso.
- Cada reservatório mostra aporte mensal.
- Cada reservatório pode exibir status:
  - em construção
  - em atenção
  - no ritmo
  - concluído
- O app gera uma mensagem interpretativa por reservatório.

### Resultado esperado

O usuário sente:

> “Consigo ver minha evolução de forma concreta.”

---

## História 4.5 — Conectar fluxo aos reservatórios

Como usuário,  
quero ver quanto do meu fluxo mensal está indo para cada reservatório,  
para entender se meus objetivos estão recebendo energia financeira suficiente.

### Critérios de aceite

- O sistema soma aportes planejados por reservatório.
- O sistema compara aportes com capacidade de investimento mensal.
- O sistema indica reservatórios sem aporte.
- O sistema indica se o fluxo está bem distribuído.
- A próxima ação pode ser baseada em reservatório sem aporte.

### Resultado esperado

O usuário sente:

> “Agora entendo se meu dinheiro está alimentando meus objetivos.”

---

# 7. Épico 5 — Score de Inteligência Financeira

---

## História 5.1 — Visualizar score de inteligência financeira

Como usuário,  
quero ver meu score de inteligência financeira,  
para entender meu momento atual sem ser julgado pela minha riqueza.

### Critérios de aceite

- O score não comunica riqueza, status ou performance absoluta.
- O score representa evolução de inteligência financeira.
- O app explica o significado do score.
- O score deve ser apresentado como espelho, não como julgamento.
- O usuário consegue entender que pode evoluir o score com pequenas ações.

### Resultado esperado

O usuário sente:

> “Esse score me ajuda a entender minha evolução, não me comparar.”

---

## História 5.2 — Entender fatores do score

Como usuário,  
quero entender quais fatores influenciam meu score,  
para saber onde posso evoluir.

### Critérios de aceite

- O app mostra fatores positivos.
- O app mostra fatores de atenção.
- Cada fator tem explicação simples.
- Os fatores estão relacionados a:
  - fluxo
  - organização
  - reservatórios
  - comportamento
  - evolução
- O app evita linguagem de culpa.

### Resultado esperado

O usuário sente:

> “Agora sei o que está fortalecendo ou dificultando minha evolução.”

---

## História 5.3 — Receber explicação humana do score

Como usuário,  
quero receber uma explicação humana do meu score,  
para compreender minha relação com dinheiro com mais clareza.

### Critérios de aceite

- O app gera uma explicação textual.
- A explicação deve conectar score a comportamento e fluxo.
- A explicação deve ser curta e útil.
- A explicação deve evitar termos técnicos desnecessários.
- A explicação deve apontar uma direção, não apenas descrever.

### Resultado esperado

O usuário sente:

> “O Aurora traduziu minha situação de um jeito que eu entendi.”

---

## História 5.4 — Receber recomendações ligadas ao score

Como usuário,  
quero receber recomendações relacionadas ao meu score,  
para saber como melhorar minha inteligência financeira.

### Critérios de aceite

- O sistema gera até 3 recomendações.
- As recomendações são baseadas nos principais fatores de atenção.
- As recomendações são simples e acionáveis.
- As recomendações não devem parecer cobrança.
- Pelo menos uma recomendação deve poder virar próxima ação.

### Resultado esperado

O usuário sente:

> “Tenho caminhos claros para evoluir.”

---

# 8. Épico 6 — Próxima Ação e Nudges

---

## História 6.1 — Receber uma próxima ação prioritária

Como usuário,  
quero receber uma única próxima ação recomendada,  
para saber qual passo tomar primeiro.

### Critérios de aceite

- O app mostra apenas uma próxima ação principal.
- A ação é contextual.
- A ação é simples.
- A ação está conectada a fluxo, projeto, reservatório ou comportamento.
- A ação tem um CTA claro.

### Resultado esperado

O usuário sente:

> “Sei exatamente por onde começar.”

---

## História 6.2 — Entender por que aquela ação foi sugerida

Como usuário,  
quero entender por que uma ação foi recomendada,  
para confiar na orientação do Aurora.

### Critérios de aceite

- A ação tem explicação curta.
- A explicação conecta a ação ao diagnóstico.
- A explicação evita tom de cobrança.
- A explicação mostra benefício esperado.
- A linguagem é humana e clara.

### Resultado esperado

O usuário sente:

> “Essa recomendação faz sentido para mim.”

---

## História 6.3 — Marcar ação como concluída

Como usuário,  
quero marcar uma ação como concluída,  
para acompanhar meu progresso e manter consistência.

### Critérios de aceite

- O usuário consegue marcar ação como concluída.
- O sistema registra conclusão localmente.
- A ação concluída influencia histórico ou comportamento futuro.
- O app dá feedback positivo leve.
- O feedback evita gamificação excessiva.

### Resultado esperado

O usuário sente:

> “Estou avançando com pequenos passos.”

---

## História 6.4 — Receber nudges leves

Como usuário,  
quero receber nudges leves e contextuais,  
para manter consciência e consistência sem me sentir pressionado.

### Critérios de aceite

- Nudges são contextuais.
- Nudges não usam culpa.
- Nudges não usam comparação social.
- Nudges são curtos e úteis.
- Nudges podem aparecer em fluxo, reservatórios, score ou revisão.
- Nudges incentivam reflexão ou micro ação.

### Resultado esperado

O usuário sente:

> “O Aurora me ajuda a lembrar do que importa sem me pressionar.”

---

# 9. Priorização das histórias para o primeiro ciclo

## Primeiríssimo ciclo de implementação

1. História 1.1 — Informar dados iniciais mínimos
2. História 2.1 — Visualizar entradas, gastos e investimentos mensais
3. História 2.2 — Mostrar percentual do fluxo direcionado para gastos e investimentos
4. História 3.1 — Criar projetos de vida
5. História 4.1 — Criar reservatório Segurança
6. História 4.2 — Criar reservatório Liberdade
7. História 5.1 — Visualizar score de inteligência financeira
8. História 6.1 — Receber uma próxima ação prioritária

---

## Segundo ciclo de implementação

1. História 1.2 — Pular perguntas incertas
2. História 3.2 — Definir prazo e valor alvo
3. História 3.3 — Informar valor já investido
4. História 3.4 — Definir aporte mensal por projeto
5. História 4.3 — Transformar projetos em reservatórios personalizados
6. História 5.2 — Entender fatores do score
7. História 6.2 — Entender por que aquela ação foi sugerida

---

## Terceiro ciclo de implementação

1. História 2.3 — Considerar entradas anuais
2. História 2.4 — Receber interpretação do fluxo
3. História 3.5 — Priorizar projetos
4. História 4.4 — Ver progresso dos reservatórios
5. História 4.5 — Conectar fluxo aos reservatórios
6. História 5.3 — Receber explicação humana do score
7. História 5.4 — Receber recomendações ligadas ao score
8. História 6.3 — Marcar ação como concluída
9. História 6.4 — Receber nudges leves

---

# 10. Definição final

As histórias de usuário do MVP Aurora devem garantir que o produto entregue sua primeira transformação real:

> O usuário sai de uma sensação de ansiedade e desorganização financeira para uma primeira experiência de clareza, direção e inteligência financeira.

O foco não é entregar muitas funcionalidades.

O foco é entregar uma primeira experiência memorável de consciência financeira sem planilhas.

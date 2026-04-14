import { type AssistantResponse } from "../types/assistant-v2";

export const assistantQuickSuggestionsMock = [
  "Como melhorar meu score este mês?",
  "Qual objetivo está mais em risco?",
  "O que posso ajustar hoje sem esforço grande?",
];

export const assistantResponseMockV2: AssistantResponse = {
  id: "a1",
  type: "next_action",
  title: "Próxima ação recomendada",
  message:
    "Você não aportou este mês. Isso pode atrasar seu plano. Faça um aporte mínimo hoje para manter o ritmo e proteger sua consistência.",
  suggestedActions: [
    "Aportar R$ 300 na reserva",
    "Ativar lembrete de aporte no dia do salário",
    "Revisar limite semanal de lazer",
  ],
  requiresConfirmation: true,
};

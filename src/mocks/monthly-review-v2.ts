import { type MonthlyReviewState } from "../types/monthly-review-v2";

export const monthlyReviewMockV2: MonthlyReviewState = {
  monthLabel: "Março 2026",
  currentStep: "what_worked",
  completedSteps: ["emotional_check_in", "budget_control_perception"],
  answers: {
    emotional_check_in: "Me senti mais calmo nas últimas 2 semanas.",
    budget_control_perception: "Tenho noção dos gastos, mas ainda sem rotina diária.",
    what_worked: "Evitei compras por impulso durante a semana.",
  },
  completionPercent: 40,
};

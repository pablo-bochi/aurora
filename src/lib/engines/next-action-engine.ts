import type { AuroraUserState } from "../../types/aurora-user-state";

export interface NextAction {
  title: string;
  message: string;
  ctaLabel: string;
  actionKey: string;
}

export function calculateNextAction(state: AuroraUserState): NextAction {
  const activityRate = state.behavior.totalDaysInMonth > 0 ? state.behavior.daysActiveInMonth / state.behavior.totalDaysInMonth : 0;
  const totalContribution = state.goals.reduce((acc, goal) => acc + goal.contributionThisMonth, 0);
  const hasAboveLimit = state.limits.some((limit) => limit.status === "above");
  const expenseTrendPercent = state.monthly.expenseTrendPercent ?? 0;
  const reviewStale = typeof state.behavior.monthlyReviewDaysAgo === "number" ? state.behavior.monthlyReviewDaysAgo > 60 : true;

  // Rule block: priority 1 - low usage consistency.
  if (activityRate < 0.2) {
    return {
      title: "Recuperar clareza",
      message: "Registre seus gastos por 3 dias seguidos para recuperar visibilidade ainda esta semana.",
      ctaLabel: "Começar agora",
      actionKey: "track_expenses_3_days",
    };
  }

  // Rule block: priority 2 - high expense pressure or limit overflow.
  if (hasAboveLimit || expenseTrendPercent >= 15) {
    return {
      title: "Reduzir pressão imediata",
      message: "Revise gastos variáveis e defina um teto simples para esta semana.",
      ctaLabel: "Revisar agora",
      actionKey: "review_variable_spending",
    };
  }

  // Rule block: priority 3 - missing contributions to goals.
  if (state.goals.length > 0 && totalContribution === 0) {
    return {
      title: "Proteger seu objetivo principal",
      message: "Faça um aporte no objetivo prioritário para não perder ritmo neste mês.",
      ctaLabel: "Aportar agora",
      actionKey: "contribute_priority_goal",
    };
  }

  // Rule block: priority 4 - stale monthly review.
  if (reviewStale) {
    return {
      title: "Fechar o ciclo",
      message: "Conclua sua revisão mensal em menos de 10 minutos para capturar aprendizados.",
      ctaLabel: "Fazer revisão",
      actionKey: "complete_monthly_review",
    };
  }

  // Rule block: default maintenance.
  return {
    title: "Manter ritmo",
    message: "Mantenha sua rotina: acompanhe gastos, proteja limites e continue aportando nos objetivos.",
    ctaLabel: "Continuar",
    actionKey: "maintain_routine",
  };
}

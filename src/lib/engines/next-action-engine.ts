import type { AuroraUserState } from "../../types/aurora-user-state";
import { buildAuroraReservoirs } from "../aurora-mvp-adapter";
import type { AuroraMvpState } from "../../types/aurora-mvp";

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

export function calculateMvpNextAction(state: AuroraMvpState | null): NextAction {
  if (!state?.hasCompletedInitialSnapshot) {
    return {
      title: "Completar ponto de partida",
      message: "Complete seu snapshot inicial para gerar uma leitura mais clara do seu fluxo financeiro.",
      ctaLabel: "Completar snapshot",
      actionKey: "complete_initial_snapshot",
    };
  }

  if (state.projects.length === 0) {
    return {
      title: "Dar destino ao fluxo",
      message: "Crie um primeiro projeto de vida para dar destino ao seu fluxo financeiro.",
      ctaLabel: "Criar projeto",
      actionKey: "create_first_life_project",
    };
  }

  const security = buildAuroraReservoirs(state).find((reservoir) => reservoir.type === "security");
  if (security && security.progressPercent < 30) {
    return {
      title: "Fortalecer Segurança",
      message: "Defina um aporte mensal para fortalecer sua Segurança e reduzir vulnerabilidade a imprevistos.",
      ctaLabel: "Definir aporte",
      actionKey: "define_security_contribution",
    };
  }

  if (state.flow.monthlyInvestments === 0) {
    return {
      title: "Começar construção de futuro",
      message: "Escolha um valor pequeno para começar a alimentar um reservatório neste mês.",
      ctaLabel: "Escolher valor",
      actionKey: "start_small_contribution",
    };
  }

  if (state.flow.monthlyBalance > 0) {
    return {
      title: "Direcionar saldo positivo",
      message: "Direcione parte do seu saldo para um projeto de vida antes que ele vire sobra sem destino.",
      ctaLabel: "Direcionar saldo",
      actionKey: "allocate_positive_balance",
    };
  }

  return {
    title: "Manter rotina",
    message: "Mantenha sua rotina: acompanhe o fluxo, proteja seus reservatórios e preserve aportes possíveis.",
    ctaLabel: "Continuar",
    actionKey: "maintain_mvp_routine",
  };
}

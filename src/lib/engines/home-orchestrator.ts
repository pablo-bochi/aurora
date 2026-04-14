import type { AuroraUserState, GoalState } from "../../types/aurora-user-state";
import { calculateFinancialHealthScoreV3 } from "./financial-health-engine";
import { calculateJourneyState } from "./journey-engine";
import { calculateNextAction } from "./next-action-engine";

export interface HomeSnapshot {
  diagnosisTitle: string;
  diagnosisMessage: string;
  diagnosisDate: string;
  totalScore: number;
  band: string;
  summary: {
    income: number;
    expenses: number;
    balance: number;
    expenseTrendPercent?: number;
  };
  priorityGoal?: GoalState;
  alerts: string[];
  nextAction: {
    title: string;
    message: string;
    ctaLabel: string;
    actionKey: string;
  };
}

function getPriorityGoal(goals: GoalState[]): GoalState | undefined {
  return goals.find((goal) => goal.isPriority) ?? goals[0];
}

function buildAlerts(state: AuroraUserState): string[] {
  const alerts: string[] = [];
  const totalContribution = state.goals.reduce((acc, goal) => acc + goal.contributionThisMonth, 0);
  const expenseTrendPercent = state.monthly.expenseTrendPercent ?? 0;
  const aboveLimits = state.limits.filter((limit) => limit.status === "above");
  const nearLimits = state.limits.filter((limit) => limit.status === "near");

  // Rule block: contribution lapse alert.
  if (totalContribution === 0 && state.goals.length > 0) {
    alerts.push("Você não aportou este mês. Isso pode atrasar seu plano.");
  }

  // Rule block: expense acceleration alert.
  if (expenseTrendPercent >= 8) {
    alerts.push(`Seus gastos variáveis subiram ${expenseTrendPercent}% em relação ao período anterior.`);
  }

  // Rule block: limit pressure alert.
  if (aboveLimits.length > 0) {
    alerts.push("Há categorias acima do limite definido neste ciclo.");
  } else if (nearLimits.length > 0) {
    alerts.push("Há categorias próximas do limite e exigindo atenção.");
  }

  return alerts.slice(0, 3);
}

function buildDiagnosisMessage(state: AuroraUserState): string {
  const totalContribution = state.goals.reduce((acc, goal) => acc + goal.contributionThisMonth, 0);
  const activityRate = state.behavior.totalDaysInMonth > 0 ? state.behavior.daysActiveInMonth / state.behavior.totalDaysInMonth : 0;
  const expenseTrendPercent = state.monthly.expenseTrendPercent ?? 0;

  // Rule block: positive balance with low cadence and no contribution.
  if (state.monthly.balance > 0 && activityRate < 0.35 && totalContribution === 0) {
    return "Você está com saldo positivo, mas perdeu consistência no acompanhamento e nos aportes deste mês.";
  }

  // Rule block: positive balance with expense acceleration.
  if (state.monthly.balance > 0 && expenseTrendPercent >= 8) {
    return "Seu mês está saudável, mas os gastos variáveis aceleraram e pedem ajuste preventivo.";
  }

  // Rule block: negative balance.
  if (state.monthly.balance < 0) {
    return "Seu mês pede reorganização imediata para reduzir pressão nas saídas variáveis.";
  }

  return "Sua base financeira está saudável, com espaço para ganhar mais consistência operacional.";
}

export function buildHomeSnapshot(state: AuroraUserState): HomeSnapshot {
  const score = calculateFinancialHealthScoreV3(state);
  const journey = calculateJourneyState(state, score);
  const nextAction = calculateNextAction(state);

  return {
    diagnosisTitle: `Diagnóstico em 30 segundos · ${journey.currentStage}`,
    diagnosisMessage: buildDiagnosisMessage(state),
    diagnosisDate: state.monthly.periodRef,
    totalScore: score.totalScore,
    band: score.band.label,
    summary: {
      income: state.monthly.income,
      expenses: state.monthly.expenses,
      balance: state.monthly.balance,
      expenseTrendPercent: state.monthly.expenseTrendPercent,
    },
    priorityGoal: getPriorityGoal(state.goals),
    alerts: buildAlerts(state),
    nextAction,
  };
}

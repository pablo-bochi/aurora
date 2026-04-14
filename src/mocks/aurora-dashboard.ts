import type { GoalProgress } from "../types/objectives-v2";
import { buildHomeSnapshot } from "../lib/home-orchestrator";
import { calculateFinancialHealthScore } from "../lib/financial-health-engine";
import { auroraUserStateMock } from "./aurora-user-state";

export type DashboardAlert = {
  id: string;
  level: "info" | "warning";
  message: string;
};

const snapshot = buildHomeSnapshot(auroraUserStateMock);
const score = calculateFinancialHealthScore(auroraUserStateMock);

const statusMap: Record<string, GoalProgress["status"]> = {
  on_track: "on_track",
  attention: "at_risk",
  delayed: "delayed",
  completed: "completed",
};

const priorityGoal: GoalProgress | null = snapshot.priorityGoal
  ? {
      id: snapshot.priorityGoal.id,
      title: snapshot.priorityGoal.name,
      category: "other",
      targetAmount: snapshot.priorityGoal.targetAmount,
      currentAmount: snapshot.priorityGoal.currentAmount,
      monthlyContribution:
        snapshot.priorityGoal.expectedMonthlyContribution ?? snapshot.priorityGoal.contributionThisMonth,
      targetDate: snapshot.priorityGoal.targetDate.length === 7 ? `${snapshot.priorityGoal.targetDate}-01` : snapshot.priorityGoal.targetDate,
      status: statusMap[snapshot.priorityGoal.status] ?? "at_risk",
      motivation: "Objetivo priorizado para manter evolução consistente.",
    }
  : null;

export const auroraDashboardMock = {
  userName: "Pat",
  diagnosis: {
    title: snapshot.diagnosisTitle,
    message: snapshot.diagnosisMessage,
  },
  monthlySummary: {
    income: snapshot.summary.income,
    expenses: snapshot.summary.expenses,
    balance: snapshot.summary.balance,
  },
  goals: priorityGoal ? [priorityGoal] : [],
  alerts: snapshot.alerts.map((message, index) => ({
    id: `al${index + 1}`,
    level: message.includes("não aportou") || message.includes("acima do limite") ? "warning" : "info",
    message,
  })) as DashboardAlert[],
  nextAction: snapshot.nextAction.message,
  score,
};

export interface MonthlySummary {
  periodRef: string;
  income: number;
  expenses: number;
  balance: number;
  expenseTrendPercent?: number;
}

export type LimitRiskStatus = "safe" | "near" | "above";

export interface LimitStatus {
  id: string;
  category: string;
  usedAmount: number;
  limitAmount: number;
  usedPercent: number;
  status: LimitRiskStatus;
}

export type GoalHealthStatus = "on_track" | "attention" | "delayed" | "completed";

export interface GoalState {
  id: string;
  name: string;
  currentAmount: number;
  targetAmount: number;
  targetDate: string;
  progressPercent: number;
  status: GoalHealthStatus;
  contributionThisMonth: number;
  expectedMonthlyContribution?: number;
  isPriority?: boolean;
}

export interface BehaviorState {
  daysActiveInMonth: number;
  totalDaysInMonth: number;
  alertsResolved: number;
  alertsIgnored: number;
  monthlyReviewCompletedAt?: string | null;
  monthlyReviewDaysAgo?: number | null;
}

export interface AuroraUserState {
  monthly: MonthlySummary;
  limits: LimitStatus[];
  goals: GoalState[];
  behavior: BehaviorState;
}

import type { AuroraUserState } from "../types/aurora-user-state";

export const auroraUserStateMock: AuroraUserState = {
  monthly: {
    periodRef: "2026-03",
    income: 18200,
    expenses: 15390,
    balance: 2810,
    expenseTrendPercent: 14,
  },
  limits: [
    {
      id: "1",
      category: "Lazer",
      usedAmount: 1640,
      limitAmount: 1800,
      usedPercent: 91,
      status: "near",
    },
    {
      id: "2",
      category: "Restaurantes",
      usedAmount: 980,
      limitAmount: 900,
      usedPercent: 109,
      status: "above",
    },
  ],
  goals: [
    {
      id: "goal-1",
      name: "Reserva de emergência",
      currentAmount: 11200,
      targetAmount: 30000,
      targetDate: "2026-12",
      progressPercent: 37,
      status: "on_track",
      contributionThisMonth: 0,
      expectedMonthlyContribution: 1200,
      isPriority: true,
    },
    {
      id: "goal-2",
      name: "Viagem",
      currentAmount: 3500,
      targetAmount: 9000,
      targetDate: "2026-11",
      progressPercent: 39,
      status: "attention",
      contributionThisMonth: 0,
    },
  ],
  behavior: {
    daysActiveInMonth: 11,
    totalDaysInMonth: 30,
    alertsResolved: 3,
    alertsIgnored: 2,
    monthlyReviewCompletedAt: "2026-01-10",
    monthlyReviewDaysAgo: 45,
  },
};

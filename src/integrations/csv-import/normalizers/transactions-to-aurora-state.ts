import type { AuroraUserState } from "../../../types/aurora-user-state";
import type { NormalizedTransaction } from "../csv-types";

function getMonthRef(date: string): string {
  return date.slice(0, 7);
}

function compareMonthRef(a: string, b: string): number {
  return a.localeCompare(b);
}

function calculateMonthlySummary(transactions: NormalizedTransaction[]): AuroraUserState["monthly"] {
  if (transactions.length === 0) {
    return {
      periodRef: new Date().toISOString().slice(0, 7),
      income: 0,
      expenses: 0,
      balance: 0,
      expenseTrendPercent: undefined,
    };
  }

  const months = Array.from(new Set(transactions.map((tx) => getMonthRef(tx.date)))).sort(compareMonthRef);
  const latestMonth = months[months.length - 1];
  const previousMonth = months.length > 1 ? months[months.length - 2] : undefined;

  const operationalInMonth = (monthRef: string): NormalizedTransaction[] =>
    transactions.filter(
      (tx) =>
        getMonthRef(tx.date) === monthRef &&
        !tx.isInvoicePayment &&
        !tx.isInternalTransfer
    );

  const latestTransactions = operationalInMonth(latestMonth);
  const previousTransactions = previousMonth ? operationalInMonth(previousMonth) : [];

  const income = latestTransactions
    .filter((tx) => tx.direction === "income")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const expenses = latestTransactions
    .filter((tx) => tx.direction === "expense")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const previousExpenses = previousTransactions
    .filter((tx) => tx.direction === "expense")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const expenseTrendPercent =
    previousExpenses > 0 ? Math.round(((expenses - previousExpenses) / previousExpenses) * 100) : undefined;

  return {
    periodRef: latestMonth,
    income: Number(income.toFixed(2)),
    expenses: Number(expenses.toFixed(2)),
    balance: Number((income - expenses).toFixed(2)),
    expenseTrendPercent,
  };
}

export function transactionsToAuroraUserState(transactions: NormalizedTransaction[]): AuroraUserState {
  const monthly = calculateMonthlySummary(transactions);

  return {
    monthly,
    limits: [],
    goals: [],
    behavior: {
      daysActiveInMonth: 0,
      totalDaysInMonth: 30,
      alertsResolved: 0,
      alertsIgnored: 0,
      monthlyReviewCompletedAt: null,
      monthlyReviewDaysAgo: null,
    },
  };
}

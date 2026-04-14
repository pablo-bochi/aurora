export type MonthlyReviewStep =
  | "emotional_check_in"
  | "budget_control_perception"
  | "what_worked"
  | "what_did_not_work"
  | "next_month_plan";

export type MonthlyReviewState = {
  monthLabel: string;
  currentStep: MonthlyReviewStep;
  completedSteps: MonthlyReviewStep[];
  answers: Partial<Record<MonthlyReviewStep, string>>;
  completionPercent: number;
};

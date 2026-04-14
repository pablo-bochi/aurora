export type GoalStatus = "on_track" | "at_risk" | "delayed" | "completed";

export type GoalProgress = {
  id: string;
  title: string;
  category: "emergency_fund" | "travel" | "housing" | "education" | "retirement" | "other";
  targetAmount: number;
  currentAmount: number;
  monthlyContribution: number;
  targetDate: string;
  status: GoalStatus;
  motivation: string;
};

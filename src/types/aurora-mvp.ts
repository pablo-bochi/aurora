export interface FlowInput {
  monthlyIncome: number;
  monthlyExpenses: number;
  monthlyInvestments: number;
  monthlyBalance: number;
  annualExtraIncome?: number;
  annualExtraExpenses?: number;
}

export type ReservoirType = "security" | "autonomy" | "freedom";

export interface LifeProjectInput {
  id: string;
  name: string;
  type: ReservoirType;
  targetAmount?: number;
  currentAmount?: number;
  monthlyContribution?: number;
  targetDate?: string;
  priority?: number;
}

export interface AuroraMvpState {
  flow: FlowInput;
  projects: LifeProjectInput[];
  hasCompletedInitialSnapshot: boolean;
  currentEmergencyReserve?: number;
  currentInvestments?: number;
  createdAt: string;
  updatedAt: string;
}

export interface FlowRatios {
  expenseRate: number;
  investmentRate: number;
  balanceRate: number;
}

export interface AuroraReservoir {
  id: string;
  name: string;
  type: ReservoirType;
  currentAmount: number;
  targetAmount?: number;
  monthlyContribution: number;
  targetDate?: string;
  priority?: number;
  progressPercent: number;
  message: string;
  source: "default" | "project";
}

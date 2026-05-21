import type { AuroraUserState, GoalState } from "../types/aurora-user-state";
import type { AuroraMvpState, AuroraReservoir, FlowInput, FlowRatios, LifeProjectInput } from "../types/aurora-mvp";

function clampPercent(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function safeNumber(value: number | undefined): number {
  return Number.isFinite(value) ? Math.max(0, Number(value)) : 0;
}

export function calculateFlowRatios(flow: FlowInput): FlowRatios {
  if (flow.monthlyIncome <= 0) {
    return {
      expenseRate: 0,
      investmentRate: 0,
      balanceRate: 0,
    };
  }

  return {
    expenseRate: flow.monthlyExpenses / flow.monthlyIncome,
    investmentRate: flow.monthlyInvestments / flow.monthlyIncome,
    balanceRate: flow.monthlyBalance / flow.monthlyIncome,
  };
}

export function getFlowInterpretation(flow: FlowInput): string {
  const ratios = calculateFlowRatios(flow);

  if (flow.monthlyExpenses > flow.monthlyIncome) {
    return "Seu fluxo pede cuidado neste momento: as saídas ficaram acima das entradas.";
  }

  if (flow.monthlyBalance > 0 && ratios.investmentRate < 0.08) {
    return "Existe espaço para transformar parte do saldo em construção de futuro, no seu ritmo.";
  }

  if (flow.monthlyInvestments > 0) {
    return "Você já direciona parte do seu fluxo para construção de futuro.";
  }

  return "Hoje, a maior parte do seu fluxo está cuidando do presente. O próximo passo pode ser pequeno.";
}

export function buildDefaultSecurityReservoir(state: AuroraMvpState): AuroraReservoir {
  const currentAmount = safeNumber(state.currentEmergencyReserve);
  const targetAmount = safeNumber(state.flow.monthlyExpenses) * 6;
  const progressPercent = targetAmount > 0 ? clampPercent((currentAmount / targetAmount) * 100) : 0;

  return {
    id: "default-security",
    name: "Segurança",
    type: "security",
    currentAmount,
    targetAmount,
    monthlyContribution: 0,
    progressPercent,
    source: "default",
    message: "Sua Segurança é o espaço que protege sua vida de imprevistos e reduz a pressão do presente.",
  };
}

export function buildDefaultFreedomReservoir(state: AuroraMvpState): AuroraReservoir {
  const currentAmount = safeNumber(state.currentInvestments);

  return {
    id: "default-freedom",
    name: "Liberdade",
    type: "freedom",
    currentAmount,
    targetAmount: undefined,
    monthlyContribution: safeNumber(state.flow.monthlyInvestments),
    progressPercent: 0,
    source: "default",
    message: "Sua Liberdade mostra o quanto seu dinheiro já começou a trabalhar por escolhas futuras.",
  };
}

function projectToReservoir(project: LifeProjectInput): AuroraReservoir {
  const currentAmount = safeNumber(project.currentAmount);
  const targetAmount = project.targetAmount && project.targetAmount > 0 ? project.targetAmount : undefined;
  const progressPercent = targetAmount ? clampPercent((currentAmount / targetAmount) * 100) : 0;

  return {
    id: `project-${project.id}`,
    name: project.name,
    type: project.type,
    currentAmount,
    targetAmount,
    monthlyContribution: safeNumber(project.monthlyContribution),
    targetDate: project.targetDate,
    priority: project.priority,
    progressPercent,
    source: "project",
    message: "Este reservatório conecta dinheiro a uma escolha de vida que importa para você.",
  };
}

export function buildAuroraReservoirs(state: AuroraMvpState): AuroraReservoir[] {
  const customReservoirs = state.projects.filter((project) => project.type === "autonomy").map(projectToReservoir);
  return [buildDefaultSecurityReservoir(state), buildDefaultFreedomReservoir(state), ...customReservoirs];
}

function mapProjectToGoal(project: LifeProjectInput): GoalState {
  const currentAmount = safeNumber(project.currentAmount);
  const targetAmount = project.targetAmount && project.targetAmount > 0 ? project.targetAmount : Math.max(currentAmount, 1);
  const contribution = safeNumber(project.monthlyContribution);
  const progressPercent = targetAmount > 0 ? clampPercent((currentAmount / targetAmount) * 100) : 0;

  return {
    id: project.id,
    name: project.name,
    currentAmount,
    targetAmount,
    targetDate: project.targetDate ?? "",
    progressPercent,
    status: progressPercent >= 100 ? "completed" : contribution > 0 ? "on_track" : "attention",
    contributionThisMonth: contribution,
    expectedMonthlyContribution: contribution,
    isPriority: project.priority === 1,
  };
}

export function auroraMvpStateToAuroraUserState(state: AuroraMvpState): AuroraUserState {
  const expenseRate = calculateFlowRatios(state.flow).expenseRate;

  return {
    monthly: {
      periodRef: new Date().toISOString().slice(0, 7),
      income: state.flow.monthlyIncome,
      expenses: state.flow.monthlyExpenses,
      balance: state.flow.monthlyBalance,
      expenseTrendPercent: undefined,
    },
    limits: [
      {
        id: "mvp-expense-rate",
        category: "Gastos mensais",
        usedAmount: state.flow.monthlyExpenses,
        limitAmount: state.flow.monthlyIncome,
        usedPercent: clampPercent(expenseRate * 100),
        status: expenseRate > 1 ? "above" : expenseRate >= 0.85 ? "near" : "safe",
      },
    ],
    goals: state.projects.map(mapProjectToGoal),
    behavior: {
      daysActiveInMonth: state.hasCompletedInitialSnapshot ? 1 : 0,
      totalDaysInMonth: 30,
      alertsResolved: 0,
      alertsIgnored: 0,
      monthlyReviewCompletedAt: null,
      monthlyReviewDaysAgo: null,
    },
  };
}

export function createAuroraMvpState(input: {
  flow: Omit<FlowInput, "monthlyBalance"> & { monthlyBalance?: number };
  currentEmergencyReserve?: number;
  currentInvestments?: number;
  projects?: LifeProjectInput[];
}): AuroraMvpState {
  const now = new Date().toISOString();
  const monthlyBalance =
    input.flow.monthlyBalance ?? input.flow.monthlyIncome - input.flow.monthlyExpenses - input.flow.monthlyInvestments;

  return {
    flow: {
      ...input.flow,
      monthlyBalance,
    },
    projects: input.projects ?? [],
    hasCompletedInitialSnapshot: true,
    currentEmergencyReserve: safeNumber(input.currentEmergencyReserve),
    currentInvestments: safeNumber(input.currentInvestments),
    createdAt: now,
    updatedAt: now,
  };
}

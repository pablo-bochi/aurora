import type { AuroraUserState, GoalState } from "../../types/aurora-user-state";
import type {
  FinancialHealthScoreV3,
  PsychologicalProfile,
  PsychologicalProfileType,
  ScoreBand,
  ScoreDimension,
  ScoreFactor,
} from "../../types/financial-health-v3";

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function buildBand(score: number): ScoreBand {
  if (score < 40) {
    return {
      key: "critical",
      label: "Crítico",
      min: 0,
      max: 39,
      message: "Você precisa de reorganização de base para reduzir pressão.",
      nextAction: "Registrar gastos essenciais por 7 dias.",
    };
  }

  if (score < 60) {
    return {
      key: "attention",
      label: "Atenção",
      min: 40,
      max: 59,
      message: "Há capacidade financeira, mas falta constância operacional.",
      nextAction: "Definir teto semanal de gastos variáveis.",
    };
  }

  if (score < 80) {
    return {
      key: "progress",
      label: "Em progresso",
      min: 60,
      max: 79,
      message: "Sua base evolui com clareza e disciplina em consolidação.",
      nextAction: "Aportar no objetivo prioritário no início do mês.",
    };
  }

  return {
    key: "stable",
    label: "Estável",
    min: 80,
    max: 100,
    message: "Estrutura e consistência estão em nível sólido.",
    nextAction: "Escalar aportes para acelerar projetos de vida.",
  };
}

function sumGoalContributions(goals: GoalState[]): number {
  return goals.reduce((acc, goal) => acc + goal.contributionThisMonth, 0);
}

function contributionToImpact(value: number): ScoreFactor["impact"] {
  if (value > 0) {
    return "positive";
  }
  if (value < 0) {
    return "negative";
  }
  return "neutral";
}

function buildFactor(
  id: string,
  title: string,
  description: string,
  scoreContribution: number,
  dimension: ScoreFactor["dimension"]
): ScoreFactor {
  return {
    id,
    title,
    description,
    scoreContribution,
    impact: contributionToImpact(scoreContribution),
    dimension,
  };
}

function calculateStructuralDimension(state: AuroraUserState): ScoreDimension {
  let score = 60;
  const factors: ScoreFactor[] = [];
  const { balance, expenseTrendPercent } = state.monthly;
  const totalContribution = sumGoalContributions(state.goals);

  // Rule block: monthly balance quality.
  if (balance > 0) {
    score += 12;
    factors.push(buildFactor("monthly_balance_positive", "Saldo mensal", "Entradas acima de saídas no mês atual.", 12, "structural"));
  } else if (balance === 0) {
    score -= 2;
    factors.push(buildFactor("monthly_balance_zero", "Saldo mensal", "O mês fechou sem sobra financeira.", -2, "structural"));
  } else {
    score -= 15;
    factors.push(buildFactor("monthly_balance_negative", "Saldo mensal", "As saídas superaram as entradas no mês atual.", -15, "structural"));
  }

  // Rule block: expense trend pressure.
  if (typeof expenseTrendPercent === "number") {
    if (expenseTrendPercent >= 15) {
      score -= 10;
      factors.push(buildFactor("expense_trend_high", "Tendência de gastos", `Os gastos subiram ${expenseTrendPercent}% no período.`, -10, "structural"));
    } else if (expenseTrendPercent >= 8) {
      score -= 6;
      factors.push(buildFactor("expense_trend_medium", "Tendência de gastos", `Os gastos subiram ${expenseTrendPercent}% no período.`, -6, "structural"));
    } else if (expenseTrendPercent <= -5) {
      score += 5;
      factors.push(buildFactor("expense_trend_improving", "Tendência de gastos", `Os gastos caíram ${Math.abs(expenseTrendPercent)}% no período.`, 5, "structural"));
    }
  }

  const nearCount = state.limits.filter((limit) => limit.status === "near").length;
  const aboveCount = state.limits.filter((limit) => limit.status === "above").length;

  // Rule block: limits risk.
  if (nearCount === 0 && aboveCount === 0 && state.limits.length > 0) {
    score += 5;
    factors.push(buildFactor("limits_no_risk", "Risco de limites", "Nenhuma categoria está em zona de pressão.", 5, "structural"));
  } else if (nearCount > 0 || aboveCount > 0) {
    const penalty = Math.min(15, nearCount * 4 + aboveCount * 7);
    score -= penalty;
    factors.push(buildFactor("limits_risk_detected", "Risco de limites", `${nearCount} categoria(s) próximas e ${aboveCount} acima do limite.`, -penalty, "structural"));
  }

  const positiveGoals = state.goals.filter((goal) => goal.status === "on_track" || goal.status === "completed").length;
  const delayedGoals = state.goals.filter((goal) => goal.status === "delayed").length;

  // Rule block: goals progress.
  if (positiveGoals > 0) {
    const bonus = Math.min(8, positiveGoals * 3);
    score += bonus;
    factors.push(buildFactor("goals_progress_good", "Progresso dos objetivos", `${positiveGoals} objetivo(s) seguem no ritmo esperado.`, bonus, "structural"));
  }

  if (delayedGoals > 0) {
    const penalty = Math.min(10, delayedGoals * 5);
    score -= penalty;
    factors.push(buildFactor("goals_progress_delayed", "Progresso dos objetivos", `${delayedGoals} objetivo(s) em atraso relevante.`, -penalty, "structural"));
  }

  // Rule block: contribution presence this month.
  if (state.goals.length > 0) {
    if (totalContribution > 0) {
      score += 6;
      factors.push(buildFactor("goal_contribution_present", "Aportes", "Houve aporte em pelo menos um objetivo neste mês.", 6, "structural"));
    } else {
      score -= 8;
      factors.push(buildFactor("goal_contribution_missing", "Aportes", "Nenhum objetivo recebeu aporte neste mês.", -8, "structural"));
    }
  }

  return {
    key: "structural",
    label: "Estrutural",
    weight: 0.5,
    score: clampScore(score),
    factors,
  };
}

function calculateBehavioralDimension(state: AuroraUserState): ScoreDimension {
  let score = 50;
  const factors: ScoreFactor[] = [];
  const totalContribution = sumGoalContributions(state.goals);
  const activityRate = state.behavior.totalDaysInMonth > 0 ? state.behavior.daysActiveInMonth / state.behavior.totalDaysInMonth : 0;
  const totalAlerts = state.behavior.alertsResolved + state.behavior.alertsIgnored;
  const resolvedRate = totalAlerts > 0 ? state.behavior.alertsResolved / totalAlerts : 0;

  // Rule block: usage consistency.
  if (activityRate >= 0.6) {
    score += 10;
    factors.push(buildFactor("usage_consistency_good", "Consistência de uso", `Uso do app em ${state.behavior.daysActiveInMonth} de ${state.behavior.totalDaysInMonth} dias.`, 10, "behavioral"));
  } else if (activityRate >= 0.35) {
    score += 3;
    factors.push(buildFactor("usage_consistency_moderate", "Consistência de uso", `Uso do app em ${state.behavior.daysActiveInMonth} de ${state.behavior.totalDaysInMonth} dias.`, 3, "behavioral"));
  } else if (activityRate < 0.2) {
    score -= 8;
    factors.push(buildFactor("usage_consistency_low", "Consistência de uso", `Uso em apenas ${state.behavior.daysActiveInMonth} de ${state.behavior.totalDaysInMonth} dias.`, -8, "behavioral"));
  } else {
    score -= 4;
    factors.push(buildFactor("usage_consistency_irregular", "Consistência de uso", "A frequência de acompanhamento ainda é irregular.", -4, "behavioral"));
  }

  // Rule block: alert reaction quality.
  if (totalAlerts > 0) {
    if (resolvedRate >= 0.7) {
      score += 6;
      factors.push(buildFactor("alert_reaction_good", "Reação aos alertas", `Ações realizadas em ${Math.round(resolvedRate * 100)}% dos alertas.`, 6, "behavioral"));
    } else if (resolvedRate >= 0.4) {
      score += 2;
      factors.push(buildFactor("alert_reaction_moderate", "Reação aos alertas", "Parte dos alertas foi tratada no mês.", 2, "behavioral"));
    } else {
      score -= 6;
      factors.push(buildFactor("alert_reaction_low", "Reação aos alertas", "Poucos alertas geraram ação prática.", -6, "behavioral"));
    }
  }

  // Rule block: contribution consistency.
  if (state.goals.length > 0) {
    if (totalContribution > 0) {
      score += 5;
      factors.push(buildFactor("contribution_consistency_present", "Consistência de aportes", "Houve continuidade de aporte neste ciclo.", 5, "behavioral"));
    } else {
      score -= 7;
      factors.push(buildFactor("contribution_consistency_missing", "Consistência de aportes", "Os objetivos ficaram sem reforço neste mês.", -7, "behavioral"));
    }
  }

  // Rule block: monthly review recency.
  const reviewDaysAgo = state.behavior.monthlyReviewDaysAgo;
  if (typeof reviewDaysAgo === "number") {
    if (reviewDaysAgo <= 35) {
      score += 5;
      factors.push(buildFactor("monthly_review_recent", "Revisão mensal", `Última revisão concluída há ${reviewDaysAgo} dias.`, 5, "behavioral"));
    } else if (reviewDaysAgo <= 60) {
      factors.push(buildFactor("monthly_review_ok", "Revisão mensal", "A revisão existe, mas já não está tão atual.", 0, "behavioral"));
    } else {
      score -= 5;
      factors.push(buildFactor("monthly_review_stale", "Revisão mensal", `Última revisão concluída há ${reviewDaysAgo} dias.`, -5, "behavioral"));
    }
  } else {
    score -= 5;
    factors.push(buildFactor("monthly_review_missing", "Revisão mensal", "Ainda não houve revisão mensal recente.", -5, "behavioral"));
  }

  return {
    key: "behavioral",
    label: "Comportamental",
    weight: 0.3,
    score: clampScore(score),
    factors,
  };
}

function inferPsychologicalProfile(state: AuroraUserState, structuralScore: number, behavioralScore: number): PsychologicalProfileType {
  const activityRate = state.behavior.totalDaysInMonth > 0 ? state.behavior.daysActiveInMonth / state.behavior.totalDaysInMonth : 0;
  const totalContribution = sumGoalContributions(state.goals);
  const reviewStale = typeof state.behavior.monthlyReviewDaysAgo === "number" ? state.behavior.monthlyReviewDaysAgo > 60 : true;
  const nearCount = state.limits.filter((limit) => limit.status === "near").length;
  const aboveCount = state.limits.filter((limit) => limit.status === "above").length;
  const expenseTrendPercent = state.monthly.expenseTrendPercent ?? 0;

  // Rule block: avoider.
  if (behavioralScore < 40 && activityRate < 0.2 && reviewStale && totalContribution === 0) {
    return "avoider";
  }

  // Rule block: impulsive.
  if (expenseTrendPercent >= 15 || aboveCount > 0 || nearCount >= 2) {
    return "impulsive";
  }

  // Rule block: disciplined.
  if (structuralScore >= 70 && behavioralScore >= 70 && totalContribution > 0) {
    return "disciplined";
  }

  // Rule block: inconsistent.
  if (structuralScore >= 50 && behavioralScore >= 40 && behavioralScore <= 60) {
    return "inconsistent";
  }

  return "builder";
}

function getPsychologicalScore(profile: PsychologicalProfileType): number {
  const scoreMap: Record<PsychologicalProfileType, number> = {
    avoider: 35,
    impulsive: 45,
    inconsistent: 55,
    builder: 68,
    disciplined: 82,
  };
  return scoreMap[profile];
}

function getPsychologicalProfile(profile: PsychologicalProfileType): PsychologicalProfile {
  const map: Record<PsychologicalProfileType, PsychologicalProfile> = {
    avoider: {
      type: "avoider",
      label: "Evitador",
      summary: "Você tende a se afastar do acompanhamento financeiro quando a rotina aperta.",
      strengths: ["Consegue reagir rápido quando decide agir", "Consegue simplificar prioridades"],
      risks: ["Baixa visibilidade do mês", "Acúmulo de decisões atrasadas"],
      recommendedAction: "Comece com um ritual curto e fixo de acompanhamento semanal.",
    },
    impulsive: {
      type: "impulsive",
      label: "Impulsivo",
      summary: "Seu padrão recente sugere decisões de consumo mais reativas do que planejadas.",
      strengths: ["Agilidade para executar", "Energia para resolver urgências"],
      risks: ["Oscilação de gastos", "Maior pressão de limite"],
      recommendedAction: "Defina regra de pausa para compras não planejadas.",
    },
    inconsistent: {
      type: "inconsistent",
      label: "Inconsistente",
      summary: "Você tem capacidade financeira, mas ainda não consolidou um sistema repetível.",
      strengths: ["Consegue ter bons ciclos", "Mostra evolução quando cria rotina"],
      risks: ["Quebra de sequência de aportes", "Oscilação no controle mensal"],
      recommendedAction: "Automatize aportes e revisão para reduzir dependência de motivação.",
    },
    disciplined: {
      type: "disciplined",
      label: "Disciplinado",
      summary: "Você mantém clareza, rotina e evolução sem depender de esforço excessivo.",
      strengths: ["Consistência alta", "Boa reação a sinais de desvio"],
      risks: ["Acomodar sem revisar otimizações", "Subaproveitar capacidade de aceleração"],
      recommendedAction: "Ajuste metas e alocação para acelerar resultados.",
    },
    builder: {
      type: "builder",
      label: "Construtor",
      summary: "Você está construindo uma base melhor e já mostra sinais reais de evolução.",
      strengths: ["Trajetória positiva", "Capacidade de melhorar mês a mês"],
      risks: ["Perder ritmo em períodos de pressão", "Demorar para corrigir desvios"],
      recommendedAction: "Preserve rotina simples e priorize continuidade.",
    },
  };

  return map[profile];
}

function getRecommendationMap(): Record<string, string> {
  return {
    expense_trend_high: "Defina um teto semanal para lazer e compras não essenciais até estabilizar seu ritmo.",
    expense_trend_medium: "Acompanhe os gastos variáveis nesta semana para evitar que o aumento vire padrão.",
    limits_risk_detected: "Revise categorias próximas do limite e reduza decisões não planejadas nesta semana.",
    goal_contribution_missing: "Agende aporte automático para o objetivo principal no dia da renda.",
    contribution_consistency_missing: "Retome o hábito de aportar mesmo com valores menores para preservar continuidade.",
    usage_consistency_low: "Crie uma rotina de 3 minutos por dia para registrar ou revisar gastos.",
    usage_consistency_irregular: "Escolha um horário fixo da semana para revisar seu dinheiro com menos esforço.",
    monthly_review_stale: "Conclua sua revisão mensal para transformar o último ciclo em aprendizado prático.",
    monthly_review_missing: "Faça sua primeira revisão mensal para ganhar clareza sobre o que precisa mudar.",
    alert_reaction_low: "Trate os alertas mais importantes primeiro para evitar perda gradual de controle.",
    goals_progress_delayed: "Reavalie prazo ou aporte dos objetivos atrasados antes que a distância aumente.",
    monthly_balance_negative: "Reduza saídas não essenciais para estabilizar o mês antes de acelerar objetivos.",
  };
}

function generateRecommendations(factors: ScoreFactor[]): string[] {
  const map = getRecommendationMap();
  const negativeFactors = factors
    .filter((factor) => factor.scoreContribution < 0)
    .sort((a, b) => Math.abs(b.scoreContribution) - Math.abs(a.scoreContribution));
  const recommendations: string[] = [];

  for (const factor of negativeFactors) {
    const suggestion = map[factor.id];
    if (suggestion && !recommendations.includes(suggestion)) {
      recommendations.push(suggestion);
    }
    if (recommendations.length === 3) {
      break;
    }
  }

  if (recommendations.length === 0) {
    recommendations.push("Mantenha a rotina: acompanhe gastos, proteja limites e continue aportando nos objetivos.");
  }

  return recommendations;
}

export function calculateFinancialHealthScoreV3(state: AuroraUserState): FinancialHealthScoreV3 {
  const structural = calculateStructuralDimension(state);
  const behavioral = calculateBehavioralDimension(state);
  const profileType = inferPsychologicalProfile(state, structural.score, behavioral.score);
  const psychologicalScore = getPsychologicalScore(profileType);
  const psychologicalProfile = getPsychologicalProfile(profileType);
  const psychological: ScoreDimension = {
    key: "psychological",
    label: "Psicológica",
    weight: 0.2,
    score: psychologicalScore,
    factors: [
      buildFactor("psychological_profile", "Perfil psicológico", psychologicalProfile.summary, 0, "psychological"),
    ],
  };

  // Rule block: weighted score composition (50/30/20) with clamp.
  const totalScore = clampScore(structural.score * 0.5 + behavioral.score * 0.3 + psychological.score * 0.2);
  const band = buildBand(totalScore);
  const allFactors = [...structural.factors, ...behavioral.factors, ...psychological.factors];

  return {
    totalScore,
    band,
    dimensions: [structural, behavioral, psychological],
    psychologicalProfile,
    recommendations: generateRecommendations(allFactors),
    updatedAt: new Date().toISOString().slice(0, 10),
  };
}

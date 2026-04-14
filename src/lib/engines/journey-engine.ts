import type { AuroraUserState } from "../../types/aurora-user-state";
import type { JourneyStage, JourneyState } from "../../types/journey";
import type { FinancialHealthScoreV3 } from "../../types/financial-health-v3";

function getBaseStage(totalScore: number): JourneyStage {
  if (totalScore < 40) {
    return "awareness";
  }
  if (totalScore < 60) {
    return "organization";
  }
  if (totalScore < 70) {
    return "intention";
  }
  if (totalScore < 85) {
    return "consistency";
  }
  return "evolution";
}

function getOrderedStages(): JourneyStage[] {
  return ["awareness", "organization", "intention", "consistency", "evolution"];
}

function getNextStage(stage: JourneyStage): JourneyStage | null {
  const orderedStages = getOrderedStages();
  const index = orderedStages.indexOf(stage);
  return orderedStages[index + 1] ?? null;
}

function getJourneyCopy(stage: JourneyStage): { headline: string; description: string; ctaLabel: string } {
  if (stage === "awareness") {
    return {
      headline: "Você está começando a enxergar sua vida financeira com mais clareza.",
      description: "O foco agora é observar seu dinheiro com mais frequência para sair do piloto automático.",
      ctaLabel: "Registrar gastos",
    };
  }

  if (stage === "organization") {
    return {
      headline: "Você já entende melhor seus gastos e está entrando em fase de organização.",
      description: "O próximo passo é transformar clareza em estrutura simples para reduzir desperdícios.",
      ctaLabel: "Revisar limites",
    };
  }

  if (stage === "intention") {
    return {
      headline: "Você começou a conectar o presente aos seus objetivos.",
      description: "Agora é hora de transformar intenção em ritmo com metas e aportes consistentes.",
      ctaLabel: "Aportar no objetivo",
    };
  }

  if (stage === "consistency") {
    return {
      headline: "Você já construiu base e está entrando em uma rotina mais previsível.",
      description: "O desafio agora é manter constância sem depender de esforço excessivo.",
      ctaLabel: "Concluir revisão mensal",
    };
  }

  return {
    headline: "Você está operando com clareza, consistência e evolução.",
    description: "Agora o foco é proteger o que já funciona e continuar avançando com leveza.",
    ctaLabel: "Manter rotina",
  };
}

function getJourneyProgress(stage: JourneyStage): number {
  const orderedStages = getOrderedStages();
  const index = orderedStages.indexOf(stage);
  return Math.round((index / (orderedStages.length - 1)) * 100);
}

export function calculateJourneyState(state: AuroraUserState, score: FinancialHealthScoreV3): JourneyState {
  let stage = getBaseStage(score.totalScore);
  const hasGoals = state.goals.length > 0;
  const totalContribution = state.goals.reduce((acc, goal) => acc + goal.contributionThisMonth, 0);
  const reviewStale = typeof state.behavior.monthlyReviewDaysAgo === "number" ? state.behavior.monthlyReviewDaysAgo > 60 : true;

  // Rule block: no goals cap cannot advance beyond organization.
  if (score.totalScore >= 60 && !hasGoals) {
    stage = "organization";
  }

  // Rule block: no contribution + stale review cap cannot advance beyond intention.
  if (score.totalScore >= 70 && totalContribution === 0 && reviewStale) {
    stage = "intention";
  }

  // Rule block: consistency override for middle-high score with healthy context.
  if (score.totalScore >= 68 && score.totalScore <= 75 && totalContribution > 0 && !reviewStale && hasGoals) {
    stage = "consistency";
  }

  const copy = getJourneyCopy(stage);
  const nextStage = getNextStage(stage);

  return {
    currentStage: stage,
    headline: copy.headline,
    description: copy.description,
    nextStage,
    cta: copy.ctaLabel,
    progressPercent: getJourneyProgress(stage),
    stageStartedAt: new Date().toISOString().slice(0, 10),
    nextRecommendedAction: copy.description,
    message: copy.description,
    milestones: [],
  };
}

import type { JourneyStage, JourneyState } from "../types/journey";
export { calculateJourneyState } from "./engines/journey-engine";

const stageOrder: JourneyStage[] = ["awareness", "organization", "intention", "consistency", "evolution"];

const stageLabels: Record<JourneyStage, string> = {
  awareness: "Consciência",
  organization: "Organização",
  intention: "Intenção",
  consistency: "Consistência",
  evolution: "Evolução",
};

export function getJourneyStageLabel(stage: JourneyStage): string {
  return stageLabels[stage];
}

export function getJourneyProgressByStage(stage: JourneyStage): number {
  const index = stageOrder.indexOf(stage);
  return Math.round((index / (stageOrder.length - 1)) * 100);
}

export function getJourneyNextStage(stage: JourneyStage): JourneyStage | null {
  const index = stageOrder.indexOf(stage);
  return stageOrder[index + 1] ?? null;
}

export function enrichJourneyState(state: JourneyState): JourneyState {
  return {
    ...state,
    progressPercent: Math.max(state.progressPercent, getJourneyProgressByStage(state.currentStage)),
  };
}

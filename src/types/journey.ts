export type JourneyStage =
  | "awareness"
  | "organization"
  | "intention"
  | "consistency"
  | "evolution";

export type JourneyMilestone = {
  id: string;
  stage: JourneyStage;
  title: string;
  description: string;
  reachedAt: string;
};

export type JourneyState = {
  currentStage: JourneyStage;
  headline: string;
  description: string;
  nextStage: JourneyStage | null;
  cta: string;
  progressPercent: number;
  stageStartedAt: string;
  nextRecommendedAction: string;
  message: string;
  milestones: JourneyMilestone[];
};

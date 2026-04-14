export type ScoreDimensionKey = "structural" | "behavioral" | "psychological";

export type ScoreBand = {
  key: "critical" | "attention" | "progress" | "stable";
  label: string;
  min: number;
  max: number;
  message: string;
  nextAction: string;
};

export type ScoreFactor = {
  id: string;
  title: string;
  description: string;
  impact: "positive" | "neutral" | "negative";
  scoreContribution: number;
  dimension: ScoreDimensionKey;
};

export type ScoreDimension = {
  key: ScoreDimensionKey;
  label: string;
  weight: number;
  score: number;
  factors: ScoreFactor[];
};

export type PsychologicalProfileType =
  | "avoider"
  | "impulsive"
  | "inconsistent"
  | "disciplined"
  | "builder";

export type PsychologicalProfile = {
  type: PsychologicalProfileType;
  label: string;
  summary: string;
  strengths: string[];
  risks: string[];
  recommendedAction: string;
};

export type FinancialHealthScoreV3 = {
  totalScore: number;
  band: ScoreBand;
  dimensions: ScoreDimension[];
  psychologicalProfile: PsychologicalProfile;
  recommendations: string[];
  updatedAt: string;
};

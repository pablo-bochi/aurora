import type { CSSProperties } from "react";

import { InsightBadge } from "./InsightBadge";
import type { MonthlyReviewStep } from "../../types/monthly-review-v2";

type MonthlyReflectionCardProps = {
  monthLabel: string;
  completionPercent: number;
  currentStep: MonthlyReviewStep;
};

const stepLabels: Record<MonthlyReviewStep, string> = {
  emotional_check_in: "Check-in emocional",
  budget_control_perception: "Percepção de controle do orçamento",
  what_worked: "O que funcionou",
  what_did_not_work: "O que não funcionou",
  next_month_plan: "Plano para o próximo mês",
};

const cardStyle: CSSProperties = {
  background: "#ffffff",
  border: "1px solid #dbe5ef",
  borderRadius: 18,
  padding: 18,
  display: "grid",
  gap: 10,
  boxShadow: "0 8px 20px rgba(16, 35, 63, 0.04)",
};

export function MonthlyReflectionCard({ monthLabel, completionPercent, currentStep }: MonthlyReflectionCardProps) {
  return (
    <article style={cardStyle}>
      <h3 style={{ margin: 0, color: "#162a46", fontSize: "1.05rem" }}>Revisão de {monthLabel}</h3>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
        <p style={{ margin: 0, color: "#395472" }}>Progresso da revisão</p>
        <InsightBadge label={`${completionPercent}% concluído`} tone="info" />
      </div>
      <div style={{ width: "100%", height: 8, borderRadius: 999, background: "#e8eff7" }}>
        <div
          style={{
            width: `${completionPercent}%`,
            height: "100%",
            borderRadius: 999,
            background: "linear-gradient(90deg, #2d6fb1, #5c8fc4)",
          }}
        />
      </div>
      <p style={{ margin: 0, color: "#516985", fontSize: "0.9rem" }}>Etapa atual: {stepLabels[currentStep]}</p>
    </article>
  );
}

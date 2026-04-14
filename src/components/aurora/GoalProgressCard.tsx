import type { CSSProperties } from "react";

import { InsightBadge } from "./InsightBadge";
import type { GoalProgress, GoalStatus } from "../../types/objectives-v2";

type GoalProgressCardProps = {
  goal: GoalProgress;
};

const statusMap: Record<GoalStatus, { label: string; tone: "neutral" | "warning" | "positive" }> = {
  on_track: { label: "No ritmo", tone: "positive" },
  at_risk: { label: "Em risco", tone: "warning" },
  delayed: { label: "Atrasado", tone: "warning" },
  completed: { label: "Concluído", tone: "positive" },
};

const cardStyle: CSSProperties = {
  background: "#ffffff",
  border: "1px solid #dbe5ef",
  borderRadius: 18,
  padding: 18,
  display: "grid",
  gap: 10,
  boxShadow: "0 6px 16px rgba(16, 35, 63, 0.04)",
};

const barStyle: CSSProperties = {
  width: "100%",
  height: 8,
  borderRadius: 999,
  background: "#e8eff7",
};

export function GoalProgressCard({ goal }: GoalProgressCardProps) {
  const progress = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));

  return (
    <article style={cardStyle}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
        <h3 style={{ margin: 0, color: "#162a46", fontSize: "1rem" }}>{goal.title}</h3>
        <InsightBadge label={statusMap[goal.status].label} tone={statusMap[goal.status].tone} />
      </div>
      <div style={barStyle}>
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            borderRadius: 999,
            background: "linear-gradient(90deg, #2d6fb1, #5c8fc4)",
          }}
        />
      </div>
      <p style={{ margin: 0, color: "#304a67", fontWeight: 600 }}>
        R$ {goal.currentAmount.toLocaleString("pt-BR")} de R$ {goal.targetAmount.toLocaleString("pt-BR")} ({progress}%)
      </p>
      <p style={{ margin: 0, color: "#4f6480", fontSize: "0.9rem" }}>
        Aporte mensal planejado: R$ {goal.monthlyContribution.toLocaleString("pt-BR")}
      </p>
      <p style={{ margin: 0, color: "#5f748e", fontSize: "0.86rem" }}>{goal.motivation}</p>
    </article>
  );
}

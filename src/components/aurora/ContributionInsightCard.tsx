import type { CSSProperties } from "react";

import type { GoalProgress } from "../../types/objectives-v2";

type ContributionInsightCardProps = {
  goals: GoalProgress[];
};

const cardStyle: CSSProperties = {
  background: "#f7fbff",
  border: "1px solid #d0e0ef",
  borderRadius: 18,
  padding: 18,
  display: "grid",
  gap: 9,
};

export function ContributionInsightCard({ goals }: ContributionInsightCardProps) {
  const zeroContribution = goals.filter((goal) => goal.monthlyContribution === 0).length;
  const totalContribution = goals.reduce((sum, goal) => sum + goal.monthlyContribution, 0);

  return (
    <article style={cardStyle}>
      <h3 style={{ margin: 0, color: "#143356", fontSize: "1rem" }}>Leitura de aportes do mês</h3>
      <p style={{ margin: 0, color: "#37516d" }}>
        Aportes planejados: R$ {totalContribution.toLocaleString("pt-BR")}
      </p>
      {zeroContribution > 0 ? (
        <p style={{ margin: 0, color: "#7a4f14", lineHeight: 1.5 }}>
          {zeroContribution} objetivo(s) sem aporte. Regularizar isso agora preserva o prazo dos seus projetos.
        </p>
      ) : (
        <p style={{ margin: 0, color: "#1b6037" }}>Todos os objetivos têm aporte ativo. Mantenha esse ritmo.</p>
      )}
    </article>
  );
}

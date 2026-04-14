import type { CSSProperties } from "react";

import { DiagnosisCard } from "../components/aurora/DiagnosisCard";
import { GoalProgressCard } from "../components/aurora/GoalProgressCard";
import { NextActionCard } from "../components/aurora/NextActionCard";
import { ScoreCard } from "../components/aurora/ScoreCard";
import { SectionHeader } from "../components/aurora/SectionHeader";
import { auroraDashboardMock } from "../mocks/aurora-dashboard";

const pageStyle: CSSProperties = {
  minHeight: "100vh",
  background: "linear-gradient(180deg, #f7fafd 0%, #eef3f8 100%)",
  padding: "20px 14px 30px",
};

const contentStyle: CSSProperties = {
  maxWidth: 760,
  margin: "0 auto",
  display: "grid",
  gap: 16,
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

const metricItemStyle: CSSProperties = {
  background: "#f8fbff",
  border: "1px solid #e2ebf5",
  borderRadius: 12,
  padding: "10px 12px",
  display: "grid",
  gap: 4,
};

export default function HomePageV2() {
  const { diagnosis, monthlySummary, goals, alerts, nextAction, score, userName } = auroraDashboardMock;
  const priorityGoal = goals[0];

  return (
    <main style={pageStyle}>
      <div style={contentStyle}>
        <SectionHeader
          title={`Resumo executivo · ${userName}`}
          subtitle="Clareza rápida do seu mês: posição atual, riscos imediatos e um único próximo passo."
        />

        <DiagnosisCard title={diagnosis.title} message={diagnosis.message} updatedAt={score.updatedAt} />

        <ScoreCard score={score.totalScore} bandLabel={score.band.label} message={score.band.message} />

        <section style={cardStyle} aria-label="MonthlySummaryCard">
          <h3 style={{ margin: 0, color: "#152c49", fontSize: "1rem" }}>Resumo financeiro do mês</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 8 }}>
            <div style={metricItemStyle}>
              <span style={{ color: "#5b708b", fontSize: "0.78rem" }}>Entradas</span>
              <strong style={{ color: "#183454" }}>R$ {monthlySummary.income.toLocaleString("pt-BR")}</strong>
            </div>
            <div style={metricItemStyle}>
              <span style={{ color: "#5b708b", fontSize: "0.78rem" }}>Saídas</span>
              <strong style={{ color: "#183454" }}>R$ {monthlySummary.expenses.toLocaleString("pt-BR")}</strong>
            </div>
            <div style={metricItemStyle}>
              <span style={{ color: "#5b708b", fontSize: "0.78rem" }}>Saldo</span>
              <strong style={{ color: monthlySummary.balance >= 0 ? "#1b6037" : "#8a2231" }}>
                R$ {monthlySummary.balance.toLocaleString("pt-BR")}
              </strong>
            </div>
          </div>
        </section>

        <section style={cardStyle} aria-label="GoalsCard">
          <h3 style={{ margin: 0, color: "#152c49", fontSize: "1rem" }}>Objetivo prioritário</h3>
          {priorityGoal ? (
            <GoalProgressCard goal={priorityGoal} />
          ) : (
            <p style={{ margin: 0, color: "#405975", lineHeight: 1.5 }}>
              Nenhum objetivo ativo encontrado. Definir um objetivo habilita recomendações mais precisas.
            </p>
          )}
        </section>

        <section style={cardStyle} aria-label="AlertsCard">
          <h3 style={{ margin: 0, color: "#152c49", fontSize: "1rem" }}>Sinais que merecem atenção</h3>
          {alerts.map((alert) => (
            <p
              key={alert.id}
              style={{
                margin: 0,
                color: alert.level === "warning" ? "#7a4f14" : "#3f5873",
                lineHeight: 1.5,
              }}
            >
              {alert.message}
            </p>
          ))}
        </section>

        {/* TODO: Integrar confirmação da ação com persistência local/remota de hábitos. */}
        <NextActionCard actionText={nextAction} ctaLabel="Começar agora" />
      </div>
    </main>
  );
}

import type { CSSProperties } from "react";

import { InsightBadge } from "../components/aurora/InsightBadge";
import { PsychologicalProfileCard } from "../components/aurora/PsychologicalProfileCard";
import { ScoreBreakdownCard } from "../components/aurora/ScoreBreakdownCard";
import { SectionHeader } from "../components/aurora/SectionHeader";
import { financialHealthMockV3 } from "../mocks/financial-health-v3";

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

export default function FinancialHealthPageV3() {
  const scoreSummary =
    financialHealthMockV3.totalScore >= 80
      ? "Faixa estável: estrutura e constância em nível alto."
      : financialHealthMockV3.totalScore >= 60
        ? "Faixa em progresso: há evolução consistente com pontos específicos para acelerar."
        : financialHealthMockV3.totalScore >= 40
          ? "Faixa de atenção: capacidade existe, mas faltam rotinas mais previsíveis."
          : "Faixa crítica: é necessário reduzir pressão estrutural antes de acelerar objetivos.";

  const factors = financialHealthMockV3.dimensions.flatMap((dimension) =>
    dimension.factors.map((factor) => ({ ...factor, dimensionLabel: dimension.label }))
  );

  return (
    <main style={pageStyle}>
      <div style={contentStyle}>
        <SectionHeader
          title={`Saúde financeira · ${financialHealthMockV3.totalScore}/100`}
          subtitle={`Resultado calculado por regras em três dimensões: ${financialHealthMockV3.psychologicalProfile.label}.`}
        />

        <section style={cardStyle} aria-label="score header">
          <h3 style={{ margin: 0, color: "#152c49", fontSize: "1rem" }}>Como interpretar seu score</h3>
          <p style={{ margin: 0, color: "#3f5873", lineHeight: 1.55 }}>{scoreSummary}</p>
        </section>

        <ScoreBreakdownCard dimensions={financialHealthMockV3.dimensions} />

        <PsychologicalProfileCard profile={financialHealthMockV3.psychologicalProfile} />

        <section style={cardStyle} aria-label="FactorsList">
          <h3 style={{ margin: 0, color: "#152c49", fontSize: "1rem" }}>Fatores que explicam o resultado</h3>
          {factors.map((factor) => (
            <div key={factor.id} style={{ borderTop: "1px solid #edf2f7", paddingTop: 10, display: "grid", gap: 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center" }}>
                <p style={{ margin: 0, color: "#162a46", fontWeight: 600 }}>{factor.title}</p>
                <InsightBadge
                  label={`${factor.dimensionLabel} · ${factor.scoreContribution > 0 ? "+" : ""}${factor.scoreContribution}`}
                  tone={factor.scoreContribution >= 0 ? "positive" : "warning"}
                />
              </div>
              <p style={{ margin: 0, color: "#4a5f7a", fontSize: "0.92rem", lineHeight: 1.5 }}>{factor.description}</p>
            </div>
          ))}
        </section>

        <section style={cardStyle} aria-label="RecommendationsList">
          <h3 style={{ margin: 0, color: "#152c49", fontSize: "1rem" }}>Recomendações prioritárias</h3>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 8, color: "#3e5874", lineHeight: 1.5 }}>
            {financialHealthMockV3.recommendations.map((recommendation) => (
              <li key={recommendation}>{recommendation}</li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}

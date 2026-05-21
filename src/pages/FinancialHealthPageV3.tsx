import type { CSSProperties } from "react";

import { InsightBadge } from "../components/aurora/InsightBadge";
import { PsychologicalProfileCard } from "../components/aurora/PsychologicalProfileCard";
import { ScoreBreakdownCard } from "../components/aurora/ScoreBreakdownCard";
import { SectionHeader } from "../components/aurora/SectionHeader";
import { getCsvImportSession } from "../integrations/csv-import/csv-import-store";
import { auroraMvpStateToAuroraUserState } from "../lib/aurora-mvp-adapter";
import { loadAuroraMvpState } from "../lib/aurora-mvp-storage";
import { calculateFinancialHealthScoreV3 } from "../lib/engines/financial-health-engine";
import { auroraUserStateMock } from "../mocks/aurora-user-state";

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
  const importSession = getCsvImportSession();
  const mvpState = loadAuroraMvpState();
  const activeState =
    importSession.mode === "imported"
      ? importSession.consolidatedUserState
      : mvpState
        ? auroraMvpStateToAuroraUserState(mvpState)
        : auroraUserStateMock;
  const score = calculateFinancialHealthScoreV3(activeState);

  const scoreSummary =
    score.totalScore >= 80
      ? "Faixa estável: estrutura e constância em nível alto."
      : score.totalScore >= 60
        ? "Faixa em progresso: há evolução consistente com pontos específicos para acelerar."
        : score.totalScore >= 40
          ? "Faixa de atenção: capacidade existe, mas faltam rotinas mais previsíveis."
          : "Faixa crítica: é necessário reduzir pressão estrutural antes de acelerar objetivos.";

  const factors = score.dimensions.flatMap((dimension) =>
    dimension.factors.map((factor) => ({ ...factor, dimensionLabel: dimension.label }))
  );

  return (
    <main style={pageStyle}>
      <div style={contentStyle}>
        <SectionHeader
          title={`Score de Inteligência Financeira · ${score.totalScore}/100`}
          subtitle={`Uma leitura de evolução, não um julgamento. Perfil atual: ${score.psychologicalProfile.label}.`}
        />

        <section style={cardStyle} aria-label="ScoreMeaning">
          <h3 style={{ margin: 0, color: "#152c49", fontSize: "1rem" }}>Um espelho, não uma nota</h3>
          <p style={{ margin: 0, color: "#3f5873", lineHeight: 1.55 }}>
            Seu score não mede riqueza. Ele ajuda você a entender se sua relação com dinheiro está evoluindo de forma
            mais consciente, sustentável e alinhada aos seus objetivos.
          </p>
        </section>

        {importSession.mode === "imported" ? (
          <section style={cardStyle} aria-label="ImportedDataInfo">
            <p style={{ margin: 0, color: "#3f5873", fontSize: "0.9rem" }}>
              Fonte ativa: {importSession.importedFiles.length} arquivo(s) CSV · {importSession.mergedTransactions.length} transações consolidadas.
            </p>
          </section>
        ) : null}

        <section style={cardStyle} aria-label="score header">
          <h3 style={{ margin: 0, color: "#152c49", fontSize: "1rem" }}>Como ler este momento</h3>
          <p style={{ margin: 0, color: "#3f5873", lineHeight: 1.55 }}>{scoreSummary}</p>
        </section>

        <ScoreBreakdownCard dimensions={score.dimensions} />

        <PsychologicalProfileCard profile={score.psychologicalProfile} />

        <section style={cardStyle} aria-label="FactorsList">
          <h3 style={{ margin: 0, color: "#152c49", fontSize: "1rem" }}>Sinais que formam esta leitura</h3>
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
          <h3 style={{ margin: 0, color: "#152c49", fontSize: "1rem" }}>Movimentos possíveis</h3>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 8, color: "#3e5874", lineHeight: 1.5 }}>
            {score.recommendations.map((recommendation) => (
              <li key={recommendation}>{recommendation}</li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}

import type { CSSProperties } from "react";

import { JourneyTimeline } from "../components/aurora/JourneyTimeline";
import { NextActionCard } from "../components/aurora/NextActionCard";
import { SectionHeader } from "../components/aurora/SectionHeader";
import { journeyMock } from "../mocks/journey";
import { getJourneyStageLabel } from "../lib/journey-engine";

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

export default function JourneyPage() {
  return (
    <main style={pageStyle}>
      <div style={contentStyle}>
        <SectionHeader
          title="Jornada financeira"
          subtitle="Você está avançando etapa por etapa. O foco é manter direção, não buscar perfeição."
        />

        <JourneyTimeline currentStage={journeyMock.currentStage} />

        <section style={cardStyle} aria-label="CurrentStageCard">
          <h3 style={{ margin: 0, color: "#152c49", fontSize: "1rem" }}>Fase atual: {getJourneyStageLabel(journeyMock.currentStage)}</h3>
          <p style={{ margin: 0, color: "#405975", lineHeight: 1.5 }}>
            Você já percorreu {journeyMock.progressPercent}% da jornada. Cada rotina consolidada nesta etapa reduz esforço nas próximas fases.
          </p>
          <div style={{ width: "100%", height: 8, borderRadius: 999, background: "#e8eff7" }}>
            <div
              style={{
                width: `${journeyMock.progressPercent}%`,
                height: "100%",
                borderRadius: 999,
                background: "linear-gradient(90deg, #2d6fb1, #5c8fc4)",
              }}
            />
          </div>
        </section>

        <section style={cardStyle} aria-label="JourneyMessageCard">
          <h3 style={{ margin: 0, color: "#152c49", fontSize: "1rem" }}>Mensagem da Aurora</h3>
          <p style={{ margin: 0, color: "#405975", lineHeight: 1.55 }}>{journeyMock.message}</p>
        </section>

        <section aria-label="CTA section">
          <NextActionCard
            title="Ação para destravar a próxima fase"
            actionText={journeyMock.nextRecommendedAction}
            ctaLabel="Avançar na jornada"
          />
        </section>
      </div>
    </main>
  );
}

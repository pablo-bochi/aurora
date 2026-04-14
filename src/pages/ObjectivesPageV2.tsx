import type { CSSProperties } from "react";

import { ContributionInsightCard } from "../components/aurora/ContributionInsightCard";
import { EmptyStateCard } from "../components/aurora/EmptyStateCard";
import { GoalProgressCard } from "../components/aurora/GoalProgressCard";
import { SectionHeader } from "../components/aurora/SectionHeader";
import { goalsMockV2 } from "../mocks/objectives-v2";

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

export default function ObjectivesPageV2() {
  const hasGoals = goalsMockV2.length > 0;

  return (
    <main style={pageStyle}>
      <div style={contentStyle}>
        <SectionHeader
          title="Objetivos de vida"
          subtitle="Conecte sua rotina financeira a projetos concretos para manter direção e motivação no longo prazo."
        />

        {hasGoals ? (
          <section style={{ display: "grid", gap: 10 }} aria-label="goals list">
            {goalsMockV2.map((goal) => (
              <GoalProgressCard key={goal.id} goal={goal} />
            ))}
          </section>
        ) : (
          <EmptyStateCard
            title="Nenhum objetivo criado"
            description="Comece por um projeto simples para conectar seus gastos a uma direção real."
            actionLabel="Criar primeiro objetivo"
          />
        )}

        <ContributionInsightCard goals={goalsMockV2} />

        <section style={cardStyle} aria-label="CTA">
          <h3 style={{ margin: 0, color: "#152c49", fontSize: "1rem" }}>Próximo ajuste recomendado</h3>
          <p style={{ margin: 0, color: "#405975", lineHeight: 1.55 }}>
            Defina um objetivo principal para este mês e proteja o aporte dele antes dos gastos variáveis.
          </p>
          <button
            type="button"
            style={{
              border: "none",
              borderRadius: 12,
              padding: "11px 14px",
              background: "#16385d",
              color: "#ffffff",
              fontWeight: 700,
              justifySelf: "start",
            }}
          >
            Definir prioridade mensal
          </button>
        </section>

        {!hasGoals ? null : (
          <section aria-label="empty state">
            <EmptyStateCard
              title="Quer adicionar outro projeto?"
              description="Metas menores ajudam a sustentar motivação entre objetivos de longo prazo."
              actionLabel="Adicionar objetivo"
            />
          </section>
        )}
      </div>
    </main>
  );
}

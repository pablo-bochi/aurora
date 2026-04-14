import type { CSSProperties } from "react";

import { MonthlyReflectionCard } from "../components/aurora/MonthlyReflectionCard";
import { SectionHeader } from "../components/aurora/SectionHeader";
import { monthlyReviewMockV2 } from "../mocks/monthly-review-v2";
import type { MonthlyReviewStep } from "../types/monthly-review-v2";

const steps: { id: MonthlyReviewStep; label: string }[] = [
  { id: "emotional_check_in", label: "Check-in emocional" },
  { id: "budget_control_perception", label: "Percepção de controle" },
  { id: "what_worked", label: "O que funcionou" },
  { id: "what_did_not_work", label: "O que não funcionou" },
  { id: "next_month_plan", label: "Plano para o próximo mês" },
];

const pageStyle: CSSProperties = {
  minHeight: "100vh",
  background: "linear-gradient(180deg, #f7fafd 0%, #eef3f8 100%)",
  padding: "20px 14px 30px",
};

const contentStyle: CSSProperties = {
  maxWidth: 760,
  margin: "0 auto",
  display: "grid",
  gap: 14,
};

const cardStyle: CSSProperties = {
  background: "#ffffff",
  border: "1px solid #dbe5ef",
  borderRadius: 18,
  padding: 16,
  display: "grid",
  gap: 8,
  boxShadow: "0 8px 20px rgba(16, 35, 63, 0.04)",
};

export default function MonthlyReviewPageV2() {
  return (
    <main style={pageStyle}>
      <div style={contentStyle}>
        <SectionHeader
          title="Revisão mensal guiada"
          subtitle="Fluxo leve e objetivo: capture aprendizados do mês e defina um plano simples para o próximo ciclo."
        />

        <MonthlyReflectionCard
          monthLabel={monthlyReviewMockV2.monthLabel}
          completionPercent={monthlyReviewMockV2.completionPercent}
          currentStep={monthlyReviewMockV2.currentStep}
        />

        {steps.map((step, index) => {
          const value = monthlyReviewMockV2.answers[step.id] ?? "";
          const completed = monthlyReviewMockV2.completedSteps.includes(step.id);
          const isCurrent = monthlyReviewMockV2.currentStep === step.id;

          return (
            <section
              key={step.id}
              style={{
                ...cardStyle,
                padding: isCurrent ? 18 : 14,
                opacity: completed || isCurrent ? 1 : 0.82,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                <h3 style={{ margin: 0, color: "#152c49", fontSize: "0.98rem" }}>
                  {index + 1}. {step.label}
                </h3>
                <span style={{ fontSize: "0.78rem", color: completed ? "#1b6037" : isCurrent ? "#1d4a76" : "#5f748e" }}>
                  {completed ? "Concluída" : isCurrent ? "Etapa atual" : "Próxima"}
                </span>
              </div>

              <textarea
                value={value}
                readOnly
                placeholder="Responder aqui"
                style={{
                  width: "100%",
                  minHeight: isCurrent ? 88 : 64,
                  borderRadius: 12,
                  border: "1px solid #d3deea",
                  padding: 10,
                  resize: "vertical",
                  fontFamily: "inherit",
                  lineHeight: 1.5,
                  background: isCurrent ? "#ffffff" : "#f9fbfe",
                }}
              />
              {/* TODO: Persistir respostas da revisão (localStorage/backend) e liberar edição. */}
            </section>
          );
        })}
      </div>
    </main>
  );
}

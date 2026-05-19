import { type CSSProperties, type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { createAuroraMvpState } from "../lib/aurora-mvp-adapter";
import { saveAuroraMvpState } from "../lib/aurora-mvp-storage";
import type { LifeProjectInput, ReservoirType } from "../types/aurora-mvp";
import { SectionHeader } from "../components/aurora/SectionHeader";

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
  gap: 12,
  boxShadow: "0 8px 20px rgba(16, 35, 63, 0.04)",
};

const fieldStyle: CSSProperties = {
  display: "grid",
  gap: 6,
};

const inputStyle: CSSProperties = {
  border: "1px solid #d3deea",
  borderRadius: 12,
  padding: "10px 12px",
  font: "inherit",
};

const labelStyle: CSSProperties = {
  color: "#304a67",
  fontWeight: 700,
  fontSize: "0.88rem",
};

function toNumber(value: string): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? Math.max(0, parsed) : 0;
}

function createProject(name: string, type: ReservoirType): LifeProjectInput | null {
  const trimmed = name.trim();
  if (!trimmed) {
    return null;
  }

  return {
    id: `project-${Date.now()}`,
    name: trimmed,
    type,
    priority: 1,
  };
}

export default function InitialSnapshotPage() {
  const navigate = useNavigate();
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [monthlyExpenses, setMonthlyExpenses] = useState("");
  const [monthlyInvestments, setMonthlyInvestments] = useState("");
  const [currentEmergencyReserve, setCurrentEmergencyReserve] = useState("");
  const [currentInvestments, setCurrentInvestments] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectType, setProjectType] = useState<ReservoirType>("autonomy");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const firstProject = createProject(projectName, projectType);
    const state = createAuroraMvpState({
      flow: {
        monthlyIncome: toNumber(monthlyIncome),
        monthlyExpenses: toNumber(monthlyExpenses),
        monthlyInvestments: toNumber(monthlyInvestments),
      },
      currentEmergencyReserve: toNumber(currentEmergencyReserve),
      currentInvestments: toNumber(currentInvestments),
      projects: firstProject ? [firstProject] : [],
    });

    saveAuroraMvpState(state);
    navigate("/home");
  };

  return (
    <main style={pageStyle}>
      <div style={contentStyle}>
        <SectionHeader
          title="Snapshot inicial"
          subtitle="Comece com uma visão simples. Você não precisa organizar tudo agora. Informe alguns números aproximados para o Aurora gerar sua primeira leitura."
        />

        <form style={cardStyle} onSubmit={handleSubmit}>
          <label style={fieldStyle}>
            <span style={labelStyle}>Renda mensal aproximada</span>
            <input style={inputStyle} type="number" min="0" value={monthlyIncome} onChange={(event) => setMonthlyIncome(event.target.value)} />
          </label>

          <label style={fieldStyle}>
            <span style={labelStyle}>Gastos mensais aproximados</span>
            <input style={inputStyle} type="number" min="0" value={monthlyExpenses} onChange={(event) => setMonthlyExpenses(event.target.value)} />
          </label>

          <label style={fieldStyle}>
            <span style={labelStyle}>Investimentos mensais</span>
            <input style={inputStyle} type="number" min="0" value={monthlyInvestments} onChange={(event) => setMonthlyInvestments(event.target.value)} />
          </label>

          <label style={fieldStyle}>
            <span style={labelStyle}>Reserva atual</span>
            <input
              style={inputStyle}
              type="number"
              min="0"
              value={currentEmergencyReserve}
              onChange={(event) => setCurrentEmergencyReserve(event.target.value)}
            />
          </label>

          <label style={fieldStyle}>
            <span style={labelStyle}>Investimentos atuais</span>
            <input style={inputStyle} type="number" min="0" value={currentInvestments} onChange={(event) => setCurrentInvestments(event.target.value)} />
          </label>

          <section style={{ borderTop: "1px solid #edf2f7", paddingTop: 12, display: "grid", gap: 10 }}>
            <p style={{ margin: 0, color: "#405975", lineHeight: 1.5 }}>
              Primeiro projeto de vida opcional. Você pode criar e refinar outros projetos depois.
            </p>
            <label style={fieldStyle}>
              <span style={labelStyle}>Nome do projeto</span>
              <input style={inputStyle} value={projectName} onChange={(event) => setProjectName(event.target.value)} placeholder="Ex.: viagem, apartamento, transição de carreira" />
            </label>
            <label style={fieldStyle}>
              <span style={labelStyle}>Tipo</span>
              <select style={inputStyle} value={projectType} onChange={(event) => setProjectType(event.target.value as ReservoirType)}>
                <option value="autonomy">Autonomia</option>
                <option value="security">Segurança</option>
                <option value="freedom">Liberdade</option>
              </select>
            </label>
          </section>

          <button
            type="submit"
            style={{
              border: "none",
              borderRadius: 12,
              padding: "12px 14px",
              background: "#16385d",
              color: "#ffffff",
              fontWeight: 700,
              justifySelf: "start",
              cursor: "pointer",
            }}
          >
            Gerar minha primeira leitura
          </button>
        </form>
      </div>
    </main>
  );
}

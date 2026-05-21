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

const softCardStyle: CSSProperties = {
  ...cardStyle,
  background: "linear-gradient(155deg, #ffffff 0%, #f5f9fd 100%)",
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
          title="Sua primeira leitura"
          subtitle="Comece pequeno. Alguns números aproximados já são suficientes para o Aurora transformar confusão em clareza."
        />

        <section style={softCardStyle} aria-label="SnapshotIntro">
          <h3 style={{ margin: 0, color: "#152c49", fontSize: "1rem" }}>Não precisa estar perfeito</h3>
          <p style={{ margin: 0, color: "#405975", lineHeight: 1.55 }}>
            Esta etapa não é uma planilha. É só um ponto de partida para entender seu fluxo, sua segurança atual e o que
            seu dinheiro pode começar a construir.
          </p>
        </section>

        <form style={cardStyle} onSubmit={handleSubmit}>
          <section style={{ display: "grid", gap: 10 }}>
            <h3 style={{ margin: 0, color: "#152c49", fontSize: "1rem" }}>Seu fluxo de um mês comum</h3>
            <p style={{ margin: 0, color: "#58708c", lineHeight: 1.5, fontSize: "0.9rem" }}>
              Use estimativas tranquilas. Você pode refinar tudo depois.
            </p>
          </section>

          <label style={fieldStyle}>
            <span style={labelStyle}>Quanto costuma entrar por mês?</span>
            <input
              style={inputStyle}
              type="number"
              min="0"
              value={monthlyIncome}
              onChange={(event) => setMonthlyIncome(event.target.value)}
              placeholder="Pode ser aproximado"
            />
          </label>

          <label style={fieldStyle}>
            <span style={labelStyle}>Quanto costuma sair em gastos?</span>
            <input
              style={inputStyle}
              type="number"
              min="0"
              value={monthlyExpenses}
              onChange={(event) => setMonthlyExpenses(event.target.value)}
              placeholder="Essenciais e variáveis juntos"
            />
          </label>

          <label style={fieldStyle}>
            <span style={labelStyle}>Quanto você costuma guardar ou investir?</span>
            <input
              style={inputStyle}
              type="number"
              min="0"
              value={monthlyInvestments}
              onChange={(event) => setMonthlyInvestments(event.target.value)}
              placeholder="Se ainda não sabe, deixe em branco"
            />
          </label>

          <section style={{ borderTop: "1px solid #edf2f7", paddingTop: 12, display: "grid", gap: 10 }}>
            <h3 style={{ margin: 0, color: "#152c49", fontSize: "1rem" }}>O que já está construído</h3>
            <p style={{ margin: 0, color: "#58708c", lineHeight: 1.5, fontSize: "0.9rem" }}>
              Esses valores ajudam o Aurora a criar seus primeiros reservatórios de Segurança e Liberdade.
            </p>
          </section>

          <label style={fieldStyle}>
            <span style={labelStyle}>Quanto existe hoje para emergências?</span>
            <input
              style={inputStyle}
              type="number"
              min="0"
              value={currentEmergencyReserve}
              onChange={(event) => setCurrentEmergencyReserve(event.target.value)}
              placeholder="Sua reserva atual"
            />
          </label>

          <label style={fieldStyle}>
            <span style={labelStyle}>Quanto existe hoje investido?</span>
            <input
              style={inputStyle}
              type="number"
              min="0"
              value={currentInvestments}
              onChange={(event) => setCurrentInvestments(event.target.value)}
              placeholder="Investimentos fora da reserva"
            />
          </label>

          <section style={{ borderTop: "1px solid #edf2f7", paddingTop: 12, display: "grid", gap: 10 }}>
            <h3 style={{ margin: 0, color: "#152c49", fontSize: "1rem" }}>Um destino possível</h3>
            <p style={{ margin: 0, color: "#405975", lineHeight: 1.5 }}>
              Se já existe algo que você quer construir, registre só o nome. Isso pode ser refinado depois.
            </p>
            <label style={fieldStyle}>
              <span style={labelStyle}>Primeiro projeto de vida opcional</span>
              <input style={inputStyle} value={projectName} onChange={(event) => setProjectName(event.target.value)} placeholder="Ex.: viagem, apartamento, transição de carreira" />
            </label>
            <label style={fieldStyle}>
              <span style={labelStyle}>O que esse projeto representa?</span>
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
            Ver minha primeira leitura
          </button>
        </form>
      </div>
    </main>
  );
}

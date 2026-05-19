import { type CSSProperties, type FormEvent, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { createAuroraMvpState } from "../lib/aurora-mvp-adapter";
import { loadAuroraMvpState, saveAuroraMvpState } from "../lib/aurora-mvp-storage";
import type { AuroraMvpState, LifeProjectInput, ReservoirType } from "../types/aurora-mvp";
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

const inputStyle: CSSProperties = {
  border: "1px solid #d3deea",
  borderRadius: 12,
  padding: "10px 12px",
  font: "inherit",
};

function emptyState(): AuroraMvpState {
  return createAuroraMvpState({
    flow: {
      monthlyIncome: 0,
      monthlyExpenses: 0,
      monthlyInvestments: 0,
    },
    projects: [],
  });
}

function toNumber(value: string): number | undefined {
  if (!value.trim()) {
    return undefined;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) ? Math.max(0, parsed) : undefined;
}

function newProject(): LifeProjectInput {
  return {
    id: `project-${Date.now()}`,
    name: "",
    type: "autonomy",
    priority: 1,
  };
}

export default function LifeProjectsPage() {
  const [mvpState, setMvpState] = useState<AuroraMvpState>(() => loadAuroraMvpState() ?? emptyState());
  const [draft, setDraft] = useState<LifeProjectInput>(() => newProject());
  const [editingId, setEditingId] = useState<string | null>(null);

  const sortedProjects = useMemo(
    () => [...mvpState.projects].sort((a, b) => (a.priority ?? 99) - (b.priority ?? 99)),
    [mvpState.projects]
  );

  const persist = (next: AuroraMvpState) => {
    saveAuroraMvpState(next);
    setMvpState(loadAuroraMvpState() ?? next);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!draft.name.trim()) {
      return;
    }

    const normalized: LifeProjectInput = {
      ...draft,
      name: draft.name.trim(),
      targetAmount: toNumber(String(draft.targetAmount ?? "")),
      currentAmount: toNumber(String(draft.currentAmount ?? "")),
      monthlyContribution: toNumber(String(draft.monthlyContribution ?? "")),
      priority: draft.priority ?? sortedProjects.length + 1,
    };

    const projects = editingId
      ? mvpState.projects.map((project) => (project.id === editingId ? normalized : project))
      : [...mvpState.projects, normalized];

    persist({ ...mvpState, projects, hasCompletedInitialSnapshot: mvpState.hasCompletedInitialSnapshot });
    setDraft(newProject());
    setEditingId(null);
  };

  const editProject = (project: LifeProjectInput) => {
    setDraft(project);
    setEditingId(project.id);
  };

  const deleteProject = (projectId: string) => {
    persist({ ...mvpState, projects: mvpState.projects.filter((project) => project.id !== projectId) });
  };

  return (
    <main style={pageStyle}>
      <div style={contentStyle}>
        <SectionHeader
          title="Projetos de vida"
          subtitle="Projetos de vida são destinos para o seu fluxo financeiro. Eles ajudam você a transformar dinheiro em segurança, autonomia e liberdade."
        />

        {!mvpState.hasCompletedInitialSnapshot ? (
          <section style={cardStyle}>
            <p style={{ margin: 0, color: "#405975", lineHeight: 1.5 }}>
              Para conectar projetos ao seu fluxo, complete primeiro o snapshot inicial.
            </p>
            <Link to="/snapshot" style={{ color: "#16385d", fontWeight: 700 }}>
              Completar snapshot inicial
            </Link>
          </section>
        ) : null}

        <form style={cardStyle} onSubmit={handleSubmit}>
          <h3 style={{ margin: 0, color: "#152c49", fontSize: "1rem" }}>{editingId ? "Editar projeto" : "Criar projeto"}</h3>
          <input style={inputStyle} value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} placeholder="Nome do projeto" />
          <select style={inputStyle} value={draft.type} onChange={(event) => setDraft({ ...draft, type: event.target.value as ReservoirType })}>
            <option value="security">Segurança</option>
            <option value="autonomy">Autonomia</option>
            <option value="freedom">Liberdade</option>
          </select>
          <input
            style={inputStyle}
            type="number"
            min="0"
            value={draft.targetAmount ?? ""}
            onChange={(event) => setDraft({ ...draft, targetAmount: toNumber(event.target.value) })}
            placeholder="Valor alvo"
          />
          <input
            style={inputStyle}
            type="number"
            min="0"
            value={draft.currentAmount ?? ""}
            onChange={(event) => setDraft({ ...draft, currentAmount: toNumber(event.target.value) })}
            placeholder="Valor atual"
          />
          <input
            style={inputStyle}
            type="number"
            min="0"
            value={draft.monthlyContribution ?? ""}
            onChange={(event) => setDraft({ ...draft, monthlyContribution: toNumber(event.target.value) })}
            placeholder="Aporte mensal"
          />
          <input
            style={inputStyle}
            type="date"
            value={draft.targetDate ?? ""}
            onChange={(event) => setDraft({ ...draft, targetDate: event.target.value || undefined })}
          />
          <input
            style={inputStyle}
            type="number"
            min="1"
            value={draft.priority ?? ""}
            onChange={(event) => setDraft({ ...draft, priority: toNumber(event.target.value) })}
            placeholder="Prioridade"
          />
          <button type="submit" style={{ border: "none", borderRadius: 12, padding: "11px 14px", background: "#16385d", color: "#fff", fontWeight: 700, justifySelf: "start" }}>
            {editingId ? "Salvar edição" : "Criar projeto"}
          </button>
        </form>

        <section style={{ display: "grid", gap: 10 }}>
          {sortedProjects.length === 0 ? (
            <article style={cardStyle}>
              <p style={{ margin: 0, color: "#405975" }}>Nenhum projeto criado. Crie um primeiro destino para o seu fluxo.</p>
            </article>
          ) : (
            sortedProjects.map((project) => (
              <article key={project.id} style={cardStyle}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "start" }}>
                  <div style={{ display: "grid", gap: 5 }}>
                    <h3 style={{ margin: 0, color: "#152c49", fontSize: "1rem" }}>{project.name}</h3>
                    <p style={{ margin: 0, color: "#4f6480", fontSize: "0.9rem" }}>
                      {project.type} · alvo R$ {(project.targetAmount ?? 0).toLocaleString("pt-BR")} · aporte R$ {(project.monthlyContribution ?? 0).toLocaleString("pt-BR")}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button type="button" onClick={() => editProject(project)} style={{ border: "1px solid #d3deea", borderRadius: 10, background: "#fff", padding: "8px 10px" }}>
                      Editar
                    </button>
                    <button type="button" onClick={() => deleteProject(project.id)} style={{ border: "1px solid #d3deea", borderRadius: 10, background: "#fff", padding: "8px 10px" }}>
                      Excluir
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </section>
      </div>
    </main>
  );
}

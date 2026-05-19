import { type ChangeEvent, type CSSProperties, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { DiagnosisCard } from "../components/aurora/DiagnosisCard";
import { FlowMapCard } from "../components/aurora/FlowMapCard";
import { GoalProgressCard } from "../components/aurora/GoalProgressCard";
import { NextActionCard } from "../components/aurora/NextActionCard";
import { ScoreCard } from "../components/aurora/ScoreCard";
import { SectionHeader } from "../components/aurora/SectionHeader";
import {
  createEmptyImportSession,
  importCsvIntoSession,
} from "../integrations/csv-import/csv-import-service";
import {
  clearCsvImportSession,
  getCsvImportSession,
  saveCsvImportSession,
} from "../integrations/csv-import/csv-import-store";
import type { CsvImportSessionState } from "../integrations/csv-import/csv-types";
import { auroraMvpStateToAuroraUserState, buildAuroraReservoirs } from "../lib/aurora-mvp-adapter";
import { loadAuroraMvpState } from "../lib/aurora-mvp-storage";
import { buildHomeSnapshot } from "../lib/engines/home-orchestrator";
import { calculateFinancialHealthScoreV3 } from "../lib/engines/financial-health-engine";
import { calculateMvpNextAction } from "../lib/engines/next-action-engine";
import { auroraUserStateMock } from "../mocks/aurora-user-state";
import type { AuroraMvpState, FlowInput } from "../types/aurora-mvp";
import type { GoalState } from "../types/aurora-user-state";
import type { GoalProgress } from "../types/objectives-v2";

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

function inferAlertLevel(message: string): "info" | "warning" {
  const normalized = message.toLowerCase();
  if (
    normalized.includes("não aportou") ||
    normalized.includes("nao aportou") ||
    normalized.includes("acima do limite") ||
    normalized.includes("atenção")
  ) {
    return "warning";
  }

  return "info";
}

function mapGoalStateToGoalProgress(goal: GoalState): GoalProgress {
  const statusMap: Record<GoalState["status"], GoalProgress["status"]> = {
    on_track: "on_track",
    attention: "at_risk",
    delayed: "delayed",
    completed: "completed",
  };

  return {
    id: goal.id,
    title: goal.name,
    category: "other",
    targetAmount: goal.targetAmount,
    currentAmount: goal.currentAmount,
    monthlyContribution: goal.expectedMonthlyContribution ?? goal.contributionThisMonth,
    targetDate: goal.targetDate.length === 7 ? `${goal.targetDate}-01` : goal.targetDate,
    status: statusMap[goal.status],
    motivation: "Objetivo priorizado para manter evolução consistente.",
  };
}

export default function HomePageV2() {
  const [importSession, setImportSession] = useState<CsvImportSessionState>(() => getCsvImportSession());
  const [mvpState] = useState<AuroraMvpState | null>(() => loadAuroraMvpState());
  const [importInfo, setImportInfo] = useState<string>("");

  const activeState =
    importSession.mode === "imported"
      ? importSession.consolidatedUserState
      : mvpState
        ? auroraMvpStateToAuroraUserState(mvpState)
        : auroraUserStateMock;
  const snapshot = useMemo(() => buildHomeSnapshot(activeState), [activeState]);
  const score = useMemo(() => calculateFinancialHealthScoreV3(activeState), [activeState]);
  const flow: FlowInput = useMemo(
    () =>
      mvpState?.flow ?? {
        monthlyIncome: activeState.monthly.income,
        monthlyExpenses: activeState.monthly.expenses,
        monthlyInvestments: activeState.goals.reduce((acc, goal) => acc + goal.contributionThisMonth, 0),
        monthlyBalance: activeState.monthly.balance,
      },
    [activeState, mvpState]
  );
  const reservoirs = useMemo(() => (mvpState ? buildAuroraReservoirs(mvpState) : []), [mvpState]);
  const mvpNextAction = useMemo(() => calculateMvpNextAction(mvpState), [mvpState]);

  const priorityGoal = snapshot.priorityGoal ? mapGoalStateToGoalProgress(snapshot.priorityGoal) : null;
  const alerts = snapshot.alerts.map((message, index) => ({
    id: `al${index + 1}`,
    level: inferAlertLevel(message),
    message,
  }));

  const handleImport = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const text = await file.text();
    const current = importSession ?? createEmptyImportSession();
    const { session, importedFile } = importCsvIntoSession(current, file.name, text);

    saveCsvImportSession(session);
    setImportSession(session);

    const errorSuffix = importedFile.errors.length > 0 ? ` · ${importedFile.errors.length} alerta(s)` : "";
    setImportInfo(
      `Arquivo importado: ${importedFile.fileName} · ${importedFile.provider} · ${importedFile.transactions.length} transações${errorSuffix}`
    );

    event.target.value = "";
  };

  const handleResetImport = () => {
    const empty = clearCsvImportSession();
    setImportSession(empty);
    setImportInfo("Sessão de importação limpa. Voltando para mock local.");
  };

  return (
    <main style={pageStyle}>
      <div style={contentStyle}>
        <SectionHeader
          title={`Resumo executivo · ${importSession.mode === "imported" ? "Dados importados" : mvpState ? "Snapshot MVP" : "Pat"}`}
          subtitle="Clareza rápida do seu fluxo: posição atual, reservatórios e uma única próxima ação."
        />

        <section style={cardStyle} aria-label="CsvImportTriggerCard">
          <h3 style={{ margin: 0, color: "#152c49", fontSize: "1rem" }}>Importar CSV Nubank</h3>
          <p style={{ margin: 0, color: "#405975", lineHeight: 1.5 }}>
            Você pode importar vários arquivos na mesma sessão. Os dados são consolidados automaticamente.
          </p>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <label
              style={{
                border: "1px solid #c8d8e9",
                borderRadius: 10,
                padding: "8px 12px",
                color: "#234361",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Selecionar CSV
              <input type="file" accept=".csv,text/csv" onChange={handleImport} style={{ display: "none" }} />
            </label>

            {importSession.mode === "imported" ? (
              <button
                type="button"
                onClick={handleResetImport}
                style={{
                  border: "1px solid #c8d8e9",
                  borderRadius: 10,
                  padding: "8px 12px",
                  color: "#234361",
                  background: "#fff",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Limpar importação
              </button>
            ) : null}
          </div>

          {importInfo ? <p style={{ margin: 0, color: "#58708c", fontSize: "0.86rem" }}>{importInfo}</p> : null}

          {importSession.importedFiles.length > 0 ? (
            <div style={{ display: "grid", gap: 8 }}>
              <p style={{ margin: 0, color: "#304a67", fontWeight: 700, fontSize: "0.9rem" }}>Arquivos importados</p>
              {importSession.importedFiles.map((file) => (
                <div
                  key={`${file.fileName}-${file.provider}-${file.transactions.length}`}
                  style={{
                    border: "1px solid #e2ebf5",
                    borderRadius: 10,
                    padding: "8px 10px",
                    display: "grid",
                    gap: 4,
                  }}
                >
                  <p style={{ margin: 0, color: "#183454", fontWeight: 600, fontSize: "0.88rem" }}>{file.fileName}</p>
                  <p style={{ margin: 0, color: "#4a5f7a", fontSize: "0.82rem" }}>
                    Provider: {file.provider} · Transações: {file.transactions.length}
                  </p>
                  {file.errors.length > 0 ? (
                    <p style={{ margin: 0, color: "#7a4f14", fontSize: "0.8rem" }}>
                      Alertas: {file.errors.length} (exibindo no máximo 3 por arquivo no próximo ciclo)
                    </p>
                  ) : null}
                </div>
              ))}
              <p style={{ margin: 0, color: "#3f5873", fontSize: "0.84rem" }}>
                Total consolidado: {importSession.mergedTransactions.length} transações únicas.
              </p>
            </div>
          ) : null}

          {/* TODO: Conectar importação a um fluxo persistente com histórico de múltiplos arquivos e validação assistida. */}
        </section>

        <DiagnosisCard title={snapshot.diagnosisTitle} message={snapshot.diagnosisMessage} updatedAt={score.updatedAt} />

        <FlowMapCard flow={flow} />

        <ScoreCard score={score.totalScore} bandLabel={score.band.label} message={score.band.message} />

        <section style={cardStyle} aria-label="ReservoirsCard">
          <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
            <h3 style={{ margin: 0, color: "#152c49", fontSize: "1rem" }}>Reservatórios iniciais</h3>
            <Link to="/reservoirs" style={{ color: "#16385d", fontWeight: 700, fontSize: "0.88rem" }}>
              Ver todos
            </Link>
          </div>
          {reservoirs.length > 0 ? (
            reservoirs.slice(0, 3).map((reservoir) => (
              <div key={reservoir.id} style={{ borderTop: "1px solid #edf2f7", paddingTop: 10, display: "grid", gap: 6 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                  <p style={{ margin: 0, color: "#162a46", fontWeight: 700 }}>{reservoir.name}</p>
                  <p style={{ margin: 0, color: "#4f6480", fontSize: "0.88rem" }}>{reservoir.progressPercent}%</p>
                </div>
                <div style={{ width: "100%", height: 8, borderRadius: 999, background: "#e8eff7" }}>
                  <div
                    style={{
                      width: `${reservoir.progressPercent}%`,
                      height: "100%",
                      borderRadius: 999,
                      background: "linear-gradient(90deg, #2d6fb1, #5c8fc4)",
                    }}
                  />
                </div>
                <p style={{ margin: 0, color: "#4f6480", fontSize: "0.9rem", lineHeight: 1.45 }}>{reservoir.message}</p>
              </div>
            ))
          ) : (
            <p style={{ margin: 0, color: "#405975", lineHeight: 1.5 }}>
              Complete o snapshot inicial para gerar Segurança e Liberdade automaticamente.
            </p>
          )}
        </section>

        <section style={cardStyle} aria-label="MonthlySummaryCard">
          <h3 style={{ margin: 0, color: "#152c49", fontSize: "1rem" }}>Resumo financeiro do mês</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 8 }}>
            <div style={metricItemStyle}>
              <span style={{ color: "#5b708b", fontSize: "0.78rem" }}>Entradas</span>
              <strong style={{ color: "#183454" }}>R$ {snapshot.summary.income.toLocaleString("pt-BR")}</strong>
            </div>
            <div style={metricItemStyle}>
              <span style={{ color: "#5b708b", fontSize: "0.78rem" }}>Saídas</span>
              <strong style={{ color: "#183454" }}>R$ {snapshot.summary.expenses.toLocaleString("pt-BR")}</strong>
            </div>
            <div style={metricItemStyle}>
              <span style={{ color: "#5b708b", fontSize: "0.78rem" }}>Saldo</span>
              <strong style={{ color: snapshot.summary.balance >= 0 ? "#1b6037" : "#8a2231" }}>
                R$ {snapshot.summary.balance.toLocaleString("pt-BR")}
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
        <NextActionCard title={mvpNextAction.title} actionText={mvpNextAction.message} ctaLabel={mvpNextAction.ctaLabel} />
      </div>
    </main>
  );
}

import type { CSSProperties } from "react";

import { calculateFlowRatios, getFlowInterpretation } from "../../lib/aurora-mvp-adapter";
import type { FlowInput } from "../../types/aurora-mvp";

type FlowMapCardProps = {
  flow: FlowInput;
};

const cardStyle: CSSProperties = {
  background: "#ffffff",
  border: "1px solid #dbe5ef",
  borderRadius: 18,
  padding: 18,
  display: "grid",
  gap: 14,
  boxShadow: "0 8px 20px rgba(16, 35, 63, 0.04)",
};

const gridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: 10,
};

const metricStyle: CSSProperties = {
  background: "#f8fbff",
  border: "1px solid #e2ebf5",
  borderRadius: 12,
  padding: "10px 12px",
  display: "grid",
  gap: 4,
};

function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatPercent(value: number): string {
  return `${Math.round(value * 100)}%`;
}

export function FlowMapCard({ flow }: FlowMapCardProps) {
  const ratios = calculateFlowRatios(flow);

  return (
    <article style={cardStyle}>
      <div style={{ display: "grid", gap: 4 }}>
        <h3 style={{ margin: 0, color: "#152c49", fontSize: "1rem" }}>Mapa do Fluxo</h3>
        <p style={{ margin: 0, color: "#4f6480", lineHeight: 1.5 }}>
          Uma leitura simples de como sua energia financeira se distribui entre presente, futuro e espaço de escolha.
        </p>
      </div>

      <div style={gridStyle}>
        <div style={metricStyle}>
          <span style={{ color: "#5b708b", fontSize: "0.78rem" }}>Entradas mensais</span>
          <strong style={{ color: "#183454" }}>{formatCurrency(flow.monthlyIncome)}</strong>
        </div>
        <div style={metricStyle}>
          <span style={{ color: "#5b708b", fontSize: "0.78rem" }}>Gastos mensais</span>
          <strong style={{ color: "#183454" }}>{formatCurrency(flow.monthlyExpenses)}</strong>
        </div>
        <div style={metricStyle}>
          <span style={{ color: "#5b708b", fontSize: "0.78rem" }}>Investimentos mensais</span>
          <strong style={{ color: "#183454" }}>{formatCurrency(flow.monthlyInvestments)}</strong>
        </div>
        <div style={metricStyle}>
          <span style={{ color: "#5b708b", fontSize: "0.78rem" }}>Saldo mensal</span>
          <strong style={{ color: flow.monthlyBalance >= 0 ? "#1b6037" : "#8a2231" }}>
            {formatCurrency(flow.monthlyBalance)}
          </strong>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <span style={{ color: "#35506b", fontWeight: 700, fontSize: "0.88rem" }}>
          Presente: {formatPercent(ratios.expenseRate)}
        </span>
        <span style={{ color: "#35506b", fontWeight: 700, fontSize: "0.88rem" }}>
          Futuro: {formatPercent(ratios.investmentRate)}
        </span>
      </div>

      <p style={{ margin: 0, color: "#304a67", lineHeight: 1.55 }}>{getFlowInterpretation(flow)}</p>
    </article>
  );
}

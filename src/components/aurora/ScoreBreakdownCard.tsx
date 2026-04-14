import type { CSSProperties } from "react";

import type { ScoreDimension } from "../../types/financial-health-v3";

type ScoreBreakdownCardProps = {
  dimensions: ScoreDimension[];
};

const cardStyle: CSSProperties = {
  background: "#ffffff",
  border: "1px solid #dbe5ef",
  borderRadius: 18,
  padding: 18,
  display: "grid",
  gap: 16,
  boxShadow: "0 8px 20px rgba(16, 35, 63, 0.04)",
};

const rowStyle: CSSProperties = {
  display: "grid",
  gap: 8,
};

const barContainerStyle: CSSProperties = {
  width: "100%",
  height: 10,
  background: "#e8eff7",
  borderRadius: 999,
  overflow: "hidden",
};

export function ScoreBreakdownCard({ dimensions }: ScoreBreakdownCardProps) {
  return (
    <article style={cardStyle}>
      {dimensions.map((dimension) => (
        <div key={dimension.key} style={rowStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
            <strong style={{ color: "#16304e", fontSize: "0.98rem" }}>{dimension.label}</strong>
            <span style={{ color: "#48617f", fontSize: "0.86rem" }}>
              {dimension.score}/100 · peso {Math.round(dimension.weight * 100)}%
            </span>
          </div>
          <div style={barContainerStyle}>
            <div
              style={{
                width: `${dimension.score}%`,
                height: "100%",
                background: "linear-gradient(90deg, #2d6fb1, #5c8fc4)",
              }}
            />
          </div>
        </div>
      ))}
    </article>
  );
}

import type { CSSProperties } from "react";

import { InsightBadge } from "./InsightBadge";

type DiagnosisCardProps = {
  title?: string;
  message: string;
  updatedAt: string;
};

const cardStyle: CSSProperties = {
  background: "#ffffff",
  border: "1px solid #dbe5ef",
  borderRadius: 18,
  padding: 18,
  display: "grid",
  gap: 12,
  boxShadow: "0 8px 20px rgba(16, 35, 63, 0.05)",
};

const messageStyle: CSSProperties = {
  margin: 0,
  fontSize: "1rem",
  color: "#162a46",
  lineHeight: 1.6,
};

const updatedStyle: CSSProperties = {
  margin: 0,
  fontSize: "0.8rem",
  color: "#60738d",
};

export function DiagnosisCard({ title, message, updatedAt }: DiagnosisCardProps) {
  return (
    <article style={cardStyle}>
      <InsightBadge label="Diagnóstico em 30 segundos" tone="info" />
      {title ? <h3 style={{ margin: 0, color: "#152c49", fontSize: "1rem" }}>{title}</h3> : null}
      <p style={messageStyle}>{message}</p>
      <p style={updatedStyle}>Baseado nos dados mais recentes · {updatedAt}</p>
    </article>
  );
}

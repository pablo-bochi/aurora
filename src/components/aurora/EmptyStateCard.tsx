import type { CSSProperties } from "react";

type EmptyStateCardProps = {
  title: string;
  description: string;
  actionLabel?: string;
};

const cardStyle: CSSProperties = {
  background: "#ffffff",
  border: "1px dashed #b8cbe0",
  borderRadius: 18,
  padding: 20,
  display: "grid",
  gap: 11,
  textAlign: "center",
};

export function EmptyStateCard({ title, description, actionLabel = "Criar agora" }: EmptyStateCardProps) {
  return (
    <article style={cardStyle}>
      <h3 style={{ margin: 0, color: "#162a46", fontSize: "1.03rem" }}>{title}</h3>
      <p style={{ margin: 0, color: "#516985", lineHeight: 1.5 }}>{description}</p>
      <button
        type="button"
        style={{
          border: "1px solid #c5d7ea",
          borderRadius: 12,
          padding: "11px 14px",
          background: "#eef5fc",
          color: "#143356",
          fontWeight: 700,
          justifySelf: "center",
        }}
      >
        {actionLabel}
      </button>
    </article>
  );
}

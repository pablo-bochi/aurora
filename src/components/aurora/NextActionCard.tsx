import type { CSSProperties } from "react";

type NextActionCardProps = {
  title?: string;
  actionText: string;
  ctaLabel?: string;
};

const cardStyle: CSSProperties = {
  background: "linear-gradient(150deg, #132b47 0%, #1d3d62 100%)",
  borderRadius: 18,
  padding: 18,
  color: "#f4f8fc",
  display: "grid",
  gap: 12,
  boxShadow: "0 10px 22px rgba(13, 32, 54, 0.2)",
};

const buttonStyle: CSSProperties = {
  border: "none",
  borderRadius: 12,
  padding: "11px 14px",
  background: "#f3f8ff",
  color: "#102943",
  fontWeight: 700,
  justifySelf: "start",
  cursor: "pointer",
};

export function NextActionCard({
  title = "Uma próxima ação",
  actionText,
  ctaLabel = "Dar próximo passo",
}: NextActionCardProps) {
  return (
    <article style={cardStyle}>
      <p style={{ margin: 0, color: "#9fb8d4", fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase" }}>
        Sem pressa, um movimento por vez
      </p>
      <h3 style={{ margin: 0, fontSize: "1.03rem", letterSpacing: "0.01em" }}>{title}</h3>
      <p style={{ margin: 0, lineHeight: 1.55, color: "#d9e6f5" }}>{actionText}</p>
      <button type="button" style={buttonStyle}>
        {ctaLabel}
      </button>
    </article>
  );
}

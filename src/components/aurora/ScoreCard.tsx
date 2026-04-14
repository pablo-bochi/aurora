import type { CSSProperties } from "react";

type ScoreCardProps = {
  score: number;
  bandLabel: string;
  message: string;
};

const cardStyle: CSSProperties = {
  background: "linear-gradient(155deg, #f9fcff 0%, #edf4fb 85%)",
  border: "1px solid #d6e2ee",
  borderRadius: 18,
  padding: 18,
  display: "grid",
  gap: 8,
  boxShadow: "0 8px 20px rgba(16, 35, 63, 0.05)",
};

const scoreStyle: CSSProperties = {
  margin: 0,
  fontSize: "2.2rem",
  fontWeight: 700,
  color: "#10233f",
  letterSpacing: "-0.02em",
};

const bandStyle: CSSProperties = {
  margin: 0,
  fontSize: "0.78rem",
  color: "#4f6681",
  fontWeight: 700,
  letterSpacing: "0.03em",
  textTransform: "uppercase",
};

const messageStyle: CSSProperties = {
  margin: 0,
  color: "#35506b",
  lineHeight: 1.55,
};

export function ScoreCard({ score, bandLabel, message }: ScoreCardProps) {
  return (
    <article style={cardStyle}>
      <p style={bandStyle}>Saúde financeira v3 · faixa {bandLabel}</p>
      <p style={scoreStyle}>{score}/100</p>
      <p style={messageStyle}>{message}</p>
    </article>
  );
}

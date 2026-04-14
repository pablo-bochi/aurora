import type { CSSProperties } from "react";

type InsightBadgeProps = {
  label: string;
  tone?: "neutral" | "info" | "warning" | "positive";
};

const tones: Record<NonNullable<InsightBadgeProps["tone"]>, CSSProperties> = {
  neutral: { background: "#eef3f8", color: "#3b516b", border: "1px solid #d7e1ec" },
  info: { background: "#e9f2fb", color: "#1d4a76", border: "1px solid #c8dbef" },
  warning: { background: "#fdf3e7", color: "#7a4f14", border: "1px solid #f0dcc4" },
  positive: { background: "#eaf6ef", color: "#1b6037", border: "1px solid #cbe5d5" },
};

const baseStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  borderRadius: 999,
  padding: "5px 11px",
  fontSize: "0.76rem",
  fontWeight: 600,
  letterSpacing: "0.01em",
};

export function InsightBadge({ label, tone = "neutral" }: InsightBadgeProps) {
  return <span style={{ ...baseStyle, ...tones[tone] }}>{label}</span>;
}

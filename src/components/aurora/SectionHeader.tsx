import type { CSSProperties } from "react";

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
};

const wrapperStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
};

const titleStyle: CSSProperties = {
  margin: 0,
  fontSize: "1.45rem",
  lineHeight: 1.2,
  color: "#10233f",
  fontWeight: 700,
  letterSpacing: "-0.01em",
};

const subtitleStyle: CSSProperties = {
  margin: 0,
  color: "#4a5e79",
  fontSize: "0.96rem",
  lineHeight: 1.55,
  maxWidth: 620,
};

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <header style={wrapperStyle}>
      <h2 style={titleStyle}>{title}</h2>
      {subtitle ? <p style={subtitleStyle}>{subtitle}</p> : null}
    </header>
  );
}

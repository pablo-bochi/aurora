import type { CSSProperties } from "react";

import { InsightBadge } from "./InsightBadge";
import type { PsychologicalProfile } from "../../types/financial-health-v3";

type PsychologicalProfileCardProps = {
  profile: PsychologicalProfile;
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

const listStyle: CSSProperties = {
  margin: 0,
  paddingLeft: 18,
  color: "#395471",
  display: "grid",
  gap: 4,
  fontSize: "0.92rem",
};

export function PsychologicalProfileCard({ profile }: PsychologicalProfileCardProps) {
  return (
    <article style={cardStyle}>
      <InsightBadge label={`Perfil predominante: ${profile.label}`} tone="info" />
      <p style={{ margin: 0, color: "#162a46", lineHeight: 1.6 }}>{profile.summary}</p>
      <div style={{ display: "grid", gap: 10 }}>
        <div>
          <p style={{ margin: 0, color: "#304a67", fontWeight: 700, marginBottom: 6 }}>Forças atuais</p>
          <ul style={listStyle}>
            {profile.strengths.map((strength) => (
              <li key={strength}>{strength}</li>
            ))}
          </ul>
        </div>
        <div>
          <p style={{ margin: 0, color: "#304a67", fontWeight: 700, marginBottom: 6 }}>Pontos de atenção</p>
          <ul style={listStyle}>
            {profile.risks.map((risk) => (
              <li key={risk}>{risk}</li>
            ))}
          </ul>
        </div>
      </div>
      <p style={{ margin: 0, color: "#11365d", fontWeight: 600, lineHeight: 1.5 }}>{profile.recommendedAction}</p>
    </article>
  );
}

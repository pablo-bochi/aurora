import type { CSSProperties } from "react";

import type { JourneyStage } from "../../types/journey";

const stages: JourneyStage[] = ["awareness", "organization", "intention", "consistency", "evolution"];

const stageLabels: Record<JourneyStage, string> = {
  awareness: "Consciência",
  organization: "Organização",
  intention: "Intenção",
  consistency: "Consistência",
  evolution: "Evolução",
};

type JourneyTimelineProps = {
  currentStage: JourneyStage;
};

const cardStyle: CSSProperties = {
  display: "grid",
  gap: 12,
  background: "#ffffff",
  border: "1px solid #dbe5ef",
  borderRadius: 18,
  padding: 18,
  boxShadow: "0 8px 20px rgba(16, 35, 63, 0.04)",
};

export function JourneyTimeline({ currentStage }: JourneyTimelineProps) {
  const currentIndex = stages.indexOf(currentStage);

  return (
    <article style={cardStyle}>
      {stages.map((stage, index) => {
        const done = index < currentIndex;
        const current = index === currentIndex;

        return (
          <div
            key={stage}
            style={{
              display: "grid",
              gridTemplateColumns: "18px 1fr",
              alignItems: "center",
              columnGap: 10,
              color: current ? "#12365b" : "#4e637d",
              fontWeight: current ? 700 : 500,
            }}
          >
            <span
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                boxSizing: "border-box",
                border: current ? "3px solid #2d6fb1" : "2px solid #c7d4e2",
                background: done ? "#3da36a" : "#ffffff",
              }}
            />
            <span>{stageLabels[stage]}</span>
          </div>
        );
      })}
    </article>
  );
}

import { useMemo, useState, type CSSProperties } from "react";

import { SectionHeader } from "../components/aurora/SectionHeader";
import { assistantQuickSuggestionsMock, assistantResponseMockV2 } from "../mocks/assistant-v2";
import type { AssistantResponse } from "../types/assistant-v2";

const pageStyle: CSSProperties = {
  minHeight: "100vh",
  background: "linear-gradient(180deg, #f7fafd 0%, #eef3f8 100%)",
  padding: "20px 14px 30px",
};

const contentStyle: CSSProperties = {
  maxWidth: 760,
  margin: "0 auto",
  display: "grid",
  gap: 16,
};

const cardStyle: CSSProperties = {
  background: "#ffffff",
  border: "1px solid #dbe5ef",
  borderRadius: 18,
  padding: 16,
  display: "grid",
  gap: 10,
  boxShadow: "0 8px 20px rgba(16, 35, 63, 0.04)",
};

export default function ConversationalPageV2() {
  const [prompt, setPrompt] = useState(assistantQuickSuggestionsMock[0]);
  // TODO: Substituir mock por fluxo de resposta em tempo real quando API do assistente estiver disponível.
  const [response] = useState<AssistantResponse>(assistantResponseMockV2);

  const toneColor = useMemo(() => {
    if (response.type === "warning") return "#7a4f14";
    if (response.type === "confirmation") return "#1b6037";
    return "#16385d";
  }, [response.type]);

  return (
    <main style={pageStyle}>
      <div style={contentStyle}>
        <SectionHeader
          title="Assistente Aurora"
          subtitle="Contexto claro, resposta objetiva e confirmação explícita da ação recomendada."
        />

        <section style={cardStyle} aria-label="PromptInput">
          <h3 style={{ margin: 0, color: "#152c49", fontSize: "1rem" }}>O que você quer resolver agora?</h3>
          <textarea
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            style={{
              width: "100%",
              minHeight: 88,
              borderRadius: 12,
              border: "1px solid #d3deea",
              padding: 10,
              resize: "vertical",
              fontFamily: "inherit",
              lineHeight: 1.5,
            }}
          />
        </section>

        <section style={cardStyle} aria-label="QuickSuggestions">
          <h3 style={{ margin: 0, color: "#152c49", fontSize: "1rem" }}>Sugestões rápidas</h3>
          <div style={{ display: "grid", gap: 8 }}>
            {assistantQuickSuggestionsMock.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => setPrompt(suggestion)}
                style={{
                  border: "1px solid #d4e0ed",
                  borderRadius: 12,
                  background: "#f8fbff",
                  padding: "10px 12px",
                  textAlign: "left",
                  color: "#3f5873",
                }}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </section>

        <section style={cardStyle} aria-label="ResponseCard">
          <h3 style={{ margin: 0, color: "#152c49", fontSize: "1rem" }}>{response.title}</h3>
          <p style={{ margin: 0, color: toneColor, lineHeight: 1.55 }}>{response.message}</p>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 6, color: "#415a76", lineHeight: 1.5 }}>
            {response.suggestedActions.map((action) => (
              <li key={action}>{action}</li>
            ))}
          </ul>
        </section>

        {response.requiresConfirmation ? (
          <section style={cardStyle} aria-label="ActionConfirmationCard">
            <h3 style={{ margin: 0, color: "#152c49", fontSize: "1rem" }}>Confirmar ação</h3>
            <p style={{ margin: 0, color: "#405975", lineHeight: 1.5 }}>
              Deseja registrar esta ação para a Aurora acompanhar sua execução durante o mês?
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                type="button"
                style={{ border: "none", borderRadius: 12, padding: "11px 14px", background: "#16385d", color: "#ffffff", fontWeight: 700 }}
              >
                Confirmar e acompanhar
              </button>
              <button
                type="button"
                style={{ border: "1px solid #d3deea", borderRadius: 12, padding: "11px 14px", background: "#ffffff", color: "#3f5873", fontWeight: 600 }}
              >
                Depois
              </button>
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}

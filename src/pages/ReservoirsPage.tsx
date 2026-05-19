import type { CSSProperties } from "react";
import { Link } from "react-router-dom";

import { buildAuroraReservoirs } from "../lib/aurora-mvp-adapter";
import { loadAuroraMvpState } from "../lib/aurora-mvp-storage";
import { SectionHeader } from "../components/aurora/SectionHeader";

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
  padding: 18,
  display: "grid",
  gap: 10,
  boxShadow: "0 8px 20px rgba(16, 35, 63, 0.04)",
};

function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function ReservoirsPage() {
  const state = loadAuroraMvpState();
  const reservoirs = state ? buildAuroraReservoirs(state) : [];

  return (
    <main style={pageStyle}>
      <div style={contentStyle}>
        <SectionHeader
          title="Reservatórios"
          subtitle="Reservatórios transformam seu fluxo em segurança, autonomia e liberdade."
        />

        {!state ? (
          <section style={cardStyle}>
            <p style={{ margin: 0, color: "#405975" }}>Complete o snapshot inicial para gerar seus primeiros reservatórios.</p>
            <Link to="/snapshot" style={{ color: "#16385d", fontWeight: 700 }}>
              Completar snapshot inicial
            </Link>
          </section>
        ) : null}

        {reservoirs.map((reservoir) => (
          <article key={reservoir.id} style={cardStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
              <h3 style={{ margin: 0, color: "#152c49", fontSize: "1rem" }}>{reservoir.name}</h3>
              <span style={{ color: "#5b708b", fontSize: "0.82rem", fontWeight: 700 }}>{reservoir.type}</span>
            </div>
            <div style={{ width: "100%", height: 8, borderRadius: 999, background: "#e8eff7" }}>
              <div
                style={{
                  width: `${reservoir.progressPercent}%`,
                  height: "100%",
                  borderRadius: 999,
                  background: "linear-gradient(90deg, #2d6fb1, #5c8fc4)",
                }}
              />
            </div>
            <p style={{ margin: 0, color: "#304a67", fontWeight: 700 }}>
              {formatCurrency(reservoir.currentAmount)}
              {reservoir.targetAmount ? ` de ${formatCurrency(reservoir.targetAmount)} (${reservoir.progressPercent}%)` : ""}
            </p>
            <p style={{ margin: 0, color: "#4f6480", lineHeight: 1.5 }}>{reservoir.message}</p>
          </article>
        ))}
      </div>
    </main>
  );
}

import { type GoalProgress } from "../types/objectives-v2";

export const goalsMockV2: GoalProgress[] = [
  {
    id: "g1",
    title: "Reserva de emergência",
    category: "emergency_fund",
    targetAmount: 30000,
    currentAmount: 11200,
    monthlyContribution: 1200,
    targetDate: "2027-06-30",
    status: "on_track",
    motivation: "Tranquilidade para tomar decisões com segurança.",
  },
  {
    id: "g2",
    title: "Viagem internacional",
    category: "travel",
    targetAmount: 18000,
    currentAmount: 5400,
    monthlyContribution: 0,
    targetDate: "2026-12-01",
    status: "at_risk",
    motivation: "Viver uma experiência marcante sem dívida.",
  },
  {
    id: "g3",
    title: "Entrada do apartamento",
    category: "housing",
    targetAmount: 120000,
    currentAmount: 18000,
    monthlyContribution: 1500,
    targetDate: "2029-03-31",
    status: "delayed",
    motivation: "Construir estabilidade de longo prazo.",
  },
];

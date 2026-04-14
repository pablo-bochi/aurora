import type { FinancialHealthScoreV3 } from "../types/financial-health-v3";

export function getSupportiveBandMessage(score: FinancialHealthScoreV3): string {
  if (score.totalScore < 40) {
    return "Vamos simplificar o próximo passo para reduzir pressão e recuperar controle.";
  }

  if (score.totalScore < 60) {
    return "Você tem capacidade, mas ainda não consolidou consistência.";
  }

  if (score.totalScore < 80) {
    return "Você está começando a ganhar clareza sobre sua vida financeira.";
  }

  return "Sua base está sólida. O foco agora é acelerar seus projetos de vida.";
}

export function getNextActionCopy(action: string): string {
  return `Seu próximo passo é simples: ${action}`;
}

// TODO: Integrar com mecanismo de personalização por perfil quando houver backend.
export function getPsychologicalNudge(profile: FinancialHealthScoreV3["psychologicalProfile"]["type"]): string {
  switch (profile) {
    case "avoider":
      return "Comece com uma ação pequena hoje para evitar acúmulo de decisões.";
    case "impulsive":
      return "Use pausa de 24h para gastos não planejados nesta semana.";
    case "inconsistent":
      return "Crie um ritual semanal curto para manter seu plano ativo.";
    case "disciplined":
      return "Aumente aportes gradualmente para acelerar objetivos sem pressão.";
    case "builder":
      return "Você pode transformar consistência em crescimento de longo prazo.";
    default:
      return "Mantenha uma rotina simples e contínua.";
  }
}

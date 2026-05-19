import type { AuroraMvpState } from "../types/aurora-mvp";

const STORAGE_KEY = "aurora_mvp_state_v1";

export function saveAuroraMvpState(state: AuroraMvpState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, updatedAt: new Date().toISOString() }));
}

export function loadAuroraMvpState(): AuroraMvpState | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as AuroraMvpState;
    if (!parsed || !parsed.flow || !Array.isArray(parsed.projects)) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function clearAuroraMvpState(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function hasAuroraMvpState(): boolean {
  return loadAuroraMvpState() !== null;
}

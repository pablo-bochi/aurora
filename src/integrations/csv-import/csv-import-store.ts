import type { CsvImportSessionState } from "./csv-types";
import { createEmptyImportSession } from "./csv-import-service";

const STORAGE_KEY = "aurora_csv_import_session_v1";

export function saveCsvImportSession(session: CsvImportSessionState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function getCsvImportSession(): CsvImportSessionState {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return createEmptyImportSession();
  }

  try {
    const parsed = JSON.parse(raw) as CsvImportSessionState;

    if (!parsed || !Array.isArray(parsed.importedFiles) || !Array.isArray(parsed.mergedTransactions)) {
      return createEmptyImportSession();
    }

    return parsed;
  } catch {
    return createEmptyImportSession();
  }
}

export function clearCsvImportSession(): CsvImportSessionState {
  localStorage.removeItem(STORAGE_KEY);
  return createEmptyImportSession();
}

import type {
  CsvImportedFileResult,
  CsvImportSessionState,
  CsvProviderType,
  NormalizedTransaction,
  ParsedCsvFile,
  ProviderTransactionRow,
} from "./csv-types";
import { detectCsvProvider } from "./csv-bank-detector";
import { parseCsvText } from "./csv-parser";
import { normalizeProviderRows } from "./normalizers/transaction-normalizer";
import { transactionsToAuroraUserState } from "./normalizers/transactions-to-aurora-state";
import { mapGenericRows } from "./providers/generic/generic-mapper";
import { mapNubankAccountRows } from "./providers/nubank-account/nubank-account-mapper";
import { mapNubankCreditCardRows } from "./providers/nubank-credit-card/nubank-credit-card-mapper";

function mapProviderRows(parsed: ParsedCsvFile, provider: CsvProviderType): ProviderTransactionRow[] {
  if (provider === "nubank-account") {
    return mapNubankAccountRows(parsed);
  }

  if (provider === "nubank-credit-card") {
    return mapNubankCreditCardRows(parsed);
  }

  return mapGenericRows(parsed);
}

function deduplicateTransactions(transactions: NormalizedTransaction[]): NormalizedTransaction[] {
  const map = new Map<string, NormalizedTransaction>();

  transactions.forEach((transaction) => {
    if (!map.has(transaction.id)) {
      map.set(transaction.id, transaction);
    }
  });

  return Array.from(map.values()).sort((a, b) => b.date.localeCompare(a.date));
}

function consolidateSession(importedFiles: CsvImportedFileResult[]): CsvImportSessionState {
  const mergedTransactions = deduplicateTransactions(importedFiles.flatMap((file) => file.transactions));

  return {
    importedFiles,
    mergedTransactions,
    consolidatedUserState: transactionsToAuroraUserState(mergedTransactions),
    mode: importedFiles.length > 0 ? "imported" : "mock",
  };
}

export function createEmptyImportSession(): CsvImportSessionState {
  return consolidateSession([]);
}

export function importCsvFile(fileName: string, csvText: string): CsvImportedFileResult {
  const parsed = parseCsvText(csvText);

  if (parsed.headers.length === 0 || parsed.rows.length === 0) {
    return {
      fileName,
      provider: "generic",
      transactions: [],
      errors: ["CSV vazio ou sem dados válidos."],
    };
  }

  // Stage 1: detect provider by headers.
  const provider = detectCsvProvider(parsed);

  // Stage 2: map provider-specific raw rows to intermediate format.
  const providerRows = mapProviderRows(parsed, provider);

  // Stage 3: normalize and enrich rows into canonical transactions.
  const normalized = normalizeProviderRows(providerRows, provider);

  return {
    fileName,
    provider,
    transactions: normalized.transactions,
    errors: normalized.errors,
  };
}

export function appendImportedFileToSession(
  current: CsvImportSessionState,
  importedFile: CsvImportedFileResult
): CsvImportSessionState {
  return consolidateSession([...current.importedFiles, importedFile]);
}

export function importCsvIntoSession(
  current: CsvImportSessionState,
  fileName: string,
  csvText: string
): { session: CsvImportSessionState; importedFile: CsvImportedFileResult } {
  const importedFile = importCsvFile(fileName, csvText);
  const session = appendImportedFileToSession(current, importedFile);
  return { session, importedFile };
}

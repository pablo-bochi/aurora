import type { AuroraUserState } from "../../types/aurora-user-state";

export type CsvProviderType = "nubank-account" | "nubank-credit-card" | "generic";

export type CsvRawRow = Record<string, string>;

export type ParsedCsvFile = {
  headers: string[];
  rows: CsvRawRow[];
  delimiter: "," | ";";
};

export type TransactionSourceType = "bank-account" | "credit-card";

export type ProviderTransactionRow = {
  dateRaw: string;
  descriptionRaw: string;
  amountRaw: string;
  transactionIdRaw?: string;
  sourceType: TransactionSourceType;
  sourceName: string;
};

export type NormalizedTransaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  direction: "income" | "expense";
  category: string;
  source: "csv-import";
  sourceType: TransactionSourceType;
  sourceName: string;
  externalId?: string;
  isInternalTransfer?: boolean;
  isInvoicePayment?: boolean;
};

export type CsvImportedFileResult = {
  fileName: string;
  provider: CsvProviderType;
  transactions: NormalizedTransaction[];
  errors: string[];
};

export type CsvImportSessionState = {
  importedFiles: CsvImportedFileResult[];
  mergedTransactions: NormalizedTransaction[];
  consolidatedUserState: AuroraUserState;
  mode: "mock" | "imported";
};

export type CsvImportOutput = CsvImportedFileResult;

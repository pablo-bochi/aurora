import type { ParsedCsvFile } from "../../csv-types";

function normalizeHeader(value: string): string {
  return value.trim().toLowerCase();
}

export function isNubankCreditCardCsv(parsed: ParsedCsvFile): boolean {
  const normalized = new Set(parsed.headers.map(normalizeHeader));
  return ["date", "title", "amount"].every((header) => normalized.has(header));
}

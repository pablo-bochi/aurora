import type { ParsedCsvFile } from "../../csv-types";

function normalizeHeader(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function isNubankAccountCsv(parsed: ParsedCsvFile): boolean {
  const normalized = new Set(parsed.headers.map(normalizeHeader));
  return ["data", "valor", "identificador", "descricao"].every((header) => normalized.has(header));
}

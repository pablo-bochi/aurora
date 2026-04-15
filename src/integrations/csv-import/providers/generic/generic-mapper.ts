import type { ParsedCsvFile, ProviderTransactionRow } from "../../csv-types";

function findHeader(headers: string[], candidates: string[]): string | undefined {
  const normalizedMap = new Map<string, string>();
  headers.forEach((header) => {
    normalizedMap.set(
      header
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, ""),
      header
    );
  });

  for (const key of candidates) {
    const found = normalizedMap.get(key);
    if (found) {
      return found;
    }
  }

  return undefined;
}

export function mapGenericRows(parsed: ParsedCsvFile): ProviderTransactionRow[] {
  const dateHeader = findHeader(parsed.headers, ["date", "data"]);
  const descriptionHeader = findHeader(parsed.headers, ["description", "descricao", "title", "historico"]);
  const amountHeader = findHeader(parsed.headers, ["amount", "valor"]);
  const idHeader = findHeader(parsed.headers, ["id", "identificador", "transaction_id"]);

  return parsed.rows.map((row) => ({
    dateRaw: row[dateHeader ?? ""] ?? "",
    descriptionRaw: row[descriptionHeader ?? ""] ?? "",
    amountRaw: row[amountHeader ?? ""] ?? "",
    transactionIdRaw: idHeader ? row[idHeader] : undefined,
    sourceType: "bank-account",
    sourceName: "Generic CSV",
  }));
}

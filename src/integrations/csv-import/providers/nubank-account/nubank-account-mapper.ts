import type { ParsedCsvFile, ProviderTransactionRow } from "../../csv-types";

function headerLookup(headers: string[]): Record<string, string> {
  const map: Record<string, string> = {};
  headers.forEach((header) => {
    const normalized = header
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    map[normalized] = header;
  });
  return map;
}

export function mapNubankAccountRows(parsed: ParsedCsvFile): ProviderTransactionRow[] {
  const lookup = headerLookup(parsed.headers);
  const dataKey = lookup.data;
  const valorKey = lookup.valor;
  const idKey = lookup.identificador;
  const descricaoKey = lookup.descricao;

  return parsed.rows.map((row) => ({
    dateRaw: row[dataKey] ?? "",
    descriptionRaw: row[descricaoKey] ?? "",
    amountRaw: row[valorKey] ?? "",
    transactionIdRaw: row[idKey] ?? undefined,
    sourceType: "bank-account",
    sourceName: "Nubank Account",
  }));
}

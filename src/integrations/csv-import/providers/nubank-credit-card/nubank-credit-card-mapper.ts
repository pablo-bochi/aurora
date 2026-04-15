import type { ParsedCsvFile, ProviderTransactionRow } from "../../csv-types";

function headerLookup(headers: string[]): Record<string, string> {
  const map: Record<string, string> = {};
  headers.forEach((header) => {
    map[header.trim().toLowerCase()] = header;
  });
  return map;
}

export function mapNubankCreditCardRows(parsed: ParsedCsvFile): ProviderTransactionRow[] {
  const lookup = headerLookup(parsed.headers);
  const dateKey = lookup.date;
  const titleKey = lookup.title;
  const amountKey = lookup.amount;

  return parsed.rows.map((row) => ({
    dateRaw: row[dateKey] ?? "",
    descriptionRaw: row[titleKey] ?? "",
    amountRaw: row[amountKey] ?? "",
    sourceType: "credit-card",
    sourceName: "Nubank Credit Card",
  }));
}

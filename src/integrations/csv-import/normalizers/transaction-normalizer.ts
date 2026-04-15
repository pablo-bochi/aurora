import type { CsvProviderType, NormalizedTransaction, ProviderTransactionRow } from "../csv-types";
import { classifyTransactionCategory } from "./transaction-classifier";

const internalTransferPatterns = [
  "transferencia enviada pelo pix - pablo vilela bochi",
  "transferência enviada pelo pix - pablo vilela bochi",
];

function normalizeText(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function sanitizeDescription(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function parseDate(value: string): string | null {
  const input = value.trim();
  if (!input) {
    return null;
  }

  const brMatch = input.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (brMatch) {
    const day = brMatch[1].padStart(2, "0");
    const month = brMatch[2].padStart(2, "0");
    const year = brMatch[3];
    return `${year}-${month}-${day}`;
  }

  const isoMatch = input.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (isoMatch) {
    return `${isoMatch[1]}-${isoMatch[2]}-${isoMatch[3]}`;
  }

  return null;
}

function parseAmount(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  const cleaned = trimmed.replace(/R\$/gi, "").replace(/\s/g, "").replace(/[^\d,.-]/g, "");
  const hasComma = cleaned.includes(",");
  const hasDot = cleaned.includes(".");

  let normalized = cleaned;
  if (hasComma && hasDot) {
    if (cleaned.lastIndexOf(",") > cleaned.lastIndexOf(".")) {
      normalized = cleaned.replace(/\./g, "").replace(",", ".");
    } else {
      normalized = cleaned.replace(/,/g, "");
    }
  } else if (hasComma) {
    normalized = cleaned.replace(/\./g, "").replace(",", ".");
  }

  const parsed = Number.parseFloat(normalized);
  if (Number.isNaN(parsed)) {
    return null;
  }

  return parsed;
}

function buildDeterministicId(input: string): string {
  let hash = 5381;
  for (let index = 0; index < input.length; index += 1) {
    hash = (hash * 33) ^ input.charCodeAt(index);
  }
  return `tx_${(hash >>> 0).toString(16)}`;
}

function inferDirection(
  provider: CsvProviderType,
  sourceType: ProviderTransactionRow["sourceType"],
  amount: number
): "income" | "expense" {
  if (provider === "nubank-credit-card" || sourceType === "credit-card") {
    return amount >= 0 ? "expense" : "income";
  }

  return amount >= 0 ? "income" : "expense";
}

function inferInvoicePayment(description: string): boolean {
  return normalizeText(description).includes("pagamento de fatura");
}

function inferInternalTransfer(description: string): boolean {
  const normalized = normalizeText(description);
  return internalTransferPatterns.some((pattern) => normalized.includes(normalizeText(pattern)));
}

function getTransactionDedupSeed(sourceName: string, date: string, description: string, amount: number): string {
  return `${sourceName}|${date}|${normalizeText(description)}|${amount.toFixed(2)}`;
}

export function normalizeProviderRows(
  rows: ProviderTransactionRow[],
  provider: CsvProviderType
): { transactions: NormalizedTransaction[]; errors: string[] } {
  const transactions: NormalizedTransaction[] = [];
  const errors: string[] = [];

  rows.forEach((row, index) => {
    const date = parseDate(row.dateRaw);
    const amountValue = parseAmount(row.amountRaw);
    const description = sanitizeDescription(row.descriptionRaw);

    if (!date) {
      errors.push(`Linha ${index + 2}: data inválida (${row.dateRaw}).`);
      return;
    }

    if (amountValue === null) {
      errors.push(`Linha ${index + 2}: valor inválido (${row.amountRaw}).`);
      return;
    }

    if (!description) {
      errors.push(`Linha ${index + 2}: descrição vazia.`);
      return;
    }

    const direction = inferDirection(provider, row.sourceType, amountValue);
    const absoluteAmount = Math.abs(amountValue);
    const seed = getTransactionDedupSeed(row.sourceName, date, description, absoluteAmount);
    const id = buildDeterministicId(seed);

    transactions.push({
      id,
      date,
      description,
      amount: absoluteAmount,
      direction,
      category: classifyTransactionCategory(description, direction),
      source: "csv-import",
      sourceType: row.sourceType,
      sourceName: row.sourceName,
      externalId: row.transactionIdRaw,
      isInvoicePayment: inferInvoicePayment(description),
      isInternalTransfer: inferInternalTransfer(description),
    });
  });

  return { transactions, errors };
}

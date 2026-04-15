import type { CsvProviderType, ParsedCsvFile } from "./csv-types";
import { isNubankAccountCsv } from "./providers/nubank-account/nubank-account-detector";
import { isNubankCreditCardCsv } from "./providers/nubank-credit-card/nubank-credit-card-detector";

export function detectCsvProvider(parsed: ParsedCsvFile): CsvProviderType {
  if (isNubankAccountCsv(parsed)) {
    return "nubank-account";
  }

  if (isNubankCreditCardCsv(parsed)) {
    return "nubank-credit-card";
  }

  return "generic";
}

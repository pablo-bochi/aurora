import type { NormalizedTransaction } from "../csv-types";

const rules: Array<{ regex: RegExp; category: string }> = [
  { regex: /salario|salario|transferencia recebida|transferência recebida/i, category: "Renda" },
  { regex: /pagamento de fatura/i, category: "Cartão de crédito" },
  { regex: /enel|telefonica|telefonica|vivo|claro|condominio|condomínio/i, category: "Moradia e Contas" },
  { regex: /uber|\b99\b|allpark|nutag/i, category: "Transporte" },
  { regex: /giga atacado|carrefour|americanas|minuto pa/i, category: "Supermercado e Compras" },
  { regex: /bacio di latte|cinemark|amazonprimebr|applecombill|openai|chatgpt/i, category: "Lazer e Assinaturas" },
  { regex: /raia|farmac/i, category: "Saúde" },
];

export function classifyTransactionCategory(description: string, direction: NormalizedTransaction["direction"]): string {
  const normalized = description
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  for (const rule of rules) {
    if (rule.regex.test(normalized)) {
      return rule.category;
    }
  }

  if (direction === "income") {
    return "Renda";
  }

  return "Outros";
}

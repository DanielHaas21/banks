/**
 * Interest rates
 * sourced from:
 * Moneta - https://www.moneta.cz/sporeni-a-investice/terminovane-vklady
 * Spořka - https://www.csas.cz/cs/osobni-finance/sporeni/terminovany-vklad
 * Komerčka - https://www.kb.cz/cs/obcane/sporeni/terminovany-ucet
 * Air-Bank - https://www.airbank.cz/produkty/terminovany-vklad/?utm_source=google&utm_medium=cpc&utm_campaign=14_INVESTMENTS_SR_Brand-Investice&utm_id=13880890069&gad_source=1&gad_campaignid=13880890069&gbraid=0AAAAADlQha4zl4jbiPx9nIPCNT5ZGYtDw&gclid=EAIaIQobChMIuImJ8OflkAMVq6SDBx2bWAA-EAAYASAAEgI0fvD_BwE
 * unicredit - https://www.unicreditbank.cz/cs/obcane/ucty/ucty.html?utm_source=google&utm_medium=search&utm_campaign=cz-brand-kws_cpc_sea&gad_source=1&gad_campaignid=22928755597&gbraid=0AAAAACWJwBbnESHL5CA4CKOV1yJN1ikkz&gclid=EAIaIQobChMI6YvAwOjlkAMVPfZ5BB1fPRIhEAAYASAAEgK-T_D_BwE
 */
export const BANK_RATES = {
  Moneta: 3.2,
  "Česká spořitelna": 1.85,
  "Komerční banka": 3.0,
  "Air Bank": 3.2,
  Unicredit: 3.15,
} as const satisfies Record<string, number>;

export type BankName = keyof typeof BANK_RATES;

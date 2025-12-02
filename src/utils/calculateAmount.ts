import type { Amount } from "../types/Amount";

/**
 * Calculates interest, tax and total
 * @param amount Initial amount colleted from input
 * @param ratePercent fixed decimal value
 * @param taxRate fixed decimal value
 * @returns Object containing interest, tax and total or 0s if input is invalid
 */
export function calculateAmount(
  amount: number,
  ratePercent: number,
  taxRate: number
): Amount {
  if (amount <= 0 || ratePercent <= 0 || taxRate < 0) {
    return {
      interest: 0,
      tax: 0,
      total: 0,
    };
  }
  const interest: number = amount * (ratePercent / 100);

  const tax: number = interest * taxRate;

  const total: number = amount + interest - tax;

  if (
    !Number.isFinite(interest) ||
    !Number.isFinite(tax) ||
    !Number.isFinite(total)
  ) {
    return {
      interest: 0,
      tax: 0,
      total: 0,
    };
  }

  return {
    interest: Math.round(interest),
    tax: Math.round(tax),
    total: Math.round(total),
  };
}

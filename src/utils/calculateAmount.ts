import type { Amount } from "../types/Amount";

/**
 * Calculates interest, tax and total
 * @param amount 
 * @param ratePercent 
 * @param taxRate 
 * @returns 
 */
export function calculateAmount(
  amount: number,
  ratePercent: number,
  taxRate: number
): Amount {
  const interest = amount * (ratePercent / 100);
  const tax = interest * taxRate;
  const total = amount + interest - tax;

  return {
    interest: Math.round(interest),
    tax: Math.round(tax),
    total: Math.round(total),
  };
}

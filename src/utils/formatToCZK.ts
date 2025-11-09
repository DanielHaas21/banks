/**
 * Formats a numerical value to a czech currency
 * @param value
 * @returns
 */
export function formatToCZK(value: number): string {
  return new Intl.NumberFormat("cs-CZ", {
    style: "currency",
    currency: "CZK",
    maximumFractionDigits: 0,
  }).format(value);
}

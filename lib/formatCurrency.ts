// lib/formatCurrency.ts
export function formatCurrency(amount: number): string {
  // Use fixed locale to ensure consistent formatting between SSR and client
  return amount.toLocaleString("en-NG", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

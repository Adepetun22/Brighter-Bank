export function formatCurrency(value: number, currency = 'USD'): string {
  if (!Number.isFinite(value)) return '$0.00';
  return value.toLocaleString('en-US', { style: 'currency', currency });
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/** Masks all but the last 4 digits: "****4521" */
export function maskAccountNumber(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  return `****${digits.slice(-4)}`;
}

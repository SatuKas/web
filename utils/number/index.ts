/**
 * Formats a numeric or string value into a currency string using the 'id-ID' locale.
 *
 * @param value - The value to be formatted. Can be a string, number, null, or undefined.
 * @param currency - The ISO 4217 currency code to use for formatting. Defaults to 'IDR'.
 * @param minimumFractionDigits - The minimum number of fraction digits to use. Defaults to 0.
 * @returns The formatted currency string, or '-' if the input value is null, undefined, empty, or not a valid number.
 */
export const formatCurrency = (
  value: string | number | null | undefined,
  currency: string = 'IDR',
  minimumFractionDigits: number = 0
) => {
  if (value === null || value === undefined || value === '') return '-';
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(numValue)) return '-';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: minimumFractionDigits,
  }).format(numValue);
};

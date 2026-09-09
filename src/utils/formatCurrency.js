// src/utils/formatCurrency.js

export function formatCurrency(
  amount,
  currency = "USD",
  locale
) {
  if (
    amount === null ||
    amount === undefined ||
    amount === ""
  ) {
    return "";
  }

  const numericAmount = Number(amount);

  if (Number.isNaN(numericAmount)) {
    return "";
  }

  const formatter = new Intl.NumberFormat(
    locale || undefined,
    {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }
  );

  return formatter.format(numericAmount);
}

export default formatCurrency;
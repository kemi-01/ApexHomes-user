// src/utils/formatDate.js

export function formatDate(
  date,
  locale,
  options = {}
) {
  if (!date) {
    return "";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  const defaultOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return new Intl.DateTimeFormat(
    locale || undefined,
    {
      ...defaultOptions,
      ...options,
    }
  ).format(parsedDate);
}

export default formatDate;
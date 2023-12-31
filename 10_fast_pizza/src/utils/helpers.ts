export function formatCurrency(value: number | bigint) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

export function formatDate(date: string | number | Date) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export function calcMinutesLeft(date: string | number | Date) {
  const d1 = new Date().getTime();
  const d2 = new Date(date).getTime();
  return Math.round((d2 - d1) / 60000);
}

// https://uibakery.io/regex-library/phone-number
export function isValidPhone(phoneNumber: string) {
  return /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    phoneNumber,
  );
}

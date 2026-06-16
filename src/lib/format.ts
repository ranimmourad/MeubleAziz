export function formatPrice(value: number): string {
  return new Intl.NumberFormat("fr-TN", {
    style: "currency",
    currency: "TND",
    maximumFractionDigits: 0,
  }).format(value);
}

export const WHATSAPP_NUMBER = "21658244156"; // Tunisia country code + number
export const PHONE_DISPLAY = "58 244 156";

export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

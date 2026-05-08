import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a price in øre (DKK cents) to a human-readable DKK string
 * e.g. 19900 -> "199,00 kr."
 */
export function formatPrice(amountInOere: number): string {
  const amount = amountInOere / 100;
  return new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: "DKK",
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("da-DK", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(dateString));
}

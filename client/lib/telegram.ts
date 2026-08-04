export const TELEGRAM_MANAGEMENT_URL = "https://t.me/Lisalynn662";

export function openTelegramMessage(message: string) {
  window.location.href = `${TELEGRAM_MANAGEMENT_URL}?text=${encodeURIComponent(message)}`;
}

/**
 * Formatters utility
 */

/**
 * Format any price value (number, string, or string with currency) to Vietnamese formatted number string
 * e.g. 4990000 -> "4.990.000"
 * "4990000" -> "4.990.000"
 * "4990000đ" -> "4.990.000"
 * "4.990.000 ₫" -> "4.990.000"
 * "12990000+" -> "12.990.000+"
 * "Liên hệ" -> "Liên hệ"
 */
export function formatPriceNumber(value: unknown): string {
  if (value === undefined || value === null || value === '') return '';
  if (typeof value === 'number') {
    if (isNaN(value)) return '';
    return new Intl.NumberFormat('vi-VN').format(value);
  }

  const str = String(value).trim();
  if (!str) return '';

  // Non-numeric label like "Liên hệ", "Thỏa thuận"
  if (!/\d/.test(str)) return str;

  const hasPlus = str.includes('+');

  // Strip currency symbols and whitespace
  const clean = str.replace(/[đ₫\s]/gi, '').replace(/\+$/, '').trim();

  // If clean is already formatted with dots e.g. "4.990.000"
  if (/^\d{1,3}(\.\d{3})+$/.test(clean)) {
    return clean + (hasPlus ? '+' : '');
  }

  // Extract all digits
  const digitsOnly = clean.replace(/\D/g, '');
  if (!digitsOnly) return str;

  const num = parseInt(digitsOnly, 10);
  if (isNaN(num)) return str;

  return new Intl.NumberFormat('vi-VN').format(num) + (hasPlus ? '+' : '');
}

/**
 * Format any price value with ₫ currency symbol
 * e.g. 4990000 -> "4.990.000 ₫"
 * "4990000" -> "4.990.000 ₫"
 * "4.990.000" -> "4.990.000 ₫"
 * "12.990.000+" -> "12.990.000 ₫+"
 * "Liên hệ" -> "Liên hệ"
 */
export function formatPriceWithVND(value: unknown): string {
  const formatted = formatPriceNumber(value);
  if (!formatted) return '';
  if (!/\d/.test(formatted)) return formatted;

  const hasPlus = formatted.endsWith('+');
  const baseNumber = formatted.replace(/\+$/, '').trim();
  return `${baseNumber} ₫${hasPlus ? '+' : ''}`;
}

/**
 * Format number or numeric string to Vietnamese currency format (e.g. 7.990.000 ₫)
 */
export function formatCurrencyVND(amount: number | string): string {
  return formatPriceWithVND(amount);
}

/**
 * Format date to Vietnamese locale
 */
export function formatDateVN(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(d.getTime())) return '';
  return new Intl.DateTimeFormat('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(d);
}

/**
 * Format phone number display
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 4)}.${cleaned.slice(4, 7)}.${cleaned.slice(7)}`;
  }
  return phone;
}

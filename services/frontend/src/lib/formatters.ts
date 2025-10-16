// ============================================================================
// Formatting Utilities
// Functions for formatting text based on format type
// ============================================================================

/**
 * Format a number as Brazilian currency (R$)
 * @param value - The numeric value or string to format
 * @returns Formatted currency string
 */
export function formatCurrency(value: string | number): string {
  // Remove non-numeric characters except pipe
  const cleanValue = String(value).replace(/[^\d|]/g, '');

  // Check if it's a discount format (has pipe separator for "De R$ X POR R$ Y")
  if (cleanValue.includes('|')) {
    const [oldPrice, newPrice] = cleanValue.split('|');
    const formattedOld = formatSingleCurrency(oldPrice);
    const formattedNew = formatSingleCurrency(newPrice);
    return `De ${formattedOld}\nPOR ${formattedNew}`;
  }

  return formatSingleCurrency(cleanValue);
}

/**
 * Format a single currency value
 */
function formatSingleCurrency(value: string): string {
  const numValue = parseFloat(value) || 0;

  // Format with thousand separators and 2 decimal places
  const formatted = numValue.toLocaleString('pt-BR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return `R$ ${formatted}`;
}

/**
 * Format a value as percentage
 * @param value - The numeric value to format
 * @returns Formatted percentage string
 */
export function formatPercentage(value: string | number): string {
  const numValue = parseFloat(String(value).replace(/[^\d.]/g, '')) || 0;
  return `${numValue}%`;
}

/**
 * Format text based on format type
 * @param content - The raw content to format
 * @param format - The format type
 * @returns Formatted string
 */
export function formatText(content: string, format?: 'none' | 'currency' | 'percentage'): string {
  if (!format || format === 'none') {
    return content;
  }

  if (format === 'currency') {
    return formatCurrency(content);
  }

  if (format === 'percentage') {
    return formatPercentage(content);
  }

  return content;
}

/**
 * Remove formatting from a formatted string to get raw numbers
 * @param formatted - The formatted string
 * @param format - The format type
 * @returns Raw numeric string
 */
export function unformatText(formatted: string, format?: 'none' | 'currency' | 'percentage'): string {
  if (!format || format === 'none') {
    return formatted;
  }

  if (format === 'currency') {
    // Extract numbers from formatted currency
    // Handle discount format "De R$ 150.000\nPOR R$ 120.000" -> "150000|120000"
    if (formatted.includes('\n') && formatted.includes('De ') && formatted.includes('POR ')) {
      const lines = formatted.split('\n');
      const oldPrice = lines[0].replace(/[^\d]/g, '');
      const newPrice = lines[1].replace(/[^\d]/g, '');
      return `${oldPrice}|${newPrice}`;
    }
    return formatted.replace(/[^\d]/g, '');
  }

  if (format === 'percentage') {
    return formatted.replace(/[^\d.]/g, '');
  }

  return formatted;
}

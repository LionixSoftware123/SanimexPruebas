export const formatCurrency = (value: string | number): string => {
  const numericValue =
    typeof value === 'string' ? parseFloat(value.replace(/,/g, '')) : value;

  if (isNaN(numericValue)) {
    return '$0.00';
  }
  const adjustedValue = numericValue / 100;

  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(adjustedValue);
};

export const decodeHtmlEntities = (text: string) => {
  const parser = new DOMParser();
  const decodedString = parser.parseFromString(text, 'text/html')
    .documentElement.textContent;
  return decodedString || text;
};

export default function FormatPrice(value: number | bigint | undefined) {
  if (value === undefined) {
    return '';
  }

  return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

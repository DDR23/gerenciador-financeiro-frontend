export default function FormatPrice(value: number | bigint | undefined) {
  if (value === undefined) {
    return '';
  }

  const amount = Number(value) / 100;
  return amount.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

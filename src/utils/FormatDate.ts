export default function FormatDate(value: any) {
  const date = new Date(value);
  return date.toLocaleDateString('pt-BR');
}

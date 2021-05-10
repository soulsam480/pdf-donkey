export function getDDMMYY(date?: string) {
  const newDate = new Date(date as string);
  return newDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });
}

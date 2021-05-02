export function getDDMMYY(date?: string) {
  const newDate = new Date(date as string);
  return `${newDate.getDate()}/${newDate.getMonth()}/${newDate.getFullYear()}`;
}

export function getDDMMYY(date?: string) {
  const newDate = new Date(date as string);

  return {
    date: newDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    }),
    time: newDate.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    }),
  };
}

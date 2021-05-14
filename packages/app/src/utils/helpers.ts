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

export function parseToHtmlDoc(doc: string) {
  if (!doc) return;
  if (doc.match(/^<html>(.*?)<body>(.*?)<\/body>(.*?)<\/html>/)) return;
}

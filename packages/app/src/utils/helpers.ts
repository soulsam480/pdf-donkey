import axios from 'axios';
import { useToken } from 'src/store/useToken';

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

export const DonkeyApi = axios.create({
  baseURL: import.meta.env.VITE_API,
  headers: {
    'access-token': useToken.getState().token,
  },
});

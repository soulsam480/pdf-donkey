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

export const DonkeyApi = axios.create({
  baseURL: import.meta.env.VITE_API,
});

export function registerDonkey() {
  useToken.subscribe(
    (tokenState: { token: string }) => {
      DonkeyApi.defaults.headers['access-token'] = `Bearer ${tokenState.token}`;
    },
    (token) => token,
  );
}

export function classNames(classes: Record<string, boolean>) {
  const toBeClasses = Object.keys(classes).map((key) =>
    classes[key] === true ? key : '',
  );
  return toBeClasses.join(' ');
}

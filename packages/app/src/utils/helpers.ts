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
  const toBeClasses = Object.keys(classes).map((key) => (classes[key] === true ? key : ''));
  return toBeClasses.join(' ');
}

/**
 * A Diff matcher method to match diffs upto level 1 and retrun diffed data
 * @param newData
 * @param toMatch
 */
export function diffMatcher(
  newData: Record<string, string | number | any>,
  toMatch: Record<string, string | number | any>,
) {
  let diffedData: Record<string, any> = {};
  Object.keys(newData).forEach((key) => {
    newData[key] !== toMatch[key] && newData[key].length > 0 && (diffedData[key] = newData[key]);
  });
  return Object.entries(diffedData).length > 0 ? diffedData : null;
}

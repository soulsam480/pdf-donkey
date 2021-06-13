import axios, { AxiosError } from 'axios';
import { Alert, useAlert } from 'src/store/useAlert';
import { useUser } from 'src/store/userContext';
import { useToken } from 'src/store/useToken';
import {} from 'react-router-dom';
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
  DonkeyApi.interceptors.response.use(
    (res) => res,
    (err: AxiosError<any>) => {
      if (err.response?.status === 401) {
        useAlert.setState({
          alerts: [{ message: 'Unauthorized, Please Login again !', type: 'error' }],
        });
        localStorage.removeItem('__token');
        useUser.setState({ user: {}, isLoggedIn: false });
        Promise.reject(err);
        location.reload();
      }
      Promise.reject(err);
    },
  );
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

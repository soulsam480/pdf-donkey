import Axios, { AxiosResponse } from 'axios';
import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import { User, useUser } from 'src/store/userContext';
import { useToken } from 'src/store/useToken';

interface Props {}

const Index: React.FC<Props> = () => {
  const { push } = useHistory();
  const { search } = useLocation();
  const { setToken } = useToken();
  const { setLogin, setUser } = useUser();
  useEffect(() => {
    const tok = search.split('?auth_success=')[1];
    if (!tok) return push('/login');
    setToken(tok);
    (async () => {
      const user: AxiosResponse<User> = await Axios({
        baseURL: import.meta.env.VITE_API as string,
        url: '/user',
        method: 'get',
        headers: {
          'access-token': tok,
        },
      });
      if (!user.data) {
        setUser({});
        setLogin(false);
        return;
      }
      localStorage.setItem('__token', user.data?.refreshToken as string);
      delete user.data.accessToken;
      setLogin(true);
      setUser({ ...user.data });
      push('/user');
    })();
  }, []);
  return <div>Welcome to PDF Donkey</div>;
};
export default Index;

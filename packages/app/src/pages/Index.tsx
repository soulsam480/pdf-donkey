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
    (async () => {
      try {
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
          push('/login');
          return;
        }
        localStorage.setItem('__token', user.data?.refreshToken as string);
        setToken(user.data.accessToken as string);
        delete user.data.accessToken;
        delete user.data.refreshToken;
        setLogin(true);
        setUser({ ...user.data });
        push('/user');
      } catch (error) {
        console.log(error);
        setUser({});
        setLogin(false);
        push('/login');
      }
    })();
  }, []);
  return <div>Welcome to PDF Donkey</div>;
};
export default Index;

import { User, useUser } from 'src/store/userContext';
import { useToken } from 'src/store/useToken';
import Axios, { AxiosResponse } from 'axios';

export const authState = async () => {
  const token = localStorage.getItem('__token');

  if (token) {
    try {
      const res = await Axios({
        baseURL: import.meta.env.VITE_API as string,
        url: '/token/refresh',
        method: 'get',
        headers: {
          'refresh-token': token,
        },
      });

      if (res.data) {
        const tok = res.data.accessToken;
        localStorage.setItem('__token', res.data.refreshToken);
        useToken.setState({ token: tok });
        const user: AxiosResponse<User> = await Axios({
          baseURL: import.meta.env.VITE_API as string,
          url: '/user',
          method: 'get',
          headers: {
            'access-token': tok,
          },
        });
        if (!user.data)
          return useUser.setState({ user: {}, isLoggedIn: false });
        delete user.data.accessToken;
        delete user.data.refreshToken;
        useUser.setState({ user: user.data, isLoggedIn: true });
      }
    } catch (error) {
      console.log(error);
      localStorage.removeItem('__token');
      useUser.setState({ user: {}, isLoggedIn: false });
    }
    setTimeout(async () => {
      try {
        Axios({
          baseURL: import.meta.env.VITE_API,
          method: 'get',
          url: '/token/refresh/',
          headers: {
            'refresh-token': token,
          },
        }).then((res) => {
          localStorage.setItem('__token', res.data.refreshToken);
          useToken.setState({ token: res.data.accessToken });
        });
      } catch (err) {
        console.log(err);
        localStorage.removeItem('__token');
        useUser.setState({ user: {}, isLoggedIn: false });
      }
    }, 830000);
  }
};

import { User, useUser } from 'src/store/userContext';
import { useToken } from 'src/store/useToken';
import Axios, { AxiosResponse } from 'axios';

export const authState = async () => {
  const token = localStorage.getItem('rtoken');

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
        localStorage.setItem('rtoken', res.data.refreshToken);
        useToken.setState({ token: tok });
        const user: AxiosResponse<User> = await Axios({
          baseURL: import.meta.env.VITE_API as string,
          url: '/user',
          method: 'get',
          headers: {
            'access-token': tok,
          },
        });

        user.data
          ? useUser.setState({ user: user.data, isLoggedIn: true })
          : useUser.setState({ user: {}, isLoggedIn: false });
      }
    } catch (error) {
      console.log(error);
      localStorage.removeItem('rtoken');
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
          localStorage.setItem('rtoken', res.data.refreshToken);
          useToken.setState({ token: res.data.accessToken });
        });
      } catch (err) {
        console.log(err);
        localStorage.removeItem('rtoken');
        useUser.setState({ user: {}, isLoggedIn: false });
      }
    }, 830000);
  }
};

import Axios, { AxiosResponse } from 'axios';
import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';
import { useLoader } from 'src/store/useLoader';
import { User, useUser } from 'src/store/userContext';
import { useToken } from 'src/store/useToken';
const AppFooter = React.lazy(() => import('../components/AppFooter'));

interface Props {}

const Index: React.FC<Props> = () => {
  const { push } = useHistory();
  const { search } = useLocation();
  const { setToken } = useToken();
  const { setLogin, setUser } = useUser();
  const { setLoader } = useLoader();
  useEffect(() => {
    if (!search) return;
    const tok = search.split('?auth_success=')[1];
    if (!tok) return push('/');
    (async () => {
      setLoader(true);
      try {
        const user: AxiosResponse<User> = await Axios({
          baseURL: import.meta.env.VITE_API as string,
          url: '/user',
          method: 'get',
          headers: {
            'access-token': `Bearer ${tok}`,
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
        setLoader(false);
      } catch (error) {
        console.log(error);
        setUser({});
        setLogin(false);
        push('/login');
        setLoader(false);
      }
    })();
  }, []);
  return (
    <div>
      <div className="flex flex-col-reverse lg:flex-row items-center lg:py-48">
        <div className="w-full lg:w-1/2">
          <div className="lg:text-6xl text-5xl text-center lg:text-left font-extrabold pb-4 font-sans">
            PDF Donkey
          </div>
          <div className="lg:text-xl text-lg text-gray-500 pb-3 leading-relaxed">
            The intelligence of a donkey at your{' '}
            <span className="font-bold text-gray-700 hover:text-indigo-500 transition-colors duration-200">
              fingertips
            </span>
            , seriously!
          </div>
          <div className="lg:text-xl text-lg text-gray-500 leading-relaxed justify pb-10">
            Generate PDFs on the fly with fully{' '}
            <span className="text-gray-700 hover:text-indigo-500 font-semibold transition-colors duration-200">
              customizable templates
            </span>
            ,{' '}
            <span className="text-gray-700 hover:text-indigo-500 font-semibold transition-colors duration-200">
              Rich editing
            </span>{' '}
            experience and{' '}
            <span className="text-gray-700 hover:text-indigo-500 font-semibold transition-colors duration-200">
              template variables
            </span>
            . And the best part, PDF Donkey is completely{' '}
            <a
              href=""
              className="font-semibold text-gray-700 hover:text-indigo-500 underline transition-colors duration-200"
            >
              Open-source
            </a>
            . Use it directly or self-host your choice.
          </div>
          <div className="text-center lg:text-left">
            <NavLink
              to="/login"
              className="py-3 mx-2 px-5 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg  transition-colors duration-200"
            >
              Login/ Sign up
            </NavLink>
            <button className="py-3 mx-2 px-5 bg-indigo-50 hover:bg-indigo-100 border-indigo-100 text-black  border-2 font-semibold rounded-lg  transition-colors duration-200">
              <a href="https://github.com/soulsam480">GitHub Repo</a>
            </button>
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <img
            src="/donkey-trans.png"
            className="max-w-full m-auto block"
            alt=""
          />
        </div>
      </div>
      <AppFooter />
    </div>
  );
};
export default Index;

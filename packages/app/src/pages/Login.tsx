import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { User, useUser } from 'src/store/userContext';
import { useToken } from 'src/store/useToken';
import { useAlert } from 'src/store/useAlert';
import AppIcon from 'src/components/AppIcon';

interface Props {}

const Login: React.FC<Props> = () => {
  const router = useHistory();
  const [opType, setOpType] = useState<'login' | 'signup'>('login');
  const { setUser, setLogin } = useUser();
  const { setToken } = useToken();
  const { setAlerts } = useAlert();
  const [user, setLoginUser] = useState<User>({
    email: '',
    name: '',
    password: '',
    username: '',
  });
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    setLoginUser({
      ...user,
      [target.name]: target.value,
    });
  };

  const Login = async (user: User) => {
    await axios({
      baseURL: import.meta.env.VITE_API as string,
      url: '/auth/login/',
      method: 'post',
      data: {
        ...user,
      },
    })
      .then((res) => {
        localStorage.setItem('__token', res.data.refreshToken);
        setToken(res.data.accessToken);
        setLogin(true);
        delete user.refreshToken;
        delete user.accessToken;
        setUser({
          ...res.data,
        });
        router.push('/user');
        setAlerts({
          message: 'Logged in successfully !',
          type: 'success',
        });
      })
      .catch(
        (err) => (
          console.log(err.response),
          setAlerts({
            message: err.response.data,
            type: 'error',
          })
        ),
      );
  };

  const Register = async (user: User) => {
    if (user.username?.includes('@')) {
      console.error("username can't contain @");
      return;
    }
    await axios({
      baseURL: import.meta.env.VITE_API as string,
      url: '/auth/register/',
      method: 'post',
      data: {
        ...user,
      },
    })
      .then((res) => {
        localStorage.setItem('__token', res.data.refreshToken);
        setToken(res.data.accessToken);
        setLogin(true);
        delete user.refreshToken;
        delete user.accessToken;
        setUser({
          ...res.data,
        });
        router.push('/user');
        setAlerts({
          message: 'Logged in successfully !',
          type: 'success',
        });
      })
      .catch(
        (err) => (
          console.log(err),
          setAlerts({
            message: err.response.data,
            type: 'error',
          })
        ),
      );
  };
  return (
    <div className="container">
      <br />
      <br />
      <div className="flex flex-row justify-center ">
        <div className="login sm:w-4/5 lg:w-2/5 w-full">
          <div className="login_card bg-gray-100 p-4 rounded-xl">
            <div className="text-center">
              <img
                src="/donkey-trans.png"
                alt="Donkey Icon"
                style={{ width: '40px', margin: 'auto' }}
              />
            </div>
            <br />
            {opType === 'login' ? (
              <div className="grid grid-cols-1 gap-6">
                <input
                  name="email"
                  type="text"
                  className="bg-gray-300 rounded-md"
                  value={user.email}
                  placeholder="Email or Username"
                  onChange={handleInput}
                />
                <input
                  name="password"
                  type="password"
                  className="bg-gray-300 rounded-md"
                  value={user.password}
                  placeholder="Password"
                  onChange={handleInput}
                  onKeyDown={(e) => e.key === 'Enter' && Login(user)}
                />
                <button
                  className="bg-indigo-500 hover:bg-indigo-600 transition duration-200 ease-in-out p-3 text-white rounded-lg"
                  onClick={(e) => Login(user)}
                >
                  Login
                </button>
                <small className="text-center text-gray-500">Or Login with</small>
                <div className="text-center">
                  <a
                    title="Login with google"
                    type="button"
                    className="bg-indigo-500 hover:bg-indigo-600 transition duration-200 ease-in-out p-2 rounded-lg"
                    href={import.meta.env.VITE_API + 'auth/google'}
                  >
                    <AppIcon icon="ion:logo-google" className="text-white" size="24px" />
                  </a>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                <input
                  name="name"
                  type="text"
                  className="bg-gray-300 rounded-md"
                  value={user.name}
                  placeholder="Name"
                  onChange={handleInput}
                />

                <input
                  name="email"
                  type="email"
                  className="bg-gray-300 rounded-md"
                  value={user.email}
                  placeholder="Email"
                  onChange={handleInput}
                />

                <input
                  name="username"
                  type="text"
                  className="bg-gray-300 rounded-md"
                  value={user.username}
                  placeholder="Username"
                  onChange={handleInput}
                />

                <input
                  name="password"
                  type="password"
                  className="bg-gray-300 rounded-md"
                  value={user.password}
                  placeholder="Password"
                  onChange={handleInput}
                  onKeyDown={(e) => e.key === 'Enter' && Register(user)}
                />
                <button
                  className="bg-indigo-500 hover:bg-indigo-600 transition duration-200 ease-in-out p-3 text-white rounded-lg"
                  onClick={(e) => Register(user)}
                >
                  Sign Up
                </button>
              </div>
            )}
            <br />

            {opType === 'login' ? (
              <p className="muted text-center">
                <small>
                  Don't have an account ?{' '}
                  <span
                    className="blue signup-button cursor-pointer"
                    onClick={() => setOpType('signup')}
                  >
                    Sign Up
                  </span>
                </small>
              </p>
            ) : (
              <p className="muted text-center">
                <small>
                  Already an user ?{' '}
                  <span
                    className="blue signup-button cursor-pointer"
                    onClick={() => setOpType('login')}
                  >
                    Login
                  </span>
                </small>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

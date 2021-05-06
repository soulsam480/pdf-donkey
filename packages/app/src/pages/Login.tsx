import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { colors } from '../styles/variables';
import styled from 'styled-components';
import { User, useUser } from '../store/userContext';
import { useToken } from 'src/store/useToken';

interface Props {}

const LoginContainer = styled.div`
  .login {
    .head {
      font-size: 40px;
    }
    .login_card {
      padding: 40px 15px;
      border-radius: 20px;
      background-color: ${colors.prl};
    }
    .signup-button {
      font-weight: bold;
      cursor: pointer;
    }
  }
`;

const Login: React.FC<Props> = () => {
  const router = useHistory();
  const [opType, setOpType] = useState<'login' | 'signup'>('login');
  const { setUser, setLogin } = useUser();
  const { setToken } = useToken();
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
        localStorage.setItem('rtoken', res.data.refreshToken);
        setToken(res.data.accessToken);
        setLogin(true);
        setUser({
          ...res.data,
        });
        router.push('/user');
      })
      .catch((err) => console.log(err.response));
  };

  const Register = async (user: User) => {
    await axios({
      baseURL: import.meta.env.VITE_API as string,
      url: '/auth/register/',
      method: 'post',
      data: {
        ...user,
      },
    })
      .then((res) => {
        localStorage.setItem('rtoken', res.data.refreshToken);
        setToken(res.data.accessToken);
        setLogin(true);
        setUser({
          ...res.data,
        });
        router.push('/user');
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="container">
      <br />
      <br />
      <LoginContainer className="row center-xs">
        <div className="login col-xs-12 col-md-7 col-sm-8 col-lg-4">
          <div className="login_card">
            <h2 className="center">🦙</h2>
            <br />
            {opType === 'login' ? (
              <div>
                <div className="form-group">
                  <input
                    name="email"
                    type="email"
                    className="input"
                    value={user.email}
                    placeholder="Email"
                    onChange={handleInput}
                  />
                </div>
                <div className="form-group">
                  <input
                    name="password"
                    type="password"
                    className="input"
                    value={user.password}
                    placeholder="Password"
                    onChange={handleInput}
                    onKeyDown={(e) => e.key === 'Enter' && Login(user)}
                  />
                </div>
                <p className="muted text-right">
                  <small className="pointer">Forgot password ?</small>
                </p>
                <button className="btn block" onClick={(e) => Login(user)}>
                  Login
                </button>
              </div>
            ) : (
              <div>
                <div className="form-group">
                  <input
                    name="name"
                    type="text"
                    className="input"
                    value={user.name}
                    placeholder="Name"
                    onChange={handleInput}
                  />
                </div>
                <div className="form-group">
                  <input
                    name="email"
                    type="email"
                    className="input"
                    value={user.email}
                    placeholder="Email"
                    onChange={handleInput}
                  />
                </div>
                <div className="form-group">
                  <input
                    name="username"
                    type="text"
                    className="input"
                    value={user.username}
                    placeholder="Username"
                    onChange={handleInput}
                  />
                </div>
                <div className="form-group">
                  <input
                    name="password"
                    type="password"
                    className="input"
                    value={user.password}
                    placeholder="Password"
                    onChange={handleInput}
                    onKeyDown={(e) => e.key === 'Enter' && Register(user)}
                  />
                </div>
                <button className="btn block">Sign Up</button>
              </div>
            )}
            <br />

            {opType === 'login' ? (
              <p className="muted center">
                <small>
                  Don't have an account ?{' '}
                  <span
                    className="blue signup-button"
                    onClick={() => setOpType('signup')}
                  >
                    Sign Up
                  </span>
                </small>
              </p>
            ) : (
              <p className="muted center">
                <small>
                  Already an user ?{' '}
                  <span
                    className="blue signup-button"
                    onClick={() => setOpType('login')}
                  >
                    Login
                  </span>
                </small>
              </p>
            )}
          </div>
        </div>
      </LoginContainer>
    </div>
  );
};

export default Login;

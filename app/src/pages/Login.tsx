import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { colors } from 'src/styles/variables';
import styled from 'styled-components';
import { User, userContext } from 'src/store/userContext';

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
  const userState = useContext(userContext);
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    setUser({
      ...user,
      [target.name]: target.value,
    });
  };

  const [user, setUser] = useState<User>({
    email: '',
    name: '',
    password: '',
    username: '',
  });
  async function Login(user: User) {
    await axios({
      baseURL: import.meta.env.VITE_API as string,
      url: '/auth/login',
      method: 'post',
      data: {
        ...user,
      },
    })
      .then((res) => {
        localStorage.setItem('r=token', res.data.refreshToken);
        userState?.setUser({ isLoggedIn: true, user: { ...res.data } });
        router.push('/user');
      })
      .catch((err) => console.log(err));
  }
  async function Register(user: User) {
    await axios({
      baseURL: import.meta.env.VITE_API as string,
      url: '/auth/register/',
      method: 'post',
      data: {
        ...user,
      },
    })
      .then((res) => {
        localStorage.setItem('r=token', res.data.refreshToken);
        userState?.setUser({ isLoggedIn: true, user: { ...res.data } });
        router.push('/user');
      })
      .catch((err) => console.log(err));
  }
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
              <form onSubmit={(e) => (e.preventDefault(), Login(user))}>
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
                <button className="btn block" type="submit">
                  Login
                </button>
              </form>
            ) : (
              <form onSubmit={(e) => (e.preventDefault(), Register(user))}>
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
              </form>
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

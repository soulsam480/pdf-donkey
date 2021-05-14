import React from 'react';
import { Redirect, Route, RouteProps, Switch } from 'react-router-dom';
import { authState } from './utils/authstate';
import { useUser } from './store/userContext';
import './index.css';
const Index = React.lazy(() => import('./pages/Index'));
const Login = React.lazy(() => import('./pages/Login'));
const User = React.lazy(() => import('./pages/User'));
const Template = React.lazy(() => import('./pages/Template'));
authState();

interface Props {}
interface PrivateRouteProps extends RouteProps {
  component: React.FC<any>;
  isSignedIn: boolean;
}
const PrivateRoute = (props: PrivateRouteProps) => {
  const { component: Component, isSignedIn, ...rest } = props;

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        isSignedIn ? (
          <Component {...routeProps} />
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: routeProps.location },
            }}
          />
        )
      }
    />
  );
};

const App: React.FC<Props> = () => {
  const userState = useUser();
  return (
    <div>
      <div className="container mx-auto px-4 py-4">
        <Switch>
          <Route
            exact
            path="/"
            render={(routeProps) =>
              !userState.isLoggedIn ? (
                <Index {...routeProps} />
              ) : (
                <Redirect
                  to={{
                    pathname: '/user',
                    state: { from: routeProps.location },
                  }}
                />
              )
            }
          ></Route>
          <Route
            exact
            path="/login"
            render={(routeProps) =>
              !userState.isLoggedIn ? (
                <Login {...routeProps} />
              ) : (
                <Redirect
                  to={{
                    pathname: '/user',
                    state: { from: routeProps.location },
                  }}
                />
              )
            }
          ></Route>
          <PrivateRoute
            exact
            path="/user"
            component={User}
            isSignedIn={userState.isLoggedIn}
          ></PrivateRoute>
          <PrivateRoute
            exact
            path="/template/:id"
            component={Template}
            isSignedIn={userState.isLoggedIn}
          ></PrivateRoute>
        </Switch>
      </div>
    </div>
  );
};

export default App;

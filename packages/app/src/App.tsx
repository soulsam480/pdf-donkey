import React from 'react';
import { Redirect, Route, RouteProps, Switch, useHistory } from 'react-router-dom';
import { authState } from 'src/utils/authstate';
import { useUser } from 'src/store/userContext';
import 'src/index.css';
import { registerDonkey } from 'src/utils/helpers';
import { useLoader } from 'src/store/useLoader';
const AppLoader = React.lazy(() => import('./components/AppLoader'));
const Index = React.lazy(() => import('./pages/Index'));
const Login = React.lazy(() => import('./pages/Login'));
const User = React.lazy(() => import('./pages/User'));
const Template = React.lazy(() => import('./pages/Template'));
authState();
registerDonkey();
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
  const { isLader } = useLoader();
  return (
    <div>
      {isLader && <AppLoader />}
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

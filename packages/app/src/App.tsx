import React, { useState } from 'react';
import { Redirect, Route, RouteProps, Switch } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import Index from './pages/Index';
import Login from './pages/Login';
import Template from './pages/Template';
import User from './pages/User';
import { useUser } from './store/userContext';

interface Props {}

interface PrivateRouteProps extends RouteProps {
  component: any;
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
      <AppNavbar />
      <div className="content">
        <Switch>
          <Route exact path="/" component={Index}></Route>
          <Route exact path="/login" component={Login}></Route>
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
          <PrivateRoute
            exact
            path="/template/all"
            component={Template}
            isSignedIn={userState.isLoggedIn}
          ></PrivateRoute>
        </Switch>
      </div>
    </div>
  );
};

export default App;

import * as React from 'react';
import ROUTES from './constants/routes';
import { Router, Route, Switch } from 'react-router-dom';
import AppChat from './app/chat-app/containers/ChatApp';
import LandingPage from './app/auth/components/Landing';
import Profile from './app/auth/containers/Profile';
import LogIn from './app/auth/containers/LogIn';
import SignUp from './app/auth/containers/SignUp';
import PublicRoute from './app/routers/containers/PublicRoute';
import PrivateRoute from './app/routers/containers/PrivateRoute';
import NotFound from './common/components/NotFound';
import createHistory from 'history/createBrowserHistory';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <Switch>
      <PublicRoute exact path={ROUTES.LANDING} component={LandingPage}/>
      <PublicRoute exact path={ROUTES.LOG_IN} component={LogIn}/>
      <PublicRoute exact path={ROUTES.SIGN_UP} component={SignUp}/>
      <PrivateRoute path={ROUTES.HOME} component={AppChat}/>
      <PrivateRoute path={ROUTES.PROFILE} component={Profile}/>

      <Route component={NotFound}/>
    </Switch>
  </Router>
);

export default AppRouter;
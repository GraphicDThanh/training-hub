import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import ROUTES from '../../../constants/routes';

const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...othersProps
}: any) => (
  <Route {...othersProps} component={(props: any) => {
    if (isAuthenticated) {
      return (
        <Component {...props} />
      );
    } else {
      return (
        <Redirect to={ROUTES.LANDING} />
      );
    }
  }}/>
);

export default PrivateRoute;
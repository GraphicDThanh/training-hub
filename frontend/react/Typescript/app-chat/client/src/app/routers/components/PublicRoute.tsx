import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import ROUTES from '../../../constants/routes';

const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...othersProps
}: any) => {
  return (
    <Route {...othersProps} component={(props: any) => {
      if (isAuthenticated) {
        return (
          <Redirect to={ROUTES.HOME}/>
        );
      } else {
        return (
          <Component {...props} />
        );
      }
    }}/>
  )
};

export default PublicRoute;
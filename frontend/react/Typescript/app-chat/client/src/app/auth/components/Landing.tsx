import * as React from 'react';
import { Link } from 'react-router-dom';
import ROUTES from '../../../constants/routes';

const Landing = () => {
  return (
    <div className="container center authentication landing cute-bg">
      <div className="content-wrapper">
        <h2>Welcome to Chat App</h2>
        <p>To continue, please
          <Link to={ROUTES.LOG_IN}> Log In </Link>
          or
          <Link to={ROUTES.SIGN_UP}> Sign Up</Link>
        </p>
      </div>
    </div>
  )
}

export default Landing;
import * as React from 'react';
import ROUTES from '../../../constants/routes';
import { DEFAULT_AVATAR_URL } from '../../../constants';
import { Link } from 'react-router-dom';

type Props = {
  user: any,
  signOut: (user: any) => {},
};

const Header = (props: Props) => {
  const { user } = props;
  let { displayName, photoURL } = user;

  if (!displayName) {
    displayName = 'Your name';
  }

  const handleSignOut = () => {
    const { user, signOut } = props;
    signOut(user);
  }

  return (
    <header className="App-header clearfix">
      <h1 className="App-title left">Chat Room</h1>
      <div className="user-info right">
        <a className="pointer">
          <img src={photoURL || DEFAULT_AVATAR_URL} className="avatar" alt=""/>
          <span className="name">{displayName}</span>
        </a>
        <div className="dropdown">
          <div className="dropdown-content">
            <Link to={ROUTES.PROFILE} className="btn btn-secondary btn-small" >Edit profile</Link>
            <button
              className="btn btn-secondary btn-small"
              onClick={handleSignOut}
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
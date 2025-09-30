import * as React from 'react';
import { User } from '../../../types/';
import { DEFAULT_AVATAR_URL } from '../../../constants';

interface Props {
  user: User;
}

const UserItem = (props: Props) => {
  const {
    user: { name, avatar }
  } = props;

  return (
    <div className="user">
      <div className="avatar-wrapper">
        <img src={avatar || DEFAULT_AVATAR_URL} alt="avatar user" data-attr="avatar" className="avatar"/>
      </div>
      <p className="name" data-attr="name">{name}</p>
    </div>
  );
}

export default UserItem;
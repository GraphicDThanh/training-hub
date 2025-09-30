import * as React from 'react';
import { User } from '../../../types/';
import UserItem from './UserItem';

interface Props {
  users: User[],
  getUser: () => {}
}

class Users extends React.Component<Props, {}> {
  render() {
    const { users } = this.props;
    return (
      <aside className="user-list">
        <div className="list-content">
          {
            users.map(user => <UserItem user={user} key={user.id} />)
          }
        </div>
      </aside>
    );
  }
}

export default Users;
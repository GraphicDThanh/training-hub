import usersReducer, { Types } from '../users';
import { user, users, currentUser, usersHaveCurrent } from '../../../../mock/';
import socketReducer, { Types as TypesSocket } from '../../../chat-app/redux/socket';

const initState: any = [];
describe('redux user list users', () => {
  it('add user success', () => {
    // add user request to set current user
    socketReducer(initState, {
      type: TypesSocket.ADD_USER_REQUEST,
      user
    });

    expect(
      usersReducer(initState, {
        type: Types.ADD_USER_SUCCESS,
        user
      })
    ).toEqual([
      ...initState,
      currentUser
    ]);
  });

  it('get user success', () => {
    socketReducer(initState, {
      type: TypesSocket.ADD_USER_REQUEST,
      user
    });

    expect(
      usersReducer(initState, {
        type: Types.GET_USER_SUCCESS,
        users
      })
    ).toEqual(usersHaveCurrent);
  });
});
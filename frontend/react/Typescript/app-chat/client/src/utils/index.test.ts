import { users, usersHaveCurrent, currentUser } from '../mock/';
import { getCurrentUser, getLoadingAction, getError } from '.';

describe('test utils function', () => {
  it('get current user when list have current user', () => {
    expect(getCurrentUser(usersHaveCurrent)).toEqual(currentUser);
  });

  it('return empty object when list not have current user', () => {
    expect(getCurrentUser(users)).toEqual({});
  });

  it('get loading action', () => {
    const mockLoadingAction = {
      'SOCKET_CONNECT_REQUEST': true,
      'GET_USER': true,
      'GET_MESSAGE': false,
    };

    const expectLoadingAction = [
      'SOCKET_CONNECT_REQUEST',
      'GET_USER',
    ];
    expect(getLoadingAction(mockLoadingAction)).toEqual(expectLoadingAction);
  });

  it('get loading action when all flag false is return empty', () => {
    const mockLoadingAction = {
      'GET_MESSAGE': false,
    };

    expect(getLoadingAction(mockLoadingAction)).toEqual([]);
  });

  it('get loading action empty return empty', () => {
    expect(getLoadingAction({})).toEqual([]);
  });

  it('get error', () => {
    const mockingActions = {
      SOCKET_CONNECT: 'xhr poll error',
      GET_USER: ''
    };

    const expectErrorObj = {
      SOCKET_CONNECT: 'xhr poll error',
    }
    expect(getError(mockingActions)).toEqual(expectErrorObj);
  });
});
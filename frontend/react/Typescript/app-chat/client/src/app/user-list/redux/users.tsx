import { createReducer, createActions } from 'reduxsauce';
import { User } from '../../../types/';
import { currentDataUser } from '../../chat-app/redux/socket';

export const INITIAL_STATE: any = [];

export const { Types, Creators } = createActions(
  {
    addUser: ['user'],
    addUserSuccess: ['user'],
    addUserError: [],
    getUser: [],
    getUserSuccess: ['users'],
    getUserError: [],
  }
);

export const addUserSuccess = (state = INITIAL_STATE, action: any) => {
  let user = (currentDataUser && action.user && action.user.id === currentDataUser.id) ? currentDataUser : action.user || action.user;
  if (user) {
    return ([
      ...state,
      user,
    ])
  } else {
    return state;
  }
};

export const getUserSuccess = (state = INITIAL_STATE, action: any) => {
  return (action.users.map((user: User) => (currentDataUser && user.id === currentDataUser.id) ? currentDataUser : user));
}

export const HANDLERS = {
  [Types.ADD_USER_SUCCESS]: addUserSuccess,
  [Types.GET_USER_SUCCESS]: getUserSuccess,
};

export default createReducer(INITIAL_STATE, HANDLERS);
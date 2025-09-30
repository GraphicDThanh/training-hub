import { createReducer, createActions } from 'reduxsauce';
import { User } from '../../../types/';
import * as socketIO from 'socket.io-client';
import { SOCKET_SERVER } from '../../../constants/';
const ws = socketIO(SOCKET_SERVER);

export let currentDataUser: User;

export const INITIAL_STATE: any = {};

export const { Types, Creators } = createActions(
  {
    // socket action
    addUserRequest: ['user'],
    getUserRequest: [],
    updateCurrentUser: ['name', 'avatar'],
    addMessageRequest: ['message'],
    getMessageRequest: [],
    removeUserRequest: ['id'],
    removeUserSuccess: [],

    // socket
    socketConnectRequest: [],
    socketError: ['err'],
    socketConnectError: ['err'],
    socketReconnectError: ['err'],
    socketReconnectSuccess: [],
    socketConnectSuccess: [],
  }
);

export const addUserRequest = (state = INITIAL_STATE, action: any) => {
  currentDataUser = {
    ...action.user,
    isCurrent: true
  };

  // delay for showing loading indicator
  ws.emit('addUser', action.user);
  // setTimeout(() => {
  //   ws.emit('addUser', action.user);
  // }, 2000)
  return state;
}


export const removeUserRequest = (state = INITIAL_STATE, action: any) => {
  ws.emit('removeUser', action.id);
  return state;
}

export const getUserRequest = (state = INITIAL_STATE, action: any) => {
  setTimeout(() => {
    ws.emit('getUser');
  }, 500)
  return state;
}

export const getMessageRequest = (state = INITIAL_STATE, action: any) => {
  setTimeout(() => {
    ws.emit('getMessage');
  }, 1500)
  return state;
}

export const addMessageRequest = (state = INITIAL_STATE, action: any) => {
  ws.emit('addMessage', action.message);
  return state;
}

export const updateCurrentUser = (state = INITIAL_STATE, action: any) => {
  currentDataUser = {
    ...currentDataUser,
    name: action.displayName,
    avatar: action.photoURL,
  }
  return state;
}

export const HANDLERS = {
  [Types.ADD_USER_REQUEST]: addUserRequest,
  [Types.GET_USER_REQUEST]: getUserRequest,
  [Types.ADD_MESSAGE_REQUEST]: addMessageRequest,
  [Types.GET_MESSAGE_REQUEST]: getMessageRequest,
  [Types.REMOVE_USER_REQUEST]: removeUserRequest,
  [Types.UPDATE_CURRENT_USER]: updateCurrentUser,
};

export default createReducer(INITIAL_STATE, HANDLERS);
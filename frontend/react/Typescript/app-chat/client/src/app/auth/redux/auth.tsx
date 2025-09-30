import { createReducer, createActions } from 'reduxsauce';
import * as socketIO from 'socket.io-client';
const ws = socketIO('http://172.16.126.46:8080/');

export const INITIAL_STATE: any = {
  user: null,
};

export const { Types, Creators } = createActions({
  loginGoogleRequest: [],
  loginGoogleError: ['err'],
  loginGoogleSuccess: [],

  signUpRequest: ['email', 'password'],
  signUpError: ['err'],
  signUpSuccess: [],

  loginRequest: ['email', 'password'],
  loginError: ['err'],
  loginSuccess: ['user'],

  sync: [],
  syncSuccess: ['user'],
  syncError: ['err'],

  signOut: ['user'],
  signOutSuccess: [],
  signOutError: ['err'],

  updateProfileRequest: ['displayName', 'photoURL'],
  updateProfileSuccess: ['displayName', 'photoURL'],
  updateProfileError: ['err'],
  updateProfileSocket: ['uid', 'displayName', 'photoURL'],
});

export const loginSuccess = (state = INITIAL_STATE, action: any) => {
  return ({
    user: action.user,
  });
}

export const updateProfileSocket = (state = INITIAL_STATE, action: any) => {
  const { uid, displayName, photoURL } = action;
  ws.emit('updateUser', {
    id: uid,
    name: displayName,
    avatar: photoURL
  });

  return state;
}

export const updateProfileSuccess = (state = INITIAL_STATE, action: any) => {
  return ({
    user: {
      ...state.user,
      displayName: action.displayName,
      photoURL: action.photoURL,
    },
  });
}

export const signOut = (state = INITIAL_STATE, action: any) => ({});

export const HANDLERS = {
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.SIGN_OUT]: signOut,
  [Types.UPDATE_PROFILE_SUCCESS]: updateProfileSuccess,
  [Types.UPDATE_PROFILE_SOCKET]: updateProfileSocket,
};

export default createReducer(INITIAL_STATE, HANDLERS);
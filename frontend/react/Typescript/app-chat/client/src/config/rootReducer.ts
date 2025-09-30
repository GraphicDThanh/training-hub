import { combineReducers } from 'redux';
import messages from '../app/chat-system/redux/messages';
import users from '../app/user-list/redux/users';
import socket from '../app/chat-app/redux/socket';
import loading from '../app/chat-app/redux/loading';
import error from '../app/chat-app/redux/error';
import modal from '../app/chat-app/redux/modal';
import auth from '../app/auth/redux/auth';

export default combineReducers({
  messages,
  users,
  socket,
  loading,
  error,
  modal,
  auth,
});
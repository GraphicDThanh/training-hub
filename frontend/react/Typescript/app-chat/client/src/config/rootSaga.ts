import { all } from 'redux-saga/effects'

import socketSaga from '../app/chat-app/sagas/socketSaga';
import addNewUserSaga from '../app/user-list/sagas/addNewUserSaga';
import addNewMessageSaga from '../app/chat-system/sagas/addNewMessageSaga';
import handleGetMessageListSaga from '../app/chat-system/sagas/handleGetMessageSaga';
import handleGetUserSaga from '../app/user-list/sagas/handleGetUserSaga';
import connectSocketSuccessSaga from '../app/chat-app/sagas/connectSocketSuccessSaga';
import loginByGoogleSaga from '../app/auth/sagas/loginByGoogleSaga';
import signUpSaga from '../app/auth/sagas/signUpSaga';
import loginSaga from '../app/auth/sagas/loginSaga';
import syncSaga from '../app/auth/sagas/syncSaga';
import signOutSaga from '../app/auth/sagas/signOutSaga';
import updateProfileSaga from '../app/auth/sagas/updateProfileSaga';

export default function* RootSagas() {
  yield all([
    socketSaga(),
    connectSocketSuccessSaga(),

    addNewUserSaga(),
    handleGetUserSaga(),

    addNewMessageSaga(),
    handleGetMessageListSaga(),

    loginByGoogleSaga(),
    signUpSaga(),
    loginSaga(),
    syncSaga(),
    signOutSaga(),
    updateProfileSaga(),
  ]);
}
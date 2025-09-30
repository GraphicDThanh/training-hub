import { takeEvery, put } from 'redux-saga/effects';
import { Types as TypesSocket } from '../redux/socket';
import store from '../../../config/store';
import { DEFAULT_AVATAR_URL } from '../../../constants';

function* handleConnectSocketSuccess (action: any): any {
  yield put({
    type: TypesSocket.GET_MESSAGE_REQUEST
  });
  yield put({
    type: TypesSocket.GET_USER_REQUEST
  });

  const state = store.getState();

  if (state.auth && state.auth.user) {
    const { displayName, email: emailUser, photoURL, uid } = state.auth.user;

    yield put({
      type: TypesSocket.ADD_USER_REQUEST,
      user: {
        name: displayName || 'Anonymous',
        avatar: photoURL || DEFAULT_AVATAR_URL,
        id: uid,
        email: emailUser,
      }
    });
  }
}

export function* connectSocketSuccessSaga(): any {
  yield takeEvery(TypesSocket.SOCKET_CONNECT_SUCCESS, handleConnectSocketSuccess)
}

export default connectSocketSuccessSaga;
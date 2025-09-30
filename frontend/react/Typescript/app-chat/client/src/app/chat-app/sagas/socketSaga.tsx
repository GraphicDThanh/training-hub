import { takeLatest } from 'redux-saga';
import { call, put, take } from 'redux-saga/effects';
import connectSocket from '../../../config/connectSocket.js';
import { Types as TypesSocket } from '../redux/socket';
import socketData from '../../../constants/socket';

// saga for our Websocket
function* handleSocketSaga (action: any) {
  const socketChannel = yield call(connectSocket, socketData);

  // must listen message from server forever here to catch action
  while(true) {
    const eventAction = yield take(socketChannel);
    // when get action from socket channel, put them in
    yield put(eventAction);
  }
}

// rootSaga for our store, listens for 'SOCKET_CONNECT_REQUEST' dispatch
function* socketSaga(): any {
  yield takeLatest(TypesSocket.SOCKET_CONNECT_REQUEST, handleSocketSaga);
}

export default socketSaga;
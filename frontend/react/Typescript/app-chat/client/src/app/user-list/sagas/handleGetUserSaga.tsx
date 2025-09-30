import { takeEvery, put } from 'redux-saga/effects';
import { Types as TypesUser } from '../redux/users';
import { Types as TypesSocket } from '../../../app/chat-app/redux/socket';

function* handleGetUser (action: any): any {
  yield put({
    type: TypesSocket.GET_USER_REQUEST
  });
}

export function* handleGetUserSaga(): any {
  yield takeEvery(TypesUser.GET_USER, handleGetUser)
}

export default handleGetUserSaga;
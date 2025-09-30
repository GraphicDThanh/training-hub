import { takeEvery, put } from 'redux-saga/effects';
import { Types as TypesMessage } from '../redux/messages';
import { Types as TypesSocket } from '../../../app/chat-app/redux/socket';

function* handleGetMessage (action: any): any {
  yield put({
    type: TypesSocket.GET_MESSAGE_REQUEST
  });
}

export function* handleGetMessageSaga(): any {
  yield takeEvery(TypesMessage.GET_MESSAGE, handleGetMessage)
}

export default handleGetMessageSaga;
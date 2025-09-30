import { takeLatest, put } from 'redux-saga/effects';
import { Types as TypesMessage } from '../redux/messages';
import { Types as TypesSocket } from '../../../app/chat-app/redux/socket';

export function* handleAddNewMessage (action: any): any {
  yield put({
    type: TypesSocket.ADD_MESSAGE_REQUEST,
    message: action.message
  });
}

export function* addNewMessageSaga(): any {
  yield takeLatest(TypesMessage.ADD_MESSAGE, handleAddNewMessage);
}

export default addNewMessageSaga;
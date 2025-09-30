import { takeEvery, put } from 'redux-saga/effects';
import { Types as TypesUser } from '../redux/users';
import { Types as TypesSocket } from '../../../app/chat-app/redux/socket';

function* handleAddNewUser (action: any): any {
  yield put({
    type: TypesSocket.ADD_USER_REQUEST,
    user: action.user
  });
}

export function* addNewUserSaga(): any {
  yield takeEvery(TypesUser.ADD_USER, handleAddNewUser);
}

export default addNewUserSaga;
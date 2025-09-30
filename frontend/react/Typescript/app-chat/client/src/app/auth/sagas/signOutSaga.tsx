import { takeEvery, put, call } from 'redux-saga/effects';
import { Types } from '../redux/auth';
import { Types as TypesSocket } from '../../chat-app/redux/socket';
import { reduxSagaFirebase } from '../../../config/firebase';

function* handleSignOut(action: any) {
  try {
    yield call(reduxSagaFirebase.auth.signOut);
    yield put({
      type: Types.SIGN_OUT_SUCCESS
    });
    yield put({
      type: TypesSocket.REMOVE_USER_REQUEST,
      id: action.user.uid
    });

  } catch (err) {
    yield put({
      type: Types.SIGN_OUT_ERROR,
      err,
    });
  }
}

function* signOutSaga () {
  yield takeEvery(Types.SIGN_OUT, handleSignOut)
}

export default signOutSaga;
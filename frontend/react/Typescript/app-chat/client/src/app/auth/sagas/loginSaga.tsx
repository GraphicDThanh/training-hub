import { takeEvery, put, call } from 'redux-saga/effects';
import { Types } from '../redux/auth';
import { reduxSagaFirebase } from '../../../config/firebase';
import { Action, Account } from '../../../types/';

function* handleLogin(action: Action & Account) {
  try {
    const { email, password } = action;
    const data = yield call(reduxSagaFirebase.auth.signInWithEmailAndPassword, email, password);

    const user = data.user;

    yield put({
      type: Types.LOGIN_SUCCESS,
      user,
    });

  } catch (err) {
    yield put({
      type: Types.LOGIN_ERROR,
      err,
    });
  }
}

function* signUpSaga () {
  yield takeEvery(Types.LOGIN_REQUEST, handleLogin)
}

export default signUpSaga;
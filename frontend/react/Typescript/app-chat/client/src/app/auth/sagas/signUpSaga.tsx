import { takeEvery, put, call } from 'redux-saga/effects';
import { Types } from '../redux/auth';
import { reduxSagaFirebase } from '../../../config/firebase';
import { Action, Account } from '../../../types/';

function* handleSignUp(action: Action & Account) {
  try {
    const { email, password } = action;
    yield call(reduxSagaFirebase.auth.createUserWithEmailAndPassword, email, password);
    yield put({
      type: Types.SIGN_UP_SUCCESS
    });
  } catch (err) {
    yield put({
      type: Types.SIGN_UP_ERROR,
      err
    });
  }
}

function* signUpSaga () {
  yield takeEvery(Types.SIGN_UP_REQUEST, handleSignUp)
}

export default signUpSaga;
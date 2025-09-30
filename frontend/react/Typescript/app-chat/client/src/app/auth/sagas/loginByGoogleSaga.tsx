import { takeEvery, put, call } from 'redux-saga/effects';
import { Types } from '../redux/auth';
import { reduxSagaFirebase, googleAuthProvider } from '../../../config/firebase';

function* handleLoginByGoogle () {
  try {
    const data = yield call(reduxSagaFirebase.auth.signInWithPopup, googleAuthProvider);
    yield put({
      type: Types.LOGIN_GOOGLE_SUCCESS,
      data
    });
  } catch (err) {
    yield put({
      type: Types.LOGIN_GOOGLE_ERROR,
      err
    });
  }
}

function* loginByGoogleSaga () {
  yield takeEvery(Types.LOGIN_GOOGLE_REQUEST, handleLoginByGoogle)
}

export default loginByGoogleSaga;
import { takeEvery, put, call, take } from 'redux-saga/effects';
import { Types } from '../redux/auth';
import { reduxSagaFirebase } from '../../../config/firebase';

function* handleSync(action: any) {
  const channel = yield call(reduxSagaFirebase.auth.channel);

  try {
    while(true) {
    const { user, error } = yield take(channel);
    yield put({
      type: Types.SYNC_SUCCESS,
      user
    });

    if (error) {
      yield put({
        type: Types.SYNC_ERROR,
        err: error,
      });
    }
  }
} catch (err) {
  yield put({
      type: Types.SYNC_ERROR,
      err,
    });
  }
}

function* syncSaga () {
  yield takeEvery(Types.SYNC, handleSync)
}

export default syncSaga;
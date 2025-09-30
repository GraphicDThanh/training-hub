import { takeEvery, put, call } from 'redux-saga/effects';
import { Types } from '../redux/auth';
import { Types as TypesSocket } from '../../chat-app/redux/socket';
import { reduxSagaFirebase } from '../../../config/firebase';
import store from '../../../config/store';

function* handleUpdateProfile(action) {
  try {
    const { displayName, photoURL } = action;
    const result = yield call(reduxSagaFirebase.auth.updateProfile, {
      displayName,
      photoURL,
    });

    const state = store.getState();

    if (state.auth && state.auth.user) {
      yield put({
        type: Types.UPDATE_PROFILE_SOCKET,
        uid: state.auth.user.uid,
        displayName,
        photoURL,
      });
    }


    yield put({
      type: TypesSocket.UPDATE_CURRENT_USER,
      displayName,
      photoURL,
    });

    yield put({
      type: Types.UPDATE_PROFILE_SUCCESS,
      displayName,
      photoURL,
    });
  }
  catch(err) {
    yield put({
      type: Types.UPDATE_PROFILE_ERROR,
      err
    });
  }
}

function* updateProfileSaga () {
  yield takeEvery(Types.UPDATE_PROFILE_REQUEST, handleUpdateProfile)
}

export default updateProfileSaga;
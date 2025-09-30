import { expectSaga } from 'redux-saga-test-plan';
import { handleGetUserSaga } from '../handleGetUserSaga';
import { Types as TypesUser } from '../../redux/users';
import { Types as TypesSocket } from '../../../../app/chat-app/redux/socket';

describe('connect socket success saga', () => {
  it('saga connect socket work', () => {
    return expectSaga(handleGetUserSaga)
      .dispatch({
        type: TypesUser.GET_USER
      })
      .put({
        type: TypesSocket.GET_USER_REQUEST
      })
      .run();
  });
})

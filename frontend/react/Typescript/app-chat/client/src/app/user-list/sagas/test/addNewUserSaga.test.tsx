import { expectSaga } from 'redux-saga-test-plan';
import { addNewUserSaga } from '../addNewUserSaga';
import { Types as TypesUser } from '../../redux/users';
import { user } from '../../../../mock/';
import { Types as TypesSocket } from '../../../../app/chat-app/redux/socket';

describe('connect socket success saga', () => {
  it('saga connect socket work', () => {
    return expectSaga(addNewUserSaga)
      .dispatch({
        type: TypesUser.ADD_USER,
        user
      })
      .put({
        type: TypesSocket.ADD_USER_REQUEST,
        user
      })
      .run();
  });
})

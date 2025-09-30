import { expectSaga } from 'redux-saga-test-plan';
import { addNewMessageSaga } from '../addNewMessageSaga';
import { Types as TypesMessage } from '../../redux/messages';
import { Types as TypesSocket } from '../../../../app/chat-app/redux/socket';
import { message } from '../../../../mock/'

describe('connect socket success saga', () => {
  it('saga connect socket work', () => {
    return expectSaga(addNewMessageSaga)
      .dispatch({
        type: TypesMessage.ADD_MESSAGE,
        message
      })
      .put({
        type: TypesSocket.ADD_MESSAGE_REQUEST,
        message
      })
      .run();
  });
})

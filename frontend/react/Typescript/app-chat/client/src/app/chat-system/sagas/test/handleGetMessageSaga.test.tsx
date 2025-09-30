import { expectSaga } from 'redux-saga-test-plan';
import { handleGetMessageSaga } from '../handleGetMessageSaga';
import { Types as TypesMessage } from '../../redux/messages';
import { Types as TypesSocket } from '../../../../app/chat-app/redux/socket';

describe('connect socket success saga', () => {
  it('saga connect socket work', () => {
    return expectSaga(handleGetMessageSaga)
      .dispatch({
        type: TypesMessage.GET_MESSAGE
      })
      .put({
        type: TypesSocket.GET_MESSAGE_REQUEST
      })
      .run();
  });
})

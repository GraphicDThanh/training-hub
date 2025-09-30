import errorReducer from '../error';
import { Types as TypesSocket } from '../socket';
import { Types as TypesMessage } from '../../../chat-system/redux/messages';

describe('redux chat app error', () => {
  const initState = {};
  it('should add request name with message if name action end by error', () => {
    expect(
      errorReducer(initState, {
        type: TypesMessage.ADD_MESSAGE_ERROR,
        err: {
          message: 'Error message'
        }
      })
    ).toEqual({
      ...initState,
      ADD_MESSAGE: 'Error message'
    });
  });

  it('should return state if action is not error', () => {
    expect(
      errorReducer(initState, {
        type: TypesMessage.ADD_MESSAGE_SUCCESS
      })
    ).toEqual(initState);
    expect(
      errorReducer(initState, {
        type: TypesSocket.ADD_MESSAGE_REQUEST
      })
    ).toEqual(initState);
  });
})
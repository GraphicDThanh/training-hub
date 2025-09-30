import loadingReducer from '../loading';
import { Types } from '../socket';
import { Types as TypesMessage } from '../../../chat-system/redux/messages';

describe('redux chat app loading', () => {
  const initState = {};
  it('should return request name with value true if it is loading', () => {
    expect(
      loadingReducer(initState, {
        type: Types.ADD_USER_REQUEST
      })
    ).toEqual({
      ...initState,
      ADD_USER: true
    });
  });

  it('should return request name with value false if it not loading', () => {
    expect(
      loadingReducer(initState, {
        type: TypesMessage.ADD_MESSAGE_SUCCESS
      })
    ).toEqual({
      ...initState,
      ADD_MESSAGE: false
    });

    expect(
      loadingReducer(initState, {
        type: TypesMessage.ADD_MESSAGE_ERROR
      })
    ).toEqual({
      ...initState,
      ADD_MESSAGE: false
    });
  });
})
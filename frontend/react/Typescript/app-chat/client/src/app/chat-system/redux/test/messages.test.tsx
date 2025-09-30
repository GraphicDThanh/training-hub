import messagesReducer, { Types } from '../messages';
import { message, messages } from '../../../../mock/';

const initState: any = [];

describe('redux user list users', () => {
  it('add message success', () => {
    expect(
      messagesReducer(initState, {
        type: Types.ADD_MESSAGE_SUCCESS,
        message
      })
    ).toEqual([
      ...initState,
      message
    ]);
  });

  it('get message success', () => {
    expect(
      messagesReducer(initState, {
        type: Types.GET_MESSAGE_SUCCESS,
        messages
      })
    ).toEqual(messages);
  });
});
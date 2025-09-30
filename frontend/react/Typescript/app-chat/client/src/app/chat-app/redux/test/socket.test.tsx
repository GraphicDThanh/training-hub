import socketReducer, { Types as TypesSocket } from '../socket';
import { user } from '../../../../mock/';
// NOTE: still not test anything related socket emit event here
describe('redux chat app socket', () => {
  const initState = {};
  it('add user request', () => {
    expect(
      socketReducer(initState, {
        type: TypesSocket.ADD_USER_REQUEST,
        user
      })
    ).toEqual(initState);
  });

  it('get user request', () => {
    expect(
      socketReducer(initState, {
        type: TypesSocket.GET_USER_REQUEST
      })
    ).toEqual(initState)
  });

  it('add message request', () => {
    expect(
      socketReducer(initState, {
        type: TypesSocket.ADD_MESSAGE_REQUEST
      })
    ).toEqual(initState)
  });

  it('get message request', () => {
    expect(
      socketReducer(initState, {
        type: TypesSocket.GET_MESSAGE_REQUEST
      })
    ).toEqual(initState)
  });
})
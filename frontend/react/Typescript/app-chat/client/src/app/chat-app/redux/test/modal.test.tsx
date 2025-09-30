import modalReducer, { Types } from '../modal';

describe('redux chat app modal', () => {
  const initState = {
    showModalSignUp: false
  };
  it('toggle modal sign up', () => {
    expect(
      modalReducer(initState, {
        type: Types.TOGGLE_MODAL_SIGN_UP
      })
    ).toEqual({
      ...initState,
      showModalSignUp: !initState.showModalSignUp
    });
  });
})
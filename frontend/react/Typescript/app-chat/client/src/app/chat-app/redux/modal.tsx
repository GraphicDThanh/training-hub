import { createReducer, createActions } from 'reduxsauce';

export const INITIAL_STATE: any = {
  showModalSignUp: false,
};

export const { Types, Creators } = createActions({
  toggleModalSignUp: [],
});

export const toggleModalSignUp = (state = INITIAL_STATE, action: any) => ({
  ...state,
  showModalSignUp: !state.showModalSignUp
});

export const HANDLERS = {
  [Types.TOGGLE_MODAL_SIGN_UP]: toggleModalSignUp,
};

export default createReducer(INITIAL_STATE, HANDLERS);
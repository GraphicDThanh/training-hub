import { createReducer, createActions } from 'reduxsauce';

export const INITIAL_STATE: any = [];

export const { Types, Creators } = createActions(
  {
    addMessage: ['message'],
    addMessageSuccess: ['message'],
    addMessageError: [],
    getMessage: [],
    getMessageSuccess: ['messages'],
    getMessageError: [],
  }
);

export const addMessageSuccess = (state = INITIAL_STATE, action: any) => {
  return ([
    ...state,
    action.message
  ])
};

export const getMessageSuccess = (state = INITIAL_STATE, action: any) => {
  return action.messages;
}

export const HANDLERS = {
  [Types.ADD_MESSAGE_SUCCESS]: addMessageSuccess,
  [Types.GET_MESSAGE_SUCCESS]: getMessageSuccess,
};

export default createReducer(INITIAL_STATE, HANDLERS);
const errorReducer = (state = {}, action: any) => {
  const { type, err } = action;
  const matches = /(.*)_(REQUEST|SUCCESS|ERROR)/.exec(type);
  if (!matches) return state;

  const [, requestName, requestState] = matches;

  if (requestState === 'ERROR') {
    return {
      ...state,
      [requestName]: err ? err.message : ''
    }
  } else if (requestState === 'SUCCESS' && state[requestName]){
    delete state[requestName];
    return state;
  } else {
    return state;
  }
}

export default errorReducer;
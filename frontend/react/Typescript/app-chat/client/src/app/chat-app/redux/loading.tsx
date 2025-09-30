const loadingReducer = (state = {}, action: any) => {
  const { type } = action;
  const matches = /(.*)_(REQUEST|SUCCESS|ERROR)/.exec(type);
  if (!matches) return state;

  const [, requestName, requestState] = matches;
  if (requestName === 'REMOVE_USER') {
    return state;
  } else {
    return {
      ...state,
      [requestName]: requestState === 'REQUEST'
    }
  }
}

export default loadingReducer;
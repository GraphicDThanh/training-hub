import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import rootReducer from './rootReducer';
import RootSagas from './rootSaga';

const middlewares = [];

// PUSH LOGGER MIDDLEWARE
if (process.env.NODE_ENV === 'development') {
  const logger = createLogger({
    colors: {
      title: () => 'inherit',
      prevState: () => '#3c4d89',
      action: () => '#e24700',
      nextState: () => '#0faa16',
      error: () => '#F20404',
    },
    diff: true,
  });

  middlewares.push(logger);
}

// PUSH SAGA MIDDLEWARE
const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);

const store = createStore(
  rootReducer,
  applyMiddleware(...middlewares)
);

// apply saga - this MUST go after store create
sagaMiddleware.run(RootSagas);

export default store;
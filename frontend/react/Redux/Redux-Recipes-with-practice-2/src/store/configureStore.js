import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import monitorReducersEnhancer from '../enhancers/monitorReducers';
import logger from 'redux-logger';

import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers/';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['modal', 'textFilter', 'textFilter2']
};

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(pReducer,
composeWithDevTools(
  applyMiddleware(
    thunkMiddleware,
    logger
  )),
  monitorReducersEnhancer
);

export const persistor = persistStore(store);
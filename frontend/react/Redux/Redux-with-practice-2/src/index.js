import React from 'react';
import App from './pages/App';
import throttle from 'lodash/throttle';
import configureStore from './configureStore';
import registerServiceWorker from './registerServiceWorker';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { loadState, saveState } from './helpers/localStorage';
import './index.css';

const store = configureStore(loadState());

store.subscribe(throttle(() => {
  saveState({
    products: store.getState().products
  })
}), 1000);

const renderApp = () => render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// if (process.env.NODE_ENV !== 'production' && module.hot) {
//   module.hot.accept('./App', () => {
//     console.log('testing go rende')
//     renderApp();
//   });
// }

renderApp();

registerServiceWorker();

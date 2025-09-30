import React from 'react';
import App from './pages/App';
import { store, persistor } from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import { PersistGate } from 'redux-persist/lib/integration/react';
import LoadingView from './commons/components/loading/LoadingView';

/*const renderApp = () => render(
  <Provider store={store}>
    <PersistGate loading={<LoadingView />}persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);*/
/*const renderApp = () => render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);*/
const renderApp = () => render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      {bootstraped => {
        console.log('testing bootstraped', bootstraped);
        return (
          <LoadingView bootstraped={bootstraped}>
            <App />
          </LoadingView>
        )
      }
      }
    </PersistGate>
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

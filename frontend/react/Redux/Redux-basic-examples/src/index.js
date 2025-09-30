
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import rootReducer from './reducers';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';

// Root component
// - Create store
// - Telling what reducers to use
// - Bring together the view binding and the view
// by use Provider from 'react-redux'
const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();

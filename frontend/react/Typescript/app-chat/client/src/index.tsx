import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import store from './config/store';
import AppRouter, { history } from './AppRouter';
import * as firebase from 'firebase';
import { Creators as CreatorAuth } from './app/auth/redux/auth';
import ROUTES from './constants/routes';

ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
document.getElementById('root') as HTMLElement);

const template = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let isRendered = false;
const renderApp = () => {
  if(!isRendered) {
    ReactDOM.render(template, document.getElementById('root') as HTMLElement);
    isRendered = true;
  }
}

firebase.auth().onAuthStateChanged((user: any) => {
  if (user) {
    store.dispatch(CreatorAuth.loginSuccess(user));
    renderApp();
    if (history.location.pathname === ROUTES.LANDING) {
      history.push(ROUTES.HOME);
    }
  } else {
    CreatorAuth.signOut();
    renderApp();
    history.push(ROUTES.LANDING);
  }
});

registerServiceWorker();
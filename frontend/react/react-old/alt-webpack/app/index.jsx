import '!css!sass!./sass/main.scss';
import 'bootstrap-webpack';
import 'font-awesome-webpack';
import './css/index.css';
import './sass/main.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './config/Routes.js';
import { Router } from 'react-router';
import { createHistory, useBasename} from 'history';

main();

function main() {
  const app = document.createElement('div');
  document.body.appendChild(app);

  const history = useBasename(createHistory)({
    basename: '/'
  })

  ReactDOM.render(<Router history={history} routes={Routes} />, app);
}
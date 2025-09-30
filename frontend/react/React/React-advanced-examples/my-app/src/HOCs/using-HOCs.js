import React, { Component } from 'react';
import { Preloader } from 'react-materialize';

import { enforceLogin } from './HOCs/authentedPolicy';
// PROFILE COMPONENT
class Profile extends Component {
  render() {
    return (
      <div className="loading">
        <center>
          <Preloader flashing size="big" />
        </center>
      </div>
    );
  }
}
export default enforceLogin(Profile)

// ROUTER

export default class Routes extends Component {
  render() {
    return (
      <main>
        <Header />
        <Switch>
          <Route path="/profile" component={Profile} />
          <Route path="/" component={Login} />
        </Switch>
      </main>
    );
  }
}

// OR
export default class Routes extends Component {
  render() {
    return (
      <main>
        <Header />
        <Switch>
          <Route path="/profile" component={enforceLogin(Profile)} />
          <Route path="/" component={Login} />
        </Switch>
      </main>
    );
  }
}

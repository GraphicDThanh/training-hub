import React from 'react';
import MainNav from './main-nav/MainNav';


export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="header navbar navbar-default navbar-fixed-top" role="navigation">
        <div className="container topnav">
          <div className="clearfix">
            <h1 className="header__logo pull-left">
              <a className="header__logo--text">Start Bootstrap</a>
            </h1>
            <MainNav position={'header'}/>
          </div>
        </div>
      </nav>
    );
  }
}
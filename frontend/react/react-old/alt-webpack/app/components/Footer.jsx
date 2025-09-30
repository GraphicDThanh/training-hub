import React from 'react';
import MainNav from './main-nav/MainNav';

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <MainNav position={'footer'} />
              <p className="footer__copyright text-muted small">Copyright &copy; Your Company 2014. All Rights Reserved</p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
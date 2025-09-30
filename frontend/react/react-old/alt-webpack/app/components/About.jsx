import React from 'react';
import SocialGroup from './social-group/SocialGroup.jsx';

export default class About extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="about">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="about__message">
                <h2 className="about__brand">Landing Page</h2>
                <h3 className="about__brand--sub">A Template by Start Bootstrap</h3>
                <SocialGroup />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
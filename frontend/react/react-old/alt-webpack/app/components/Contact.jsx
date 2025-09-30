import React from 'react';
import SocialGroup from './social-group/SocialGroup';

export default class Contact extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const socialGroup = this.props.socials;

    return (
      <div className="contact">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <h2 className="contact__title">Connect to Start Bootstrap:</h2>
            </div>
            <div className="col-lg-6">
              <SocialGroup />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
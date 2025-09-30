import React from 'react';
import SocialButton from './SocialButton.jsx';
import data from './../../static-data/static-data.json.js';

export default class SocialGroup extends React.Component {
  constructor(props) {
    super(props);
    
    this.renderSocialGroup = this.renderSocialGroup.bind(this);
  }

  render() {
    const socialGroup = data.socialGroup;
    return (
      <ul className="list-inline about__social">
        {socialGroup.map((item, i) => this.renderSocialGroup(item, i))}
      </ul>
    );
  }

  renderSocialGroup(social, i) {
    return (
      <li key={i} className="about__social-item">
        <SocialButton social={social}/>
      </li>
    );
  }
}
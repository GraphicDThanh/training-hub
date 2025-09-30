import React from 'react';

export default class SocialButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <a href={this.props.social.linkto} className="btn btn-default btn-lg about__social-item--link">{this.props.social.name}</a>
    );
  }
}
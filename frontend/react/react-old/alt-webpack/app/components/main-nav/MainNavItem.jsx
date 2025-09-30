import React from 'react';
import { Link } from 'react-router';

export default class MainNavItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li className="mainNav__item">
        <Link to={this.props.item.linkto} className="mainNav__link">{this.props.item.name}</Link>
      </li>
    );
  }
}
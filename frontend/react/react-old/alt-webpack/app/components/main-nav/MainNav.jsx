import React from 'react';
import MainNavItem from './MainNavItem';
import data from './../../static-data/static-data.json.js';

export default class MainNav extends React.Component {
  constructor(props) {
    super(props);

    this.renderMainNavItem = this.renderMainNavItem.bind(this);
  }

  render() {
    const navItems = data.navItems;
    const position = this.props.position;
    var menuClass;
    
    if(position === 'header') {
      menuClass = 'nav navbar-nav navbar-right';
    } else if(position === 'footer') {
      menuClass = 'list-inline';
    }

    return (
      <ul className={menuClass}>
        {navItems.map((item, i) => this.renderMainNavItem(item, i, position))}
      </ul>
    );
  }

  renderMainNavItem (item, i, position) {
    return (
      <MainNavItem item={item} key={i} />
    );
  }
}
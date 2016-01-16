import React, { Component } from 'react';
import { Link } from 'react-router';
import Actions from '../actions/actions';



let Nav = React.createClass({
  createLinks() {
    return this.props.links.map(this.makeLinkMarkup);
  },
  onCategorySelected(cat) {
    this.props.onCategorySelected(cat.id);
  },
  makeLinkMarkup(link, i) {
    return <li key={i}><a href="#" onClick={this.onCategorySelected.bind(this, link)}>{link.name}</a></li>
  },
  render() {
    var links = this.createLinks();
    return (
      <div>
      <h1>Nav</h1>
      <ul>{links}</ul>
      </div>
    );
  }
});

export default Nav;

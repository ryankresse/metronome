import React, { Component } from 'react';
import { Link } from 'react-router'


let Nav = React.createClass({
  createLinks() {
    return  this.props.links.map(this.makeLinkMarkup);
  },
  makeLinkMarkup(link, i) {
    return <li key={i}><Link to={`/category/${link.id}`}>{link.name}</Link></li>
  },
  render() {
    return (
      <div>
      <h1>Nav</h1>
      <ul>{this.createLinks()}</ul>
      </div>
    );
  }
});

export default Nav;

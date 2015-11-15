import React, { Component } from 'react';
import Entry from './entry';
export default class Category extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var createEntry = function (entry, index) {
      return <li key={index}><Entry key={index} entry={entry} /></li>
    }
    return (
      <div>
        <h1>{this.props.category.name}</h1>
        <ul>{this.props.category.entries.map(createEntry)}</ul>
      </div>
    );
  }
}

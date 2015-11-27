import React, { Component } from 'react';
import Entry from './entry';
import Actions from '../actions/actions';
var self;
export default class Category extends Component {
  constructor(props) {
    super(props);
    self = this;
  }
  createNewEntry() {
    var name = document.getElementById('newEntry').value;
    Actions.createEntry(name, self.props.category.id);
  }
  render() {
    var createEntry = function (entry, index) {
      return <li key={index}><Entry key={index} entry={entry} /></li>
    }
    return (
      <div>
        <h1>{this.props.category.name}</h1>
        <ul>{this.props.category.entries.map(createEntry)}</ul>
        <input type="text" id="newEntry" placeholder="Create entry"/>
        <button onClick={this.createNewEntry}>Create entry</button>
      </div>
    );
  }
}

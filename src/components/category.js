import React from 'react';
import Entry from './entry';
import Actions from '../actions/actions';
import Store from '../stores/store';
import { Link } from 'react-router'


export default React.createClass({

  onCreateNewEntryClick: function () {
    var name = document.getElementById('newEntry').value;
    if (name.length) {
      Actions.createEntry(name);
    }
  },
  onEntrySelected(entry) {
    this.props.onEntrySelected(entry);
  },
  createEntryLinks(entry, i) {
    return <li key={i}><a onClick={this.onEntrySelected.bind(this, entry)}>{entry.name}</a></li>
  },
  render: function () {
    var template;
    if (this.props.selectedCategory) {
      template =
      <div>
        <h1>{this.props.selectedCategory.name}</h1>
          <ul>{this.props.selectedCategory.entries.map(this.createEntryLinks)}</ul>

            <input type="text" id="newEntry" placeholder="Create entry"/>
          <button onClick={this.onCreateNewEntryClick}>Create entry</button>
        </div>
    }
    else {
      template = <span>No category</span>
    }
    return (
      <div>{template}</div>
    );
  }
});

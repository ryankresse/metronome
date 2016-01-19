import React from 'react';
import Entry from './entry';
import Actions from '../actions/actions';
import Store from '../stores/store';
import { Link } from 'react-router'


export default React.createClass({

  onCreateNewEntryClick: function () {
    var name = document.getElementById('newEntry').value;
    if (name.length) {
      this.props.onCreateNewEntryClick(name);
    }
  },
  onEntrySelected(entry) {
    this.props.onEntrySelected(entry.id);
  },
  createEntryLinks(entry, i) {
    return <li key={i}><a href="#" onClick={this.onEntrySelected.bind(this, entry)}>{entry.name}</a></li>
  },
  render: function () {
    var template;
    if (this.props.selectedCategory) {
      template =
      <div >
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

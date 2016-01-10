import React from 'react';
import Entry from './entry';
import Actions from '../actions/actions';
import Store from '../stores/store';
import { Link } from 'react-router'



export default React.createClass({
  setCategory() {
    this.setState({category: Store.getCategory(parseInt(this.props.params.categoryId))});
  },
  componentWillMount() {
    this.setCategory();
  },
  componentWillReceiveProps: function(newProps) {
    if (parseInt(newProps.params.categoryId) === this.state.category.id) return;
    this.setState({category: Store.getCategory(parseInt(newProps.params.categoryId))});
  },
  createNewEntry:function (id) {
    var name = document.getElementById('newEntry').value;
    Actions.createEntry(name, id);
  },
  getNewEntryValue: function() {
    return document.getElementById('newEntry').value;
  },
  createEntryLinks(entry, i) {
    return <li key={i}><Link to={`category/${this.state.category.id}/${entry.id}`}>{entry.name}</Link></li>
  },
  getSelectedEntry(entryId) {
    var entry = _.find(this.state.category.entries, {'id': parseInt(entryId)});
    return entry;
  },
  render: function () {
    var createEntry = function (entry, index) {
      return <li key={index}><Entry key={index} entry={entry} /></li>
    }
    return (
      <div>
        <h1>{this.state.category.name}</h1>
          <ul>{this.state.category.entries.map(this.createEntryLinks)}</ul>
          <input type="text" id="newEntry" placeholder="Create entry"/>
          <button onClick={this.createNewEntry.bind(this, this.state.category.id)}>Create entry</button>
          {this.props.children && React.cloneElement(this.props.children, {
              getSelectedEntry: this.getSelectedEntry
            })}
        </div>

    );
  }
});

import React from 'react';
import Entry from './entry';
import Actions from '../actions/actions';
import Store from '../stores/store';


export default React.createClass({
  setCategory() {
    this.setState({category: Store.getCategory(parseInt(this.props.params.id))});
  },
  componentWillMount() {
    this.setCategory();
  },
  componentWillReceiveProps: function(newProps) {
    this.setState({category: Store.getCategory(parseInt(newProps.params.id))});
  },
  createNewEntry:function (id) {
    var name = document.getElementById('newEntry').value;
    Actions.createEntry(name, id);
  },
  getNewEntryValue: function() {
    return document.getElementById('newEntry').value;
  },
  render: function () {
    var createEntry = function (entry, index) {
      return <li key={index}><Entry key={index} entry={entry} /></li>
    }
    return (
      <div>
        <h1>{this.state.category.name}</h1>
          <ul>{this.state.category.entries.map(createEntry)}</ul>
          <input type="text" id="newEntry" placeholder="Create entry"/>
          <button onClick={this.createNewEntry.bind(this, this.state.category.id)}>Create entry</button>
        </div>

    );
  }
});

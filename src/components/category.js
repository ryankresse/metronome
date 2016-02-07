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
    document.getElementById('newEntry').value = "";
  },
  onEntrySelected(entry) {
    this.props.onEntrySelected(entry._id);
  },

  onDeleteEntryClick(entry, e) {
    e.stopPropagation();
    this.props.onDeleteEntry(entry._id);
  },
  createEntryLinks(entry, i) {
    var classNames = "panel panel-default outer-panel-div"
    if (this.props.selectedEntry && (entry._id === this.props.selectedEntry._id)) {
      classNames += " selected-entry";
    }
    //return <li key={i}><a href="#" onClick={this.onEntrySelected.bind(this, entry)}>{entry.name}</a></li>

    return (
    <div key={i} className={classNames}
      onClick={this.onEntrySelected.bind(this, entry)}>
      <div className="entry-panel-body">
        {entry.name}
        <span onClick={this.onDeleteEntryClick.bind(this, entry)}
          className="pull-right glyphicon glyphicon-remove">
        </span>
      </div>

    </div>
    )
  },
  render: function () {
    var template;
    if (this.props.selectedCategory) {
      template =
      <div >
        {this.props.selectedCategory.entries.map(this.createEntryLinks)}

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

import React, { Component } from 'react';
import Actions from '../actions/actions';

export default class Entry extends Component {


  render() {
    var template;
    if (this.props.selectedEntry) {
      template =
      <div>
        <h3>{this.props.selectedEntry.name}</h3>
        <label>Best:</label> {this.props.selectedEntry.best.value}, {this.props.selectedEntry.best.date}
        <label>Most Recent:</label> {this.props.selectedEntry.recent.value}, {this.props.selectedEntry.recent.date}
      </div>
    }
    else {
      template = <span></span>
    }

    return (
      <div>{template}</div>
    );
  }
}

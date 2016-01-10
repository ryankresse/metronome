import React, { Component } from 'react';

export default class Entry extends Component {
  getEntry() {
    return this.props.getSelectedEntry(this.props.params.entryId);
  }
  componentWillMount() {
    this.setState({entry: this.getEntry()});
  }
  componentWillReceiveProps() {
    this.setState({entry: this.getEntry()});
  }

  render() {
    return (
      <div>
        <h3>{this.state.entry.name}</h3>
        <label>Best:</label> {this.state.entry.best.value}, {this.state.entry.best.date}
        <label>Most Recent:</label> {this.state.entry.recent.value}, {this.state.entry.recent.date}
      </div>
    );
  }
}

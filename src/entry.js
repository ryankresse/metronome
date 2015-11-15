import React, { Component } from 'react';

export default class Entry extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h3>{this.props.entry.name}</h3>
        <label>Best:</label> {this.props.entry.best.value}, {this.props.entry.best.date}
        <label>Most Recent:</label> {this.props.entry.recent.value}, {this.props.entry.recent.date}
      </div>
    );
  }
}

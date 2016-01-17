import React, { Component } from 'react';

export default React.createClass({

  getInitialState() {
    return {
      newCatValue: ""
    }
  },

  onNewCatChange() {
    this.setState({newCatValue: document.getElementById('newCatValue').value});
  },

  onCreateCatClick() {
    if (this.state.newCatValue.length) {
      this.props.onCreateCatClick(this.state.newCatValue);
      this.setState({newCatValue: ""});
    }
  },

  render() {
    return (
      <div>
        <input id="newCatValue" onChange={this.onNewCatChange} value={this.state.newCatValue} type="text" placeholder="Create new category" />
        <button id="" onClick={this.onCreateCatClick}>Create</button>
      </div>
    );
  }
});

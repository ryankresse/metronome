import React, { Component } from 'react';
import Store from '../stores/store';

var emitUpdateCountdownEventFlag = false;

var emitUpdateCountdownEventTimeout = "uninitialized";

export default React.createClass({
  getInitialState () {
    return {tickInterval: null, tickSpeed: this.props.tickSpeed}
  },

  onStartStopClick(e) {
    this.props.onStartStopClick(parseInt(document.getElementById('tickSpeed').value));
  },

  createNewTickInterval(newSpeed) {
    window.clearInterval(this.state.tickInterval);
    this.setState({
      tickInterval: startTick(newSpeed)
    }, this.emitStartRecentCountdown(newSpeed));
  },

  onTickSpeedInputChange(e) {
    var newSpeed = e.target.value;
    this.props.onTickSpeedInputChange(newSpeed);
  },

  emitStartRecentCountdown(speed) {
    this.props.onStartStopClick("START", speed);
  },

  emitStopRecentCountdown(speed) {
    this.props.onStartStopClick("STOP", speed);
  },

  handleSetAsFastestClick() {
      this.props.onSetAsFastestClick(document.getElementById('bpmVal').value);
  },

  render() {
    return (
      <div>
        <input id="bpmVal" onChange={this.props.onTickSpeedInputChange} type="text" value={this.props.tickSpeed} />
        <button id="btn" onClick={this.onStartStopClick}>{this.props.btnText}</button>
        <button id="" onClick={this.handleSetAsFastestClick}>Set as fastest</button>
        <input type="range" id="tickSpeed"
          onChange={this.onTickSpeedInputChange}
          value={this.props.tickSpeed}
          min="30"
          max="160"/>

        <h4>{this.props.tickSpeed}</h4>

      </div>
    );
  }
});

function isNewSpeed (newSpeed, oldSpeed) {
  return newSpeed && parseInt(newSpeed) !== parseInt(oldSpeed);
}

function stopTick (bpm) {
    document.getElementById('btn').innerText = "Start"
    return null;
}

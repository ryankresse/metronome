import React, { Component } from 'react';
import Store from '../stores/store';

var emitUpdateCountdownEventFlag = false;

var emitUpdateCountdownEventTimeout = "uninitialized";

export default React.createClass({
  getInitialState () {
    return {tickInterval: null, tickSpeed: this.props.tickSpeed}
  },

  /*componentWillReceiveProps(newProps) {
    var differentSpeed = isNewSpeed(newProps.tickSpeed, this.state.tickSpeed);

    if (!differentSpeed) return;

    if (this.state.tickInterval) {
      window.clearInterval(this.state.tickInterval);
      this.setState({
        tickSpeed: newProps.tickSpeed,
        tickInterval: startTick(newProps.tickSpeed)
      }, this.emitStartRecentCountdown(newProps.tickSpeed));
    }
    else {
      this.setState({
        tickSpeed: newProps.tickSpeed,
        tickInterval: null
      });
    }

  },*/

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

    /*if (this.state.tickInterval) {
      window.clearTimeout(emitUpdateCountdownEventTimeout);
      emitUpdateCountdownEventTimeout =
      window.setTimeout(this.createNewTickInterval.bind(this, newSpeed), 2000);
    }*/
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



//when the user changes the speed
//-we always want to update the tickSpeed of the state
//- if there's a tickInterval, we want to update that
// - if there's a selectedEntry, we want to update the most recent countdown

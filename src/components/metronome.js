import React, { Component } from 'react';
import Store from '../stores/store';

var tickInterval;
export default class Metronome extends Component {
  constructor(props) {
    super(props);
    this.state = {tickInterval: null};
  }

  onStartStopClick() {
    var bpm = parseInt(document.getElementById('bpmVal').value);
    this.setState({
      tickInterval: startOrStopTick(bpm, this.state.tickInterval)
    }, this.emitStartOrStopEvent);
  }
  
  emitStartOrStopEvent() {
    this.state.tickInterval ? this.props.onStartStopClick("START") : this.props.onStartStopClick("STOP");
  }
  handleSetAsFastestClick() {
      this.props.onSetAsFastestClick(document.getElementById('bpmVal').value);
  }

  render() {
    return (
      <div>
        <input id="bpmVal" onChange={this.props.onTickSpeedInputChange} type="text" value={this.props.tickSpeed} />
        <button id="btn" onClick={this.onStartStopClick.bind(this)}>Start</button>
        <button id="" onClick={this.handleSetAsFastestClick.bind(this)}>Set as fastest</button>

      </div>
    );
  }
}

function startOrStopTick (bpm, tickInterval) {
  if (tickInterval) {
    window.clearInterval(tickInterval);
    document.getElementById('btn').innerText = "Start"
    return null;
  }

  document.getElementById('btn').innerText = "Stop"
  var interval = (60 / bpm) * 1000;
  var tick = new Audio('tick.mp3');
  return setInterval(function(){
    tick.play();
  }, interval);
}

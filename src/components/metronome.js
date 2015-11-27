import React, { Component } from 'react';

var tickInterval;
export default class Metronome extends Component {
  constructor(props) {
    super(props);
    this.state = {tickInterval: null};
  }
  onBtnClick() {
    var bpm = parseInt(document.getElementById('bpmVal').value);
    this.setState({
      tickInterval: startOrStopTick(bpm, this.state.tickInterval)
    });
  }
  onBtnClick = this.onBtnClick.bind(this);
  render() {
    return (
      <div>
        <input id="bpmVal" type="text" />
        <button id="btn" onClick={this.onBtnClick}>Start</button>
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

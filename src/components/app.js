import React, { Component } from 'react';
import Metronome from './metronome';
import Nav from './Nav';
import Categories from './categories';
import Category from './category';
import Store from '../stores/store';
import Actions from '../actions/actions';
import Entry from './entry';


/*$.post('/test', {data: 'hello'}, function (res) {
  console.log(res);
});*/

function getState () {
  return Store.getState();
}

let App = React.createClass({

  getInitialState: function () {
    return getState();
  },
  componentDidMount: function() {
    Store.addChangeListener(this._onChange);
  },
  onTickSpeedInputChange: function(e) {
    this.setState({categories: this.state.categories, tickSpeed: e.target.value});
  },
  componentWillUnmount: function() {
    Store.removeChangeListener(this._onChange);
  },
  onSetAsFastestClick: function (speed) {
    Actions.setAsFastest(speed);
  },
  _onChange: function (){
    this.setState(getState());
  },
  _buildCategoryLinks: function() {
    return this.state.categories.map(cat => ({name: cat.name, id: cat.id}));
  },
  onEntrySelected(entry) {
    Actions.onEntrySelected(entry);
  },
  onCategorySelected(catId) {
    Actions.onCategorySelected(catId);
  },
  onCreateNewEntryClick(name) {
      Actions.createEntry(name);
  },
  startRecentCountdown() {
    Actions.startRecentCountdown();
  },
  onStartStopClick(startOrStop) {
    if (!this.state.selectedEntry) return;
    Actions.onStartStopClick(startOrStop, this.state.tickSpeed);
  },
  render: function () {
    var catLinks = this._buildCategoryLinks();
    return (
      <div>
        <Metronome
          onSetAsFastestClick={this.onSetAsFastestClick}
          onTickSpeedInputChange={this.onTickSpeedInputChange}
          tickSpeed={this.state.tickSpeed}
          onStartStopClick={this.onStartStopClick}/>

        <Nav onCategorySelected={this.onCategorySelected} links= {catLinks}/>
        <Category onEntrySelected={this.onEntrySelected} onCreateNewEntryClick={this.onCreateNewEntryClick} selectedCategory={this.state.selectedCategory} />
        <Entry selectedEntry={this.state.selectedEntry} />
      </div>
    );
  }
});

///how should the tickspeed be handled?
//the metronome should handle the actual tick sound
//when the startOrStop button is clicked, it should call a method on app
//passing a parameter indicating whether it's a start or stop click
//if there is a selected entry, app should call an action
//the store should start a countdown, and once that countdown has passed, it should
//update the most recent value and date of the selected entry
//if the parameter, is a stop tick event, it should clear that countdown
//on selectEntry or selectCategory click, it should clear the countdown if it's going
export default App;

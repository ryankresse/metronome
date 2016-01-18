import React, { Component } from 'react';
import Metronome from './metronome';
import Nav from './Nav';
import Categories from './categories';
import Category from './category';
import Store from '../stores/store';
import Actions from '../actions/actions';
import Entry from './entry';
import CreateCategory from './create-category';


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
  onTickSpeedInputChange: function(speed) {
    Actions.onTickSpeedInputChange(speed);
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
  onEntrySelected(entryId) {
    Actions.onEntrySelected(entryId);
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
  onStartStopClick(newSpeed) {
    Actions.onStartStopClick(newSpeed);
  },
  onCreateCatClick(catName) {
    Actions.createCategory(catName);
  },
  render: function () {
    var catLinks = this._buildCategoryLinks();
    return (
      <div>
        <Metronome
          onSetAsFastestClick={this.onSetAsFastestClick}
          onTickSpeedInputChange={this.onTickSpeedInputChange}
          tickSpeed={this.state.tickSpeed}
          onStartStopClick={this.onStartStopClick}
          btnText={this.state.btnText}
          />

        <Nav onCategorySelected={this.onCategorySelected} links= {catLinks}/>
        <CreateCategory onCreateCatClick={this.onCreateCatClick} />
        <Category onEntrySelected={this.onEntrySelected} onCreateNewEntryClick={this.onCreateNewEntryClick} selectedCategory={this.state.selectedCategory} />
        <Entry selectedEntry={this.state.selectedEntry} />
      </div>
    );
  }
});

//first let's get the tick speed to change when a user selects an entry
//the simplest way to do this might be to listen for the onReceiveProps eve
//the issue is that if you receive the notification that a new entry has been selected from the props
//event. the issue is that you're receiving that event twice. the willReceiveProps event,
//stops the tick
//maybe when you receive the props, if the tick is going, you update the value slider and the tickInterval
//but when the input changes, you let the component handle updating the slider value itself
//may need to rearchitect, or not?
//when the tickInterval is changed, if there is a selectedEntry, you always want to reset the most recent countDown
//

export default App;

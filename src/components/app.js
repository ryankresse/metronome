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
  onDeleteCategory(catId) {
    Actions.onDeleteCategory(catId);
  },
  onDeleteEntry(entryId, catId) {
    Actions.onDeleteEntry(entryId);
  },
  render: function () {
    var catLinks = this._buildCategoryLinks();
    var containerStyle = {"marginTop": "20px"};
    return (
      <div className="container" style={containerStyle}>
        {this.state.error}
        <div className="row">
          <div className="col-xs-5">
            <div className="row">
              <div className="col-xs-6">
                <Nav
                  onCategorySelected={this.onCategorySelected}
                  selectedCategory={this.state.selectedCategory}
                  onDeleteCategory={this.onDeleteCategory}
                  links= {catLinks}/>
                <CreateCategory onCreateCatClick={this.onCreateCatClick} />
              </div>
              <div className="col-xs-6">
                <Category
                  onEntrySelected={this.onEntrySelected}
                  onCreateNewEntryClick={this.onCreateNewEntryClick}
                  onDeleteEntry={this.onDeleteEntry}
                  selectedCategory={this.state.selectedCategory}
                  selectedEntry={this.state.selectedEntry}/>
              </div>
             </div>
          </div>
          <div className="col-xs-7">
            <Metronome
                onSetAsFastestClick={this.onSetAsFastestClick}
                onTickSpeedInputChange={this.onTickSpeedInputChange}
                tickSpeed={this.state.tickSpeed}
                onStartStopClick={this.onStartStopClick}
                btnText={this.state.btnText}
                />



              <Entry selectedEntry={this.state.selectedEntry} />
            </div>
          </div>
      </div>
    );
  }
});

export default App;

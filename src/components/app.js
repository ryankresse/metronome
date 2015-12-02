import React, { Component } from 'react';
import Metronome from './metronome';
import Categories from './categories';
import Store from '../stores/store';

$.post('/test', {data: 'hello'}, function (res) {
  console.log(res);
});

function getCategoriesState () {
  return {
    categories: Store.getAllCategories()
  }
}

let App = React.createClass({

  getInitialState: function () {
      return {categories: Store.getAllCategories()}
  },
  componentDidMount: function() {
    Store.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    Store.removeChangeListener(this._onChange);
  },
  _onChange: function (){
    this.setState(getCategoriesState());
  },
  render: function () {
    return (
      <div>
      <Metronome />
      <Categories categories={this.state.categories} />
      </div>
    );
  }
});

export default App;

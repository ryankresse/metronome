import React, { Component } from 'react';
import Metronome from './metronome';
import Nav from './Nav';
import Categories from './categories';
import Store from '../stores/store';


/*$.post('/test', {data: 'hello'}, function (res) {
  console.log(res);
});*/

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

  _buildCategoryLinks: function() {
    return this.state.categories.map(cat => ({name: cat.name, id: cat.id}));
  },

  render: function () {
    return (
      <div>
        <Metronome />
        <Nav links= {this._buildCategoryLinks()}/>
        {this.props.children}
      </div>
    );
  }
});

export default App;

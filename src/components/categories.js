import React, { Component } from 'react';
import Category from './category';
import Actions from '../actions/actions';

export default class Categories extends Component {
  constructor(props) {
    super(props);
  }

  createNewCategory() {
    var name = document.getElementById('newCat').value;
    Actions.createCategory(name);
  }

  render() {

    return (
      <div>

        <input type="text" id="newCat" placeholder="Create new category"/>
        <button onClick={this.createNewCategory}>Create category</button>
     </div>
    );
  }
}
  

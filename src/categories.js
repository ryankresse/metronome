import React, { Component } from 'react';
import Category from './category';
export default class Categories extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var createCategory = function(category, index) {
      return <li key={index}><Category key={index} category={category} /></li>
    };
    return (
    <ul>{this.props.categories.map(createCategory)}</ul>
    );
  }
}

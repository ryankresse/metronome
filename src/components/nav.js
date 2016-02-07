import React, { Component } from 'react';
import { Link } from 'react-router';
import Actions from '../actions/actions';



let Nav = React.createClass({
  createPanels() {
    return this.props.links.map(this.makePanelMarkup);
  },
  onCategorySelected(cat) {
    this.props.onCategorySelected(cat._id);
  },

  onDeleteCatClick(cat, e) {
    e.stopPropagation();
    this.props.onDeleteCategory(cat._id);
  },

  makePanelMarkup(link, i) {
    var classNames = "panel panel-default outer-panel-div"
    if (this.props.selectedCategory && (link._id === this.props.selectedCategory._id)) {
      classNames += " selected-category";
    }


    return (
    <div key={i} className={classNames}
      onClick={this.onCategorySelected.bind(this, link)}>
      <div className="category-panel-body">
        {link.name}
        <span onClick={this.onDeleteCatClick.bind(this, link)} className="pull-right glyphicon glyphicon-remove"></span>

      </div>
    </div>
  )
  },
  render() {
    var panels = this.createPanels();
    return (
      <div>
      {panels}
      </div>
    );
  }
});

var styles = {
  outerPanelDiv: {
      "cursor": "pointer",
      "marginBottom": "0px"
  },
  panelBody: {
    padding: "10px 0px 10px 0px"
  }
}

export default Nav;

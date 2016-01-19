import React, { Component } from 'react';
import { Link } from 'react-router';
import Actions from '../actions/actions';



let Nav = React.createClass({
  createPanels() {
    return this.props.links.map(this.makePanelMarkup);
  },
  onCategorySelected(cat) {
    this.props.onCategorySelected(cat.id);
  },
  makePanelMarkup(link, i) {
    return (
    <div key={i} className="panel panel-default"
      onClick={this.onCategorySelected.bind(this, link)}
      style={styles.outerPanelDiv}>
      <div style={styles.panelBody} class="panel-body">
        {link.name}
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

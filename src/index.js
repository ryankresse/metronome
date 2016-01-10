import React from 'react';
import { render } from 'react-dom';
import  App  from './components/app';
import { Router, Route, Link, browserHistory } from 'react-router'
import  Category  from './components/category';
import  Entry  from './components/entry';


render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="category/:categoryId" component={Category} >
        <Route path=":entryId" component={Entry} / >
      </Route>
    </Route>
  </Router>),
  document.getElementById('root'));

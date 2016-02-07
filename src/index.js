import React from 'react';
import { render } from 'react-dom';
import  App  from './components/app';
import { Router, Route, Link, browserHistory } from 'react-router'
import  Category  from './components/category';
import  Entry  from './components/entry';


render(<App />,
  document.getElementById('root'));


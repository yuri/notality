import React from 'react';
import { IndexRoute, Router, Route } from 'react-router';

import App from '../containers/App';
import AboutPage from '../containers/AboutPage';
import MainPage from '../containers/MainPage';

export default (
  <Router path="/" component={ App }>
    <IndexRoute component={ MainPage } />
    <Route path="/about" component={ AboutPage }/>
  </Router>
);

import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import App from '../containers/App';
import HomeView from 'views/HomeView';
import NotFoundView from 'views/NotFoundView';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomeView} />
    <Route path="/404" component={NotFoundView} />
    <Redirect from="*" to="/404" />
  </Route>
);

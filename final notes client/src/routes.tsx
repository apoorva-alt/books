import React from 'react';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Login from './components/login';
import Notes from './components/Notes';

// const createMyHistory = () => ({
//     someMember: "someValue",
// });

// const history = createBrowserHistory();

const RootRoutes = () => (
  <BrowserRouter>
    <Switch>
      <Route
        path="/auth"
        component={Login}
      />
      <Route
        path="/notes"
        component={Notes}
      />
      <Redirect from="/" to="/auth"/>
    </Switch>
  </BrowserRouter>
);

export default RootRoutes

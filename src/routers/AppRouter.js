import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import MoviesPage from '../components/MoviesPage';
import RevealPage from '../components/RevealPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact={true} />
        <PrivateRoute path="/movies" component={MoviesPage} />
        <PrivateRoute path="/reveal" component={RevealPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <ToastContainer position="top-left" />
    </div>
  </Router>
);

export default AppRouter;

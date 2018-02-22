import { BrowserRouter as Router, Switch, Route, HashRouter, Redirect, withRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import IssueList from './IssueList.jsx';
import IssueEdit from './IssueEdit.jsx';

const contentNode = document.getElementById('contents');
const NoMatch = () => <p>No page found here.</p>;
const IssueWithRouter = withRouter(IssueList);

const App = props => (
  <div>
    <header className="header">
      <h1>Issue Tracker</h1>
    </header>
    <div className="contents">
      {props.children}
    </div>
    <footer className="footer">
      Full source code available at this link.
    </footer>
  </div>
);

App.propTypes = {
  children: PropTypes.array.isRequired,
};

const RoutedApp = () => (
  <Router>
    <Switch>
      <Redirect from="/" exact to="/issues" />
      <App>
        <Route path="/issues" exact component={IssueWithRouter} />
        <Route path="/issues/:id" component={IssueEdit} />
        <Route path="/404" component={NoMatch} />
      </App>
    </Switch>
  </Router>
);

ReactDOM.render(<RoutedApp />, contentNode);

if (module.hot) {
  module.hot.accept();
}

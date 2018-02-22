import { BrowserRouter as Router, Switch, Route, HashRouter, Redirect, withRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import IssueList from './IssueList.jsx';
import IssueEdit from './IssueEdit.jsx';

const contentNode = document.getElementById('contents');
const NoMatch = () => <p>No page found</p>;
const IssueWithRouter = withRouter(IssueList);

const App = props => (
  <div>
    <div className="header">
      <h1>Issue Tracker</h1>
    </div>
    <div className="contents">
      {props.children}
    </div>
    <div className="footer">
      Full source code available at this link.
    </div>
  </div>
);

App.propTypes = {
  children: PropTypes.object.isRequired,
};

const RoutedApp = () => (
  <HashRouter>
    <Switch>
      <Redirect from="/" exact to="/issues" />
      <App>
        <Route path="/issues" exact component={IssueWithRouter} />
        <Route path="/issues/:id" component={IssueEdit} />
        <Route path="*" component={NoMatch} />
      </App>
    </Switch>
  </HashRouter>
);

ReactDOM.render(<RoutedApp />, contentNode);

if (module.hot) {
  module.hot.accept();
}

import { BrowserRouter as Router, Switch, Route, HashRouter, Redirect, withRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import IssueList from './IssueList.jsx';
import IssueEdit from './IssueEdit.jsx';

const contentNode = document.getElementById('contents');
const NoMatch = () => <p>No page found</p>;
const IssueWithRouter = withRouter(IssueList);

const RoutedApp = () => (
  <HashRouter>
    <Switch>
      <Redirect from="/" exact to="/issues" />
      <Route path="/issues" exact component={IssueWithRouter} />
      <Route path="/issues/:id" component={IssueEdit} />
      <Route path="*" component={NoMatch} />
    </Switch>
  </HashRouter>
);

ReactDOM.render(<RoutedApp />, contentNode);

if (module.hot) {
  module.hot.accept();
}

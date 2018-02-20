import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class IssueEdit extends Component { // eslint-disable-line
  render() {
    return (
      <div>
        <Link to="/issues">Back to issues </Link>
        <h1>Issue no. {this.props.match.params.id}  </h1>
        <p>Edit Issue</p>
      </div>
    );
  }
}

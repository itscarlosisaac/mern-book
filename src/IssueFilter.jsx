import { Link } from 'react-router-dom';
import React from 'react';

export default class IssueFilter extends React.Component { // eslint-disable-line
  constructor() {
    super();
    this.clearFilter = this.clearFilter.bind(this);
    this.setFilterOpen = this.setFilterOpen.bind(this);
    this.setFilterAssigned = this.setFilterAssigned.bind(this);
  }

  setFilterOpen(e) {
    this.props.setFilter({ status: 'Open' });
  }
  setFilterAssigned(e) {
    this.props.setFilter({ status: 'Assigned' });
  }

  clearFilter(e) {
    this.props.setFilter({});
  }

  render() {
    const Separator = () => <span> | </span>;
    return (
      <div>
        <Link to={'issues'}> All Issues</Link>
        <Link to={'issues?status=Open'}> Open Issues</Link>
        <Link to={'issues?status=Assigned'}> Assigned Issues</Link>
        {/* <button onClick={this.clearFilter}> All Issues</button>
        <Separator />
        <Link to={{ pathname: '/issues', query: {status: 'Open' } } }> Open Issues </Link> 
        <button onClick={this.setFilterOpen} >Open Issues</button>
        <Separator />
        <button onClick={this.setFilterAssigned} >Assigned Issues</button> */}
      </div>
    );
  }
}

const contentNode = document.getElementById('contents');
const issues = [
    {
        id: 1, status: 'Open' , owner: 'Ryan', created: new Date('2018-01-23'), effort: 7, completionDate: undefined, title: 'Error in the console when clicking Add.'
    },
    {
        id: 2, status: 'Assigned' , owner: 'Ravan', created: new Date('2018-01-27'), effort: 13, completionDate: new Date('2018-02-15'), title: 'Missing bottom border on panel.'
    },
    {
        id: 3, status: 'In Progress' , owner: 'Michael', created: new Date('2018-01-29'), effort: 5, completionDate: new Date('2018-02-01'), title: 'Build table.'
    }
]

class IssueFilter extends React.Component {
    render () {
        return (
            <div>
                This is a placeholder for de filter
            </div>
        )
    }
}


class IssueRow extends React.Component{
    render(){
        const borderedStyle = {border:"1px solid silver", padding: 4 };
        return(
            <tr>
                <td style={borderedStyle}>{this.props.issue_id}</td>
                <td style={borderedStyle}>{this.props.children}</td>
            </tr>
        )
    }
}

IssueRow.propTypes = {
    issue_id: React.PropTypes.number.isRequired,
    issue_title: React.PropTypes.string
}

IssueRow.defaultProps = {
    // issue_title: ' -- untitled -- '
}

class IssueTable extends React.Component{
    render(){
        const borderedStyle = {border:"1px solid silver", padding: 6 };
        return(
            <table>
                <thead>
                    <tr>
                        <th style={borderedStyle}>Id</th>
                        <th style={borderedStyle}>Title</th>
                    </tr>
                </thead>
                <tbody>
                    <IssueRow issue_id={1}> Error on console when clicking Add </IssueRow>
                    <IssueRow issue_id={2}> Missing bottom border on panel </IssueRow>
                </tbody>
            </table>
        )
    }
}

class IssueAdd extends React.Component{
    render(){
        return(
            <div>
                This is the form to add the Issue
            </div>
        )
    }
}


class IssueList extends React.Component {
    render(){
        return(
            <div>
                <h1>Issue Tracker</h1>
                <IssueFilter />
                <hr />
                <IssueTable />
                <hr />
                <IssueAdd />
            </div>
        );
    }
}


const continents = ['Africa', 'America', 'Asia', 'Australia', 'Europe'];
const message = continents.map( c => `Hello ${c}!`).join( ' - ' );
var component = <p>{message}</p>;
ReactDOM.render(<IssueList />, contentNode);
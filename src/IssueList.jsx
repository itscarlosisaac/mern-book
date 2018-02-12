// Importing components
import IssueAdd from './IssueAdd.jsx'
import IssueFilter from './IssueFilter.jsx'

const IssueRow = (props) => (
    <tr>
        <td>{props.issue._id}</td>
        <td>{props.issue.status}</td>
        <td>{props.issue.owner}</td>
        <td>{props.issue.created.toDateString()}</td>
        <td>{props.issue.effort}</td>
        <td>{props.issue.completionDate ? props.issue.completionDate.toDateString() : ' -- no date -- '}</td>
        <td>{props.issue.title}</td>
    </tr>
);

IssueRow.propTypes = {
    issue_id: React.PropTypes.string.isRequired,
    issue_title: React.PropTypes.string
}

IssueRow.defaultProps = {
    // issue_title: ' -- untitled -- '
}

function IssueTable (props) {
    const issueRows =  props.issues.map(issue => <IssueRow issue_id={issue._id} key={issue._id} issue={issue} />);
    return(
        <table className="bordered-table">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Status</th>
                    <th>Owner</th>
                    <th>Created</th>
                    <th>Effort</th>
                    <th>Completion</th>
                    <th>Title</th>
                </tr>
            </thead>
            <tbody>{issueRows}</tbody>
        </table>
    )
}

export default class IssueList extends React.Component {
    constructor(){
        super();
        this.state = {
            issues: []
        }
        this.createIssue = this.createIssue.bind(this)
    }

    createIssue(newIssue){
        fetch('/api/issues', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(newIssue) })
            .then( response => {
                if(response.ok){
                    response.json()
                        .then( updatedIssues => {
                        updatedIssues.created = new Date(updatedIssues.created);
                        updatedIssues.completionDate = updatedIssues.completionDate ? new Date(updatedIssues.completionDate) : updatedIssues.completionDate;
                        const newIssues = this.state.issues.concat(updatedIssues);
                        this.setState({ issues: newIssues });
                    })
                }else{
                    response.json()
                        .then( error => alert("Failed to add issue " + error.message ));
                }
            })
            .catch( err => {
                alert("Error in sending the data to the server: " + err.message )
            });
    }

    componentDidMount () {
        this.loadData();
    }
    
    loadData(){
        fetch('/api/issues')
            .then(response => {
                if(response.ok){
                    response.json()
                        .then(data => {
                            console.log('Total count of records:', data._metadata.total_count);
                            data.records.forEach(issue => {
                            issue.created = new Date(issue.created);
                            issue.completionDate = issue.completionDate ? new Date(issue.completionDate) : issue.completionDate;
                        });
                        this.setState({issues: data.records})
                    })
                }
            })
            .catch(err => console.log(err) )
    }

    render(){
        return(
            <div>
                <h1>Issue Tracker</h1>
                <IssueFilter />
                <hr />
                <IssueTable issues={this.state.issues} />
                <hr />
                <IssueAdd createIssue={this.createIssue} />
            </div>
        );
    }
}
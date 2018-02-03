
const contentNode = document.getElementById('contents');

class IssueFilter extends React.Component {
    render () {
        return (
            <div>
                This is a placeholder for de filter
            </div>
        )
    }
}


const IssueRow = (props) => (
    <tr>
        <td>{props.issue.id}</td>
        <td>{props.issue.status}</td>
        <td>{props.issue.owner}</td>
        <td>{props.issue.created.toDateString()}</td>
        <td>{props.issue.effort}</td>
        <td>{props.issue.completionDate ? props.issue.completionDate.toDateString() : ' -- no date -- '}</td>
        <td>{props.issue.title}</td>
    </tr>
);

IssueRow.propTypes = {
    issue_id: React.PropTypes.number.isRequired,
    issue_title: React.PropTypes.string
}

IssueRow.defaultProps = {
    // issue_title: ' -- untitled -- '
}

function IssueTable () {
    const issueRows =  this.props.issues.map(issue => <IssueRow issue_id={issue.id} key={issue.id} issue={issue} />);
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
            <tbody> { issueRows } </tbody>
        </table>
    )
}

class IssueAdd extends React.Component{
    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        const form =  document.forms.issueAdd;
        this.props.createIssue({
            owner: form.owner.value,
            title: form.title.value,
            status: 'New',
            created: new Date(),
        })
        // Clear t form
        form.owner.value = ""
        form.title.value = ""
    }
    render(){
        return(
            <div>
                <form name="issueAdd" onSubmit={this.handleSubmit}>
                    <input type="text" name="owner" placeholder="Onwer"/>
                    <input type="text" name="title" placeholder="Title"/>
                    <button>Add</button>
                </form>
            </div>
        )
    }
}


class IssueList extends React.Component {
    constructor(){
        super();
        this.state = {
            issues: []
        }
        this.createIssue = this.createIssue.bind(this)
    }

    createIssue(newIssue){
        const newIssues = this.state.issues.slice();
        newIssue.id = this.state.issues.length + 1;
        newIssues.push(newIssue);
        this.setState({issues: newIssues });
    }

    componentDidMount () {
        this.loadData();
    }
    
    loadData(){
        setTimeout( () => {
            this.setState({issues: issues });
        }, 500 )
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


const continents = ['Africa', 'America', 'Asia', 'Australia', 'Europe'];
const message = continents.map( c => `Hello ${c}!`).join( ' - ' );
var component = <p>{message}</p>;
ReactDOM.render(<IssueList />, contentNode);
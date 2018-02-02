
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
        const issue = this.props.issue;
        return(
            <tr>
                <td>{issue.id}</td>
                <td>{issue.status}</td>
                <td>{issue.owner}</td>
                <td>{issue.created.toDateString()}</td>
                <td>{issue.effort}</td>
                <td>{issue.completionDate ? issue.completionDate.toDateString() : ' -- no date -- '}</td>
                <td>{issue.title}</td>
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
        const issueRows =  this.props.issues.map(issue => <IssueRow issue_id={issue.id} key={issue.id} issue={issue} />);
        return(
            <table>
                <thead>
                    <tr>
                        <th style={borderedStyle}>Id</th>
                        <th style={borderedStyle}>Status</th>
                        <th style={borderedStyle}>Owner</th>
                        <th style={borderedStyle}>Created</th>
                        <th style={borderedStyle}>Effort</th>
                        <th style={borderedStyle}>Completion</th>
                        <th style={borderedStyle}>Title</th>
                    </tr>
                </thead>
                <tbody>
                    { issueRows }
                </tbody>
            </table>
        )
    }
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
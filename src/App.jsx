
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

class IssueTable extends React.Component{
    render(){
        return(
            <div>
                This is a placeholder fr the react table.
            </div>
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
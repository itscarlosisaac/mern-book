
const contentNode = document.getElementById('contents');

class IssueList extends React.Component {
    render(){
        return(
            <div> This is a place holder for the issue list. </div>
        );
    }
}


const continents = ['Africa', 'America', 'Asia', 'Australia', 'Europe'];
const message = continents.map( c => `Hello ${c}!`).join( ' - ' );
var component = <p>{message}</p>;
ReactDOM.render(<IssueList />, contentNode);
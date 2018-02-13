import React from 'react';
export default class IssueAdd extends React.Component{
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
                    <button>Add More</button>
                </form>
            </div>
        )
    }
}

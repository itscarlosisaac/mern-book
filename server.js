const express = require("express");
const app = express();
const bodyParser = require('body-parser');


app.use(express.static('static'));
app.use(bodyParser.json())


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

app.get('/api/issues', (req, res) => {
    const metadata =  {total_count: issues.length }
    res.json({_metadata: metadata, records: issues });
});

app.post('/api/issues', (req, res) => {
    const newIssue = req.body;
    newIssue.id = issues.length + 1;
    newIssue.created = new Date();
    !newIssue.status ? newIssue.status = 'New' : null;
    issues.push(newIssue)
    res.json(newIssue);
});

app.listen(3000, (req, res) => { 
    console.log("App is running on port 3000");
});
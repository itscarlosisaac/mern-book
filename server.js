const express = require("express");
const app = express();
const bodyParser = require('body-parser');

// Mongo db
const MongoClient = require('mongodb').MongoClient;
let db;

MongoClient.connect('mongodb://localhost/issuetracker')
           .then(connection => {
               db = connection;
               app.listen(3000, () => {
                   console.log('App started on port 3000');
               })
           })
           .catch(error => {
               console.log('Connection error: ', error );
           })


// Static and body parser
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


// Validating Fields
const validIssueStatus = {
    New: true,
    Open: true,
    Assigned: true,
    Fixed: true,
    Verified: true,
    Closed: true
}

const issueFieldType = {
    id: 'required',
    status: 'required',
    owner: 'required',
    effort: 'optional',
    created: 'required',
    completionDate: 'optional',
    title: 'required'
}

function validateIssue(issue){
    for( const field in issueFieldType ){
        const type = issueFieldType[field];
        if( !type ){
            delete issue[field] 
        }else if ( type === 'required' &&  !issue[field] ){
            return `${field} is required.`;
        }
    }
    if( !validIssueStatus[issue.status] ){
        return `${issue.status} is not a valid status.`
    }
}

app.get('/api/issues', (req, res) => {
    console.log(db)
    db.collection('issues').find().toArray()
      .then(issues => {
          const metadata = { total_count: issues.length };
          res.json({_metadata: metadata, records: issueFieldType })
      })
      .catch(error => {
          console.log('ERROR: ', error )
          res.status(500).json({message: `Internal Server Error: ${error}`} );
      })
});

app.post('/api/issues', (req, res) => {
    const newIssue = req.body;
    newIssue.id = issues.length + 1;
    newIssue.created = new Date();
    !newIssue.status ? newIssue.status = 'New' : null;

    const err = validateIssue(newIssue);
    if(err) {
        res.status(422).json({ message: `Invalid request ${err}` });
        return;
    }

    issues.push(newIssue)
    res.json(newIssue);
});
const express = require("express");
const app = express();
const bodyParser = require('body-parser');

const Issue = require('./issue.js');

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

app.get('/api/issues', (req, res) => {
    db.collection('issues').find().toArray()
      .then(issues => {
          const metadata = { total_count: issues.length };
          res.json({_metadata: metadata, records: issues })
      })
      .catch(error => {
          console.log('ERROR: ', error )
          res.status(500).json({message: `Internal Server Error: ${error}`} );
      })
});

app.post('/api/issues', (req, res) => {
    const newIssue = req.body;
    newIssue.created = new Date();
    !newIssue.status ? newIssue.status = 'New' : null;

    const err = Issue.validateIssue(newIssue);
    if(err) {
        res.status(422).json({ message: `Invalid request ${err}` });
        return;
    }

    db.collection('issues').insertOne(newIssue)
      .then(result => db.collection('issues').find({_id: result.insertedId }).limit(1).next() )
      .then(newIssues =>  res.json(newIssues))
      .catch( err => {
          console.log(err)
          res.status(500).json({message: `Internal server Error: ${err}` });
      })
    res.json(newIssue);
});
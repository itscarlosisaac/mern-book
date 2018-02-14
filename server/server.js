// const express = require("express");
// const MongoClient = require('mongodb').MongoClient;
// const bodyParser = require('body-parser');
// const Issue = require('./issue.js');

import express from 'express';
import bodyParser from 'body-parser'
import Issue from './issue'
import {MongoClient} from 'mongodb';
import 'babel-polyfill';
import SourceMapSupport from 'source-map-support';
SourceMapSupport.install();

const app = express();
// Mongo db
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

if( process.env.NODE_ENV !== 'production' ){
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    
    const config = require('../webpack.config');
    config.entry.app.push('webpack-hot-middleware/client', 'webpack/hot/only-dev-server')
    config.plugins.push( new webpack.HotModuleReplacementPlugin() );

    const bundler = webpack(config);
    app.use(webpackDevMiddleware(bundler, {noInfo: true }) );
    app.use(webpackHotMiddleware(bundler, {log: console.log }) );
}

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